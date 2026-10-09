// Local dev for the whole site: starts every zone app's dev server and a
// proxy on :3000 that routes by path prefix, the way the merged build is
// laid out in production. `/pagefind/*` is served from the last
// `pnpm build`, so site search works in dev once the site was built once.
//
//   pnpm dev             all apps behind http://localhost:3000
//   pnpm dev:<app>       one app on its own port

import { spawn } from 'node:child_process';
import { createReadStream, existsSync } from 'node:fs';
import { createServer, request } from 'node:http';
import { connect } from 'node:net';
import { extname, join, normalize } from 'node:path';
import { APPS, OUT, ROOT, appFor } from './apps.mjs';

const PORT = Number(process.env.PORT ?? 3000);

const children = APPS.map((app) => {
  // Own process group, so stopping it takes pnpm's grandchildren with it.
  const child = spawn('pnpm', ['--filter', app.pkg, 'dev'], { cwd: ROOT, env: process.env, detached: true });
  const tag = `[${app.name}]`.padEnd(10);
  const relay = (stream, sink) =>
    stream.on('data', (buf) => {
      for (const line of buf.toString().split('\n')) if (line.trim()) sink.write(`${tag} ${line}\n`);
    });
  relay(child.stdout, process.stdout);
  relay(child.stderr, process.stderr);
  return child;
});

const stop = () => {
  for (const c of children) {
    try {
      process.kill(-c.pid, 'SIGINT');
    } catch {}
  }
  process.exit(0);
};
process.on('SIGINT', stop);
process.on('SIGTERM', stop);

const PAGEFIND_TYPES = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.wasm': 'application/wasm' };

const server = createServer((req, res) => {
  const path = new URL(req.url, 'http://x').pathname;

  if (path.startsWith('/pagefind/')) {
    const file = join(OUT, normalize(path));
    if (file.startsWith(join(OUT, 'pagefind')) && existsSync(file)) {
      res.writeHead(200, { 'content-type': PAGEFIND_TYPES[extname(file)] ?? 'application/octet-stream' });
      createReadStream(file).pipe(res);
    } else {
      res.writeHead(404).end('no search index yet: run pnpm build once');
    }
    return;
  }

  const app = appFor(path);
  const upstream = request(
    { host: '127.0.0.1', port: app.port, path: req.url, method: req.method, headers: req.headers },
    (up) => {
      res.writeHead(up.statusCode ?? 502, up.headers);
      up.pipe(res);
    },
  );
  upstream.on('error', () => {
    if (!res.headersSent) res.writeHead(502, { 'content-type': 'text/plain' });
    res.end(`${app.name} dev server is not up yet on :${app.port}`);
  });
  req.pipe(upstream);
});

// HMR websockets: hand the raw socket to the owning app.
server.on('upgrade', (req, socket, head) => {
  const app = appFor(new URL(req.url, 'http://x').pathname);
  const up = connect(app.port, '127.0.0.1', () => {
    up.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`);
    for (let i = 0; i < req.rawHeaders.length; i += 2) up.write(`${req.rawHeaders[i]}: ${req.rawHeaders[i + 1]}\r\n`);
    up.write('\r\n');
    up.write(head);
    up.pipe(socket).pipe(up);
  });
  up.on('error', () => socket.destroy());
  socket.on('error', () => up.destroy());
});

server.listen(PORT, () => {
  console.log(`dev: site at http://localhost:${PORT}`);
  for (const a of APPS) console.log(`dev:   /${a.zone.slice(1).padEnd(6)} -> ${a.name} on :${a.port}`);
});

// Tiny static server that behaves like GitHub Pages: directory URLs serve
// index.html, missing files serve the root 404.html with a 404 status.
//
//   node serve.mjs <dir> [--port 4000] [--base /blog]
//
// `--base` mounts the directory under a prefix, for previewing one zone app
// on its own (the blog's preview script uses it).

import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const dir = resolve(args.find((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--')) ?? '.');
const port = Number(flag('port', 4000));
const base = flag('base', '').replace(/\/$/, '');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.wasm': 'application/wasm',
};

function resolveFile(path) {
  const file = join(dir, normalize(path));
  if (!file.startsWith(dir)) return null;
  if (existsSync(file) && statSync(file).isFile()) return file;
  const index = join(file, 'index.html');
  if (existsSync(index)) return index;
  if (existsSync(`${file}.html`)) return `${file}.html`;
  return null;
}

createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (base) {
    if (path !== base && !path.startsWith(`${base}/`)) path = '/__outside_base__';
    else path = path.slice(base.length) || '/';
  }
  // Pages redirects /x to /x/ when x is a directory.
  const file = resolveFile(path);
  if (file?.endsWith('index.html') && !path.endsWith('/') && !path.endsWith('.html')) {
    res.writeHead(301, { location: `${base}${path}/` }).end();
    return;
  }
  const hit = file ?? resolveFile('/404.html');
  if (!hit) {
    res.writeHead(404, { 'content-type': 'text/plain' }).end('not found');
    return;
  }
  res.writeHead(file ? 200 : 404, { 'content-type': TYPES[extname(hit)] ?? 'application/octet-stream' });
  createReadStream(hit).pipe(res);
}).listen(port, () => {
  console.log(`serve: ${dir} at http://localhost:${port}${base || ''}/`);
});

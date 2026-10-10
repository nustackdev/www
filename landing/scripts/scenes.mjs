// The nuspace build the home page scenes play in, fetched rather than kept in
// git: the released nuspace-ui wheel from PyPI, at the version pinned below,
// put through `tape bundle` into public/scenes/nuspace (ignored by git).
//
// A scene replays the server frames it recorded, so it plays right only in the
// nuspace it was recorded with. Every take in public/scenes is recorded against
// nuspace NUSPACE; bump the pin and re-record them together.
//
// Runs before `dev` and `build`, and does nothing when the pinned version is
// bundled already. NUSPACE_UI_DIST=<path to a local build> bundles that instead.

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const NUSPACE = '0.5.1';

const OUT = 'public/scenes/nuspace';
const BASE = '/scenes/nuspace/';
const STAMP = join(OUT, '.nuspace-ui');

const local = process.env.NUSPACE_UI_DIST;
const want = local ? `local:${local}` : NUSPACE;
if (existsSync(STAMP) && readFileSync(STAMP, 'utf8') === want) process.exit(0);

const tmp = mkdtempSync(join(tmpdir(), 'scenes-'));
try {
  let dist = local;
  if (!dist) {
    const meta = await (await fetch(`https://pypi.org/pypi/nuspace-ui/${NUSPACE}/json`)).json();
    const whl = meta.urls.find((u) => u.packagetype === 'bdist_wheel');
    if (!whl) throw new Error(`no nuspace-ui ${NUSPACE} wheel on PyPI`);
    const bytes = Buffer.from(await (await fetch(whl.url)).arrayBuffer());
    const sha = createHash('sha256').update(bytes).digest('hex');
    if (sha !== whl.digests.sha256) throw new Error(`nuspace-ui ${NUSPACE}: sha256 mismatch`);
    const file = join(tmp, whl.filename);
    writeFileSync(file, bytes);
    execFileSync('unzip', ['-q', file, 'nuspace_ui/build/*', '-d', tmp]);
    dist = join(tmp, 'nuspace_ui/build');
  }
  rmSync(OUT, { recursive: true, force: true });
  execFileSync('tape', ['bundle', dist, '-o', OUT, '--base', BASE], { stdio: 'inherit' });
  writeFileSync(STAMP, want);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

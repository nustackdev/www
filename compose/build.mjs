// Merge the zone apps' static builds into one site at <root>/out.
//
// Each app builds on its own (`pnpm build` runs them first). Here landing
// goes to the root and every other app under its zone prefix. Then the
// site-wide files that span zones get written once at the root: the merged
// sitemap, llms.txt, and the Pagefind search index over all of it.

import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as pagefind from 'pagefind';
import { APPS, OUT } from './apps.mjs';

for (const app of APPS) {
  if (!existsSync(app.out)) {
    console.error(`compose: ${app.name}/out is missing. Build the apps first: pnpm build`);
    process.exit(1);
  }
}

rmSync(OUT, { recursive: true, force: true });

for (const app of APPS) {
  const dest = join(OUT, app.zone);
  cpSync(app.out, dest, { recursive: true });
  if (app.zone) {
    // Only the root 404 page is served by Pages; drop the zone copies.
    for (const f of ['404.html', '404', '_not-found']) rmSync(join(dest, f), { recursive: true, force: true });
  }
  console.log(`compose: ${app.name.padEnd(8)} -> /${app.zone.slice(1)}`);
}

// One sitemap for the site: every app's <url> entries, zone sitemaps dropped.
const urls = [];
for (const app of APPS) {
  const file = join(OUT, app.zone, 'sitemap.xml');
  if (!existsSync(file)) continue;
  urls.push(...(readFileSync(file, 'utf8').match(/<url>[\s\S]*?<\/url>/g) ?? []));
  if (app.zone) rmSync(file);
}
writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
);
console.log(`compose: sitemap.xml with ${urls.length} urls`);

// llms.txt lives at the site root by convention; docs generates it.
for (const f of ['llms.txt', 'llms-full.txt']) {
  const src = join(OUT, 'docs', f);
  if (existsSync(src)) cpSync(src, join(OUT, f));
}

// GitHub Pages: serve `_next/` and friends as-is.
writeFileSync(join(OUT, '.nojekyll'), '');

// Site-wide search over the merged HTML, whatever engine produced it.
const { index } = await pagefind.createIndex();
const { page_count } = await index.addDirectory({ path: OUT });
await index.writeFiles({ outputPath: join(OUT, 'pagefind') });
await pagefind.close();
console.log(`compose: pagefind indexed ${page_count} pages`);

console.log(`compose: site ready in out/`);

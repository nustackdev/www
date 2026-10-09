// Placeholder blog build: one static page under /blog, styled with the
// shared tokens. The real engine replaces this file; the contract with
// compose stays the same: a static `out/` meant to be served at /blog.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'out');
const design = join(here, '..', 'shared', 'design');
const SITE_URL = 'https://nustack.dev';

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

cpSync(join(design, 'tokens.css'), join(out, 'tokens.css'));
cpSync(join(design, 'base.css'), join(out, 'base.css'));
writeFileSync(join(out, 'index.html'), readFileSync(join(here, 'src', 'index.html'), 'utf8'));
writeFileSync(
  join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${SITE_URL}/blog</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
</urlset>
`,
);

console.log('blog: wrote out/ (placeholder)');

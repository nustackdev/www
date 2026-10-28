// The interaction-model section, copied in from the spec repo rather than
// kept in git: content/interaction-model is written whole by this script and
// ignored by git. The spec is plain markdown that reads well on GitHub, so on
// the way in it gets what fumadocs needs and nothing else:
//
//   README.md            -> index.md, so the folder links to it
//   first `# ` heading   -> frontmatter title (fumadocs renders the title)
//   relative .md links   -> site-absolute /docs/interaction-model/... URLs
//   each folder          -> meta.json, pages in numeric-prefix order
//
// .md files compile as plain markdown, not MDX, so `{` and `<` in prose are
// safe and nothing is escaped.
//
// Runs before `dev` and `build`. SPEC_DIR=<path> reads another checkout
// (CI checks the repo out next to www). `--watch` skips the first sync and
// re-syncs on every change; `dev` runs it next to the dev server.

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, watch, writeFileSync } from 'node:fs';
import { dirname, join, posix, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DOCS = join(dirname(fileURLToPath(import.meta.url)), '..');
const SPEC = resolve(process.env.SPEC_DIR ?? join(DOCS, '..', '..', 'interaction-model'));
const OUT = join(DOCS, 'content', 'interaction-model');
const URL = '/docs/interaction-model';

/** The section root's sidebar entry. Everything below it comes from the spec. */
const SECTION = {
  title: 'Interaction model',
  description: 'The theory. Refs and Interactions.',
  root: true,
};

/** The section index's page description, the interaction-model line from compass/nustack/identity.md in Go. */
const INDEX_DESCRIPTION =
  'A programming model where every resource is a Ref and Interactions are first-class, so you compose logic across systems.';

if (!existsSync(join(SPEC, 'README.md'))) {
  console.error(`sync-spec: no spec at ${SPEC}. Clone nustackdev/interaction-model next to www, or set SPEC_DIR.`);
  process.exit(1);
}

if (!process.argv.includes('--watch')) {
  sync();
} else {
  let timer;
  watch(SPEC, { recursive: true }, (_, file) => {
    if (!file || !file.endsWith('.md') || file.split('/').some((p) => p.startsWith('.'))) return;
    clearTimeout(timer);
    timer = setTimeout(sync, 100);
  });
  console.log(`sync-spec: watching ${SPEC}`);
}

function sync() {
  rmSync(OUT, { recursive: true, force: true });
  const n = folder('');
  console.log(`sync-spec: ${n} page(s) from ${relative(process.cwd(), SPEC) || '.'}`);
}

/** Copies one spec folder, writes its meta.json, returns the page count. */
function folder(rel) {
  const src = join(SPEC, rel);
  const entries = readdirSync(src).filter((e) => !e.startsWith('.') && !e.startsWith('_')).sort();
  const pages = [];
  let count = 0;
  let title;
  for (const entry of entries) {
    const path = join(src, entry);
    if (statSync(path).isDirectory()) {
      if (!existsSync(join(path, 'README.md'))) continue;
      pages.push(entry);
      count += folder(posix.join(rel, entry));
    } else if (entry.endsWith('.md')) {
      const page = convert(posix.join(rel, entry));
      if (entry === 'README.md') title = page.title;
      else pages.push(entry.slice(0, -3));
      count++;
    }
  }
  // A section root lists its index first, as every other section does: the
  // tabs dropdown finds the section through it.
  const meta = rel ? { title, pages } : { ...SECTION, pages: ['index', ...pages] };
  write(join(rel, 'meta.json'), `${JSON.stringify(meta, null, 2)}\n`);
  return count;
}

function convert(rel) {
  const body = readFileSync(join(SPEC, rel), 'utf8');
  const lines = body.split('\n');
  const at = lines.findIndex((l) => l.startsWith('# '));
  const title = at < 0 ? rel : lines[at].slice(2).trim().replace(/^\d+\s*-\s*/, '');
  if (at >= 0) lines.splice(at, 1);
  const text = links(lines.join('\n').replace(/^\n+/, ''), rel);
  const name = rel.endsWith('README.md') ? rel.replace(/README\.md$/, 'index.md') : rel;
  const description = rel === 'README.md' ? `description: ${JSON.stringify(INDEX_DESCRIPTION)}\n` : '';
  write(name, `---\ntitle: ${JSON.stringify(title)}\n${description}---\n\n${text}`);
  return { title };
}

/** Rewrites relative .md links outside code to their site URL. */
function links(text, rel) {
  const parts = text.split(/(```[\s\S]*?```|`[^`\n]*`)/);
  return parts
    .map((part, i) =>
      i % 2
        ? part
        : part.replace(/\]\(([^)\s#]+\.md)(#[^)\s]*)?\)/g, (match, target, hash = '') => {
            if (/^[a-z]+:/i.test(target)) return match;
            const to = posix.normalize(posix.join(posix.dirname(rel), target));
            if (to.startsWith('..')) {
              console.warn(`sync-spec: ${rel} links outside the spec: ${target}`);
              return match;
            }
            const path = to.replace(/(^|\/)README\.md$/, '').replace(/\.md$/, '');
            return `](${URL}${path ? `/${path}` : ''}${hash})`;
          }),
    )
    .join('');
}

function write(rel, content) {
  const path = join(OUT, rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

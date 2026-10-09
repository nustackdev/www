/**
 * Tools — canonical list. Consumed by:
 *   - components/nav/nav.data.ts   (Stack dropdown + footer)
 *   - app/(home)/tools/ToolsCatalogue.tsx (full catalogue)
 *   - individual tool pages (install command, repo link, py version, powers)
 *
 * Each tool ships as its own PyPI package with its own GitHub repo.
 * `powers` is the inverse of `poweredBy` — where in nustack this tool is used.
 * Derived link fields (`href`, `examples`) are attached at export so pages can
 * do `TOOL.rdbpy.examples` with one import.
 */

import type { Hue } from '@www/shared/components/chapters/CatalogueGrid';
import { type Powered, toolHref as _th } from '@/lib/refs';

export interface Tool {
  name: string;
  slug: string;
  hue: Hue;
  tagline: string;
  description: string;
  navDesc: string;
  /** What the tool itself stands on (external libs or other nu tools). */
  poweredBy?: Powered[];
  /** Where in nustack this tool is used — inverse of `poweredBy`. */
  powers?: Powered[];
  /** GitHub `owner/name` — display slug, also used to build the URL. */
  repo: string;
  /** Full GitHub URL (derived from `repo`). */
  github: string;
  /** `${github}/tree/main/examples` — derived. */
  examples: string;
  /** Catalogue link — derived. */
  href: string;
  /** PyPI package name — `pip install ${pypi}`. */
  pypi: string;
  /** Minimum Python version, e.g. "3.10+". */
  pyVersion: string;
}

/** Author-time shape: same as Tool minus the derived link fields. */
type ToolSpec = Omit<Tool, 'github' | 'examples' | 'href'> & { repo: string };

const SPECS: ToolSpec[] = [
  {
    name: 'virtuals',
    slug: 'virtuals',
    hue: 'plum',
    tagline: 'Virtual Python collections over any KV storage.',
    description:
      'Native-shaped Python collections that are thin views over an ordered KV store. Same API as a built-in dict or list, but the bytes stay on disk and stream in on access.',
    navDesc: 'Virtual Python collections.',
    poweredBy: [
      { kind: 'tool', slug: 'rdbpy' },
      { kind: 'external', name: 'RocksDB', url: 'https://rocksdb.org' },
      { kind: 'external', name: 'LMDB', url: 'https://www.symas.com/lmdb' },
    ],
    powers: [{ kind: 'fabric', slug: 'kv' }],
    repo: 'nustackdev/virtuals',
    pypi: 'virtuals-py',
    pyVersion: '3.10+',
  },
  {
    name: 'invisibles',
    slug: 'invisibles',
    hue: 'magenta',
    tagline: 'Transparent remote objects for Python.',
    description:
      "Move an object to another process or node; the calling code doesn't change. Sync stays sync, async stays async.",
    navDesc: 'Remote objects for Python.',
    powers: [{ kind: 'fabric', slug: 'proxy' }],
    repo: 'nustackdev/invisibles',
    pypi: 'invisibles-py',
    pyVersion: '3.10+',
  },
  {
    name: 'rdbpy',
    slug: 'rdbpy',
    hue: 'crimson',
    tagline: 'RocksDB for Python, with transactions.',
    description:
      'RocksDB and its compression libs bundled into the wheel for Linux and macOS. No system install. Open a DB and put/get/iterate.',
    navDesc: 'RocksDB bindings.',
    poweredBy: [{ kind: 'external', name: 'RocksDB', url: 'https://rocksdb.org' }],
    powers: [
      { kind: 'fabric', slug: 'kv' },
      { kind: 'tool', slug: 'virtuals' },
    ],
    repo: 'nustackdev/rdbpy',
    pypi: 'rocksdbpy',
    pyVersion: '3.9+',
  },
  {
    name: 'kh57',
    slug: 'kh57',
    hue: 'coral',
    tagline: 'Deterministic range reservoir sampling.',
    description:
      'Draw n uniform samples from a sub-range of a massive (billions) sorted KV dataset without scanning it. Any sorted KV store works as a backend.',
    navDesc: 'Deterministic KV sampling.',
    powers: [
      { kind: 'fabric', slug: 'kv' },
      { kind: 'tool', slug: 'virtuals' },
    ],
    repo: 'nustackdev/kh57',
    pypi: 'kh57',
    pyVersion: '3.10+',
  },
];

export const TOOLS: Tool[] = SPECS.map((t) => ({
  ...t,
  github: `https://github.com/${t.repo}`,
  examples: `https://github.com/${t.repo}/tree/main/examples`,
  href: _th(t.slug),
}));

/** Slug-indexed map — use `TOOL.rdbpy.examples`, `TOOL.virtuals.powers`, etc. */
export const TOOL: Record<string, Tool> = Object.fromEntries(
  TOOLS.map((t) => [t.slug, t]),
);

export const toolHref = (t: Pick<Tool, 'slug'>) => _th(t.slug);

export const findTool = (slug: string) => TOOL[slug];

export const pipInstall = (t: Pick<Tool, 'pypi'>) => `pip install ${t.pypi}`;

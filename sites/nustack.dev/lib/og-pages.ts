import { appName } from '@/lib/shared';

/**
 * Registry of static (non-fabric, non-tool, non-doc, non-post) pages that
 * ship a branded OG card. Consumed by `app/og/page/[key]/image.png` (server
 * render) and by each page's `metadata` block (via `ogPageImage`).
 *
 * Add a new page: append an entry here + wire its `metadata` to
 * `pageOG({ ...pageOgEntry(key), image: ogPageImage(key) })`.
 */
export interface PageOgEntry {
  key: string;
  title: string;
  description: string;
  siteLabel: string;
}

export const PAGE_OG_ENTRIES: PageOgEntry[] = [
  {
    key: 'root',
    title: 'Nu — the interaction primitive.',
    description:
      'Build apps in one primitive that spans your whole stack: databases, UIs, AI agents, services. No glue. 50x less code.',
    siteLabel: appName,
  },
  {
    key: 'about',
    title: 'About Nu.',
    description: 'How Nu started, what it is, where it goes.',
    siteLabel: appName,
  },
  {
    key: 'spec',
    title: 'The interaction model.',
    description:
      'The language-agnostic specification behind Nu. Refs, Interactions, Fabrics, Contexts.',
    siteLabel: appName,
  },
  {
    key: 'fabrics-index',
    title: 'Fabrics.',
    description:
      'Each fabric gives your Nu app a new capability. State, UI, distributed execution and more.',
    siteLabel: appName,
  },
  {
    key: 'tools-index',
    title: 'Tools.',
    description:
      'The standalone libraries Nu is built on. Each one solves its own problem, ships on PyPI, and can be used without Nu.',
    siteLabel: appName,
  },
  {
    key: 'blog-index',
    title: 'Blog.',
    description:
      'Announcements, notes, and thinking from the nustack team.',
    siteLabel: `${appName} blog`,
  },
];

export const PAGE_OG: Record<string, PageOgEntry> = Object.fromEntries(
  PAGE_OG_ENTRIES.map((e) => [e.key, e]),
);

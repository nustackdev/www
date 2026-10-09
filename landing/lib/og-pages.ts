import { appName } from '@/lib/shared';

/**
 * Registry of static (non-doc, non-post) pages that
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
    key: 'stack',
    title: 'The stack.',
    description:
      'Interaction model, interaction primitive, interaction OS. One idea, three layers.',
    siteLabel: appName,
  },
  {
    key: 'nuspace',
    title: 'nuspace.',
    description:
      'An information base. One store anyone opens and writes, and the programs that run in it.',
    siteLabel: appName,
  },
  {
    key: 'nuverse',
    title: 'nuverse.',
    description: 'The nuspace ecosystem: the snippets and primitives spaces are built from.',
    siteLabel: appName,
  },
  {
    key: 'nu',
    title: 'Nu.',
    description: 'The interaction primitive. Refs name what a program touches, interactions say what to do.',
    siteLabel: appName,
  },
  {
    key: 'nustd',
    title: 'nustd.',
    description: 'Fabrics and the standard library for Nu: state, UI, network, cluster, models.',
    siteLabel: appName,
  },
  {
    key: 'model',
    title: 'The interaction model.',
    description:
      'The language agnostic specification behind Nu. Refs, Interactions, Fabrics, Contexts.',
    siteLabel: appName,
  },
  {
    key: 'spaces',
    title: 'Spaces.',
    description: 'Things people and agents built in nuspace.',
    siteLabel: appName,
  },
  {
    key: 'placeholder',
    title: 'Placeholder.',
    description: 'Placeholder space.',
    siteLabel: appName,
  },
];

export const PAGE_OG: Record<string, PageOgEntry> = Object.fromEntries(
  PAGE_OG_ENTRIES.map((e) => [e.key, e]),
);

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
    title: 'Build your computational space.',
    description:
      'For everything you work with: notes, data, tools, agents. Connected cells: living programs that hold data, logic and look in one form.',
    siteLabel: appName,
  },
];

export const PAGE_OG: Record<string, PageOgEntry> = Object.fromEntries(
  PAGE_OG_ENTRIES.map((e) => [e.key, e]),
);

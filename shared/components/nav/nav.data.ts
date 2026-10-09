/**
 * Nav data — single source of truth for the header nav and its Stack menu.
 * Consumed by FloatingNav (desktop pill + mobile sheet) and ProductsMenu.
 *
 * Product items are sourced from lib/stack/{fabrics,tools,use-cases}.ts —
 * this file only decides which of them appear in the nav and how they group.
 */

import { FABRICS, fabricHref } from '../../lib/stack/fabrics';
import { TOOLS, toolHref } from '../../lib/stack/tools';
import { USE_CASES, useCaseHref } from '../../lib/stack/use-cases';

export type ProductItem = { name: string; href: string; desc: string };
export type ProductGroup = {
  header: string;
  tagline: string;
  /** Optional href — when set, the group header itself becomes a link to
   * the group's catalogue page (e.g. Fabrics → /fabrics). */
  href?: string;
  items: ProductItem[];
  /** Optional trailing text link (e.g. "Explore →") pointing to a catalogue.
   * Redundant when `href` is set; kept for groups whose header is not itself
   * a page. */
  explore?: { label: string; href: string };
};

export const PRODUCT_GROUPS: ProductGroup[] = [
  {
    header: 'Apps',
    tagline: 'End-user tools built as Nu programs.',
    items: [{ name: 'nuspace', href: '/nuspace', desc: 'A space where your data and the programs on it live together.' }],
  },
  {
    header: 'Fabrics',
    tagline: 'Each fabric, a Nu capability.',
    href: '/fabrics',
    items: FABRICS
      .filter((f) => f.showcase)
      .map((f) => ({ name: f.name, href: fabricHref(f), desc: f.navDesc })),
    explore: { label: 'Explore all', href: '/fabrics' },
  },
  {
    header: 'Tools',
    tagline: 'The libraries the fabrics stand on.',
    href: '/tools',
    items: TOOLS.map((t) => ({ name: t.name, href: toolHref(t), desc: t.navDesc })),
  },
];

/** Use-cases group — dropdown + footer sitemap. Items sourced from lib/stack/use-cases.ts.
 * href/explore intentionally omitted while per-case pages are unpublished; Footer
 * renders items as plain text (see components/nav/Footer.tsx). */
export const USE_CASES_GROUP: ProductGroup = {
  header: 'Use cases',
  tagline: 'Jobs the stack fits.',
  items: USE_CASES.map((u) => ({ name: u.name, href: useCaseHref(u), desc: u.navDesc })),
};

export type WordLink = { label: string; href: string };

export const WORD_LINKS: WordLink[] = [
  { label: 'Docs', href: '/docs' },
  { label: 'Blog', href: '/blog' },
  { label: 'Spec', href: '/spec' },
  { label: 'About', href: '/about' },
];

export { SOCIAL_LINKS } from '../../lib/social';

/**
 * Nav data — single source of truth for the header nav, its Stack menu, and
 * the footer sitemap. Consumed by FloatingNav (desktop pill +
 * mobile sheet), ProductsMenu and Footer.
 *
 * Items are sourced from lib/stack/stack.ts — this file only decides
 * how they group.
 */

import { NUSTACK, STACK, type StackItem } from '../../lib/stack/stack';

export type ProductItem = { name: string; href: string; desc: string; role?: string };
export type ProductGroup = {
  header: string;
  tagline: string;
  /** Items in pairs: rows in the header menu, columns in the footer. */
  /** Optional href — when set, the group header itself becomes a link to
   * the group's index page (e.g. Spaces → /spaces). */
  href?: string;
  rows: ProductItem[][];
  /** Optional trailing text link (e.g. "Explore →") pointing to an index. */
  explore?: { label: string; href: string };
};

/** Each product with its pair: the space, the primitive, then the model. */
const PAIRS = [['nuspace', 'nuverse'], ['nu', 'nustd'], ['model']];

const item = (s: StackItem): ProductItem => ({ name: s.name, href: s.href, desc: s.navDesc, role: s.role });

/** Stack menu: one nustack group over the paired products. */
export const STACK_GROUPS: ProductGroup[] = [
  {
    header: NUSTACK.name,
    tagline: NUSTACK.tagline,
    rows: PAIRS.map((pair) => pair.map((slug) => item(STACK.find((s) => s.slug === slug)!))),
  },
];

export type WordLink = { label: string; href: string };

export const WORD_LINKS: WordLink[] = [
  { label: 'Docs', href: '/docs' },
  { label: 'Blog', href: '/blog' },
];

export { SOCIAL_LINKS } from '../../lib/social';

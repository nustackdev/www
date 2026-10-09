/**
 * Nav data — single source of truth for the header nav, its Stack and Spaces
 * menus, and the footer sitemap. Consumed by FloatingNav (desktop pill +
 * mobile sheet), ProductsMenu and Footer.
 *
 * Items are sourced from lib/stack/{stack,spaces}.ts — this file only decides
 * how they group.
 */

import { TIERS, stackOf } from '../../lib/stack/stack';
import { SPACES } from '../../lib/stack/spaces';

export type ProductItem = { name: string; href: string; desc: string };
export type ProductGroup = {
  header: string;
  tagline: string;
  /** Optional href — when set, the group header itself becomes a link to
   * the group's index page (e.g. Spaces → /spaces). */
  href?: string;
  items: ProductItem[];
  /** Optional trailing text link (e.g. "Explore →") pointing to an index. */
  explore?: { label: string; href: string };
};

/** Stack menu: one group per tier, top of the ladder first. The last tier
 * carries the link to the /stack overview. */
export const STACK_GROUPS: ProductGroup[] = TIERS.map((t, i) => ({
  header: t.name,
  tagline: t.tagline,
  items: stackOf(t.tier).map((s) => ({ name: s.name, href: s.href, desc: s.navDesc })),
  ...(i === TIERS.length - 1 && { explore: { label: 'The whole stack', href: '/stack' } }),
}));

export const SPACES_GROUP: ProductGroup = {
  header: 'Spaces',
  tagline: 'Built in nuspace.',
  href: '/spaces',
  items: SPACES.map((s) => ({ name: s.name, href: s.href, desc: s.navDesc })),
};

export type WordLink = { label: string; href: string };

export const WORD_LINKS: WordLink[] = [
  { label: 'Docs', href: '/docs' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export { SOCIAL_LINKS } from '../../lib/social';

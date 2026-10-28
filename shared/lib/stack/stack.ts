/**
 * Stack — the nustack products, canonical list. Consumed by:
 *   - components/nav/nav.data.ts (Stack dropdown + footer)
 *   - landing /stack index and the /stack/* pages (archived for now, see
 *     the archive/pages-2026-10 tag; items link to their repos until each
 *     page comes back)
 */

/** The family title and line over the products, as in the landing "How it works". */
export const NUSTACK = { name: 'nustack', tagline: 'One primitive, all the way down.' };

export interface StackItem {
  name: string;
  slug: string;
  /** One line for the nav dropdown and footer, after the landing wording. */
  navDesc: string;
  /** Lead-in before navDesc in the footer, eg "The theory". */
  role?: string;
  /** The item's GitHub source, where it links while its page is away. */
  repo: string;
  href: string;
}

type StackSpec = Omit<StackItem, 'href'>;

const GH = 'https://github.com/nustackdev';

const SPECS: StackSpec[] = [
  { name: 'nuspace', slug: 'nuspace', navDesc: 'A space that runs nu programs.', repo: `${GH}/nuspace` },
  { name: 'nuverse', slug: 'nuverse', navDesc: 'Ready-made packages, one install away.', repo: `${GH}/nuverse` },
  { name: 'nu', slug: 'nu', navDesc: 'The interaction model, implemented in Python.', repo: `${GH}/nu` },
  { name: 'nustd', slug: 'nustd', navDesc: 'Batteries for nu: storage, UI, workers and more, ready to use.', repo: `${GH}/nu/tree/main/pkgs/nustd` },
  { name: 'interaction-model', slug: 'model', navDesc: 'A programming model where every resource is a Ref and Interactions are first-class, so you compose logic across systems.', repo: `${GH}/interaction-model` },
];

export const stackHref = (slug: string) => `/stack/${slug}`;

/** Slugs whose /stack page is live. The rest link to their repo. */
const LIVE = new Set<string>();

export const STACK: StackItem[] = SPECS.map((s) => ({
  ...s,
  href: LIVE.has(s.slug) ? stackHref(s.slug) : s.repo,
}));


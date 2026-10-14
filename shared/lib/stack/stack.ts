/**
 * Stack — the ladder, canonical list. Consumed by:
 *   - components/nav/nav.data.ts (Stack dropdown + footer, grouped by tier)
 *   - landing /stack index and the /stack/* pages (archived for now, see
 *     the archive/pages-2026-10 tag; items link to their repos until each
 *     page comes back)
 *
 * Three tiers: the interaction model, the interaction primitive, the
 * interaction OS. Each runtime tier pairs a core with its ecosystem
 * (nu + nustd, nuspace + nuverse).
 */

import type { Hue } from '../hue';

export type Tier = 'model' | 'primitive' | 'os';

export interface TierSpec {
  tier: Tier;
  /** Tier name, e.g. "Interaction OS". */
  name: string;
  tagline: string;
}

export const TIERS: TierSpec[] = [
  { tier: 'os', name: 'Interaction OS', tagline: 'Runs and keeps Nu programs.' },
  { tier: 'primitive', name: 'Interaction primitive', tagline: 'The model, in Python.' },
  { tier: 'model', name: 'Interaction model', tagline: 'The language agnostic spec.' },
];

export interface StackItem {
  name: string;
  slug: string;
  tier: Tier;
  hue: Hue;
  /** Compressed microcopy for nav dropdown / footer. */
  navDesc: string;
  /** The item's GitHub source, where it links while its page is away. */
  repo: string;
  href: string;
}

type StackSpec = Omit<StackItem, 'href'>;

const GH = 'https://github.com/nustackdev';

const SPECS: StackSpec[] = [
  { name: 'nuspace', slug: 'nuspace', tier: 'os', hue: 'teal', navDesc: 'Interaction OS. A computing space for data-centric apps.', repo: `${GH}/nuspace` },
  { name: 'nuverse', slug: 'nuverse', tier: 'os', hue: 'sage', navDesc: 'The nuspace ecosystem: planes and snippets.', repo: `${GH}/nuverse` },
  { name: 'nu', slug: 'nu', tier: 'primitive', hue: 'plum', navDesc: 'The interaction primitive. Refs and interactions.', repo: `${GH}/nu` },
  { name: 'nustd', slug: 'nustd', tier: 'primitive', hue: 'coral', navDesc: 'Fabrics and the standard library.', repo: `${GH}/nu/tree/main/pkgs/nustd` },
  { name: 'interaction model', slug: 'model', tier: 'model', hue: 'steel', navDesc: 'Refs, interactions, fabrics, contexts.', repo: `${GH}/interaction-model` },
];

export const stackHref = (slug: string) => `/stack/${slug}`;

/** Slugs whose /stack page is live. The rest link to their repo. */
const LIVE = new Set<string>();

export const STACK: StackItem[] = SPECS.map((s) => ({
  ...s,
  href: LIVE.has(s.slug) ? stackHref(s.slug) : s.repo,
}));

export const stackOf = (tier: Tier) => STACK.filter((s) => s.tier === tier);

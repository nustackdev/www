/**
 * Stack — the ladder, canonical list. Consumed by:
 *   - components/nav/nav.data.ts (Stack dropdown + footer, grouped by tier)
 *   - landing /stack index and the /stack/* pages
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
  href: string;
}

type StackSpec = Omit<StackItem, 'href'>;

const SPECS: StackSpec[] = [
  { name: 'nuspace', slug: 'nuspace', tier: 'os', hue: 'teal', navDesc: 'Interaction OS. A computing space for data-centric apps.' },
  { name: 'nuverse', slug: 'nuverse', tier: 'os', hue: 'sage', navDesc: 'The nuspace ecosystem: planes and snippets.' },
  { name: 'nu', slug: 'nu', tier: 'primitive', hue: 'plum', navDesc: 'The interaction primitive. Refs and interactions.' },
  { name: 'nustd', slug: 'nustd', tier: 'primitive', hue: 'coral', navDesc: 'Fabrics and the standard library.' },
  { name: 'interaction model', slug: 'model', tier: 'model', hue: 'steel', navDesc: 'Refs, interactions, fabrics, contexts.' },
];

export const stackHref = (slug: string) => `/stack/${slug}`;

export const STACK: StackItem[] = SPECS.map((s) => ({ ...s, href: stackHref(s.slug) }));

export const stackOf = (tier: Tier) => STACK.filter((s) => s.tier === tier);

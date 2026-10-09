/**
 * Spaces — things built in nuspace. Consumed by:
 *   - components/nav/nav.data.ts (Spaces dropdown + footer)
 *   - landing /spaces index
 */

import type { Hue } from '../hue';

export interface Space {
  name: string;
  slug: string;
  hue: Hue;
  /** Compressed microcopy for nav dropdown / footer. */
  navDesc: string;
  href: string;
}

type SpaceSpec = Omit<Space, 'href'>;

const SPECS: SpaceSpec[] = [
  { name: 'placeholder', slug: 'placeholder', hue: 'sage', navDesc: 'Placeholder space. Real ones land before launch.' },
];

export const spaceHref = (slug: string) => `/spaces/${slug}`;

export const SPACES: Space[] = SPECS.map((s) => ({ ...s, href: spaceHref(s.slug) }));

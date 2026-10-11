/* Site-wide hue vocabulary. Each name resolves to the nearest color of the
 * nustack design language in design/hue-scope.css (sage aurora, amber and
 * gold sunset, crimson and coral ember, teal and cyan moonlight, steel and
 * indigo Starlight, violet plum magenta Afterglow). Consumers import `Hue`
 * instead of redeclaring the union. */

export const HUES = [
  'crimson', 'coral', 'amber', 'gold',
  'sage', 'teal', 'cyan',
  'steel', 'indigo', 'violet', 'plum', 'magenta',
] as const;

export type Hue = (typeof HUES)[number];

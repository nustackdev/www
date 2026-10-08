/* Site-wide hue vocabulary. The 12 silver-woven hues declared in
 * design/tokens.css. Consumers import `Hue` (or extend it) instead of
 * redeclaring the union — adding a hue is one edit here + one block in
 * design/tokens.css + one block in design/hue-scope.css. */

export const HUES = [
  'crimson', 'coral', 'amber', 'gold',
  'sage', 'teal', 'cyan',
  'steel', 'indigo', 'violet', 'plum', 'magenta',
] as const;

export type Hue = (typeof HUES)[number];

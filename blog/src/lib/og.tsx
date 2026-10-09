import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { OGImage } from '@www/shared/components/meta/OGImage';

// Noto Sans regular: the font next/og renders with, so blog cards match
// the landing and docs ones.
const require = createRequire(join(process.cwd(), 'package.json'));
const font = readFileSync(require.resolve('@fontsource/noto-sans/files/noto-sans-latin-400-normal.woff'));

/** The shared OG card as a 1200x630 PNG. */
export async function ogPng(props: { title: string; description?: string; site: string }) {
  const svg = await satori(<OGImage {...props} />, {
    width: 1200,
    height: 630,
    fonts: [{ name: 'Noto Sans', data: font, weight: 400, style: 'normal' }],
  });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}

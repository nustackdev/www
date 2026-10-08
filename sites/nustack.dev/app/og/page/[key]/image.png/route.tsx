import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { PAGE_OG, PAGE_OG_ENTRIES } from '@/lib/og-pages';
import { OGImage } from '../../../render';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/og/page/[key]/image.png'>,
) {
  const { key } = await params;
  const entry = PAGE_OG[key];
  if (!entry) notFound();

  return new ImageResponse(
    <OGImage title={entry.title} description={entry.description} site={entry.siteLabel} />,
    { width: 1200, height: 630 },
  );
}

export function generateStaticParams() {
  return PAGE_OG_ENTRIES.map((e) => ({ key: e.key }));
}

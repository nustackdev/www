import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { TOOL, TOOLS } from '@/lib/tools';
import { appName } from '@/lib/shared';
import { OGImage } from '../../../render';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/og/tool/[slug]/image.png'>,
) {
  const { slug } = await params;
  const t = TOOL[slug];
  if (!t) notFound();

  return new ImageResponse(
    <OGImage title={t.name} description={t.tagline} site={appName} />,
    { width: 1200, height: 630 },
  );
}

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

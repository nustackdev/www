import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { FABRIC, FABRICS } from '@/lib/fabrics';
import { appName } from '@/lib/shared';
import { OGImage } from '../../../render';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/og/fabric/[slug]/image.png'>,
) {
  const { slug } = await params;
  const f = FABRIC[slug];
  if (!f) notFound();

  return new ImageResponse(
    <OGImage title={f.name} description={f.tagline} site={appName} />,
    { width: 1200, height: 630 },
  );
}

export function generateStaticParams() {
  return FABRICS.map((f) => ({ slug: f.slug }));
}

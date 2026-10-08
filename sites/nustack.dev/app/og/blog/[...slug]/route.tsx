import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { blogSource, getAllBlogPosts, getBlogPageImage } from '@/lib/source';
import { appName } from '@/lib/shared';
import { OGImage } from '../../render';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<'/og/blog/[...slug]'>,
) {
  const { slug } = await params;
  // slug is [<postSlug>, 'image.png']
  const post = blogSource.getPage(slug.slice(0, -1));
  if (!post) notFound();

  return new ImageResponse(
    <OGImage
      title={post.data.title}
      description={post.data.description}
      site={`${appName} blog`}
    />,
    { width: 1200, height: 630 },
  );
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: getBlogPageImage(post).segments,
  }));
}

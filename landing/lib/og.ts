import type { Metadata } from 'next';

/**
 * Build the openGraph + twitter halves of a page's Metadata from one source
 * of truth. Layout's `metadataBase` resolves relative URLs (`image`, `path`)
 * to absolute at build time.
 *
 * Next.js does a SHALLOW merge on metadata, so any page that sets
 * `openGraph` / `twitter` loses layout-level `siteName`, `url`, `site`,
 * `creator`. This helper re-adds them so every page carries a complete card.
 *
 * Pass `path` (e.g. `/fabrics/kv`) to get both `openGraph.url` and
 * `alternates.canonical` on the page — recommended for every static route.
 */
export function pageOG({
  title,
  description,
  image,
  path,
  type = 'website',
}: {
  title: string;
  description: string;
  image: string;
  path?: string;
  type?: 'website' | 'article';
}): Pick<Metadata, 'title' | 'description' | 'openGraph' | 'twitter' | 'alternates'> {
  return {
    title,
    description,
    openGraph: {
      type,
      title,
      description,
      siteName: 'Nu',
      ...(path ? { url: path } : {}),
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@nustackdev',
      creator: '@nustackdev',
      title,
      description,
      images: [image],
    },
    ...(path ? { alternates: { canonical: path } } : {}),
  };
}

export const ogPageImage = (key: string) => `/og/page/${key}/image.png`;
export const ogFabricImage = (slug: string) => `/og/fabric/${slug}/image.png`;
export const ogToolImage = (slug: string) => `/og/tool/${slug}/image.png`;

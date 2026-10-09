import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/shared';
import { source } from '@/lib/source';

export const dynamic = 'force-static';

/** Docs pages for the site sitemap. Compose merges it into /sitemap.xml. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return source.getPages().map((p) => ({
    url: `${siteUrl}${p.url}`,
    changeFrequency: 'monthly' as const,
    priority: p.url === '/docs' ? 0.9 : 0.6,
    lastModified: now,
  }));
}

import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/shared';

export const dynamic = 'force-static';

/**
 * Landing pages for the site sitemap: just the home page while the stack,
 * spaces and about pages are archived. Compose merges it with the docs and blog
 * sitemaps into the one /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (path: string) => `${siteUrl}${path}`;

  return [{ url: abs('/'), changeFrequency: 'weekly', priority: 1.0, lastModified: now }];
}

import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/shared';
import { STACK } from '@www/shared/lib/stack/stack';
import { SPACES } from '@www/shared/lib/stack/spaces';

export const dynamic = 'force-static';

/**
 * Landing pages for the site sitemap. Regenerated at build time from the
 * same registries the pages use. Compose merges it with the docs and blog
 * sitemaps into the one /sitemap.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (path: string) => `${siteUrl}${path}`;

  const staticPages: MetadataRoute.Sitemap = [
    { url: abs('/'),       changeFrequency: 'weekly',  priority: 1.0, lastModified: now },
    { url: abs('/stack'),  changeFrequency: 'monthly', priority: 0.9, lastModified: now },
    { url: abs('/spaces'), changeFrequency: 'weekly',  priority: 0.9, lastModified: now },
    { url: abs('/about'),  changeFrequency: 'monthly', priority: 0.7, lastModified: now },
  ];

  const stackPages = STACK.map((s) => ({
    url: abs(s.href),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    lastModified: now,
  }));

  const spacePages = SPACES.map((s) => ({
    url: abs(s.href),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    lastModified: now,
  }));

  return [...staticPages, ...stackPages, ...spacePages];
}

import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/shared';
import { FABRICS } from '@/lib/fabrics';
import { TOOLS } from '@/lib/tools';

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
    { url: abs('/'),         changeFrequency: 'weekly',  priority: 1.0, lastModified: now },
    { url: abs('/about'),    changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: abs('/spec'),     changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: abs('/fabrics'),  changeFrequency: 'weekly',  priority: 0.9, lastModified: now },
    { url: abs('/tools'),    changeFrequency: 'weekly',  priority: 0.9, lastModified: now },
    { url: abs('/nuspace'),  changeFrequency: 'monthly', priority: 0.9, lastModified: now },
  ];

  const fabricPages = FABRICS.map((f) => ({
    url: abs(f.href),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    lastModified: now,
  }));

  const toolPages = TOOLS.map((t) => ({
    url: abs(t.href),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    lastModified: now,
  }));

  return [...staticPages, ...fabricPages, ...toolPages];
}

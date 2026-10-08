import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/shared';
import { FABRICS } from '@/lib/fabrics';
import { TOOLS } from '@/lib/tools';
import { source, getAllBlogPosts } from '@/lib/source';

export const dynamic = 'force-static';

/**
 * Sitemap for nustack.dev. Regenerated at build time from the same
 * registries the pages themselves use, so any fabric/tool/doc/post added
 * shows up here automatically.
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
    { url: abs('/blog'),     changeFrequency: 'weekly',  priority: 0.8, lastModified: now },
    { url: abs('/docs'),     changeFrequency: 'weekly',  priority: 0.9, lastModified: now },
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

  const docPages = source.getPages().map((p) => ({
    url: abs(p.url),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    lastModified: now,
  }));

  const blogPages = getAllBlogPosts().map((p) => ({
    url: abs(p.url),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    lastModified: p.data.date ? new Date(p.data.date) : now,
  }));

  return [...staticPages, ...fabricPages, ...toolPages, ...docPages, ...blogPages];
}

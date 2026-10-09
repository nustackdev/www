import { siteUrl } from '@www/shared/lib/site';
import { getPosts, postPath } from '../lib/posts';

// compose merges every zone's sitemap.xml into the site one.
export async function GET() {
  const posts = await getPosts();
  const urls = [
    `<url><loc>${siteUrl}/blog/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    ...posts.map(
      (post) =>
        `<url><loc>${siteUrl}${postPath(post)}</loc><lastmod>${post.data.date}</lastmod><priority>0.7</priority></url>`,
    ),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
}

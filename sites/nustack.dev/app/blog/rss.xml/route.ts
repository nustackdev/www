import { getAllBlogPosts } from '@/lib/source';
import { appName, siteUrl } from '@/lib/shared';

export const dynamic = 'force-static';

const BLOG_TITLE = `${appName} blog`;
const BLOG_DESC = 'Announcements, notes, and thinking from the nustack team.';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const posts = getAllBlogPosts();

  const items = posts
    .map((post) => {
      const url = `${siteUrl}${post.url}`;
      const pubDate = new Date(post.data.date).toUTCString();
      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(post.data.author)}</author>
      <description>${escapeXml(post.data.description ?? '')}</description>
    </item>`;
    })
    .join('\n');

  const lastBuild = posts[0]
    ? new Date(posts[0].data.date).toUTCString()
    : new Date(0).toUTCString();

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(BLOG_TITLE)}</title>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(BLOG_DESC)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  });
}

import rss from '@astrojs/rss';
import { siteUrl } from '@www/shared/lib/site';
import { BLOG_DESCRIPTION, BLOG_TITLE, getPosts, postPath } from '../lib/posts';

export async function GET() {
  const posts = await getPosts();
  return rss({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    site: `${siteUrl}/blog/`,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: postPath(post),
      pubDate: new Date(post.data.date),
      author: post.data.author,
      categories: post.data.tags,
    })),
    customData: `<language>en</language><atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>`,
  });
}

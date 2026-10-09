import { blog } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { blogImageRoute, blogRoute } from './shared';

export const blogSource = loader({
  baseUrl: blogRoute,
  source: blog.toFumadocsSource(),
});

export type BlogPage = (typeof blogSource)['$inferPage'];

export function getAllBlogPosts(): BlogPage[] {
  return blogSource
    .getPages()
    .slice()
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1));
}

export function getBlogPageImage(page: BlogPage) {
  const segments = [...page.slugs, 'image.png'];
  return {
    segments,
    url: `${blogImageRoute}/${segments.join('/')}`,
  };
}

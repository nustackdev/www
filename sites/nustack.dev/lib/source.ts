import { blog, docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import {
  blogImageRoute,
  blogRoute,
  docsContentRoute,
  docsImageRoute,
  docsRoute,
} from './shared';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

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

export function getPageImage(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}

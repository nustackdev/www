export { appName, siteUrl } from '@www/shared/lib/site';

/**
 * Site-absolute routes. Next adds the `/docs` basePath to its own links, so
 * these are only for URLs written into pages: canonicals, OG images, the
 * page tree (rendered through the zone-aware Link), llms.txt.
 */
export const docsRoute = '/docs';
export const docsImageRoute = '/docs/og';
export const docsContentRoute = '/docs/llms.mdx';
export const searchRoute = '/docs/api/search';

export const gitConfig = {
  user: 'nustackdev',
  repo: 'www',
  branch: 'main',
  /** This app's directory inside the www monorepo. */
  dir: 'docs',
};

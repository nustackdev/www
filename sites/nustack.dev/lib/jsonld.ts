import { siteUrl, appName } from '@/lib/shared';

/**
 * schema.org builders. All URLs must be absolute — pass paths through `abs`.
 * Reused across layout (Organization + WebSite) and per-page routes.
 */
export const abs = (path: string) => (path.startsWith('http') ? path : `${siteUrl}${path}`);

const ORG_ID = `${siteUrl}#org`;

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'nustack',
    url: siteUrl,
    logo: abs('/icon.png'),
    sameAs: [
      'https://github.com/nustackdev',
      'https://x.com/nustackdev',
    ],
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    name: appName,
    url: siteUrl,
    publisher: { '@id': ORG_ID },
  };
}

export function blogPostingLd(post: {
  title: string;
  description?: string;
  url: string;
  image: string;
  date: string;
  author: string;
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: abs(post.image),
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(post.url) },
    keywords: post.tags?.join(', '),
  };
}

export function techArticleLd(page: {
  title: string;
  description?: string;
  url: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: page.title,
    description: page.description,
    image: abs(page.image),
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(page.url) },
  };
}

export function softwareApplicationLd(t: {
  name: string;
  description: string;
  url: string;
  image: string;
  repo: string;
  pypi: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: t.name,
    description: t.description,
    url: abs(t.url),
    image: abs(t.image),
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    sameAs: [`https://github.com/${t.repo}`, `https://pypi.org/project/${t.pypi}/`],
    publisher: { '@id': ORG_ID },
  };
}

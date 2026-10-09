import './global.css';
import { Inter } from 'next/font/google';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { getLayoutTabs } from 'fumadocs-ui/layouts/shared';
import { JsonLd } from '@www/shared/components/meta/JsonLd';
import { organizationLd, websiteLd } from '@www/shared/lib/jsonld';
import { DocsProvider } from '@/components/provider';
import { baseOptions } from '@/lib/layout.shared';
import { siteUrl } from '@/lib/shared';
import { source } from '@/lib/source';

const inter = Inter({
  subsets: ['latin'],
  axes: ['opsz'],
});

const TITLE = 'Docs';
const DESCRIPTION = 'Docs for nuspace, the information base, and Nu, the interaction primitive.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/docs' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: '/docs',
    siteName: 'Nu',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nustackdev',
    creator: '@nustackdev',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafbfc' },
    { media: '(prefers-color-scheme: dark)',  color: '#0f1117' },
  ],
};

/** One dropdown option per product root. The `/docs` front page is a root of
 * its own so the dropdown shows there too, but it is not an option to pick. */
const tree = source.getPageTree();
const tabs = getLayoutTabs(tree).map((tab) =>
  tab.url === '/docs' ? { ...tab, unlisted: true } : tab,
);

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <DocsProvider>
          <DocsLayout tree={tree} tabs={tabs} {...baseOptions()}>
            {children}
          </DocsLayout>
        </DocsProvider>
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}

import './global.css';
import { Inter } from 'next/font/google';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { SidebarTabsDropdown } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
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
const DESCRIPTION = 'Docs for nustack: the interaction model, Nu, nustd, nuspace and nuverse.';

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
    { media: '(prefers-color-scheme: light)', color: '#f9fafc' },
    { media: '(prefers-color-scheme: dark)',  color: '#15181f' },
  ],
};

/** One dropdown option per product root. The `/docs` front page is a root of
 * its own but not an option, so there nothing is selected and the dropdown
 * shows its placeholder. Rendered as the sidebar banner because the built-in
 * dropdown hides itself when no root is selected. */
const tree = source.getPageTree();
const tabs = getLayoutTabs(tree).filter((tab) => tab.url !== '/docs');
const tabsDropdown = (
  <SidebarTabsDropdown
    key="sections"
    options={tabs}
    placeholder={<p className="text-sm font-medium text-fd-muted-foreground">Select docs</p>}
  />
);

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <DocsProvider>
          <DocsLayout tree={tree} tabs={false} sidebar={{ banner: tabsDropdown }} {...baseOptions()}>
            {children}
          </DocsLayout>
        </DocsProvider>
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}

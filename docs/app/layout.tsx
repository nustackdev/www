import './global.css';
import { Inter } from 'next/font/google';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
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

const TITLE = 'Nu docs';
const DESCRIPTION = 'Tutorials, how-tos and the fabric reference for Nu, the interaction primitive.';

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

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <DocsProvider>
          <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
            {children}
          </DocsLayout>
        </DocsProvider>
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}

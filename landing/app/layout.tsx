import './global.css';
import { Inter } from 'next/font/google';
import { JsonLd } from '@www/shared/components/meta/JsonLd';
import { organizationLd, websiteLd } from '@www/shared/lib/jsonld';
import { ThemeProvider } from '@www/shared/components/nav/ThemeProvider';
import { siteUrl } from '@/lib/shared';

const inter = Inter({
  subsets: ['latin'],
  axes: ['opsz'],
});

const OG_IMAGE = '/og/page/root/image.png';
const TITLE = 'nuspace: a computing space for data-centric apps';
const DESCRIPTION = 'An interaction OS that runs Nu programs. Data, logic and UI, connected by default.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Nu',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nustackdev',
    creator: '@nustackdev',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
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
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}

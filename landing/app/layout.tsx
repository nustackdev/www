import '@nustackdev/tape-player/tape.css';
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

// Bump `v` whenever the card changes: link previews (Telegram, X, Slack) cache the image by url.
const OG_IMAGE = '/og/page/root/image.png?v=2';
const TITLE = 'Build your computational space with nuspace';
const DESCRIPTION = 'One place for your notes, data, tools and agents, built from connected cells: living programs that hold data, logic and look in one form.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'nustack',
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
    { media: '(prefers-color-scheme: light)', color: '#f9fafc' },
    { media: '(prefers-color-scheme: dark)',  color: '#15181f' },
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

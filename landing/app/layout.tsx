import './global.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { JsonLd } from '@www/shared/components/meta/JsonLd';
import { organizationLd, websiteLd } from '@www/shared/lib/jsonld';
import { ThemeProvider } from '@www/shared/components/nav/ThemeProvider';
import { appName, siteUrl } from '@/lib/shared';
import { NUSPACE } from '@/lib/identity';

const inter = Inter({
  subsets: ['latin'],
  axes: ['opsz'],
});

// Declares the 'JetBrains Mono' family that --font-mono names first.
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

// Bump `v` whenever the card changes: link previews (Telegram, X, Slack) cache the image by url.
const OG_IMAGE = '/og/page/root/image.png?v=3';
const TITLE = NUSPACE.title;
const DESCRIPTION = NUSPACE.description;

export const metadata = {
  metadataBase: new URL(siteUrl),
  // The tab and search title carry the name; previews show the line alone.
  title: `nuspace · ${TITLE.replace(/\.$/, '')}`,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: appName,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: NUSPACE.headline }],
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
    <html lang="en" className={`${inter.className} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}

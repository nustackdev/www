import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import { siteUrl } from '@/lib/shared';

const inter = Inter({
  subsets: ['latin'],
  axes: ['opsz'],
});

const TITLE = 'nuspace - a live computing space';
const DESCRIPTION = 'A live computing space for your notes, data, tools and agents. Everything in it is a running program.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'nuspace',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary',
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
        <RootProvider
          theme={{ defaultTheme: 'system', enableSystem: true }}
          search={{ enabled: false }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}

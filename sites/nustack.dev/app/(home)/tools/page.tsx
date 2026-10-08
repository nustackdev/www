import type { Metadata } from 'next';
import { Page, Header, Body } from '@/components/page';
import { ToolsCatalogue } from './ToolsCatalogue';
import { pageOG, ogPageImage } from '@/lib/og';
import { PAGE_OG } from '@/lib/og-pages';

export const metadata: Metadata = pageOG({
  title: PAGE_OG['tools-index'].title,
  description: PAGE_OG['tools-index'].description,
  image: ogPageImage('tools-index'),
  path: '/tools',
});

export default function ToolsPage() {
  return (
    <Page>
      <Header
        title="Tools."
        lede={
          <>
            The standalone libraries Nu is built on. Each one solves its own
            problem, ships on PyPI, and can be used without Nu.
          </>
        }
      />
      <Body>
        <ToolsCatalogue />
      </Body>
    </Page>
  );
}

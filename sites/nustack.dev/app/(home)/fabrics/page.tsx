import type { Metadata } from 'next';
import { Page, Header, Body } from '@/components/page';
import { FabricsCatalogue } from './FabricsCatalogue';
import { pageOG, ogPageImage } from '@/lib/og';
import { PAGE_OG } from '@/lib/og-pages';

export const metadata: Metadata = pageOG({
  title: PAGE_OG['fabrics-index'].title,
  description: PAGE_OG['fabrics-index'].description,
  image: ogPageImage('fabrics-index'),
  path: '/fabrics',
});

export default function FabricsPage() {
  return (
    <Page>
      <Header
        title="Fabrics."
        lede={
          <>
            Each fabric gives your Nu app a new capability. State, UI,
            distributed execution and more.
          </>
        }
      />
      <Body>
        <FabricsCatalogue />
      </Body>
    </Page>
  );
}

import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { Page, Header, Body } from '@/components/page';
import { PageBadge } from '@www/shared/components/meta/PageBadge';
import { Button } from '@www/shared/components/controls/Button';
import { CtaRow } from '@www/shared/components/layout/CtaRow';
import { TryIt } from '@/components/chapters/TryIt';
import { FabricsCatalogue } from './FabricsCatalogue';
import { pageOG, ogPageImage } from '@/lib/og';
import { PAGE_OG } from '@/lib/og-pages';

export const metadata: Metadata = pageOG({
  title: PAGE_OG.nustd.title,
  description: PAGE_OG.nustd.description,
  image: ogPageImage('nustd'),
  path: '/stack/nustd',
});

export default function NustdPage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="stack" name="nustd" hue="coral" />}
        title="Fabrics and the standard library."
        lede={
          <>
            Each fabric gives a Nu program a new world to touch: state, UI,
            network, cluster, models. Same refs, same interactions.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="solid" href="/docs/reference/nustd">
              <BookOpen size={14} aria-hidden />
              <span>Reference</span>
            </Button>
          </CtaRow>
        }
      />
      <Body>
        <FabricsCatalogue />
        <TryIt />
      </Body>
    </Page>
  );
}

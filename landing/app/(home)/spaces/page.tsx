import type { Metadata } from 'next';
import { Page, Header, Body, Chapter, Section } from '@/components/page';
import { CatalogueGrid, CatalogueCard } from '@www/shared/components/chapters/CatalogueGrid';
import { SPACES } from '@www/shared/lib/stack/spaces';
import { pageOG, ogPageImage } from '@/lib/og';
import { PAGE_OG } from '@/lib/og-pages';

export const metadata: Metadata = pageOG({
  title: PAGE_OG.spaces.title,
  description: PAGE_OG.spaces.description,
  image: ogPageImage('spaces'),
  path: '/spaces',
});

export default function SpacesPage() {
  return (
    <Page>
      <Header
        title="Spaces."
        lede={<>Everything here is a space someone built in nuspace, people and agents alike.</>}
      />
      <Body>
        <Chapter>
          <Section>
            <CatalogueGrid>
              {SPACES.map((s) => (
                <CatalogueCard
                  key={s.slug}
                  href={s.href}
                  name={s.name}
                  hue={s.hue}
                  description={s.navDesc}
                />
              ))}
            </CatalogueGrid>
          </Section>
        </Chapter>
      </Body>
    </Page>
  );
}

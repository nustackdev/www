import type { Metadata } from 'next';
import { Page, Header, Body, Chapter, Section, SectionHead } from '@/components/page';
import { CatalogueGrid, CatalogueCard } from '@www/shared/components/chapters/CatalogueGrid';
import { TIERS, stackOf } from '@www/shared/lib/stack/stack';
import { TOOLS } from '@www/shared/lib/stack/tools';
import { pageOG, ogPageImage } from '@/lib/og';
import { PAGE_OG } from '@/lib/og-pages';

export const metadata: Metadata = pageOG({
  title: PAGE_OG.stack.title,
  description: PAGE_OG.stack.description,
  image: ogPageImage('stack'),
  path: '/stack',
});

/**
 * /stack — the ladder. One chapter per tier, top first, then the standalone
 * libraries the stack is built on.
 */
export default function StackPage() {
  return (
    <Page>
      <Header
        title="The stack."
        lede={
          <>
            The model defines interactions, Nu expresses them, nuspace runs and
            keeps them.
          </>
        }
      />
      <Body>
        {TIERS.map((t) => (
          <Chapter key={t.tier}>
            <SectionHead title={`${t.name}.`} lede={t.tagline} />
            <Section>
              <CatalogueGrid>
                {stackOf(t.tier).map((s) => (
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
        ))}

        <Chapter>
          <SectionHead
            title="Built on."
            lede={<>Standalone Python libraries under the stack. Each is useful on its own.</>}
          />
          <Section>
            <CatalogueGrid>
              {TOOLS.map((t) => (
                <CatalogueCard
                  key={t.slug}
                  href={t.github}
                  external
                  name={t.name}
                  hue={t.hue}
                  tagline={t.tagline}
                  description={t.description}
                />
              ))}
            </CatalogueGrid>
          </Section>
        </Chapter>
      </Body>
    </Page>
  );
}

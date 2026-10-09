import { Chapter, Section } from '@/components/page';
import { CatalogueGrid, CatalogueCard } from '@www/shared/components/chapters/CatalogueGrid';
import { TOOLS, toolHref } from '@www/shared/lib/stack/tools';

export function ToolsCatalogue() {
  return (
    <Chapter>
      <Section>
        <CatalogueGrid>
          {TOOLS.map((t) => (
            <CatalogueCard
              key={t.slug}
              href={toolHref(t)}
              name={t.name}
              hue={t.hue}
              tagline={t.tagline}
              description={t.description}
            />
          ))}
        </CatalogueGrid>
      </Section>
    </Chapter>
  );
}

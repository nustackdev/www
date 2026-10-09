import { Chapter, Section } from '@/components/page';
import { CatalogueGrid, CatalogueCard } from '@www/shared/components/chapters/CatalogueGrid';
import { FABRICS, fabricHref } from '@www/shared/lib/stack/fabrics';

export function FabricsCatalogue() {
  return (
    <Chapter>
      <Section>
        <CatalogueGrid>
          {FABRICS.map((f) => (
            <CatalogueCard
              key={f.slug}
              href={fabricHref(f)}
              name={f.name}
              hue={f.hue}
              tagline={f.tagline}
              description={f.description}
            />
          ))}
        </CatalogueGrid>
      </Section>
    </Chapter>
  );
}

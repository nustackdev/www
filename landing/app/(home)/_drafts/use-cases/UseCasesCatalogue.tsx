import { Chapter, Section } from '@/components/page';
import { CatalogueGrid, CatalogueCard } from '@www/shared/components/chapters/CatalogueGrid';
import { USE_CASES, useCaseHref } from '@www/shared/lib/stack/use-cases';
import { findFabric } from '@www/shared/lib/stack/fabrics';
import { findTool } from '@www/shared/lib/stack/tools';
import type { Powered } from '@www/shared/lib/stack/refs';

function chipLabel(ref: Powered): string {
  if (ref.kind === 'fabric') return findFabric(ref.slug)?.name ?? ref.slug;
  if (ref.kind === 'tool') return findTool(ref.slug)?.name ?? ref.slug;
  return ref.name;
}

export function UseCasesCatalogue() {
  return (
    <Chapter>
      <Section>
        <CatalogueGrid>
          {USE_CASES.map((u) => (
            <CatalogueCard
              key={u.slug}
              href={useCaseHref(u)}
              name={u.name}
              hue={u.hue}
              job={u.job}
              tagline={u.tagline}
              description={u.description}
              stack={u.poweredBy.map(chipLabel)}
            />
          ))}
        </CatalogueGrid>
      </Section>
    </Chapter>
  );
}

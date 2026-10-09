import { JsonLd } from '@www/shared/components/meta/JsonLd';
import { TOOL } from '@/lib/tools';
import { softwareApplicationLd } from '@www/shared/lib/jsonld';
import { ogToolImage } from '@/lib/og';

/** schema.org SoftwareApplication block for a tool page. */
export function ToolJsonLd({ slug }: { slug: string }) {
  const t = TOOL[slug];
  if (!t) return null;
  return (
    <JsonLd
      data={softwareApplicationLd({
        name: t.name,
        description: t.description,
        url: t.href,
        image: ogToolImage(slug),
        repo: t.repo,
        pypi: t.pypi,
      })}
    />
  );
}

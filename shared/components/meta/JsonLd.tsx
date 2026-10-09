/**
 * Renders a JSON-LD block via <script type="application/ld+json">.
 * Accepts a single schema.org object or an array of them.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Next escapes text nodes; JSON-LD needs raw JSON, so use dangerouslySetInnerHTML.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

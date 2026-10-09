/**
 * Shared cross-reference types + href helpers for stack items
 * (fabrics, tools).
 *
 * `Powered` is a typed reference to something an item stands on — another
 * stack item (fabric/tool) or an external dependency (e.g. RocksDB, Ray).
 * Fabrics have no site pages of their own: they link into the reference
 * docs. Tools link to their GitHub repo.
 */

export type Powered =
  | { kind: 'fabric'; slug: string }
  | { kind: 'tool'; slug: string }
  | { kind: 'external'; name: string; url?: string };

/** Reference-doc URL for a fabric (its API page under /docs/reference/nustd). */
export const fabricDocsHref = (slug: string) => `/docs/reference/nustd/${slug}`;

/** Source-code URL for a fabric's implementation directory in the nu repo. */
export const fabricSrcHref = (slug: string) =>
  `https://github.com/nustackdev/nu/tree/main/pkgs/nustd/src/nustd/${slug}`;

/** GitHub URL for a tool, by slug (every tool lives at nustackdev/<slug>). */
export const toolHref = (slug: string) => `https://github.com/nustackdev/${slug}`;

export function hrefFor(ref: Powered): string | undefined {
  if (ref.kind === 'fabric') return fabricDocsHref(ref.slug);
  if (ref.kind === 'tool') return toolHref(ref.slug);
  return ref.url;
}

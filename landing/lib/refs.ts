/**
 * Shared cross-reference types + href helpers for stack items
 * (fabrics, tools, use cases).
 *
 * `Powered` is a typed reference to something an item stands on — another
 * stack item (fabric/tool) or an external dependency (e.g. RocksDB, Ray).
 * Rendering code can turn it into a link with `hrefFor(ref)`; catalogue
 * cards can turn it into a chip label with `labelFor(ref, ctx)` after
 * resolving the slug against the fabric/tool tables.
 */

export type Powered =
  | { kind: 'fabric'; slug: string }
  | { kind: 'tool'; slug: string }
  | { kind: 'external'; name: string; url?: string };

export const fabricHref = (slug: string) => `/fabrics/${slug}`;
export const toolHref = (slug: string) => `/tools/${slug}`;
export const useCaseHref = (slug: string) => `/use-cases/${slug}`;

/** Reference-doc URL for a fabric (its API page under /docs/reference/nustd). */
export const fabricDocsHref = (slug: string) => `/docs/reference/nustd/${slug}`;

/** Source-code URL for a fabric's implementation directory in the nu repo. */
export const fabricSrcHref = (slug: string) =>
  `https://github.com/nustackdev/nu/tree/main/pkgs/nustd/src/nustd/${slug}`;

export function hrefFor(ref: Powered): string | undefined {
  if (ref.kind === 'fabric') return fabricHref(ref.slug);
  if (ref.kind === 'tool') return toolHref(ref.slug);
  return ref.url;
}

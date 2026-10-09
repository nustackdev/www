/**
 * Use cases — canonical list. Consumed by:
 *   - components/nav/nav.data.ts   (dropdown + footer sitemap; uses navDesc)
 *   - app/(home)/_blocks/Hero.tsx  (hero numbered list; uses navDesc)
 *   - app/(home)/use-cases/UseCasesCatalogue.tsx (catalogue cards)
 *
 * `poweredBy` lists the fabrics/tools the use case stands on; typed so it
 * can render as chip labels or as links to the fabric/tool pages.
 */

import type { Hue } from '../../components/chapters/CatalogueGrid';
import { type Powered, useCaseHref as _uh } from './refs';

export interface UseCase {
  name: string;
  slug: string;
  hue: Hue;
  /** JTBD statement — first-person job phrasing shown on catalogue card. */
  job: string;
  /** Catalogue card headline — one punchy line. */
  tagline: string;
  /** Catalogue card body — 1-2 sentences. */
  description: string;
  /** Compressed microcopy for nav dropdown / footer / hero. */
  navDesc: string;
  /** Fabrics + tools the use case stands on. */
  poweredBy: Powered[];
}

export const USE_CASES: UseCase[] = [
  {
    name: 'AI agents',
    slug: 'ai-agents',
    hue: 'plum',
    job: 'I want long-running agents with memory that persists.',
    tagline: 'Agents that survive restarts.',
    description:
      'Context, tools, and world state that stick across sessions. No vector-db-of-the-week, no scaffolding rewrites.',
    navDesc: 'Long-running agents with memory.',
    poweredBy: [
      { kind: 'fabric', slug: 'kv' },
      { kind: 'fabric', slug: 'mem' },
      { kind: 'fabric', slug: 'cluster' },
    ],
  },
  {
    name: 'Local-first apps',
    slug: 'local-first',
    hue: 'teal',
    job: 'I want software that runs on my machine, forever.',
    tagline: 'Own your data and your loop.',
    description:
      "Apps that keep their data on your disk, sync when they can, work when they can't. No account, no server, no monthly bill.",
    navDesc: 'Apps that live on your machine.',
    poweredBy: [
      { kind: 'fabric', slug: 'kv' },
      { kind: 'fabric', slug: 'ui' },
    ],
  },
  {
    name: 'Observability',
    slug: 'observability',
    hue: 'sage',
    job: 'I want logs and metrics without running a server.',
    tagline: 'Track anything, chart anything. At scale.',
    description:
      'Serverless observability on plain RocksDB. Live UI over the same store. Sample huge streams without scanning them. Shipped as nulog.',
    navDesc: 'Logs and metrics without a server.',
    poweredBy: [
      { kind: 'fabric', slug: 'kv' },
      { kind: 'fabric', slug: 'ui' },
      { kind: 'tool', slug: 'kh57' },
    ],
  },
  {
    name: 'Data-intensive apps',
    slug: 'data-intensive',
    hue: 'amber',
    job: 'I want terabytes of data in one Python program.',
    tagline: 'Big stores, live views.',
    description:
      'Own the data, own the queries, own the loop. Scale by adding processes, not services.',
    navDesc: 'Terabytes in one Python program.',
    poweredBy: [
      { kind: 'fabric', slug: 'kv' },
      { kind: 'fabric', slug: 'cluster' },
      { kind: 'fabric', slug: 'proxy' },
    ],
  },
  {
    name: 'Internal tools',
    slug: 'internal-tools',
    hue: 'steel',
    job: 'I want dashboards and admin panels my team actually uses.',
    tagline: 'Scalable dashboards that fit in a single file.',
    description:
      'Live web UIs for ops, support, and finance, built by whoever owns the process. No frontend team, no deploy pipeline.',
    navDesc: 'Scalable dashboards that fit in a single file.',
    poweredBy: [
      { kind: 'fabric', slug: 'ui' },
      { kind: 'fabric', slug: 'kv' },
      { kind: 'fabric', slug: 'http' },
    ],
  },
];

export const useCaseHref = (u: Pick<UseCase, 'slug'>) => _uh(u.slug);

export const findUseCase = (slug: string) => USE_CASES.find((u) => u.slug === slug);

/** Inverse lookup: use cases that reference this fabric/tool slug. */
export function useCasesFor(kind: 'fabric' | 'tool', slug: string): UseCase[] {
  return USE_CASES.filter((u) =>
    u.poweredBy.some((p) => p.kind === kind && p.slug === slug),
  );
}

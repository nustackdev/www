// The zone apps that make up nustack.dev. One entry per app: which path
// prefix it owns, where its static build lands, and its dev port.
// Keep the prefixes in step with shared/lib/zones.ts (ZONES), which the
// apps read at runtime to tell in-zone links from cross-zone ones.

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Landing first: it owns the root and every path no other zone claims. */
export const APPS = [
  { name: 'landing', pkg: '@www/landing', zone: '', port: 3001 },
  { name: 'docs', pkg: '@www/docs', zone: '/docs', port: 3002 },
  // Astro's dev server serves its Vite modules from the root, not under /blog.
  { name: 'blog', pkg: '@www/blog', zone: '/blog', port: 3003, devPaths: ['/@vite/', '/@fs/', '/@id/', '/@react-refresh', '/src/', '/node_modules/'], devWsProtocol: 'vite-hmr' },
].map((a) => ({ ...a, out: join(ROOT, a.name, 'out') }));

export const OUT = join(ROOT, 'out');

/** The app that owns a request path. */
export function appFor(path) {
  return (
    APPS.find((a) => a.zone && (path === a.zone || path.startsWith(`${a.zone}/`))) ?? APPS[0]
  );
}

/** Same, plus the extra paths an app's dev server serves outside its zone. */
export function devAppFor(path) {
  return APPS.find((a) => a.devPaths?.some((p) => path.startsWith(p))) ?? appFor(path);
}

/**
 * Zones: each app in the workspace owns one path prefix of nustack.dev.
 * Landing owns everything that no other zone claims.
 *
 * An app tells the kit which zone it is through `NEXT_PUBLIC_ZONE`, set in
 * its next.config (`''` for landing, `'/docs'` for docs). Links inside the
 * same zone navigate client-side; links into another zone are plain <a>,
 * since that zone is a different build.
 */

export const ZONES = ['/docs', '/blog'] as const;

export type Zone = (typeof ZONES)[number] | '';

/** The zone this build serves. */
export const CURRENT_ZONE = (process.env.NEXT_PUBLIC_ZONE ?? '') as Zone;

/** The zone that owns a site-absolute path like `/docs/x` or `/stack/nuspace`. */
export function zoneOf(path: string): Zone {
  for (const z of ZONES) {
    if (path === z || path.startsWith(`${z}/`) || path.startsWith(`${z}#`) || path.startsWith(`${z}?`)) return z;
  }
  return '';
}

/**
 * Resolve a site-absolute href for this build: `local` is the path relative
 * to the app's basePath when the href stays in this zone, `null` when it
 * leaves the zone and needs a full page load.
 */
export function resolveHref(href: string): { local: string | null } {
  if (!href.startsWith('/')) return { local: href };
  if (zoneOf(href) !== CURRENT_ZONE) return { local: null };
  const rest = href.slice(CURRENT_ZONE.length);
  return { local: rest === '' || rest.startsWith('#') || rest.startsWith('?') ? `/${rest}` : rest };
}

/**
 * next/navigation for the blog. The nav only watches the pathname to close
 * its menus after a client-side route change; every blog page is a full
 * load, so the pathname never changes under a mounted nav.
 */
export function usePathname(): string {
  return typeof window === 'undefined' ? '' : window.location.pathname;
}

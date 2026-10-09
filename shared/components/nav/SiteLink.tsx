import type { ComponentProps } from 'react';
import Link from 'next/link';
import { resolveHref } from '../../lib/zones';

type Props = Omit<ComponentProps<'a'>, 'href'> & { href: string; prefetch?: boolean };

/**
 * Link that knows about zones. Write hrefs as site-absolute paths
 * (`/docs/x`, `/stack/nuspace`): inside this app's zone it is a next/link,
 * anywhere else a plain <a> so the browser loads the other app.
 */
export function SiteLink({ href, prefetch, ...rest }: Props) {
  const { local } = resolveHref(href);
  if (local === null || /^[a-z][a-z0-9+.-]*:/i.test(href)) return <a href={href} {...rest} />;
  return <Link href={local} prefetch={prefetch} {...rest} />;
}

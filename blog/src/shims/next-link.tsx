import type { ComponentProps } from 'react';
import { CURRENT_ZONE } from '@www/shared/lib/zones';

type Props = Omit<ComponentProps<'a'>, 'href'> & { href: string; prefetch?: boolean };

/**
 * next/link for the blog. SiteLink hands it a path relative to the zone
 * (`/x` for `/blog/x`), as next/link under a basePath expects. The blog is a
 * multi-page site, so put the zone back and render a plain anchor.
 */
export default function Link({ href, prefetch: _prefetch, ...rest }: Props) {
  return <a href={href.startsWith('/') ? `${CURRENT_ZONE}${href}` : href} {...rest} />;
}

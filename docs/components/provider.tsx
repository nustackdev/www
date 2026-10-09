'use client';

import { useMemo, type ComponentProps, type FC, type ReactNode } from 'react';
import Image from 'next/image';
import {
  useParams,
  usePathname as useNextPathname,
  useRouter as useNextRouter,
} from 'next/navigation';
import { FrameworkProvider, type ImageProps } from 'fumadocs-core/framework';
import { RootProvider } from 'fumadocs-ui/provider/base';
import { SiteLink } from '@www/shared/components/nav/SiteLink';
import { CURRENT_ZONE, resolveHref } from '@www/shared/lib/zones';
import { searchRoute } from '@/lib/shared';

/**
 * fumadocs works in site-absolute URLs (`/docs/x`, from the loader's
 * baseUrl), Next in basePath-relative ones (`/x`). This bridges the two:
 * pathnames gain the zone prefix, links and router pushes go through the
 * zone resolver, so `/docs/...` stays client-side and anything else (the
 * landing, the blog) is a full page load.
 */

function usePathname() {
  const p = useNextPathname();
  return CURRENT_ZONE + (p === '/' ? '' : p);
}

function useRouter() {
  const router = useNextRouter();
  return useMemo(
    () => ({
      push(url: string) {
        const { local } = resolveHref(url);
        if (local === null) window.location.assign(url);
        else router.push(local);
      },
      refresh() {
        router.refresh();
      },
    }),
    [router],
  );
}

function Link({ href = '', ...rest }: ComponentProps<'a'> & { prefetch?: boolean }) {
  return <SiteLink href={href} {...rest} />;
}

export function DocsProvider({ children }: { children: ReactNode }) {
  return (
    <FrameworkProvider
      usePathname={usePathname}
      useRouter={useRouter}
      useParams={useParams}
      Link={Link}
      // next/image wants src and alt required; fumadocs' own Next provider passes it as is.
      Image={Image as FC<ImageProps>}
    >
      <RootProvider
        theme={{ defaultTheme: 'system', enableSystem: true }}
        search={{ options: { type: 'static', api: searchRoute } }}
      >
        {children}
      </RootProvider>
    </FrameworkProvider>
  );
}

import type { Metadata } from 'next';
import { Page, Header, Body, Chapter, Section } from '@/components/page';
import { PageBadge } from '@www/shared/components/meta/PageBadge';
import { Description } from '@www/shared/components/text';
import { pageOG, ogPageImage } from '@/lib/og';
import { PAGE_OG } from '@/lib/og-pages';

export const metadata: Metadata = pageOG({
  title: PAGE_OG.placeholder.title,
  description: PAGE_OG.placeholder.description,
  image: ogPageImage('placeholder'),
  path: '/spaces/placeholder',
});

/** Placeholder until the first real space page is written. */
export default function PlaceholderSpacePage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="space" name="placeholder" hue="sage" />}
        title="Placeholder."
        lede={<>A space built in nuspace will live here.</>}
      />
      <Body>
        <Chapter>
          <Section>
            <Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </Description>
          </Section>
        </Chapter>
      </Body>
    </Page>
  );
}

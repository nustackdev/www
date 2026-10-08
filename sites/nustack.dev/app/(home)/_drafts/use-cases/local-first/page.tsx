import { Page, Header, Body, Chapter, SectionHead } from '@/components/page';
import { PageBadge } from '@www/shared/components/meta/PageBadge';

export const metadata = {
  title: 'Local-first apps: software that runs on your machine, forever',
};

export default function LocalFirstUseCasePage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="use case" name="Local-first apps" hue="teal" />}
        title="Software that runs on your machine, forever."
        lede={
          <>
            Apps that keep their data on your disk, sync when they can,
            work when they can't. No account, no server, no monthly bill
            to keep your own notes alive.
          </>
        }
      />
      <Body>
        <Chapter>
          <SectionHead
            title="Coming soon."
            lede={<>Page in progress. Meanwhile, see the other use cases in the catalogue.</>}
          />
        </Chapter>
      </Body>
    </Page>
  );
}

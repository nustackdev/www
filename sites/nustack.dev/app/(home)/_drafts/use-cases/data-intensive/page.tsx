import { Page, Header, Body, Chapter, SectionHead } from '@/components/page';
import { PageBadge } from '@www/shared/components/meta/PageBadge';

export const metadata = {
  title: 'Data-intensive apps: terabytes of data, one Python program',
};

export default function DataIntensiveUseCasePage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="use case" name="Data-intensive apps" hue="amber" />}
        title="Terabytes of data, one Python program."
        lede={
          <>
            Big stores, live views, no query engine in the middle. Own
            the data, own the queries, own the loop. Scale by adding
            processes, not services.
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

import { Page, Header, Body, Chapter, SectionHead } from '@/components/page';
import { PageBadge } from '@www/shared/components/meta/PageBadge';

export const metadata = {
  title: 'Internal tools: dashboards and admin panels your team uses',
};

export default function InternalToolsUseCasePage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="use case" name="Internal tools" hue="steel" />}
        title="Dashboards and admin panels your team actually uses."
        lede={
          <>
            Live web UIs for ops, support, and finance, built by whoever
            owns the process. One folder of Python. No frontend team, no
            deploy pipeline, no Retool bill.
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

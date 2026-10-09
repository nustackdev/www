import { Page, Header, Body, Chapter, SectionHead } from '@/components/page';
import { PageBadge } from '@www/shared/components/meta/PageBadge';

export const metadata = {
  title: 'AI agents: long-running agents with memory that persists',
};

export default function AiAgentsUseCasePage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="use case" name="AI agents" hue="plum" />}
        title="Long-running agents with memory that persists."
        lede={
          <>
            You want agents that keep their context, tools, and world
            across restarts. No vector-db-of-the-week, no scaffolding
            rewrites, no glue between the loop and the store.
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

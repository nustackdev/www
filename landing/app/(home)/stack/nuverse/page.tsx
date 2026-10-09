import type { Metadata } from 'next';
import { Page, Header, Body, Chapter, Section, SectionHead } from '@/components/page';
import { PageBadge } from '@www/shared/components/meta/PageBadge';
import { Button } from '@www/shared/components/controls/Button';
import { CtaRow } from '@www/shared/components/layout/CtaRow';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { GainGrid } from '@www/shared/components/chapters/GainGrid';
import { pageOG, ogPageImage } from '@/lib/og';
import { PAGE_OG } from '@/lib/og-pages';

export const metadata: Metadata = pageOG({
  title: PAGE_OG.nuverse.title,
  description: PAGE_OG.nuverse.description,
  image: ogPageImage('nuverse'),
  path: '/stack/nuverse',
});

const SRC = 'https://github.com/nustackdev/nuspace/tree/main/pkgs/nuverse';

export default function NuversePage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="stack" name="nuverse" hue="sage" />}
        title="The nuspace ecosystem."
        lede={
          <>
            The planes <code>+</code> creates and the snippets <code>/</code>{' '}
            inserts. Installed with nuspace, built from the same cells as
            everything else.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="outline" href={SRC}>
              <GithubMark size={14} />
              <span>Source</span>
            </Button>
          </CtaRow>
        }
      />
      <Body>
        <Chapter>
          <SectionHead title="Planes." lede={<>Apps in nuspace: data, seeded when created, with all their behavior in their cells.</>} />
          <Section>
            <GainGrid
              hue="sage"
              cols={3}
              items={[
                { kicker: 'plain', title: 'An empty plane.', body: 'Start from nothing, add cells.' },
                { kicker: 'jobs', title: 'Jobs.', body: 'Programs that run on their own.' },
                { kicker: 'runs', title: 'Runs.', body: 'What ran, where, how it went.' },
                { kicker: 'workers', title: 'Workers.', body: 'The processes your space runs on.' },
                { kicker: 'planes', title: 'Planes.', body: 'Every plane in the space.' },
                { kicker: 'cc_chat', title: 'Claude Code chat.', body: 'An agent at work, in a plane.' },
              ]}
            />
          </Section>
        </Chapter>
        <Chapter>
          <SectionHead title="Snippets." lede={<>Cells you insert into any plane.</>} />
          <Section>
            <GainGrid
              hue="sage"
              cols={3}
              items={[
                { kicker: 'text', title: 'Prose, code, inputs.', body: 'prose, code, text_input, password.' },
                { kicker: 'data', title: 'Tables and values.', body: 'table, number, date, ticker, converter.' },
                { kicker: 'controls', title: 'Controls.', body: 'slider, switch, select.' },
                { kicker: 'programs', title: 'Programs.', body: 'program: a Nu program as a cell.' },
                { kicker: 'lenses', title: 'Lenses.', body: 'lens, cell_lens, plane_lens: look into anything.' },
              ]}
            />
          </Section>
        </Chapter>
      </Body>
    </Page>
  );
}

import { BookOpen } from 'lucide-react';
import { Page, Header, Body, Chapter, Section, SectionHead } from '@/components/page';
import { Description } from '@www/shared/components/text';
import { SilverWovenName } from '@www/shared/components/meta/SilverWovenName';
import { PageBadge } from '@www/shared/components/meta/PageBadge';
import { RelationsLine } from '@/components/meta/RelationsLine';
import { CodeSample } from '@www/shared/components/media/CodeSample';
import { Button } from '@www/shared/components/controls/Button';
import { LinkCard } from '@www/shared/components/controls/LinkCard';
import { CtaRow } from '@www/shared/components/layout/CtaRow';
import { LinkGrid } from '@www/shared/components/layout/LinkGrid';
import { GainGrid } from '@www/shared/components/chapters/GainGrid';
import { SnippetBeat } from '@www/shared/components/chapters/SnippetBeat';
import { TryIt } from '@/components/chapters/TryIt';
import { LikeThisBlock } from '@/components/chapters/LikeThisBlock';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { FABRIC } from '@www/shared/lib/stack/fabrics';
import { UI_COUNTER_LINES } from './ui.sample.data';

import { pageOG, ogFabricImage } from '@/lib/og';

export const metadata = pageOG({
  title: 'nustd.ui — the browser surface for Nu apps',
  description:
    'Browser widgets as typed Python attributes. Declare a Page, hang buttons, tables, inputs, charts. Writes redraw the browser, clicks push back.',
  image: ogFabricImage('ui'),
  path: '/fabrics/ui',
});

export default function UiFabricPage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="fabric" name="nustd.ui" hue={FABRIC.ui.hue} />}
        tags={<RelationsLine label="Powered by" refs={FABRIC.ui.poweredBy} />}
        title="The browser surface for Nu apps."
        lede={
          <>
            Write your widgets in Python. Nu draws them in the browser.
            Clicks and edits come back to you as writes on the same widget.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="solid" href={FABRIC.ui.docs}>
              <BookOpen size={14} aria-hidden />
              <span>Read the reference</span>
            </Button>
            <Button variant="outline" href={FABRIC.ui.src}>
              <GithubMark size={14} />
              <span>See the code</span>
            </Button>
          </CtaRow>
        }
      />

      <Body>
        {/* Chapter 1 — PAS + capability code */}
        <Chapter>
          <SectionHead
            title="See it."
            lede={
              <>
                One class per page. One attribute per widget. Set a
                value, the browser shows it.
              </>
            }
          />

          <SnippetBeat
            hue={FABRIC.ui.hue}
            prose={
              <>
                <Description>
                  Every widget is a Ref you hang off a class. <code>StatRef</code>,{' '}
                  <code>TableRef</code>, <code>ButtonRef</code>,{' '}
                  <code>InputRef</code>, <code>ChartRef</code>, and about
                  thirty more. Subclass <code>Row</code>,{' '}
                  <code>Card</code>, or <code>Page</code> to compose your
                  own layouts.
                </Description>
                <Description>
                  Writes from Python land in the browser. Clicks and edits
                  in the browser come back to Python through the same
                  Ref. One wire protocol handled for you, async only.
                </Description>
                <Description>
                  See: a small dashboard with a stats row, a table, and
                  a refresh button. One Python file, no JavaScript.
                </Description>
              </>
            }
            code={<CodeSample filename="dashboard.py" lines={UI_COUNTER_LINES} />}
          />
        </Chapter>

        {/* Chapter 2 — What your program gains */}
        <Chapter>
          <SectionHead
            title="What your program gains."
            lede={<>Four properties once your surface lives on nustd.ui.</>}
          />

          <Section>
            <GainGrid
              hue={FABRIC.ui.hue}
              items={[
                {
                  kicker: 'one language full stack',
                  title: 'Same tree on both sides of the wire.',
                  body: (
                    <>
                      Server-side Python declares the widgets. The client
                      renders them. One vocabulary top to bottom, no
                      template DSL, no client codegen.
                    </>
                  ),
                },
                {
                  kicker: 'component kit built in',
                  title: 'About thirty widgets, sensible defaults.',
                  body: (
                    <>
                      Inputs, outputs, layouts, charts. <code>ButtonRef</code>,{' '}
                      <code>TableRef</code>, <code>InputRef</code>,{' '}
                      <code>ChartRef</code>, <code>Card</code>,{' '}
                      <code>Column</code>, <code>Row</code>. Compose
                      your own by subclassing <code>Section</code>.
                    </>
                  ),
                },
                {
                  kicker: 'reactive by default',
                  title: 'Bind once, state and ui stay in sync.',
                  body: (
                    <>
                      Any attribute emits on change. Wire a state
                      attribute to a widget attribute and both directions
                      flow through the same hook. No polling, no manual
                      invalidation.
                    </>
                  ),
                },
                {
                  kicker: 'no client build step',
                  title: 'No npm, no bundler, no compile.',
                  body: (
                    <>
                      The Python process serves the page. You never open a{' '}
                      <code>package.json</code>. Just{' '}
                      <code>python app.py</code>.
                    </>
                  ),
                },
              ]}
            />
          </Section>
        </Chapter>

        {/* Chapter 3 — Combines well with */}
        <Chapter>
          <SectionHead
            title="Combines well with."
            lede={
              <>
                Widgets are Refs. Data is Refs. Pick a state fabric, bind
                it once, watch the surface follow.
              </>
            }
          />

          <Section>
            <LinkGrid>
              <LinkCard href="/fabrics/kv" name="nustd.kv" hue={FABRIC.kv.hue} tagline="Durable state, on disk.">
                Bind widget slots to kv Refs. Restart the process, the surface snaps back to where it was.
              </LinkCard>

              <LinkCard href="/fabrics/mem" name="nustd.mem" hue={FABRIC.mem.hue} tagline="Hot state, in-process.">
                For cache, session state, and anything that does not need to survive a restart.
              </LinkCard>

              <LinkCard href="/fabrics/http" name="nustd.http" hue={FABRIC.http.hue} tagline="Refs on the wire.">
                Expose a Ref as an HTTP endpoint, or pull one from an outside service. The surface does not care where data lives.
              </LinkCard>
            </LinkGrid>
          </Section>
        </Chapter>

        <TryIt />
        <LikeThisBlock />
      </Body>
    </Page>
  );
}

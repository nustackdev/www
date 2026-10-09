import { BookOpen } from 'lucide-react';
import { Page, Header, Body, Chapter, Section, SectionHead } from '@/components/page';
import { Description } from '@www/shared/components/text';
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
import { FABRIC } from '@/lib/fabrics';
import { HTTP_SAMPLE_LINES } from './http.sample.data';

import { pageOG, ogFabricImage } from '@/lib/og';

export const metadata = pageOG({
  title: 'nustd.http: plug an HTTP API into Nu',
  description:
    'You need to talk to an HTTP API. Name the endpoints once and call them from your Nu program like anything else.',
  image: ogFabricImage('http'),
  path: '/fabrics/http',
});

export default function HttpFabricPage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="fabric" name="nustd.http" hue={FABRIC.http.hue} />}
        tags={<RelationsLine label="Powered by" refs={FABRIC.http.poweredBy} />}
        title="Plug an HTTP API into Nu."
        lede={
          <>
            You need to talk to an HTTP API. Name the endpoints once and call
            them from your Nu program like anything else.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="solid" href={FABRIC.http.docs}>
              <BookOpen size={14} aria-hidden />
              <span>Read the reference</span>
            </Button>
            <Button variant="outline" href={FABRIC.http.src}>
              <GithubMark size={14} />
              <span>See the code</span>
            </Button>
          </CtaRow>
        }
      />

      <Body>
        {/* Chapter 1 — capability + code */}
        <Chapter>
          <SectionHead
            title="Point Nu at your API."
            lede={
              <>
                List the endpoints you need. Give Nu the base URL. Now inside
                your Nu program, calling an endpoint hits the real API and
                hands the response back.
              </>
            }
          />

          <SnippetBeat
            hue={FABRIC.http.hue}
            prose={
              <>
                <Description>
                  Start with the endpoints you already hit — GET this, POST
                  that. Name them and give each one its path.
                </Description>
                <Description>
                  Hand Nu the base URL. That is the whole client — no request
                  builder, no wrapper class per API.
                </Description>
                <Description>
                  Call an endpoint anywhere in the program. The response comes
                  back parsed and ready for whatever comes next.
                </Description>
              </>
            }
            code={<CodeSample filename="github.py" lines={HTTP_SAMPLE_LINES} />}
          />
        </Chapter>

        {/* Chapter 2 — What your program gains */}
        <Chapter>
          <SectionHead
            title="What you get out of it."
            lede={<>A few things that fall out once your API speaks Nu.</>}
          />

          <Section>
            <GainGrid
              hue={FABRIC.http.hue}
              items={[
                {
                  title: 'One shape for every verb.',
                  body: 'GET, POST, PUT, PATCH, DELETE all read the same in your code. No client class per API, no request builder to learn.',
                },
                {
                  title: 'Sync or async, your call.',
                  body: 'Write the program however you write it today. Nu runs sync programs and async programs the same way, and picks the right HTTP path underneath.',
                },
                {
                  title: 'Plays with everything else.',
                  body: 'A response is a normal Nu value the moment you get it. Feed it into a live UI, drop it in storage, or hand it to the next call.',
                },
              ]}
            />
          </Section>
        </Chapter>

        {/* Chapter 3 — Combines well with */}
        <Chapter>
          <SectionHead
            title="Goes well with."
            lede={
              <>
                Once your responses are Nu values, the rest of the stack picks
                them up.
              </>
            }
          />

          <Section>
            <LinkGrid>
              <LinkCard
                href="/fabrics/ui"
                name="nustd.ui"
                hue={FABRIC.ui.hue}
                tagline="See responses on screen."
              >
                Wire a fetch straight into a live widget. Refresh the value,
                the page redraws. No render code in between.
              </LinkCard>

              <LinkCard
                href="/fabrics/kv"
                name="nustd.kv"
                hue={FABRIC.kv.hue}
                tagline="Remember responses on disk."
              >
                Cache what you fetched. Track cursors between polls. Reload
                later and pick up where you left off.
              </LinkCard>

              <LinkCard
                href="/fabrics/proxy"
                name="nustd.proxy"
                hue={FABRIC.proxy.hue}
                tagline="Use one client from many processes."
              >
                Keep the client in one process, call it from others. Your
                code does not notice the difference.
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

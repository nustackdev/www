import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import {
  Page,
  Header,
  Body,
  Chapter,
  Section,
  SectionHead,
} from '@/components/page';
import { Tagline, Description } from '@www/shared/components/text';
import { PageBadge } from '@www/shared/components/meta/PageBadge';
import { RelationsLine } from '@/components/meta/RelationsLine';
import { CodeSample, type CodeTok } from '@www/shared/components/media/CodeSample';
import { GainGrid } from '@www/shared/components/chapters/GainGrid';
import { SnippetBeat } from '@www/shared/components/chapters/SnippetBeat';
import { TryIt } from '@/components/chapters/TryIt';
import { LikeThisBlock } from '@/components/chapters/LikeThisBlock';
import { LinkCard } from '@www/shared/components/controls/LinkCard';
import { LinkGrid } from '@www/shared/components/layout/LinkGrid';
import { CtaRow } from '@www/shared/components/layout/CtaRow';
import { Button } from '@www/shared/components/controls/Button';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { FABRIC } from '@www/shared/lib/stack/fabrics';

import { pageOG, ogFabricImage } from '@/lib/og';

export const metadata: Metadata = pageOG({
  title: 'nustd.ws_server - websocket server fabric',
  description:
    'Run a websocket server from Nu. Every client that connects gets its own arm of the tree, and you define the protocol.',
  image: ogFabricImage('ws_server'),
  path: '/fabrics/ws_server',
});

const HUE = FABRIC.ws_server.hue;

const k = (t: string): CodeTok => ({ c: 'kw', t });
const nu = (t: string): CodeTok => ({ c: 'nu', t });
const str = (t: string): CodeTok => ({ c: 'str', t });
const p = (t: string): CodeTok => ({ t });
const cmt = (t: string): CodeTok => ({ c: 'cmt', t });

const SNIPPET: CodeTok[][] = [
  [k('import'), p(' asyncio')],
  [k('import'), p(' nu')],
  [k('import'), p(' nustd')],
  [],
  [cmt('# the arm one connection gets, handed its own transport')],
  [p('arm = '), nu('nustd.ws_server.SessionFor'), p('(body=handle_client)')],
  [],
  [cmt('# boot the host, then run that arm once per live connection')],
  [p('app = '), nu('nu.With'), p('(')],
  [p('    '), nu('nustd.ws_server.listen'), p('(session_cls=EchoSession, port='), str('8765'), p('),')],
  [p('    body='), nu('nustd.ws_server.sessions_fold'), p('(arm),')],
  [p(')')],
  [p('asyncio.run('), nu('nu.arun'), p('(app))')],
];

export default function WsServerFabricPage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="fabric" name="nustd.ws_server" hue={HUE} />}
        tags={<RelationsLine label="Powered by" refs={FABRIC.ws_server.poweredBy} />}
        title={<>Serve websocket clients straight from your program.</>}
        lede={
          <>
            Run a websocket server from your Nu tree. Every client that
            connects gets its own arm of the program, and you decide what
            travels over the wire.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="solid" href={FABRIC.ws_server.docs}>
              <BookOpen size={14} aria-hidden />
              <span>Read the reference</span>
            </Button>
            <Button variant="outline" href={FABRIC.ws_server.src}>
              <GithubMark size={14} />
              <span>See the code</span>
            </Button>
          </CtaRow>
        }
      />

      <Body>
        {/* Chapter 1 — See it */}
        <Chapter>
          <SectionHead
            title="See it."
            lede={
              <>
                The server keeps track of who is connected. One arm of
                your program runs for each client, and ends when they go.
              </>
            }
          />
          <SnippetBeat
            hue={HUE}
            prose={
              <>
                <Tagline>The lifetime of an arm is the lifetime of a socket.</Tagline>
                <Description>
                  A connection opens and an arm of your tree starts. It
                  closes and the arm ends. That holds in both directions,
                  so there is no reaping pass and no orphan to find later.
                </Description>
                <Description>
                  Nothing about the messages is fixed for you. The browser
                  UI is this fabric with a protocol stacked on top, and
                  yours stacks the same way.
                </Description>
              </>
            }
            code={<CodeSample filename="server.py" lines={SNIPPET} />}
          />
        </Chapter>

        {/* Chapter 2 — Gains */}
        <Chapter>
          <SectionHead
            title="What you can do with it."
            lede={<>A real websocket server, written as part of the program.</>}
          />
          <Section>
            <GainGrid
              hue={HUE}
              items={[
                {
                  kicker: 'any protocol',
                  title: 'Speak whatever you want.',
                  body: 'The fabric handles the sockets and hands each arm its connection. What you send over it is yours: JSON, msgpack, a binary format you invented.',
                },
                {
                  kicker: 'per connection',
                  title: 'One arm per client.',
                  body: 'Each live connection runs its own arm of the tree, with its own state. Clients cannot see each other unless a fabric you bound lets them.',
                },
                {
                  kicker: 'bracketed',
                  title: 'Close is not your problem.',
                  body: 'Sockets open and close inside the bracket, and the arm follows. No lifecycle callbacks, no cleanup you have to keep in sync with teardown.',
                },
              ]}
            />
          </Section>
        </Chapter>

        {/* Chapter 3 — Combines with */}
        <Chapter>
          <SectionHead
            title="Combines well with."
            lede={
              <>
                ws_server holds the connections. Other fabrics give each
                client something worth saying.
              </>
            }
          />
          <Section>
            <LinkGrid>
              <LinkCard href="/fabrics/ui" name="nustd.ui" hue={FABRIC.ui.hue} tagline="Reactive web UI.">
                The browser UI is ws_server with a wire codec and an SPA on
                top. One live tab is one arm.
              </LinkCard>
              <LinkCard href="/fabrics/proxy" name="nustd.proxy" hue={FABRIC.proxy.hue} tagline="Fabrics on the wire.">
                Put a bound fabric on the network when you want remote
                calls rather than a protocol of your own.
              </LinkCard>
              <LinkCard href="/fabrics/kv" name="nustd.kv" hue={FABRIC.kv.hue} tagline="Durable state fabric.">
                Back the connections with state that outlives them, and
                push changes out as they land.
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

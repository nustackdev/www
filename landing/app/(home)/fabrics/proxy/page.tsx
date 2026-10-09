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
import { CodeSample } from '@www/shared/components/media/CodeSample';
import { LinkCard } from '@www/shared/components/controls/LinkCard';
import { LinkGrid } from '@www/shared/components/layout/LinkGrid';
import { CtaRow } from '@www/shared/components/layout/CtaRow';
import { Button } from '@www/shared/components/controls/Button';
import { GainGrid } from '@www/shared/components/chapters/GainGrid';
import { SnippetBeat } from '@www/shared/components/chapters/SnippetBeat';
import { TryIt } from '@/components/chapters/TryIt';
import { LikeThisBlock } from '@/components/chapters/LikeThisBlock';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { FABRIC } from '@www/shared/lib/stack/fabrics';
import { pageOG, ogFabricImage } from '@/lib/og';
import type { CodeTok } from '@www/shared/components/media/CodeSample';

export const metadata = pageOG({
  title: `${FABRIC.proxy.name} — ${FABRIC.proxy.tagline}`,
  description: FABRIC.proxy.description,
  image: ogFabricImage('proxy'),
  path: '/fabrics/proxy',
});

const HUE = FABRIC.proxy.hue;

const SNIPPET: CodeTok[][] = [
  [{ c: 'kw', t: 'import' }, { t: ' nu' }],
  [{ c: 'kw', t: 'import' }, { t: ' nustd' }],
  [],
  [{ c: 'cmt', t: '# inside the spawned process: bind a fabric, expose it on a port' }],
  [{ t: 'host_init = ' }, { c: 'nu', t: 'nu.With' }, { t: '(' }],
  [
    { t: '    ' },
    { c: 'nu', t: 'nu.Provide' },
    { t: '(' },
    { c: 'nu', t: 'nustd.kv.RocksDBStorage' },
    { t: ', {' },
    { c: 'str', t: '"path"' },
    { t: ': ' },
    { c: 'str', t: '"/data/counters"' },
    { t: '}),' },
  ],
  [
    { t: '    ' },
    { c: 'nu', t: 'nu.Provide' },
    { t: '(' },
    { c: 'nu', t: 'nustd.kv.Navigator' },
    { t: ', {}),' },
  ],
  [
    { t: '    ' },
    { c: 'nu', t: 'nu.Provide' },
    { t: '(' },
    { c: 'nu', t: 'nustd.proxy.InvisiblesServer' },
    { t: ', {' },
    { c: 'str', t: '"target"' },
    { t: ': ' },
    { c: 'nu', t: 'nustd.kv.Navigator' },
    { t: ', ' },
    { c: 'str', t: '"address"' },
    { t: ': ' },
    { c: 'str', t: '"0.0.0.0:19000"' },
    { t: '}),' },
  ],
  [{ t: ')' }],
  [],
  [{ c: 'cmt', t: '# driver: spawn the process, then reach its fabric as if it lived here' }],
  [
    { t: 'tree = ' },
    { c: 'nu', t: 'nu.Provide' },
    { t: '(' },
    { c: 'nu', t: 'nustd.mp.MpWorker' },
    { t: ', {' },
    { c: 'str', t: '"init"' },
    { t: ': host_init},' },
  ],
  [
    { t: '    ' },
    { c: 'nu', t: 'nustd.proxy.InvisiblesProxy' },
    { t: '(' },
    { c: 'nu', t: 'nustd.kv.Navigator' },
    { t: ', address=' },
    { c: 'str', t: '"0.0.0.0:19000"' },
    { t: ',' },
  ],
  [{ t: '        bump,  ' }, { c: 'cmt', t: '# any Nu body that touches Navigator now runs on the host' }],
  [{ t: '    ),' }],
  [{ t: ')' }],
  [
    { c: 'nu', t: 'nu.arun' },
    { t: '(tree)' },
  ],
];

export default function ProxyFabricPage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="fabric" name="nustd.proxy" hue={HUE} />}
        tags={<RelationsLine label="Powered by" refs={FABRIC.proxy.poweredBy} />}
        title="Any Nu fabric, across processes."
        lede={
          <>
            Bind a fabric on one process. Reach it from another. Same Refs,
            same calls, over TCP or a Unix socket.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="solid" href={FABRIC.proxy.docs}>
              <BookOpen size={14} aria-hidden />
              <span>Read the reference</span>
            </Button>
            <Button variant="outline" href={FABRIC.proxy.src}>
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
                Pair it with <code>nustd.mp</code> or <code>nustd.cluster</code> to
                spin the other process. Proxy hosts the fabric there and
                wires it back to your tree.
              </>
            }
          />

          <SnippetBeat
            hue={HUE}
            prose={
              <>
                <Tagline>Any fabric, hosted in another process.</Tagline>
                <Description>
                  nustd.proxy lets you host any fabric in another process. Your
                  Nu tree flows the same way as if the fabric were right
                  here.
                </Description>
                <Description>
                  Wrap it with the proxy provider and you are done. No
                  boilerplate, no client to keep in sync.
                </Description>
              </>
            }
            code={<CodeSample filename="two_procs.py" lines={SNIPPET} />}
          />
        </Chapter>

        {/* Chapter 2 — Gains */}
        <Chapter>
          <SectionHead
            title="What you can do with it."
            lede={
              <>
                One fabric, hosted once, reachable from anywhere in your
                system.
              </>
            }
          />
          <Section>
            <GainGrid
              hue={HUE}
              items={[
                {
                  kicker: 'shared service',
                  title: 'Host a shared fabric.',
                  body: 'Run a fabric as its own always-on service. Anyone else can attach and use it whenever they need to.',
                },
                {
                  kicker: 'independent lifetime',
                  title: 'Do not die with the main process.',
                  body: 'The service lives on its own. Main app restarts, deploys, crashes — the hosted fabric keeps running with all its state intact.',
                },
                {
                  kicker: 'anywhere',
                  title: 'Local box or across a rack.',
                  body: 'Same wrap, different address. The hosted service does not care where callers live, they just point at it.',
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
                Proxy needs a way to spin the other process. Pair it with a
                compute fabric on one side and a state or UI fabric on the
                other.
              </>
            }
          />
          <Section>
            <LinkGrid>
              <LinkCard
                href="/fabrics/mp"
                name="nustd.mp"
                hue={FABRIC.mp.hue}
                tagline="Local subprocess fabric."
              >
                Spawn a local process, install the proxy server in its init
                tree, done. Zero-dep, no cluster needed.
              </LinkCard>
              <LinkCard
                href="/fabrics/cluster"
                name="nustd.cluster"
                hue={FABRIC.cluster.hue}
                tagline="Ray cluster fabric."
              >
                Same shape as nustd.mp, but the process lives on a Ray worker
                somewhere in the cluster. Proxy wires it back.
              </LinkCard>
              <LinkCard
                href="/fabrics/kv"
                name="nustd.kv"
                hue={FABRIC.kv.hue}
                tagline="Durable state fabric."
              >
                Host one KV store. Every other process reads and writes it
                as a local Ref. No connection pool to manage.
              </LinkCard>
              <LinkCard
                href="/fabrics/ui"
                name="nustd.ui"
                hue={FABRIC.ui.hue}
                tagline="Live browser widgets."
              >
                Serve a UI fabric from one process. Other processes push
                widget state into the same live browser.
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

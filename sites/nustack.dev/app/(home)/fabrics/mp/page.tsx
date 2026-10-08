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
import { FABRIC } from '@/lib/fabrics';

import { pageOG, ogFabricImage } from '@/lib/og';

export const metadata: Metadata = pageOG({
  title: 'nustd.mp - local multiprocessing fabric',
  description:
    'Run Nu trees in parallel across local processes. Zero-dep, no cluster required. Same shape as nustd.cluster.',
  image: ogFabricImage('mp'),
  path: '/fabrics/mp',
});

const HUE = FABRIC.mp.hue;

const k = (t: string): CodeTok => ({ c: 'kw', t });
const nu = (t: string): CodeTok => ({ c: 'nu', t });
const str = (t: string): CodeTok => ({ c: 'str', t });
const p = (t: string): CodeTok => ({ t });
const cmt = (t: string): CodeTok => ({ c: 'cmt', t });

const SNIPPET: CodeTok[][] = [
  [k('import'), p(' nu')],
  [k('import'), p(' nustd')],
  [],
  [p('work = ...  '), cmt('# your Nu tree')],
  [],
  [cmt('# spawn two local worker processes, teleport a body to each')],
  [p('program = '), nu('nu.ProvideList'), p('('), nu('nustd.mp.MpWorker'), p(', [')],
  [p('    {'), str('"name"'), p(': '), str('"worker-0"'), p('},')],
  [p('    {'), str('"name"'), p(': '), str('"worker-1"'), p('},')],
  [p('],')],
  [p('    '), nu('nu.Sequential'), p('(')],
  [p('        '), nu('nustd.mp.Teleport'), p('(work, target=0),')],
  [p('        '), nu('nustd.mp.Teleport'), p('(work, target=1),')],
  [p('    ),')],
  [p(')')],
  [nu('nu.run'), p('(program)')],
];

export default function MpFabricPage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="fabric" name="nustd.mp" hue={HUE} />}
        tags={<RelationsLine label="Powered by" refs={FABRIC.mp.poweredBy} />}
        title={<>Run your Nu program across local processes.</>}
        lede={
          <>
            Wrap any Nu tree in <code>Teleport</code>. It runs in a spawned
            child process. Zero-dep, single-host, all cores.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="solid" href={FABRIC.mp.docs}>
              <BookOpen size={14} aria-hidden />
              <span>Read the reference</span>
            </Button>
            <Button variant="outline" href={FABRIC.mp.src}>
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
                Provision workers by tag. Send any subtree to a tagged
                worker. Stdlib multiprocessing under the hood.
              </>
            }
          />
          <SnippetBeat
            hue={HUE}
            prose={
              <>
                <Tagline>Your program, running across local processes.</Tagline>
                <Description>
                  nustd.mp spawns real child processes and lets you teleport
                  any part of your Nu tree onto them. The body does not
                  know or care where it runs.
                </Description>
                <Description>
                  Wrap it with the worker provider, point at a worker,
                  done. Zero-dep. No cluster, no Ray, no infra.
                </Description>
              </>
            }
            code={<CodeSample filename="parallel.py" lines={SNIPPET} />}
          />
        </Chapter>

        {/* Chapter 2 — Gains */}
        <Chapter>
          <SectionHead
            title="What you can do with it."
            lede={
              <>
                One import turns a single-process program into a
                multi-process one.
              </>
            }
          />
          <Section>
            <GainGrid
              hue={HUE}
              items={[
                {
                  kicker: 'parallel',
                  title: 'Use all your cores.',
                  body: 'One driver, many workers. Split the work by tag and let each core chew through its slice. No GIL in the way.',
                },
                {
                  kicker: 'isolation',
                  title: 'Crashes stay contained.',
                  body: 'A worker blows up? The driver survives. Restart the worker, keep going. Real process boundaries between the parts.',
                },
                {
                  kicker: 'no infra',
                  title: 'Prototype the shape you will ship.',
                  body: 'Same tree, same Teleport, same tags as nustd.cluster. Design your topology on your laptop, swap in Ray when you outgrow one box.',
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
                mp runs the local processes. Other fabrics hold the state
                and wire the processes together.
              </>
            }
          />
          <Section>
            <LinkGrid>
              <LinkCard href="/fabrics/cluster" name="nustd.cluster" hue={FABRIC.cluster.hue} tagline="Ray cluster fabric.">
                Same tree, same Teleport, cluster-scale compute. Move from
                one box to many without rewriting the topology.
              </LinkCard>
              <LinkCard href="/fabrics/proxy" name="nustd.proxy" hue={FABRIC.proxy.hue} tagline="Fabrics on the wire.">
                Host a fabric inside an mp worker, reach it from the driver
                or from other workers. Turns a worker into a shared service.
              </LinkCard>
              <LinkCard href="/fabrics/kv" name="nustd.kv" hue={FABRIC.kv.hue} tagline="Durable state fabric.">
                Persist worker results, weights, metrics. Workers share the
                same tree of Refs, no manual handoff.
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

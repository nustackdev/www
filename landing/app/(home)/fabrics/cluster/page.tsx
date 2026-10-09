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
  title: 'nustd.cluster - cluster compute fabric',
  description:
    'Run any Nu program on a Ray cluster. Wrap a tree in Teleport and it executes on a remote worker, unchanged.',
  image: ogFabricImage('cluster'),
  path: '/fabrics/cluster',
});

const HUE = FABRIC.cluster.hue;

const k = (t: string): CodeTok => ({ c: 'kw', t });
const nu = (t: string): CodeTok => ({ c: 'nu', t });
const str = (t: string): CodeTok => ({ c: 'str', t });
const p = (t: string): CodeTok => ({ t });
const cmt = (t: string): CodeTok => ({ c: 'cmt', t });

const SNIPPET: CodeTok[][] = [
  [k('import'), p(' nu')],
  [k('import'), p(' nustd')],
  [],
  [p('train_epoch = ...  '), cmt('# your Nu tree')],
  [],
  [cmt('# spin up two Ray workers, then teleport a body to each')],
  [p('program = '), nu('nu.Provide'), p('('), nu('nustd.cluster.RayCluster'), p(', {'), str('"address"'), p(': '), str('"auto"'), p('},')],
  [p('    '), nu('nu.ProvideList'), p('('), nu('nustd.cluster.RayService'), p(', [')],
  [p('        {'), str('"actor_name"'), p(': '), str('"worker-0"'), p(', '), str('"num_cpus"'), p(': 4},')],
  [p('        {'), str('"actor_name"'), p(': '), str('"worker-1"'), p(', '), str('"num_cpus"'), p(': 4},')],
  [p('    ], '), nu('nu.Sequential'), p('(')],
  [p('        '), nu('nustd.cluster.Teleport'), p('(train_epoch, target=0),')],
  [p('        '), nu('nustd.cluster.Teleport'), p('(train_epoch, target=1),')],
  [p('    )),')],
  [p(')')],
  [nu('nu.arun'), p('(program)')],
];

export default function ClusterFabricPage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="fabric" name="nustd.cluster" hue={HUE} />}
        tags={<RelationsLine label="Powered by" refs={FABRIC.cluster.poweredBy} />}
        title={<>Run your Nu program on a distributed cluster.</>}
        lede={
          <>
            Wrap any Nu tree in <code>Teleport</code>. It runs on a remote
            worker, same code, cluster-scale compute.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="solid" href={FABRIC.cluster.docs}>
              <BookOpen size={14} aria-hidden />
              <span>Read the reference</span>
            </Button>
            <Button variant="outline" href={FABRIC.cluster.src}>
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
                worker. Same shape as any other Nu tree.
              </>
            }
          />
          <SnippetBeat
            hue={HUE}
            prose={
              <>
                <Tagline>Your program, running on the cluster.</Tagline>
                <Description>
                  nustd.cluster lets you provision Ray workers as fabric
                  services and teleport any part of your Nu tree onto them.
                  The body does not know or care where it runs.
                </Description>
                <Description>
                  Wrap it with the cluster provider, point at a worker, done.
                  No task decorators, no result futures to juggle.
                </Description>
              </>
            }
            code={<CodeSample filename="train.py" lines={SNIPPET} />}
          />
        </Chapter>

        {/* Chapter 2 — Gains */}
        <Chapter>
          <SectionHead
            title="What you can do with it."
            lede={
              <>
                One import turns a laptop-shaped program into a
                cluster-shaped one.
              </>
            }
          />
          <Section>
            <GainGrid
              hue={HUE}
              items={[
                {
                  kicker: 'push heavy work off',
                  title: 'Send the slow parts to workers.',
                  body: 'Model training, big data crunching, long-running jobs. Keep the driver light, let the cluster do the heavy lifting.',
                },
                {
                  kicker: 'scale up',
                  title: 'Same code, one worker or a hundred.',
                  body: 'Add another entry to the worker list and target it. No rewrite, no framework switch. Prototype on one box, ship on the cluster.',
                },
                {
                  kicker: 'named workers',
                  title: 'Pin work to a role.',
                  body: 'Ledger writer, indexer, ui host, anything. Provision each once, address by tag, send the right work to the right place.',
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
                Cluster runs the work. Other fabrics hold the state and wire
                the processes together.
              </>
            }
          />
          <Section>
            <LinkGrid>
              <LinkCard href="/fabrics/kv" name="nustd.kv" hue={FABRIC.kv.hue} tagline="Durable state fabric.">
                Persist results, weights, metrics, job state. Workers share
                the same tree of Refs across the cluster.
              </LinkCard>
              <LinkCard href="/fabrics/proxy" name="nustd.proxy" hue={FABRIC.proxy.hue} tagline="Fabrics on the wire.">
                Host a fabric on one worker, reach it from everywhere else.
                Perfect pair when driver, workers, and store all live apart.
              </LinkCard>
              <LinkCard href="/fabrics/mp" name="nustd.mp" hue={FABRIC.mp.hue} tagline="Local process fabric.">
                Same shape as nustd.cluster, no Ray needed. Prototype your
                topology on one box before you spin the cluster.
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

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
  title: 'nustd.mp_pool - worker pool fabric',
  description:
    'One Provide owns N worker processes. Launch one, kill one, run a tree on the worker you name.',
  image: ogFabricImage('mp_pool'),
  path: '/fabrics/mp_pool',
});

const HUE = FABRIC.mp_pool.hue;

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
  [cmt('# the pool is the fabric: one bracket owns every worker')],
  [p('program = '), nu('nu.Provide'), p('('), nu('nustd.mp_pool.WorkerPool'), p(', {'), str('"name"'), p(': '), str('"pool"'), p('},')],
  [p('    '), nu('nu.Let'), p('('), str('"w"'), p(', '), nu('nustd.mp_pool.Launch'), p('(),')],
  [p('        '), nu('nustd.mp_pool.Teleport'), p('(body=work, worker='), nu('nu.AttrRef'), p('('), str('"w"'), p(')),')],
  [p('    ),')],
  [p(')')],
  [nu('nu.run'), p('(program)')],
];

export default function MpPoolFabricPage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="fabric" name="nustd.mp_pool" hue={HUE} />}
        tags={<RelationsLine label="Powered by" refs={FABRIC.mp_pool.poweredBy} />}
        title={<>Own a pool of processes, from inside the tree.</>}
        lede={
          <>
            One <code>Provide</code> holds every worker. Launch one, kill
            one, send a tree to the one you name. No scheduler to run.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="solid" href={FABRIC.mp_pool.docs}>
              <BookOpen size={14} aria-hidden />
              <span>Read the reference</span>
            </Button>
            <Button variant="outline" href={FABRIC.mp_pool.src}>
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
                Launch a worker and get its id back. Point a Teleport at
                that id. The bracket closing kills every worker it opened.
              </>
            }
          />
          <SnippetBeat
            hue={HUE}
            prose={
              <>
                <Tagline>A pool that lives in the program, not beside it.</Tagline>
                <Description>
                  nustd.mp is the fabric of one process, and its whole
                  lifecycle is the bracket. nustd.mp_pool is the sibling
                  where the pool itself is the fabric, so it owns
                  interactions over its contents.
                </Description>
                <Description>
                  Launch, kill, and run-on-worker are statements about what
                  the fabric holds. A worker id is a value in the tree, so
                  the tree decides where work lands.
                </Description>
              </>
            }
            code={<CodeSample filename="pool.py" lines={SNIPPET} />}
          />
        </Chapter>

        {/* Chapter 2 — Gains */}
        <Chapter>
          <SectionHead
            title="What you can do with it."
            lede={<>A worker count that answers to the program that needs it.</>}
          />
          <Section>
            <GainGrid
              hue={HUE}
              items={[
                {
                  kicker: 'elastic',
                  title: 'Size the pool while it runs.',
                  body: 'Launch a worker when the queue grows, kill one when it drains. The pool is a value you interact with, not a constant you set at boot.',
                },
                {
                  kicker: 'addressed',
                  title: 'Send work to a worker you name.',
                  body: 'Launch hands back an id, and the id is an ordinary child in the tree. Route a body to a specific worker, or fan bodies across many.',
                },
                {
                  kicker: 'bounded',
                  title: 'Nothing outlives the bracket.',
                  body: 'Closing the Provide kills every worker it opened, newest first. No stragglers, no cleanup handler you have to remember to write.',
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
                The pool owns the processes. Other fabrics decide what runs
                on them and where the results land.
              </>
            }
          />
          <Section>
            <LinkGrid>
              <LinkCard href="/fabrics/mp" name="nustd.mp" hue={FABRIC.mp.hue} tagline="One process, declared.">
                When the worker set is fixed and known up front, mp says so
                in the bracket and stays purely declarative.
              </LinkCard>
              <LinkCard href="/fabrics/cluster" name="nustd.cluster" hue={FABRIC.cluster.hue} tagline="Ray cluster fabric.">
                Same Teleport, cluster scale. Outgrow one box and the shape
                of the program survives the move.
              </LinkCard>
              <LinkCard href="/fabrics/kv" name="nustd.kv" hue={FABRIC.kv.hue} tagline="Durable state fabric.">
                Workers write results into the same tree of Refs the driver
                reads, so nothing has to be handed back by hand.
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

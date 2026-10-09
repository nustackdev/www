import { BookOpen } from 'lucide-react';
import { Page, Header, Body, Chapter, Section, SectionHead } from '@/components/page';
import { Tagline, Description } from '@www/shared/components/text';
import { PageBadge } from '@www/shared/components/meta/PageBadge';
import { RelationsLine } from '@/components/meta/RelationsLine';
import { CodeSample } from '@www/shared/components/media/CodeSample';
import { LinkCard } from '@www/shared/components/controls/LinkCard';
import { Button } from '@www/shared/components/controls/Button';
import { CtaRow } from '@www/shared/components/layout/CtaRow';
import { LinkGrid } from '@www/shared/components/layout/LinkGrid';
import { GainGrid } from '@www/shared/components/chapters/GainGrid';
import { SnippetBeat } from '@www/shared/components/chapters/SnippetBeat';
import { TryIt } from '@/components/chapters/TryIt';
import { LikeThisBlock } from '@/components/chapters/LikeThisBlock';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { FABRIC } from '@/lib/fabrics';
import { pageOG, ogFabricImage } from '@/lib/og';
import { KV_SNIPPET_LINES } from './snippet.data';

export const metadata = pageOG({
  title: `${FABRIC.kv.name} — ${FABRIC.kv.tagline}`,
  description: FABRIC.kv.description,
  image: ogFabricImage('kv'),
  path: '/fabrics/kv',
});

export default function KvPage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="fabric" name="nustd.kv" hue={FABRIC.kv.hue} />}
        tags={<RelationsLine label="Powered by" refs={FABRIC.kv.poweredBy} />}
        title="Durable state for Nu apps, from prototype to terabytes."
        lede={
          <>
            <code>nustd.kv</code> turns Refs into slots in a document-shaped
            data model over any KV storage, with snapshots for consistent
            reads and transactions for whole-state writes.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="solid" href={FABRIC.kv.docs}>
              <BookOpen size={14} aria-hidden />
              <span>Read the reference</span>
            </Button>
            <Button variant="outline" href={FABRIC.kv.src}>
              <GithubMark size={14} />
              <span>See the code</span>
            </Button>
          </CtaRow>
        }
      />

      <Body>
        {/* Pitch: capability sentence and 60-second snippet */}
        <Chapter>
          <SectionHead
            title="See it."
            lede={
              <>
                Declare a Shape, hang typed Refs off it, then read and write
                as plain Python attributes.
              </>
            }
          />
          <SnippetBeat
            hue={FABRIC.kv.hue}
            prose={
              <>
                <Tagline>Refs are addresses. Shapes are your data model.</Tagline>
                <Description>
                  Any Python primitive, dict, list, tuple, nested Shape, or
                  indexed collection can hang off a Shape as a typed Ref.
                  Subscript and dot navigate through the tree. Nothing is
                  fetched until a bracket runs it.
                </Description>
                <Description>
                  Wrap reads in <code>Snapshot</code> for a consistent view.
                  Wrap writes in <code>Transaction</code> and the whole body
                  commits or none of it does. Backend picks change one line
                  at the top.
                </Description>
              </>
            }
            code={<CodeSample filename="store.py" lines={KV_SNIPPET_LINES} />}
          />
        </Chapter>

        {/* Gains: FAB per capability block */}
        <Chapter>
          <SectionHead
            title="What your program gains."
            lede={<>Four properties once your state lives on nustd.kv.</>}
          />
          <Section>
            <GainGrid
              hue={FABRIC.kv.hue}
              items={[
                {
                  kicker: 'persistence',
                  title: 'State is there when the process comes back.',
                  body: 'Every write goes to the backing store. Restart, redeploy, crash and recover. The values are still there in the same slots you declared.',
                },
                {
                  kicker: 'scalability',
                  title: 'Shard the storage. Refs do not notice.',
                  body: 'The same Ref API runs against a laptop directory and a terabyte-scale store. Partition by key, split across disks, add read-only tailers. The Shape code does not change.',
                },
                {
                  kicker: 'reactivity',
                  title: 'Any Ref emits on change.',
                  body: <>Subscribe with <code>on_change</code> and wake code on write. The default observer fires in-process. Swap in the Redis observer and the same subscription fires across the cluster.</>,
                },
                {
                  kicker: 'durability',
                  title: 'Snapshots and transactions built in.',
                  body: <>Wrap reads in <code>Snapshot</code> for one consistent view. Wrap writes in <code>Transaction</code> and the whole body commits or none of it does.</>,
                },
              ]}
            />
          </Section>
        </Chapter>

        {/* Backends: pick your storage */}
        <Chapter>
          <SectionHead
            title="Pick a backend."
            lede={
              <>
                Storage on one line. Notifications on another. The Ref API
                stays the same across every combination.
              </>
            }
          />
          <Section>
            <GainGrid
              hue={FABRIC.kv.hue}
              items={[
                {
                  kicker: 'rocksdb',
                  title: 'LSM store for terabytes and up.',
                  body: 'Billions of keys, range scans, snapshots, WAL. Primary writer plus read-only tailers in other processes. The default when data outlives the process.',
                },
                {
                  kicker: 'lmdb',
                  title: 'Memory-mapped, single-writer ACID.',
                  body: 'Zero-copy reads, one writer, real transactions in a single directory. Reach for it when one process owns writes and readers want speed.',
                },
                {
                  kicker: 'in-memory',
                  title: 'ACID in RAM for tests and drafts.',
                  body: 'Same Ref API, same brackets, no disk. Real snapshots and transactions, so tests exercise the production code path.',
                },
                {
                  kicker: 'observers',
                  title: 'Redis or in-memory pub/sub.',
                  body: <>The observer decides who wakes up on write. In-memory for one process, Redis for many. <code>on_change</code> stays the same call.</>,
                },
              ]}
            />
          </Section>
        </Chapter>

        {/* Combines-with: lateral cross-links */}
        <Chapter>
          <SectionHead
            title="Combines well with."
            lede={
              <>
                Refs are Refs. The state you declared here is what the other
                fabrics read, render, and react to.
              </>
            }
          />
          <Section>
            <LinkGrid>
              <LinkCard href="/fabrics/mem" name="nustd.mem" hue={FABRIC.mem.hue} tagline="Hot state, in-process.">
                Mix mem slots and kv slots on the same Shape. Scratch beside durable, same attribute syntax.
              </LinkCard>
              <LinkCard href="/fabrics/ui" name="nustd.ui" hue={FABRIC.ui.hue} tagline="Live browser widgets.">
                Bind a widget to a kv slot. Writes flow both ways through the same Ref. No polling.
              </LinkCard>
              <LinkCard href="/fabrics/cluster" name="nustd.cluster" hue={FABRIC.cluster.hue} tagline="Compute on the workers.">
                Teleport a body to a worker. The kv Refs travel with it. State stays one shared tree.
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

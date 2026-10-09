import { BookOpen } from 'lucide-react';
import { Page, Header, Body, Chapter, Section, SectionHead } from '@/components/page';
import { Tagline, Description } from '@www/shared/components/text';
import { SilverWovenName } from '@www/shared/components/meta/SilverWovenName';
import { PageBadge } from '@www/shared/components/meta/PageBadge';
import { RelationsLine } from '@/components/meta/RelationsLine';
import { CodeSample } from '@www/shared/components/media/CodeSample';
import { CtaRow } from '@www/shared/components/layout/CtaRow';
import { Button } from '@www/shared/components/controls/Button';
import { LinkCard } from '@www/shared/components/controls/LinkCard';
import { LinkGrid } from '@www/shared/components/layout/LinkGrid';
import { SnippetBeat } from '@www/shared/components/chapters/SnippetBeat';
import { TryIt } from '@/components/chapters/TryIt';
import { LikeThisBlock } from '@/components/chapters/LikeThisBlock';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { FABRIC } from '@www/shared/lib/stack/fabrics';
import { pageOG, ogFabricImage } from '@/lib/og';
import { MEM_COUNTER_LINES } from './mem.sample.data';

export const metadata = pageOG({
  title: `${FABRIC.mem.name} — ${FABRIC.mem.tagline}`,
  description: FABRIC.mem.description,
  image: ogFabricImage('mem'),
  path: '/fabrics/mem',
});

export default function MemPage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="fabric" name="nustd.mem" hue={FABRIC.mem.hue} />}
        tags={<RelationsLine label="Powered by" refs={FABRIC.mem.poweredBy} />}
        title={
          <>
            Hot state, zero backend.
          </>
        }
        lede={
          <>
            The simplest state in Nu. Declare a Shape, hang typed Refs, use
            them. Gone when the process ends.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="solid" href={FABRIC.mem.docs}>
              <BookOpen size={14} aria-hidden />
              <span>Read the reference</span>
            </Button>
            <Button variant="outline" href={FABRIC.mem.src}>
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
                Declare a Shape, hang typed Refs, use them. That is the
                whole surface.
              </>
            }
          />

          <SnippetBeat
            hue={FABRIC.mem.hue}
            prose={
              <>
                <Tagline>The simplest state in Nu.</Tagline>
                <Description>
                  Same <code>IntRef</code>, <code>DictRef</code>,{' '}
                  <code>ShapeRef</code> you use everywhere else in Nu.
                  Reads and writes are in-process, no serialization, no
                  round trip. Use it for cache, hot state, and
                  coordination between Shapes in one process.
                </Description>
                <Description>
                  No backend to pick. No transactions to wrap. Restart
                  clears it. That is the whole point.
                </Description>
              </>
            }
            code={<CodeSample filename="memory.py" lines={MEM_COUNTER_LINES} />}
          />
        </Chapter>

        {/* Chapter 2 — when to reach for mem vs kv */}
        <Chapter>
          <SectionHead
            title="Pick by lifetime."
            lede={
              <>
                <SilverWovenName as="span" hue={FABRIC.mem.hue}>nustd.mem</SilverWovenName>{' '}
                and <SilverWovenName as="span" hue={FABRIC.kv.hue}>nustd.kv</SilverWovenName>{' '}
                share the same Ref shapes. Pick by what the state needs to
                survive.
              </>
            }
          />

          <Section>
            <LinkGrid>
              <LinkCard href="#install" name="nustd.mem" hue={FABRIC.mem.hue} tagline="Ephemeral, in-process.">
                Caches. Live counters. UI state. Anything you can rebuild
                on restart. Zero setup, zero disk.
              </LinkCard>
              <LinkCard href="/fabrics/kv" name="nustd.kv" hue={FABRIC.kv.hue} tagline="Durable, across restarts.">
                Users. Orders. Anything you need after a crash. Same Refs,
                backed by RocksDB or LMDB. Move it to nustd.kv when the state
                needs to survive a restart.
              </LinkCard>
            </LinkGrid>
          </Section>
        </Chapter>

        {/* Chapter 3 — combines with */}
        <Chapter>
          <SectionHead
            title="Combines well with."
            lede={
              <>
                Fabrics compose. Wire{' '}
                <SilverWovenName as="span" hue={FABRIC.mem.hue}>nustd.mem</SilverWovenName>{' '}
                to a browser, a KV store, or another process without
                changing your Refs.
              </>
            }
          />

          <Section>
            <LinkGrid>
              <LinkCard href="/fabrics/kv" name="nustd.kv" hue={FABRIC.kv.hue} tagline="Durable on disk.">
                Move hot state to disk when you outgrow the process.
              </LinkCard>
              <LinkCard href="/fabrics/ui" name="nustd.ui" hue={FABRIC.ui.hue} tagline="Live browser widgets.">
                Bind mem state straight into browser widgets. Live
                updates, no glue.
              </LinkCard>
              <LinkCard href="/fabrics/proxy" name="nustd.proxy" hue={FABRIC.proxy.hue} tagline="Fabrics on the wire.">
                Serve a mem fabric over a socket. Another process reads
                the same Refs.
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

import { BookOpen } from 'lucide-react';
import { Page, Header, Body, Chapter, Section, SectionCell, SectionHead } from '@/components/page';
import { Tagline, Description } from '@www/shared/components/text';
import { PageBadge } from '@www/shared/components/meta/PageBadge';
import { CodeSample } from '@www/shared/components/media/CodeSample';
import { LinkCard } from '@www/shared/components/controls/LinkCard';
import { Button } from '@www/shared/components/controls/Button';
import { CtaRow } from '@www/shared/components/layout/CtaRow';
import { LinkGrid } from '@www/shared/components/layout/LinkGrid';
import { GainGrid } from '@www/shared/components/chapters/GainGrid';
import { SnippetBeat } from '@www/shared/components/chapters/SnippetBeat';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { NulogMockSvg } from '@www/shared/components/marks/NulogMock';
import { Screenshot } from '@www/shared/components/media/Screenshot';
import { NULOG_SNIPPET_LINES } from './snippet.data';

export default function ObservabilityUseCasePage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="use case" name="Observability" hue="sage" />}
        title="Logs and metrics without running a server."
        lede={
          <>
            You want to see what your app is doing. You do not want to run
            Loki, ship to Datadog, or wire up a metrics daemon. You want
            append-only logs, a few counters, and a page to browse them.
          </>
        }
        actions={
          <CtaRow>
            <Button href="#install" variant="solid">
              <span>Install nulog</span>
            </Button>
            <Button href="https://github.com/nustackdev/nulog">
              <span>See on GitHub</span>
            </Button>
          </CtaRow>
        }
      />

      <Body>
        {/* Situation — JTBD open */}
        <Chapter>
          <SectionHead
            title="The job."
            lede={
              <>
                Observability for a single process, without another process
                to run it. One pip install, one file, one browser tab.
              </>
            }
          />
          <Section split="1/1">
            <SectionCell>
              <Description>
                Most log stacks assume a fleet. When you are one binary on
                one box, the fleet is overhead. Nu lets observability run
                inside your program. Writes append to <code>nustd.kv</code>.
                Reads open a browser.
              </Description>
              <Description>
                Billions of entries on plain RocksDB. Metric series sampled
                with <code>kh57</code> so any window renders fast, no
                downsampling service in the middle.
              </Description>
            </SectionCell>
            <SectionCell>
              <Screenshot
                hue="sage"
                ariaLabel="nulog running in a browser"
                caption={<>nulog viewer &middot; live tail</>}
              >
                <NulogMockSvg />
              </Screenshot>
            </SectionCell>
          </Section>
        </Chapter>

        {/* Mechanism — 60-second snippet */}
        <Chapter>
          <SectionHead
            title="How Nu does it."
            lede={
              <>
                One Nu tree opens a store, boots the viewer, writes a few
                log lines and a metric point inside a transaction. That is
                the whole app.
              </>
            }
          />
          <SnippetBeat
            hue="sage"
            prose={
              <>
                <Tagline>Writes are commands. Reads are queries.</Tagline>
                <Description>
                  Every log line is a Nu command composed with{' '}
                  <code>&gt;&gt;</code>. Every table view is a Nu query
                  that yields plain dicts. The whole app is one tree, not a
                  bag of imperative calls.
                </Description>
                <Description>
                  Kill the process, run it again, the entries are still on
                  disk. Point another process at the same store to build
                  dashboards, exports, or alerts.
                </Description>
              </>
            }
            code={<CodeSample filename="app.py" lines={NULOG_SNIPPET_LINES} />}
          />
        </Chapter>

        {/* Gains — FAB per capability block */}
        <Chapter>
          <SectionHead
            title="What you get."
            lede={<>Three things that fall out of running observability inside your process.</>}
          />
          <Section>
            <GainGrid
              hue="sage"
              items={[
                {
                  kicker: 'no server',
                  title: 'One pip install, no daemon.',
                  body: 'The store runs in the same process that writes to it. No agent, no collector, no port to open. Delete the store and it is gone.',
                },
                {
                  kicker: 'logs and metrics',
                  title: 'Two stores, one API.',
                  body: (
                    <>
                      Append log lines with <code>info</code>,{' '}
                      <code>warn</code>, <code>error</code>. Record metric
                      points with <code>observe</code>. Query both with the
                      same Nu grammar.
                    </>
                  ),
                },
                {
                  kicker: 'live viewer',
                  title: 'Table, filters, counts.',
                  body: 'A nudle UI mounts alongside the store. Newest-first table, stream switcher, level filter, message search, per-level counts. Repaints every second.',
                },
              ]}
            />
          </Section>
        </Chapter>

        {/* Built on the stack — lateral cross-links */}
        <Chapter>
          <SectionHead
            title="Built on the stack."
            lede={
              <>
                The observability implementation ships as <code>nulog</code>,
                a Nu app under a thousand lines. It sits on the same fabrics
                and tools your program already uses.
              </>
            }
          />
          <Section>
            <LinkGrid>
              <LinkCard href="/fabrics/kv" title="nustd.kv">
                Persistent state on RocksDB. Every log line and metric
                point lives here.
              </LinkCard>
              <LinkCard href="/tools/kh57" title="kh57">
                Deterministic sampling over sorted KV data. Any window on
                a metric series renders fast.
              </LinkCard>
              <LinkCard href="/docs/reference/nustd/kv" title="docs · nustd.kv">
                Reference for the store nulog writes to. Commands, queries,
                transactions.
              </LinkCard>
              <LinkCard
                href="https://github.com/nustackdev/nulog"
                icon={<GithubMark size={14} />}
                title="Read the source"
              >
                Under a thousand lines of Nu. Every command and query in one place.
              </LinkCard>
              <LinkCard href="/docs" icon={<BookOpen size={14} />} title="Read the docs">
                Tutorials and reference for the fabrics nulog stands on.
              </LinkCard>
              <LinkCard href="/use-cases" icon={<BookOpen size={14} />} title="Other use cases">
                Same primitives, different jobs. See what else the stack fits.
              </LinkCard>
            </LinkGrid>
          </Section>
        </Chapter>

      </Body>
    </Page>
  );
}

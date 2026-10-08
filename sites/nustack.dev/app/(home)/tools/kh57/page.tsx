import {
  Page,
  Header,
  Body,
  Chapter,
  Section,
  SectionHead,
} from '@/components/page';
import { Description, Label } from '@www/shared/components/text';
import { CodeSample } from '@www/shared/components/media/CodeSample';
import { SnippetBeat } from '@www/shared/components/chapters/SnippetBeat';
import { Button } from '@www/shared/components/controls/Button';
import { LinkCard } from '@www/shared/components/controls/LinkCard';
import { LinkGrid } from '@www/shared/components/layout/LinkGrid';
import { CtaRow } from '@www/shared/components/layout/CtaRow';
import { Stack } from '@www/shared/components/layout/Stack';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { PageBadge } from '@www/shared/components/meta/PageBadge';
import { RelationsLine } from '@/components/meta/RelationsLine';
import { GainGrid } from '@www/shared/components/chapters/GainGrid';
import { LikeThisBlock } from '@/components/chapters/LikeThisBlock';
import { TOOL } from '@/lib/tools';
import { FABRIC } from '@/lib/fabrics';

import { pageOG, ogToolImage } from '@/lib/og';

export const metadata = pageOG({
  title: 'kh57. Uniform samples from huge sorted key-value stores.',
  description:
    'Uniform random samples from trillion-item sorted key-value stores. Same keys, same salt, same sample. Reads stay within 2x of n.',
  image: ogToolImage('kh57'),
  path: '/tools/kh57',
});

import { ToolJsonLd } from '@/components/meta/ToolJsonLd';

export default function Kh57ToolPage() {
  return (
    <Page>
      <ToolJsonLd slug="kh57" />
      <Header
        meta={<PageBadge kind="tool" name="kh57" hue={TOOL.kh57.hue} />}
        tags={
          <>
            <RelationsLine label="Powered by" refs={TOOL.kh57.poweredBy} />
            <RelationsLine label="Powers" refs={TOOL.kh57.powers} />
          </>
        }
        title="Uniform samples from a trillion sorted rows."
        lede={
          <>
            Pull <em>n</em> uniform samples from any range of a huge sorted
            key-value store. Deterministic, stable, range-friendly. Total
            reads stay within 2x of <em>n</em>.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="solid" href={TOOL.kh57.github} external>
              <GithubMark size={14} />
              <span>See on GitHub</span>
            </Button>
            <Button variant="outline" href={TOOL.kh57.examples} external>
              <GithubMark size={14} />
              <span>Browse examples</span>
            </Button>
          </CtaRow>
        }
      />

      <Body>
        {/* The problem. */}
        <Chapter>
          <SectionHead
            title="The problem."
            lede={
              <>
                You have a sorted-by-key dataset. Billions of rows, maybe
                trillions. You want a uniform random slice of one range, right
                now, without loading the whole thing.
              </>
            }
          />
          <Section hue={TOOL.kh57.hue}>
            <Stack gap="normal">
              <Description>
                Every-Nth sampling is biased. A shuffled index destroys range
                reads. Loading the range first, then sampling, defeats the
                point. You want both: uniformity and cheap range access.
              </Description>
              <Label>
                Niche. If it is your problem, kh57 is built for exactly that
                shape.
              </Label>
            </Stack>
          </Section>
        </Chapter>

        {/* What it gives you. */}
        <Chapter>
          <SectionHead
            title="Four properties, free."
            lede={
              <>
                One hash per key, one compound sort key per row, one range
                walk per sample. Four properties fall out for free.
              </>
            }
          />
          <Section>
            <GainGrid
              hue={TOOL.kh57.hue}
              cols={2}
              items={[
                {
                  title: 'Deterministic',
                  body: 'Same keys, same salt, same sample. Reproduce a report a year later with one line of code.',
                },
                {
                  title: 'Stable under growth',
                  body: 'Append new keys outside the queried range and the sample inside stays identical. No re-sampling to explain.',
                },
                {
                  title: 'Range-friendly',
                  body: 'Scan only what the query needs. Ask for 500 samples from a 100k slice, touch on the order of 1000 rows.',
                },
                {
                  title: 'Any sorted-KV backend',
                  body: (
                    <>
                      Implement <code>get</code>, <code>put</code>,{' '}
                      <code>delete</code>, <code>range_scan</code>. Done.
                      RocksDB, LMDB, or a dict for tests.
                    </>
                  ),
                },
              ]}
            />
          </Section>
        </Chapter>

        {/* Sample from a range. */}
        <Chapter>
          <SectionHead
            title="Sample from a range."
            lede={
              <>
                Hash keys with <code>kh57</code>, put rows in any sorted-KV
                backend, then ask for <em>n</em> samples over a range.
              </>
            }
          />
          <SnippetBeat
            ratio="45/55"
            hue={TOOL.kh57.hue}
            prose={
              <Description>
                Swap <code>MemBackend</code> for a RocksDB or LMDB adapter and
                the sample call does not change. The compound sort key
                <code> (level, key) </code> is what makes the range walk
                cheap.
              </Description>
            }
            code={
              <CodeSample
                filename="sample.py"
                lang="python"
                langShort="py"
                lines={[
                  [{ c: 'kw', t: 'from' }, { t: ' kh57 ' }, { c: 'kw', t: 'import' }, { t: ' kh57, sample, MemBackend' }],
                  [],
                  [{ t: 'backend = ' }, { c: 'nu', t: 'MemBackend' }, { t: '()' }],
                  [{ c: 'kw', t: 'for' }, { t: ' key ' }, { c: 'kw', t: 'in' }, { t: ' ' }, { c: 'nu', t: 'range' }, { t: '(' }, { c: 'str', t: '1_000_000' }, { t: '):' }],
                  [{ t: '    encoded = ' }, { c: 'nu', t: 'kh57' }, { t: '(key).to_bytes(' }, { c: 'str', t: '8' }, { t: ', ' }, { c: 'str', t: '"big"' }, { t: ')' }],
                  [{ t: '    backend.' }, { c: 'nu', t: 'put' }, { t: '(encoded, ' }, { c: 'nu', t: 'str' }, { t: '(key).encode())' }],
                  [],
                  [{ c: 'cmt', t: '# 500 uniform samples from the [100_000, 200_000) range' }],
                  [{ t: 'rows = ' }, { c: 'nu', t: 'sample' }, { t: '(backend, ' }, { c: 'str', t: '500' }, { t: ', begin=' }, { c: 'str', t: '100_000' }, { t: ', end=' }, { c: 'str', t: '200_000' }, { t: ')' }],
                ]}
              />
            }
          />
        </Chapter>

        {/* How it works. */}
        <Chapter id="how-it-works">
          <SectionHead
            title="How it works."
            lede={
              <>
                Hash each key with SipHash-2-4. The bit length of the hash is
                the key&apos;s <em>level</em>: half the keys land in level 63,
                a quarter in 62, and so on. Store each row under a compound
                sort key of <code>(level, key)</code>.
              </>
            }
          />
          <Section>
            <Stack gap="normal">
              <Description>
                To sample from a range: walk levels sparsest to densest.
                Take a full level while it fits the quota. Reservoir-sample
                the boundary level for the remainder. Stop.
              </Description>
              <Description>
                Each level is a deterministic uniform subset of the range, so
                their union is a uniform sample. Read amplification stays
                within roughly 2x of <em>n</em>.
              </Description>
              <Label>
                Algorithm by Karen Hambardzumyan (mahnerak), 2023.
              </Label>
            </Stack>
          </Section>
        </Chapter>

        {/* Powers Nu. */}
        <Chapter>
          <SectionHead
            title="Powers Nu."
            lede={
              <>
                <code>kh57</code> is the sampler under <code>nustd.kv</code>&apos;s
                sparse int-keyed Refs. Store a growing collection on any
                sorted-KV backend, then pull uniform samples from any range
                with one call.
              </>
            }
          />
          <Section>
            <LinkGrid>
              <LinkCard href="/fabrics/kv" name="nustd.kv" hue={FABRIC.kv.hue} tagline="Persistent state fabric.">
                <code>Kh57Ref</code> is a sparse int-keyed collection with
                a <code>.sample(n, begin, end)</code> query built on kh57.
                Grow forever, sample cheaply.
              </LinkCard>
              <LinkCard href="/tools/virtuals" name="virtuals" hue={TOOL.virtuals.hue} tagline="Collections over KV.">
                Views over the same sorted-KV substrate kh57 samples from.
                Store rich objects, sample uniformly.
              </LinkCard>
            </LinkGrid>
          </Section>
        </Chapter>

        <LikeThisBlock />
      </Body>
    </Page>
  );
}

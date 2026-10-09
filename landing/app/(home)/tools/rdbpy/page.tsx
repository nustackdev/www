import {
  Page,
  Header,
  Body,
  Chapter,
  Section,
  SectionHead,
} from '@/components/page';
import { PageBadge } from '@www/shared/components/meta/PageBadge';
import { RelationsLine } from '@/components/meta/RelationsLine';
import { Tagline, Description } from '@www/shared/components/text';
import { Button } from '@www/shared/components/controls/Button';
import { GainGrid } from '@www/shared/components/chapters/GainGrid';
import { SnippetBeat } from '@www/shared/components/chapters/SnippetBeat';
import { LikeThisBlock } from '@/components/chapters/LikeThisBlock';
import { LinkCard } from '@www/shared/components/controls/LinkCard';
import { CtaRow } from '@www/shared/components/layout/CtaRow';
import { LinkGrid } from '@www/shared/components/layout/LinkGrid';
import { Stack } from '@www/shared/components/layout/Stack';
import { CodeSample, type CodeTok } from '@www/shared/components/media/CodeSample';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { TOOL } from '@www/shared/lib/stack/tools';
import { FABRIC } from '@www/shared/lib/stack/fabrics';
import { pageOG, ogToolImage } from '@/lib/og';

export const metadata = pageOG({
  title: `${TOOL.rdbpy.name} — ${TOOL.rdbpy.tagline}`,
  description: TOOL.rdbpy.description,
  image: ogToolImage('rdbpy'),
  path: '/tools/rdbpy',
});

const HUE = TOOL.rdbpy.hue;

const SNIPPET: CodeTok[][] = [
  [{ c: 'kw', t: 'import' }, { t: ' ' }, { c: 'nu', t: 'rdbpy' }],
  [],
  [{ c: 'cmt', t: '# open a database' }],
  [
    { t: 'db = ' },
    { c: 'nu', t: 'rdbpy' },
    { t: '.DB(' },
    { c: 'str', t: "'/tmp/mydb'" },
    { t: ', ' },
    { c: 'nu', t: 'rdbpy' },
    { t: '.Options(create_if_missing=' },
    { c: 'kw', t: 'True' },
    { t: '))' },
  ],
  [],
  [{ c: 'cmt', t: '# put, get' }],
  [
    { t: 'db.put(' },
    { c: 'str', t: "b'user:1'" },
    { t: ', ' },
    { c: 'str', t: "b'ada'" },
    { t: ')' },
  ],
  [
    { t: 'db.get(' },
    { c: 'str', t: "b'user:1'" },
    { t: ')  ' },
    { c: 'cmt', t: "# -> b'ada'" },
  ],
  [],
  [{ c: 'cmt', t: '# atomic writes: open a TransactionDB' }],
  [
    { t: 'txdb = ' },
    { c: 'nu', t: 'rdbpy' },
    { t: '.TransactionDB(' },
    { c: 'str', t: "'/tmp/mytxdb'" },
    { t: ',' },
  ],
  [
    { t: '    ' },
    { c: 'nu', t: 'rdbpy' },
    { t: '.Options(create_if_missing=' },
    { c: 'kw', t: 'True' },
    { t: '),' },
  ],
  [
    { t: '    txn_db_opts=' },
    { c: 'nu', t: 'rdbpy' },
    { t: '.TransactionDBOptions())' },
  ],
  [],
  [{ t: 'txn = txdb.begin_transaction()' }],
  [
    { t: 'txn.put(' },
    { c: 'str', t: "b'user:2'" },
    { t: ', ' },
    { c: 'str', t: "b'grace'" },
    { t: ')' },
  ],
  [
    { t: 'txn.put(' },
    { c: 'str', t: "b'user:3'" },
    { t: ', ' },
    { c: 'str', t: "b'hedy'" },
    { t: ')' },
  ],
  [{ t: 'txn.commit()' }],
  [{ t: 'txn.close()' }],
];

import { ToolJsonLd } from '@/components/meta/ToolJsonLd';

export default function RdbpyPage() {
  return (
    <Page>
      <ToolJsonLd slug="rdbpy" />
      <Header
        meta={<PageBadge kind="tool" name="rdbpy" hue={HUE} />}
        tags={
          <>
            <RelationsLine label="Powered by" refs={TOOL.rdbpy.poweredBy} />
            <RelationsLine label="Powers" refs={TOOL.rdbpy.powers} />
          </>
        }
        title="RocksDB for Python in one pip install."
        lede={
          <>
            Real Cython bindings for RocksDB. Ships as one wheel on Linux and
            macOS, Intel and Apple Silicon. Iterators, snapshots, transactions,
            merges. No system libs to fight, no toolchain to install.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="solid" href={TOOL.rdbpy.github} external>
              <GithubMark size={14} />
              <span>See on GitHub</span>
            </Button>
            <Button variant="outline" href={TOOL.rdbpy.examples} external>
              <GithubMark size={14} />
              <span>Browse examples</span>
            </Button>
          </CtaRow>
        }
      />

      <Body>
        <Chapter>
          <SectionHead
            title="What it is."
            lede={
              <>
                A Python package that opens a RocksDB database and talks to it
                directly. No sidecar server, no bridge process. Just import and
                call.
              </>
            }
          />
          <Section hue={HUE}>
            <Stack gap="normal">
              <Tagline>The whole RocksDB surface, mapped to Python.</Tagline>
              <Description>
                Databases, options, iterators, snapshots, transactions, merge
                operators, column families, backups. Bindings are written in
                Cython and compiled against a bundled RocksDB, so the wheel is
                self-contained.
              </Description>
            </Stack>
          </Section>
        </Chapter>

        <Chapter>
          <SectionHead title="What you get." />
          <Section>
            <Stack gap="normal">
              <Description>
                Existing RocksDB bindings for Python assume you already have
                RocksDB, Snappy, LZ4, and Zstd on the system, at the right
                versions. rdbpy bundles them into the wheel, so{' '}
                <code>pip install</code> is the whole install story.
              </Description>
              <GainGrid
                hue={HUE}
                cols={3}
                items={[
                  {
                    title: 'One pip install.',
                    body: 'RocksDB and its compression libs ride in the wheel.',
                  },
                  {
                    title: 'Cython, not ctypes.',
                    body: 'Tight bindings over the C++ API, not a thin wrapper.',
                  },
                  {
                    title: 'Full surface.',
                    body: 'Transactions, snapshots, merge operators, column families all exposed.',
                  },
                ]}
              />
            </Stack>
          </Section>
        </Chapter>

        <Chapter>
          <SectionHead
            title="Open a database."
            lede={<>Open the DB, put and get bytes, wrap writes in a transaction.</>}
          />
          <SnippetBeat
            ratio="45/55"
            hue={HUE}
            prose={
              <Description>
                Iterators, snapshots, and merge operators come from the same
                <code>db</code> object. The C++ semantics carry over
                one-to-one.
              </Description>
            }
            code={<CodeSample filename="db.py" lang="python" langShort="py" lines={SNIPPET} />}
          />
        </Chapter>

        <Chapter>
          <SectionHead
            title="Powers Nu."
            lede={<>Where rdbpy shows up in the rest of the stack.</>}
          />
          <Section>
            <LinkGrid>
              <LinkCard href="/fabrics/kv" name="nustd.kv" hue={FABRIC.kv.hue} tagline="Persistent state fabric.">
                The fabric that turns Refs into durable state. Runs on rdbpy
                out of the box.
              </LinkCard>
              <LinkCard href="/tools/virtuals" name="virtuals" hue={TOOL.virtuals.hue} tagline="Collections over KV.">
                Dict, list, and set backed by any KV store, including rdbpy.
                The layer between raw bytes and Python objects.
              </LinkCard>
            </LinkGrid>
          </Section>
        </Chapter>

        <LikeThisBlock />
      </Body>
    </Page>
  );
}

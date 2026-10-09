import type { Metadata } from 'next';
import { Page, Header, Body, Chapter, Section, SectionHead } from '@/components/page';
import { Tagline, Description } from '@www/shared/components/text';
import { PageBadge } from '@www/shared/components/meta/PageBadge';
import { pageOG, ogPageImage } from '@/lib/og';
import { PAGE_OG } from '@/lib/og-pages';

export const metadata: Metadata = pageOG({
  title: PAGE_OG.model.title,
  description: PAGE_OG.model.description,
  image: ogPageImage('model'),
  path: '/stack/model',
});
import { Button } from '@www/shared/components/controls/Button';
import { CtaRow } from '@www/shared/components/layout/CtaRow';
import { GainGrid } from '@www/shared/components/chapters/GainGrid';
import { SnippetBeat } from '@www/shared/components/chapters/SnippetBeat';
import { TryIt } from '@/components/chapters/TryIt';
import { LikeThisBlock } from '@/components/chapters/LikeThisBlock';
import { CodeSample } from '@www/shared/components/media/CodeSample';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { SPEC_TREE_LINES, SPEC_MATRIX_LINES } from './spec.sample.data';

const SPEC_REPO = 'https://github.com/nustackdev/interaction-model';

export default function ModelPage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="stack" name="interaction model" hue="steel" />}
        title="The interaction model."
        lede={
          <>
            The interaction model defines what an interaction is, how Refs
            name locations, how Interactions compose into programs.
            Language-agnostic, implementation-agnostic. A specification
            anyone can implement.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="solid" href={SPEC_REPO}>
              <GithubMark size={14} />
              <span>Read the spec</span>
            </Button>
          </CtaRow>
        }
      />

      <Body>
        {/* Ch 1 — Names and descriptions */}
        <Chapter>
          <SectionHead
            title="Names, and what to do with them."
            lede={
              <>
                A program that touches the world needs two things: names for
                what it touches, and descriptions of what to do with them.
                The model calls the names <strong>Refs</strong> and the
                descriptions <strong>Interactions</strong>. Every element of
                a program is one or the other.
              </>
            }
          />
          <Section>
            <GainGrid
              hue="steel"
              cols={2}
              items={[
                {
                  kicker: 'ref',
                  title: 'A name for a location.',
                  body: 'The only atom that touches Context. A pointer to a KV slot, a DB row, a file, an in-memory cell, a UI widget. Carries the address, not the value at the address. Every read and every write in a program passes through a Ref — no side channels.',
                },
                {
                  kicker: 'interaction',
                  title: 'A description of what to do.',
                  body: 'Everything a program does with Refs and with other Interactions: read, write, compute, branch, iterate, compose. Programs are trees of Interactions. Fabrics execute them against real backends.',
                },
              ]}
            />
          </Section>
        </Chapter>

        {/* Ch 2 — Observability and mutation */}
        <Chapter>
          <SectionHead
            title="Observability and mutation."
            lede={
              <>
                A program exists to mutate Context. Context changes exactly
                one way: a Ref in <strong>WRITE</strong> position carries a
                value into it. No Ref in WRITE, no landed mutation.
              </>
            }
          />
          <SnippetBeat
            ratio="45/55"
            hue="steel"
            prose={
              <>
                <Tagline>Two paths make an atom observable.</Tagline>
                <Description>
                  An atom is <em>observable in its place</em> iff it lands a
                  mutation itself (own WRITE via a Ref), or it yields a value
                  consumed by an ancestor whose chain eventually lands one.
                </Description>
                <Description>
                  Crossing the two paths gives four cells. Three are live —
                  the atom kinds fall out of them. One is dead by
                  construction and excluded from the model.
                </Description>
              </>
            }
            code={
              <CodeSample
                filename="observability"
                lang="matrix"
                langShort="mtx"
                lines={SPEC_MATRIX_LINES}
              />
            }
          />
          <Section>
            <GainGrid
              hue="steel"
              cols={3}
              items={[
                {
                  kicker: 'query',
                  title: 'Yields, does not mutate.',
                  body: 'Pure value producers: arithmetic, comparison, projection, iteration over values. A subtree may still mutate via Action descendants.',
                },
                {
                  kicker: 'command',
                  title: 'Mutates, yields nothing.',
                  body: 'The pure mutator. Writes through one or more Ref children; that is the only output. Store, Copy, Append, Delete.',
                },
                {
                  kicker: 'action',
                  title: 'Mutates and yields.',
                  body: 'One atomic step that writes and returns a value. Pop, Swap, INSERT…RETURNING, POST /resource → id. Splitting into Command-then-Query would lose atomicity.',
                },
              ]}
            />
          </Section>
        </Chapter>

        {/* Ch 3 — Cardinality and kinds */}
        <Chapter>
          <SectionHead
            title="Cardinality, and the kinds it produces."
            lede={
              <>
                The second dimension. Where mutation asks <em>does this
                touch Context</em>, cardinality asks <em>how many values does
                it yield</em>. Crossed with mutation, the two dimensions
                produce the full atom vocabulary.
              </>
            }
          />
          <Section>
            <GainGrid
              hue="steel"
              cols={2}
              items={[
                {
                  kicker: 'scalar',
                  title: 'One value.',
                  body: 'The default. Refs are scalar (one address, one value). ScalarQuery, ScalarAction.',
                },
                {
                  kicker: 'stream',
                  title: '0..N values.',
                  body: 'Multi-value producers. StreamQuery (Map, Filter, ItemsOf) and StreamAction (Drain, DELETE…RETURNING).',
                },
                {
                  kicker: 'void',
                  title: 'Nothing.',
                  body: 'No yield. Command and Flow — their observability comes from writing or from composing writers, not from returning a value.',
                },
                {
                  kicker: 'transparent',
                  title: 'Forwards the body.',
                  body: <>Span wraps any atom and forwards the body’s yield in the same shape. <code>Snapshot</code>, <code>Transaction</code>, <code>Retry</code>, <code>TryCatch</code>.</>,
                },
              ]}
            />
          </Section>
        </Chapter>

        {/* Ch 4 — The atom kinds at a glance */}
        <Chapter>
          <SectionHead
            title="The atom kinds, at a glance."
            lede={
              <>
                Eight concrete kinds fall out of crossing the two dimensions
                and adding the two composition atoms (Flow, Span).
              </>
            }
          />
          <Section>
            <GainGrid
              hue="steel"
              cols={2}
              items={[
                {
                  kicker: 'ref',
                  title: 'Address atom.',
                  body: <>SCALAR. The only path to Context. Examples: <code>user_ref</code>, <code>config[&quot;theme&quot;]</code>, <code>counter</code>.</>,
                },
                {
                  kicker: 'scalarquery / streamquery',
                  title: 'Value producers.',
                  body: <><code>Add</code>, <code>Eq</code>, <code>ref.fetch()</code> (scalar). <code>Map</code>, <code>Filter</code>, <code>ItemsOf</code> (stream).</>,
                },
                {
                  kicker: 'command',
                  title: 'Pure mutator.',
                  body: <>VOID. Writes and returns nothing. <code>Store</code>, <code>Copy</code>, <code>Append</code>, <code>Delete</code>.</>,
                },
                {
                  kicker: 'scalaraction / streamaction',
                  title: 'Mutate-and-yield.',
                  body: <><code>Pop</code>, <code>Swap</code>, <code>Create</code> (scalar). <code>Drain</code>, <code>DeleteReturning</code> (stream).</>,
                },
                {
                  kicker: 'flow',
                  title: 'Composition of mutators.',
                  body: <>VOID. Its body slot needs a mutator, not a value. <code>Sequential</code>, <code>Parallel</code>, <code>IfDo</code>, <code>ForEachDo</code>, <code>WhileDo</code>.</>,
                },
                {
                  kicker: 'span',
                  title: 'Cross-cutting wrapper.',
                  body: <>Transparent. Snapshotting, transactions, retry, fallback. <code>Snapshot</code>, <code>Transaction</code>, <code>Retry</code>, <code>TryCatch</code>.</>,
                },
              ]}
            />
          </Section>
        </Chapter>

        {/* Ch 4 — One program, one tree */}
        <Chapter>
          <SectionHead
            title="One program, one tree."
            lede={
              <>
                A counter that ticks every second and a dashboard widget that
                mirrors it — the same example the README opens with, drawn as
                the tree the model actually is. No host-language syntax.
              </>
            }
          />
          <SnippetBeat
            ratio="45/55"
            hue="steel"
            prose={
              <>
                <Tagline>The tree is the program.</Tagline>
                <Description>
                  Every node is an atom. Every edge is a slot. The kinds on
                  the right explain what each node contributes: a Flow
                  composes mutators, a Command writes through a Ref, a
                  StreamQuery emits values on change.
                </Description>
                <Description>
                  A Context binds each Ref to the Fabric that owns it —{' '}
                  <code>Counter.val</code> to kv, <code>Dashboard.count</code>{' '}
                  to the browser. Swap the Context, the tree does not change.
                </Description>
              </>
            }
            code={
              <CodeSample
                filename="counter.tree"
                lang="tree"
                langShort="tree"
                lines={SPEC_TREE_LINES}
              />
            }
          />
        </Chapter>

        <TryIt />
        <LikeThisBlock />
      </Body>
    </Page>
  );
}

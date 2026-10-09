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
  title: 'nustd.cc - Claude Code fabric',
  description:
    'Claude Code as a Ref. Prompt from your Nu tree, scope sessions with a bracket, get text and metadata back.',
  image: ogFabricImage('cc'),
  path: '/fabrics/cc',
});

const HUE = FABRIC.cc.hue;

const k = (t: string): CodeTok => ({ c: 'kw', t });
const nu = (t: string): CodeTok => ({ c: 'nu', t });
const str = (t: string): CodeTok => ({ c: 'str', t });
const p = (t: string): CodeTok => ({ t });
const cmt = (t: string): CodeTok => ({ c: 'cmt', t });

const SNIPPET: CodeTok[][] = [
  [k('import'), p(' nu')],
  [k('import'), p(' nustd')],
  [],
  [k('class'), p(' '), nu('Agent'), p('('), nu('nu.Service'), p('):')],
  [p('    ask = '), nu('nustd.cc.PromptRef'), p('.method()')],
  [],
  [cmt('# two independent sessions, two prompts each')],
  [p('app = '), nu('nu.With'), p('(')],
  [p('    '), nu('nustd.cc.bind'), p('('), nu('Agent'), p(', permission_mode='), str('"bypassPermissions"'), p('),')],
  [p('    body='), nu('nustd.cc.Session'), p('(')],
  [p('        '), nu('Agent'), p('.ask(prompt='), str('"my favorite color is teal. remember it."'), p('),')],
  [p('        '), nu('Agent'), p('.ask(prompt='), str('"what color did i tell you? one word."'), p('),')],
  [p('    ),')],
  [p(')')],
  [k('await'), p(' '), nu('nu.arun'), p('(app)')],
];

export default function CcFabricPage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="fabric" name="nustd.cc" hue={HUE} />}
        tags={<RelationsLine label="Powered by" refs={FABRIC.cc.poweredBy} />}
        title={<>Claude Code, as a Ref.</>}
        lede={
          <>
            Declare a <code>PromptRef</code> on a Service, bind it with
            options once, then prompt Claude Code from inside your Nu tree.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="solid" href={FABRIC.cc.docs}>
              <BookOpen size={14} aria-hidden />
              <span>Read the reference</span>
            </Button>
            <Button variant="outline" href={FABRIC.cc.src}>
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
                Ask Claude Code anything, right from your Nu program.
                Wrap a few asks in a <code>Session</code> and it remembers
                what you said before.
              </>
            }
          />
          <SnippetBeat
            hue={HUE}
            prose={
              <>
                <Tagline>Prompts from inside your Nu tree.</Tagline>
                <Description>
                  <code>PromptRef.method()</code> declares the endpoint;{' '}
                  <code>nustd.cc.bind(Agent, ...)</code> hands it a
                  ClaudeAgentOptions template — model, cwd, tools, system
                  prompt, permissions.
                </Description>
                <Description>
                  <code>nustd.cc.Session(...)</code> is a bracket. The first
                  prompt starts a fresh cc session, the rest continue it via{' '}
                  <code>resume=session_id</code>. Sibling brackets stay
                  independent.
                </Description>
              </>
            }
            code={<CodeSample filename="agent.py" lines={SNIPPET} />}
          />
        </Chapter>

        {/* Chapter 2 — Gains */}
        <Chapter>
          <SectionHead
            title="What you can do with it."
            lede={
              <>
                Everything cc can do — tools, agent loops, edits, custom
                system prompts — reachable from a plain Ref call.
              </>
            }
          />
          <Section>
            <GainGrid
              hue={HUE}
              items={[
                {
                  kicker: 'options template',
                  title: 'Bind once, prompt many times.',
                  body: 'Model, cwd, allowed_tools, system_prompt, permission_mode, max_turns — set on bind, override per call when you need to.',
                },
                {
                  kicker: 'sessions',
                  title: 'Scope multi-turn work with a bracket.',
                  body: 'nustd.cc.Session wraps a subtree. Prompts inside share one cc session so context carries. Two sibling brackets = two clean contexts.',
                },
                {
                  kicker: 'text + meta',
                  title: 'Every call returns cost, turns, session id.',
                  body: 'Prompt yields a dict: text, session_id, total_cost_usd, duration_ms, num_turns. Log it, cache it, put it in a UI — like any Ref result.',
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
                nustd.cc drives cc. Other fabrics hold the surrounding
                context and put the answers to work.
              </>
            }
          />
          <Section>
            <LinkGrid>
              <LinkCard href="/fabrics/kv" name="nustd.kv" hue={FABRIC.kv.hue} tagline="Durable state fabric.">
                Persist prompts, session ids, transcripts, tool traces.
                Resume conversations across process restarts.
              </LinkCard>
              <LinkCard href="/fabrics/llm" name="nustd.llm" hue={FABRIC.llm.hue} tagline="OpenAI-compatible chat.">
                Same shape, different backend. Use nustd.llm for plain
                chat/completions; use nustd.cc when you want cc's agent loop
                and tools.
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

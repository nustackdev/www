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
  title: 'nustd.llm - OpenAI-compatible chat fabric',
  description:
    'One chat/completions wire, many providers. Ollama, OpenAI, OpenRouter, Groq, Cerebras, xAI, vLLM. Same ChatRef, same call.',
  image: ogFabricImage('llm'),
  path: '/fabrics/llm',
});

const HUE = FABRIC.llm.hue;

const k = (t: string): CodeTok => ({ c: 'kw', t });
const nu = (t: string): CodeTok => ({ c: 'nu', t });
const str = (t: string): CodeTok => ({ c: 'str', t });
const p = (t: string): CodeTok => ({ t });
const cmt = (t: string): CodeTok => ({ c: 'cmt', t });

const SNIPPET: CodeTok[][] = [
  [k('import'), p(' nu')],
  [k('import'), p(' nustd')],
  [],
  [k('class'), p(' '), nu('Model'), p('('), nu('nu.Service'), p('):')],
  [p('    chat = '), nu('nustd.llm.ChatRef'), p('.method(temperature=0.7)')],
  [],
  [cmt('# ollama running locally, one preset call')],
  [p('app = '), nu('nu.With'), p('(')],
  [p('    '), nu('nustd.llm.ollama'), p('('), nu('Model'), p(', host='), str('"localhost"'), p(', model='), str('"qwen2.5:7b-instruct"'), p('),')],
  [p('    body='), nu('nu.print'), p('('), nu('nu.dict'), p('('), nu('Model'), p('.chat(prompt='), str('"haiku about rust"'), p('))['), str('"text"'), p(']),')],
  [p(')')],
  [nu('nu.run'), p('(app)')],
];

export default function LlmFabricPage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="fabric" name="nustd.llm" hue={HUE} />}
        tags={<RelationsLine label="Powered by" refs={FABRIC.llm.poweredBy} />}
        title={<>One chat wire. Every provider.</>}
        lede={
          <>
            Declare a <code>ChatRef</code> on a Service, bind a preset,
            call it like any other Ref. Supports Ollama, OpenAI,
            OpenRouter, Groq, Cerebras, xAI, and vLLM out of the box.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="solid" href={FABRIC.llm.docs}>
              <BookOpen size={14} aria-hidden />
              <span>Read the reference</span>
            </Button>
            <Button variant="outline" href={FABRIC.llm.src}>
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
                A Ref that talks to a chat/completions endpoint. Sync or
                async, one shot per call, message list or a plain{' '}
                <code>prompt=</code>.
              </>
            }
          />
          <SnippetBeat
            hue={HUE}
            prose={
              <>
                <Tagline>Chat as a Ref, providers as presets.</Tagline>
                <Description>
                  <code>ChatRef.method(...)</code> declares an endpoint on
                  the Service. Defaults set once at declaration; per-call
                  kwargs override them.
                </Description>
                <Description>
                  Swap <code>nustd.llm.ollama(...)</code> for{' '}
                  <code>openai</code>, <code>openrouter</code>,{' '}
                  <code>groq</code>, or your own <code>vllm</code> server.
                  The call site does not change.
                </Description>
              </>
            }
            code={<CodeSample filename="bot.py" lines={SNIPPET} />}
          />
        </Chapter>

        {/* Chapter 2 — Gains */}
        <Chapter>
          <SectionHead
            title="What you can do with it."
            lede={
              <>
                One wire covers most of the model market. Design against
                the Ref, choose the backend later.
              </>
            }
          />
          <Section>
            <GainGrid
              hue={HUE}
              items={[
                {
                  kicker: 'one wire',
                  title: 'Every provider that speaks OpenAI-compat.',
                  body: 'Ollama, OpenAI, OpenRouter, Groq, Cerebras, xAI, vLLM. Preset fills base_url + api_key + model. Same ChatRef on top.',
                },
                {
                  kicker: 'swap in place',
                  title: 'Change providers without touching call sites.',
                  body: 'Prototype on Ollama, ship on OpenRouter, benchmark on Groq — one line at bind time. The Service and its calls stay identical.',
                },
                {
                  kicker: 'sync + async',
                  title: 'Async when it matters.',
                  body: 'LLM calls are network-bound. Prefer nu.arun so parallel prompts, streaming, and UI ticks all keep going while the model thinks.',
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
                nustd.llm gets you text. Other fabrics hold the surrounding
                state, ship it to a UI, or fan it across machines.
              </>
            }
          />
          <Section>
            <LinkGrid>
              <LinkCard href="/fabrics/kv" name="nustd.kv" hue={FABRIC.kv.hue} tagline="Durable state fabric.">
                Persist prompts, responses, embeddings, conversation
                history — same Refs, plain Python reads and writes.
              </LinkCard>
              <LinkCard href="/fabrics/ui" name="nustd.ui" hue={FABRIC.ui.hue} tagline="Reactive web UI.">
                Wire a chat Ref to a text block and a button. Type a
                prompt in the browser, get the answer streamed back.
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

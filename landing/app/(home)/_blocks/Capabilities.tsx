import type { ReactNode } from 'react';
import type { CodeTok } from '@www/shared/components/media/CodeSample';
import { Snippet } from '@www/shared/components/media/Snippet';
import { SilverWovenName } from '@www/shared/components/meta/SilverWovenName';
import { RelationsLine } from '@/components/meta/RelationsLine';
import { Description, Quote } from '@www/shared/components/text';
import { Chapter, Section, SectionHead } from '@/components/page';
import { CtaRow } from '@www/shared/components/layout/CtaRow';
import { Button } from '@www/shared/components/controls/Button';
import { BulletList } from '@www/shared/components/controls/BulletList';
import type { Hue } from '@www/shared/lib/hue';
import { FABRIC } from '@/lib/fabrics';
import {
  CAP_KV_LINES,
  CAP_UI_LINES,
  CAP_CLUSTER_LINES,
  CAP_LLM_LINES,
} from '../capabilities.sample.data';
import s from './Capabilities.module.css';

interface Capability {
  slug: string;
  title: string;
  hue: Hue;
  /** The punchy stat/claim, hue-accented. */
  hook: ReactNode;
  /** 1–2 sentence explanation under the hook. */
  description: ReactNode;
  /** Two short bullet highlights — punchy gains, no full sentences. */
  gains: [ReactNode, ReactNode];
  /** Optional — when absent, the card renders prose full-width (no snippet slot). */
  lines?: CodeTok[][];
}

const CAPABILITIES: Capability[] = [
  {
    slug: 'kv',
    title: 'Persistent state',
    hue: 'crimson', // 0
    hook: (
      <>
        <em>Persistent state.</em> Stores any Python type.
      </>
    ),
    description: (
      <>
        Reach any value by name; it survives restarts. Same code local
        or sharded across a cluster.
      </>
    ),
    gains: ['Serverless, scales to terabytes', 'Store any Python type'],
    lines: CAP_KV_LINES,
  },
  {
    slug: 'ui',
    title: 'Live browser UIs',
    hue: 'cyan', // 6 — 3 steps from crimson through the warm arc
    hook: (
      <>
        Reactive UIs <em>from Python</em>. No JS, no build step,
        no websocket you had to write.
      </>
    ),
    description: (
      <>
        A text block, a chart, a form — set them like variables, they
        render. Update the value, the browser updates itself.
      </>
    ),
    gains: ['50+ components out of the box', 'Live updates for free'],
    lines: CAP_UI_LINES,
  },
  {
    slug: 'cluster',
    title: 'Distributed execution',
    hue: 'violet', // 9 — cool jump for contrast
    hook: (
      <>
        <em>Same code</em> runs local or across the cluster.
        No worker pool to run.
      </>
    ),
    description: (
      <>
        Teleport any Nu tree to any worker; it runs there and returns
        the result. Where it runs is a binding, not a rewrite.
      </>
    ),
    gains: ['Same code, local or remote', 'Distribute with a single line'],
    lines: CAP_CLUSTER_LINES,
  },
  {
    slug: 'llm',
    title: 'LLM calls',
    hue: 'gold', // 3 — warm close-out
    hook: (
      <>
        <em>One wire, N providers.</em> Ollama, OpenAI, OpenRouter,
        Groq, xAI — same call.
      </>
    ),
    description: (
      <>
        LLM chat as a Ref. Swap the model string, keep the code. Local
        models and hosted APIs meet at the same interface.
      </>
    ),
    gains: ['Add intelligence to any Nu app', '7 providers out of the box'],
    lines: CAP_LLM_LINES,
  },
];

/**
 * Capabilities — the first-user landing chapter. One Section per capability,
 * split 1/1 into prose (title, hook, description, powered-by) and snippet.
 * Each snippet follows the same class → op → assembly shape so the "same
 * primitive, different substrate" pattern is felt before it is ever named.
 */
export function Capabilities() {
  return (
    <Chapter>
      <SectionHead
        title="Build with Nu."
        lede={<>A few of Nu&apos;s fabrics &mdash; state, UIs, cluster, models. Same Python, same code shape.</>}
      />
      {CAPABILITIES.map((c) => (
        <Section key={c.slug} hue={c.hue}>
          <div className={s.card}>
            <div className={s.prose}>
              <SilverWovenName as="h3" hue={c.hue}>{c.title}</SilverWovenName>
              <Quote>{c.hook}</Quote>
              <Description>{c.description}</Description>
              <BulletList items={[...c.gains]} />
              <RelationsLine label="Powered by" refs={FABRIC[c.slug]?.poweredBy} />
            </div>
            {c.lines ? (
              <div className={s.snippetSlot}>
                <Snippet lines={c.lines} />
              </div>
            ) : null}
          </div>
        </Section>
      ))}

      {/* 5th card — teases the fabrics the four above haven't shown. */}
      <MoreCard />
    </Chapter>
  );
}

function MoreCard() {
  return (
    <Section hue="steel">
      <div className={`${s.card} ${s.cardWide}`}>
        <div className={s.prose}>
          <SilverWovenName as="h3" hue="steel">And more.</SilverWovenName>
          <Quote>
            Nu is <em>batteries-included</em> and covers the common cases.
          </Quote>
          <Description>
            In-memory state, proxy, HTTP, Python objects, Claude Code,
            local parallelism &mdash; same model, same shape, same primitive
            as the four above.
          </Description>
          <CtaRow>
            <Button href="/fabrics" variant="outline">
              <span>Explore all fabrics</span>
            </Button>
          </CtaRow>
        </div>
      </div>
    </Section>
  );
}

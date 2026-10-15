'use client';

import { useEffect, useRef } from 'react';
import { Section } from '@www/shared/components/page';
import { cn } from '@www/shared/lib/cn';
import s from './Anchors.module.css';

interface Quote {
  /** The thing people already know, in ink. */
  known: string;
  /** The turn that makes it nuspace, dim. */
  twist: string;
  /** Who says it, generic. */
  who: string;
}

/** Overheard at first looks: nuspace through things people know. Copy from identity.md in Go. */
const NEAR: Quote[] = [
  { known: 'Notion,', twist: 'but every block is a program.', who: 'a product designer' },
  { known: 'A notebook', twist: 'that never goes stale.', who: 'a researcher' },
  { known: 'A spreadsheet for anything,', twist: 'not just numbers.', who: 'an analyst' },
];

const MID: Quote[] = [
  { known: 'Real programming', twist: 'that draws itself.', who: 'an engineer' },
  { known: 'My own Palantir,', twist: 'on my laptop.', who: 'a founder' },
  { known: 'The agent left a running system,', twist: 'not a chat log.', who: 'an ML engineer' },
];

/** Short asides in the blurred back row. */
const FAR = [
  'wait, the page is the program?',
  'it just stays live',
  'so the table is code too',
  'nothing to deploy?',
  'the dashboard is the notebook',
  'everything talks to everything',
  'it runs on my machine?',
];

/** Drift speed of the top row, px a second. The others go as a multiple of it. */
const SPEED = 30;
const PACE = { far: 1, mid: 1.7, near: 2.2 } as const;

/** Each half of a track repeats its slips this many times, so it outruns the widest screen. */
const REPEAT = 2;

function Slip({ quote, hidden }: { quote: Quote | string; hidden: boolean }) {
  const q = typeof quote === 'string' ? { known: quote, twist: '', who: '' } : quote;
  return (
    <figure className={s.slip} aria-hidden={hidden || undefined}>
      <blockquote>
        <p>
          {q.known}
          {q.twist ? <span className={s.dim}> {q.twist}</span> : null}
        </p>
      </blockquote>
      {q.who ? <figcaption>{q.who}</figcaption> : null}
    </figure>
  );
}

/** One drifting row: the slips twice over, so translateX(-50%) loops without a seam. */
function Row({ items, depth }: { items: (Quote | string)[]; depth: keyof typeof PACE }) {
  const half = Array.from({ length: REPEAT }, () => items).flat();
  const track = useRef<HTMLDivElement>(null);

  // Rows differ in width, so the duration comes from the measured loop length
  // at the row's speed, not a fixed time. Font size changes re-measure.
  useEffect(() => {
    const el = track.current;
    const set = el?.firstElementChild as HTMLElement | null;
    if (!el || !set) return;
    const ro = new ResizeObserver(() => {
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      el.style.setProperty('--dur', `${(set.offsetWidth + gap) / (SPEED * PACE[depth])}s`);
    });
    ro.observe(set);
    return () => ro.disconnect();
  }, [depth]);

  return (
    <div className={cn(s.row, s[depth])} aria-hidden={depth === 'far' || undefined}>
      <div ref={track} className={s.track}>
        {[0, 1].map((h) => (
          <div key={h} className={s.set} data-copy={h === 1 || undefined}>
            {half.map((q, i) => (
              <Slip key={i} quote={q} hidden={h === 1 || i >= items.length} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Anchors — right under the hero, no heading: a wall of overheard first
 * reactions drifting at three depths, the familiar thing then its twist.
 */
export function Anchors() {
  return (
    <Section id="anchors" label="What people compare nuspace to" space="none" border={false} bleed>
      <div className={s.wall}>
        <Row items={FAR} depth="far" />
        <Row items={NEAR} depth="near" />
        <Row items={MID} depth="mid" />
      </div>
    </Section>
  );
}

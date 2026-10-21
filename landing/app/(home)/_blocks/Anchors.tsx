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
}

/** How nuspace lands, in the reader's own words. Composed, so quote marks for
 *  the voice but no names under them. Copy from compass/nuspace/anchors.md in Go. */

/** Top row: first reactions, the value as a reader would put it. */
const TOP = [
  "everything i use, in one place, and it's all live",
  'this could replace half of my apps',
  'hold on, i can program everything, even the space itself?',
  'so i own all of it, on my machine?',
];

/** Middle row, the big one: nuspace through products the reader knows. */
const ANCHORS: Quote[] = [
  { known: 'Notion,', twist: 'but every block is a program.' },
  { known: 'A spreadsheet for anything,', twist: 'not just numbers.' },
  { known: 'A notebook', twist: 'that never goes stale.' },
  { known: 'An operating system', twist: 'for everything I know.' },
  { known: 'Our own Palantir,', twist: 'for company intel.' },
  { known: 'A homelab', twist: 'for my data, tools and agents.' },
];

/** Bottom row: asides on the wows. */
const ASIDES = [
  'wait, it all runs on my laptop?',
  'one line install? all state lives in just one folder?',
  'it just stays live',
  'so the table is code too',
  'nothing to deploy?',
  'everything talks to everything',
];

/** Drift speed of the top row, px a second. The others go as a multiple of it. */
const SPEED = 30;
const PACE = { far: 1, mid: 1.5, near: 2 } as const;

/** Each half of a track repeats its slips this many times, so it outruns the widest screen. */
const REPEAT = 2;

function Slip({ quote, hidden }: { quote: Quote | string; hidden: boolean }) {
  const q = typeof quote === 'string' ? { known: quote, twist: '' } : quote;
  return (
    <div className={s.slip} aria-hidden={hidden || undefined}>
      <p>
        {q.known}
        {q.twist ? <span className={s.dim}> {q.twist}</span> : null}
      </p>
    </div>
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
    <div className={cn(s.row, s[depth])} aria-hidden={depth === 'mid' || undefined}>
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
 * Anchors — right under the hero, no heading: a wall of first
 * reactions drifting at three depths, the familiar thing then its twist.
 */
export function Anchors() {
  return (
    <Section id="anchors" label="What nuspace is like" space="none" border={false} bleed>
      <div className={s.wall}>
        <Row items={TOP} depth="far" />
        <Row items={ANCHORS} depth="near" />
        <Row items={ASIDES} depth="mid" />
      </div>
    </Section>
  );
}

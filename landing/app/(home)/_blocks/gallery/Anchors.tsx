import { Marquee } from '@www/shared/components/media/Marquee';
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
const SPEED = 22;

/** Each depth: its pace, gap, direction and a start offset so the rows don't line up. */
const DEPTH = {
  far: { pace: 1, gap: '14px', reverse: true, offset: 0 },
  near: { pace: 2, gap: '18px', reverse: false, offset: 120 },
  mid: { pace: 1.5, gap: '16px', reverse: true, offset: 260 },
} as const;

function Slip({ quote }: { quote: Quote | string }) {
  const q = typeof quote === 'string' ? { known: quote, twist: '' } : quote;
  return (
    <p className={s.slip}>
      {q.known}
      {q.twist ? <span className={s.dim}> {q.twist}</span> : null}
    </p>
  );
}

function Row({ items, depth }: { items: (Quote | string)[]; depth: keyof typeof DEPTH }) {
  const d = DEPTH[depth];
  return (
    <Marquee
      items={items.map((q, i) => <Slip key={i} quote={q} />)}
      speed={SPEED * d.pace}
      gap={d.gap}
      reverse={d.reverse}
      offset={d.offset}
      decorative={depth === 'mid'}
      className={s[depth]}
    />
  );
}

/**
 * Anchors: a wall of first reactions drifting at three depths, the familiar
 * thing then its twist. Full bleed, under the gallery's row of spaces.
 */
export function Anchors() {
  return (
    <div className={s.wall} role="group" aria-label="What nuspace is like">
      <Row items={TOP} depth="far" />
      <Row items={ANCHORS} depth="near" />
      <Row items={ASIDES} depth="mid" />
    </div>
  );
}

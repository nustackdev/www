import type { ReactNode } from 'react';
import { Description } from '../text';
import type { Hue } from '../../lib/hue';
import s from './GainGrid.module.css';

export type GainHue = Hue | 'rose';
export type GainCols = 'auto' | 2 | 3;

export interface GainItem {
  /** Optional per-card hue. Falls back to the grid's hue. */
  hue?: GainHue;
  /** Small uppercase eyebrow. Optional. */
  kicker?: ReactNode;
  /** Card title. Rendered in mono. */
  title: ReactNode;
  /** Body copy. String or ReactNode; wrapped in Description. */
  body: ReactNode;
}

interface Props {
  /** Default hue applied to every card. Per-item hue overrides this. */
  hue?: GainHue;
  items: GainItem[];
  /** Column layout. "auto" (default) = auto-fill w/ 240px min; or 2 | 3. */
  cols?: GainCols;
  className?: string;
}

/**
 * GainGrid — hue-tinted card grid for "what your program gains" blocks.
 * Consolidates the six variants from fabric and tool pages.
 */
export function GainGrid({ hue = 'sage', items, cols = 'auto', className }: Props) {
  const cls = [s.grid, className].filter(Boolean).join(' ');
  return (
    <div className={cls} data-cols={String(cols)}>
      {items.map((item, i) => (
        <div key={i} className={s.card} data-hue={item.hue ?? hue}>
          {item.kicker ? <p className={s.kicker}>{item.kicker}</p> : null}
          <p className={s.title}>{item.title}</p>
          <Description>{item.body}</Description>
        </div>
      ))}
    </div>
  );
}

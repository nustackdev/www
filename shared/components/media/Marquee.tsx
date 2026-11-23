'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import s from './Marquee.module.css';

export interface MarqueeProps {
  /** The things that drift, in order. */
  items: ReactNode[];
  /** Drift speed, px a second. The loop time comes from the measured width, so rows of any length drift alike. */
  speed?: number;
  /** Drift right instead of left. */
  reverse?: boolean;
  /** Start the row this many px left, so stacked rows don't line up. */
  offset?: number;
  /** Each half repeats the items this many times, so it outruns the widest screen. */
  repeat?: number;
  /** Gap between items, any CSS length. */
  gap?: string;
  /** Hide the row from screen readers when it repeats what is said elsewhere. */
  decorative?: boolean;
  className?: string;
}

/**
 * Marquee: a row that drifts sideways forever. The items twice over, so
 * translateX(-50%) loops without a seam; the copies are hidden from screen
 * readers. Under reduced motion it stands still as a wrapped row of the items.
 */
export function Marquee({ items, speed = 30, reverse, offset = 0, repeat = 2, gap = '16px', decorative, className }: MarqueeProps) {
  const half = Array.from({ length: repeat }, () => items).flat();
  const track = useRef<HTMLDivElement>(null);

  // Font size and screen width change the loop's length, so re-measure.
  useEffect(() => {
    const el = track.current;
    const set = el?.firstElementChild as HTMLElement | null;
    if (!el || !set) return;
    const ro = new ResizeObserver(() => {
      const g = parseFloat(getComputedStyle(el).columnGap) || 0;
      el.style.setProperty('--dur', `${(set.offsetWidth + g) / speed}s`);
    });
    ro.observe(set);
    return () => ro.disconnect();
  }, [speed]);

  return (
    <div className={cn(s.root, className)} aria-hidden={decorative || undefined}>
      <div
        ref={track}
        className={s.track}
        data-reverse={reverse || undefined}
        style={{ '--gap': gap, marginLeft: offset ? -offset : undefined } as CSSProperties}
      >
        {[0, 1].map((h) => (
          <div key={h} className={s.set} data-copy={h === 1 || undefined}>
            {half.map((item, i) => (
              <div key={i} className={s.item} aria-hidden={h === 1 || i >= items.length || undefined}>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

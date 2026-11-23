'use client';

import type { CSSProperties } from 'react';
import { cn } from '@www/shared/lib/cn';
import { DemoLoop } from '../gallery/DemoLoop';
import { GALLERY, openDemo } from '../gallery/gallery.data';
import s from './Wall.module.css';

/** Columns and their drift times, s. Odd columns drift down, the rest up. */
const DURS = [50, 58, 65, 71, 79, 55];
/** Tiles per column, cycling through the gallery; each column repeats them
 *  once so the drift loops without a seam. Enough that one set is taller
 *  than the wall, so no column ever shows its end. */
const PER = 10;

/**
 * Wall: the hero's glimpse of the gallery. Tilted columns of space thumbs drift
 * slowly; hover lifts a tile and names it, a click opens it in the gallery
 * lightbox. Thumbs only, the loops stay in the gallery.
 */
export function Wall({ cols = DURS.length, className }: { cols?: number; className?: string }) {
  const n = GALLERY.length;
  return (
    <div className={cn(s.root, className)}>
      <div className={s.wall}>
        {DURS.slice(0, cols).map((d, c) => {
          const set = Array.from({ length: PER }, (_, k) => GALLERY[(c * 4 + k * 2) % n]);
          return (
            <div key={c} className={s.col} data-down={c % 2 ? '' : undefined} style={{ '--d': `${d}s` } as CSSProperties}>
              {[...set, ...set].map((g, i) => (
                <button
                  key={i}
                  type="button"
                  className={s.tile}
                  aria-label={`${g.name}: ${g.title}`}
                  tabIndex={i < PER && c < 3 ? 0 : -1}
                  aria-hidden={i >= PER || undefined}
                  onClick={() => openDemo(g.id)}
                >
                  <DemoLoop src={`/demos/${g.demo}`} live={false} eager />
                  <span className={s.tag} aria-hidden>
                    {g.name}
                  </span>
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

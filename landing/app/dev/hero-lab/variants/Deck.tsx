'use client';

import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DemoVideo } from '@www/shared/components/media/demo/DemoVideo';
import { cn } from '@www/shared/lib/cn';
import { DEMOS } from '../demos';
import { HeroHead } from '../HeroHead';
import { Preview } from '../Preview';
import lab from '../lab.module.css';
import s from './Deck.module.css';

const N = DEMOS.length;
/** Where card `i` sits from the front one: -2..2, wrapping. */
const offset = (i: number, at: number) => {
  const o = (((i - at) % N) + N) % N;
  return o > N / 2 ? o - N : o;
};

/** E: a fanned deck. The front card plays, the neighbours lean out behind it, so there is always more to pull. */
export function Deck() {
  const [at, setAt] = useState(0);
  const go = (to: number) => setAt(((to % N) + N) % N);
  const d = DEMOS[at];

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(at + 1);
    else if (e.key === 'ArrowLeft') go(at - 1);
    else return;
    e.preventDefault();
  };

  return (
    <>
      <HeroHead center />
      <div className={s.root} role="region" aria-roledescription="carousel" aria-label="Demos" onKeyDown={onKey}>
        <div className={s.stage}>
          {DEMOS.map((x, i) => {
            const o = offset(i, at);
            const front = o === 0;
            return (
              <div
                key={x.id}
                className={cn(s.card, front && s.front)}
                style={{ '--o': o, '--a': Math.abs(o) } as CSSProperties}
                aria-hidden={!front && Math.abs(o) > 1}
              >
                {front ? (
                  <DemoVideo key={x.id} src={`/demos/${x.id}`} />
                ) : (
                  <button
                    type="button"
                    className={s.back}
                    onClick={() => go(i)}
                    tabIndex={Math.abs(o) === 1 ? 0 : -1}
                    aria-label={`Play ${x.name}: ${x.title}`}
                  >
                    <Preview id={x.id} play={Math.abs(o) === 1} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className={s.nav}>
          <button type="button" className={s.arrow} onClick={() => go(at - 1)} aria-label="Previous demo">
            <ChevronLeft size={16} aria-hidden />
          </button>
          <div className={s.now} aria-live="polite">
            <span className={lab.kicker}>
              {d.name} <span className={s.count}>{at + 1}/{N}</span>
            </span>
            <span className={s.nowTitle}>{d.title}</span>
          </div>
          <button type="button" className={s.arrow} onClick={() => go(at + 1)} aria-label="Next demo">
            <ChevronRight size={16} aria-hidden />
          </button>
        </div>
        <div className={s.dots} role="group" aria-label="Pick a demo">
          {DEMOS.map((x, i) => (
            <button
              key={x.id}
              type="button"
              className={cn(s.dot, i === at && s.dotOn)}
              aria-label={x.name}
              aria-current={i === at ? 'true' : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

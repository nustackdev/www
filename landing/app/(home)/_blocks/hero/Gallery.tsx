'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react';
import { DemoVideo } from '@www/shared/components/media/demo/DemoVideo';
import { cn } from '@www/shared/lib/cn';
import { GALLERY } from './gallery.data';
import { DemoLoop } from './DemoLoop';
import s from './Gallery.module.css';

/** The real demos only: a tab needs a clip to put on stage. */
const DEMOS = GALLERY.filter((g) => g.demo);

/** Wait for the stage clip before the loops load, or give up waiting after this. */
const LOOPS_AFTER_MS = 4000;

/** Each half of the stage swap: fade out, then fade in. */
const FADE_MS = 180;

const CALM = '(prefers-reduced-motion: reduce)';
const onCalm = (cb: () => void) => {
  const mq = window.matchMedia(CALM);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
/** Reduced motion, live: then a swap is instant. */
const useCalm = () => useSyncExternalStore(onCalm, () => window.matchMedia(CALM).matches, () => false);

/**
 * Gallery: the hero's demos. A line above names them, then one frame: a row
 * of cards, each a small loop with its name on it, and the picked demo
 * playing big under them. Hover rings a card, a click puts it on stage; the
 * stage fades out and the new demo fades in.
 */
export function Gallery() {
  const [active, setActive] = useState(DEMOS[0].id);
  /** What the stage shows; it trails `active` by one fade-out. */
  const [shown, setShown] = useState(active);
  const [out, setOut] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const [loops, setLoops] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const calm = useCalm();

  // The loops wait for the stage clip, so they never compete with it.
  useEffect(() => {
    const el = stage.current;
    const go = () => setLoops(true);
    const t = window.setTimeout(go, LOOPS_AFTER_MS);
    el?.addEventListener('loadeddata', go, { capture: true, once: true });
    return () => {
      clearTimeout(t);
      el?.removeEventListener('loadeddata', go, { capture: true });
    };
  }, []);

  const pick = (id: string) => {
    if (id === active) return;
    setActive(id);
    setSwapped(true);
    if (calm) setShown(id);
    else setOut(id !== shown);
  };

  // Stage: the old demo fades out, then the latest pick mounts and fades in.
  useEffect(() => {
    if (!out) return;
    const t = window.setTimeout(() => {
      setShown(active);
      setOut(false);
    }, FADE_MS);
    return () => clearTimeout(t);
  }, [out, active]);

  const at = DEMOS.findIndex((g) => g.id === active);
  const onKey = (e: KeyboardEvent) => {
    const n = DEMOS.length;
    const to = e.key === 'ArrowRight' ? (at + 1) % n : e.key === 'ArrowLeft' ? (at - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (to < 0) return;
    e.preventDefault();
    pick(DEMOS[to].id);
    tabs.current[to]?.focus();
  };

  const item = DEMOS.find((g) => g.id === shown)!;

  return (
    <div className={s.root}>
      <p className={s.lead}>
        <span className={s.leadTitle}>nuspace in action</span>
        <span className={s.leadNote}>Pick a demo to see it run.</span>
      </p>
      <div className={s.frame}>
        <div className={s.deck} role="tablist" aria-label="Demos" onKeyDown={onKey}>
          {DEMOS.map((g, i) => {
            const on = g.id === active;
            return (
              <button
                key={g.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={on}
                aria-label={`${g.name}: ${g.title}`}
                tabIndex={on ? 0 : -1}
                className={cn(s.card, on && s.cardOn)}
                onClick={() => pick(g.id)}
              >
                <span className={s.media}>
                  <DemoLoop src={`/demos/${g.demo}`} live={loops} />
                </span>
                <span className={s.name} aria-hidden>
                  {g.name}
                </span>
              </button>
            );
          })}
        </div>
        <div ref={stage} className={s.stage} role="tabpanel">
          <div key={shown} className={cn(s.layer, swapped && s.fadeIn, out && s.fadeOut)}>
            <DemoVideo src={`/demos/${item.demo}`} label={item.title} eager />
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import s from './Fan.module.css';

const SRC = '/demos/showcase';

/* The fan curve over depth a = 0..4 (the centre, then four steps out each side). */
const N = 9;
const STEP = 200; // px out per step
const ANG = 2.5; // deg per step
const DROP = 12; // px, grows as a^1.4
const DROP_EX = 1.4;
const SCALE = 0.03; // smaller per step
const Z = -40; // px back per step
const DIM = 0.18; // more ground laid over per step
const ELEV = ['raised', 'raised', 'raised', 'none'] as const;

interface Card {
  a: number;
  img: string;
  style: CSSProperties;
  elev: (typeof ELEV)[number];
}

/** Outermost first, so the centre lands on top. Image s0 is the centre,
 *  then s1/s2 the first step left/right, s3/s4 the next, and so on. */
const CARDS: Card[] = (() => {
  const half = (N - 1) / 2;
  const out: Card[] = [];
  for (let a = half; a >= 0; a--) {
    for (const sg of a === 0 ? [0] : [-1, 1]) {
      const idx = a === 0 ? 0 : 2 * a - (sg < 0 ? 1 : 0);
      out.push({
        a,
        img: `s${idx}`,
        elev: ELEV[Math.min(a, ELEV.length - 1)],
        style: {
          '--a': a,
          '--tx': `${sg * STEP * a}px`,
          '--ty': `${DROP * Math.pow(a, DROP_EX)}px`,
          '--rot': `${(ANG * a * sg).toFixed(2)}deg`,
          '--s': (1 - SCALE * a).toFixed(3),
          '--z': `${Z * a}px`,
          '--dim': Math.min(0.85, DIM * a).toFixed(2),
          zIndex: 20 - a,
        } as CSSProperties,
      });
    }
  }
  return out;
})();

const CALM = '(prefers-reduced-motion: reduce)';

/** Fan: nine screens built in nuspace, spanning past the frame and darker
 *  with each step out, rising out of the frame it holds (the install).
 *  Opens once on scroll in, with a small parallax. */
export function Fan({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    // Open once: the class goes on the node, nothing to re-render.
    const open = () => el.classList.add(s.open);
    if (window.matchMedia(CALM).matches || !('IntersectionObserver' in window)) {
      open();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          open();
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
      el.style.setProperty('--p', p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    tick();
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={s.rise}>
      <div ref={root} className={s.stage} aria-hidden>
        {CARDS.map((c) => (
          <div key={c.img} className={s.card} data-a={c.a} data-elev={c.elev} style={c.style}>
            <div className={s.pl}>
              <div className={s.fc}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={s.light} src={`${SRC}/${c.img}-light.webp`} alt="" loading="lazy" decoding="async" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={s.dark} src={`${SRC}/${c.img}-dark.webp`} alt="" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={s.install}>{children}</div>
    </div>
  );
}

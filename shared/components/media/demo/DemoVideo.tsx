'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '../../../lib/cn';
import { chapterAt, loadSidecar, type DemoChapter } from './chapters';
import s from './DemoVideo.module.css';

type Theme = 'light' | 'dark';
type Intent = 'auto' | 'play' | 'pause';

/** The loop seam and theme flips crossfade over --site-dur-slow. */
const FADE = 0.28;
/** How long before the end the second buffer gets ready at 0. */
const PREP = 2;
/** Start loading this far ahead of the viewport. */
const NEAR = '600px 0px';
/** A fill move bigger than this share of the bar is a jump, and glides. */
const JUMP = 0.02;
const GLIDE_MS = 420;
/** Half the see-through cut between chapters on the bar, px. */
const CUT = 1.5;

/** The bar's mask: solid, with a see-through cut at every chapter start. */
function cuts(at: number[]) {
  const stops = ['#000 0'];
  for (const p of at)
    stops.push(
      `#000 calc(${p}% - ${CUT}px)`,
      `transparent calc(${p}% - ${CUT}px)`,
      `transparent calc(${p}% + ${CUT}px)`,
      `#000 calc(${p}% + ${CUT}px)`,
    );
  return `linear-gradient(90deg, ${stops.join(', ')})`;
}

export interface DemoVideoProps {
  /** The demo's folder, eg `/demos/hero`. Files in it follow README.md. */
  src: string;
  /** What it shows, for screen readers. Falls back to the sidecar's label. */
  label?: string;
  /** Frame aspect ratio, reserved up front so nothing shifts. */
  ratio?: string;
  /** Chapters inline instead of the sidecar, or false for none. */
  chapters?: DemoChapter[] | false;
  /** The chapter playing as a subtitle on the frame: number, title, note. */
  caption?: boolean;
  /** Above the fold: poster and clip load at once, not near the viewport. */
  eager?: boolean;
  /** On narrow screens the frame runs past the column, cut by the window. */
  bleed?: boolean;
  className?: string;
}

/** webm (VP9) where the browser is sure of it, h264 mp4 everywhere else. */
function pickExt(): 'webm' | 'mp4' {
  const v = document.createElement('video');
  return v.canPlayType('video/webm; codecs="vp9"') === 'probably' ? 'webm' : 'mp4';
}

function once(el: HTMLElement, ev: string) {
  return new Promise<void>((done) => el.addEventListener(ev, () => done(), { once: true }));
}

/**
 * DemoVideo: a recorded demo, played like a product embed: muted, looping
 * with a crossfade at the seam, in the site's theme, told by chapters on the
 * frame like the tape player: a subtitle low in the middle, a timeline cut
 * into chapters along the bottom edge. Two stacked videos take turns, so the loop and a
 * theme flip both land without a stutter. Loads near the viewport, plays only
 * while seen, and holds on the poster under reduced motion or save data.
 */
export function DemoVideo({
  src,
  label,
  ratio = '16 / 10',
  chapters: given,
  caption = true,
  eager,
  bleed,
  className,
}: DemoVideoProps) {
  const { resolvedTheme } = useTheme();
  const theme: Theme | null = resolvedTheme ? (resolvedTheme === 'dark' ? 'dark' : 'light') : null;

  const rootRef = useRef<HTMLDivElement>(null);
  const v0 = useRef<HTMLVideoElement>(null);
  const v1 = useRef<HTMLVideoElement>(null);
  const vid = (i: number) => (i === 0 ? v0 : v1).current!;
  const active = useRef(0);
  const busy = useRef(false);
  const flipping = useRef(false);
  const token = useRef(0);
  const ext = useRef<'webm' | 'mp4'>('mp4');
  const fill = useRef<HTMLSpanElement>(null);
  const idxRef = useRef(0);

  const [sidecar, setSidecar] = useState<{ label?: string; duration?: number; chapters: DemoChapter[] } | null>(
    given ? { chapters: given } : null,
  );
  const [near, setNear] = useState(!!eager);
  const [seen, setSeen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [calm, setCalm] = useState<boolean | null>(null);
  const [intent, setIntent] = useState<Intent>('auto');
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [layers, setLayers] = useState<{ top: number; under: number | null }>({ top: 0, under: null });
  const [idx, setIdx] = useState(0);
  const [clipDur, setDur] = useState<number | null>(null);

  const chapters = useMemo(() => (given === false ? [] : (sidecar?.chapters ?? [])), [given, sidecar]);
  const url = (t: Theme) => `${src}/${t}.${ext.current}`;
  /** Clip length: from the video once known, the sidecar until then. */
  const dur = clipDur ?? sidecar?.duration ?? null;
  const want = near && seen && !hidden && calm !== null && (intent === 'play' || (intent === 'auto' && !calm));

  // Calm: reduced motion or save data. Then no autoplay, the poster holds.
  useEffect(() => {
    ext.current = pickExt();
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const sync = () => setCalm(mq.matches || saveData);
    sync();
    mq.addEventListener('change', sync);
    const vis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', vis);
    return () => {
      mq.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', vis);
    };
  }, []);

  // Near the viewport: load. In it: play.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ioNear = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: NEAR });
    const ioSeen = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.2 });
    ioNear.observe(el);
    ioSeen.observe(el);
    return () => {
      ioNear.disconnect();
      ioSeen.disconnect();
    };
  }, []);

  useEffect(() => {
    if (given !== undefined || !near) return;
    let live = true;
    loadSidecar(src).then((sc) => live && sc && setSidecar(sc));
    return () => {
      live = false;
    };
  }, [src, near, given]);

  /** Put video `i` on top, crossfading over the one under it. */
  const promote = useCallback((i: number) => {
    const prev = active.current;
    active.current = i;
    setLayers({ top: i, under: prev === i ? null : prev });
    setPlaying(!vid(i).paused);
    window.setTimeout(() => {
      if (active.current !== i) return;
      if (prev !== i) vid(prev).pause();
      setLayers({ top: i, under: null });
      busy.current = false;
      flipping.current = false;
    }, FADE * 1000);
  }, []);

  // First load, and the theme flips: the other buffer loads the new theme at
  // the same moment, then crossfades in.
  useEffect(() => {
    if (!near || !theme || calm === null) return;
    const a = vid(active.current);
    const next = new URL(url(theme), location.href).href;
    if (!a.src) {
      a.preload = calm ? 'metadata' : 'auto';
      a.src = next;
      return;
    }
    if (a.src === next) return;
    const my = ++token.current;
    busy.current = true;
    flipping.current = true;
    const wasPlaying = !a.paused;
    a.pause();
    const at = a.currentTime;
    const bi = 1 - active.current;
    const b = vid(bi);
    b.preload = 'auto';
    b.src = next;
    (async () => {
      if (b.readyState < 1) await once(b, 'loadedmetadata');
      if (my !== token.current) return;
      b.currentTime = Math.min(at, Math.max(0, b.duration - 0.05));
      await once(b, 'seeked');
      if (my !== token.current) return;
      if (wasPlaying) await b.play().catch(() => {});
      if (my !== token.current) return;
      promote(bi);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near, theme, calm, src, promote]);

  // Play while wanted and seen, pause otherwise.
  useEffect(() => {
    const a = v0.current && vid(active.current);
    if (!a || !a.src || busy.current) return;
    if (want) a.play().catch(() => {});
    else a.pause();
  }, [want, near, theme]);

  // The clock: the fill every frame, the loop seam near the end.
  useEffect(() => {
    let raf = 0;
    let last = -1;
    let glide = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const a = vid(active.current);
      const d = a.duration;
      if (!d || Number.isNaN(d)) return;
      const t = a.currentTime;

      if (!a.paused && !busy.current) {
        const left = d - t;
        const bi = 1 - active.current;
        const b = vid(bi);
        if (left < PREP) {
          if (b.src !== a.src) {
            b.preload = 'auto';
            b.src = a.src;
          } else if (b.currentTime !== 0 && !b.seeking) {
            b.currentTime = 0;
          }
        }
        if (left <= FADE && b.src === a.src && b.readyState >= 3 && b.currentTime === 0 && !b.seeking) {
          busy.current = true;
          const my = token.current;
          b.play().then(
            () => my === token.current && promote(bi),
            () => (busy.current = false),
          );
        }
      }

      // One fill along the whole take; a jump either way glides as one line.
      const el = fill.current;
      const k = Math.min(1, Math.max(0, t / d));
      if (el && k !== last) {
        if (last >= 0 && Math.abs(k - last) > JUMP) {
          el.dataset.jump = '';
          clearTimeout(glide);
          glide = window.setTimeout(() => delete el.dataset.jump, GLIDE_MS);
        }
        last = k;
        el.style.transform = `scaleX(${k})`;
      }
      const at = chapters.length ? chapterAt(chapters, t) : 0;
      if (at !== idxRef.current) {
        idxRef.current = at;
        setIdx(at);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(glide);
    };
  }, [chapters, promote]);

  const onEvent = (i: number) => (e: { type: string }) => {
    if (i !== active.current) return;
    const a = vid(i);
    if (e.type === 'loadedmetadata' && a.duration) setDur(a.duration);
    if (e.type === 'loadeddata') setReady(true);
    if (e.type === 'play' || e.type === 'playing') setPlaying(true);
    if (e.type === 'pause' && !flipping.current) setPlaying(false);
    // The second buffer was not ready in time: loop in place.
    if (e.type === 'ended') {
      a.currentTime = 0;
      a.play().catch(() => {});
    }
  };

  const toggle = () => {
    const a = vid(active.current);
    const now = a.src ? !a.paused : want;
    setIntent(now ? 'pause' : 'play');
    if (a.src) (now ? a.pause() : a.play().catch(() => {}));
  };

  /** Play from `t` seconds. */
  const seek = (t: number) => {
    token.current++;
    busy.current = false;
    flipping.current = false;
    const a = vid(active.current);
    if (!a.src && theme) a.src = url(theme);
    a.currentTime = Math.max(0, t);
    setIntent('play');
    a.play().catch(() => {});
  };

  // A press on the bar plays from that point; a key on a chapter, from its start.
  const onBarPointer = (e: PointerEvent<HTMLDivElement>) => {
    if (!dur) return;
    const r = e.currentTarget.getBoundingClientRect();
    seek(((e.clientX - r.left) / r.width) * dur);
  };

  const onRootKey = (e: KeyboardEvent) => {
    if (e.key === 'k') {
      e.preventDefault();
      toggle();
    }
  };

  const onScreenKey = (e: KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle();
    }
  };

  const name = label ?? sidecar?.label;
  const cur = chapters[idx];
  const at = (t: number) => (dur ? Math.min(1, Math.max(0, t / dur)) * 100 : 0);
  const videoCls = (i: number) =>
    cn(s.video, ready && (layers.top === i ? s.top : layers.under === i ? s.under : null));
  const media = { muted: true, playsInline: true, disablePictureInPicture: true, 'aria-hidden': true } as const;

  return (
    <div
      ref={rootRef}
      className={cn(s.root, bleed && s.bleed, className)}
      role="region"
      aria-roledescription="demo"
      aria-label={name}
      onKeyDown={onRootKey}
    >
      <div className={s.screen} style={{ aspectRatio: ratio }}>
        <div
          className={s.stage}
          role="button"
          tabIndex={0}
          aria-label={playing ? 'Pause demo' : 'Play demo'}
          aria-pressed={!playing}
          data-ring="inset"
          onClick={toggle}
          onKeyDown={onScreenKey}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={cn(s.poster, s.posterLight)} src={`${src}/poster-light.jpg`} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={cn(s.poster, s.posterDark)} src={`${src}/poster-dark.jpg`} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" />
          {[0, 1].map((i) => (
            <video
              key={i}
              ref={i === 0 ? v0 : v1}
              className={videoCls(i)}
              preload="none"
              {...media}
              onLoadedMetadata={onEvent(i)}
              onLoadedData={onEvent(i)}
              onPlay={onEvent(i)}
              onPlaying={onEvent(i)}
              onPause={onEvent(i)}
              onEnded={onEvent(i)}
            />
          ))}
        </div>

        {caption && cur ? (
          <div className={s.subs} aria-live="off">
            <div key={idx} className={s.line}>
              <span className={s.num}>
                {String(idx + 1).padStart(2, '0')}
                <span className={s.of}>/{String(chapters.length).padStart(2, '0')}</span>
              </span>
              <span className={s.text}>
                <b className={s.title}>{cur.title}</b>
                {cur.note ? <span className={s.note}>{cur.note}</span> : null}
              </span>
            </div>
          </div>
        ) : null}

        {chapters.length && dur ? (
          <div className={s.bar} onPointerDown={onBarPointer}>
            <div
              className={s.track}
              style={{ maskImage: cuts(chapters.slice(1).map((c) => at(c.t))) }}
            >
              <span ref={fill} className={s.fill} />
            </div>
            <ol className={s.hits}>
              {chapters.map((c, i) => {
                const from = at(c.t);
                const to = chapters[i + 1] ? at(chapters[i + 1].t) : 100;
                return (
                  <li key={c.t} style={{ left: `${from}%`, width: `${to - from}%` }}>
                    <button
                      type="button"
                      className={s.hit}
                      aria-current={i === idx ? 'step' : undefined}
                      aria-label={`Chapter ${i + 1}: ${c.title}`}
                      title={c.title}
                      onPointerDown={(e) => e.preventDefault()}
                      onClick={(e) => e.detail === 0 && seek(c.t)}
                    />
                  </li>
                );
              })}
            </ol>
          </div>
        ) : null}
      </div>
    </div>
  );
}

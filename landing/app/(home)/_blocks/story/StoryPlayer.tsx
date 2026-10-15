'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useTheme } from 'next-themes';
import { CLICK_MS, TapeCursor } from '../scene/TapeCursor';
import { Engine, FADE_MS, loadScene, pointerAt, TAKE_KEY } from './engine';
import { Scrubber } from './Scrubber';
import { beatAt, type Beat } from './stories';
import s from './StoryPlayer.module.css';

/** The nuspace build every scene plays in, as scripts/scenes.mjs writes it. */
const APP = '/scenes/nuspace/index.html';
/** A clock step longer than this is a jump: its clicks are not drawn. */
const JUMP_MS = 250;
const NO_BEATS: Beat[] = [];

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export interface StoryPlayerHandle {
  /**
   * Move the clock to `t`, ms of the take. Paused or playing, it stays so.
   * A `jump` (a step, Home, End) far ahead loads in rather than playing through.
   */
  seek(t: number, opts?: { jump?: boolean }): void;
  /** Play; at the end, from the top unless `rewind` is false (then the end holds first). */
  play(opts?: { rewind?: boolean }): void;
  pause(): void;
  /** The clock, ms of the take. */
  time(): number;
  /** The playable part of the take, once loaded. */
  range(): [number, number] | null;
  readonly playing: boolean;
}

export interface StoryPlayerProps {
  /** Url of the scene.json. */
  scene: string;
  /** Accessible description of what the scene shows. */
  label: string;
  /** Frame width / height, reserved up front. */
  aspect?: number;
  /** Starts playing once on screen. Off anyway under reduced motion. */
  autoplay?: boolean;
  loop?: boolean;
  /** The frame is a scrub control: press and drag through the take, keys too, a play button when paused. */
  controls?: boolean;
  /** The take's steps, if it has them: the scrubber names them and the big keys step by them. */
  beats?: Beat[];
  /** Pause at the end before looping, ms. */
  hold?: number;
  /** Every frame the clock moved. */
  onTime?: (t: number) => void;
  onPlaying?: (on: boolean) => void;
  /** The scene is loaded: its playable range. */
  onRange?: (range: [number, number]) => void;
  /** Drawn over the replay, above the controls. */
  children?: ReactNode;
  className?: string;
}

/**
 * StoryPlayer — a tape scene replayed in the real app, on a clock the page
 * controls: play, pause, seek both ways. Loads once near the viewport,
 * advances only while on screen. The app runs at its recorded size, scaled
 * to fit, and can't be reached: the overlay owns the pointer.
 */
export const StoryPlayer = forwardRef<StoryPlayerHandle, StoryPlayerProps>(function StoryPlayer(
  {
    scene: src,
    label,
    aspect = 16 / 10,
    autoplay = true,
    loop = true,
    hold = 1800,
    controls = false,
    beats = NO_BEATS,
    onTime,
    onPlaying,
    onRange,
    children,
    className,
  },
  ref,
) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
  const box = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const clicks = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [takes, setTakes] = useState<{ ids: string[]; front: string | null }>({ ids: [], front: null });
  const [viewport, setViewport] = useState<{ width: number; height: number } | null>(null);
  const [fit, setFit] = useState({ scale: 0, x: 0, y: 0 });
  // What the controls show. The clock is kept to the second and the step, so
  // the page re-renders at most about once a second while it plays.
  const [range, setRange] = useState<[number, number] | null>(null);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(0);
  const [second, setSecond] = useState(0);

  const cb = useRef({ onTime, onPlaying, onRange });
  const beatsRef = useRef(beats);
  useEffect(() => {
    cb.current = { onTime, onPlaying, onRange };
    beatsRef.current = beats;
  });

  const [e] = useState(
    () =>
      new Engine(
        {
          takes: (ids, front) => setTakes({ ids, front }),
          playing: (on) => {
            setPlaying(on);
            cb.current.onPlaying?.(on);
          },
        },
        { autoplay: autoplay && !prefersReducedMotion(), loop, hold },
      ),
  );
  // New takes boot in the site's theme.
  useEffect(() => {
    e.storage = { 'nuspace.theme': theme };
  }, [e, theme]);

  const handle = useMemo<StoryPlayerHandle>(
    () => ({
      seek: (t, opts) => e.seek(t, opts),
      play: (opts) => e.play(opts),
      pause: () => e.pause(),
      time: () => e.t,
      range: () => (e.scene ? [e.start, e.end] : null),
      get playing() {
        return e.playing;
      },
    }),
    [e],
  );
  useImperativeHandle(ref, () => handle, [handle]);

  // Near the viewport: load. In it: advance.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const near = new IntersectionObserver(([x]) => x.isIntersecting && setNear(true), { rootMargin: '400px' });
    const seen = new IntersectionObserver(([x]) => (e.visible = x.isIntersecting), { threshold: 0.25 });
    near.observe(el);
    seen.observe(el);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, [e]);

  // The scene, once near and the theme is known, so the first take boots in it.
  useEffect(() => {
    if (!near || !resolvedTheme) return;
    let dead = false;
    loadScene(src).then(
      (scene) => {
        if (dead || e.scene) return;
        e.setScene(scene);
        setViewport(scene.meta.viewport);
        setRange([e.start, e.end]);
        setPlaying(e.playing);
        cb.current.onRange?.([e.start, e.end]);
      },
      (err) => console.error(err),
    );
    return () => {
      dead = true;
    };
  }, [near, resolvedTheme, src, e]);

  // The app reads its theme once, as it starts: a flip needs a fresh take.
  const lastTheme = useRef(theme);
  useEffect(() => {
    if (lastTheme.current === theme) return;
    lastTheme.current = theme;
    e.restart();
  }, [theme, e]);

  useEffect(() => {
    const onMessage = (ev: MessageEvent) => e.message(ev.data);
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [e]);

  useEffect(() => {
    e.mount();
    return () => e.dispose();
  }, [e]);

  // Scale the recorded viewport into the frame, centered.
  useEffect(() => {
    const el = box.current;
    if (!el || !viewport) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const scale = Math.min(w / viewport.width, h / viewport.height);
      setFit({ scale, x: (w - viewport.width * scale) / 2, y: (h - viewport.height * scale) / 2 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [viewport]);

  // The frame loop: clock, cursor, clicks.
  useEffect(() => {
    if (!viewport) return;
    let raf = 0;
    let last = 0;
    let lastT = -1;
    let lastClock = -1;
    let lastPtr = -1;
    const draw = (ts: number) => {
      raf = requestAnimationFrame(draw);
      const dt = last ? Math.min(ts - last, 100) : 0;
      last = ts;
      e.frame(dt);
      const scene = e.scene;
      if (!scene) return;
      if (e.t !== lastClock) {
        lastClock = e.t;
        setActive(beatAt(beatsRef.current, e.t));
        setSecond(Math.floor(e.t / 1000));
        cb.current.onTime?.(e.t);
      }
      // The cursor goes with what is on screen, not the clock, while a take loads in.
      const now = e.shown;
      if (now === lastT) return;

      const track = scene.pointer;
      const i = pointerAt(track, now);
      const el = cursor.current;
      if (el) {
        const a = track[i];
        if (!a || a[3] === 3) el.style.opacity = '0';
        else {
          // Samples come at frame rate; easing between them hides the jitter.
          const b = track[i + 1];
          let x = a[1];
          let y = a[2];
          if (b && b[3] !== 3 && b[0] > a[0]) {
            const k = Math.min(1, (now - a[0]) / (b[0] - a[0]));
            x += (b[1] - x) * k;
            y += (b[2] - y) * k;
          }
          el.style.opacity = '1';
          el.style.transform = `translate(${x}px, ${y}px)`;
          el.dataset.down = a[3] === 1 ? '1' : '0';
        }
      }
      // Clicks only when played through, not when jumped over.
      const step = now - lastT;
      if (lastT >= 0 && step > 0 && step < JUMP_MS)
        for (let j = Math.max(0, lastPtr + 1); j <= i; j++) {
          const p = track[j];
          if (p[3] === 1 && (j === 0 || track[j - 1][3] !== 1)) spawnClick(p[1], p[2]);
        }
      lastPtr = i;
      lastT = now;
    };
    const spawnClick = (x: number, y: number) => {
      const host = clicks.current;
      if (!host) return;
      const el = document.createElement('div');
      el.className = s.click;
      el.style.transform = `translate(${x}px, ${y}px)`;
      host.appendChild(el);
      setTimeout(() => el.remove(), CLICK_MS);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [viewport, e]);

  return (
    <div
      ref={box}
      className={`${s.box} ${className ?? ''}`}
      style={{ aspectRatio: String(aspect) }}
    >
      {!takes.front && <div className={s.loading} aria-hidden />}
      {viewport && (
        <div
          ref={stage}
          className={s.stage}
          style={{
            width: viewport.width,
            height: viewport.height,
            transform: `translate(${fit.x}px, ${fit.y}px) scale(${fit.scale})`,
            opacity: fit.scale ? 1 : 0,
          }}
          role="img"
          aria-label={label}
        >
          {takes.ids.map((id, i) => (
            <iframe
              key={id}
              ref={(el) => e.attach(id, el?.contentWindow ?? null)}
              src={`${APP}#${TAKE_KEY}=${id}`}
              title={label}
              tabIndex={-1}
              aria-hidden
              className={s.take}
              style={{
                // The shown take and any older one fading out under it stay opaque,
                // so a swap is the new one fading in over a full picture, never a dip.
                opacity: i <= takes.ids.indexOf(takes.front ?? '') ? 1 : 0,
                zIndex: id === takes.front ? 1 : 0,
                transitionDuration: `${FADE_MS}ms`,
              }}
            />
          ))}
          <div ref={clicks} className={s.clicks} />
          <div ref={cursor} className={s.cursor}>
            <TapeCursor />
          </div>
        </div>
      )}
      {/* Over the replay, so touch never reaches it: iOS scrolls an iframe's page despite pointer-events none. */}
      <div className={s.overlay}>
        {/* Client only, once loaded: the scrubber floats over the window, portaled to the body. */}
        {controls && viewport && (
          <Scrubber
            player={handle}
            beats={beats}
            range={range}
            playing={playing}
            active={active}
            time={second * 1000}
            label={`Scrub through: ${label}`}
          />
        )}
        {children}
      </div>
    </div>
  );
});


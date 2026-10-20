'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent } from 'react';
import { BookOpen, FlaskConical, GitPullRequest, Server, Wallet, type LucideIcon } from 'lucide-react';
import { DemoVideo } from '@www/shared/components/media/demo/DemoVideo';
import { cn } from '@www/shared/lib/cn';
import { GALLERY, type GalleryItem } from './gallery.data';
import { DemoLoop } from './DemoLoop';
import s from './Gallery.module.css';

/** Thumb cells around the 4x4 stage on a 5x5 grid: four down the right, five along the bottom. */
const SLOTS: [number, number][] = [
  [5, 1], [5, 2], [5, 3], [5, 4],
  [1, 5], [2, 5], [3, 5], [4, 5], [5, 5],
];

const SOON_ICON: Record<string, LucideIcon> = {
  money: Wallet,
  research: FlaskConical,
  notes: BookOpen,
  github: GitPullRequest,
  homelab: Server,
};

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
 * Gallery: the hero's demos. The tour plays big on the stage, every other
 * demo sits as a small loop in an L around it, the coming ones as plain
 * tiles. A tab line above names them all and follows the same selection:
 * hover or focus a tab to peek, click a tab or a thumb to put it on stage.
 * A swap fades the stage out and the new demo in; the traded thumb settles
 * in its own slot. Opacity and a small scale only, no box moves.
 */
export function Gallery() {
  /** Slot order: the stage first, then the nine thumb slots. A pick trades the stage and that slot. */
  const [order, setOrder] = useState(() => GALLERY.map((g) => g.id));
  /** What the stage shows; it trails `order[0]` by one fade-out. */
  const [shown, setShown] = useState('hero');
  const [out, setOut] = useState(false);
  /** The demo that just landed in a thumb slot, animated in place there. */
  const [landed, setLanded] = useState<string | null>(null);
  const [swapped, setSwapped] = useState(false);
  const [peek, setPeek] = useState<string | null>(null);
  const [loops, setLoops] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const active = order[0];
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
    if (id === active || !GALLERY.find((g) => g.id === id)?.demo) return;
    setOrder((o) => {
      const i = o.indexOf(id);
      const next = [...o];
      [next[0], next[i]] = [next[i], next[0]];
      return next;
    });
    setLanded(active);
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

  const item = (id: string) => GALLERY.find((g) => g.id === id)!;

  return (
    <div className={s.root}>
      <TabLine active={active} peek={peek} setPeek={setPeek} pick={pick} />
      <div className={s.wrap}>
        <div className={s.grid}>
          <div ref={stage} className={s.stage}>
            <div key={shown} className={cn(s.layer, swapped && s.fadeIn, out && s.fadeOut)}>
              <DemoVideo src={`/demos/${item(shown).demo}`} eager />
            </div>
          </div>
          {order.slice(1).map((id, i) => (
            <Thumb
              key={id}
              g={item(id)}
              style={{ gridColumn: SLOTS[i][0], gridRow: SLOTS[i][1] }}
              landed={landed === id}
              live={loops}
              peeked={peek === id}
              onPick={() => pick(id)}
              onPeek={(on) => setPeek(on ? id : null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ThumbProps {
  g: GalleryItem;
  style: CSSProperties;
  /** Just traded in from the stage: settles in place (a small press, opacity up). */
  landed: boolean;
  live: boolean;
  peeked: boolean;
  onPick: () => void;
  onPeek: (on: boolean) => void;
}

/** A small thumb: the loop, or a plain tile for a demo still to shoot. Hover or focus: a 2px edge and its label. */
function Thumb({ g, style, landed, live, peeked, onPick, onPeek }: ThumbProps) {
  const Icon = SOON_ICON[g.id];
  const inner = (
    <span className={cn(s.media, landed && s.landed)}>
      {g.demo ? (
        <DemoLoop src={`/demos/${g.demo}`} live={live} />
      ) : (
        <span className={s.soonArt} aria-hidden>
          {Icon ? <Icon size={16} strokeWidth={1.6} /> : null}
        </span>
      )}
      <span className={s.label} aria-hidden>
        {g.demo ? g.eyebrow : `${g.name} · soon`}
      </span>
    </span>
  );
  const hover = {
    onPointerEnter: (e: { pointerType: string }) => e.pointerType === 'mouse' && onPeek(true),
    onPointerLeave: () => onPeek(false),
  };

  if (!g.demo) {
    return (
      <div className={cn(s.thumb, s.soon)} style={style} data-peek={peeked || undefined} role="img" aria-label={`Coming soon: ${g.name}`} {...hover}>
        {inner}
      </div>
    );
  }
  return (
    <button
      type="button"
      className={s.thumb}
      style={style}
      data-peek={peeked || undefined}
      onClick={onPick}
      onFocus={() => onPeek(true)}
      onBlur={() => onPeek(false)}
      aria-label={`Play ${g.name}: ${g.title}`}
      {...hover}
    >
      {inner}
    </button>
  );
}

/** Every demo in one line, real and coming. Hover or focus peeks, click or Enter puts it on stage. */
function TabLine({
  active,
  peek,
  setPeek,
  pick,
}: {
  active: string;
  peek: string | null;
  setPeek: (id: string | null) => void;
  pick: (id: string) => void;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const box = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ id: string; x: number } | null>(null);
  const n = GALLERY.length;
  const at = GALLERY.findIndex((g) => g.id === active);

  /** Peek card centred under tab `i`, kept inside the line. */
  const show = (i: number) => {
    const b = box.current?.getBoundingClientRect();
    const r = refs.current[i]?.getBoundingClientRect();
    if (!b || !r) return;
    const half = Math.min(130, b.width / 2);
    setHover({ id: GALLERY[i].id, x: Math.min(b.width - half, Math.max(half, r.left - b.left + r.width / 2)) });
    setPeek(GALLERY[i].id);
  };
  const hide = () => {
    setHover(null);
    setPeek(null);
  };
  const onKey = (e: KeyboardEvent, i: number) => {
    const to = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (to < 0) return;
    e.preventDefault();
    refs.current[to]?.focus();
  };
  const peekItem = hover ? GALLERY.find((g) => g.id === hover.id) : null;

  return (
    <div ref={box} className={s.tabsBox}>
      <div className={s.tabs} role="tablist" aria-label="Demos" onScroll={hide}>
        {GALLERY.map((g, i) => {
          const on = g.id === active;
          return (
            <button
              key={g.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={on}
              aria-disabled={!g.demo || undefined}
              tabIndex={i === at ? 0 : -1}
              className={cn(s.tab, on && s.tabOn, !g.demo && s.tabSoon)}
              data-peek={(peek === g.id && !on) || undefined}
              onClick={() => pick(g.id)}
              onKeyDown={(e) => onKey(e, i)}
              onPointerEnter={(e) => e.pointerType === 'mouse' && show(i)}
              onPointerLeave={hide}
              onFocus={() => show(i)}
              onBlur={hide}
            >
              {g.name}
              {!g.demo ? <span className={s.tabSoonDot} aria-label="coming soon" /> : null}
            </button>
          );
        })}
      </div>
      {peekItem && peekItem.id !== active ? (
        <div className={s.peek} style={{ left: hover!.x }} aria-hidden>
          {peekItem.demo ? (
            <DemoLoop key={peekItem.id} src={`/demos/${peekItem.demo}`} live className={s.peekMedia} />
          ) : (
            <span className={cn(s.peekMedia, s.peekSoon)}>Coming soon</span>
          )}
          <span className={s.kicker}>{peekItem.eyebrow}</span>
          <span className={s.peekTitle}>{peekItem.title}</span>
        </div>
      ) : null}
    </div>
  );
}

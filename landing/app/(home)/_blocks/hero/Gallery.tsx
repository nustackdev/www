'use client';

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent } from 'react';
import { BookOpen, FlaskConical, GitPullRequest, Server, Wallet, type LucideIcon } from 'lucide-react';
import { DemoVideo } from '@www/shared/components/media/demo/DemoVideo';
import { cn } from '@www/shared/lib/cn';
import { GALLERY, type GalleryItem } from './gallery.data';
import { DemoLoop } from './DemoLoop';
import s from './Gallery.module.css';

/** Thumb cells around the 4x4 stage on a 5x5 grid: four down the right, five along the bottom. */
const SLOTS: [number, number][] = [
  [5, 1], [5, 2], [5, 3], [5, 4],
  // Bottom row, hidden while there are only five demos:
  // [1, 5], [2, 5], [3, 5], [4, 5], [5, 5],
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
      <TabLine active={active} peek={peek} setPeek={setPeek} pick={pick} ready={loops} />
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

/** The peek's motion, `--site-dur-base`: how long a close keeps the card around to fade. */
const PEEK_MS = 180;

/** Where the peek card sits and what it shows. `glide`: it was already up, so it moves and slides instead of fading in. */
interface PeekCard {
  open: boolean;
  /** The tab it shows. */
  i: number;
  x: number;
  glide: boolean;
  /** Slide direction of the content: 1 when the pointer moved right, -1 left, 0 for no slide. */
  dir: 1 | -1 | 0;
  /** Cards on their way out, by tab, with the direction they leave in. */
  exits: Record<number, 1 | -1>;
  /** How far the content shifts, px: tied to how far the card glides. */
  travel: number;
}

/** Content shift on a glide, card-relative: the card's own move plus what reads on screen, so the glide never cancels it. */
const travelFor = (dx: number) => Math.round(Math.abs(dx) + 48);

/** Every demo in one line, real and coming. Hover or focus peeks, click or Enter puts it on stage. */
function TabLine({
  active,
  peek,
  setPeek,
  pick,
  ready,
}: {
  active: string;
  peek: string | null;
  setPeek: (id: string | null) => void;
  pick: (id: string) => void;
  /** Mount the peek cards ahead of the first hover, so their thumbs are painted before they slide in. */
  ready: boolean;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const box = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const [card, setCard] = useState<PeekCard>({ open: false, i: -1, x: 0, glide: false, dir: 0, exits: {}, travel: 40 });
  const [h, setH] = useState(0);
  const [mounted, setMounted] = useState(false);
  /** Shown or still fading out: then a new tab glides the card there. */
  const up = useRef(false);
  const closing = useRef<number | undefined>(undefined);
  const n = GALLERY.length;
  const at = GALLERY.findIndex((g) => g.id === active);

  if (ready && !mounted) setMounted(true);

  /** One card for the whole line: centred under tab `i`, kept inside the line. */
  const show = (i: number) => {
    if (GALLERY[i].id === active) return hide();
    const b = box.current?.getBoundingClientRect();
    const r = refs.current[i]?.getBoundingClientRect();
    if (!b || !r) return;
    clearTimeout(closing.current);
    const half = Math.min(130, b.width / 2);
    const x = Math.min(b.width - half, Math.max(half, r.left - b.left + r.width / 2));
    const glide = up.current;
    up.current = true;
    setMounted(true);
    setCard((c) => {
      if (c.open && c.i === i) return c;
      if (!glide || c.i < 0 || c.i === i) return { open: true, i, x, glide: false, dir: 0, exits: {}, travel: c.travel };
      const dir: 1 | -1 = i > c.i ? 1 : -1;
      const exits: PeekCard['exits'] = { ...c.exits, [c.i]: dir };
      delete exits[i];
      return { open: true, i, x, glide: true, dir, exits, travel: travelFor(x - c.x) };
    });
    setPeek(GALLERY[i].id);
  };
  const hide = () => {
    setCard((c) => (c.open ? { ...c, open: false } : c));
    setPeek(null);
    clearTimeout(closing.current);
    closing.current = window.setTimeout(() => {
      up.current = false;
    }, PEEK_MS);
  };
  useEffect(() => () => clearTimeout(closing.current), []);

  // A tab put on stage has nothing to peek at.
  const shownId = card.i >= 0 ? GALLERY[card.i].id : null;
  useEffect(() => {
    if (shownId === active) hide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // The card takes the height of what it shows, and follows it on a glide.
  useLayoutEffect(() => {
    const el = card.i >= 0 ? layers.current[card.i] : null;
    if (!el) return;
    setH(el.offsetHeight);
    const ro = new ResizeObserver(() => setH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [card.i, mounted]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const to = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (to < 0) return;
    e.preventDefault();
    refs.current[to]?.focus();
  };

  return (
    <div ref={box} className={s.tabsBox}>
      <div className={s.tabs} role="tablist" aria-label="Demos" onScroll={hide} onPointerLeave={hide}>
        <span className={s.tabsLabel} aria-hidden="true">Demos:</span>
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
              onFocus={() => show(i)}
              onBlur={hide}
            >
              {g.name}
              {!g.demo ? <span className={s.tabSoonDot} aria-label="coming soon" /> : null}
            </button>
          );
        })}
      </div>
      {mounted ? (
        <div
          className={s.peek}
          data-open={card.open || undefined}
          data-glide={card.glide || undefined}
          style={{ left: card.x, height: h, '--peek-travel': `${card.travel}px` } as CSSProperties}
          aria-hidden
        >
          {GALLERY.map((g, i) => {
            const cur = i === card.i;
            const exit = card.exits[i];
            return (
              <div
                key={g.id}
                ref={(el) => {
                  layers.current[i] = el;
                }}
                className={cn(s.peekLayer, cur && s.peekIn, !cur && exit && s.peekOut)}
                data-dir={cur ? card.dir : exit}
              >
                {g.demo ? (
                  <DemoLoop src={`/demos/${g.demo}`} live={card.open && cur} className={s.peekMedia} />
                ) : (
                  <span className={cn(s.peekMedia, s.peekSoon)}>Coming soon</span>
                )}
                <span className={s.kicker}>{g.eyebrow}</span>
                <span className={s.peekTitle}>{g.title}</span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

'use client';

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { BookOpen, FlaskConical, GitPullRequest, Server, Wallet, type LucideIcon } from 'lucide-react';
import { DemoVideo } from '@www/shared/components/media/demo/DemoVideo';
import { cn } from '@www/shared/lib/cn';
import { TILES, type Tile } from '../demos';
import { HeroHead } from '../HeroHead';
import { Preview } from '../Preview';
import { morph, useCalm, vt } from '../motion';
import type { Cell, Layout } from './layouts';
import s from './Gallery.module.css';

/** How the thumbnails play their loops. */
export type Play =
  /** Every real thumb on screen loops, muted. Only four ever can: just five demos are real. */
  | 'visible'
  /** Posters at rest; a thumb loops while hovered, focused or peeked from its tab. Loops load on first hover. */
  | 'hover'
  /** One thumb at a time loops, the spotlight walks the real ones every few seconds. Hover takes it over. */
  | 'spotlight';

export interface GalleryConfig {
  /** View-transition scope, unique per variation. */
  scope: string;
  layout: Layout;
  play: Play;
  /** `chip`: a tiny category chip on each thumb. `bare`: nothing on them. `dim`: muted until hovered. */
  chrome: 'chip' | 'bare' | 'dim';
}

const SOON_ICON: Record<string, LucideIcon> = {
  money: Wallet,
  research: FlaskConical,
  notes: BookOpen,
  github: GitPullRequest,
  homelab: Server,
};
const SPOT_MS = 7000;
const real = TILES.filter((t) => t.demo);

/** Round 2: one big stage, tiny thumbs around it, a tab line of every demo above; all on one selection. */
export function Gallery({ cfg }: { cfg: GalleryConfig }) {
  const [active, setActive] = useState('hero');
  const [peek, setPeek] = useState<string | null>(null);
  const [spot, setSpot] = useState(0);
  const calm = useCalm();
  const focused = TILES.find((t) => t.id === active)!;
  const { layout } = cfg;

  const pick = (id: string) => {
    if (id === active || !TILES.find((t) => t.id === id)?.demo) return;
    morph(() => setActive(id));
  };

  // Spotlight: walk the real thumbs, one loop at a time.
  const others = real.filter((t) => t.id !== active);
  useEffect(() => {
    if (cfg.play !== 'spotlight' || calm) return;
    const t = window.setInterval(() => setSpot((i) => i + 1), SPOT_MS);
    return () => window.clearInterval(t);
  }, [cfg.play, calm]);
  const lit = peek ?? others[spot % others.length]?.id;
  const plays = (id: string) => (cfg.play === 'visible' ? true : cfg.play === 'hover' ? peek === id : lit === id);

  const thumbs = TILES.filter((t) => t.id !== active);
  const at = (c: Cell) => ({ '--c': c[0], '--r': c[1] }) as CSSProperties;

  return (
    <>
      <HeroHead />
      <div className={s.gallery}>
        <TabLine active={active} peek={peek} setPeek={setPeek} pick={pick} />
        <div className={s.wrap}>
          <div className={s.grid} data-chrome={cfg.chrome} style={{ '--cols': layout.cols, '--a': layout.span } as CSSProperties}>
            <div className={s.stage} style={{ ...at(layout.stage), ...vt(cfg.scope, active) }}>
              <DemoVideo key={active} src={`/demos/${focused.demo}`} />
            </div>
            {thumbs.map((t, i) => (
              <Thumb
                key={t.id}
                t={t}
                style={{ ...at(layout.slots[i]), ...vt(cfg.scope, t.id) }}
                chip={cfg.chrome === 'chip'}
                play={plays(t.id)}
                load={cfg.play === 'visible' ? 'near' : 'play'}
                peeked={peek === t.id}
                onPick={() => pick(t.id)}
                onPeek={(on) => setPeek(on ? t.id : null)}
              />
            ))}
          </div>
        </div>
        <p className={s.caption} aria-live="polite">
          <span className={s.eyebrow}>{focused.eyebrow}</span> <b>{focused.title}</b> {focused.tagline}
        </p>
      </div>
    </>
  );
}

interface ThumbProps {
  t: Tile;
  style: CSSProperties;
  chip: boolean;
  play: boolean;
  load: 'near' | 'play';
  peeked: boolean;
  onPick: () => void;
  onPeek: (on: boolean) => void;
}

/** A tiny thumb: the loop or poster, a ring on hover or focus, the name as a tooltip. */
function Thumb({ t, style, chip, play, load, peeked, onPick, onPeek }: ThumbProps) {
  const Icon = SOON_ICON[t.id];
  const tip = t.demo ? t.name : `${t.name} · soon`;
  const inner = (
    <>
      <span className={s.media}>
        {t.demo ? (
          <Preview id={t.demo} play={play} load={load} className={s.loop} />
        ) : (
          <span className={s.soonArt} aria-hidden>
            {Icon ? <Icon size={16} strokeWidth={1.6} /> : null}
          </span>
        )}
        {chip ? <span className={s.chip}>{t.demo ? t.eyebrow : 'Soon'}</span> : null}
      </span>
      <span className={s.tip} aria-hidden>
        {tip}
      </span>
    </>
  );
  const hover = {
    onPointerEnter: (e: { pointerType: string }) => e.pointerType === 'mouse' && onPeek(true),
    onPointerLeave: () => onPeek(false),
  };

  if (!t.demo) {
    return (
      <div className={cn(s.thumb, s.soon)} style={style} data-peek={peeked || undefined} role="img" aria-label={`Coming soon: ${t.name}`} {...hover}>
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
      aria-label={`Play ${t.name}: ${t.title}`}
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
  /** Peek card centre under tab `i`, kept inside the line. */
  const show = (i: number) => {
    const b = box.current?.getBoundingClientRect();
    const r = refs.current[i]?.getBoundingClientRect();
    if (!b || !r) return;
    const half = Math.min(130, b.width / 2);
    setHover({ id: TILES[i].id, x: Math.min(b.width - half, Math.max(half, r.left - b.left + r.width / 2)) });
    setPeek(TILES[i].id);
  };
  const hide = () => {
    setHover(null);
    setPeek(null);
  };
  const n = TILES.length;

  const onKey = (e: KeyboardEvent, i: number) => {
    const to = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (to < 0) return;
    e.preventDefault();
    refs.current[to]?.focus();
  };
  const at = TILES.findIndex((t) => t.id === active);
  const peekTile = hover ? TILES.find((t) => t.id === hover.id) : null;

  return (
    <div ref={box} className={s.tabsBox}>
      <div className={s.tabs} role="tablist" aria-label="All demos" onScroll={hide}>
        {TILES.map((t, i) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={on}
              aria-disabled={!t.demo || undefined}
              tabIndex={i === at ? 0 : -1}
              className={cn(s.tab, on && s.tabOn, !t.demo && s.tabSoon)}
              data-peek={(peek === t.id && !on) || undefined}
              onClick={() => pick(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              onPointerEnter={(e) => e.pointerType === 'mouse' && show(i)}
              onPointerLeave={hide}
              onFocus={() => show(i)}
              onBlur={hide}
            >
              {t.name}
              {!t.demo ? <span className={s.tabSoonDot} aria-label="coming soon" /> : null}
            </button>
          );
        })}
      </div>
      {peekTile && peekTile.id !== active ? (
        <div className={s.peek} style={{ left: hover!.x }} aria-hidden>
          {peekTile.demo ? (
            <Preview key={peekTile.id} id={peekTile.demo} className={s.peekMedia} />
          ) : (
            <span className={cn(s.peekMedia, s.peekSoon)}>Coming soon</span>
          )}
          <span className={s.eyebrow}>{peekTile.eyebrow}</span>
          <span className={s.peekTitle}>{peekTile.title}</span>
        </div>
      ) : null}
    </div>
  );
}

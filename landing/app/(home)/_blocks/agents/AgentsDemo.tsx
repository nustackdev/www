'use client';

import { BookOpen, File, Plus, Search } from 'lucide-react';
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent } from 'react';
import { cn } from '@www/shared/lib/cn';
import { DUR, KEY_AT, LAST, PARTS, STATUS, type Key, type Line } from './program';
import s from './Agents.module.css';

const CALM = '(prefers-reduced-motion: reduce)';
const NARROW = '(max-width: 860px)';

const BOOKS = [
  { title: 'Dune', notes: 'reread', at: 5, cover: 'var(--site-status-warning)' },
  { title: 'Piranesi', notes: 'for book club', at: 6, cover: 'var(--site-status-info)' },
  { title: 'Middlemarch', notes: 'slow', at: 7, cover: 'var(--site-accent)' },
];
const BARS = [38, 62, 30, 80, 54, 20];
const WEEKS = ['w1', 'w2', 'w3', 'w4', 'w5', 'now'];
const LIVE_BASE = 20;
/** The window's desktop width, scaled down to fit on phones. */
const MOCK_W = 840;
/** A tapped step holds this long before play resumes. */
const PIN_MS = 7000;

/** What the running step touches in the window, lit while it runs. */
const TOUCH: Record<number, string> = { 1: 'reading', 2: 'reading', 3: 'library', 4: 'library', 5: 'card5', 6: 'card6', 7: 'card7', 8: 'chart' };

interface Hover {
  el: Element;
  keys: Key[];
  shown: number;
}

function useMedia(q: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(q);
      m.addEventListener('change', cb);
      return () => m.removeEventListener('change', cb);
    },
    () => window.matchMedia(q).matches,
    () => false,
  );
}

const keysOf = (el: Element) => (el.getAttribute('data-hk') ?? '').split(' ') as Key[];

/**
 * AgentsDemo: a nuspace window with the agent's program floating over its
 * corner. The program plays line by line and the window changes with each
 * line, looping with a hold at the end. A hover on a line, a part or a piece
 * of the window pauses it there and lights both sides; leaving resumes from
 * the same step. Paused offscreen; reduced motion shows the end. On phones
 * the window only scales down, and a code toast on its lower edge shows one
 * step at a time; the running line and what it changes share a colour and a
 * numbered pin. A tap holds a step until tapped again, a tap elsewhere, or a
 * few seconds.
 */
export function AgentsDemo() {
  const host = useRef<HTMLDivElement>(null);
  const fit = useRef<HTMLDivElement>(null);
  const liveBar = useRef<HTMLElement>(null);
  const fills = useRef<(HTMLElement | null)[]>([]);
  const calm = useMedia(CALM);
  const narrow = useMedia(NARROW);
  const [n, setN] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState<Hover | null>(null);
  const [pin, setPin] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const paused = hover !== null || pin !== null;

  const k = hover ? Math.max(hover.shown, calm ? LAST : 0) : pin !== null ? n : calm ? LAST : n;
  const cur = pin ?? Math.max(0, PARTS.findIndex((p) => p.steps.includes(k)));
  const lit = new Set<Key>(hover?.keys ?? []);
  const hl = (keys: Key[]) => keys.some((x) => lit.has(x));
  const flash = (id: string) => !narrow && !paused && TOUCH[k] === id;
  /** Phones: the part the current step changes, lit with its pin. */
  const onPart = (i: number) => narrow && k > 0 && k < LAST && cur === i;
  const pinOf = (i: number) => <span className={s.mpin}>{i + 1}</span>;

  // Pause offscreen.
  useEffect(() => {
    const el = host.current;
    if (!el || calm) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [calm]);

  // Phones: the window keeps its desktop size and scales to the width.
  useEffect(() => {
    const el = fit.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setZoom(Math.min(1, e.contentRect.width / MOCK_W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // A tapped step holds until a tap elsewhere or a few seconds pass.
  useEffect(() => {
    if (pin === null) return;
    const t = setTimeout(() => setPin(null), PIN_MS);
    const off = (e: globalThis.PointerEvent) => {
      if (!(e.target as Element).closest?.('[data-step]')) setPin(null);
    };
    document.addEventListener('pointerdown', off);
    return () => {
      clearTimeout(t);
      document.removeEventListener('pointerdown', off);
    };
  }, [pin]);

  const tap = (i: number) => {
    if (pin === i) return setPin(null);
    setN(Math.max(...PARTS[i].steps));
    setPin(i);
  };

  // Phones: the step bars, done parts full, the current one fills with the clock.
  useEffect(() => {
    const fs = fills.current;
    const held = paused || calm;
    fs.forEach((f, i) => {
      if (!f) return;
      f.style.transition = 'none';
      f.style.width = i < cur || (held && i === cur) ? '100%' : '0%';
    });
    const f = fs[cur];
    if (!f || held || k === 0) return;
    const st = PARTS[cur].steps;
    const d = st.map((x) => DUR[x]);
    const tot = d.reduce((a, b) => a + b, 0);
    const ix = st.indexOf(k);
    if (ix < 0) return;
    const from = d.slice(0, ix).reduce((a, b) => a + b, 0) / tot;
    f.style.width = `${from * 100}%`;
    void f.offsetWidth;
    f.style.transition = `width ${DUR[k]}ms linear`;
    f.style.width = `${(from + d[ix] / tot) * 100}%`;
  }, [k, cur, paused, calm]);

  // Play: each step holds for its time, then the next, looping to idle.
  useEffect(() => {
    if (!visible || paused || calm) return;
    const t = setTimeout(() => setN((x) => (x >= LAST ? 0 : x + 1)), DUR[n]);
    return () => clearTimeout(t);
  }, [n, visible, paused, calm]);

  // The newest bar keeps climbing while the chart is live.
  const live = k >= 8;
  useEffect(() => {
    const el = liveBar.current;
    if (!el || !live || calm || paused) return;
    let h = LIVE_BASE;
    const t = setInterval(() => {
      h = h >= 70 ? LIVE_BASE : h + 8;
      el.style.height = `${h}%`;
    }, 1600);
    return () => {
      clearInterval(t);
      el.style.height = `${LIVE_BASE}%`;
    };
  }, [live, calm, paused, k]);

  const onOver = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = (e.target as Element).closest('[data-hk]');
    const on = el && host.current?.contains(el) ? el : null;
    if (on === (hover?.el ?? null)) return;
    if (!on) return setHover(null);
    const keys = keysOf(on);
    const at = on.getAttribute('data-hat');
    // Code: the state right after it ran. The window: the step its part exists in.
    const shown = at !== null ? Number(at) : Math.max(n, ...keys.map((x) => KEY_AT[x]));
    setHover({ el: on, keys, shown });
  };

  const onRead = k >= 1;
  const iconOn = k >= 2;
  const made = (at: number) => k >= at;
  const PageIcon = iconOn ? BookOpen : File;

  const lines = (ls: Line[]) => (
    <div className={s.code}>
      {ls.map((l, j) => (
        <div
          key={j}
          className={cn(
            s.ln,
            l.run.includes(k) && k < LAST && s.run,
            (Math.max(...l.run) < k || k === LAST) && s.done,
            hl([l.k]) && s.hl,
          )}
          data-hk={l.k}
          data-hat={Math.max(...l.run)}
        >
          {l.text}
        </div>
      ))}
    </div>
  );
  const status = (
    <div className={cn(s.ctl, paused && s.paused)}>
      <span className={s.status}>{STATUS[k]}</span>
      <span className={s.pausedNote}>{pin !== null ? 'paused on this step' : 'paused while you look'}</span>
    </div>
  );

  return (
    <div
      ref={host}
      className={s.host}
      onPointerOver={onOver}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(null)}
    >
      <div className={s.unit}>
        <div className={s.stage}>
          <div ref={fit} className={s.fit} style={{ '--z': zoom } as CSSProperties}>
            <div className={s.ns} aria-label="A nuspace window">
              <aside className={s.sb}>
                <div className={s.brand}>
                  <b>nuspace</b>
                </div>
                <div className={s.search}>
                  <Search aria-hidden />
                  Search
                  <kbd>⌘K</kbd>
                </div>
                <ul className={s.tree}>
                  <li>
                    <div className={cn(s.it, s.newi)}>
                      <span className={s.ic}>
                        <Plus aria-hidden />
                      </span>
                      New page
                    </div>
                  </li>
                  <li>
                    <div className={s.it}>
                      <span className={s.ic}>🏠</span>Home
                    </div>
                  </li>
                  <li>
                    <div
                      className={cn(s.it, flash('library') && s.flash, onPart(1) && s.lit, hl(['find', 'read']) && s.hl)}
                      data-hk="find read"
                    >
                      <span className={s.ic}>📚</span>Library
                      <span className={s.tag}>{k === 4 ? 'read 3 titles' : 'found Books'}</span>
                      {pinOf(1)}
                    </div>
                  </li>
                  <li>
                    <div
                      className={cn(
                        s.it,
                        s.sub,
                        s.made,
                        made(1) && s.in,
                        onRead && s.sel,
                        flash('reading') && s.flash,
                        onPart(0) && s.lit,
                        hl(['page']) && s.hl,
                      )}
                      data-hk="page"
                    >
                      <span className={cn(s.ic, hl(['icon']) && s.hl)} data-hk="icon">
                        <PageIcon aria-hidden />
                      </span>
                      Reading
                      <span className={s.tag}>new</span>
                      {pinOf(0)}
                    </div>
                  </li>
                  <li>
                    <div className={s.it}>
                      <span className={s.ic}>🧾</span>Groceries
                    </div>
                  </li>
                </ul>
              </aside>

              <div className={s.doc}>
                <div className={s.bar}>
                  <span>Library</span>
                  <span className={s.crumb} style={{ opacity: onRead ? 1 : 0 }}>
                    / Reading
                  </span>
                </div>

                <div className={cn(s.view, onRead && s.gone)} aria-hidden={onRead}>
                  <div className={s.page}>
                    <h4 className={s.title}>
                      <span className={s.pic}>📚</span>Library
                    </h4>
                    <p className={s.lbl}>Books</p>
                    <div className={cn(s.tbl, hl(['find', 'read']) && s.hl)} data-hk="find read">
                      <div>
                        <span>Name</span>
                        <span>Notes</span>
                      </div>
                      {BOOKS.map((b) => (
                        <div key={b.title}>
                          <span>{b.title}</span>
                          <span>{b.notes}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={cn(s.view, !onRead && s.gone)} aria-hidden={!onRead}>
                  <div className={s.page}>
                    <h4 className={s.title}>
                      <span className={cn(s.pic, hl(['icon']) && s.hl)} data-hk="icon">
                        <PageIcon aria-hidden />
                      </span>
                      <span>Reading</span>
                    </h4>
                    <div className={cn(s.cards, onPart(2) && s.lit)}>
                      {pinOf(2)}
                      {BOOKS.map((b) => (
                        <div
                          key={b.title}
                          className={cn(s.bk, s.made, made(b.at) && s.in, flash(`card${b.at}`) && s.flash, hl(['cards']) && s.hl)}
                          data-hk="cards"
                        >
                          <div className={s.cv} style={{ background: b.cover }} />
                          <b>{b.title}</b>
                          <span>a cell</span>
                        </div>
                      ))}
                    </div>
                    <div
                      className={cn(s.chart, s.made, made(8) && s.in, flash('chart') && s.flash, onPart(3) && s.lit, hl(['chart']) && s.hl)}
                      data-hk="chart"
                    >
                      {pinOf(3)}
                      <div className={s.ct}>
                        Pages read
                        <span className={s.lv}>
                          <i />
                          live
                        </span>
                      </div>
                      <div className={s.bars}>
                        {BARS.map((h, i) => (
                          <i
                            key={i}
                            ref={i === BARS.length - 1 ? liveBar : undefined}
                            style={{ height: `${live ? h : 0}%` } as CSSProperties}
                          />
                        ))}
                      </div>
                      <div className={s.wk}>
                        {WEEKS.map((w) => (
                          <span key={w}>{w}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={s.toast} role="group" aria-label="Your agent's program, one step at a time">
            <div className={s.th}>
              <span className={s.badge}>{cur + 1}</span>
              <span className={s.swap}>
                {PARTS.map((p, i) => (
                  <span key={p.label} className={cn(i === cur && s.on)}>
                    {p.label}
                  </span>
                ))}
              </span>
              <div className={s.segs} role="tablist" aria-label="Four steps">
                {PARTS.map((p, i) => (
                  <button
                    key={p.label}
                    type="button"
                    role="tab"
                    aria-selected={i === cur}
                    aria-label={`Step ${i + 1}, ${p.label}`}
                    className={cn(s.seg, i === cur && s.on)}
                    onClick={() => tap(i)}
                    data-step
                  >
                    <span className={s.track}>
                      <span
                        className={s.fill}
                        ref={(el) => {
                          fills.current[i] = el;
                        }}
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className={s.snips} onClick={() => tap(cur)} data-step>
              {PARTS.map((p, i) => (
                <div key={p.label} className={cn(s.snip, i === cur && s.on)} role="tabpanel" aria-hidden={i !== cur}>
                  <div className={s.scroll}>{lines(p.lines)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={s.panel} role="group" aria-label="Your agent's program">
        <div className={s.ph}>your agent&apos;s program, in four parts</div>
        {PARTS.map((p, i) => {
          const on = p.steps.includes(k) && k < LAST;
          const done = Math.max(...p.steps) < k || k === LAST;
          return (
            <div
              key={p.label}
              className={cn(s.blk, on && s.run, done && s.done, hl(p.k) && s.hl)}
              data-hk={p.k.join(' ')}
              data-hat={Math.max(...p.steps)}
            >
              <div className={s.bl}>
                <span className={s.n}>{i + 1}</span>
                <b>{p.label}</b>
                <span className={s.st}>{on ? 'running' : done ? 'done' : ''}</span>
              </div>
              {lines(p.lines)}
            </div>
          );
        })}
        {status}
      </div>
    </div>
  );
}

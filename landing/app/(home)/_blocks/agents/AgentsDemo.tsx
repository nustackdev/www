'use client';

import { BookOpen, File, Plus, Search } from 'lucide-react';
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent } from 'react';
import { cn } from '@www/shared/lib/cn';
import { DUR, LAST, PARTS, STATUS, STEP_KEY, type Key, type Line } from './program';
import s from './Agents.module.css';

const CALM = '(prefers-reduced-motion: reduce)';
const NARROW = '(max-width: 860px)';

const BOOKS = [
  { title: 'Dune', author: 'Frank Herbert', pages: '412 / 617', read: 0.67, notes: 'reread', at: 5, cover: 'var(--site-status-warning)' },
  { title: 'Piranesi', author: 'Susanna Clarke', pages: '88 / 272', read: 0.32, notes: 'for book club', at: 6, cover: 'var(--site-status-info)' },
  { title: 'Middlemarch', author: 'George Eliot', pages: '140 / 880', read: 0.16, notes: 'slow', at: 7, cover: 'var(--site-accent)' },
];
const STATS = [
  ['Books', '3'],
  ['Pages this month', '640'],
  ['Streak', '6 days'],
];
const PAGES = [
  ['🏠', 'Home'],
  ['📓', 'Journal'],
  ['📚', 'Library'],
];
const MORE = [
  ['🍳', 'Recipes'],
  ['🧭', 'Trips'],
  ['🧾', 'Groceries'],
];
const NEXT = [
  ['The Left Hand of Darkness', 'Ursula K. Le Guin'],
  ['Stoner', 'John Williams'],
];
const BARS = [38, 62, 30, 80, 54, 20];
const WEEKS = ['w1', 'w2', 'w3', 'w4', 'w5', 'now'];
/** The newest bar: where it starts, how it climbs while live. */
const LIVE = { from: 20, to: 70, by: 10, every: 600 };
/** The window's desktop width, scaled down to fit on phones. */
const MOCK_W = 840;
/** The step the Reading page opens on: its first card. */
const OPEN = 5;

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
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

/**
 * AgentsDemo: a nuspace window with the agent's program floating over its
 * corner. The program plays line by line and the window changes with each
 * line, then a short beat on the start and round again. A hover on a line or
 * a part pauses it there and lights both sides; leaving replays that step.
 * The window itself does not react. Each part's number sits in a ring that
 * fills with the step clock. Paused offscreen; reduced motion shows the end.
 * On phones the window only scales down, and a code toast on its lower edge
 * shows one part at a time; the running line and what it changes share a
 * colour and a numbered pin. Nothing pauses there: a tap on a step or a line
 * plays on from it.
 */
export function AgentsDemo() {
  const host = useRef<HTMLDivElement>(null);
  const fit = useRef<HTMLDivElement>(null);
  const liveBar = useRef<HTMLElement>(null);
  /** Progress rings: the toast's four, then the panel's four. */
  const rings = useRef<(SVGCircleElement | null)[]>([]);
  const calm = useMedia(CALM);
  const narrow = useMedia(NARROW);
  const [n, setN] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState<Hover | null>(null);
  const [zoom, setZoom] = useState(1);
  const paused = hover !== null && !narrow;
  const held = paused || calm || !visible;

  const k = calm ? LAST : paused ? hover.shown : n;
  const cur = Math.max(0, PARTS.findIndex((p) => p.steps.includes(k)));
  const lit = new Set<Key>(paused ? hover.keys : []);
  const hl = (keys: Key[]) => keys.some((x) => lit.has(x));
  /** What the running step changes, lit while it plays. */
  const runKey = !paused && k < LAST ? STEP_KEY[k] : undefined;
  const act = (...keys: Key[]) => runKey !== undefined && keys.includes(runKey);
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

  /** Phones: a tap on a step or a line plays on from there. */
  const onSnip = (e: { target: EventTarget }) => {
    const at = (e.target as Element).closest('[data-from]')?.getAttribute('data-from');
    if (at) setN(Number(at));
  };

  // Play: each step holds for its time, then the next; after the last, the start.
  // Any hold (hover, offscreen) replays the step in full, and so does its ring.
  useEffect(() => {
    if (held) return;
    const t = setTimeout(() => setN((x) => (x >= LAST ? 0 : x + 1)), DUR[n]);
    return () => clearTimeout(t);
  }, [n, held]);

  // The rings: done parts full, the current one fills with the step clock.
  useEffect(() => {
    const set = (c: SVGCircleElement, p: number, ms = 0) => {
      c.style.transition = ms ? `stroke-dashoffset ${ms}ms linear` : 'none';
      c.style.strokeDashoffset = String(1 - p);
    };
    const st = PARTS[cur].steps;
    const d = st.map((x) => DUR[x]);
    const ix = st.indexOf(k);
    const from = sum(d.slice(0, Math.max(0, ix))) / sum(d);
    const to = ix < 0 ? 0 : from + d[ix] / sum(d);
    rings.current.forEach((c, j) => {
      if (!c) return;
      const i = j % PARTS.length;
      if (i !== cur || ix < 0) return set(c, i < cur ? 1 : 0);
      if (paused || calm) return set(c, to);
      set(c, from);
      if (!visible) return;
      void c.getBoundingClientRect();
      set(c, to, DUR[k]);
    });
  }, [k, cur, paused, calm, visible]);

  // Live: the newest bar climbs while the finished chart plays, and holds.
  const live = k >= 8;
  const climbing = k === LAST && !held;
  useEffect(() => {
    const el = liveBar.current;
    if (!el || !climbing) return;
    let h = parseFloat(el.style.height) || LIVE.from;
    const t = setInterval(() => {
      h = Math.min(LIVE.to, h + LIVE.by);
      el.style.height = `${h}%`;
    }, LIVE.every);
    return () => clearInterval(t);
  }, [climbing]);

  // Desktop: a hover on the program, never the window.
  const onOver = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || narrow) return;
    const el = (e.target as Element).closest('[data-hk]');
    const on = el && host.current?.contains(el) ? el : null;
    if (on === (hover?.el ?? null)) return;
    if (!on) return setHover(null);
    // The state right after it ran.
    setHover({ el: on, keys: keysOf(on), shown: Number(on.getAttribute('data-hat')) });
  };

  const onRead = k >= OPEN;
  const made = (at: number) => k >= at;
  const PageIcon = k >= 2 ? BookOpen : File;

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
          data-from={Math.min(...l.run)}
        >
          {l.text}
        </div>
      ))}
    </div>
  );
  const ring = (i: number, at: number) => (
    <span className={s.ring}>
      <svg viewBox="0 0 24 24" aria-hidden>
        <circle className={s.track} cx="12" cy="12" r="11" pathLength={1} />
        <circle
          className={s.prog}
          cx="12"
          cy="12"
          r="11"
          pathLength={1}
          ref={(el) => {
            rings.current[at] = el;
          }}
        />
      </svg>
      <span className={s.num}>{i + 1}</span>
    </span>
  );
  const status = (
    <div className={cn(s.ctl, paused && s.paused)}>
      <span className={s.status}>{STATUS[k]}</span>
      <span className={s.pausedNote}>paused while you look</span>
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
                  {PAGES.map(([ic, name]) => (
                    <li key={name}>
                      <div className={cn(s.it, name === 'Library' && !onRead && s.sel)}>
                        <span className={s.ic}>{ic}</span>
                        {name}
                      </div>
                    </li>
                  ))}
                  <li>
                    <div className={cn(s.it, s.sub)}>
                      <span className={s.ic}>✨</span>Wishlist
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
                        act('page', 'icon') && s.act,
                        hl(['page']) && s.hl,
                      )}
                    >
                      <span className={cn(s.ic, hl(['icon']) && s.hl)}>
                        <PageIcon aria-hidden />
                      </span>
                      Reading
                      <span className={s.tag}>new</span>
                      {pinOf(0)}
                    </div>
                  </li>
                  {MORE.map(([ic, name]) => (
                    <li key={name}>
                      <div className={s.it}>
                        <span className={s.ic}>{ic}</span>
                        {name}
                      </div>
                    </li>
                  ))}
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
                    <p className={s.txt}>What I&apos;m reading, and how far along I am.</p>
                    <div className={s.stats}>
                      {STATS.map(([l, v]) => (
                        <div key={l} className={s.stat}>
                          <span>{l}</span>
                          <b>{v}</b>
                        </div>
                      ))}
                    </div>
                    <p className={s.lbl}>Books</p>
                    <div className={cn(s.tbl, act('find', 'read') && s.act, hl(['find', 'read']) && s.hl)}>
                      {pinOf(1)}
                      <div>
                        <span>Name</span>
                        <span>Author</span>
                        <span>Pages</span>
                        <span>Notes</span>
                      </div>
                      {BOOKS.map((b) => (
                        <div key={b.title}>
                          <span className={cn(s.name, (act('read') || hl(['read'])) && s.on)}>{b.title}</span>
                          <span>{b.author}</span>
                          <span>{b.pages}</span>
                          <span>{b.notes}</span>
                        </div>
                      ))}
                    </div>
                    <p className={s.lbl}>Up next</p>
                    <div className={cn(s.tbl, s.next)}>
                      {NEXT.map(([name, author]) => (
                        <div key={name}>
                          <span>{name}</span>
                          <span>{author}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={cn(s.view, !onRead && s.gone)} aria-hidden={!onRead}>
                  <div className={s.page}>
                    <h4 className={s.title}>
                      <span className={cn(s.pic, hl(['icon']) && s.hl)}>
                        <PageIcon aria-hidden />
                      </span>
                      <span>Reading</span>
                    </h4>
                    <div className={cn(s.cards, act('cards') && s.act)}>
                      {pinOf(2)}
                      {BOOKS.map((b) => (
                        <div
                          key={b.title}
                          className={cn(s.bk, s.made, made(b.at) && s.in, act('cards') && k === b.at && s.act, hl(['cards']) && s.hl)}
                        >
                          <div className={s.cv} style={{ background: b.cover }} />
                          <b>{b.title}</b>
                          <span>{b.author}</span>
                          <div className={s.pg}>
                            <i style={{ width: `${b.read * 100}%` }} />
                          </div>
                          <span>p. {b.pages.replace(' / ', ' of ')}</span>
                        </div>
                      ))}
                    </div>
                    <div className={cn(s.chart, s.made, made(8) && s.in, act('chart') && s.act, hl(['chart']) && s.hl)}>
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
                    className={cn(s.seg, i === cur && s.on, i < cur && s.past)}
                    onClick={() => setN(p.steps[0])}
                  >
                    {ring(i, i)}
                  </button>
                ))}
              </div>
            </div>
            <div className={s.snips} onClick={onSnip}>
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
                {ring(i, PARTS.length + i)}
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

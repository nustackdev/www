'use client';

import { BookOpen, File, Moon, Plus, Search, Book } from 'lucide-react';
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type MouseEvent } from 'react';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { cn } from '@www/shared/lib/cn';
import { DUR, KEY_AT, LAST, PARTS, STATUS, type Key } from './program';
import s from './Agents.module.css';

const CALM = '(prefers-reduced-motion: reduce)';

const BOOKS = [
  { title: 'Dune', notes: 'reread', at: 5, cover: 'var(--site-status-warning)' },
  { title: 'Piranesi', notes: 'for book club', at: 6, cover: 'var(--site-status-info)' },
  { title: 'Middlemarch', notes: 'slow', at: 7, cover: 'var(--site-accent)' },
];
const BARS = [38, 62, 30, 80, 54, 20];
const WEEKS = ['w1', 'w2', 'w3', 'w4', 'w5', 'now'];
const LIVE_BASE = 20;

/** What the running step touches in the window, lit while it runs. */
const TOUCH: Record<number, string> = { 1: 'reading', 2: 'reading', 3: 'library', 4: 'library', 5: 'card5', 6: 'card6', 7: 'card7', 8: 'chart' };

interface Hover {
  el: Element;
  keys: Key[];
  shown: number;
}

function useCalm() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(CALM);
      m.addEventListener('change', cb);
      return () => m.removeEventListener('change', cb);
    },
    () => window.matchMedia(CALM).matches,
    () => false,
  );
}

const keysOf = (el: Element) => (el.getAttribute('data-hk') ?? '').split(' ') as Key[];

/**
 * AgentsDemo: a nuspace window with the agent's program floating over its
 * corner. The program plays line by line and the window changes with each
 * line, looping with a hold at the end. A hover on a line, a part or a piece
 * of the window pauses it there and lights both sides; leaving resumes from
 * the same step. Paused offscreen; reduced motion shows the end.
 */
export function AgentsDemo() {
  const host = useRef<HTMLDivElement>(null);
  const liveBar = useRef<HTMLElement>(null);
  const calm = useCalm();
  const [n, setN] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState<Hover | null>(null);
  const paused = hover !== null;

  const k = hover ? Math.max(hover.shown, calm ? LAST : 0) : calm ? LAST : n;
  const lit = new Set<Key>(hover?.keys ?? []);
  const hl = (keys: Key[]) => keys.some((x) => lit.has(x));
  const flash = (id: string) => !paused && TOUCH[k] === id;

  // Pause offscreen.
  useEffect(() => {
    const el = host.current;
    if (!el || calm) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [calm]);

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

  const onOver = (e: MouseEvent) => {
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

  return (
    <div ref={host} className={s.host} onMouseOver={onOver} onMouseLeave={() => setHover(null)}>
      <div className={s.ns} aria-label="A nuspace window">
        <aside className={s.sb}>
          <div className={s.brand}>
            <span className={s.tg} />
            <b>NU</b>
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
                className={cn(s.it, flash('library') && s.flash, hl(['find', 'read']) && s.hl)}
                data-hk="find read"
              >
                <span className={s.ic}>📚</span>Library
                <span className={s.tag}>{k === 4 ? 'read 3 titles' : 'found Books'}</span>
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
                  hl(['page']) && s.hl,
                )}
                data-hk="page"
              >
                <span className={cn(s.ic, hl(['icon']) && s.hl)} data-hk="icon">
                  <PageIcon aria-hidden />
                </span>
                Reading
                <span className={s.tag}>new</span>
              </div>
            </li>
            <li>
              <div className={s.it}>
                <span className={s.ic}>🧾</span>Groceries
              </div>
            </li>
          </ul>
          <div className={s.foot}>
            <GithubMark size={13} />
            <Book aria-hidden />
            <Moon aria-hidden />
            <span className={s.dot} title="connected" />
          </div>
        </aside>

        <div className={s.doc}>
          <div className={s.bar}>
            <span>Library</span>
            <span className={s.crumb} style={{ opacity: onRead ? 1 : 0 }}>
              / Reading
            </span>
            <span className={s.more}>⋯</span>
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
              <div className={s.cards}>
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
                className={cn(s.chart, s.made, made(8) && s.in, flash('chart') && s.flash, hl(['chart']) && s.hl)}
                data-hk="chart"
              >
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
              <div className={s.code}>
                {p.lines.map((l, j) => (
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
            </div>
          );
        })}
        <div className={cn(s.ctl, paused && s.paused)}>
          <span className={s.status}>{STATUS[k]}</span>
          <span className={s.pausedNote}>paused while you look</span>
        </div>
      </div>
    </div>
  );
}

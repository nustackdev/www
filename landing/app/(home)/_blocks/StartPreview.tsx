'use client';

import { LayoutDashboard, Library, PencilLine } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { cn } from '@www/shared/lib/cn';
import { NuspaceWindow, PlaneTitle, type PlaneRow } from './nuspace/Nuspace';
import s from './StartPreview.module.css';

interface Cell {
  tag: string;
  title: string;
  body: string;
  wide?: boolean;
  /** The live cell: a line of code and the meter it drives. */
  edit?: { name: string; value: number };
}

/* The quickstart plane as it opens. Copy after growth/website/funnel.md in Go. */
const CELLS: Cell[] = [
  {
    tag: 'markdown',
    title: 'Welcome to your space',
    body: 'Everything here is a cell: a tiny program that holds data, runs logic and draws itself. This page is cells too.',
    wide: true,
  },
  {
    tag: 'your first cell',
    title: 'Edit me',
    body: 'Change the number, watch the meter follow.',
    edit: { name: 'LIMIT', value: 62 },
  },
  {
    tag: 'recipes',
    title: 'Pages to poke at',
    body: 'A dashboard, a catalog, a settings page. Open one, change a line.',
  },
  {
    tag: 'next',
    title: 'Build with your agent',
    body: 'Wire Claude Code or Codex with the nu skills, then ask for cells in this space. Or open a demo, the docs, Discord.',
    wide: true,
  },
];

/** The quickstart plane, open, and the three it holds. */
const PLANES: PlaneRow[] = [
  { id: 'quickstart', icon: '👋', label: 'Quickstart', sel: true },
  { id: 'first', icon: <PencilLine />, label: 'Your first cell', depth: 1 },
  { id: 'dashboard', icon: <LayoutDashboard />, label: 'A dashboard', depth: 1 },
  { id: 'catalog', icon: <Library />, label: 'A catalog', depth: 1 },
];

const EXTENSIONS = ['nudemos', 'nuverse'];

/** The window's desktop width, scaled down to fit on phones. */
const MOCK_W = 840;

/** StartPreview: a still of the quickstart plane every way in lands on, in the
 *  nuspace window the cells section plays in. An illustration, not live. */
export function StartPreview() {
  const fit = useRef<HTMLDivElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [tall, setTall] = useState(0);

  // Phones: the window keeps its desktop size and scales to the width.
  useEffect(() => {
    const el = fit.current;
    const w = win.current;
    if (!el || !w) return;
    const ro = new ResizeObserver(() => {
      setZoom(Math.min(1, el.clientWidth / MOCK_W));
      setTall(w.offsetHeight);
    });
    ro.observe(el);
    ro.observe(w);
    return () => ro.disconnect();
  }, []);

  const scaled = zoom < 1;

  return (
    <div role="img" aria-label="The quickstart page in your space: a sidebar of planes and a canvas of cells to read and edit.">
      <div
        ref={fit}
        className={s.fit}
        style={{ '--z': zoom, height: scaled && tall ? tall * zoom : undefined } as CSSProperties}
        aria-hidden
      >
        <div ref={win} className={cn(s.win, scaled && s.scaled)}>
          <NuspaceWindow className={s.ns} planes={PLANES} extensions={EXTENSIONS} crumb="Quickstart">
            <div className={s.page}>
              <PlaneTitle icon="👋">Quickstart</PlaneTitle>
              <div className={s.cells}>
                {CELLS.map((c) => (
                  <div key={c.title} className={cn(s.cell, c.wide && s.wide)}>
                    <span className={s.tag}>{c.tag}</span>
                    <b className={s.title}>{c.title}</b>
                    <span className={s.body}>{c.body}</span>
                    {c.edit ? (
                      <>
                        <code className={s.code}>
                          {c.edit.name} = nu.int(<span className={s.num}>{c.edit.value}</span>)
                        </code>
                        <span className={s.meter}>
                          <i style={{ width: `${c.edit.value}%` }} />
                        </span>
                      </>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </NuspaceWindow>
        </div>
      </div>
    </div>
  );
}

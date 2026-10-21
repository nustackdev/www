import type { ReactNode } from 'react';
import s from './Agents.module.css';

/* The agent's program, in four parts, and the steps each line runs on.
 * Calls are nuspace's ops (nuspace/ops in the nuspace repo), written as the
 * top-level nuspace.* calls they are becoming. Not run against a space; kept
 * short to read.
 *
 * Unseen around it: `plane` is the plane the program runs on, `page` a ref
 * held in nu.let("", lambda page: ...) for add_plane's into=, `Sheet` the
 * table snippet's state (nuverse.snippets.table.snippet), and CARD and
 * PAGES_CHART two cell sources. */

/** What a line or a part touches. The mock shares the same keys. */
export type Key = 'page' | 'icon' | 'find' | 'read' | 'cards' | 'chart';

export interface Line {
  k: Key;
  /** The steps it runs on. */
  run: number[];
  text: ReactNode;
}

export interface Part {
  label: string;
  k: Key[];
  steps: number[];
  lines: Line[];
}

const kw = (t: string) => <span className={s.tk}>{t}</span>;
const str = (t: string) => <span className={s.ts}>{t}</span>;
const op = (t: string) => <span className={s.to}>{t}</span>;
const note = (t: string) => <span className={s.tc}>{t}</span>;
const con = (t: string) => <span className={s.tn}>{t}</span>;

export const PARTS: Part[] = [
  {
    label: 'Make a page',
    k: ['page', 'icon'],
    steps: [0, 1, 2],
    lines: [
      { k: 'page', run: [0, 1], text: <>nuspace.{op('add_plane')}(</> },
      { k: 'page', run: [0, 1], text: <>{'    '}backend={str('"async"')}, name={str('"Reading"')},</> },
      { k: 'page', run: [0, 1], text: <>{'    '}parent=plane, ui={con('True')}, into=page,</> },
      { k: 'icon', run: [2], text: <>{') >> '}nuspace.{op('set_plane_icon')}(page, {str('"book-open"')})</> },
    ],
  },
  {
    label: 'Read the books',
    k: ['find', 'read'],
    steps: [3, 4],
    lines: [
      { k: 'find', run: [3], text: <>books = nuspace.{op('cell_named')}(plane, {str('"Books"')})</> },
      { k: 'read', run: [4], text: <>titles = nuspace.{op('snapshot')}(nuspace.{op('cell_state')}(</> },
      { k: 'read', run: [4], text: <>{'    '}books,</> },
      { k: 'read', run: [4], text: <>{'    '}Sheet.order.iter()</> },
      { k: 'read', run: [4], text: <>{'        '}.map({kw('lambda')} r: Sheet.rows[r].cells[{str('"name"')}])</> },
      { k: 'read', run: [4], text: <>{'        '}.to_list(),</> },
      { k: 'read', run: [4], text: <>))</> },
    ],
  },
  {
    label: 'A card per book',
    k: ['cards'],
    steps: [5, 6, 7],
    lines: [
      { k: 'cards', run: [5, 6, 7], text: <>nu.{op('let')}(titles, {kw('lambda')} ts: nu.{op('ForEachDo')}(</> },
      { k: 'cards', run: [5, 6, 7], text: <>{'    '}ts, {kw('lambda')} t: nuspace.{op('add_cell')}(page, CARD, name=t),</> },
      { k: 'cards', run: [5, 6, 7], text: <>))</> },
    ],
  },
  {
    label: 'The live chart',
    k: ['chart'],
    steps: [8, 9],
    lines: [
      { k: 'chart', run: [8, 9], text: note('# a chart cell that redraws as you log pages') },
      { k: 'chart', run: [8, 9], text: <>nuspace.{op('add_cell')}(page, PAGES_CHART, name={str('"Pages read"')})</> },
    ],
  },
];

/** Steps: 0 the reset into a fresh space (part one's first beat), 1 page, 2 icon, 3 find the table, 4 read
 * titles, 5-7 a card each, 8 chart, 9 live (the end, still part four). Each holds for
 * about as long as it changes the window. */
export const DUR = [400, 1200, 700, 800, 1100, 700, 600, 900, 1300, 3000];
export const LAST = DUR.length - 1;
export const STATUS = [
  'making the page',
  'making the page',
  'setting its icon',
  'finding the Books table',
  'reading 3 titles',
  'adding a card',
  'adding a card',
  'adding a card',
  'adding the chart',
  'done · the chart is live',
];

/** What each step's line touches. */
export const STEP_KEY = DUR.map((_, i) => PARTS.flatMap((p) => p.lines).find((l) => l.run.includes(i))?.k);

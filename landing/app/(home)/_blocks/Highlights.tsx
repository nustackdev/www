import type { LucideIcon } from 'lucide-react';
import { Braces, Database, Infinity, Layers, Network, PanelsTopLeft, Zap } from 'lucide-react';
import { Intro } from './Intro';
import s from './Highlights.module.css';

interface Highlight {
  icon: LucideIcon;
  term: string;
  line: string;
  /** The closing cell, twice as wide. */
  wide?: boolean;
}

/** What a cell gives you, one line each. Copy from identity.md in Go. */
const HIGHLIGHTS: Highlight[] = [
  { icon: Database, term: 'Any data', line: 'A note, a table, a song, a billion-entry log, a genome.' },
  { icon: Braces, term: 'Any logic', line: 'Summarize your inbox, dim the lights at sunset, render a video.' },
  { icon: PanelsTopLeft, term: 'Any UI', line: 'A cell draws itself. Text, tables, charts, forms.' },
  { icon: Zap, term: "It's live", line: 'Change one cell and everything that depends on it follows live. UI too.' },
  { icon: Network, term: 'Work scales', line: 'The same cell runs in a worker, across processes or on a cluster.' },
  { icon: Layers, term: 'Data scales', line: 'A counter or a billion rows, same cell. Storage shards underneath.' },
  {
    icon: Infinity,
    term: "It's made of itself",
    line: 'The space has the same shape as its cells, so you and your agents can program it too.',
    wide: true,
  },
];

/** Highlights — what every cell can do, as an open grid. */
export function Highlights() {
  return (
    <section className={s.root}>
      <Intro kicker="Highlights" title="Program anything.">
        The data, the logic, the look, even the space itself.
      </Intro>
      <ul className={s.grid}>
        {HIGHLIGHTS.map(({ icon: Icon, term, line, wide }) => (
          <li key={term} className={wide ? `${s.cell} ${s.wide}` : s.cell}>
            <div className={s.head}>
              <span className={s.icon} aria-hidden>
                <Icon size={16} strokeWidth={2} />
              </span>
              <h3 className={s.term}>{term}</h3>
            </div>
            <p className={s.line}>{line}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

import type { CodeTok } from './CodeSample';
import s from './Snippet.module.css';

interface Props {
  lines: CodeTok[][];
  ariaLabel?: string;
  className?: string;
  /** First visible line number in the gutter. Defaults to 42 — mid-file. */
  startLine?: number;
}

/**
 * Snippet — excerpt-style code panel. A left gutter shows line numbers for
 * the visible code (starting mid-file), bracketed by "…" rows and blank
 * slots aligned with syntax-colored ghost bars above and below. The ghost
 * region reads as "code with real syntax highlighting, seen out of focus,"
 * making the panel unmistakably a slice of a longer file — never a
 * runnable, lift-and-paste block.
 *
 * No filename tab, no copy button.
 */

// A ghost row is: an indent (blank ch) plus a sequence of colored bars
// separated by small gaps. Colors reference the same token classes used by
// the visible code (kw/nu/str/cmt/num/name). Widths are in `ch` so they
// scale with the mono font and rhyme with realistic code line lengths.
type Bar = { c: 'kw' | 'nu' | 'str' | 'cmt' | 'num' | 'name'; w: number };
type Row = { indent: number; bars: Bar[] };

const GHOST_TOP: Row[] = [
  // "  # section comment"
  { indent: 2, bars: [{ c: 'cmt', w: 24 }] },
  // "kw name = "string" "
  { indent: 0, bars: [{ c: 'kw', w: 4 }, { c: 'name', w: 8 }, { c: 'str', w: 12 }] },
];

const GHOST_BOTTOM: Row[] = [
  // "    name.nu(  num  )"
  { indent: 4, bars: [{ c: 'name', w: 6 }, { c: 'nu', w: 4 }, { c: 'num', w: 3 }] },
  // "  kw  name  # trailing note"
  { indent: 2, bars: [{ c: 'kw', w: 5 }, { c: 'name', w: 9 }, { c: 'cmt', w: 14 }] },
];

function GhostBar({ c, w }: Bar) {
  const cls = `${s.ghostBar} ${s[`bar_${c}`]}`;
  return <span className={cls} style={{ width: `${w}ch` }} />;
}

function GhostRow({ row, depth }: { row: Row; depth: number }) {
  return (
    <div className={s.ghostLine} data-depth={depth}>
      <span className={s.ghostIndent} style={{ width: `${row.indent}ch` }} />
      {row.bars.map((b, i) => (
        <GhostBar key={i} c={b.c} w={b.w} />
      ))}
    </div>
  );
}

export function Snippet({
  lines,
  ariaLabel,
  className,
  startLine = 42,
}: Props) {
  const cls = [s.snippet, className].filter(Boolean).join(' ');

  return (
    <div className={cls} role="figure" aria-label={ariaLabel ?? 'Code excerpt'}>
      <div className={s.body}>
        <div className={s.gutter} aria-hidden>
          {GHOST_TOP.map((_, i) => {
            // Innermost top ghost slot (right above the first number) shows "…";
            // outer ghost slots stay blank.
            const isEdge = i === GHOST_TOP.length - 1;
            return (
              <div
                key={`gt-${i}`}
                className={`${s.lineNo} ${isEdge ? s.ellipsis : s.gutterGhost}`}
              >
                {isEdge ? '…' : ' '}
              </div>
            );
          })}
          {lines.map((_, i) => (
            <div key={i} className={s.lineNo}>{startLine + i}</div>
          ))}
          {GHOST_BOTTOM.map((_, i) => {
            // Innermost bottom ghost slot (right below the last number) shows "…";
            // outer ghost slots stay blank.
            const isEdge = i === 0;
            return (
              <div
                key={`gb-${i}`}
                className={`${s.lineNo} ${isEdge ? s.ellipsis : s.gutterGhost}`}
              >
                {isEdge ? '…' : ' '}
              </div>
            );
          })}
        </div>

        <div className={s.content}>
          <div className={s.ghost} aria-hidden>
            {GHOST_TOP.map((row, i) => (
              <GhostRow key={i} row={row} depth={GHOST_TOP.length - i} />
            ))}
          </div>

          <div className={s.code}>
            {lines.map((tokens, i) => (
              <div key={i} className={s.line}>
                {tokens.length === 0 ? ' ' : tokens.map((tok, j) =>
                  tok.c ? (
                    <span key={j} className={s[tok.c]}>{tok.t}</span>
                  ) : (
                    <span key={j}>{tok.t}</span>
                  ),
                )}
              </div>
            ))}
          </div>

          <div className={s.ghost} aria-hidden>
            {GHOST_BOTTOM.map((row, i) => (
              <GhostRow key={i} row={row} depth={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

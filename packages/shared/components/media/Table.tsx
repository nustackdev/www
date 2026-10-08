import type { CSSProperties, ReactNode } from 'react';
import type { Hue } from '../../lib/hue';
import s from './Table.module.css';

/**
 * Table — polished, landing-page-suited grid table.
 *
 * CSS-grid under the hood (not a semantic <table>) so we can control column
 * sizing, row-hover, and stacked-card collapse on narrow viewports. Roles
 * (`table` / `row` / `columnheader` / `cell`) are set for a11y.
 *
 * Each row can be a link (`rowHref`) and can carry a `rowHue` — hovering
 * lights the left edge in that hue and washes the row in `--h-wash`.
 * Column headers are optional; hide them per-table by passing `showHeader={false}`.
 */

export interface TableColumn<T> {
  /** Stable id used as React key and grid-column name. */
  key: string;
  /** Header label. Ignored when `showHeader={false}`. */
  header?: ReactNode;
  /**
   * Grid column sizing token. Any valid `grid-template-columns` fragment:
   * `'auto'`, `'1fr'`, `'minmax(0, 1fr)'`, `'12rem'`, etc. Defaults to `'auto'`.
   */
  width?: string;
  align?: 'start' | 'end';
  /** Render the cell body for a given row. */
  render: (row: T) => ReactNode;
  /**
   * Cell display flavor:
   *   `mono` — monospace, hue-tinted (uses ambient `--h` if set).
   *   `chip` — small pill in the hue soft/line palette.
   * Applies to body cells; headers stay in the header style.
   */
  variant?: 'text' | 'mono' | 'chip';
}

interface Props<T> {
  columns: TableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  /** When set, the whole row becomes a link to this href. */
  rowHref?: (row: T) => string;
  /** Per-row hue — tints the hover accent and, for `card`, the row wash. */
  rowHue?: (row: T) => Hue | undefined;
  /** Hide the header row entirely. Defaults to true when no column has a header. */
  showHeader?: boolean;
  /**
   * Visual weight:
   *   `card` — bordered surface, wash header, hover-fills the row (dashboard vibe).
   *   `list` — chromeless, hairline separators only, header optional, hover
   *            lifts the name in the row's hue (landing / marketing vibe).
   * Defaults to `card`.
   */
  variant?: 'card' | 'list';
  /** Caption for a11y (visually hidden). */
  ariaLabel?: string;
  className?: string;
}

export function Table<T>({
  columns,
  rows,
  rowKey,
  rowHref,
  rowHue,
  showHeader,
  variant = 'card',
  ariaLabel,
  className,
}: Props<T>) {
  const hasHeaders = columns.some((c) => c.header != null);
  // `list` defaults to header-off (headers rarely earn their keep on landing);
  // `card` defaults to header-on if any column provides one.
  const showHead = showHeader ?? (variant === 'list' ? false : hasHeaders);

  const gridTemplate = columns.map((c) => c.width ?? 'auto').join(' ');
  const gridStyle = { '--table-cols': gridTemplate } as CSSProperties;

  const cls = [
    s.table,
    variant === 'list' ? s.tableList : s.tableCard,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={cls}
      role="table"
      aria-label={ariaLabel}
      style={gridStyle}
    >
      {showHead ? (
        <div className={s.head} role="row">
          {columns.map((c) => (
            <div
              key={c.key}
              role="columnheader"
              className={`${s.headCell} ${c.align === 'end' ? s.alignEnd : ''}`}
            >
              {c.header}
            </div>
          ))}
        </div>
      ) : null}

      <div className={s.body} role="rowgroup">
        {rows.map((row) => {
          const key = rowKey(row);
          const href = rowHref?.(row);
          const hue = rowHue?.(row);
          const rowCls = `${s.row} ${href ? s.rowLink : ''}`;
          const rowProps = {
            role: 'row',
            className: rowCls,
            'data-hue': hue,
          } as const;

          const cells = columns.map((c) => (
            <div
              key={c.key}
              role="cell"
              className={[
                s.cell,
                c.align === 'end' ? s.alignEnd : '',
                c.variant === 'mono' ? s.cellMono : '',
                c.variant === 'chip' ? s.cellChip : '',
              ]
                .filter(Boolean)
                .join(' ')}
              data-col={c.key}
            >
              {c.header != null ? (
                <span className={s.cellLabel} aria-hidden>
                  {c.header}
                </span>
              ) : null}
              <span className={s.cellBody}>
                {c.variant === 'chip' ? (
                  <span className={s.chip}>{c.render(row)}</span>
                ) : (
                  c.render(row)
                )}
              </span>
            </div>
          ));

          if (href) {
            return (
              <a key={key} href={href} {...rowProps}>
                {cells}
              </a>
            );
          }
          return (
            <div key={key} {...rowProps}>
              {cells}
            </div>
          );
        })}
      </div>
    </div>
  );
}

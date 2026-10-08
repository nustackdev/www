import type { ReactNode } from 'react';
import { Cell } from '../grid/Cell';
import { CellContent } from '../grid/CellContent';
import type { CellYAlign } from '../grid/Cell';
import type { CellPad } from '../grid/CellContent';

export interface SectionCellProps {
  children?: ReactNode;
  /** Vertical alignment inside the cell. Default 'top'. */
  yalign?: CellYAlign;
  /** Content padding. Default 'lg' (matches section chapter cells). */
  pad?: CellPad;
  className?: string;
}

/**
 * SectionCell — one column inside a `<Section split=...>`. A thin wrapper
 * over Cell + CellContent so section markup stays flat and readable.
 */
export function SectionCell({
  children,
  yalign,
  pad = 'lg',
  className,
}: SectionCellProps) {
  return (
    <Cell yalign={yalign} className={className}>
      <CellContent pad={pad}>{children}</CellContent>
    </Cell>
  );
}

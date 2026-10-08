import type { ReactNode } from 'react';
import s from './LinkGrid.module.css';

interface Props {
  /** LinkCard children (or any card-shaped link) laid out in an auto-fill grid. */
  children: ReactNode;
  className?: string;
}

/**
 * LinkGrid — auto-fill responsive grid for a row of LinkCards. Single canonical
 * layout: `repeat(auto-fill, minmax(240px, 1fr))` with 16px gap. Use anywhere a
 * page previously hand-rolled its own combineGrid / comboGrid / exitGrid /
 * linkGrid / readGrid / contactGrid class.
 */
export function LinkGrid({ children, className }: Props) {
  const cls = [s.grid, className].filter(Boolean).join(' ');
  return <div className={cls}>{children}</div>;
}

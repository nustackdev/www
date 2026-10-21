import type { ReactNode } from 'react';
import s from './Heading.module.css';

interface Props {
  level: 1 | 2;
  /** The element, when the outline needs another one, eg `h1` for a page title. */
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  children: ReactNode;
}

/** Heading: level=1 renders <h2> (section title), level=2 renders <h3>
 *  (subsection title), unless `as` says otherwise. Emits zero margin;
 *  parent owns rhythm. */
export function Heading({ level, as, className, children }: Props) {
  const cls = [level === 1 ? s.h1 : s.h2, className].filter(Boolean).join(' ');
  const Tag = as ?? (level === 1 ? 'h2' : 'h3');
  return <Tag className={cls}>{children}</Tag>;
}

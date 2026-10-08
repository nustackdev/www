import type { ReactNode } from 'react';
import s from './Body.module.css';

export interface BodyProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Body — vertical stack of Chapter cards under the page Header/Hero.
 * No border/bg of its own; each Chapter owns its card treatment. Body's
 * only job is to separate chapters with a vertical gap.
 */
export function Body({ children, className }: BodyProps) {
  const cls = [s.root, className].filter(Boolean).join(' ');
  return <div className={cls}>{children}</div>;
}

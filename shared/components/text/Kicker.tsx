import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import s from './Kicker.module.css';

interface Props {
  /** accent: the group name over an h2, in Afterglow. muted: a unit name. */
  tone?: 'accent' | 'muted';
  className?: string;
  children: ReactNode;
}

/** Kicker — the short name that sits over a title. Plain words, not caps. */
export function Kicker({ tone = 'muted', className, children }: Props) {
  return <p className={cn(s.kicker, s[tone], className)}>{children}</p>;
}

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import s from './Kbd.module.css';

/** Kbd — a key, as a soft chip that reads on any surface in both themes. */
export function Kbd({ className, children }: { className?: string; children: ReactNode }) {
  return <kbd className={cn(s.kbd, className)}>{children}</kbd>;
}

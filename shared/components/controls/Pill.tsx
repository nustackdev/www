import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../lib/cn';
import s from './Pill.module.css';

export interface PillProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** On: solid ink. Sets aria-selected for a tab, aria-pressed otherwise. */
  selected?: boolean;
  /** A 16px leading icon. */
  icon?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
  children: ReactNode;
}

/**
 * Pill: a rounded choice in a row of them, a tab (the install pickers) or a
 * toggle (the gallery tags). Rest, hover and press washes, solid ink when on.
 * Lay a row out with PillRow.
 */
export function Pill({ selected, icon, className, children, role, ref, ...rest }: PillProps) {
  const state = role === 'tab' ? { 'aria-selected': !!selected } : selected === undefined ? {} : { 'aria-pressed': selected };
  return (
    <button ref={ref} type="button" role={role} {...state} {...rest} data-on={selected || undefined} className={cn(s.pill, icon ? s.withIcon : null, className)}>
      {icon ? <span className={s.icon}>{icon}</span> : null}
      {children}
    </button>
  );
}

/** PillRow: pills in a row with the pill gap. Wraps by default; scroll keeps one line and scrolls it. */
export function PillRow({ scroll, className, ...rest }: { scroll?: boolean } & HTMLAttributes<HTMLDivElement>) {
  return <div {...rest} className={cn(s.row, scroll && s.scroll, className)} />;
}

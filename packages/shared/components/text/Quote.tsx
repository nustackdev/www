import type { CSSProperties, ReactNode } from 'react';
import type { Hue } from '../../lib/hue';
import s from './Quote.module.css';

interface Props {
  /**
   * Accent hue for the left border and inline em/strong. Defaults to the
   * ambient `--site-accent` (set by the enclosing hue scope), falling back
   * to teal at the page root. Pass a hue to pin the quote regardless of
   * where it renders.
   */
  hue?: Hue;
  className?: string;
  children: ReactNode;
}

/**
 * Quote — pull-quote / accent landmark. Oversized line with a hairline
 * left border in the current hue accent; inline <em> and <strong> pick
 * up the same accent so a payoff phrase reads as a hit, not decoration.
 * Zero margin — parent owns rhythm.
 */
export function Quote({ hue, className, children }: Props) {
  const cls = [s.quote, className].filter(Boolean).join(' ');
  const style = hue
    ? ({ '--quote-hue': `var(--site-hue-${hue})` } as CSSProperties)
    : undefined;
  return (
    <p className={cls} style={style}>
      {children}
    </p>
  );
}

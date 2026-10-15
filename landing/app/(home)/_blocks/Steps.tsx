'use client';

import type { ReactNode } from 'react';
import s from './Steps.module.css';

export interface Step {
  label: string;
  note: ReactNode;
}

export interface StepsProps {
  steps: Step[];
  active: number;
  /** A step was clicked. */
  onPick?: (i: number) => void;
  /** A step was pointed at or focused. */
  onPoint?: (i: number) => void;
  className?: string;
}

/** Steps — numbered steps on a hairline rail; the active one lights in Afterglow. */
export function Steps({ steps, active, onPick, onPoint, className }: StepsProps) {
  return (
    <ol className={className ? `${s.rail} ${className}` : s.rail}>
      {steps.map((st, i) => (
        <li key={st.label}>
          <button
            type="button"
            className={s.step}
            data-active={i === active || undefined}
            aria-current={i === active ? 'step' : undefined}
            onMouseEnter={onPoint && (() => onPoint(i))}
            onFocus={onPoint && (() => onPoint(i))}
            onClick={() => onPick?.(i)}
          >
            <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
            <span className={s.label}>{st.label}</span>
            <span className={s.note}>{st.note}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}

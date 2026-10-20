'use client';

import { useState, type ReactNode } from 'react';
import s from './lab.module.css';

/** Round 1 kept for reference, folded. Its variations mount only while open, so the page stays light. */
export function Round1({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <details id="round1" className={s.round1} onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary className={s.round1Summary}>
        Round 1: five shapes (stage and strip, bento, chapter rail, tabs with peek, fanned deck)
      </summary>
      {open ? children : null}
    </details>
  );
}

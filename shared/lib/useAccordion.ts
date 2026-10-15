'use client';

import { useRef, useState, useSyncExternalStore } from 'react';

/** How long a fold takes, ms. Matches the fold transitions in CSS. */
const FOLD_MS = 280;

/**
 * useAccordion — a list that folds into an accordion below `query`: one item
 * open at a time, the rest down to their heads. Above it every item is open.
 *
 * What is open is CSS's to show (data-open on the item, under the same media
 * query), so the folded list paints right from the server. `on` turns on the
 * head's button semantics once the client knows it is below `query`.
 */
export function useAccordion(query: string, first = 0) {
  const [open, setOpen] = useState(first);
  const on = useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener('change', cb);
      return () => m.removeEventListener('change', cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
  const heads = useRef<(HTMLElement | null)[]>([]);

  /** Open item `i`, folding the rest. Its head stays in view as the others fold above it. */
  const pick = (i: number) => {
    if (!on || i === open) return;
    setOpen(i);
    setTimeout(() => {
      const el = heads.current[i];
      if (!el) return;
      // Under the nav counts as out of view: its scroll-margin says how far down it reaches.
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      if (el.getBoundingClientRect().top < margin) el.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, FOLD_MS);
  };

  /** Props for item `i`'s head, a button. */
  const head = (i: number) => ({
    ref: (el: HTMLElement | null) => {
      heads.current[i] = el;
    },
    type: 'button' as const,
    onClick: () => pick(i),
    tabIndex: on ? 0 : -1,
    'aria-expanded': on ? i === open : undefined,
  });

  /** Props for item `i` itself. */
  const item = (i: number) => ({ 'data-open': i === open || undefined });

  return { open, on, head, item };
}

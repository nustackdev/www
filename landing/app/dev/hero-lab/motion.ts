'use client';

import { useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

/** Reduced motion, live. False on the server. */
export function useCalm() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}

type VTDocument = Document & { startViewTransition?: (cb: () => void) => unknown };

/**
 * Run a state change inside a View Transition, so elements sharing a
 * `view-transition-name` before and after morph between the two (a FLIP the
 * browser does for us). Plain update where unsupported or under reduced motion.
 */
export function morph(update: () => void) {
  const d = document as VTDocument;
  if (!d.startViewTransition || window.matchMedia(QUERY).matches) return update();
  d.startViewTransition(() => flushSync(update));
}

/** A view-transition-name unique to one variation and demo. */
export const vt = (scope: string, id: string) => ({ viewTransitionName: `${scope}-${id}` });

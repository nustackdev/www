'use client';

import { useEffect, useState } from 'react';
import { cn } from '@www/shared/lib/cn';
import s from './Hero.module.css';

/** How long a word stays, and the swap's fade, ms. */
const HOLD_MS = 2200;
const FADE_MS = 250;

/**
 * Rotator: the hero's rotating word. Swaps on a timer with a short fade; under
 * reduced motion it holds the first word. The first word renders on the server.
 */
export function Rotator({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let t: number;
    const id = window.setInterval(() => {
      setOut(true);
      t = window.setTimeout(() => {
        setI((n) => (n + 1) % words.length);
        setOut(false);
      }, FADE_MS);
    }, HOLD_MS);
    return () => {
      clearInterval(id);
      clearTimeout(t);
    };
  }, [words.length]);

  return (
    <span className={cn(s.rot, out && s.rotOut)} aria-live="off">
      {words[i]}
    </span>
  );
}

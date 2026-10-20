'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@www/shared/lib/cn';
import s from './Gallery.module.css';

const CALM = '(prefers-reduced-motion: reduce)';
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(CALM);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
/** Reduced motion or save data, live. False on the server. */
function useCalm() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(CALM).matches || !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
    () => false,
  );
}

interface Props {
  /** The demo's folder, eg `/demos/movies`: its preview-* loop and thumb-* still. */
  src: string;
  /** Load and play the loop. False holds the thumb. */
  live: boolean;
  className?: string;
}

/**
 * DemoLoop: a demo's preview loop for small tiles (see the README next to
 * DemoVideo). The thumb paints first; the loop loads once `live` and in view,
 * plays while seen, and never under reduced motion or save data.
 */
export function DemoLoop({ src, live, className }: Props) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme ? (resolvedTheme === 'dark' ? 'dark' : 'light') : null;
  const calm = useCalm();
  const root = useRef<HTMLSpanElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const on = live && seen && !calm && !!theme;
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (on) v.play().catch(() => {});
    else v.pause();
  }, [on]);

  const [loaded, setLoaded] = useState(false);
  if (on && !loaded) setLoaded(true);

  return (
    <span ref={root} className={cn(s.loop, className)} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={cn(s.loopMedia, s.light)} src={`${src}/thumb-light.jpg`} alt="" loading="lazy" decoding="async" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={cn(s.loopMedia, s.dark)} src={`${src}/thumb-dark.jpg`} alt="" loading="lazy" decoding="async" />
      {loaded && theme && !calm ? (
        <video key={theme} ref={video} className={s.loopMedia} muted loop playsInline preload="auto" disablePictureInPicture>
          <source src={`${src}/preview-${theme}.webm`} type='video/webm; codecs="vp9"' />
          <source src={`${src}/preview-${theme}.mp4`} type="video/mp4" />
        </video>
      ) : null}
    </span>
  );
}

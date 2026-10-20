'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@www/shared/lib/cn';
import { useCalm } from './motion';
import type { DemoId } from './demos';
import s from './lab.module.css';

interface Props {
  id: DemoId;
  /** Loop while seen. False holds the first frame. */
  play?: boolean;
  /** `near`: fetch the loop near the viewport. `play`: only once first asked to play (hover policies). */
  load?: 'near' | 'play';
  className?: string;
}

/**
 * Preview: a short muted highlight loop of one demo, from /_lab/<id>/ (lab
 * only, see the encode notes in page.dev.tsx). Loads near the viewport,
 * plays while seen, holds the poster under reduced motion.
 */
export function Preview({ id, play = true, load = 'near', className }: Props) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme ? (resolvedTheme === 'dark' ? 'dark' : 'light') : null;
  const calm = useCalm();
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [seen, setSeen] = useState(false);
  const [asked, setAsked] = useState(false);
  if (play && !asked) setAsked(true);
  const fetchIt = near && (load === 'near' || asked);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ioNear = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '400px 0px' });
    const ioSeen = new IntersectionObserver(([e]) => setSeen(e.isIntersecting));
    ioNear.observe(el);
    ioSeen.observe(el);
    return () => {
      ioNear.disconnect();
      ioSeen.disconnect();
    };
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (play && seen && !calm) v.play().catch(() => {});
    else v.pause();
  }, [play, seen, calm, theme, fetchIt]);

  const base = `/_lab/${id}`;
  return (
    <div ref={root} className={cn(s.preview, className)} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={cn(s.previewMedia, s.posterLight)} src={`${base}/poster-light.jpg`} alt="" loading="lazy" decoding="async" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={cn(s.previewMedia, s.posterDark)} src={`${base}/poster-dark.jpg`} alt="" loading="lazy" decoding="async" />
      {fetchIt && theme && !calm ? (
        <video key={theme} ref={video} className={s.previewMedia} muted loop playsInline preload="auto" disablePictureInPicture>
          <source src={`${base}/${theme}.webm`} type='video/webm; codecs="vp9"' />
          <source src={`${base}/${theme}.mp4`} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}

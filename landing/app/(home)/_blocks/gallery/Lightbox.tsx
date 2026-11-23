'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { DemoVideo } from '@www/shared/components/media/demo/DemoVideo';
import { GALLERY, OPEN_EVENT } from './gallery.data';
import { Made } from './Made';
import s from './Gallery.module.css';

/**
 * Lightbox: one gallery space big, in the site's demo player (chapters and
 * captions say what to notice), its title, line and what it is made of under
 * it. Arrows and the side buttons step through the gallery; Esc or the
 * backdrop closes it.
 */
export function Lightbox() {
  const dlg = useRef<HTMLDialogElement>(null);
  const [at, setAt] = useState<number | null>(null);

  useEffect(() => {
    const on = (e: Event) => {
      const i = GALLERY.findIndex((g) => g.id === (e as CustomEvent<string>).detail);
      if (i < 0) return;
      setAt(i);
      if (!dlg.current?.open) dlg.current?.showModal();
    };
    window.addEventListener(OPEN_EVENT, on);
    return () => window.removeEventListener(OPEN_EVENT, on);
  }, []);

  const step = useCallback((n: number) => setAt((i) => (i === null ? i : (i + n + GALLERY.length) % GALLERY.length)), []);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    const close = () => {
      setAt(null);
      document.documentElement.style.overflow = '';
    };
    d.addEventListener('keydown', key);
    d.addEventListener('close', close);
    return () => {
      d.removeEventListener('keydown', key);
      d.removeEventListener('close', close);
    };
  }, [step]);

  useEffect(() => {
    if (at !== null) document.documentElement.style.overflow = 'hidden';
  }, [at]);

  const g = at === null ? null : GALLERY[at];

  return (
    <dialog
      ref={dlg}
      className={s.dialog}
      aria-label={g?.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) dlg.current?.close();
      }}
    >
      {g ? (
        <div className={s.box}>
          <div className={s.player}>
            <DemoVideo key={g.id} src={`/demos/${g.demo}`} label={g.title} caption eager />
          </div>
          <div className={s.cap}>
            <div className={s.capText}>
              <span className={s.eyebrow}>{g.eyebrow}</span>
              <h3 className={s.capTitle}>{g.title}</h3>
              <p className={s.line}>{g.tagline}</p>
              <Made items={g.made} />
            </div>
            <span className={s.count}>
              {at! + 1} / {GALLERY.length}
            </span>
          </div>
        </div>
      ) : null}
      <button type="button" className={`${s.navBtn} ${s.close}`} aria-label="Close" onClick={() => dlg.current?.close()}>
        <X size={18} />
      </button>
      <button type="button" className={`${s.navBtn} ${s.prev}`} aria-label="Previous space" onClick={() => step(-1)}>
        <ChevronLeft size={20} />
      </button>
      <button type="button" className={`${s.navBtn} ${s.next}`} aria-label="Next space" onClick={() => step(1)}>
        <ChevronRight size={20} />
      </button>
    </dialog>
  );
}

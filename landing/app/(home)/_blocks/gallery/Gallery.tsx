'use client';

import { useState } from 'react';
import { Section } from '@www/shared/components/page';
import { DemoLoop } from './DemoLoop';
import { GALLERY, openDemo } from './gallery.data';
import { Lightbox } from './Lightbox';
import { Made } from './Made';
import s from './Gallery.module.css';

/**
 * Gallery: spaces people run, as a grid of cards. A card is the space's loop
 * (plays on hover), its domain, title, one line and what it is made of. A
 * click opens it in the lightbox, which the hero wall opens too.
 */
export function Gallery() {
  const [hot, setHot] = useState<string | null>(null);
  return (
    <Section
      id="gallery"
      eyebrow="Gallery"
      tagline="Spaces people run."
      description="Each one is a set of small programs talking to each other."
    >
      <ul className={s.grid}>
        {GALLERY.map((g) => (
          <li key={g.id}>
            <button
              type="button"
              className={s.card}
              onClick={() => openDemo(g.id)}
              onPointerEnter={() => setHot(g.id)}
              onPointerLeave={() => setHot(null)}
              onFocus={() => setHot(g.id)}
              onBlur={() => setHot(null)}
            >
              <span className={s.media}>
                <DemoLoop src={`/demos/${g.demo}`} live={hot === g.id} />
              </span>
              <span className={s.meta}>
                <span className={s.eyebrow}>{g.eyebrow}</span>
                <span className={s.title}>{g.title}</span>
                <span className={s.line}>{g.tagline}</span>
              </span>
            </button>
            <Made items={g.made} />
          </li>
        ))}
      </ul>
      <Lightbox />
    </Section>
  );
}

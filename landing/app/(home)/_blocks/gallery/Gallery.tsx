'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { Pill, PillRow } from '@www/shared/components/controls/Pill';
import { Section } from '@www/shared/components/page';
import { Anchors } from './Anchors';
import { DemoLoop } from './DemoLoop';
import { GALLERY, TAGS, openDemo, type GalleryItem, type Tag } from './gallery.data';
import { Lightbox } from './Lightbox';
import { Made } from './Made';
import s from './Gallery.module.css';

/** What a search matches: the name, the words and the parts. */
const hay = (g: GalleryItem) => [g.name, g.eyebrow, g.title, g.tagline, ...g.made, ...g.tags].join(' ').toLowerCase();

/**
 * Gallery: spaces people run, as one row of cards over a search and tag
 * filters. Three cards to a view on desktop, two on tablets, one and a peek on
 * phones; the arrows page the row, a swipe or a trackpad scrolls it. A card is
 * the space's loop (plays on hover, or when it is the one in view on touch),
 * its domain, title, one line and what it is made of. A click opens it in the
 * lightbox, which the hero wall opens too. Under the row, the anchors: first
 * reactions drifting at three depths.
 */
export function Gallery() {
  const [q, setQ] = useState('');
  const [tag, setTag] = useState<Tag | null>(null);
  const [hot, setHot] = useState<string | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const track = useRef<HTMLUListElement>(null);

  const items = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return GALLERY.filter((g) => (!tag || g.tags.includes(tag)) && words.every((w) => hay(g).includes(w)));
  }, [q, tag]);

  /** Where the row sits: its ends for the arrows, and on touch the card in view plays. */
  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return setEdge({ start: true, end: true });
    const max = el.scrollWidth - el.clientWidth;
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2 });
    if (window.matchMedia('(hover: none)').matches) {
      const cards = [...el.children] as HTMLElement[];
      const at = cards.findIndex((c) => c.offsetLeft - el.offsetLeft + c.offsetWidth / 2 > el.scrollLeft);
      setHot(items[Math.max(at, 0)]?.id ?? null);
    }
  }, [items]);

  // A new filter starts the row over.
  useEffect(() => {
    track.current?.scrollTo({ left: 0 });
    sync();
  }, [items, sync]);

  useEffect(() => {
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [sync]);

  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };

  const clear = () => {
    setQ('');
    setTag(null);
  };

  return (
    <Section
      id="gallery"
      eyebrow="Gallery"
      tagline="Spaces people run."
      description="Each one is a set of small programs talking to each other."
    >
      <div className={s.gallery}>
        <div className={s.bar}>
          <label className={s.search}>
            <Search aria-hidden />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search spaces"
              aria-label="Search spaces"
            />
            {q ? (
              <button type="button" className={s.clearQ} onClick={() => setQ('')} aria-label="Clear search">
                <X />
              </button>
            ) : null}
          </label>

          <PillRow scroll className={s.tags} role="group" aria-label="Filter by tag">
            <Pill selected={!tag} onClick={() => setTag(null)}>
              All
            </Pill>
            {TAGS.map((t) => (
              <Pill key={t} selected={tag === t} onClick={() => setTag(tag === t ? null : t)}>
                {t}
              </Pill>
            ))}
          </PillRow>

          {/* Hidden, room kept, when the row fits in one view. */}
          <div className={s.arrows} data-idle={(edge.start && edge.end) || undefined}>
            <button type="button" className={s.arrow} onClick={() => page(-1)} disabled={edge.start} aria-label="Previous spaces">
              <ChevronLeft />
            </button>
            <button type="button" className={s.arrow} onClick={() => page(1)} disabled={edge.end} aria-label="Next spaces">
              <ChevronRight />
            </button>
          </div>
        </div>

        {items.length ? (
          <ul ref={track} className={s.track} onScroll={sync} aria-label="Spaces">
            {items.map((g) => (
              <li key={g.id} className={s.item}>
                <button
                  type="button"
                  className={s.card}
                  onClick={() => openDemo(g.id)}
                  onPointerEnter={(e) => e.pointerType === 'mouse' && setHot(g.id)}
                  onPointerLeave={(e) => e.pointerType === 'mouse' && setHot(null)}
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
        ) : (
          <div className={s.empty}>
            <p>No spaces match that yet.</p>
            <Pill onClick={clear}>Show all</Pill>
          </div>
        )}

        <div className={s.anchors}>
          <Anchors />
        </div>
      </div>
      <Lightbox />
    </Section>
  );
}

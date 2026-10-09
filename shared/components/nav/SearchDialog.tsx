'use client';

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { Search } from 'lucide-react';
import { zoneOf } from '../../lib/zones';
import s from './SearchDialog.module.css';

/**
 * Site-wide search over every zone (landing, docs, blog). Backed by
 * Pagefind, which compose runs over the merged build, so it searches the
 * real HTML whatever engine made it. The index only exists in a built site
 * (`pnpm build`), so `pnpm dev` shows a hint instead of results.
 */

interface Hit {
  url: string;
  title: string;
  excerpt: string;
}

interface Pagefind {
  debouncedSearch: (q: string, opts?: object, ms?: number) => Promise<{
    results: { data: () => Promise<{ url: string; excerpt: string; meta: { title?: string } }> }[];
  } | null>;
}

const PAGEFIND_URL = '/pagefind/pagefind.js';
const MAX_HITS = 8;
const ZONE_LABEL: Record<string, string> = { '': 'Site', '/docs': 'Docs', '/blog': 'Blog' };

let pagefind: Promise<Pagefind | null> | null = null;

function loadPagefind(): Promise<Pagefind | null> {
  // A runtime URL import, kept away from the bundler: the file only exists
  // in the merged build, never in any app's own module graph.
  const importUrl = new Function('u', 'return import(u)') as (u: string) => Promise<Pagefind>;
  pagefind ??= importUrl(PAGEFIND_URL).catch(() => null);
  return pagefind;
}

/** Path part of a Pagefind URL, without the trailing slash Pages adds. */
function displayPath(url: string) {
  return url.replace(/\/$/, '') || '/';
}

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<Hit[]>([]);
  const [active, setActive] = useState(0);
  const [missing, setMissing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K opens from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    loadPagefind().then((pf) => setMissing(pf === null));
  }, [open]);

  useEffect(() => {
    let live = true;
    const q = query.trim();
    if (!q) {
      setHits([]);
      return;
    }
    loadPagefind().then(async (pf) => {
      const res = await pf?.debouncedSearch(q);
      if (!live || !res) return;
      const data = await Promise.all(res.results.slice(0, MAX_HITS).map((r) => r.data()));
      if (!live) return;
      setHits(data.map((d) => ({ url: d.url, title: d.meta.title ?? displayPath(d.url), excerpt: d.excerpt })));
      setActive(0);
    });
    return () => {
      live = false;
    };
  }, [query]);

  if (!open) return null;

  const close = () => onOpenChange(false);
  const go = (url: string) => {
    close();
    window.location.assign(url);
  };

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, hits.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && hits[active]) go(hits[active].url);
  };

  return createPortal(
    <div className={s.scrim} onMouseDown={close} data-pagefind-ignore>
      <div
        className={s.panel}
        role="dialog"
        aria-modal="true"
        aria-label="search"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <label className={s.field}>
          <Search size={16} aria-hidden className={s.icon} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search docs, blog and the site"
            className={s.input}
            aria-label="search"
          />
          <kbd className={s.kbd}>esc</kbd>
        </label>

        {missing ? (
          <p className={s.note}>The search index is built with the site. Run <code>pnpm build</code> and <code>pnpm serve</code>.</p>
        ) : query.trim() && hits.length === 0 ? (
          <p className={s.note}>No results.</p>
        ) : hits.length > 0 ? (
          <ul className={s.hits}>
            {hits.map((h, i) => (
              <li key={h.url}>
                <a
                  href={h.url}
                  className={s.hit}
                  data-active={i === active ? 'true' : undefined}
                  onMouseEnter={() => setActive(i)}
                >
                  <span className={s.hitHead}>
                    <span className={s.hitTitle}>{h.title}</span>
                    <span className={s.hitZone}>{ZONE_LABEL[zoneOf(h.url)]}</span>
                  </span>
                  {/* Pagefind escapes page text and only adds <mark> around matches. */}
                  <span className={s.hitExcerpt} dangerouslySetInnerHTML={{ __html: h.excerpt }} />
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}

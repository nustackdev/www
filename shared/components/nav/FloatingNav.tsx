'use client';

/**
 * FloatingNav — the site's top nav pill.
 *
 * Desktop: logo · Stack▾ · Docs · Blog · socials · search.
 * Mobile:  logo · search · hamburger → full-screen sheet with everything stacked.
 *
 * The Stack dropdown (ProductsMenu) is portaled to <body> so its blur
 * escapes this header's `isolation: isolate` backdrop-root.
 */

import { SiteLink as Link } from './SiteLink';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, Menu, BookOpen, Rss, X as CloseIcon, ArrowRight } from 'lucide-react';
import { NuLogo } from '../marks/NuLogo';
import { GithubMark } from '../marks/GithubMark';
import { ProductsMenu } from './ProductsMenu';
import { SocialLinks } from './SocialLinks';
import { SearchDialog } from './SearchDialog';
import { STACK_GROUPS, WORD_LINKS, SOCIAL_LINKS } from './nav.data';
import s from './FloatingNav.module.css';

const HOVER_CLOSE_MS = 140;

export function FloatingNav() {
  const [searchOpen, setOpenSearch] = useState(false);
  const pathname = usePathname();

  const [stackOpen, setStackOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const pillRef = useRef<HTMLDivElement>(null);
  const stackTriggerRef = useRef<HTMLButtonElement>(null);
  const stackPanelRef = useRef<HTMLDivElement>(null);
  const sheetCloseRef = useRef<HTMLButtonElement>(null);
  const stackHoverTimer = useRef<number | null>(null);

  // Close every surface on route change.
  useEffect(() => {
    setStackOpen(false);
    setSheetOpen(false);
  }, [pathname]);

  // Outside-click closes the stack panel. The panel is portaled to body,
  // so hover keeps it open via .panelWrap handlers, not via containment.
  useEffect(() => {
    if (!stackOpen) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const inPill = pillRef.current?.contains(target);
      const inPanel = stackPanelRef.current?.contains(target);
      if (!inPill && !inPanel) setStackOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [stackOpen]);

  // Esc closes either surface and returns focus to the stack trigger.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setStackOpen(false);
      setSheetOpen(false);
      stackTriggerRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll while the mobile sheet is up. iOS Safari ignores
  // `overflow: hidden` on body, so pin body with `position: fixed` and
  // restore the scroll position on close.
  useEffect(() => {
    if (!sheetOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [sheetOpen]);

  // Give keyboard/AT users a starting anchor when the sheet opens.
  useEffect(() => {
    if (sheetOpen) sheetCloseRef.current?.focus();
  }, [sheetOpen]);

  const openStack = useCallback(() => {
    if (stackHoverTimer.current) window.clearTimeout(stackHoverTimer.current);
    setStackOpen(true);
  }, []);
  const scheduleCloseStack = useCallback(() => {
    if (stackHoverTimer.current) window.clearTimeout(stackHoverTimer.current);
    stackHoverTimer.current = window.setTimeout(() => setStackOpen(false), HOVER_CLOSE_MS);
  }, []);
  const toggleStack = useCallback(() => setStackOpen(v => !v), []);
  const onStackKey = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleStack();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setStackOpen(true);
    }
  }, [toggleStack]);

  return (
    <header className={s.floatingNav}>
      <div className={s.navPill} ref={pillRef}>
        <Link href="/" className={s.navIcon} aria-label="nustack home">
          <NuLogo size={18} />
        </Link>

        <span className={`${s.divider} ${s.desktopOnly}`} aria-hidden />

        <div
          className={s.productsSlot}
          onMouseEnter={openStack}
          onMouseLeave={scheduleCloseStack}
        >
          <button
            ref={stackTriggerRef}
            type="button"
            className={s.navWord}
            aria-haspopup="menu"
            aria-expanded={stackOpen}
            data-open={stackOpen ? 'true' : 'false'}
            onClick={toggleStack}
            onKeyDown={onStackKey}
          >
            Stack
            <svg className={s.caret} width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden>
              <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {stackOpen && mounted && createPortal(
            <div
              ref={stackPanelRef}
              className={s.panelWrap}
              onMouseEnter={openStack}
              onMouseLeave={scheduleCloseStack}
              role="menu"
            >
              <ProductsMenu />
            </div>,
            document.body,
          )}
        </div>

        {WORD_LINKS.map((w) => (
          <Link key={w.href} href={w.href} className={`${s.navWord} ${s.desktopOnly}`}>
            {w.label}
          </Link>
        ))}

        <span className={`${s.divider} ${s.desktopOnly}`} aria-hidden />

        {/* Desktop layout: logo | pages | socials | actions. */}
        <span className={s.desktopOnly} style={{ gap: 2 }}>
          <SocialLinks className={s.navIcon} />
        </span>

        <span className={`${s.divider} ${s.desktopOnly}`} aria-hidden />

        {/* Mobile-only word-link shortcuts + github. Ordered to mirror the
            desktop grouping: logo | pages | socials | actions. */}
        <Link href="/docs" className={`${s.navIcon} ${s.mobileOnly}`} aria-label="docs">
          <BookOpen size={18} aria-hidden />
        </Link>
        <Link href="/blog" className={`${s.navIcon} ${s.mobileOnly}`} aria-label="blog">
          <Rss size={18} aria-hidden />
        </Link>

        <a
          className={`${s.navIcon} ${s.mobileOnly}`}
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noreferrer"
          aria-label="github"
        >
          <GithubMark size={16} />
        </a>

        <button
          type="button"
          className={s.navIcon}
          onClick={() => setOpenSearch(true)}
          aria-label="search"
        >
          <Search size={18} aria-hidden />
        </button>

        <button
          type="button"
          className={`${s.navIcon} ${s.hamburger}`}
          aria-label="menu"
          aria-expanded={sheetOpen}
          onClick={() => setSheetOpen(true)}
        >
          <Menu size={18} aria-hidden />
        </button>
      </div>

      {sheetOpen && (
        <div className={s.sheet} role="dialog" aria-modal="true">
          <button
            ref={sheetCloseRef}
            type="button"
            className={s.sheetClose}
            aria-label="close menu"
            onClick={() => setSheetOpen(false)}
          >
            <CloseIcon size={18} aria-hidden />
          </button>

          {/* Top-level nav mirrors desktop: Stack (expandable) · Docs · Blog. */}
          {[
            { label: 'Stack', groups: STACK_GROUPS },
          ].map((section) => (
            <details key={section.label} className={s.sheetAccordion}>
              <summary className={s.sheetAccordionSummary}>
                <span>{section.label}</span>
              </summary>
              <div className={s.sheetAccordionBody}>
                {section.groups.map((group) => (
                  <div key={group.header} className={s.sheetSubGroup}>
                    <div className={s.sheetSubHeader}>{group.header}</div>
                    {group.items.map((item) => (
                      <Link key={item.href} href={item.href} className={s.sheetSubLink}>
                        <span>{item.name}</span>
                        <span className={s.sheetLinkDesc}>{item.desc}</span>
                      </Link>
                    ))}
                    {group.explore ? (
                      <Link href={group.explore.href} className={s.sheetSubLink}>
                        <span>
                          {group.explore.label}
                          <ArrowRight size={14} aria-hidden className={s.sheetSubExploreArrow} />
                        </span>
                      </Link>
                    ) : null}
                  </div>
                ))}
              </div>
            </details>
          ))}

          {WORD_LINKS.map((w) => (
            <Link key={w.href} href={w.href} className={s.sheetTopLink}>
              {w.label}
            </Link>
          ))}

          <div className={s.sheetIconRow}>
            <SocialLinks className={s.navIcon} />
          </div>
        </div>
      )}

      <SearchDialog open={searchOpen} onOpenChange={setOpenSearch} />
    </header>
  );
}

'use client';

/**
 * FloatingNav — the site's top nav pill.
 *
 * Desktop: logo · Products▾ · Docs · Blog · About · search · socials.
 * Mobile:  logo · search · hamburger → full-screen sheet with everything stacked.
 *
 * The Products dropdown (ProductsMenu) is portaled to <body> so its blur
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
import { ThemeToggle } from './ThemeToggle';
import { SearchDialog } from './SearchDialog';
import { PRODUCT_GROUPS, USE_CASES_GROUP, WORD_LINKS, SOCIAL_LINKS } from './nav.data';
import s from './FloatingNav.module.css';

const HOVER_CLOSE_MS = 140;

export function FloatingNav() {
  const [searchOpen, setOpenSearch] = useState(false);
  const pathname = usePathname();

  const [productsOpen, setProductsOpen] = useState(false);
  const [useCasesOpen, setUseCasesOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const pillRef = useRef<HTMLDivElement>(null);
  const productsTriggerRef = useRef<HTMLButtonElement>(null);
  const productsPanelRef = useRef<HTMLDivElement>(null);
  const useCasesTriggerRef = useRef<HTMLButtonElement>(null);
  const useCasesPanelRef = useRef<HTMLDivElement>(null);
  const sheetCloseRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | null>(null);
  const useCasesHoverTimer = useRef<number | null>(null);

  // Close both surfaces on route change.
  useEffect(() => {
    setProductsOpen(false);
    setUseCasesOpen(false);
    setSheetOpen(false);
  }, [pathname]);

  // Outside-click closes the products panel. The panel is portaled to body,
  // so hover keeps it open via .panelWrap handlers, not via containment.
  useEffect(() => {
    if (!productsOpen) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const inPill = pillRef.current?.contains(target);
      const inPanel = productsPanelRef.current?.contains(target);
      if (!inPill && !inPanel) setProductsOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [productsOpen]);

  useEffect(() => {
    if (!useCasesOpen) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const inPill = pillRef.current?.contains(target);
      const inPanel = useCasesPanelRef.current?.contains(target);
      if (!inPill && !inPanel) setUseCasesOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [useCasesOpen]);

  // Esc closes either surface and returns focus to the products trigger.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setProductsOpen(false);
      setUseCasesOpen(false);
      setSheetOpen(false);
      productsTriggerRef.current?.focus();
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

  const openProducts = useCallback(() => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    setProductsOpen(true);
    setUseCasesOpen(false);
  }, []);
  const scheduleCloseProducts = useCallback(() => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setProductsOpen(false), HOVER_CLOSE_MS);
  }, []);
  const toggleProducts = useCallback(() => setProductsOpen(v => !v), []);
  const onProductsKey = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleProducts();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setProductsOpen(true);
    }
  }, [toggleProducts]);

  const openUseCases = useCallback(() => {
    if (useCasesHoverTimer.current) window.clearTimeout(useCasesHoverTimer.current);
    setUseCasesOpen(true);
    setProductsOpen(false);
  }, []);
  const scheduleCloseUseCases = useCallback(() => {
    if (useCasesHoverTimer.current) window.clearTimeout(useCasesHoverTimer.current);
    useCasesHoverTimer.current = window.setTimeout(() => setUseCasesOpen(false), HOVER_CLOSE_MS);
  }, []);
  const toggleUseCases = useCallback(() => setUseCasesOpen(v => !v), []);
  const onUseCasesKey = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleUseCases();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setUseCasesOpen(true);
    }
  }, [toggleUseCases]);

  return (
    <header className={s.floatingNav}>
      <div className={s.navPill} ref={pillRef}>
        <Link href="/" className={s.navIcon} aria-label="nustack home">
          <NuLogo size={18} />
        </Link>

        <span className={`${s.divider} ${s.desktopOnly}`} aria-hidden />

        <div
          className={s.productsSlot}
          onMouseEnter={openProducts}
          onMouseLeave={scheduleCloseProducts}
        >
          <button
            ref={productsTriggerRef}
            type="button"
            className={s.navWord}
            aria-haspopup="menu"
            aria-expanded={productsOpen}
            data-open={productsOpen ? 'true' : 'false'}
            onClick={toggleProducts}
            onKeyDown={onProductsKey}
          >
            Stack
            <svg className={s.caret} width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden>
              <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {productsOpen && mounted && createPortal(
            <div
              ref={productsPanelRef}
              className={s.panelWrap}
              onMouseEnter={openProducts}
              onMouseLeave={scheduleCloseProducts}
              role="menu"
            >
              <ProductsMenu />
            </div>,
            document.body,
          )}
        </div>

        {/* Use cases — hidden until per-case pages ship. Re-enable by uncommenting. */}
        {/*
        <div
          className={s.productsSlot}
          onMouseEnter={openUseCases}
          onMouseLeave={scheduleCloseUseCases}
        >
          <button
            ref={useCasesTriggerRef}
            type="button"
            className={s.navWord}
            aria-haspopup="menu"
            aria-expanded={useCasesOpen}
            data-open={useCasesOpen ? 'true' : 'false'}
            onClick={toggleUseCases}
            onKeyDown={onUseCasesKey}
          >
            Use cases
            <svg className={s.caret} width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden>
              <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {useCasesOpen && mounted && createPortal(
            <div
              ref={useCasesPanelRef}
              className={s.panelWrap}
              onMouseEnter={openUseCases}
              onMouseLeave={scheduleCloseUseCases}
              role="menu"
            >
              <ProductsMenu groups={[USE_CASES_GROUP]} />
            </div>,
            document.body,
          )}
        </div>
        */}

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

        <ThemeToggle className={`${s.navIcon} ${s.desktopOnly}`} />

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

          {/* Top-level nav mirrors desktop: Stack + Use cases (each expandable)
              · Docs · Blog · About. */}
          {[
            { label: 'Stack', groups: PRODUCT_GROUPS },
            // { label: 'Use cases', groups: [USE_CASES_GROUP] }, // hidden until per-case pages ship
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

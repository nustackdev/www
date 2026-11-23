'use client';

/**
 * PlainNav — the site's top nav, kept to the essentials: a flat full width
 * bar, the logo, Docs and Blog on the left, the two asks (star on GitHub,
 * follow on X) on the right, all on the main column. Phones drop the wordmark
 * and shorten the asks to "Star" and "Follow".
 *
 * FloatingNav (Stack dropdown, search, full-screen mobile sheet) stays for
 * when the site grows back into it.
 */

import type { MouseEvent } from 'react';
import { SiteLink as Link } from './SiteLink';
import { NuLogo } from '../marks/NuLogo';
import { GithubMark } from '../marks/GithubMark';
import { XMark } from '../marks/XMark';
import { SOCIAL_LINKS } from '../../lib/social';
import s from './PlainNav.module.css';

/** On the home page the logo goes back to the top, and drops any #section from the url. */
function toTop(e: MouseEvent<HTMLAnchorElement>) {
  if (window.location.pathname !== '/' || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  history.replaceState(null, '', '/');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function PlainNav() {
  return (
    <header className={s.root}>
      <nav className={s.bar} aria-label="Main">
        <div className={s.group}>
          <Link href="/" className={s.logo} aria-label="nustack home" onClick={toTop}>
            <NuLogo size={18} />
            <span className={s.wordmark}>nustack</span>
          </Link>
          <Link href="/docs" className={s.word}>
            Docs
          </Link>
          <Link href="/blog" className={s.word}>
            Blog
          </Link>
        </div>
        <div className={s.group}>
          <a className={s.ask} href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">
            <GithubMark size={15} />
            <span className={s.full}>Star on GitHub</span>
            <span className={s.short}>Star</span>
          </a>
          <a className={s.ask} href={SOCIAL_LINKS.x} target="_blank" rel="noreferrer">
            <XMark size={13} />
            <span className={s.full}>Follow on X</span>
            <span className={s.short}>Follow</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

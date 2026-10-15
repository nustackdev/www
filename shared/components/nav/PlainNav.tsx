/**
 * PlainNav — the site's top nav, kept to the essentials: one floating island
 * with the logo, Docs, Blog, then the two asks (star on GitHub, follow on X).
 * Same on desktop and phones; phones shorten the asks to "Star" and "Follow".
 *
 * FloatingNav (Stack dropdown, search, full-screen mobile sheet) stays for
 * when the site grows back into it.
 */

import { SiteLink as Link } from './SiteLink';
import { NuLogo } from '../marks/NuLogo';
import { GithubMark } from '../marks/GithubMark';
import { XMark } from '../marks/XMark';
import { SOCIAL_LINKS } from '../../lib/social';
import s from './PlainNav.module.css';

export function PlainNav() {
  return (
    <header className={s.root}>
      <nav className={s.pill} aria-label="Main">
        <Link href="/" className={s.logo} aria-label="nustack home">
          <NuLogo size={18} />
        </Link>
        <Link href="/docs" className={s.word}>
          Docs
        </Link>
        <Link href="/blog" className={s.word}>
          Blog
        </Link>
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
      </nav>
    </header>
  );
}

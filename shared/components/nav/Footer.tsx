import { SiteLink as Link } from './SiteLink';
import { ArrowUpRight } from 'lucide-react';
import { NuLogo } from '../marks/NuLogo';
import { NustackMark } from '../marks/NustackMark';
import { SocialLinks } from './SocialLinks';
import { ThemeToggle } from './ThemeToggle';
import { STACK_GROUPS } from './nav.data';
import s from './Footer.module.css';

/**
 * Site footer — rich sitemap.
 *
 * The brand column is the nustack title: wordmark and Learn links. Next to
 * it, the stack products in paired columns, each a name (link) with a
 * one-line description under it. Transparent surface; sits on --site-bg
 * from PageShell.
 */

const LEARN_LINKS = [
  { label: 'Docs', href: '/docs' },
  { label: 'Blog', href: '/blog' },
  { label: 'Changelog', href: 'https://github.com/nustackdev/nuspace/blob/main/CHANGELOG.md' },
];

export function Footer() {
  return (
    <footer className={s.footer} data-pagefind-ignore>
      <div className={s.inner}>
        <div className={s.top}>
          {/* Brand column */}
          <div className={s.brandCol}>
            <div className={s.brandBlock}>
              <span className={s.brand}>
                <NuLogo size={22} className={s.brandLogo} />
                <NustackMark mono className={s.brandMark} />
              </span>
            </div>
            <ul className={s.learnList}>
              {LEARN_LINKS.map((l) => {
                const external = l.href.startsWith('http');
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={s.learnLink}
                      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      {l.label}
                      {external && <ArrowUpRight size={11} aria-hidden className={s.learnLinkExternal} />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sitemap: the stack products, one pair per column */}
          <div className={s.sitemap}>
            {STACK_GROUPS[0].rows.map((row) => (
              <ul key={row[0].href} className={s.items}>
                {row.map((item) => (
                  <li key={item.href} className={s.item}>
                    <Link href={item.href} className={s.itemLink}>
                      <span className={s.itemName}>{item.name}</span>
                      <span className={s.itemDesc}>
                        {item.role ? `${item.role}. ${item.desc}` : item.desc}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className={s.bottom}>
          <span className={s.copyright}>© 2026 nustack</span>
          <div className={s.socials}>
            <SocialLinks className={s.socialIcon} />
            <a href="/blog/rss.xml" className={s.socialIcon} aria-label="rss">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 4a16 16 0 0 1 16 16M4 11a9 9 0 0 1 9 9M6 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <ThemeToggle className={s.socialIcon} />
          </div>
        </div>
      </div>
    </footer>
  );
}

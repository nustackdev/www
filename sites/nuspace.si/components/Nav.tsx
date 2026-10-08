import Link from 'next/link';
import { NuLogo } from '@www/shared/components/marks/NuLogo';
import { SocialLinks } from '@www/shared/components/nav/SocialLinks';
import { ThemeToggle } from '@www/shared/components/nav/ThemeToggle';
import { nustackUrl } from '@/lib/shared';
import s from './Nav.module.css';

/** Top nav pill: wordmark, a link back to Nu, socials, theme. */
export function Nav() {
  return (
    <header className={s.nav}>
      <div className={s.pill}>
        <Link href="/" className={s.brand} aria-label="nuspace home">
          <NuLogo size={18} />
          <span>nuspace</span>
        </Link>
        <span className={s.divider} aria-hidden />
        <a href={nustackUrl} className={s.word}>Nu</a>
        <span className={s.divider} aria-hidden />
        <span className={s.socials}>
          <SocialLinks className={s.icon} />
        </span>
        <ThemeToggle className={s.icon} />
      </div>
    </header>
  );
}

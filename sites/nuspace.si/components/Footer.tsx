import { NuLogo } from '@www/shared/components/marks/NuLogo';
import { SocialLinks } from '@www/shared/components/nav/SocialLinks';
import { nustackUrl, repoUrl } from '@/lib/shared';
import s from './Footer.module.css';

const LINKS = [
  { label: 'GitHub', href: repoUrl },
  { label: 'Built on Nu', href: nustackUrl },
  { label: 'License', href: `${repoUrl}/blob/main/LICENSE.md` },
];

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.brand}>
          <NuLogo size={20} />
          <span>nuspace</span>
        </div>
        <ul className={s.links}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={s.link}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className={s.bottom}>
          <span>© 2026 nustack</span>
          <div className={s.socials}>
            <SocialLinks className={s.icon} />
          </div>
        </div>
      </div>
    </footer>
  );
}

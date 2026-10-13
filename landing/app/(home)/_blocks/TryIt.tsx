import type { ReactNode } from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { DiscordMark } from '@www/shared/components/marks/DiscordMark';
import { XMark } from '@www/shared/components/marks/XMark';
import { SOCIAL_LINKS } from '@www/shared/lib/social';
import { Install } from './Install';
import { Intro } from './Intro';
import g from './group.module.css';
import s from './TryIt.module.css';

interface Link {
  icon: ReactNode;
  title: string;
  line: string;
  href: string;
}

const LINKS: Link[] = [
  {
    icon: <GithubMark size={16} />,
    title: 'Star on GitHub',
    line: 'Source, issues and releases.',
    href: 'https://github.com/nustackdev/nuspace',
  },
  {
    icon: <DiscordMark size={16} />,
    title: 'Join Discord',
    line: 'Talk to the team, share what you build.',
    href: SOCIAL_LINKS.discord,
  },
  {
    icon: <XMark size={14} />,
    title: 'Follow on X',
    line: 'Ship notes and small demos.',
    href: SOCIAL_LINKS.x,
  },
  {
    icon: <BookOpen size={16} strokeWidth={2} />,
    title: 'Read the docs',
    line: 'Guides and the full reference.',
    href: '/docs',
  },
];

/** TryIt — every CTA on the page lands here: install, run, then the community. */
export function TryIt() {
  return (
    <section id="start" className={`${g.root} ${s.root}`}>
      <Intro kicker="Get started" title="Start your space.">
        One install, on your machine.
      </Intro>

      <Install />

      <div className={s.community}>
        <h3 className={s.subhead}>
          Built in the open.{' '}
          <span className={s.dim}>Star it, join the room, follow what ships next.</span>
        </h3>
        <ul className={s.grid}>
          {LINKS.map((l) => {
            const external = l.href.startsWith('http');
            return (
              <li key={l.title}>
                <a
                  href={l.href}
                  className={s.cell}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <span className={s.head}>
                    <span className={s.icon} aria-hidden>{l.icon}</span>
                    <span className={s.title}>{l.title}</span>
                    <ArrowUpRight className={s.arrow} size={15} strokeWidth={2} aria-hidden />
                  </span>
                  <span className={s.line}>{l.line}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

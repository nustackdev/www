import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { DiscordMark } from '@www/shared/components/marks/DiscordMark';
import { XMark } from '@www/shared/components/marks/XMark';
import { Section } from '@www/shared/components/page';
import { SOCIAL_LINKS } from '@www/shared/lib/social';
import s from './Closing.module.css';

interface Channel {
  icon: ReactNode;
  name: string;
  line: string;
  action: string;
  href: string;
}

const CHANNELS: Channel[] = [
  {
    icon: <GithubMark size={18} />,
    name: 'GitHub',
    line: 'Source, issues and releases. A star helps others find it.',
    action: 'Star the repo',
    href: SOCIAL_LINKS.github,
  },
  {
    icon: <DiscordMark size={18} />,
    name: 'Discord',
    line: 'Ask questions, share what you build, shape what comes next.',
    action: 'Join the server',
    href: SOCIAL_LINKS.discord,
  },
  {
    icon: <XMark size={16} />,
    name: 'X',
    line: 'Release notes, small demos and work in progress.',
    action: 'Follow @nustackdev',
    href: SOCIAL_LINKS.x,
  },
];

/** Closing — the page's last section: the community, three channels as cards. */
export function Closing() {
  return (
    <Section
      id="community"
      eyebrow="Community"
      tagline="Built in the open."
      description="Come build it with us."
    >
      <ul className={s.grid}>
        {CHANNELS.map((c) => {
          const external = c.href.startsWith('http');
          return (
            <li key={c.name}>
              <a className={s.card} href={c.href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                <span className={s.top}>
                  <span className={s.icon}>{c.icon}</span>
                  <span className={s.name}>{c.name}</span>
                  <ArrowUpRight className={s.arrow} size={16} strokeWidth={2} aria-hidden />
                </span>
                <span className={s.line}>{c.line}</span>
                <span className={s.action}>{c.action}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

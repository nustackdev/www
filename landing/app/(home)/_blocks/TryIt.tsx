import { BookOpen } from 'lucide-react';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { DiscordMark } from '@www/shared/components/marks/DiscordMark';
import { XMark } from '@www/shared/components/marks/XMark';
import { Section } from '@www/shared/components/page';
import { FeatureGrid, type Feature } from '@www/shared/components/layout/FeatureGrid';
import { SOCIAL_LINKS } from '@www/shared/lib/social';
import { Fan } from './Fan';
import { Install } from './Install';
import s from './TryIt.module.css';

const LINKS: Feature[] = [
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
  { icon: <XMark size={14} />, title: 'Follow on X', line: 'Ship notes and small demos.', href: SOCIAL_LINKS.x },
  { icon: <BookOpen />, title: 'Read the docs', line: 'Guides and the full reference.', href: '/docs' },
];

/** TryIt — every CTA on the page lands here: the install rising under a fan
 *  of screens, then the community. */
export function TryIt() {
  return (
    <Section
      id="start"
      eyebrow="Get started"
      tagline="Three steps to your space."
      lead="Hand it to your agent: it installs nuspace and builds your first thing from one prompt."
    >
      <Fan>
        <Install />
      </Fan>

      <div className={s.community}>
        <h3 className={s.subhead}>
          Built in the open. <span className={s.dim}>Star it, join the room, follow what ships next.</span>
        </h3>
        <FeatureGrid items={LINKS} icon="plain" />
      </div>
    </Section>
  );
}

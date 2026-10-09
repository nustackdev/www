import { Star } from 'lucide-react';
import { Chapter, Section, SectionHead } from '@/components/page';
import { LinkCard } from '@www/shared/components/controls/LinkCard';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { DiscordMark } from '@www/shared/components/marks/DiscordMark';
import { XMark } from '@www/shared/components/marks/XMark';
import s from './LikeThisBlock.module.css';

/**
 * LikeThisBlock — closing community CTA used on the landing and at the end
 * of every fabric page. Zero props so copy stays in one place.
 */
export function LikeThisBlock() {
  return (
    <Chapter>
      <SectionHead
        title="Like what you see?"
        lede={
          <>
            The project is young. Star it, join the room, watch what we ship
            next.
          </>
        }
      />
      <Section>
        <div className={s.grid}>
          <LinkCard
            href="https://github.com/nustackdev/nu"
            icon={<Star size={14} />}
            title="Star on GitHub"
          >
            nustackdev/nu
          </LinkCard>
          <LinkCard
            href="https://discord.gg/tCa8YE7XVr"
            icon={<DiscordMark size={14} />}
            title="Join Discord"
          >
            Talk to the team, share what you build.
          </LinkCard>
          <LinkCard
            href="https://twitter.com/nustackdev"
            icon={<XMark size={13} />}
            title="Follow updates"
          >
            Ship notes and small demos on X.
          </LinkCard>
        </div>
      </Section>
    </Chapter>
  );
}

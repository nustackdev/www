import { GithubMark } from '../marks/GithubMark';
import { XMark } from '../marks/XMark';
import { DiscordMark } from '../marks/DiscordMark';
import { SOCIAL_LINKS } from '../../lib/social';

type Props = { className: string };

export function SocialLinks({ className }: Props) {
  return (
    <>
      <a className={className} href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" aria-label="github">
        <GithubMark size={16} />
      </a>
      <a className={className} href={SOCIAL_LINKS.x} target="_blank" rel="noreferrer" aria-label="x">
        <XMark size={14} />
      </a>
      <a className={className} href={SOCIAL_LINKS.discord} target="_blank" rel="noreferrer" aria-label="discord">
        <DiscordMark size={16} />
      </a>
    </>
  );
}

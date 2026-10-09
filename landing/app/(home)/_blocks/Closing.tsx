import { Chapter } from '@/components/page';
import { Button } from '@www/shared/components/controls/Button';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { DiscordMark } from '@www/shared/components/marks/DiscordMark';
import { XMark } from '@www/shared/components/marks/XMark';
import s from './Closing.module.css';

/** Closing — the vision line as a final CTA band. */
export function Closing() {
  return (
    <Chapter className={s.root}>
      <div className={s.inner}>
        <h2 className={s.title}>SI needs IB.</h2>
        <p className={s.sub}>
          Superintelligence won&apos;t run on summaries. It needs an information
          base. We&apos;re building it.
        </p>
        <div className={s.buttons}>
          <Button variant="solid" href="#start">
            <span>Get started</span>
          </Button>
          <Button variant="solidAlt" href="https://github.com/nustackdev/nuspace">
            <GithubMark size={14} />
            <span>Star on GitHub</span>
          </Button>
          <Button href="https://discord.gg/tCa8YE7XVr">
            <DiscordMark size={14} />
            <span>Discord</span>
          </Button>
          <Button href="https://twitter.com/nustackdev">
            <XMark size={13} />
            <span>Follow</span>
          </Button>
        </div>
      </div>
    </Chapter>
  );
}

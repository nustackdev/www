import { CommandLine } from '@www/shared/components/media/CommandLine';
import { Button } from '@www/shared/components/controls/Button';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { DiscordMark } from '@www/shared/components/marks/DiscordMark';
import { Intro } from './Intro';
import g from './group.module.css';
import s from './TryIt.module.css';

/** TryIt — every CTA on the page lands here. */
export function TryIt() {
  return (
    <section id="start" className={`${g.root} ${s.root}`}>
      <Intro kicker="Start" title="Start a space.">
        A space is a directory on your machine.
      </Intro>

      <div className={s.body}>
        <ol className={s.steps}>
          <li className={s.step}>
            <span className={s.num}>1. Install</span>
            <CommandLine command="pip install nuspace" />
          </li>
          <li className={s.step}>
            <span className={s.num}>2. Serve</span>
            <CommandLine command="nuspace serve my.nuspace" />
          </li>
          <li className={s.step}>
            <span className={s.num}>3. Build</span>
            <p className={s.note}>
              Open 127.0.0.1:8080. Press <code>/</code> on a plane to add a cell,
              or point an agent at it.
            </p>
          </li>
        </ol>

        <div className={s.buttons}>
          <Button variant="solidAlt" href="https://github.com/nustackdev/nuspace">
            <GithubMark size={14} />
            <span>Star on GitHub</span>
          </Button>
          <Button href="https://discord.gg/tCa8YE7XVr">
            <DiscordMark size={14} />
            <span>Discord</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

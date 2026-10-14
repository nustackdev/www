import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { Button } from '@www/shared/components/controls/Button';
import { Scene } from '../scene/Scene';
import s from './Hero.module.css';

/**
 * Hero — left aligned head, then the hero scene bleeding past the main
 * column to the right, cut by the window. Copy from identity.md in Go.
 */
export function Hero() {
  return (
    <section className={s.root}>
      <div className={s.head}>
        <h1 className={s.title}>
          Build your computational space
          <br />
          <span className={s.dim}>for everything you work with: notes, data, tools, agents.</span>
        </h1>

        <div className={s.row}>
          <p className={s.sub}>
            Elsewhere, a note is a dead document, data is scattered, tools are
            siloed and an agent&apos;s work is lost in chat. In nuspace,
            they&apos;re all connected cells: living programs that hold data,
            logic and look in one form.
          </p>
          <div className={s.actions}>
            <Button variant="primary" href="#start" arrow>
              Get started
            </Button>
            <Button variant="secondary" href="https://github.com/nustackdev/nuspace">
              <GithubMark size={16} />
              GitHub
            </Button>
          </div>
        </div>
      </div>

      <Scene name="hero" />
    </section>
  );
}

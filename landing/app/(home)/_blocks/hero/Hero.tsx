import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { Button } from '@www/shared/components/controls/Button';
import { Scene } from '../scene/Scene';
import s from './Hero.module.css';

/**
 * Hero — left aligned head, then the hero scene bleeding past the main
 * column to the right, cut by the window. Copy from compass: category,
 * positioning, lines.
 */
export function Hero() {
  return (
    <section className={s.root}>
      <div className={s.head}>
        <p className={s.eyebrow}>
          <span className={s.dot} aria-hidden />
          <span>nuspace</span>
          <span className={s.meta}>An interaction OS that runs Nu programs</span>
        </p>

        <h1 className={s.title}>
          Data, logic and UI,
          <br />
          <span className={s.dim}>connected by default.</span>
        </h1>

        <div className={s.row}>
          <p className={s.sub}>
            A computing space for data-centric apps. It runs on your machine,
            and you and your agents build in it.
          </p>
          <div className={s.actions}>
            <Button variant="solid" href="#start">
              <span>Get started</span>
            </Button>
            <Button variant="solidAlt" href="https://github.com/nustackdev/nuspace">
              <GithubMark size={14} />
              <span>GitHub</span>
            </Button>
          </div>
        </div>
      </div>

      <Scene name="hero" ratio="16 / 10" className={s.scene} />
    </section>
  );
}

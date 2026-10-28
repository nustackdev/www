import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { Button } from '@www/shared/components/controls/Button';
import { Kicker } from '@www/shared/components/text/Kicker';
import { Gallery } from './Gallery';
import s from './Hero.module.css';

/**
 * Hero — left aligned head, then the demo gallery: a deck of demo cards
 * over the picked demo playing big. Copy from identity.md in Go.
 */
export function Hero() {
  return (
    <section className={s.root}>
      <div className={s.head}>
        <div className={s.titleBlock}>
          <Kicker tone="accent">Open-source · Self-hosted · Pure Python</Kicker>
          <h1 className={s.title}>
            Computational space
            <br />
            for your data and tools.
            <br />
            <span className={s.dim}>Human-first. Agent-native.</span>
          </h1>
        </div>

        <div className={s.row}>
          <p className={s.sub}>
            Everything in nuspace is made of cells: tiny reactive programs that
            hold data, run logic and render UI. From a reading list to a server
            dashboard, it&apos;s all cells. Cells are written in nu, a Python
            programming model with no glue code between layers, so a cell is a
            few lines, not a thousand. Humans get the space as UI, agents get it
            as code.
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

      <Gallery />
    </section>
  );
}

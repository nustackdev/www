import { Button } from '@www/shared/components/controls/Button';
import { Command } from '@www/shared/components/controls/Command';
import { Kicker } from '@www/shared/components/text/Kicker';
import { START_LINE } from '../start.data';
import { Gallery } from './Gallery';
import s from './Hero.module.css';

/**
 * Hero: left aligned head, two ways in (the line, or your agent), then the
 * demo gallery: a deck of demo cards over the picked demo playing big.
 * Copy from identity.md, the ways in from growth/website/funnel.md in Go.
 */
export function Hero() {
  return (
    <section className={s.root}>
      <div className={s.head}>
        <div className={s.intro}>
          <div className={s.titleBlock}>
            <Kicker tone="accent">Open-source · Self-hosted · Pure Python</Kicker>
            <h1 className={s.title}>
              Computational space
              <br />
              for your data and tools.
              <br />
              <span className={s.dim}>
                <span className={s.phrase}>Human-first.</span> <span className={s.phrase}>Agent-native.</span>
              </span>
            </h1>
          </div>

          <p className={s.sub}>
            In nuspace, your data and tools live in cells: tiny reactive programs
            that manage data, run logic and render UI. Cells are written in nu, a
            Python programming model with no glue code between layers, so a cell
            is a few lines, not a thousand. Humans get the space as UI, agents get it
            as code.
          </p>
        </div>

        <div className={s.start}>
          <p className={s.startTitle}>Start in one line</p>
          <Command lines={[START_LINE]} what="install command" size="xl" className={s.install} />
          {/* #start-agent: Install picks its agent tab and scrolls to #start. */}
          <Button variant="secondary" size="xl" href="#start-agent" arrow className={s.agent}>
            Or start with your agent
          </Button>
        </div>
      </div>

      <Gallery />
    </section>
  );
}

import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { Button } from '@www/shared/components/controls/Button';
import { Command } from '@www/shared/components/controls/Command';
import { Kicker } from '@www/shared/components/text/Kicker';
import { START_LINE } from '../start.data';
import { Gallery } from './Gallery';
import s from './Hero.module.css';

/**
 * Hero: left aligned head, the one line to start with its CTAs, then the
 * demo gallery: a deck of demo cards over the picked demo playing big.
 * Copy from identity.md, the start row from growth/website/funnel.md in Go.
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

        <p className={s.sub}>
          In nuspace, your data and tools live in cells: tiny reactive programs
          that manage data, run logic and render UI. From a reading list to a server
          dashboard, it&apos;s all cells. Cells are written in nu, a Python
          programming model with no glue code between layers, so a cell is a
          few lines, not a thousand. Humans get the space as UI, agents get it
          as code.
        </p>

        <div className={s.start}>
          <div className={s.actions}>
            <Command lines={[START_LINE]} what="install command" size="lg" className={s.line} />
            <Button variant="primary" href="#start" arrow>
              Get started
            </Button>
            <Button variant="ghost" href="https://github.com/nustackdev/nuspace">
              <GithubMark size={16} />
              GitHub
            </Button>
          </div>
          {/* #start-agent: Install picks its agent tab and scrolls to #start. */}
          <p className={s.hint}>
            Using Claude Code or Codex? <a href="#start-agent">Let your agent set it up.</a>
          </p>
        </div>
      </div>

      <Gallery />
    </section>
  );
}

import { ArrowUpRight } from 'lucide-react';
import { Button } from '@www/shared/components/controls/Button';
import { Command } from '@www/shared/components/controls/Command';
import { Marquee } from '@www/shared/components/media/Marquee';
import { Kicker } from '@www/shared/components/text/Kicker';
import { START_LINE } from '../start.data';
import { Wall } from './Wall';
import s from './Hero.module.css';

/** What the space composes into, the drifting row. Draft. */
const WORDS = ['workflows', 'second brain', 'ops', 'AI systems', 'software factory'];

/**
 * Hero: the head on the left, the ways in stacked under it (the line, then
 * your agent), over the wall: the gallery drifting behind the whole hero as
 * its background, faded out under the copy. Phones get it as a band below. The hero names the space, the
 * gallery teaches it. Copy from compass/nuspace/iter-3-wip.md, the ways in
 * from growth/website/funnel.md in Go.
 */
export function Hero() {
  return (
    <section className={s.root}>
      <div className={s.head}>
        <div className={s.intro}>
          <div className={s.titleBlock}>
            <Kicker tone="accent">Open-source · Self-hosted · Pure Python</Kicker>
            <h1 className={s.title}>
              Your computational space.
              <br />
              <span className={s.dim}>
                <span className={s.phrase}>Human-first.</span> <span className={s.phrase}>Agent-native.</span>
              </span>
            </h1>
          </div>

          <div className={s.sub}>
            <p className={s.subLine}>
              A society of tiny interconnected programs that hold data, run logic and render UI.
            </p>
            <p className={s.subLine}>Together, they compose into your:</p>
            {/* The options drift by in a row of their own, so no swap ever moves the copy. */}
            <Marquee
              items={WORDS.map((w) => (
                <span key={w} className={s.opt}>
                  {w}
                </span>
              ))}
              speed={28}
              gap="0px"
              className={s.opts}
            />
            <p className={s.subLine}>Humans get the space as UI, agents get it as code.</p>
          </div>
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

      <Wall className={s.wall} />
      <span className={s.shade} aria-hidden />
      <span className={s.hint} aria-hidden>
        <span className={s.click}>Click any space</span>
        <span className={s.tap}>Tap any space</span>
        <ArrowUpRight />
      </span>
    </section>
  );
}

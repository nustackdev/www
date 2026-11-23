import { ArrowUpRight } from 'lucide-react';
import { Button } from '@www/shared/components/controls/Button';
import { Command } from '@www/shared/components/controls/Command';
import { Kicker } from '@www/shared/components/text/Kicker';
import { cn } from '@www/shared/lib/cn';
import { START_LINE } from '../start.data';
import { Rotator } from './Rotator';
import { Wall } from './Wall';
import s from './Hero.module.css';

/** What the space composes into, the rotating word. Draft. */
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

          <p className={s.sub}>
            <span className={s.subLine}>
              A society of tiny interconnected programs that hold data, run logic and render UI.
            </span>
            <span className={cn(s.subLine, s.subRot)}>
              Together, they compose into your <Rotator words={WORDS} />.
            </span>
            <span className={cn(s.subLine, s.subInk)}>Humans get the space as UI, agents get it as code.</span>
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

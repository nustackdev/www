import { Button } from '@www/shared/components/controls/Button';
import { Intro } from './Intro';
import { Unit } from './Unit';
import { Stats, type Stat } from './Stats';
import g from './group.module.css';

/** The agents case study, as numbers. Placeholders until real ones land. */
const PROOF: Stat[] = [
  { value: '00', label: 'stat to come' },
  { value: '00', label: 'stat to come' },
  { value: '00', label: 'stat to come' },
  { value: '00', label: 'stat to come' },
];

/** Agents — they leave behind running systems. The town and zoo case study. */
export function Agents() {
  return (
    <section className={g.root}>
      <Intro kicker="Agents" title="Other agents return answers.">
        In nuspace, agents leave behind running systems.
      </Intro>
      <Unit
        kicker="The town and the zoo"
        title="8 agents. One space."
        description="An agent writes Nu, same as you: the data, the logic over it and a UI to inspect it. Next time it comes back to the same system, not a blank chat."
        scene="agents"
      >
        <Stats items={PROOF} />
        <div>
          <Button variant="outline" href="/spaces">
            <span>Read the case study</span>
          </Button>
        </div>
      </Unit>
    </section>
  );
}

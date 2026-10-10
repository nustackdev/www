import { Intro } from './Intro';
import { Unit } from './Unit';
import g from './group.module.css';

interface Space {
  scene: string;
  /** Use case, as a hint. */
  hint: string;
  /** The one benefit this unit shows. */
  title: string;
  body: string;
}

/** One real app per unit, one benefit each. See landing/structure.md. */
const SPACES: Space[] = [
  {
    scene: 'kb',
    hint: 'Knowledge bases',
    title: 'Any data, with its own views.',
    body: 'Notes, tables, files and feeds in one store. Each draws the view it needs.',
  },
  {
    scene: 'trading',
    hint: 'Trading and finance',
    title: 'Live. It reacts as data changes.',
    body: 'Prices stream in, the analysis recomputes, the dashboard follows. No refresh, no polling code.',
  },
  {
    scene: 'research',
    hint: 'Research',
    title: 'Relations computed, not just linked.',
    body: 'A claim scores itself from its sources. Change a source and every score that depends on it moves.',
  },
  {
    scene: 'metrics',
    hint: 'ML tracking',
    title: 'Billions of entries, still live.',
    body: 'Runs and metrics stream into nulog. Compare them while they train.',
  },
  {
    scene: 'tool',
    hint: 'Internal tools',
    title: "Change anything. It's all Nu.",
    body: 'The space itself is a Nu program. You, your scripts and your agents can reshape any part of it.',
  },
];

/** Spaces — what nuspace enables, shown on real apps. */
export function Spaces() {
  return (
    <section className={g.root}>
      <Intro kicker="Spaces" title="Built in nuspace.">
        Data-centric apps, where everything is connected.
      </Intro>
      {SPACES.map((sp, i) => (
        <Unit
          key={sp.scene}
          kicker={sp.hint}
          title={sp.title}
          description={sp.body}
          scene={sp.scene}
        />
      ))}
    </section>
  );
}

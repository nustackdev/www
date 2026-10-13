import { Intro } from './Intro';
import { Unit } from './Unit';
import g from './group.module.css';
import s from './Spaces.module.css';

interface Space {
  scene: string;
  /** Space name, as the kicker. */
  name: string;
  title: string;
  body: string;
  highlights: string[];
}

/** One real space per unit. Copy from identity.md in Go; tapes come later. */
const SPACES: Space[] = [
  {
    scene: 'movies',
    name: 'Movies',
    title: 'Your personal movie tracker.',
    body: 'A film base you run yourself. Films, people and timelines, all linked, all live.',
    highlights: [
      'Rate a film, every page follows',
      'A page per film, director and actor',
      'Add a film, its pages build themselves',
    ],
  },
  {
    scene: 'agents',
    name: 'Agent orchestration',
    title: 'A team of agents, run from one space.',
    body: 'Start, watch and steer Claude Code sessions, then chain them into flows.',
    highlights: [
      'A live transcript per agent',
      'Fan-out with a judge in a few lines',
      'Stop, resume, steer mid-task',
    ],
  },
  {
    scene: 'memes',
    name: 'Meme explorer',
    title: 'A blockchain, read live.',
    body: 'Every launch and trade on the meme market, streamed into pages that redraw as they land.',
    highlights: [
      'Launches and trades as they happen',
      'A live page per coin',
      'Millions of entries, still live',
    ],
  },
  {
    scene: 'training',
    name: 'ML training',
    title: 'Train a model. Steer it mid-run.',
    body: 'Launch runs, watch them learn and change course while they train.',
    highlights: [
      'Drag the learning rate mid-run',
      'Compare every run side by side',
      'Draw a digit, every checkpoint reads it',
    ],
  },
];

/** Spaces — what nuspace enables, shown on real spaces. */
export function Spaces() {
  return (
    <section className={g.root}>
      <Intro kicker="Spaces" title="Built in nuspace.">
        Real spaces, made of connected cells.
      </Intro>
      {SPACES.map((sp) => (
        <Unit
          key={sp.scene}
          kicker={sp.name}
          title={sp.title}
          description={sp.body}
          scene={sp.scene}
          lead={
            <ul className={s.highlights}>
              {sp.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          }
        />
      ))}
    </section>
  );
}

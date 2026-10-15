import { Section, Subsection } from '@www/shared/components/page';
import { Scene } from './scene/Scene';
import type { SceneName } from './scene/scenes';

interface Space {
  scene: SceneName;
  /** Space name, as the kicker. */
  name: string;
  title: string;
  body: string;
}

/** One real space per unit. Copy from identity.md in Go. */
const SPACES: Space[] = [
  {
    scene: 'movies',
    name: 'Movies',
    title: 'Your personal movie tracker.',
    body: 'A film base you run yourself. Films, people and timelines, all linked, all live.',
  },
  {
    scene: 'agents',
    name: 'Agent orchestration',
    title: 'A team of agents, run from one space.',
    body: 'Start, watch and steer Claude Code sessions, then chain them into flows.',
  },
  {
    scene: 'memes',
    name: 'Meme explorer',
    title: 'A blockchain, read live.',
    body: 'Every launch and trade on the meme market, streamed into pages that redraw as they land.',
  },
  {
    scene: 'training',
    name: 'ML training',
    title: 'Train a model. Steer it mid-run.',
    body: 'Launch runs, watch them learn and change course while they train.',
  },
];

/** Spaces — what nuspace enables, shown on real spaces. */
export function Spaces() {
  return (
    <Section
      id="spaces"
      eyebrow="Spaces"
      tagline="Built in nuspace."
      description="Real spaces, made of connected cells."
      layout="subsections"
    >
      {SPACES.map((sp) => (
        <Subsection
          key={sp.scene}
          id={sp.scene}
          eyebrow={sp.name}
          tagline={sp.title}
          description={sp.body}
          media={<Scene name={sp.scene} chapters />}
        />
      ))}
    </Section>
  );
}

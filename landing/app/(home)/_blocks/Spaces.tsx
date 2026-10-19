import { Section, Subsection } from '@www/shared/components/page';
import { DemoVideo } from '@www/shared/components/media/demo/DemoVideo';

interface Space {
  /** The demo's folder name, `/demos/<scene>`. */
  scene: 'movies' | 'agents' | 'memes' | 'training';
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
    body: 'Brief and steer Claude Code sessions, chain them into flows, build your own tools around them.',
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
    title: 'Train models in your own ML lab.',
    body: 'Launch runs, watch them learn, use their models and build your own tools around them.',
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
          media={<DemoVideo src={`/demos/${sp.scene}`} bleed />}
        />
      ))}
    </Section>
  );
}

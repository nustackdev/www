/** The hero gallery: real demos first (they can take the stage), then the ones still to shoot. Copy from compass/nuspace/demos.md and use-cases.md in Go. */
export type DemoId = 'hero' | 'research' | 'design' | 'data' | 'ops' | 'movies' | 'agents' | 'memes' | 'training';

export interface GalleryItem {
  id: string;
  /** Category, the thumb's label. */
  eyebrow: string;
  /** Short name, the tab. */
  name: string;
  title: string;
  /** One line under the title. */
  tagline: string;
  /** The folder under /demos for a real demo; none for one still to shoot. */
  demo?: DemoId;
}

export const GALLERY: GalleryItem[] = [
  { id: 'hero', demo: 'hero', eyebrow: 'Tour', name: 'Tour', title: 'Everything you work with, in one space.', tagline: 'Notes, data, tools and agents as connected cells, all live.' },
  { id: 'ops', demo: 'ops', eyebrow: 'Ops', name: 'Ops', title: 'Run your ops from one space.', tagline: 'Jobs, logs, deploys and rules, all live.' },
  { id: 'data', demo: 'data', eyebrow: 'Data', name: 'Dashboards', title: 'A spreadsheet for anything, live.', tagline: 'Orders stream in, every chart and metric follows.' },
  { id: 'design', demo: 'design', eyebrow: 'Design', name: 'Design system', title: 'Your design system, one live spec.', tagline: 'Tokens, mocks and checks that follow every change.' },
  { id: 'training', demo: 'training', eyebrow: 'ML', name: 'ML training', title: 'Train models in your own ML lab.', tagline: 'Launch runs, watch them learn, use their models.' },
  { id: 'research', demo: 'research', eyebrow: 'Research', name: 'Research', title: 'Sources, claims and scores, kept live.', tagline: 'Papers weighed against claims, our own evals beside them.' },
  { id: 'agents', demo: 'agents', eyebrow: 'Agents', name: 'Agents', title: 'A team of agents, run from one space.', tagline: 'Brief, steer and chain Claude Code sessions.' },
  { id: 'memes', demo: 'memes', eyebrow: 'Memes', name: 'Memes', title: 'A blockchain, read live.', tagline: 'Every launch and trade, streamed into pages.' },
  { id: 'movies', demo: 'movies', eyebrow: 'Movies', name: 'Movies', title: 'Your personal movie tracker.', tagline: 'Films, people and timelines, all linked, all live.' },
];

/** The hero gallery: real demos first (they can take the stage), then the ones still to shoot. Copy from compass/nuspace/demos.md and use-cases.md in Go. */
export type DemoId = 'hero' | 'movies' | 'agents' | 'memes' | 'training';

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
  { id: 'agents', demo: 'agents', eyebrow: 'Agents', name: 'Agents', title: 'A team of agents, run from one space.', tagline: 'Brief, steer and chain Claude Code sessions.' },
  { id: 'training', demo: 'training', eyebrow: 'ML', name: 'ML training', title: 'Train models in your own ML lab.', tagline: 'Launch runs, watch them learn, use their models.' },
  { id: 'memes', demo: 'memes', eyebrow: 'Memes', name: 'Memes', title: 'A blockchain, read live.', tagline: 'Every launch and trade, streamed into pages.' },
  { id: 'movies', demo: 'movies', eyebrow: 'Movies', name: 'Movies', title: 'Your personal movie tracker.', tagline: 'Films, people and timelines, all linked, all live.' },
  // Still to shoot, hidden for now:
  // { id: 'money', eyebrow: 'Finance', name: 'Money', title: 'Your money, one live ledger.', tagline: 'Statements import on their own, budgets follow.' },
  // { id: 'research', eyebrow: 'Research', name: 'Research', title: 'Sources, claims and scores, kept live.', tagline: 'Every claim tied to its source, rescored as you read.' },
  // { id: 'notes', eyebrow: 'Knowledge', name: 'Second brain', title: 'Notes that hold live data.', tagline: 'Link, query and build on everything you wrote.' },
  // { id: 'github', eyebrow: 'Team ops', name: 'GitHub org', title: 'Your GitHub org, read live.', tagline: 'Repos, PRs and CI on pages your team builds.' },
  // { id: 'homelab', eyebrow: 'Automation', name: 'Home lab', title: 'Your machines, with a screen.', tagline: 'Jobs, scripts and boxes, watched and run in one place.' },
];

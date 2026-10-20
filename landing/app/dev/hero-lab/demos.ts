/** The demos the hero gallery rotates through. Copy from compass/nuspace/demos.md in Go. */
export type DemoId = 'hero' | 'movies' | 'agents' | 'memes' | 'training';

export interface Demo {
  id: DemoId;
  /** Short name, the kicker and the tab. */
  name: string;
  title: string;
  body: string;
  /** Three things the clip shows. */
  highlights: string[];
}

export const DEMOS: Demo[] = [
  {
    id: 'hero',
    name: 'Tour',
    title: 'Everything you work with, in one space.',
    body: 'Notes, data, tools and agents as connected cells, all live.',
    highlights: ["an agent's answer that stays live", 'a tool in a few lines', 'one change, every page knows'],
  },
  {
    id: 'movies',
    name: 'Movies',
    title: 'Your personal movie tracker.',
    body: 'A film base you run yourself. Films, people and timelines, all linked, all live.',
    highlights: ['a page per film and person, all linked', 'bring in a log, its pages build themselves', "a few lines, a page that picks tonight's film"],
  },
  {
    id: 'agents',
    name: 'Agents',
    title: 'A team of agents, run from one space.',
    body: 'Brief and steer Claude Code sessions, chain them into flows, build your own tools around them.',
    highlights: ['a live page per agent, its work kept', 'a fan-out and a judge in a few lines', 'a page of your own that steers the team'],
  },
  {
    id: 'memes',
    name: 'Memes',
    title: 'A blockchain, read live.',
    body: 'Every launch and trade on the meme market, streamed into pages that redraw as they land.',
    highlights: ['launches and trades as they happen', 'a live page per coin', 'a few lines, a page for every coin past your bar'],
  },
  {
    id: 'training',
    name: 'ML training',
    title: 'Train models in your own ML lab.',
    body: 'Launch runs, watch them learn, use their models and build your own tools around them.',
    highlights: ['a run is a job in its own process', 'every page reads its models and results', 'a few lines, a rule on the live run'],
  },
];

export const byId = (id: DemoId) => DEMOS.find((d) => d.id === id)!;

/* ---- round 2: the full gallery, real demos and the ones still to shoot ---- */

export interface Tile {
  id: string;
  /** Category, the tile's eyebrow. */
  eyebrow: string;
  /** Short name, the tab. */
  name: string;
  title: string;
  /** One line under the title. */
  tagline: string;
  /** A real demo with video, or a tile for one still to shoot. */
  demo?: DemoId;
}

/** Real demos first (they can take the stage), then the coming ones. Use cases from compass/nuspace/use-cases.md. */
export const TILES: Tile[] = [
  { id: 'hero', demo: 'hero', eyebrow: 'Tour', name: 'Tour', title: 'Everything you work with, in one space.', tagline: 'Notes, data, tools and agents as connected cells, all live.' },
  { id: 'movies', demo: 'movies', eyebrow: 'Tracking', name: 'Movies', title: 'Your personal movie tracker.', tagline: 'Films, people and timelines, all linked, all live.' },
  { id: 'agents', demo: 'agents', eyebrow: 'Agents', name: 'Agents', title: 'A team of agents, run from one space.', tagline: 'Brief, steer and chain Claude Code sessions.' },
  { id: 'memes', demo: 'memes', eyebrow: 'Live data', name: 'Memes', title: 'A blockchain, read live.', tagline: 'Every launch and trade, streamed into pages.' },
  { id: 'training', demo: 'training', eyebrow: 'ML', name: 'ML training', title: 'Train models in your own ML lab.', tagline: 'Launch runs, watch them learn, use their models.' },
  { id: 'money', eyebrow: 'Finance', name: 'Money', title: 'Your money, one live ledger.', tagline: 'Statements import on their own, budgets follow.' },
  { id: 'research', eyebrow: 'Research', name: 'Research', title: 'Sources, claims and scores, kept live.', tagline: 'Every claim tied to its source, rescored as you read.' },
  { id: 'notes', eyebrow: 'Knowledge', name: 'Second brain', title: 'Notes that hold live data.', tagline: 'Link, query and build on everything you wrote.' },
  { id: 'github', eyebrow: 'Team ops', name: 'GitHub org', title: 'Your GitHub org, read live.', tagline: 'Repos, PRs and CI on pages your team builds.' },
  { id: 'homelab', eyebrow: 'Automation', name: 'Home lab', title: 'Your machines, with a screen.', tagline: 'Jobs, scripts and boxes, watched and run in one place.' },
];

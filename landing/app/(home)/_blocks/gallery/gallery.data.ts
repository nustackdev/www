/** The gallery: spaces people run, each one a set of small connected programs. Copy from compass/nuspace/iter-3-wip.md and growth/website/demos.md in Go. Wording is a draft. */
export type DemoId = 'hero' | 'research' | 'design' | 'data' | 'ops' | 'movies' | 'agents' | 'memes' | 'training';

/** The gallery's filters, in chip order. Draft. */
export const TAGS = ['Work', 'Data', 'AI', 'Personal'] as const;
export type Tag = (typeof TAGS)[number];

export interface GalleryItem {
  id: string;
  /** Domain, the card's kicker and the wall tile's label. */
  eyebrow: string;
  /** Short name, for the footer and the wall. */
  name: string;
  title: string;
  /** One line under the title. */
  tagline: string;
  /** What the space is made of: its programs, in the order they connect. Draft. */
  made: string[];
  /** Filter tags, from TAGS. */
  tags: Tag[];
  /** The folder under /demos. */
  demo: DemoId;
}

export const GALLERY: GalleryItem[] = [
  { id: 'hero', demo: 'hero', tags: ['Work'], eyebrow: 'Tour', name: 'Tour', title: 'Everything you work with, in one space.', tagline: "nustack's own org space, built from an empty page.", made: ['page', 'movie club', 'spend chart', 'github sync job', 'brand', 'agent'] },
  { id: 'ops', demo: 'ops', tags: ['Work'], eyebrow: 'Ops', name: 'Ops', title: 'Run your ops from one space.', tagline: 'A release breaks, the incident pages, a rule rolls it back.', made: ['storefront', 'deploy job', 'log', 'incident', 'rollback rule'] },
  { id: 'data', demo: 'data', tags: ['Data', 'Work'], eyebrow: 'Data', name: 'Dashboards', title: 'A spreadsheet for anything, live.', tagline: 'Orders stream in, every chart and metric follows.', made: ['orders stream', 'events table', 'export job', 'metric', 'price button'] },
  { id: 'design', demo: 'design', tags: ['Work'], eyebrow: 'Design', name: 'Design system', title: 'Your design system, one live spec.', tagline: 'Tokens, mocks and checks that follow every change.', made: ['tokens', 'proposal', 'release job', 'color checker'] },
  { id: 'training', demo: 'training', tags: ['AI', 'Data'], eyebrow: 'ML', name: 'ML training', title: 'Train models in your own ML lab.', tagline: 'Launch runs, watch them learn, stop them by rule.', made: ['run launcher', 'metrics', 'model', 'compare page', 'stop rule'] },
  { id: 'research', demo: 'research', tags: ['AI'], eyebrow: 'Research', name: 'Research', title: 'Sources, claims and scores, kept live.', tagline: 'A paper flips a claim everywhere, an eval reruns.', made: ['probe', 'papers', 'claims', 'eval run'] },
  { id: 'agents', demo: 'agents', tags: ['AI', 'Work'], eyebrow: 'Agents', name: 'Agents', title: 'A team of agents, run from one space.', tagline: 'Brief, steer and judge Claude Code sessions.', made: ['agent sessions', 'briefs', 'judge', 'desk'] },
  { id: 'memes', demo: 'memes', tags: ['Data'], eyebrow: 'Live data', name: 'Memes', title: 'A blockchain, read live.', tagline: 'Every launch and trade, streamed into pages.', made: ['solana stream', 'coin pages', 'ranking', 'radar'] },
  { id: 'movies', demo: 'movies', tags: ['Personal'], eyebrow: 'Personal', name: 'Movies', title: 'Your personal movie tracker.', tagline: 'Films, people and timelines, all linked, all live.', made: ['film base', 'log import job', 'tonight page', 'ratings'] },
];

/** Open a gallery item in the lightbox, from anywhere on the page (the hero wall, the cards). */
export const OPEN_EVENT = 'gallery:open';
export const openDemo = (id: string) => window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: id }));

import type { Chapter } from '@nustackdev/tape-player';

/** A recorded take, as the site plays it. */
export interface SceneDef {
  /** Url of the scene.json. */
  scene: string;
  /** What it shows, for screen readers. */
  label: string;
  /** How it is told here. The take stays as recorded; edit these freely. */
  chapters?: Chapter[];
}

/** Scenes recorded so far, by name. */
export const SCENES = {
  hero: {
    scene: '/scenes/hero.json',
    label:
      'A nuspace space built from zero: a reading list with a table, a slider, live totals and a chart, then a page inside it.',
    chapters: [
      { t: 0, title: 'Start a plane', note: 'An empty page. Name it, give it an icon.' },
      { t: 10000, title: 'Add a table', note: 'Type / for cells. A heading, then three books and their pages.' },
      { t: 25600, title: 'Add a slider', note: 'Pages a day, dragged to 40.' },
      { t: 32000, title: 'Write a few lines', note: 'Python that reads the table and the slider, and draws tiles and a chart.' },
      { t: 45200, title: 'Nest a page inside', note: 'Notes for one book, with a link back up.' },
      { t: 58300, title: 'Change anything', note: 'Tick a book, drag the slider. Everything follows.' },
    ],
  },
  movies: {
    scene: '/scenes/movies.json',
    label: 'The nuspace movies demo: a film added and ticked watched, the timeline, The Godfather rerated, then the atlas.',
    chapters: [
      { t: 0, title: 'Add a film', note: 'Type a name, press Add. It lands in the list.' },
      { t: 9000, title: 'Mark it watched', note: 'Tick the box. The count at the top follows.' },
      { t: 14000, title: 'Find it on the timeline', note: 'Jaws already sits in 1975. Nobody put it there.' },
      { t: 20800, title: 'Change a rating', note: 'The Godfather drops from #2 to #17. Instantly.' },
      { t: 31000, title: 'See the big picture', note: 'Every director and genre, drawn from your list.' },
    ],
  },
  agents: {
    scene: '/scenes/agents.json',
    label: 'The nuspace agents demo: Claude Code sessions run and steered from a space.',
    chapters: [
      { t: 0, title: 'Brief an agent', note: 'A name, a model, a brief. It starts at once.' },
      { t: 15000, title: 'Steer it mid-task', note: 'Say something. It is the agent\'s next turn.' },
      { t: 20000, title: 'Stop, then resume', note: 'It halts where it is and picks up from there.' },
      { t: 27600, title: 'Fan out with a judge', note: 'Several agents on one task, a judge picks the best.' },
      { t: 33800, title: 'See every agent', note: 'All of them on one board, live.' },
    ],
  },
  memes: {
    scene: '/scenes/memes.json',
    label: 'The nuspace memes demo: meme launches and trades streaming in live.',
    chapters: [
      { t: 0, title: 'Watch the market move', note: 'Launches and trades land as they happen.' },
      { t: 12600, title: 'Sort by last trade', note: 'The busiest coins rise to the top, and keep moving.' },
      { t: 18100, title: 'Open a coin', note: 'A live page per coin, built from the stream.' },
      { t: 23000, title: 'Read its chart and trades', note: 'Every trade redraws them as it lands.' },
      { t: 35000, title: 'Check the sync', note: 'Millions of entries in, still keeping up.' },
    ],
  },
  training: {
    scene: '/scenes/training.json',
    label: 'The nuspace mnist demo: a model trained, steered mid-run, then reading a drawn digit.',
    chapters: [
      { t: 0, title: 'Open a run', note: 'Pick the one training. Watch it learn, live.' },
      { t: 9800, title: 'Drag the learning rate', note: 'Mid-run. The curve bends right after.' },
      { t: 23000, title: 'Compare the runs', note: 'Every run side by side, at a glance.' },
      { t: 31300, title: 'Draw a digit', note: 'The model reads it, and so does every checkpoint.' },
    ],
  },
} satisfies Record<string, SceneDef>;

export type SceneName = keyof typeof SCENES;

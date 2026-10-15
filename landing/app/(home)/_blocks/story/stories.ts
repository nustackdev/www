/** A beat of a story: one thing the viewer does, and what follows from it. */
export interface Beat {
  /** Where it starts, ms of the take. Runs to the next beat's start, the last to the end. */
  start: number;
  /** What you do, a bare verb phrase. */
  title: string;
  /** What you see happen because of it. */
  result: string;
}

export interface Story {
  /** Url of the tape scene. */
  scene: string;
  /** What the scene shows, for screen readers. */
  label: string;
  beats: Beat[];
}

/** The beat playing at `t`. */
export function beatAt(beats: Beat[], t: number) {
  let i = 0;
  for (let j = 0; j < beats.length; j++) if (t >= beats[j].start) i = j;
  return i;
}

export const MOVIES: Story = {
  scene: '/scenes/movies.json',
  label: 'The nuspace movies demo: a film added and ticked watched, the timeline, The Godfather rerated, then the atlas.',
  beats: [
    { start: 0, title: 'Add a film', result: 'Type a name, press Add. It lands in the list.' },
    { start: 9000, title: 'Mark it watched', result: 'Tick the box. The count at the top follows.' },
    { start: 14000, title: 'Find it on the timeline', result: 'Jaws already sits in 1975. Nobody put it there.' },
    { start: 20800, title: 'Change a rating', result: 'The Godfather drops from #2 to #17. Instantly.' },
    { start: 31000, title: 'See the big picture', result: 'Every director and genre, drawn from your list.' },
  ],
};

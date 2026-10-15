import { Window } from '@www/shared/components/media/Window';
import { StoryPlayer } from '../story/StoryPlayer';
import { MOVIES, type Beat } from '../story/stories';

/** Scenes recorded so far, by name. A block without its own plays the hero. */
const SCENES: Record<string, { scene: string; label: string; beats?: Beat[] }> = {
  hero: {
    scene: 'hero',
    label:
      'A nuspace space built from zero: a reading list with a table, a slider, live totals and a chart, then a page inside it.',
  },
  movies: {
    scene: 'movies',
    label:
      'The nuspace movies demo: a film added and ticked watched, the timeline, The Godfather rerated, then the atlas.',
    beats: MOVIES.beats,
  },
  agents: { scene: 'agents', label: 'The nuspace agents demo: Claude Code sessions run and steered from a space.' },
  memes: { scene: 'memes', label: 'The nuspace memes demo: meme launches and trades streaming in live.' },
  training: { scene: 'training', label: 'The nuspace mnist demo: a model trained, steered mid-run, then reading a drawn digit.' },
};

export interface SceneProps {
  /** Scene id, the tape recording it plays. */
  name: string;
  /** Frame aspect ratio. Reserved up front so nothing shifts when tape lands. */
  ratio?: '16 / 10' | '4 / 3';
  /** The frame is a scrub control: press and drag through the scene. */
  controls?: boolean;
}

/**
 * Scene — a tape playing in a Window, bleeding right past the main column.
 * The screen is server rendered at its size; the player and the app load
 * lazily inside it. With `controls` the frame scrubs.
 */
export function Scene({ name, ratio = '16 / 10', controls }: SceneProps) {
  const rec = SCENES[name] ?? SCENES.hero;
  const [w, h] = ratio.split(' / ').map(Number);
  return (
    <Window bleed screenStyle={{ aspectRatio: ratio }}>
      <StoryPlayer
        scene={`/scenes/${rec.scene}.json`}
        label={rec.label}
        aspect={w / h}
        beats={rec.beats}
        controls={controls}
      />
    </Window>
  );
}

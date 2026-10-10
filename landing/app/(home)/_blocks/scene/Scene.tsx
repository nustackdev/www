import { ScenePlayer } from './ScenePlayer';
import s from './Scene.module.css';

const HELLO = { scene: 'hello', label: 'A nuspace plane being written: a title, then two lines of text.' };

/** Scenes recorded so far, by name. Until a block has its own, it plays hello. */
const SCENES: Record<string, { scene: string; label: string }> = {
  hero: HELLO,
};

export interface SceneProps {
  /** Scene id, the tape recording it plays. */
  name: string;
  /** Frame aspect ratio. Reserved up front so nothing shifts when tape lands. */
  ratio?: '16 / 10' | '4 / 3';
  className?: string;
}

/**
 * Scene — a frame playing a live tape scene. The frame is server rendered at
 * its size; the player and the app load lazily inside it.
 */
export function Scene({ name, ratio = '4 / 3', className }: SceneProps) {
  const cls = [s.frame, className].filter(Boolean).join(' ');
  const rec = SCENES[name] ?? HELLO;
  const [w, h] = ratio.split(' / ').map(Number);
  return (
    <div className={cls} style={{ aspectRatio: ratio }} data-scene={name}>
      <ScenePlayer scene={rec.scene} aspect={w / h} label={rec.label} />
    </div>
  );
}

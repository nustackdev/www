import s from './Scene.module.css';

export interface SceneProps {
  /** Scene id, later the tape recording it plays. */
  name: string;
  /** Frame aspect ratio. Reserved up front so nothing shifts when tape lands. */
  ratio?: '16 / 10' | '4 / 3';
  className?: string;
}

/**
 * Scene — a reserved frame for a live tape scene. Empty for now, the dev
 * build shows the scene name so layouts can be judged.
 */
export function Scene({ name, ratio = '4 / 3', className }: SceneProps) {
  const cls = [s.frame, className].filter(Boolean).join(' ');
  return (
    <div className={cls} style={{ aspectRatio: ratio }} data-scene={name} aria-hidden>
      {process.env.NODE_ENV !== 'production' ? <span className={s.label}>{name}</span> : null}
    </div>
  );
}

import type { ReactNode } from 'react';
import { Scene } from './scene/Scene';
import s from './Unit.module.css';

export interface UnitProps {
  /** Unit name, eg "Knowledge bases". */
  kicker: string;
  title: ReactNode;
  description: ReactNode;
  /** Tape scene name. Omit for units that carry their own visual. */
  scene?: string;
  /** Extras under the scene: stats, code, links. */
  children?: ReactNode;
}

/**
 * Unit — the one repeated section: h3 left, description right, the scene
 * bleeding right past the main column, extras, then a divider.
 */
export function Unit({ kicker, title, description, scene, children }: UnitProps) {
  return (
    <article className={s.root}>
      <div className={s.head}>
        <div className={s.titleCol}>
          <p className={s.kicker}>{kicker}</p>
          <h3 className={s.title}>{title}</h3>
        </div>
        <p className={s.desc}>{description}</p>
      </div>
      {scene ? <Scene name={scene} ratio="16 / 10" className={s.scene} /> : null}
      {children}
    </article>
  );
}

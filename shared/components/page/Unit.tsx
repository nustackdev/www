import type { ReactNode } from 'react';
import { Kicker } from '../text/Kicker';
import s from './Unit.module.css';

export interface UnitProps {
  /** Unit name, eg "Knowledge bases". */
  kicker: ReactNode;
  title: ReactNode;
  description: ReactNode;
  /** Extras between the head and the media, eg highlights. */
  lead?: ReactNode;
  /** The big visual, usually a Window bleeding right. */
  media?: ReactNode;
  /** Extras under the media: stats, code, links. */
  children?: ReactNode;
}

/**
 * Unit — the one repeated block of a product page: h3 left, description
 * right, lead extras, the media, extras, then a main width divider.
 */
export function Unit({ kicker, title, description, lead, media, children }: UnitProps) {
  return (
    <article className={s.root}>
      <div className={s.head}>
        <div className={s.titleCol}>
          <Kicker>{kicker}</Kicker>
          <h3 className={s.title}>{title}</h3>
        </div>
        <p className={s.desc}>{description}</p>
      </div>
      {lead}
      {media}
      {children}
    </article>
  );
}

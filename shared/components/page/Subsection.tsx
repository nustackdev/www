import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Kicker } from '../text/Kicker';
import s from './Subsection.module.css';

export interface SubsectionProps {
  /** Anchor for the subsection; its eyebrow links to it, so it can be shared. */
  id?: string;
  /** Subsection name, eg "Knowledge bases". */
  eyebrow?: ReactNode;
  /** The h3, left. */
  tagline: ReactNode;
  /** The line beside it, right. */
  description?: ReactNode;
  /** Extras between the head and the media, eg highlights. */
  lead?: ReactNode;
  /** The big visual, usually a Window bleeding right. */
  media?: ReactNode;
  /** The main width divider that closes it. The last one in a section drops it on its own. */
  border?: boolean;
  className?: string;
  /** Extras under the media: stats, code, links. */
  children?: ReactNode;
  /** The unit's call to action, a row of Buttons at its end. */
  actions?: ReactNode;
}

/**
 * Subsection — the one repeated block inside a Section: h3 left,
 * description right, lead extras, the media, extras, then a main width divider.
 */
export function Subsection({
  id,
  eyebrow,
  tagline,
  description,
  lead,
  media,
  border = true,
  className,
  children,
  actions,
}: SubsectionProps) {
  return (
    <article id={id} className={cn(s.root, border && s.border, className)}>
      <div className={s.head}>
        <div className={s.titleCol}>
          {eyebrow ? <Kicker href={id ? `#${id}` : undefined}>{eyebrow}</Kicker> : null}
          <h3 className={s.title}>{tagline}</h3>
        </div>
        {description ? <p className={s.desc}>{description}</p> : null}
      </div>
      {lead}
      {media}
      {children}
      {actions ? <div className={s.actions}>{actions}</div> : null}
    </article>
  );
}

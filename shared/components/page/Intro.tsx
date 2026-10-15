import type { ReactNode } from 'react';
import { Kicker } from '../text/Kicker';
import s from './Intro.module.css';

export interface IntroProps {
  /** Section name over the heading, eg "Spaces". */
  eyebrow?: ReactNode;
  /** The statement, in full ink. */
  tagline: ReactNode;
  /** Its continuation, in the same heading, in the second tone. */
  description?: ReactNode;
  /** The section's anchor: the eyebrow links to it. */
  href?: string;
}

/** Intro — the h2 that opens a section: eyebrow, then a two tone statement. */
export function Intro({ eyebrow, tagline, description, href }: IntroProps) {
  return (
    <header className={s.root}>
      {eyebrow ? (
        <Kicker tone="accent" href={href}>
          {eyebrow}
        </Kicker>
      ) : null}
      <h2 className={s.text}>
        {tagline}
        {description ? <span className={s.dim}> {description}</span> : null}
      </h2>
    </header>
  );
}

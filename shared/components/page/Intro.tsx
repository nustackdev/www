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
  /** A paragraph under the heading, in the second ink at lede size. */
  lead?: ReactNode;
  /** The section's anchor: the eyebrow links to it. */
  href?: string;
}

/** Intro — the h2 that opens a section: eyebrow, a two tone statement, an optional lead. */
export function Intro({ eyebrow, tagline, description, lead, href }: IntroProps) {
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
      {lead ? <p className={s.lead}>{lead}</p> : null}
    </header>
  );
}

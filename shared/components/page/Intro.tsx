import type { ReactNode } from 'react';
import { Kicker } from '../text/Kicker';
import s from './Intro.module.css';

export interface IntroProps {
  /** Group name, eg "Spaces". */
  kicker: ReactNode;
  /** The statement, in full ink. */
  title: ReactNode;
  /** Its continuation, in the same heading, in the second tone. */
  children?: ReactNode;
  /** The group's anchor: the kicker links to it. */
  href?: string;
}

/** Intro — the h2 that opens a group: kicker, then a two tone statement. */
export function Intro({ kicker, title, children, href }: IntroProps) {
  return (
    <header className={s.root}>
      <Kicker tone="accent" href={href}>
        {kicker}
      </Kicker>
      <h2 className={s.text}>
        {title}
        {children ? <span className={s.dim}> {children}</span> : null}
      </h2>
    </header>
  );
}

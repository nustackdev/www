import type { ReactNode } from 'react';
import s from './Intro.module.css';

export interface IntroProps {
  /** Group name, eg "Spaces". */
  kicker: string;
  /** The statement, in full ink. */
  title: ReactNode;
  /** Its continuation, in the same paragraph, dimmed. */
  children?: ReactNode;
}

/** Intro — the h2 text beat that opens a group of units. No scene. */
export function Intro({ kicker, title, children }: IntroProps) {
  return (
    <header className={s.root}>
      <p className={s.kicker}>{kicker}</p>
      <h2 className={s.text}>
        {title}
        {children ? <span className={s.dim}> {children}</span> : null}
      </h2>
    </header>
  );
}

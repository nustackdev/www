import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Intro } from './Intro';
import s from './Group.module.css';

export interface GroupProps {
  id?: string;
  /** Group name over the h2, eg "Spaces". */
  kicker: ReactNode;
  /** The h2 statement. */
  title: ReactNode;
  /** The h2 continuation, in the second tone. */
  dim?: ReactNode;
  /** A smaller gap under the intro, for a grid that reads with it. */
  tight?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Group — one semantic group of a product page: a full width divider, its
 * h2 intro, then its content (units, a grid, rows). Units close with a main
 * width divider of their own; the last one leaves it to the next group.
 */
export function Group({ id, kicker, title, dim, tight, className, children }: GroupProps) {
  return (
    <section id={id} className={cn(s.root, tight && s.tight, className)}>
      <Intro kicker={kicker} title={title}>
        {dim}
      </Intro>
      {children}
    </section>
  );
}

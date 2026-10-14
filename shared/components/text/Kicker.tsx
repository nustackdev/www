import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import s from './Kicker.module.css';

interface Props {
  /** accent: the group name over an h2, in Afterglow. muted: a unit name. */
  tone?: 'accent' | 'muted';
  /** Makes the kicker a link to this anchor, eg "#spaces", for sharing the section. */
  href?: string;
  className?: string;
  children: ReactNode;
}

/** Kicker — the short name that sits over a title. Plain words, not caps. */
export function Kicker({ tone = 'muted', href, className, children }: Props) {
  return (
    <p className={cn(s.kicker, s[tone], className)}>
      {href ? (
        <a className={s.anchor} href={href}>
          {children}
          <span className={s.hash} aria-hidden>
            #
          </span>
        </a>
      ) : (
        children
      )}
    </p>
  );
}

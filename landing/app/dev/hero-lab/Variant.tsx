import type { ReactNode } from 'react';
import s from './lab.module.css';

/** One variation on the lab page: its letter, name and why, then the hero itself. */
export function Variant({ id, name, why, children }: { id: string; name: string; why: string; children: ReactNode }) {
  return (
    <section id={id} className={s.variant} aria-labelledby={`${id}-name`}>
      <header className={s.label}>
        <span className={s.letter}>{id.toUpperCase()}</span>
        <h2 id={`${id}-name`} className={s.name}>
          {name}
        </h2>
        <p className={s.why}>{why}</p>
      </header>
      <div className={s.hero}>{children}</div>
    </section>
  );
}

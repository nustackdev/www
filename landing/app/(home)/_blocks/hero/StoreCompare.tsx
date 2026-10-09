import { NuLogo } from '@www/shared/components/marks/NuLogo';
import s from './StoreCompare.module.css';

interface Store {
  name: string;
  keeps: string;
  loses: string;
  /** The one we build. Highlighted. */
  ours?: boolean;
}

const STORES: Store[] = [
  { name: 'Database', keeps: 'The data.', loses: 'Who, when, why and from what.' },
  { name: 'Knowledge base', keeps: 'The conclusions.', loses: 'Everything not written down.' },
  {
    name: 'Information base',
    keeps: 'The data in context, and the programs that make it.',
    loses: 'Nothing.',
    ours: true,
  },
];

/** StoreCompare — the three kinds of store, side by side. Hero visual. */
export function StoreCompare() {
  return (
    <div className={s.grid} role="list" aria-label="Three kinds of store">
      {STORES.map((st) => (
        <div key={st.name} role="listitem" className={st.ours ? `${s.card} ${s.ours}` : s.card}>
          <div className={s.head}>
            <h2 className={s.name}>{st.name}</h2>
            {st.ours ? (
              <span className={s.tag}>
                <NuLogo size="1em" />
                nuspace
              </span>
            ) : null}
          </div>
          <dl className={s.rows}>
            <div className={s.rowItem}>
              <dt className={s.label}>Keeps</dt>
              <dd className={s.value}>{st.keeps}</dd>
            </div>
            <div className={s.rowItem}>
              <dt className={s.label}>Loses</dt>
              <dd className={st.ours ? `${s.value} ${s.none}` : `${s.value} ${s.loss}`}>{st.loses}</dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  );
}

import s from './Stats.module.css';

export interface Stat {
  value: string;
  label: string;
}

/** Stats — a row of big numbers with one-line labels. */
export function Stats({ items }: { items: Stat[] }) {
  return (
    <dl className={s.grid}>
      {items.map((it, i) => (
        // Position first: labels can repeat (placeholders) and the list is static
        <div key={`${i}-${it.label}`} className={s.item}>
          <dt className={s.label}>{it.label}</dt>
          <dd className={s.value}>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

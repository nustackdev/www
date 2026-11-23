import s from './Gallery.module.css';

/** Made-of chips: the space's programs, as a row of code tags. */
export function Made({ items }: { items: string[] }) {
  return (
    <ul className={s.made} aria-label="Made of">
      {items.map((m) => (
        <li key={m}>{m}</li>
      ))}
    </ul>
  );
}

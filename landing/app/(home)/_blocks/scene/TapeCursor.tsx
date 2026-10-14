import s from './TapeCursor.module.css';

/** The pointer: a pebble, its tip at the top left. Drawn twice, edge then body. */
const PEBBLE = 'M4.5 3.5 L19.5 10 L12.4 12.4 L10 19.5 Z';

/**
 * TapeCursor — the cursor tapes play with. A rounded pebble in the site
 * accent with a white edge, so it never reads as the viewer's own.
 */
export function TapeCursor() {
  return (
    <svg className={s.cursor} width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path className={s.edge} d={PEBBLE} />
      <path className={s.body} d={PEBBLE} />
    </svg>
  );
}

/** TapeClick — a soft accent disc that opens and fades where a tape clicks. */
export function TapeClick() {
  return <span className={s.click} />;
}

/** How long a click stays drawn, ms. Matches the disc's animation. */
export const CLICK_MS = 480;

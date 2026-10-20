import { Container } from '@www/shared/components/grid/Container';
import { ThemeToggle } from '@www/shared/components/nav/ThemeToggle';
import { Variant } from './Variant';
import { Round1 } from './Round1';
import { Gallery, type GalleryConfig } from './round2/Gallery';
import { LAYOUTS } from './round2/layouts';
import { Strip } from './variants/Strip';
import { Bento } from './variants/Bento';
import { Rail } from './variants/Rail';
import { Tabs } from './variants/Tabs';
import { Deck } from './variants/Deck';
import s from './lab.module.css';
import './lab.global.css';

/**
 * Hero lab: the gallery hero in a few shapes, stacked, to pick one before the
 * real hero is built. Dev only: `page.dev.tsx` is a route under `next dev`
 * alone (see pageExtensions in next.config.mjs), so it never ships.
 *
 * Small loops live in public/_lab/<demo>/ (gitignored): 7s from one chapter
 * of each demo, 480px wide, 24fps, h264 crf 32 + vp9 crf 42, plus posters.
 */
export const metadata = { title: 'Hero lab', robots: { index: false, follow: false } };

const ROUND2: { id: string; name: string; why: string; cfg: GalleryConfig }[] = [
  {
    id: 'a',
    name: 'L around two sides',
    why: 'Gor\'s sketch, sized for ten: the stage takes 80% of the width, four thumbs down the right and five along the bottom; every real thumb loops (four at most).',
    cfg: { scope: 'r2a', layout: LAYOUTS.ell, play: 'visible', chrome: 'chip' },
  },
  {
    id: 'b',
    name: 'One row below',
    why: 'The stage runs the full width, the biggest it can get; nine thumbs sit under it like a filmstrip, posters until hovered.',
    cfg: { scope: 'r2b', layout: LAYOUTS.row, play: 'hover', chrome: 'bare' },
  },
  {
    id: 'c',
    name: 'Column on the right',
    why: 'Reads like a playlist beside the player; one spotlight loop walks the rail and the rest stay muted, so the stage keeps the eye.',
    cfg: { scope: 'r2c', layout: LAYOUTS.rail, play: 'spotlight', chrome: 'dim' },
  },
  {
    id: 'd',
    name: 'Wings',
    why: 'The stage centred with thumbs on both sides and under it: symmetric and calm, the gallery frames the demo; loops on hover.',
    cfg: { scope: 'r2d', layout: LAYOUTS.wings, play: 'hover', chrome: 'chip' },
  },
];

const ROUND1 = [
  { id: 'r1a', name: 'Stage and strip', why: 'Closest to today: the tour stays the hero, four thumbnails promise more and trade places with it.', C: Strip },
  { id: 'r1b', name: 'Bento', why: 'Shows breadth at a glance; the picked tile grows in place, so nothing jumps to a new spot.', C: Bento },
  { id: 'r1c', name: 'Chapter rail', why: 'Reads like a table of contents: every demo named with a line and a live thumb, the open one says what it shows.', C: Rail },
  { id: 'r1d', name: 'Tabs with peek', why: 'The most familiar and quietest; one video at a time, hover a tab to peek before switching.', C: Tabs },
  { id: 'r1e', name: 'Fanned deck', why: 'The bold one: a deck that always has another card leaning out, playful and very swipe-like.', C: Deck },
];

export default function HeroLab() {
  return (
    <div className={s.root}>
      <header className={s.bar}>
        <Container className={s.barIn}>
          <p className={s.barTitle}>
            Hero lab <span>· round 2 · dev only</span>
          </p>
          <nav className={s.anchors} aria-label="Variations">
            {ROUND2.map((v) => (
              <a key={v.id} className={s.anchor} href={`#${v.id}`}>
                <b>{v.id.toUpperCase()}</b>
                <span className={s.anchorName}>{v.name}</span>
              </a>
            ))}
            <a className={s.anchor} href="#round1">
              <span className={s.anchorName}>Round 1</span>
              <b className={s.anchorShort}>R1</b>
            </a>
          </nav>
          <ThemeToggle className={s.toggle} />
        </Container>
      </header>
      <main>
        <Container>
          <div className={s.intro}>
            <h1>Bento gallery, round 2</h1>
            <p>
              One big stage, nine tiny thumbs around it: five real demos and five still to shoot. The tab line names
              them all and follows the grid: hover a tab to peek, click a tab or a thumb to put it on stage. They vary
              on where the thumbs sit, how big the stage gets, when loops play, and thumb chrome.
            </p>
          </div>
          {ROUND2.map(({ id, name, why, cfg }) => (
            <Variant key={id} id={id} name={name} why={why}>
              <Gallery cfg={cfg} />
            </Variant>
          ))}
          <Round1>
            {ROUND1.map(({ id, name, why, C }) => (
              <Variant key={id} id={id} name={name} why={why}>
                <C />
              </Variant>
            ))}
          </Round1>
        </Container>
      </main>
    </div>
  );
}

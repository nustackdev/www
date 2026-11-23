import { Container } from '@www/shared/components/grid/Container';
import { Footer, type FooterColumn } from '@www/shared/components/nav/Footer';
import { STACK } from '@www/shared/lib/stack/stack';
import { SOCIAL_LINKS } from '@www/shared/lib/social';
import { Hero } from './_blocks/hero/Hero';
import { Gallery } from './_blocks/gallery/Gallery';
import { GALLERY } from './_blocks/gallery/gallery.data';
import { Cells } from './_blocks/Cells';
import { TryIt } from './_blocks/TryIt';
import s from './page.module.css';

/** The footer's three columns: the gallery, the stack, the community. */
const FOOTER: FooterColumn[] = [
  {
    title: 'Gallery',
    items: GALLERY.slice(0, 4).map((g) => ({ name: g.name, href: '#gallery', desc: g.tagline })),
    more: { label: 'Explore all', href: '#gallery' },
  },
  { title: 'Stack', items: STACK.map((x) => ({ name: x.name, href: x.href, desc: x.navDesc })) },
  {
    title: 'Community',
    items: [
      { name: 'GitHub', href: SOCIAL_LINKS.github, desc: 'Source and issues. Star the repo.' },
      { name: 'Discord', href: SOCIAL_LINKS.discord, desc: 'Ask questions, show your spaces.' },
      { name: 'X', href: SOCIAL_LINKS.x, desc: 'Releases and work in progress.' },
    ],
  },
];

/**
 * Home — the nuspace product page: the hero names the space, the gallery
 * teaches it, Program anything explains it, Get started closes it. Built from
 * the shared page grammar (Section, Subsection, Window). See design/systems/landing in Go.
 */
export default function Home() {
  return (
    <div className={s.root}>
      <Container className={s.content}>
        <Hero />
        <Gallery />
        <Cells />
        <TryIt />
      </Container>
      <Footer columns={FOOTER} />
    </div>
  );
}

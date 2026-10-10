import { Container } from '@www/shared/components/grid/Container';
import { Footer } from '@www/shared/components/nav/Footer';
import { Hero } from './_blocks/hero/Hero';
import { Spaces } from './_blocks/Spaces';
import { Agents } from './_blocks/Agents';
import { UnderTheHood } from './_blocks/UnderTheHood';
import { TryIt } from './_blocks/TryIt';
import s from './page.module.css';

/**
 * Home — the nuspace product page. Its own look, taken from the nuspace
 * shell (see landing/direction.md in Go), so the page and the scenes read
 * as one surface. Other pages keep the site Page.
 */
export default function Home() {
  return (
    <div className={s.root}>
      <Container className={s.content}>
        <Hero />
        <Spaces />
        <Agents />
        <UnderTheHood />
        <TryIt />
      </Container>
      <Footer />
    </div>
  );
}

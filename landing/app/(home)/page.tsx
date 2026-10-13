import { Container } from '@www/shared/components/grid/Container';
import { Footer } from '@www/shared/components/nav/Footer';
import { Hero } from './_blocks/hero/Hero';
import { Spaces } from './_blocks/Spaces';
import { Highlights } from './_blocks/Highlights';
import { HowItWorks } from './_blocks/HowItWorks';
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
        <Highlights />
        <Spaces />
        <HowItWorks />
        <TryIt />
      </Container>
      <div className={s.layer}>
        <Footer />
      </div>
    </div>
  );
}

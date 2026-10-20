import { Container } from '@www/shared/components/grid/Container';
import { Footer } from '@www/shared/components/nav/Footer';
import { Hero } from './_blocks/hero/Hero';
import { Anchors } from './_blocks/Anchors';
import { Audience } from './_blocks/Audience';
import { Highlights } from './_blocks/Highlights';
import { HowItWorks } from './_blocks/HowItWorks';
import { TryIt } from './_blocks/TryIt';
import s from './page.module.css';

/**
 * Home — the nuspace product page, built from the shared page grammar:
 * Section (h2), Subsection (h3) and Window scenes. See design/systems/landing in Go.
 */
export default function Home() {
  return (
    <div className={s.root}>
      <Container className={s.content}>
        <Hero />
        <Anchors />
        <Audience />
        <Highlights />
        <HowItWorks />
        <TryIt />
      </Container>
      <Footer />
    </div>
  );
}

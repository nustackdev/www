import { Container } from '@www/shared/components/grid/Container';
import { Footer } from '@www/shared/components/nav/Footer';
import { Hero } from './_blocks/hero/Hero';
import { Spaces } from './_blocks/Spaces';
import { Highlights } from './_blocks/Highlights';
import { HowItWorks } from './_blocks/HowItWorks';
import { TryIt } from './_blocks/TryIt';
import s from './page.module.css';

/**
 * Home — the nuspace product page, built from the shared page grammar:
 * Group (h2), Unit (h3) and Window scenes. See design/systems/landing in Go.
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
      <Footer />
    </div>
  );
}

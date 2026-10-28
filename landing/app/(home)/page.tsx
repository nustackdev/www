import { Container } from '@www/shared/components/grid/Container';
import { Footer } from '@www/shared/components/nav/Footer';
import { Hero } from './_blocks/hero/Hero';
import { Anchors } from './_blocks/Anchors';
import { Closing } from './_blocks/Closing';
import { Cells } from './_blocks/Cells';
import { HowItWorks } from './_blocks/HowItWorks';
import { TryIt } from './_blocks/TryIt';
import { UseCases } from './_blocks/UseCases';
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
        <UseCases />
        <Cells />
        <TryIt />
        <HowItWorks />
        <Closing />
      </Container>
      <Footer />
    </div>
  );
}

import { Section } from '@www/shared/components/page';
import { Fan } from './Fan';
import { Install } from './Install';
import { StartPreview } from './StartPreview';
import s from './TryIt.module.css';

/** TryIt: every CTA on the page lands here. Two ways in rising under a fan
 *  of screens, both ending on the quickstart page. */
export function TryIt() {
  return (
    <Section
      id="start"
      eyebrow="Get started"
      tagline="From zero to your space in one line."
      lead="Run one line yourself, or give your agent the skills to install the space and keep building with you."
    >
      <Fan>
        <div className={s.root}>
          <Install />

          <div className={s.lands}>
            <p className={s.aside}>That&apos;s it. Your space opens on Quickstart. Edit your first cell.</p>
            <StartPreview />
          </div>
        </div>
      </Fan>
    </Section>
  );
}

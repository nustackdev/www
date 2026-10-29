import { Section } from '@www/shared/components/page';
import { Fan } from './Fan';
import { Install } from './Install';
import { StartPreview } from './StartPreview';
import s from './TryIt.module.css';

/** TryIt: every CTA on the page lands here. Two ways in rising under a fan
 *  of screens, both ending on the start page. */
export function TryIt() {
  return (
    <Section
      id="start"
      eyebrow="Get started"
      tagline="From zero to your space in an instant."
      lead="Run one line yourself, or give your agent the skills to install the space and keep building with you."
    >
      <Fan>
        <div className={s.root}>
          <Install />

          <div className={s.lands}>
            <p className={s.aside}>That&apos;s it. Your space, open and ready. Start building.</p>
            <StartPreview />
          </div>
        </div>
      </Fan>
    </Section>
  );
}

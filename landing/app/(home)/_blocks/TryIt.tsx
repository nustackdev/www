import { Section } from '@www/shared/components/page';
import { Fan } from './Fan';
import { Install } from './Install';
import { StartPreview } from './StartPreview';
import s from './TryIt.module.css';

/** TryIt: every CTA on the page lands here. Two ways in rising under a fan
 *  of screens, both ending on the space they open. */
export function TryIt() {
  return (
    <Section
      id="start"
      eyebrow="Get started"
      tagline="Your space, one line away."
      lead="Run one line yourself, or give your agent the skills to install the space and keep building with you."
    >
      <Fan>
        <div className={s.root}>
          <Install />

          <div className={s.lands}>
            <p className={s.aside}>
              <span className={s.asideLead}>That&apos;s it.</span> Your space opens in the browser, ready to build.
            </p>
            <StartPreview />
          </div>
        </div>
      </Fan>
    </Section>
  );
}

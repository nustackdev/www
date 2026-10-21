import { Section } from '@www/shared/components/page';
import { Fan } from './Fan';
import { Install } from './Install';

/** TryIt — every CTA on the page lands here: the install rising under a fan
 *  of screens. */
export function TryIt() {
  return (
    <Section
      id="start"
      eyebrow="Get started"
      tagline="Three steps to your space."
      lead="Hand it to your agent: it installs nuspace and builds your first thing from one prompt."
    >
      <Fan>
        <Install />
      </Fan>
    </Section>
  );
}

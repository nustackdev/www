import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Intro } from './Intro';
import s from './Section.module.css';

export interface SectionProps {
  /** Anchor for the section; its eyebrow links to it, so the section can be shared. */
  id?: string;
  /** Section name over the heading, eg "Spaces". */
  eyebrow?: ReactNode;
  /** The h2 statement, in full ink. Leave out for a section with no heading. */
  tagline?: ReactNode;
  /** The h2 continuation, in the second tone. */
  description?: ReactNode;
  /** Accessible name, for a section with no tagline. */
  label?: string;
  /**
   * What the section holds, which sets the gap under the heading.
   * content: one block that reads with the heading (a grid, rows, an install).
   * subsections: Subsections, each with its own heading and closing divider.
   */
  layout?: 'content' | 'subsections';
  /** Vertical padding. none leaves the air to the sections around it. */
  space?: 'none' | 'sm' | 'md' | 'lg';
  /** The full width divider that opens the section. */
  border?: boolean;
  /** Content runs edge to edge, past the main column. */
  bleed?: boolean;
  /** The section's call to action, a row of Buttons under its content. */
  actions?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/**
 * Section — one semantic section of a product page: a full width divider,
 * its h2 intro, then its content or its subsections. Every home section is
 * one, so spacing and headings stay the same across the page.
 */
export function Section({
  id,
  eyebrow,
  tagline,
  description,
  label,
  layout = 'content',
  space = 'lg',
  border = true,
  bleed,
  actions,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={tagline ? undefined : label}
      className={cn(s.root, s[layout], s[`space-${space}`], border && s.border, className)}
    >
      {tagline ? (
        <Intro eyebrow={eyebrow} tagline={tagline} description={description} href={id ? `#${id}` : undefined} />
      ) : null}
      {bleed ? <div className={s.bleed}>{children}</div> : children}
      {actions ? <div className={s.actions}>{actions}</div> : null}
    </section>
  );
}

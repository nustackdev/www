import type { ReactNode } from 'react';
import { Description, Label } from '../text';
import s from './AuthorQuote.module.css';

export interface AuthorQuoteProps {
  /** Paragraphs of the quote. Each rendered via <Description>. */
  paragraphs: ReactNode[];
  name: string;
  role: string;
  avatarSrc: string;
  avatarAlt?: string;
  /** Optional handle (e.g. "arkkln"). Rendered as "@handle" next to name. */
  handle?: string;
  /** Where the handle links to. Defaults to github.com/{handle}. */
  handleHref?: string;
}

/**
 * AuthorQuote — editorial pull-quote. Oversized hanging drop-quote in the
 * left margin, paragraphs rendered with the site's <Description>, hairline
 * rule between avatar and byline. Uses site text components and tokens
 * throughout so weight/color/size match the rest of the page.
 */
export function AuthorQuote({
  paragraphs,
  name,
  role,
  avatarSrc,
  avatarAlt,
  handle,
  handleHref,
}: AuthorQuoteProps) {
  const href =
    handleHref ?? (handle ? `https://github.com/${handle}` : undefined);
  return (
    <figure className={s.figure}>
      <span aria-hidden="true" className={s.mark}>“</span>
      <blockquote className={s.quote}>
        {paragraphs.map((p, i) => (
          <Description key={i} className={s.paragraph}>
            {p}
          </Description>
        ))}
      </blockquote>
      <figcaption className={s.attribution}>
        <img
          src={avatarSrc}
          alt={avatarAlt ?? name}
          className={s.avatar}
          width={52}
          height={52}
        />
        <span className={s.rule} aria-hidden="true" />
        <span className={s.byline}>
          <span className={s.nameRow}>
            <span className={s.name}>{name}</span>
            {handle ? (
              <a
                className={s.handle}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{handle}
              </a>
            ) : null}
          </span>
          <Label className={s.role}>{role}</Label>
        </span>
      </figcaption>
    </figure>
  );
}

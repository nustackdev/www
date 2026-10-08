import type { ReactNode } from 'react';
import Link from 'next/link';
import { SilverWovenName } from '../meta/SilverWovenName';
import { Tagline, Description } from '../text';
import { Chip } from '../controls/Chip';
import type { Hue } from '../../lib/hue';
import s from './CatalogueGrid.module.css';

/** Shared hue vocabulary used across catalogues (fabrics, tools, apps, use-cases). */
export type { Hue };

interface GridProps {
  children: ReactNode;
  className?: string;
}

/** CatalogueGrid — responsive card grid wrapper. */
export function CatalogueGrid({ children, className }: GridProps) {
  const cls = [s.grid, className].filter(Boolean).join(' ');
  return <div className={cls}>{children}</div>;
}

interface CardProps {
  href: string;
  name: string;
  hue: Hue;
  tagline?: string;
  description?: ReactNode;
  /** Use-cases only: the plainspoken job phrased as the user. */
  job?: string;
  /** e.g. "Coming soon". When present, card renders inert (no link). */
  badge?: string;
  /** Chip row (use-cases: fabric/tool stack). */
  stack?: string[];
  /** Opens in a new tab (used for github links on /apps). */
  external?: boolean;
}

/** CatalogueCard — one card in a CatalogueGrid. Renders as <Link>, <a> (external),
 *  or inert <div> (when badged, e.g. "Coming soon"). */
export function CatalogueCard({
  href,
  name,
  hue,
  tagline,
  description,
  job,
  badge,
  stack,
  external,
}: CardProps) {
  const inert = Boolean(badge);
  const body = (
    <>
      <div className={s.cardHead}>
        <SilverWovenName as="h3" hue={hue} className={s.cardName}>
          {name}
        </SilverWovenName>
        {badge ? <span className={s.badge}>{badge}</span> : null}
      </div>
      {job ? <p className={s.job}>{job}</p> : null}
      {tagline ? <Tagline>{tagline}</Tagline> : null}
      {description ? <Description>{description}</Description> : null}
      {stack && stack.length > 0 ? (
        <div className={s.stack} aria-label="Stack">
          {stack.map((label) => (
            <Chip key={label} size="sm">
              {label}
            </Chip>
          ))}
        </div>
      ) : null}
    </>
  );

  if (inert) {
    return (
      <div
        className={s.card}
        data-hue={hue}
        data-status="coming-soon"
        aria-disabled="true"
      >
        {body}
      </div>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={s.card}
        data-hue={hue}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={s.card} data-hue={hue}>
      {body}
    </Link>
  );
}

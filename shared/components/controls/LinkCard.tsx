import type { ReactNode } from 'react';
import { SiteLink as Link } from '../nav/SiteLink';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SilverWovenName, type SilverWovenHue } from '../meta/SilverWovenName';
import { Tagline } from '../text/Tagline';
import { Description } from '../text/Description';
import s from './LinkCard.module.css';

interface BaseProps {
  /** Where the card links to. Same rules as Button — starts with http →
   *  external `<a target="_blank">` + ArrowUpRight; otherwise next/Link + ArrowRight. */
  href: string;
  /** Force external-link behavior (target=_blank + ArrowUpRight). */
  external?: boolean;
  ariaLabel?: string;
  className?: string;
}

interface PlainProps extends BaseProps {
  /** Small icon rendered to the left of the title. Any ReactNode. */
  icon?: ReactNode;
  /** Card title — the primary label. */
  title: ReactNode;
  /** Optional body copy under the title. Keep to one sentence. */
  children?: ReactNode;
  /** Branded variant is off in this shape. */
  name?: never;
  hue?: never;
  tagline?: never;
}

interface BrandedProps extends BaseProps {
  /** Branded name — renders as `<SilverWovenName as="h3" hue={hue}>`. */
  name: ReactNode;
  /** Silver-woven hue for the name gradient AND for the card's data-hue hook. */
  hue: SilverWovenHue;
  /** Short accent phrase under the name. */
  tagline?: ReactNode;
  /** Body copy under the tagline — rendered inside `<Description>`. */
  children?: ReactNode;
  /** Plain-variant slots are off in this shape. */
  title?: never;
  icon?: never;
}

type Props = PlainProps | BrandedProps;

/**
 * LinkCard — a big-button-shaped link. Bordered surface card with two shapes:
 *
 * - Plain (default): `icon` + `title` + optional body, with a trailing arrow.
 *   Reach-for pattern for Learn / Explore rows, quickstart follow-ups,
 *   cross-links to related pages.
 *
 * - Branded: pass `name` + `hue` (and optional `tagline`) to render a
 *   fabric/product cross-link — `<SilverWovenName>` + `<Tagline>` +
 *   `<Description>`. Mirrors the FabricsCatalogue card shape and replaces
 *   the hand-rolled `combineCard`/`comboCard` pattern across the site.
 *
 * Pair inside a `<LinkGrid>` for a row of cards.
 */
export function LinkCard(props: Props) {
  const { href, external, ariaLabel, className } = props;
  const isExternal = external ?? /^https?:\/\//.test(href);
  const isBranded = 'name' in props && props.name !== undefined;
  const cls = [s.card, isBranded ? s.branded : null, className].filter(Boolean).join(' ');

  const content = isBranded ? (
    <>
      <SilverWovenName as="h3" hue={props.hue}>
        {props.name}
      </SilverWovenName>
      {props.tagline ? <Tagline>{props.tagline}</Tagline> : null}
      {props.children ? <Description>{props.children}</Description> : null}
    </>
  ) : (
    <>
      <span className={s.head}>
        {props.icon ? <span className={s.icon} aria-hidden>{props.icon}</span> : null}
        <span className={s.title}>{props.title}</span>
        {isExternal ? (
          <ArrowUpRight size={13} aria-hidden className={s.arrow} />
        ) : (
          <ArrowRight size={13} aria-hidden className={s.arrow} />
        )}
      </span>
      {props.children ? <span className={s.body}>{props.children}</span> : null}
    </>
  );

  const hueAttr = isBranded ? { 'data-hue': props.hue } : {};

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cls}
        aria-label={ariaLabel}
        {...hueAttr}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} aria-label={ariaLabel} {...hueAttr}>
      {content}
    </Link>
  );
}

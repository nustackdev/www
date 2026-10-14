import type { FocusEventHandler, MouseEventHandler, ReactNode } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SiteLink as Link } from '../nav/SiteLink';
import { cn } from '../../lib/cn';
import s from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  /** primary: solid Afterglow, the one main action. secondary: neutral
   *  fill and hairline. ghost: no fill until hovered. */
  variant?: ButtonVariant;
  /** sm 28, md 32, lg 40 (the site control height). */
  size?: ButtonSize;
  /** Renders a link. Without it, a `<button>`. */
  href?: string;
  /** Opens in a new tab with a ↗. Inferred from an http(s) href. */
  external?: boolean;
  /** A trailing → that nudges on hover. External links get ↗ instead. */
  arrow?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLElement>;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  /** Label, with an optional leading icon before it. */
  children: ReactNode;
}

/**
 * Button — the one button and CTA primitive of the site. Every variant has
 * three steps, rest, hover and press, and the shared focus ring.
 */
export function Button({
  variant = 'secondary',
  size = 'lg',
  href,
  external,
  arrow,
  onClick,
  onFocus,
  type = 'button',
  disabled,
  ariaLabel,
  className,
  children,
}: ButtonProps) {
  const isExternal = external ?? (!!href && /^https?:\/\//.test(href));
  const cls = cn(s.btn, s[variant], s[size], className);

  const trail = isExternal ? (
    <ArrowUpRight aria-hidden className={cn(s.trail, s.trailOut)} />
  ) : arrow ? (
    <ArrowRight aria-hidden className={cn(s.trail, s.trailOn)} />
  ) : null;

  const content = (
    <>
      {children}
      {trail}
    </>
  );

  if (!href) {
    return (
      <button type={type} className={cls} onClick={onClick} onFocus={onFocus} disabled={disabled} aria-label={ariaLabel}>
        {content}
      </button>
    );
  }

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls} onClick={onClick} onFocus={onFocus} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} onClick={onClick} onFocus={onFocus} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

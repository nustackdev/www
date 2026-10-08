import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import s from './Button.module.css';

export type ButtonVariant =
  | 'neutral'
  | 'outline'
  | 'solid'
  | 'solidAlt'
  | 'ghost'
  | 'repo';

interface Props {
  variant?: ButtonVariant;
  href?: string;
  /** Single size for now — reserved for future scale variants. */
  size?: 'md';
  className?: string;
  children: ReactNode;
  /** Force external-link behavior (target=_blank + ArrowUpRight). */
  external?: boolean;
  ariaLabel?: string;
}

/**
 * Button — the single CTA/button primitive for the landing.
 * Internal href (starts with `/` or `#`) renders a next/Link + ArrowRight.
 * External href (starts with `http`) renders `<a target="_blank">` + ArrowUpRight.
 * `variant="ghost"` renders a static `<span>` (no href needed).
 */
export function Button({
  variant = 'neutral',
  href,
  children,
  className,
  external,
  ariaLabel,
}: Props) {
  // Ghost: static span, no href, disabled visual.
  if (variant === 'ghost') {
    return (
      <span
        className={cn(s.ghost, className)}
        aria-disabled="true"
        aria-label={ariaLabel}
      >
        {children}
      </span>
    );
  }

  const isExternal = external ?? (!!href && /^https?:\/\//.test(href));

  const [cls, arrowCls] = classesFor(variant);
  const arrow = isExternal ? (
    <ArrowUpRight size={13} aria-hidden className={arrowCls} />
  ) : (
    <ArrowRight size={13} aria-hidden className={arrowCls} />
  );

  const content = (
    <>
      {children}
      {arrow}
    </>
  );

  const finalCls = cn(cls, className);

  if (!href) {
    return (
      <span className={finalCls} aria-label={ariaLabel}>
        {content}
      </span>
    );
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={finalCls}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={finalCls} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

/** Mono `org/repo` label — pair with a `variant="neutral"` Button to make
 *  a GitHub-repo CTA. Matches the old `RepoName` from SectionCard.tsx. */
export function ButtonRepoLabel({ children }: { children: ReactNode }) {
  return <span className={s.repoLabel}>{children}</span>;
}

function classesFor(v: Exclude<ButtonVariant, 'ghost'>): [string, string] {
  switch (v) {
    case 'neutral':  return [s.btn,      s.arrow];
    case 'outline':  return [s.outline,  s.arrowHue];
    case 'solid':    return [s.solid,    s.arrow];
    case 'solidAlt': return [s.solidAlt, s.arrow];
    case 'repo':     return [s.repo,     s.arrowRepo];
  }
}

function cn(...parts: (string | undefined | false)[]) {
  return parts.filter(Boolean).join(' ');
}

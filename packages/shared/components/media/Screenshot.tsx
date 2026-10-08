import type { ReactNode } from 'react';
import type { Hue } from '../../lib/hue';
import s from './Screenshot.module.css';

/** Fabric hue applied as the accent color for the frame. */
export type ScreenshotHue = Hue;

export interface ScreenshotProps {
  /** The image, mock, or SVG to frame. */
  children: ReactNode;
  /** Optional caption below the frame. Rendered as mono uppercase. */
  caption?: ReactNode;
  /** Accent hue for the frame. Default "sage". */
  hue?: ScreenshotHue;
  /** Optional accessibility label for the frame. */
  ariaLabel?: string;
  className?: string;
}

/**
 * Screenshot — frame + optional caption for mocks, SVGs, and screenshots.
 * One shape for every "here's what it looks like" media block on the site.
 */
export function Screenshot({
  children,
  caption,
  hue = 'sage',
  ariaLabel,
  className,
}: ScreenshotProps) {
  const cls = [s.frame, className].filter(Boolean).join(' ');
  return (
    <figure className={cls} data-hue={hue} aria-label={ariaLabel}>
      <div className={s.body}>{children}</div>
      {caption ? <figcaption className={s.caption}>{caption}</figcaption> : null}
    </figure>
  );
}

import type { CSSProperties, ReactNode } from 'react';
import s from './Container.module.css';

export interface ContainerProps {
  children?: ReactNode;
  /** Max content width (px). Default --site-w-main (1200). */
  maxWidth?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Container — outer wrapper for a site page.
 * The 1200 main column every page sits in.
 */
export function Container({
  children,
  maxWidth,
  className,
  style,
}: ContainerProps) {
  const cls = [s.root, className].filter(Boolean).join(' ');
  return (
    <div
      className={cls}
      style={maxWidth ? { maxWidth, ...style } : style}
    >
      {children}
    </div>
  );
}

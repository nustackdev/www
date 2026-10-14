import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import s from './Window.module.css';

export interface WindowProps {
  /** Centered in the top edge, eg "~ zsh". */
  title?: ReactNode;
  /** Something on the right of the top edge, eg a copy button. */
  actions?: ReactNode;
  /** Wider than the main column, bleeding right and cut by the window. */
  bleed?: boolean;
  className?: string;
  /** For the screen: an aspect ratio reserved up front, a min height. */
  screenStyle?: CSSProperties;
  screenClassName?: string;
  children?: ReactNode;
}

/**
 * Window — the one frame for anything the site shows running: scenes,
 * terminals, code. A flat tinted mat with a hairline, three neutral lights
 * on its top edge, holding the screen.
 */
export function Window({
  title,
  actions,
  bleed,
  className,
  screenStyle,
  screenClassName,
  children,
}: WindowProps) {
  return (
    <div className={cn(s.bezel, bleed && s.bleed, className)}>
      <div className={s.top}>
        <span className={s.lights} aria-hidden>
          <i />
          <i />
          <i />
        </span>
        {title ? <span className={s.title}>{title}</span> : null}
        {actions ? <span className={s.actions}>{actions}</span> : null}
      </div>
      <div className={cn(s.screen, screenClassName)} style={screenStyle}>
        {children}
      </div>
    </div>
  );
}

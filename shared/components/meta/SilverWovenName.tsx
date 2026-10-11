import type { ElementType, ReactNode } from 'react';
import type { Hue } from '../../lib/hue';
import s from './SilverWovenName.module.css';

export type SilverWovenHue = Hue;

interface Props {
  hue: SilverWovenHue;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** SilverWovenName: hero-scale title in its hue's color. */
export function SilverWovenName({
  hue, as: Tag = 'span', className, children,
}: Props) {
  const cls = [s.name, className].filter(Boolean).join(' ');
  return (
    <Tag className={cls} data-hue={hue}>
      {children}
    </Tag>
  );
}

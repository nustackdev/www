import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SiteLink as Link } from '../nav/SiteLink';
import { cn } from '../../lib/cn';
import s from './FeatureGrid.module.css';

export interface Feature {
  icon?: ReactNode;
  title: ReactNode;
  line: ReactNode;
  /** Makes the whole cell a link, with an arrow that nudges on hover. */
  href?: string;
  /** Two columns wide, washed in the accent: the closing cell. */
  wide?: boolean;
}

interface Props {
  items: Feature[];
  /** Columns at full width. Halves at tablet, one on phones. */
  columns?: 2 | 3 | 4;
  /** tile: the icon on a soft Afterglow tile. plain: the icon as is, for marks. */
  icon?: 'tile' | 'plain';
  className?: string;
}

/**
 * FeatureGrid — an open grid of short features. Lines only between cells,
 * fading toward every edge; edge cells drop their outer padding so the text
 * lines up with the page.
 */
export function FeatureGrid({ items, columns = 4, icon = 'tile', className }: Props) {
  return (
    <ul className={cn(s.grid, s[`c${columns}`], s[icon], className)}>
      {items.map((f, i) => {
        const external = !!f.href && /^https?:\/\//.test(f.href);
        const body = (
          <>
            <span className={s.head}>
              {f.icon ? (
                <span className={s.icon} aria-hidden>
                  {f.icon}
                </span>
              ) : null}
              <span className={s.title}>{f.title}</span>
              {f.href ? <ArrowUpRight className={s.arrow} size={15} strokeWidth={2} aria-hidden /> : null}
            </span>
            <span className={s.line}>{f.line}</span>
          </>
        );
        return (
          <li key={i} className={cn(s.cell, f.wide && s.wide)}>
            {f.href ? (
              <Link
                href={f.href}
                className={s.link}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {body}
              </Link>
            ) : (
              <div className={s.body}>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

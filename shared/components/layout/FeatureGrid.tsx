'use client';

import type { ReactNode } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { SiteLink as Link } from '../nav/SiteLink';
import { cn } from '../../lib/cn';
import { useAccordion } from '../../lib/useAccordion';
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
  /** Columns at full width. Halves at tablet, one below 860px. */
  columns?: 2 | 3 | 4;
  /** tile: the icon on a soft Afterglow tile. plain: the icon as is, for marks. */
  icon?: 'tile' | 'plain';
  /** Below 860px, an accordion: heads only, one open at a time. For cells without links. */
  accordion?: boolean;
  className?: string;
}

/**
 * FeatureGrid — an open grid of short features. Lines only between cells,
 * fading toward every edge; edge cells drop their outer padding so the text
 * lines up with the page. With `accordion`, narrow screens get the heads
 * only, one open at a time.
 */
export function FeatureGrid({ items, columns = 4, icon = 'tile', accordion, className }: Props) {
  const acc = useAccordion('(max-width: 860px)');
  return (
    <ul className={cn(s.grid, s[`c${columns}`], s[icon], accordion && s.acc, className)}>
      {items.map((f, i) => {
        const external = !!f.href && /^https?:\/\//.test(f.href);
        if (accordion && !f.href)
          return (
            <li key={i} className={cn(s.cell, f.wide && s.wide)} {...acc.item(i)}>
              <div className={s.body}>
                <button className={cn(s.head, s.toggle)} {...acc.head(i)}>
                  {f.icon ? (
                    <span className={s.icon} aria-hidden>
                      {f.icon}
                    </span>
                  ) : null}
                  <span className={s.title}>{f.title}</span>
                  <ChevronDown className={s.chev} size={18} aria-hidden />
                </button>
                <span className={s.fold}>
                  <span className={s.folded}>
                    <span className={s.line}>{f.line}</span>
                  </span>
                </span>
              </div>
            </li>
          );
        const body = (
          <>
            <span className={s.head}>
              {f.icon ? (
                <span className={s.icon} aria-hidden>
                  {f.icon}
                </span>
              ) : null}
              <span className={s.title}>{f.title}</span>
              {f.href ? <ArrowUpRight className={s.arrow} size={16} strokeWidth={2} aria-hidden /> : null}
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

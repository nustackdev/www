import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import s from './NumberedList.module.css';

export type NumberedItem =
  | ReactNode
  | { label: ReactNode; href?: string; action?: string; desc?: ReactNode };

interface Props {
  items: NumberedItem[];
  className?: string;
  /** Default action label for items that have `href` but no per-item action. */
  action?: string;
}

/** NumberedList — mono-indexed vertical list (01, 02, …). Items may be
 * plain nodes or `{label, href, action}` — when href is set the whole row
 * becomes a link with a small trailing "See →". */
export function NumberedList({ items, className, action = 'See' }: Props) {
  const cls = [s.list, className].filter(Boolean).join(' ');
  return (
    <ol className={cls}>
      {items.map((raw, i) => {
        const item =
          raw && typeof raw === 'object' && !Array.isArray(raw) && 'label' in (raw as object)
            ? (raw as { label: ReactNode; href?: string; action?: string; desc?: ReactNode })
            : { label: raw as ReactNode, href: undefined, action: undefined, desc: undefined };
        const num = <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>;
        if (item.href) {
          return (
            <li key={i} className={s.item}>
              <Link href={item.href} className={s.rowLink}>
                {num}
                <span className={s.label}>
                  <span className={s.labelRow}>
                    {item.label}
                    <span className={s.action}>
                      {item.action ?? action}
                      <ArrowRight size={12} aria-hidden className={s.arrow} />
                    </span>
                  </span>
                  {item.desc ? <span className={s.desc}>{item.desc}</span> : null}
                </span>
              </Link>
            </li>
          );
        }
        return (
          <li key={i} className={s.item}>
            {num}
            <span className={s.label}>
              <span className={s.labelRow}>{item.label}</span>
              {item.desc ? <span className={s.desc}>{item.desc}</span> : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

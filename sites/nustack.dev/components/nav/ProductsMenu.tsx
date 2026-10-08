'use client';

/**
 * ProductsMenu — the Products mega-panel that opens under the nav trigger.
 *
 * One row per product group. Left column: group name + tagline. Right
 * column: 2-column grid of items (name + tagline text). Hover paints a
 * soft --site-wash bloom under the text and warms the tagline one step.
 * Surface matches FloatingNav's pill glass formula.
 */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCT_GROUPS, type ProductGroup } from './nav.data';
import s from './ProductsMenu.module.css';

export function ProductsMenu({ groups = PRODUCT_GROUPS }: { groups?: ProductGroup[] }) {
  return (
    <div className={s.panel}>
      {groups.map((group, i) => (
        <div
          key={group.header}
          className={s.row}
          data-first={i === 0 ? 'true' : undefined}
        >
          <div className={s.left}>
            {group.href ? (
              <Link href={group.href} className={s.groupNameLink} role="menuitem">
                <span className={s.groupName}>{group.header}</span>
                <span className={s.groupTagline}>{group.tagline}</span>
              </Link>
            ) : (
              <>
                <div className={s.groupName}>{group.header}</div>
                <div className={s.groupTagline}>{group.tagline}</div>
              </>
            )}
          </div>
          <div className={s.right}>
            <div className={s.itemsGrid}>
              {group.items.map((item) => (
                <Link key={item.href} href={item.href} className={s.item} role="menuitem">
                  <span className={s.itemName}>{item.name}</span>
                  <span className={s.itemDesc}>{item.desc}</span>
                </Link>
              ))}
            </div>
            {group.explore ? (
              <Link href={group.explore.href} className={s.explore} role="menuitem">
                <span>{group.explore.label}</span>
                <ArrowRight size={12} aria-hidden />
              </Link>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

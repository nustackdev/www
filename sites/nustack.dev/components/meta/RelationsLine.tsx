import Link from 'next/link';
import type { Powered } from '@/lib/refs';
import { FABRIC } from '@/lib/fabrics';
import { TOOL } from '@/lib/tools';
import { MonoKicker } from '@www/shared/components/meta/MonoKicker';
import s from './RelationsLine.module.css';

interface Props {
  /** Label word — rendered as "Powered by:" or "Powers:". */
  label: string;
  refs?: Powered[];
  className?: string;
}

interface Resolved {
  key: string;
  name: string;
  href?: string;
  external: boolean;
  hue?: string;
}

function resolve(ref: Powered, i: number): Resolved | null {
  if (ref.kind === 'fabric') {
    const f = FABRIC[ref.slug];
    if (!f) return null;
    return { key: `f:${ref.slug}`, name: f.name, href: f.href, external: false, hue: f.hue };
  }
  if (ref.kind === 'tool') {
    const t = TOOL[ref.slug];
    if (!t) return null;
    return { key: `t:${ref.slug}`, name: t.name, href: t.href, external: false, hue: t.hue };
  }
  return { key: `e:${i}:${ref.name}`, name: ref.name, href: ref.url, external: true };
}

/** RelationsLine — inline "Powered by: chip chip" strip for page headers.
 *  Skips render if `refs` is empty or undefined. */
export function RelationsLine({ label, refs, className }: Props) {
  if (!refs || refs.length === 0) return null;
  const items = refs.map(resolve).filter((r): r is Resolved => r !== null);
  if (items.length === 0) return null;
  const cls = [s.root, className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      <MonoKicker as="span" size="xs" tracking="wider" className={s.label}>
        {label}
      </MonoKicker>
      <span className={s.chips}>
        {items.map((it) =>
          it.href ? (
            <Link
              key={it.key}
              href={it.href}
              className={s.chip}
              data-hue={it.hue}
              {...(it.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {it.name}
            </Link>
          ) : (
            <span key={it.key} className={s.chip} data-hue={it.hue}>
              {it.name}
            </span>
          ),
        )}
      </span>
    </div>
  );
}

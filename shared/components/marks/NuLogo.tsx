import { useId } from 'react';
import {
  NU_MARK_PATH,
  NU_MARK_STOPS,
  NU_MARK_TRANSFORM,
  NU_MARK_VIEWBOX,
} from './nuMark';

/**
 * NuLogo — the v2 soft "nu" mark with the brand gradient
 * (text-only asset from nustackdev/brand/logo).
 */
export function NuLogo({
  size,
  className,
}: {
  size?: number | string;
  className?: string;
}) {
  const gid = useId();
  const gradId = `nu-logo-grad-${gid}`;
  return (
    <svg
      viewBox={NU_MARK_VIEWBOX}
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="1" x2="1" y2="0">
          {NU_MARK_STOPS.map((s) => (
            <stop key={s.offset} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>
      </defs>
      <g transform={NU_MARK_TRANSFORM} fill={`url(#${gradId})`} stroke="none">
        <path d={NU_MARK_PATH} />
      </g>
    </svg>
  );
}

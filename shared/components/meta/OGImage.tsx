import type { ReactElement } from 'react';
import {
  NU_MARK_PATH,
  NU_MARK_STOPS,
  NU_MARK_TRANSFORM,
  NU_MARK_VIEWBOX,
} from '../marks/nuMark';

/**
 * Shared OG image renderer for every app (landing, docs, blog).
 * Uses site brand palette (dark bg, purple → blue accents) and the nu logo
 * mark instead of the fumadocs default circle. Title/description are
 * clamped so long headers cannot overflow into the footer row.
 */

const BG = '#15181f'; // Dusk ground
const FG = '#eceef4'; // ink-1
const MUTED = '#9ba2ae'; // ink-3
const ACCENT_LINE = 'rgba(137, 70, 219, 0.44)'; // afterglow 44%

function NuMark({ size = 92 }: { size?: number }): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox={NU_MARK_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="og-nu-grad" x1="0" y1="1" x2="1" y2="0">
          {NU_MARK_STOPS.map((s) => (
            <stop key={s.offset} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>
      </defs>
      <g transform={NU_MARK_TRANSFORM} fill="url(#og-nu-grad)" stroke="none">
        <path d={NU_MARK_PATH} />
      </g>
    </svg>
  );
}

interface OGProps {
  title: string;
  description?: string;
  site: string;
}

export function OGImage({ title, description, site }: OGProps): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        color: FG,
        padding: '72px 80px',
        backgroundColor: BG,
        borderBottom: `14px solid ${ACCENT_LINE}`,
        fontFamily:
          'Inter, "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
            fontWeight: 800,
            fontSize: 74,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
              fontSize: 34,
              lineHeight: 1.32,
              color: MUTED,
              marginTop: 28,
            }}
          >
            {description}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 22,
          marginTop: 40,
          paddingTop: 28,
          borderTop: `1px solid ${ACCENT_LINE}`,
        }}
      >
        <NuMark size={72} />
        <div
          style={{
            display: 'flex',
            fontSize: 34,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: FG,
          }}
        >
          {site}
        </div>
        <div style={{ display: 'flex', flex: 1 }} />
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: MUTED,
          }}
        >
          nustack.dev
        </div>
      </div>
    </div>
  );
}

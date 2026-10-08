import type { ReactElement } from 'react';

/**
 * Shared OG image renderer for docs + blog.
 * Uses site brand palette (dark bg, purple → blue accents) and the nu logo
 * mark instead of the fumadocs default circle. Title/description are
 * clamped so long headers cannot overflow into the footer row.
 */

const BG = '#0f1117';
const FG = '#f5f6fa';
const MUTED = 'rgba(240, 242, 248, 0.62)';
const ACCENT = '#7c5cff';
const ACCENT_2 = '#4b7ee6';
const ACCENT_LINE = 'rgba(124, 92, 255, 0.32)';

function NuMark({ size = 92 }: { size?: number }): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="140 144 271 263"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="og-nu-grad" x1="140" y1="407" x2="411" y2="144" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={ACCENT} />
          <stop offset="1" stopColor={ACCENT_2} />
        </linearGradient>
      </defs>
      <g transform="translate(0,552) scale(0.1,-0.1)" fill="url(#og-nu-grad)" stroke="none">
        <path d="M2121 4065 c-376 -82 -653 -368 -711 -735 -6 -41 -10 -402 -10 -972 l0 -908 190 0 190 0 0 878 c0 968 -1 941 64 1070 19 37 51 86 71 110 54 62 155 130 238 161 l72 26 363 3 362 3 0 -681 0 -681 143 3 c132 3 145 5 172 26 68 53 64 1 65 900 l0 812 -572 -1 c-449 0 -587 -4 -637 -14z" />
        <path d="M3730 3203 c0 -973 2 -940 -66 -1076 -47 -93 -144 -190 -235 -234 -117 -58 -158 -63 -531 -63 l-338 0 0 681 0 680 -142 -3 c-160 -3 -178 -10 -217 -79 -21 -36 -21 -46 -21 -848 l0 -811 563 0 c350 0 586 4 623 11 379 67 675 365 734 739 6 41 10 402 10 973 l0 907 -190 0 -190 0 0 -877z" />
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
        backgroundImage: `radial-gradient(1100px 520px at 88% -10%, rgba(124,92,255,0.22), transparent 60%), radial-gradient(900px 480px at -10% 110%, rgba(75,126,230,0.18), transparent 55%)`,
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

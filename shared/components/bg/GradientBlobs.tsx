import type { CSSProperties } from 'react';
import s from './GradientBlobs.module.css';

export interface Blob {
  /** Color at the blob center (any valid CSS color). */
  color: string;
  /** Horizontal anchor inside the 4000px band (e.g. "1800px"). */
  x: string;
  /** Vertical anchor from top (e.g. "0", "500px"). */
  y: string;
  /** Blob diameter as `<w> <h>` or a single length. Default "1300px 1400px". */
  size?: string;
  /** Opacity applied via color-mix; not currently used — pass alpha in `color`. */
  opacity?: number;
}

export interface GradientBlobsProps {
  blobs: Blob[];
  /** Band height. Default "1700px" (matches live hero). */
  height?: string;
  className?: string;
  style?: CSSProperties;
}

function blobLayer(b: Blob): string {
  const size = b.size ?? '1300px 1400px';
  return `radial-gradient(${size} at ${b.x} ${b.y}, ${b.color} 0%, ${b.color} 10%, transparent 65%)`;
}

/** GradientBlobs — soft radial glow layer behind a section. */
export function GradientBlobs({
  blobs,
  height = '1700px',
  className,
  style,
}: GradientBlobsProps) {
  const background = blobs.map(blobLayer).join(', ');
  return (
    <div
      aria-hidden
      className={[s.root, className].filter(Boolean).join(' ')}
      style={{
        ['--site-kal-blobs-height' as string]: height,
        background,
        ...style,
      }}
    />
  );
}

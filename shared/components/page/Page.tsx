import type { ReactNode } from 'react';
import { Container } from '../grid/Container';
import { DotPattern } from '../bg/DotPattern';
import { GradientBlobs } from '../bg/GradientBlobs';
import type { Blob as GradientBlob } from '../bg/GradientBlobs';
import s from './Page.module.css';

export interface PageProps {
  children?: ReactNode;
  /**
   * Absolute-positioned decorations sitting between the gradient (z=0) and
   * the dot pattern (z=2). Used by pages that want extra background layers
   * (e.g. the landing's giant nu logo pinned to the hero grid). Rendered
   * in a pointer-events: none container.
   */
  decorations?: ReactNode;
  /**
   * Gradient bloom decoration. Opt-in per page — landing passes HERO_BLOBS
   * for its purple/blue bloom; every other page omits this and gets the
   * plain bg color + dot pattern.
   */
  gradientBlobs?: GradientBlob[];
  /** Extra className applied to the pageRoot. */
  className?: string;
  /** Site footer, rendered below the content. Each site passes its own. */
  footer?: ReactNode;
}

/**
 * Page — the site's outer page wrapper. Composes:
 *   1. bg color + optional gradient + optional decorations + dot pattern
 *   2. Container that hosts the page content (Header/Hero + Body)
 *   3. Footer (the site's own, passed in)
 * Owns top clearance for the fixed FloatingNav so children start below it.
 */
export function Page({
  children,
  decorations,
  gradientBlobs,
  className,
  footer,
}: PageProps) {
  const cls = [s.root, className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      {gradientBlobs ? (
        <div className={s.gradientLayer}>
          <GradientBlobs blobs={gradientBlobs} />
        </div>
      ) : null}
      {decorations ? (
        <div className={s.decorationsLayer} aria-hidden>
          {decorations}
        </div>
      ) : null}
      <DotPattern className={s.dotLayer} />
      <Container className={s.contentLayer}>
        <div className={s.content}>{children}</div>
      </Container>
      {footer ? <div className={s.footerLayer}>{footer}</div> : null}
    </div>
  );
}

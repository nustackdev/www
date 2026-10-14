import type { ReactNode } from 'react';
import { Container } from '../grid/Container';
import s from './Page.module.css';

export interface PageProps {
  children?: ReactNode;
  className?: string;
  /** Site footer, rendered below the content. Each site passes its own. */
  footer?: ReactNode;
}

/**
 * Page — the site's outer page wrapper: the ground, a Container for the
 * content, then the footer. Owns top clearance for the fixed FloatingNav so
 * children start below it.
 */
export function Page({ children, className, footer }: PageProps) {
  const cls = [s.root, className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      <Container className={s.contentLayer}>
        <div className={s.content}>{children}</div>
      </Container>
      {footer ? <div className={s.footerLayer}>{footer}</div> : null}
    </div>
  );
}

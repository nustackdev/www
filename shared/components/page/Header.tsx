import type { ReactNode } from 'react';
import { Cell } from '../grid/Cell';
import { CellContent } from '../grid/CellContent';
import { Row } from '../grid/Row';
import { Heading, Lede } from '../text';
import s from './Header.module.css';

export interface HeaderProps {
  /** Page title. Rendered as an <h1>-weight heading. */
  title: ReactNode;
  /** Optional lede paragraph under the title. */
  lede?: ReactNode;
  /** Optional kicker/breadcrumb slot above the title. */
  meta?: ReactNode;
  /** Optional cross-reference line (e.g. "Powered by:" chips) rendered
   *  below the title/lede, above actions. */
  tags?: ReactNode;
  /** Optional row of actions (buttons, links) under the lede. */
  actions?: ReactNode;
  className?: string;
}

/**
 * Header — the standard page title band for every non-landing page.
 * Bare band (no card), sits inside `Page` above `Body`. Landing uses its
 * own bespoke `Hero`; every other page uses this so title anatomy
 * (meta → title → lede → actions) stays uniform.
 */
export function Header({
  title,
  lede,
  meta,
  tags,
  actions,
  className,
}: HeaderProps) {
  const cls = [s.root, className].filter(Boolean).join(' ') || undefined;
  return (
    <Row cols={1} className={cls}>
      <Cell>
        <CellContent pad="lg">
          {meta ? <div className={s.meta}>{meta}</div> : null}
          <Heading level={1}>{title}</Heading>
          {lede ? <Lede className={s.lede}>{lede}</Lede> : null}
          {tags ? <div className={s.tags}>{tags}</div> : null}
          {actions ? <div className={s.actions}>{actions}</div> : null}
        </CellContent>
      </Cell>
    </Row>
  );
}

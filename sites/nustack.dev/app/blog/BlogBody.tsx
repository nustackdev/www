import type { ReactNode } from 'react';
import s from './BlogBody.module.css';

export function BlogBody({ children }: { children: ReactNode }) {
  return <div className={s.body}>{children}</div>;
}

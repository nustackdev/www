'use client';

import type { ReactNode } from 'react';
import { ThemeProvider as NextThemes } from 'next-themes';

/**
 * Theme for apps without fumadocs. Same next-themes settings fumadocs'
 * RootProvider uses (class on <html>, `theme` key in localStorage), so the
 * chosen theme carries over between landing, docs and blog.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemes>
  );
}

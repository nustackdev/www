'use client';

import type { ReactNode } from 'react';
import { ThemeProvider as NextThemes } from 'next-themes';

/**
 * Theme for apps without fumadocs. Same next-themes settings fumadocs'
 * RootProvider uses (class on <html>, `theme` key in localStorage), so the
 * chosen theme carries over between landing, docs and blog.
 */
// next-themes renders its no-flash <script> on the client too, which React 19
// warns about. The server's copy is the one that runs; on the client a json
// type keeps React quiet (the script opts out of the hydration diff).
const scriptProps = typeof window === 'undefined' ? undefined : ({ type: 'application/json' } as const);

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      scriptProps={scriptProps}
    >
      {children}
    </NextThemes>
  );
}

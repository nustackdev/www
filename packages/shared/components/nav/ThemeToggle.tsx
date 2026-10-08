'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'fumadocs-ui/provider/base';
import { Sun, Moon } from 'lucide-react';

interface Props {
  className?: string;
}

export function ThemeToggle({ className }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const isDark = mounted && resolvedTheme === 'dark';
  const next = isDark ? 'light' : 'dark';

  return (
    <button
      type="button"
      className={className}
      onClick={() => setTheme(next)}
      aria-label={mounted ? `switch to ${next} theme` : 'toggle theme'}
      suppressHydrationWarning
    >
      {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
    </button>
  );
}

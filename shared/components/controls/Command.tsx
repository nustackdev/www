'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '../../lib/cn';
import s from './Command.module.css';

export interface CommandProps {
  /** Shell lines, shown one per row and copied together. */
  lines: string[];
  /** Typed inside an agent session, not a shell: a `>` instead of the `$`. */
  inSession?: boolean;
  /** What is copied, for screen readers, eg "install command". */
  what?: string;
  /** lg: one line at the control height, to sit in a row of Buttons. xl:
   *  the hero's main command, beside an xl Button. */
  size?: 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Command: a copyable command line: mono on the code ground, a `$` the
 * copy leaves out, the copy icon inside. The whole box is the control:
 * hover outlines it, a click anywhere copies, unless it ends a text
 * selection. Long lines scroll in the box, never the page.
 */
export function Command({
  lines,
  inSession,
  what = 'command',
  size = 'md',
  className,
}: CommandProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    /* Selecting part of a line is a read, not a copy request. */
    if (window.getSelection()?.toString()) return;
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked, silent no-op */
    }
  };

  return (
    <div className={cn(s.root, s[size], inSession && s.inSession, copied && s.copied, className)} onClick={copy}>
      <div className={s.lines}>
        {lines.map((line) => (
          <div key={line} className={s.line}>
            <code>{line}</code>
          </div>
        ))}
      </div>
      {/* The keyboard way in: clicks on it bubble to the box, which copies. */}
      <button type="button" className={s.copy} aria-label={copied ? 'copied' : `copy ${what}`}>
        {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
      </button>
    </div>
  );
}

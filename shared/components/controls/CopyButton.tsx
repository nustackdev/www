'use client';

import { useEffect, useRef, useState, type FocusEventHandler } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button, type ButtonVariant } from './Button';

interface Props {
  /** What lands on the clipboard. */
  text: string;
  /** What is copied, for screen readers, eg "install commands". */
  what?: string;
  variant?: ButtonVariant;
  className?: string;
  onFocus?: FocusEventHandler<HTMLElement>;
}

/** CopyButton — a small button that copies text and says so for a moment. */
export function CopyButton({ text, what = 'text', variant = 'secondary', className, onFocus }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked, silent no-op */
    }
  };

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={copy}
      onFocus={onFocus}
      ariaLabel={copied ? 'copied' : `copy ${what}`}
      className={className}
    >
      {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </Button>
  );
}

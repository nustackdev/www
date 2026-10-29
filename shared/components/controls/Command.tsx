import { cn } from '../../lib/cn';
import { CopyButton } from './CopyButton';
import s from './Command.module.css';

export interface CommandProps {
  /** Shell lines, shown one per row and copied together. */
  lines: string[];
  /** Typed inside an agent session, not a shell: a `>` instead of the `$`. */
  inSession?: boolean;
  /** What is copied, for screen readers, eg "install command". */
  what?: string;
  /** lg: one line at the control height, to sit in a row of Buttons. */
  size?: 'md' | 'lg';
  className?: string;
}

/**
 * Command: a copyable command line: mono on the code ground, a `$` the
 * copy leaves out, the copy button inside. Long lines scroll in the box,
 * never the page.
 */
export function Command({ lines, inSession, what = 'command', size = 'md', className }: CommandProps) {
  return (
    <div className={cn(s.root, s[size], inSession && s.inSession, className)}>
      <div className={s.lines}>
        {lines.map((line) => (
          <div key={line} className={s.line}>
            <code>{line}</code>
          </div>
        ))}
      </div>
      <CopyButton text={lines.join('\n')} what={what} variant="ghost" />
    </div>
  );
}

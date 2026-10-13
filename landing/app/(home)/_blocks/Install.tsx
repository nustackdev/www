'use client';

import { useState, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';
import s from './Install.module.css';

/** One printed line: the bold `nuspace` mark then dim text, or dim text alone. */
interface Out {
  mark?: boolean;
  text: string;
}

interface Step {
  label: string;
  note: ReactNode;
  commands: string[];
  /** What the command prints, as the CLI prints it. */
  out: Out[];
}

const STEPS: Step[] = [
  {
    label: 'Install',
    note: 'One package from PyPI. Python 3.10 or newer.',
    commands: ['pip install nuspace'],
    out: [],
  },
  {
    label: 'Run',
    note: (
      <>
        A browser opens on your space. Press <kbd>/</kbd> on a plane to add a cell.
      </>
    ),
    commands: ['nuspace run my.nuspace'],
    out: [
      { mark: true, text: 'my.nuspace' },
      { text: 'http://127.0.0.1:8080, Ctrl+C to stop' },
    ],
  },
  {
    label: 'Try a demo',
    note: (
      <>
        A throwaway space with a full app in it. <code>nuspace demo</code> lists them all.
      </>
    ),
    commands: ['pip install "nuspace[demos]"', 'nuspace demo movies'],
    out: [
      { mark: true, text: 'Throwaway space, gone at close' },
      { text: 'http://127.0.0.1:8080/movies, Ctrl+C to stop' },
    ],
  },
];

/** Install — the steps as a rail, the session they make as one terminal.
 *  Pointing at a step lights its part of the session. */
export function Install() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<number | null>(null);

  const copy = async (i: number) => {
    try {
      await navigator.clipboard.writeText(STEPS[i].commands.join('\n'));
      setCopied(i);
      setTimeout(() => setCopied((c) => (c === i ? null : c)), 1400);
    } catch {
      /* clipboard blocked, silent no-op */
    }
  };

  return (
    <div className={s.root}>
      <ol className={s.rail}>
        {STEPS.map((st, i) => (
          <li key={st.label}>
            <button
              type="button"
              className={s.step}
              data-active={i === active || undefined}
              aria-current={i === active ? 'step' : undefined}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
              <span className={s.label}>{st.label}</span>
              <span className={s.note}>{st.note}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className={s.term}>
        <div className={s.bar}>
          <span className={s.dots} aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className={s.title}>~ zsh</span>
        </div>
        <div className={s.session}>
          {STEPS.map((st, i) => (
            <div
              key={st.label}
              className={s.block}
              data-active={i === active || undefined}
              onMouseEnter={() => setActive(i)}
            >
              <div className={s.cmds}>
                {st.commands.map((c) => (
                  <div key={c} className={s.cmd}>
                    <span className={s.prompt} aria-hidden>$</span>
                    <code>{c}</code>
                  </div>
                ))}
                {st.out.map((o) => (
                  <div key={o.text} className={s.out}>
                    {o.mark ? <b className={s.mark}>nuspace</b> : null}
                    {o.text}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className={s.copy}
                onClick={() => copy(i)}
                onFocus={() => setActive(i)}
                aria-label={copied === i ? 'copied' : `copy ${st.label.toLowerCase()} commands`}
              >
                {copied === i ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
                <span>{copied === i ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

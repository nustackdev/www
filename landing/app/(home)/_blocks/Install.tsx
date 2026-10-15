'use client';

import { useState, type ReactNode } from 'react';
import { CopyButton } from '@www/shared/components/controls/CopyButton';
import { Window } from '@www/shared/components/media/Window';
import { Kbd } from '@www/shared/components/text/Kbd';
import { Steps } from './Steps';
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
        A browser opens on your space. Press <Kbd>/</Kbd> on a plane to add a cell.
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

  return (
    <div className={s.root}>
      <Steps steps={STEPS} active={active} onPick={setActive} onPoint={setActive} />

      <Window title="~ zsh" className={s.term}>
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
              <CopyButton
                text={st.commands.join('\n')}
                what={`${st.label.toLowerCase()} commands`}
                className={s.copy}
                onFocus={() => setActive(i)}
              />
            </div>
          ))}
        </div>
      </Window>
    </div>
  );
}

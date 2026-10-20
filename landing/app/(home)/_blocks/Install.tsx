'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Asterisk, SquareTerminal, Terminal, Waypoints } from 'lucide-react';
import { CopyButton } from '@www/shared/components/controls/CopyButton';
import { Kbd } from '@www/shared/components/text/Kbd';
import { cn } from '@www/shared/lib/cn';
import s from './Install.module.css';

const PROMPT = 'Install nuspace, start a space and build a live monitor of this machine.';

interface Step {
  label: string;
  /** Shell lines, copied together. */
  cmd?: string[];
  /** Typed inside an agent session, not a shell. */
  inSession?: boolean;
  /** Words to paste to the agent. */
  prompt?: string;
  note?: ReactNode;
}

interface Path {
  id: string;
  name: string;
  icon: ReactNode;
  body: string;
  steps: Step[];
}

/* Every command is from nuskills/README.md or the nuspace README. */
const PATHS: Path[] = [
  {
    id: 'claude',
    name: 'Claude Code',
    icon: <Asterisk aria-hidden />,
    body: 'Claude learns nu and nuspace from the skills, installs nuspace and opens your first space. Ask it for cells next.',
    steps: [
      { label: 'Add the marketplace', cmd: ['claude plugin marketplace add nustackdev/nuskills'] },
      {
        label: 'Install the plugin',
        cmd: ['claude plugin install nuskills@nustack'],
        note: (
          <>
            Adds <code>/nuskills:nu</code> and <code>/nuskills:nuspace</code>.
          </>
        ),
      },
      {
        label: 'Ask for a space',
        prompt: PROMPT,
        note: 'Claude loads the nuspace skill on its own when the task matches.',
      },
    ],
  },
  {
    id: 'codex',
    name: 'Codex',
    icon: <SquareTerminal aria-hidden />,
    body: 'The same repo is a Codex marketplace. Same skills, same text, tested against the current code.',
    steps: [
      { label: 'Add the marketplace', cmd: ['codex plugin marketplace add nustackdev/nuskills'] },
      {
        label: 'Install the plugin',
        cmd: ['/plugins'],
        inSession: true,
        note: (
          <>
            Run it in a session and pick <code>nuskills</code>.
          </>
        ),
      },
      {
        label: 'Ask for a space',
        prompt: `$nuspace ${PROMPT}`,
        note: (
          <>
            Or skip <code>$nuspace</code>, Codex loads it when the task matches.
          </>
        ),
      },
    ],
  },
  {
    id: 'other',
    name: 'Other agents',
    icon: <Waypoints aria-hidden />,
    body: 'The skills are plain folders. Drop them where your agent looks for skills.',
    steps: [
      { label: 'Get the skills', cmd: ['git clone https://github.com/nustackdev/nuskills'] },
      {
        label: 'Copy them in',
        cmd: ['mkdir -p ~/.agents/skills', 'cp -r nuskills/skills/nu nuskills/skills/nuspace ~/.agents/skills/'],
        note: (
          <>
            Or into a repo&apos;s <code>.agents/skills</code> for one project.
          </>
        ),
      },
      { label: 'Ask for a space', prompt: PROMPT },
    ],
  },
  {
    id: 'manual',
    name: 'Manual',
    icon: <Terminal aria-hidden />,
    body: 'Install from PyPI and run a space yourself. The terminal is all you need.',
    steps: [
      { label: 'Install', cmd: ['pip install nuspace'] },
      {
        label: 'Run',
        cmd: ['nuspace run my.nuspace'],
        note: (
          <>
            A browser opens on your space. Press <Kbd>/</Kbd> on a plane to add a cell.
          </>
        ),
      },
      {
        label: 'Try a demo',
        cmd: ['pip install nudemos', 'nuspace run --with nudemos.movies'],
        note: 'A throwaway space with a full app in it.',
      },
    ],
  },
];

const allCommands = (p: Path) =>
  p.steps
    .filter((st) => st.cmd)
    .map((st) => st.cmd!.join('\n'))
    .join('\n');

/** Install: one framed card, a tab per way in (three agents, or by hand),
 *  each with its pitch, one copy for every command, and the numbered steps. */
export function Install() {
  const [at, setAt] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const p = PATHS[at];
  const n = PATHS.length;

  const onKey = (e: KeyboardEvent, i: number) => {
    const to =
      e.key === 'ArrowRight'
        ? (i + 1) % n
        : e.key === 'ArrowLeft'
          ? (i - 1 + n) % n
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? n - 1
              : -1;
    if (to < 0) return;
    e.preventDefault();
    setAt(to);
    tabs.current[to]?.focus();
  };

  return (
    <div className={s.frame}>
      <div className={s.tabs} role="tablist" aria-label="Ways to install">
        {PATHS.map((path, i) => (
          <button
            key={path.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${path.id}`}
            aria-selected={i === at}
            aria-controls={`${uid}-panel`}
            tabIndex={i === at ? 0 : -1}
            data-ring="inset"
            className={s.tab}
            onClick={() => setAt(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className={s.tabIcon}>{path.icon}</span>
            {path.name}
          </button>
        ))}
      </div>

      <div className={s.panel} role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${p.id}`}>
        <div className={s.side}>
          <h3 className={s.title}>{p.name}</h3>
          <p className={s.line}>{p.body}</p>
          <div className={s.actions}>
            <CopyButton
              text={allCommands(p)}
              what={`${p.name} commands`}
              variant="primary"
              size="lg"
              label="Copy commands"
            />
          </div>
        </div>

        <ol className={s.steps}>
          {p.steps.map((st, i) => (
            <li key={st.label} className={s.step}>
              <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
              <span className={s.label}>{st.label}</span>
              <div className={s.body}>
                {st.cmd ? (
                  <div className={cn(s.cmd, st.inSession && s.cmdIn)}>
                    <div className={s.lines}>
                      {st.cmd.map((c) => (
                        <div key={c} className={s.l}>
                          <code>{c}</code>
                        </div>
                      ))}
                    </div>
                    <CopyButton text={st.cmd.join('\n')} what={`${st.label.toLowerCase()} commands`} />
                  </div>
                ) : null}
                {st.prompt ? (
                  <div className={s.prompt}>
                    <div className={s.say}>
                      <span className={s.who}>Paste to your agent</span>
                      <span>{st.prompt}</span>
                    </div>
                    <CopyButton text={st.prompt} what="prompt" />
                  </div>
                ) : null}
                {st.note ? <p className={s.note}>{st.note}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

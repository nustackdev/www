'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Asterisk, SquareTerminal, Waypoints } from 'lucide-react';
import { Command } from '@www/shared/components/controls/Command';
import { CopyButton } from '@www/shared/components/controls/CopyButton';
import { cn } from '@www/shared/lib/cn';
import { AGENT_PROMPT, START_LINE } from './start.data';
import s from './Install.module.css';

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

interface Agent {
  id: string;
  name: string;
  icon: ReactNode;
  steps: Step[];
}

/** The hash that opens the quick start on the agent way. Links to it land on #start. */
const AGENT_HASH = '#start-agent';

const ASK: Step = {
  label: 'Ask it to run',
  prompt: AGENT_PROMPT,
  note: 'It checks Python and pip, installs nuspace and opens the space.',
};

const BY_HAND: Step[] = [
  {
    label: 'Install and open',
    cmd: [START_LINE],
    note: (
      <>
        Python 3.10 or newer. Run the same line to come back to your space.
      </>
    ),
  },
];

/* Every command is from nuskills/README.md or the nuspace README. */
const AGENTS: Agent[] = [
  {
    id: 'claude',
    name: 'Claude Code',
    icon: <Asterisk aria-hidden />,
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
      ASK,
    ],
  },
  {
    id: 'codex',
    name: 'Codex',
    icon: <SquareTerminal aria-hidden />,
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
      ASK,
    ],
  },
  {
    id: 'other',
    name: 'Other agents',
    icon: <Waypoints aria-hidden />,
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
      ASK,
    ],
  },
];

const WAYS = [
  { id: 'hand', name: 'By hand', sub: 'Python 3.10 or newer. One line.' },
  { id: 'agent', name: 'With your agent', sub: 'Your agent installs it and builds the first thing.' },
] as const;

/** Arrow keys, Home and End over a row of tabs, with roving focus. */
function useTabKeys(n: number, pick: (i: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
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
    pick(to);
    refs.current[to]?.focus();
  };
  return { refs, onKey };
}

/** Steps: the label beside its command, prompt and note, numbered when
 *  there is more than one. */
function Steps({ steps }: { steps: Step[] }) {
  const numbered = steps.length > 1;
  return (
    <ol className={cn(s.steps, !numbered && s.single)}>
      {steps.map((st, i) => (
        <li key={st.label} className={s.step}>
          {numbered ? <span className={s.num}>{String(i + 1).padStart(2, '0')}</span> : null}
          <span className={s.label}>{st.label}</span>
          <div className={s.body}>
            {st.cmd ? (
              <Command lines={st.cmd} inSession={st.inSession} what={`${st.label.toLowerCase()} commands`} />
            ) : null}
            {st.prompt ? (
              <div className={s.prompt}>
                <div className={s.say}>
                  <span className={s.who}>Paste to your agent</span>
                  <span>{st.prompt}</span>
                </div>
                <CopyButton text={st.prompt} what="prompt" variant="ghost" className={s.copy} />
              </div>
            ) : null}
            {st.note ? <p className={s.note}>{st.note}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Install: two ways in, by hand or with your agent, and per agent its
 *  numbered steps. Any link to #start-agent opens it on the agent way. */
export function Install() {
  const [way, setWay] = useState(0);
  const [agent, setAgent] = useState(0);
  const ways = useTabKeys(WAYS.length, setWay);
  const agents = useTabKeys(AGENTS.length, setAgent);
  const uid = useId();
  const a = AGENTS[agent];

  useEffect(() => {
    const open = () => {
      setWay(1);
      document.getElementById('start')?.scrollIntoView({ block: 'start' });
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!(e.target as Element | null)?.closest?.(`a[href="${AGENT_HASH}"]`)) return;
      e.preventDefault();
      history.pushState(null, '', AGENT_HASH);
      open();
      ways.refs.current[1]?.focus({ preventScroll: true });
    };
    const onHash = () => {
      if (location.hash === AGENT_HASH) open();
    };
    /* Landing on the hash: the browser jumps to the tab, pull up to the section. */
    const first = requestAnimationFrame(onHash);
    /* Capture: a Link would route the click before it bubbles here. */
    document.addEventListener('click', onClick, true);
    window.addEventListener('hashchange', onHash);
    return () => {
      cancelAnimationFrame(first);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('hashchange', onHash);
    };
  }, [ways.refs]);

  return (
    <div className={s.root}>
      <div className={s.ways} role="tablist" aria-label="Ways to install">
        {WAYS.map((w, i) => (
          <button
            key={w.id}
            ref={(el) => {
              ways.refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`start-${w.id}`}
            aria-selected={i === way}
            aria-controls={`${uid}-${w.id}`}
            tabIndex={i === way ? 0 : -1}
            data-ring="inset"
            className={s.way}
            onClick={() => setWay(i)}
            onKeyDown={(e) => ways.onKey(e, i)}
          >
            <span className={s.wayName}>{w.name}</span>
            <span className={s.waySub}>{w.sub}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${uid}-hand`} aria-labelledby="start-hand" hidden={way !== 0} className={s.panel}>
        <Steps steps={BY_HAND} />
      </div>

      <div role="tabpanel" id={`${uid}-agent`} aria-labelledby="start-agent" hidden={way !== 1} className={s.panel}>
        <div className={s.agents} role="tablist" aria-label="Agents">
          {AGENTS.map((ag, i) => (
            <button
              key={ag.id}
              ref={(el) => {
                agents.refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${ag.id}`}
              aria-selected={i === agent}
              aria-controls={`${uid}-steps`}
              tabIndex={i === agent ? 0 : -1}
              className={s.chip}
              onClick={() => setAgent(i)}
              onKeyDown={(e) => agents.onKey(e, i)}
            >
              <span className={s.chipIcon}>{ag.icon}</span>
              {ag.name}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`${uid}-steps`} aria-labelledby={`${uid}-tab-${a.id}`}>
          <Steps steps={a.steps} />
        </div>
      </div>
    </div>
  );
}

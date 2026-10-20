'use client';

import { ChevronDown, User, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@www/shared/components/controls/Button';
import { Section, Subsection } from '@www/shared/components/page';
import { useAccordion } from '@www/shared/lib/useAccordion';
import { AgentsDemo } from './agents/AgentsDemo';
import s from './Audience.module.css';

interface Audience {
  icon: ReactNode;
  /** Who, as the kicker. */
  who: string;
  title: string;
  body: string;
  /** What they build, one line each. A "Label: rest" line sets its label in ink. */
  cases: string[];
}

/** People: individuals and teams, the second unit. Each column speaks to its reader as you. Copy from identity.md in Go. */
const AUDIENCES: Audience[] = [
  {
    icon: <User />,
    who: 'For individuals',
    title: 'Personal tools, made to fit.',
    body: 'Build the tools you wish existed. Small or huge, they share one space.',
    cases: [
      'Knowledge: notes, reading, a second brain',
      'Tracking: habits, money, films, health',
      'Research: sources, claims, scores, live',
      'Automation: your scripts and home, with a screen',
    ],
  },
  {
    icon: <Users />,
    who: 'For teams',
    title: 'Centralized data and ops, without limits.',
    body: "Your team's data and ops in one live space, built the way you actually work.",
    cases: [
      'Knowledge: team wikis, BI, research',
      'Dashboards: every data source, live',
      'Ops: every automation and job in one place',
      'Infra: ML runs, pipelines, deploys',
    ],
  },
];

function StartButton({ children = 'Start your space' }: { children?: ReactNode }) {
  return (
    <Button variant="primary" href="#start" arrow>
      {children}
    </Button>
  );
}

/**
 * Audience: who nuspace is for, one group of two units. Agents first, a
 * program playing into a window; then people, individuals and teams side by
 * side, on phones an accordion with one open at a time.
 */
export function Audience() {
  const acc = useAccordion('(max-width: 860px)');
  return (
    <Section
      id="for"
      eyebrow="Who it's for"
      tagline="Build a new form of software."
      description="Designed for the next era, for modern teams with agents at their side."
      layout="subsections"
    >
      <Subsection
        id="agents"
        eyebrow="For agents"
        tagline="It programs your space, live."
        description="Your agent writes a few lines of nu. Each one changes the space as it runs: a new page, a card for every book, a chart that keeps up."
        media={<AgentsDemo />}
        actions={<StartButton>Give your agent a space</StartButton>}
      />
      <Subsection
        id="people"
        eyebrow="For people"
        tagline="Tools for you and your team."
        description="One space, any size: your own tools, or your team's whole stack."
        actions={<StartButton />}
      >
        <ul className={s.grid}>
          {AUDIENCES.map((a, i) => (
            <li key={a.who} className={s.cell} {...acc.item(i)}>
              <button className={s.who} {...acc.head(i)}>
                <span className={s.icon} aria-hidden>
                  {a.icon}
                </span>
                {a.who}
                <ChevronDown className={s.chev} size={18} aria-hidden />
              </button>
              <div className={s.fold}>
                <div className={s.folded}>
                  <h4 className={s.title}>{a.title}</h4>
                  <p className={s.body}>{a.body}</p>
                  <ul className={s.cases}>
                    {a.cases.map((c) => {
                      const [label, rest] = c.includes(': ') ? c.split(': ', 2) : [null, c];
                      return (
                        <li key={c}>
                          {label ? <span className={s.label}>{label}: </span> : null}
                          {rest}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Subsection>
    </Section>
  );
}

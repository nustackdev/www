'use client';

import { ChevronDown, User, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@www/shared/components/controls/Button';
import { Section } from '@www/shared/components/page';
import { useAccordion } from '@www/shared/lib/useAccordion';
import s from './UseCases.module.css';

interface Audience {
  icon: ReactNode;
  /** Who, as the kicker. */
  who: string;
  title: string;
  body: string;
  /** What they build, one line each. A "Label: rest" line sets its label in ink. */
  cases: string[];
}

/** Individuals and teams. Each column speaks to its reader as you. Copy from compass/nuspace/use-cases.md in Go. */
const AUDIENCES: Audience[] = [
  {
    icon: <User />,
    who: 'For individuals',
    title: 'Personal tools, made to fit.',
    body: 'Build the tools you wish existed. Small or huge, they share one space.',
    cases: [
      'Knowledge: notes, reading, a second brain',
      'Tracking: habits, money, films, health',
      'Research: sources, claims, evals',
      'Automation: your scripts and home, with a screen',
    ],
  },
  {
    icon: <Users />,
    who: 'For teams',
    title: 'One space for the whole team.',
    body: 'Data and ops in one space, built the way you work.',
    cases: [
      'Knowledge: wikis, BI, research',
      'Dashboards: every data source, live',
      'Ops: every automation and job in one place',
      'Infra: ML runs, pipelines, deploys',
    ],
  },
];

/**
 * UseCases: what you get, individuals and teams side by side, on phones an
 * accordion with one open at a time.
 */
export function UseCases() {
  const acc = useAccordion('(max-width: 860px)');
  return (
    <Section
      id="use-cases"
      eyebrow="Use cases"
      tagline="Tools for you and your team."
      description="Small enough for one person, big enough for a team."
      actions={
        <Button variant="primary" href="#start" arrow>
          Start your space
        </Button>
      }
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
    </Section>
  );
}

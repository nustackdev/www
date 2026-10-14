import { ArrowUpRight } from 'lucide-react';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { Group } from '@www/shared/components/page';
import s from './HowItWorks.module.css';

interface Layer {
  /** Layer role, eg "The theory". */
  role: string;
  name: string;
  line: string;
  repo: string;
}

const GH = 'https://github.com/nustackdev';

/** The stack, from the base. Copy from identity.md in Go. Each layer links to its repo. */
const LAYERS: Layer[] = [
  {
    role: 'The theory',
    name: 'interaction-model',
    line: 'Every resource is a Ref: a KV slot, a UI widget, an LLM call, a remote object. Everything you do with it is an Interaction.',
    repo: `${GH}/interaction-model`,
  },
  { role: 'The primitive', name: 'nu', line: 'The interaction model implementation in Python.', repo: `${GH}/nu` },
  {
    role: 'The standard library',
    name: 'nustd',
    line: 'Nu Refs and Interactions for everyday tasks.',
    repo: `${GH}/nu/tree/main/pkgs/nustd`,
  },
  {
    role: 'The space',
    name: 'nuspace',
    line: 'A space that runs Nu programs. Every cell is one.',
    repo: `${GH}/nuspace`,
  },
  {
    role: 'The ecosystem',
    name: 'nuverse',
    line: 'Ready made spaces and extensions, one install away.',
    repo: `${GH}/nuverse`,
  },
];

/** HowItWorks — the stack under nuspace, from the theory up to the ecosystem. */
export function HowItWorks() {
  return (
    <Group id="how" kicker="How it works" title="One primitive, all the way down.">
      <div className={s.body}>
        <ol className={s.list}>
          {LAYERS.map((l, i) => (
            <li key={l.name}>
              <a href={l.repo} className={s.row} target="_blank" rel="noreferrer">
                <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
                <span className={s.id}>
                  <span className={s.role}>{l.role}</span>
                  <span className={s.name}>{l.name}</span>
                </span>
                <span className={s.line}>{l.line}</span>
                <span className={s.gh}>
                  <GithubMark size={15} />
                  <span>GitHub</span>
                  <ArrowUpRight className={s.arrow} size={15} strokeWidth={2} aria-hidden />
                </span>
              </a>
            </li>
          ))}
        </ol>
        <p className={s.close}>All speak the same language. That&apos;s why everything connects.</p>
      </div>
    </Group>
  );
}

import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { Section } from '@www/shared/components/page';
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
    line: 'Every resource is a Ref: a KV slot, a UI widget, an LLM endpoint, a remote object. Everything you do with it is an Interaction.',
    repo: `${GH}/interaction-model`,
  },
  { role: 'The primitive', name: 'nu', line: 'The interaction model implementation in Python.', repo: `${GH}/nu` },
  {
    role: 'The standard library',
    name: 'nustd',
    line: 'nu Refs and Interactions for everyday tasks.',
    repo: `${GH}/nu/tree/main/pkgs/nustd`,
  },
  {
    role: 'The space',
    name: 'nuspace',
    line: 'A space that runs nu programs. Every cell is one.',
    repo: `${GH}/nuspace`,
  },
  {
    role: 'The ecosystem',
    name: 'nuverse',
    line: 'Ready made spaces and extensions, one install away.',
    repo: `${GH}/nuverse`,
  },
];

/** HowItWorks — the stack under nuspace, from the theory up to the ecosystem, then the reader's own space on top. */
export function HowItWorks() {
  return (
    <Section
      id="how"
      eyebrow="How it works"
      tagline="One primitive, all the way down."
      lead="nuspace is built on one idea: every resource is a Ref, and everything you do with it is an Interaction. nu implements that idea, and nuspace runs nu programs. Every cell in your space is one."
    >
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
          <li className={s.yours}>
            <a href="#start" className={s.row}>
              <span className={s.plus} aria-hidden>
                <Plus size={16} strokeWidth={2} />
              </span>
              <span className={s.id}>
                <span className={s.role}>On top of it all</span>
                <span className={s.name}>your space</span>
              </span>
              <span className={s.line}>Everything below exists so your space can be anything.</span>
              <span className={s.gh}>
                <span>Start your space</span>
                <ArrowRight className={s.arrowOn} size={15} strokeWidth={2} aria-hidden />
              </span>
            </a>
          </li>
        </ol>
      </div>
    </Section>
  );
}

import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { Section } from '@www/shared/components/page';
import { cn } from '@www/shared/lib/cn';
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
    line: 'A programming model where every resource is a Ref and Interactions are first-class, so you compose logic across systems.',
    repo: `${GH}/interaction-model`,
  },
  { role: 'The primitive', name: 'nu', line: 'The interaction model, implemented in Python.', repo: `${GH}/nu` },
  {
    role: 'The standard library',
    name: 'nustd',
    line: 'Batteries for nu: storage, UI, workers and more, ready to use.',
    repo: `${GH}/nu/tree/main/pkgs/nustd`,
  },
  {
    role: 'The space',
    name: 'nuspace',
    line: 'A space that runs nu programs.',
    repo: `${GH}/nuspace`,
  },
  {
    role: 'The ecosystem',
    name: 'nuverse',
    line: 'Ready-made packages, one install away.',
    repo: `${GH}/nuverse`,
  },
];

interface RowProps {
  /** The rail's node: the layer's number, or the plus. */
  node: ReactNode;
  role: string;
  name: string;
  line: string;
  /** The way in, at the row's end. */
  go: ReactNode;
  href: string;
  external?: boolean;
}

/** One row: the rail (line, node, line) beside the layer's content. */
function Row({ node, role, name, line, go, href, external }: RowProps) {
  return (
    <a href={href} className={s.row} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      <span className={s.rail} aria-hidden>
        <span className={s.seg} />
        <span className={s.node}>{node}</span>
        <span className={s.seg} />
      </span>
      <span className={s.content}>
        <span className={s.id}>
          <span className={s.role}>{role}</span>
          <span className={s.name}>{name}</span>
        </span>
        <span className={s.line}>{line}</span>
        <span className={s.gh}>{go}</span>
      </span>
    </a>
  );
}

/** HowItWorks — the stack under nuspace, from the theory up to the ecosystem, then the reader's own space on top. */
export function HowItWorks() {
  return (
    <Section
      id="stack"
      eyebrow="The stack"
      tagline="One primitive, all the way down."
      lead="nuspace sits on a small stack, each layer its own repo, from the theory at the base to the ecosystem on top."
    >
      <ol className={s.list}>
        {LAYERS.map((l, i) => (
          <li key={l.name} className={s.item}>
            <Row
              node={<span className={s.num}>{String(i + 1).padStart(2, '0')}</span>}
              role={l.role}
              name={l.name}
              line={l.line}
              href={l.repo}
              external
              go={
                <>
                  <GithubMark size={16} />
                  <span>GitHub</span>
                  <ArrowUpRight className={s.arrow} size={16} strokeWidth={2} aria-hidden />
                </>
              }
            />
          </li>
        ))}
        <li className={cn(s.item, s.yours)}>
          <Row
            node={
              <span className={s.plus}>
                <Plus size={16} strokeWidth={2} />
              </span>
            }
            role="On top of it all"
            name="your space"
            line="Everything below exists so your space can be anything."
            href="#start"
            go={
              <>
                <span>Start your space</span>
                <ArrowRight className={s.arrowOn} size={16} strokeWidth={2} aria-hidden />
              </>
            }
          />
        </li>
      </ol>
    </Section>
  );
}

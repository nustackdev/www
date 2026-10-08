import type { ReactNode } from 'react';
import { Section, SectionCell } from '../page';
import type { SectionHue, SectionSplit } from '../page/Section';
import type { Hue } from '../../lib/hue';
import s from './SnippetBeat.module.css';

/** Fabric hue applied as a color scope to the code column only. */
export type SnippetBeatHue = Hue;

/** Two-column beat ratio. "1/1" is the fabric/use-case default; "45/55"
 *  is used by pages that want the code column to breathe (virtuals, spec). */
export type SnippetBeatRatio = Extract<SectionSplit, '1/1' | '45/55'>;

/** Which side the code column sits on. Prose takes the opposite side. */
export type SnippetBeatSide = 'left' | 'right';

export interface SnippetBeatProps {
  /** Prose column content — typically Heading + Description(s). */
  prose: ReactNode;
  /** Code column content — typically a <CodeSample />. */
  code: ReactNode;
  /** Column ratio. Default "1/1". */
  ratio?: SnippetBeatRatio;
  /** Code column side. Default "right". */
  side?: SnippetBeatSide;
  /** Optional hue scope for the code column (colors CodeSample tokens). */
  hue?: SnippetBeatHue;
  /** Optional hue for the surrounding Section (buttons, links, etc.). */
  sectionHue?: SectionHue;
  className?: string;
}

/**
 * SnippetBeat — the shared "prose + code side-by-side" chapter beat used
 * across fabric, tool, use-case, and spec pages. Wraps a `<Section split>`
 * with two `<SectionCell>`s and applies the fabric hue as a color scope on
 * the code column so the CodeSample picks up the page hue without any
 * per-page CSS.
 *
 * Callers pass the two sides via `prose` and `code` slots — the flat API
 * composes cleaner than compound children for a two-slot component.
 *
 * Layout:
 *   ratio="1/1"   → 1:1 columns (fabric/http/kv/nulog default).
 *   ratio="45/55" → 45:55 columns (virtuals + spec — code breathes).
 *   side="left"   → code first, prose second.
 *   side="right"  → prose first, code second (default).
 */
export function SnippetBeat({
  prose,
  code,
  ratio = '1/1',
  side = 'right',
  hue,
  sectionHue,
  className,
}: SnippetBeatProps) {
  // "45/55" places the smaller (45fr) column first. When code should sit
  // on the left we swap to "55/45" so the code column stays the wider one.
  const split: SectionSplit =
    ratio === '45/55' ? (side === 'left' ? '55/45' : '45/55') : '1/1';

  const proseCell = (
    <SectionCell key="prose">
      <div className={s.col}>{prose}</div>
    </SectionCell>
  );

  const codeCell = (
    <SectionCell key="code">
      <div className={`${s.col} ${s.codeScope}`} data-hue={hue}>
        {code}
      </div>
    </SectionCell>
  );

  return (
    <Section split={split} hue={sectionHue} className={className}>
      {side === 'left' ? [codeCell, proseCell] : [proseCell, codeCell]}
    </Section>
  );
}

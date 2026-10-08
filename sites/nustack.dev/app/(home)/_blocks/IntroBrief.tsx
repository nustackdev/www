import { BookOpen } from 'lucide-react';
import { Chapter, Section, SectionCell, SectionHead } from '@/components/page';
import { Stack } from '@www/shared/components/layout/Stack';
import { CtaRow } from '@www/shared/components/layout/CtaRow';
import { Heading, Tagline, Description, Quote } from '@www/shared/components/text';
import { MonoKicker } from '@www/shared/components/meta/MonoKicker';
import { Button, ButtonRepoLabel } from '@www/shared/components/controls/Button';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import s from './IntroBrief.module.css';

/**
 * IntroBrief — the "How Nu works" chapter. Orientation prose that names
 * the vocabulary the reader has already been feeling in Capabilities
 * (Ref, Interaction, Fabric), then hands off to the model spec and the
 * Python implementation via two closer cards.
 */
export function IntroBrief() {
  return (
    <Chapter>
      <SectionHead
        title="How Nu works."
        lede={<>The primitive Nu is built on, in three words.</>}
      />

      <Section>
        <div className={s.body}>
          <Description>
            A tiny script keeps its values in memory and calls
            functions on them. Real apps don&apos;t stay there. Values
            live in a database, arrive from a browser form, render into
            a dashboard, get recomputed by a background job. Almost
            none of the code is about the values anymore &mdash;
            it&apos;s all interaction between systems.
          </Description>

          <Quote>
            Nu makes interaction <em>the primitive.</em>
          </Quote>

          <dl className={s.vocab}>
            <div className={s.vocabItem}>
              <dt>Ref</dt>
              <dd>
                A name for a value, wherever it lives &mdash; a KV
                slot, a UI text block, an LLM endpoint, a remote
                object.
              </dd>
            </div>
            <div className={s.vocabItem}>
              <dt>Interaction</dt>
              <dd>
                What you do with a Ref: read, write, branch, iterate,
                compose.
              </dd>
            </div>
            <div className={s.vocabItem}>
              <dt>Fabric</dt>
              <dd>
                Binds Refs to a real system. Compose as many as you
                need; they all speak the same primitive.
              </dd>
            </div>
          </dl>

          <Quote>
            <em>Same primitive, different system.</em>{' '}One Ref for
            any resource, one Interaction for any op. Setting a
            browser text block is the same interaction as setting a
            KV slot.
          </Quote>
        </div>
      </Section>

      {/* Closer — theory + implementation */}
      <Section split="1/1">
        <SectionCell>
          <Stack gap="normal" pushLast>
            <div className={s.closerCardTitle}>
              <Heading level={2}>interaction-model</Heading>
              <MonoKicker as="span" size="xs" tracking="wide">
                the theory
              </MonoKicker>
            </div>
            <Tagline>The language-agnostic specification.</Tagline>
            <Description>
              What an interaction is, how Refs name locations, how
              Interactions compose into programs. Nu is one
              implementation; anyone can build another.
            </Description>
            <CtaRow>
              <Button href="https://github.com/nustackdev/interaction-model">
                <GithubMark size={14} />
                <ButtonRepoLabel>nustackdev/interaction-model</ButtonRepoLabel>
              </Button>
            </CtaRow>
          </Stack>
        </SectionCell>
        <SectionCell>
          <Stack gap="normal" pushLast>
            <div className={s.closerCardTitle}>
              <Heading level={2}>nu</Heading>
              <MonoKicker as="span" size="xs" tracking="wide">
                the python implementation
              </MonoKicker>
            </div>
            <Tagline>Batteries-included, ready to run.</Tagline>
            <Description>
              The interaction model in pure Python, with fabrics for
              the everyday jobs: in-memory state, kv-based state, UI,
              network, cluster compute.
            </Description>
            <CtaRow>
              <Button href="/docs">
                <BookOpen size={14} aria-hidden />
                <span>Quickstart</span>
              </Button>
              <Button href="https://github.com/nustackdev/nu">
                <GithubMark size={14} />
                <ButtonRepoLabel>nustackdev/nu</ButtonRepoLabel>
              </Button>
            </CtaRow>
          </Stack>
        </SectionCell>
      </Section>
    </Chapter>
  );
}

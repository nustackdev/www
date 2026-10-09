import { BookOpen } from 'lucide-react';
import { SilverWovenName } from '@www/shared/components/meta/SilverWovenName';
import { VizFrame } from '@www/shared/components/media/VizFrame';
import { MonoKicker } from '@www/shared/components/meta/MonoKicker';
import { Description } from '@www/shared/components/text';
import { CommandLine } from '@www/shared/components/media/CommandLine';
import { LinkCard } from '@www/shared/components/controls/LinkCard';
import { Stack } from '@www/shared/components/layout/Stack';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { Chapter, Section, SectionHead } from '@/components/page';
import s from './nu.module.css';

/** SeeNuLive — install, run a demo, start hacking. Moved from the old landing. */
export function SeeNuLive() {
  return (
    <Chapter>
      <SectionHead
        title="See Nu live."
        lede={<>Install, run a demo, start hacking.</>}
      />

      {/* Step 1 — install */}
      <Section>
        <Stack gap="normal">
          <MonoKicker as="p" size="xs" tracking="wider" className={s.stepLabel}>
            <strong>01</strong> Install
          </MonoKicker>
          <MonoKicker as="p" size="xs" tracking="wide">
            Python 3.10+ &middot; everything ships in the wheel
          </MonoKicker>
          <CommandLine command='pip install nucli "nustd[all]"' />
        </Stack>
      </Section>

      {/* Step 2 — pick a demo */}
      <Section>
        <Stack gap="normal">
          <MonoKicker as="p" size="xs" tracking="wider" className={s.stepLabel}>
            <strong>02</strong> Run a demo
          </MonoKicker>
          <div className={s.demoGrid}>
            <div className={s.demoCard} data-hue="teal">
              <VizFrame hue="teal">
                <img className={s.demoCover} src="/demos/counter.png" alt="counter demo" />
              </VizFrame>
              <SilverWovenName as="h3" hue="teal" className={s.demoName}>counter</SilverWovenName>
              <Description>A live counter, persistent across restarts.</Description>
              <CommandLine command="nu demo counter" />
            </div>
            <div className={s.demoCard} data-hue="sage">
              <VizFrame hue="sage">
                <img className={s.demoCover} src="/demos/sampled.png" alt="sampled demo" />
              </VizFrame>
              <SilverWovenName as="h3" hue="sage" className={s.demoName}>sampled</SilverWovenName>
              <Description>An infinite series, live-sampled into a fixed-size chart.</Description>
              <CommandLine command="nu demo sampled" />
            </div>
            <div className={s.demoCard} data-hue="plum">
              <VizFrame hue="plum">
                <img className={s.demoCover} src="/demos/movies.png" alt="movies demo" />
              </VizFrame>
              <SilverWovenName as="h3" hue="plum" className={s.demoName}>movies</SilverWovenName>
              <Description>A movie tracker: form, filterable table, detail pages.</Description>
              <CommandLine command="nu demo movies" />
            </div>
          </div>
        </Stack>
      </Section>

      {/* Step 3 — learn */}
      <Section>
        <Stack gap="normal">
          <MonoKicker as="p" size="xs" tracking="wider" className={s.stepLabel}>
            <strong>03</strong> Start hacking
          </MonoKicker>
          <div className={s.learnGrid}>
            <LinkCard href="/docs/nu" icon={<BookOpen size={14} />} title="Read the docs">
              Tutorials, how-tos, and the fabric reference.
            </LinkCard>
            <LinkCard
              href="https://github.com/nustackdev/nu/tree/main/examples"
              icon={<GithubMark size={14} />}
              title="Browse examples"
            >
              Full source for every demo, plus more programs to steal from.
            </LinkCard>
          </div>
        </Stack>
      </Section>
    </Chapter>
  );
}

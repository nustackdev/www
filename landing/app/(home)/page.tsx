import { BookOpen } from 'lucide-react';
import { SilverWovenName } from '@www/shared/components/meta/SilverWovenName';
import { VizFrame } from '@www/shared/components/media/VizFrame';
import { MonoKicker } from '@www/shared/components/meta/MonoKicker';
import { Description } from '@www/shared/components/text';
import { CommandLine } from '@www/shared/components/media/CommandLine';
import { LinkCard } from '@www/shared/components/controls/LinkCard';
import { Stack } from '@www/shared/components/layout/Stack';
import { CtaRow } from '@www/shared/components/layout/CtaRow';
import { Button } from '@www/shared/components/controls/Button';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { Table } from '@www/shared/components/media/Table';
import {
  Page,
  Body,
  Chapter,
  Section,
  SectionHead,
} from '@/components/page';
import { LikeThisBlock } from '@/components/chapters/LikeThisBlock';
import { HERO_BLOBS } from '@www/shared/components/bg/GradientBlobs';
import { Hero } from './_blocks/Hero';
import { Capabilities } from './_blocks/Capabilities';
import { IntroBrief } from './_blocks/IntroBrief';
import { FABRICS } from '@www/shared/lib/stack/fabrics';
import { TOOLS } from '@www/shared/lib/stack/tools';
import s from './page.module.css';

/** Representative interaction hint per fabric — a short line that reads as
 * "you are DOING something with a Ref," not just naming a type. Distilled
 * from nu/examples/*.py. Kept local while we settle on the wording; move
 * into the canonical Fabric spec once confirmed. */
const FABRIC_PRIMARY: Record<string, string> = {
  kv: 'State.movies.append(m)',
  ui: 'Dashboard.count.set_value(n)',
  cluster: 'Teleport(Add(1,2), "gpu")',
  llm: 'Bot.chat(prompt="…")',
  mem: 'Users.age.set(12)',
  proxy: 'Proxy(Nav, "10.0.0.1")',
  http: 'Solana.get_slot()',
  service: 'Calc.add(a=2, b=3)',
  cc: 'Agent.ask(prompt="…")',
  mp: 'Teleport(Add(1,2), "worker")',
};

export default function Home() {
  return (
    <Page className={s.landingRoot} gradientBlobs={HERO_BLOBS}>
      <Hero />

      <Body>
        {/* 2. Capabilities — "Build with Nu" — 4 capability cards */}
        <Capabilities />

        {/* 3. See Nu live — install, run a demo, take it further */}
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
            <CommandLine command='pip install nucore "nustd[all]" nucli' />
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
              <LinkCard href="/docs" icon={<BookOpen size={14} />} title="Read the docs">
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

        {/* 4. How Nu works — the crack, the primitive, the vocab, and hand-off to model + impl */}
        <IntroBrief />

        {/* 5. Fabrics */}
        <Chapter>
        <SectionHead
          title="Fabrics."
          lede={
            <>
              Each fabric gives your Nu app a new capability. These are the
              ones Nu ships with today.
            </>
          }
        />

        <Section>
          <Stack gap="normal">
            <Table
              variant="list"
              ariaLabel="Fabrics that ship with Nu"
              rows={FABRICS}
              rowKey={(f) => f.slug}
              rowHref={(f) => f.href}
              rowHue={(f) => f.hue}
              columns={[
                {
                  key: 'name',
                  width: 'minmax(9rem, 12rem)',
                  variant: 'mono',
                  render: (f) => f.name,
                },
                {
                  key: 'desc',
                  width: 'minmax(0, 1fr)',
                  render: (f) => f.navDesc,
                },
                {
                  key: 'primary',
                  width: 'minmax(14rem, auto)',
                  variant: 'chip',
                  align: 'end',
                  render: (f) => FABRIC_PRIMARY[f.slug] ?? '—',
                },
              ]}
            />
            <CtaRow>
              <Button href="/stack/nustd" variant="outline">
                <span>Explore all fabrics</span>
              </Button>
            </CtaRow>
          </Stack>
        </Section>
        </Chapter>

        {/* 6. Under the hood — the standalone Python libs Nu is built on. */}
        <Chapter>
        <SectionHead
          title="Under the hood."
          lede={<>Standalone Python libraries Nu is built on. Each is useful on its own.</>}
        />
        <Section>
          <div className={s.underGrid}>
            {TOOLS.map((t) => (
              <div key={t.slug} className={s.underItem}>
                <h3 className={s.underName}>{t.name}</h3>
                <p className={s.underTagline}>{t.tagline}</p>
                <a
                  href={t.github}
                  target="_blank"
                  rel="noreferrer"
                  className={s.underRepo}
                >
                  <GithubMark size={12} />
                  <span>{t.repo}</span>
                </a>
              </div>
            ))}
          </div>
        </Section>
        </Chapter>

        {/* 7. Like what you see — closing CTA to turn readers into followers. */}
        <LikeThisBlock />

      </Body>
    </Page>
  );
}

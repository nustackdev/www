import { CommandLine } from '@www/shared/components/media/CommandLine';
import { Description } from '@www/shared/components/text';
import { CtaRow } from '@www/shared/components/layout/CtaRow';
import { Button } from '@www/shared/components/controls/Button';
import { GainGrid, type GainItem } from '@www/shared/components/chapters/GainGrid';
import { CatalogueGrid, CatalogueCard } from '@www/shared/components/chapters/CatalogueGrid';
import { HERO_BLOBS } from '@www/shared/components/bg/GradientBlobs';
import { Page, Body, Chapter, Section, SectionHead } from '@/components/page';
import { TIERS, STACK } from '@www/shared/lib/stack/stack';
import { Hero } from './_blocks/hero/Hero';
import { Stats, type Stat } from './_blocks/Stats';
import { Closing } from './_blocks/Closing';
import s from './page.module.css';

/** The parts of a space, OS style. */
const PARTS: GainItem[] = [
  { kicker: 'Store', title: 'One store.', body: 'Shared state anyone opens and writes. A counter or a billion rows.' },
  { kicker: 'Kernel', title: 'Programs run in it.', body: 'Every cell is a program. Workers, processes or a cluster, same code.' },
  { kicker: 'Shell', title: 'Everything on screen.', body: 'A web UI that draws every plane. Open tabs stay in sync.' },
  { kicker: 'Agents', title: 'Same access as you.', body: 'Agents open the store and write programs, the way you do.' },
];

/** The agents case study, as numbers. */
const PROOF: Stat[] = [
  { value: '15 min', label: 'to build a town' },
  { value: '1 hr', label: 'to build a zoo' },
  { value: '189', label: 'planes, 130 species' },
  { value: '0', label: 'wires between the parts' },
];

/** What an information base needs. */
const NEEDS: GainItem[] = [
  { hue: 'crimson', title: 'Any data.', body: 'From machines, people and agents, stored and read one way.' },
  { hue: 'amber', title: 'Linear.', body: 'Who wrote what, when, and from which run.' },
  { hue: 'sage', title: 'Continuous.', body: 'Added, enriched, connected. Slots react and recompute.' },
  { hue: 'teal', title: 'Visible.', body: 'Navigate it, view it, render it.' },
  { hue: 'indigo', title: 'Programmable.', body: 'Not CRUD. A Turing complete language over the data.' },
  { hue: 'plum', title: 'Shared.', body: 'People, machines and agents work in it the same way.' },
];

/** The ladder, top of each tier only: model, Nu, nuspace. */
const LADDER = TIERS.slice()
  .reverse()
  .map((t) => ({ tier: t, item: STACK.find((x) => x.tier === t.tier)! }));

export default function Home() {
  return (
    <Page gradientBlobs={HERO_BLOBS}>
      <Hero />

      <Body>
        <Chapter>
          <SectionHead
            title="Store, kernel, shell."
            lede={<>A space is an OS for information. You and your agents are its users.</>}
          />
          <Section>
            <GainGrid hue="teal" cols={2} items={PARTS} />
          </Section>
        </Chapter>

        <Chapter>
          <SectionHead
            title="8 agents. One space."
            lede={<>A shared store and no other channel. Here is what they built.</>}
          />
          <Section>
            <Stats items={PROOF} />
          </Section>
          <Section>
            <CtaRow>
              <Button variant="outline" href="/spaces">
                <span>See the spaces</span>
              </Button>
            </CtaRow>
          </Section>
        </Chapter>

        <Chapter>
          <SectionHead
            title="Data plus compute."
            lede={<>Information points and reacts. Pointing needs refs, reacting needs compute.</>}
          />
          <Section>
            <GainGrid cols={3} items={NEEDS} />
          </Section>
        </Chapter>

        <Chapter>
          <SectionHead
            title="Runs on Nu."
            lede={<>Unix makes everything a file. nuspace makes everything a ref.</>}
          />
          <Section>
            <CatalogueGrid>
              {LADDER.map(({ tier, item }) => (
                <CatalogueCard
                  key={item.slug}
                  href={item.href}
                  name={item.name}
                  hue={item.hue}
                  tagline={tier.name}
                  description={item.navDesc}
                />
              ))}
            </CatalogueGrid>
          </Section>
          <Section>
            <CtaRow>
              <Button variant="outline" href="/stack">
                <span>The whole stack</span>
              </Button>
            </CtaRow>
          </Section>
        </Chapter>

        <Chapter id="start">
          <SectionHead
            title="Start a space."
            lede={<>A space is a directory on your machine.</>}
          />
          <Section>
            <ol className={s.steps}>
              <li className={s.step}>
                <span className={s.stepNum}>01 Install</span>
                <CommandLine command="pip install nuspace" />
              </li>
              <li className={s.step}>
                <span className={s.stepNum}>02 Serve</span>
                <CommandLine command="nuspace serve my.nuspace" />
              </li>
              <li className={s.step}>
                <span className={s.stepNum}>03 Build</span>
                <Description>
                  Opens on 127.0.0.1:8080. Press <code>/</code> on a plane to
                  add a cell, or point an agent at it.
                </Description>
              </li>
            </ol>
          </Section>
        </Chapter>

        <Closing />
      </Body>
    </Page>
  );
}

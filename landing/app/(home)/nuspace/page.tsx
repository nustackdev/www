import { Box } from 'lucide-react';
import { Cell } from '@www/shared/components/grid/Cell';
import { CellContent } from '@www/shared/components/grid/CellContent';
import { Row } from '@www/shared/components/grid/Row';
import { Button, ButtonRepoLabel } from '@www/shared/components/controls/Button';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { NuLogo } from '@www/shared/components/marks/NuLogo';
import { NuspaceMockSvg } from '@www/shared/components/marks/NuspaceMock';
import { VizFrame } from '@www/shared/components/media/VizFrame';
import { CommandLine } from '@www/shared/components/media/CommandLine';
import { MonoKicker } from '@www/shared/components/meta/MonoKicker';
import { Meta } from '@www/shared/components/meta/Meta';
import { GainGrid, type GainItem } from '@www/shared/components/chapters/GainGrid';
import { Stack } from '@www/shared/components/layout/Stack';
import { Description } from '@www/shared/components/text';
import { HERO_BLOBS } from '@www/shared/components/bg/GradientBlobs';
import { Page, Body, Chapter, Section, SectionHead } from '@/components/page';
import { pageOG, ogPageImage } from '@/lib/og';
import { PAGE_OG } from '@/lib/og-pages';
import s from './page.module.css';

const REPO_URL = 'https://github.com/nustackdev/nuspace';

export const metadata = pageOG({
  title: PAGE_OG.nuspace.title,
  description: PAGE_OG.nuspace.description,
  image: ogPageImage('nuspace'),
  path: '/nuspace',
});

const ALIVE: GainItem[] = [
  {
    hue: 'teal',
    title: 'It reacts.',
    body: <>Live isn&apos;t a websocket someone wired up for one screen. Every value in the space can be reacted to by anything else, so all of it is live.</>,
  },
  {
    hue: 'sage',
    title: 'It remembers.',
    body: <>Every write is persisted, in a transaction, as it happens. Storage is sharded by design, so a cell holds a billion rows the same way it holds a counter.</>,
  },
  {
    hue: 'cyan',
    title: 'It draws.',
    body: <>A cell puts text, tables, charts and forms on screen the same way it saves a value, and every open tab stays in sync.</>,
  },
  {
    hue: 'indigo',
    title: 'It scales.',
    body: <>The same program runs in a worker, across processes or on a cluster, without changing shape.</>,
  },
  {
    hue: 'violet',
    title: 'It grows.',
    body: <>The kernel only runs things. Everything else is built from cells, even the system. Nothing you can&apos;t extend or replace.</>,
  },
  {
    hue: 'plum',
    title: 'It is programmable.',
    body: <>It doesn&apos;t offer an API, it is one. People and agents write programs with the same reach. Not a menu of calls: a language.</>,
  },
];

export default function NuspacePage() {
  return (
    <Page gradientBlobs={HERO_BLOBS}>
      <Row template="minmax(0, 1fr) minmax(0, 1fr)" divider={false} stackAt="sm" className={s.heroRow}>
        <Cell yalign="middle">
          <CellContent pad="lg">
            <div className={s.heroLeft}>
              <h1 className={s.title}>
                <NuLogo size="0.8em" className={s.titleMark} />
                nuspace
              </h1>
              <p className={s.tagline}>
                A live computing space for your notes, data, tools and agents.
              </p>
              <Description>
                Everything in it is built from cells. A cell can be anything: a note,
                a table, a chart, a job, an agent at work. Every cell is a running
                program. It keeps its state, talks to the rest of the space and draws
                itself on screen.
              </Description>
              <div className={s.ctaRow}>
                <Button variant="solid" href="#try">
                  <Box size={14} aria-hidden />
                  <span>Try it</span>
                </Button>
                <Button variant="solidAlt" href={REPO_URL}>
                  <GithubMark size={14} />
                  <ButtonRepoLabel>nustackdev/nuspace</ButtonRepoLabel>
                </Button>
              </div>
              <MonoKicker as="p" size="xs" tracking="wide">
                <Meta items={['Self-hosted', <>AGPL&#8209;3.0</>, 'Early']} />
              </MonoKicker>
            </div>
          </CellContent>
        </Cell>
        <Cell yalign="middle">
          <CellContent pad="lg">
            <VizFrame surface="glass">
              <NuspaceMockSvg />
            </VizFrame>
          </CellContent>
        </Cell>
      </Row>

      <Body>
        <Chapter>
          <SectionHead
            title="Alive, all the way down."
            lede={<>Every cell gets all of this, from the first note to the billionth row.</>}
          />
          <Section>
            <GainGrid items={ALIVE} cols={3} />
          </Section>
        </Chapter>

        <Chapter>
          <SectionHead
            title="It is made of itself."
            lede={<>There is no outside.</>}
          />
          <Section>
            <div className={s.prose}>
              <Description>
                The services that keep your space running, the operations that change
                it, the screens you use it through: all written in the same language
                your cells speak. So a cell can do anything nuspace can. Build a plane.
                Start a job. Rewrite a service. So can an agent.
              </Description>
              <p className={s.pull}>
                nuspace is a complete computer that can reprogram itself while it runs.
              </p>
            </div>
          </Section>
        </Chapter>

        <Chapter>
          <SectionHead
            title="Why it works."
            lede={<>One primitive on different fabrics.</>}
          />
          <Section>
            <Stack gap="normal">
              <Description>
                nuspace is built on Nu and runs Nu, where everything is an interaction.
                Reading a disk, drawing a table, running a job, calling a model: same
                primitive, different place. Persistence, reactivity, interfaces and
                distribution aren&apos;t four systems glued together. That is why every
                cell gets all of them for free, and why the space can keep growing
                without falling apart.
              </Description>
              <div className={s.ctaRow}>
                <Button variant="outline" href="/">
                  <NuLogo size={14} />
                  <span>Meet Nu</span>
                </Button>
              </div>
            </Stack>
          </Section>
        </Chapter>

        <Chapter id="try">
          <SectionHead
            title="Try it."
            lede={<>Your space is a directory on your machine.</>}
          />
          <Section>
            <Stack gap="normal">
              <MonoKicker as="p" size="xs" tracking="wider" className={s.stepLabel}>
                <strong>01</strong> Install
              </MonoKicker>
              <CommandLine command="pip install nuspace" />
              <MonoKicker as="p" size="xs" tracking="wider" className={s.stepLabel}>
                <strong>02</strong> Serve a space
              </MonoKicker>
              <CommandLine command="nuspace serve my.nuspace" />
              <Description>
                A browser opens on 127.0.0.1:8080 and your space is alive. Press{' '}
                <code>/</code> on a plane to add a cell. Planes and snippets come from
                nuverse, installed alongside. Bring your own and they live in the space
                like everything else.
              </Description>
            </Stack>
          </Section>
        </Chapter>
      </Body>
    </Page>
  );
}

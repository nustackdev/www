import type { Metadata } from 'next';
import {
  Page,
  Body,
  Header,
  Chapter,
  Section,
  SectionHead,
} from '@/components/page';
import { Description } from '@www/shared/components/text';
import { TryIt } from '@/components/chapters/TryIt';
import { LikeThisBlock } from '@/components/chapters/LikeThisBlock';
import { AuthorQuote } from '@www/shared/components/chapters/AuthorQuote';
import { pageOG, ogPageImage } from '@/lib/og';
import { PAGE_OG } from '@/lib/og-pages';

export const metadata: Metadata = pageOG({
  title: PAGE_OG.about.title,
  description: PAGE_OG.about.description,
  image: ogPageImage('about'),
  path: '/about',
});

/**
 * /about — trust page. Personal, first-person, written by Gor.
 * The full story (Aim, the wilderness, the cascade) lives in a
 * separate long post. This page is the compressed version: how Nu
 * started, what the belief is, where it is going.
 */
export default function AboutPage() {
  return (
    <Page>
      <Header
        title="About."
        lede={<>How Nu started, what it is, where it goes.</>}
      />

      <Body>
        {/* 1. How Nu started — first-person voice, framed as editorial quote. */}
        <Chapter>
          <SectionHead
            title="How Nu started."
            lede={<>Two years of refactoring before the shape settled.</>}
          />
          <Section>
            <AuthorQuote
              name="Gor Arakelyan"
              role="Author of Nu"
              avatarSrc="/gor.png"
              avatarAlt="Gor Arakelyan"
              handle="arkkln"
              paragraphs={[
                <>
                  Nu started in fall 2024 as a handful of primitives I kept
                  pulling out of a real system I was building. State
                  handling did not fit any of the alternatives at the shape
                  of data I was moving, so I isolated my own. Then
                  execution — a small in-process engine for composing
                  functions into flows. Small pieces, growing.
                </>,
                <>
                  January 2025 I split those pieces out into their own
                  repo. That is the moment Nu officially began. What
                  followed was over 1.5 years of refactoring on a daily basis
                  (hundreds of interface shapes, several rewrites from
                  scratch) while a live system ran on top of it and pushed
                  back on every wrong turn.
                </>,
                <>
                  Somewhere in that stretch I stopped calling it a library
                  and started calling it a primitive. Nu 0.1 is what came
                  out.
                </>,
              ]}
            />
          </Section>
        </Chapter>

        {/* 2. Why — the belief / thesis behind Nu. */}
        <Chapter>
          <SectionHead
            title="Why Nu."
            lede={
              <>
                Software today is a stack of layers glued together. Nu says
                the glue should be the primitive, not the plumbing.
              </>
            }
          />
          <Section>
            <Description>
              Every real program touches many worlds: a database, a UI, a
              network, a compute cluster, an LLM. Today each of those speaks
              its own language, so most of the code you write is translation
              between them. Serialization, retries, protocol matching, type
              mapping. The work the program is actually for gets buried
              underneath.
            </Description>
            <Description>
              Nu collapses the picture. Every resource gets a Ref (a name for
              what you touch). Every operation is an Interaction (a
              description of what to do with it). Fabrics execute. Same
              vocabulary whether the Ref points to memory, a KV row, a
              browser widget, a remote object, or a worker on a cluster. The
              picture flips from a stack to a hub: one program at the
              center, many worlds around it, no glue between them.
            </Description>
            <Description>
              That is the bet. If interaction is the primitive, the
              translation work falls away and biz logic gets its own layer
              back.
            </Description>
          </Section>
        </Chapter>

        {/* 3. Where it is going — the arc, next 6-12 months, in the reader's terms. */}
        <Chapter>
          <SectionHead
            title="Where this is going."
            lede={
              <>
                A real system runs on it. The next stretch is opening the
                door for other people to run their systems on it too.
              </>
            }
          />
          <Section>
            <Description>
              Nu 0.1 is what shipped. Five fabrics (memory, KV, UI, network,
              cluster), one install, examples that boot. Underneath, a live
              production system already runs on it (a terabyte a day, thirty
              distributed workers, ten sharded databases). That system is
              the ground truth I build against.
            </Description>
            <Description>
              What is stable: the interaction model, the Ref and Interaction
              vocabulary, the fabric shape. What will keep moving: fabric
              coverage, ergonomics, the apps built on top.
            </Description>
          </Section>
        </Chapter>

        {/* 4. Try it — install / demo / examples row. */}
        <TryIt />

        {/* 5. Like this — closing community CTA. */}
        <LikeThisBlock />
      </Body>
    </Page>
  );
}

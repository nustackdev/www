import {
  Page,
  Header,
  Body,
  Chapter,
  Section,
  SectionHead,
} from '@/components/page';
import { Description, Label } from '@www/shared/components/text';
import { CodeSample } from '@www/shared/components/media/CodeSample';
import { Button } from '@www/shared/components/controls/Button';
import { LinkCard } from '@www/shared/components/controls/LinkCard';
import { LinkGrid } from '@www/shared/components/layout/LinkGrid';
import { CtaRow } from '@www/shared/components/layout/CtaRow';
import { Stack } from '@www/shared/components/layout/Stack';
import { GainGrid } from '@www/shared/components/chapters/GainGrid';
import { LikeThisBlock } from '@/components/chapters/LikeThisBlock';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { PageBadge } from '@www/shared/components/meta/PageBadge';
import { RelationsLine } from '@/components/meta/RelationsLine';
import { TOOL } from '@/lib/tools';
import { FABRIC } from '@/lib/fabrics';

import { pageOG, ogToolImage } from '@/lib/og';

export const metadata = pageOG({
  title: 'Invisibles: transparent remote objects for Python',
  description:
    'Move a Python object to another process or node. The code that calls it does not change.',
  image: ogToolImage('invisibles'),
  path: '/tools/invisibles',
});

import { ToolJsonLd } from '@/components/meta/ToolJsonLd';

export default function InvisiblesPage() {
  return (
    <Page>
      <ToolJsonLd slug="invisibles" />
      <Header
        meta={<PageBadge kind="tool" name="invisibles" hue={TOOL.invisibles.hue} />}
        tags={
          <>
            <RelationsLine label="Powered by" refs={TOOL.invisibles.poweredBy} />
            <RelationsLine label="Powers" refs={TOOL.invisibles.powers} />
          </>
        }
        title="Same object, different machine."
        lede={
          <>
            Move a Python object to another process or node. The code that
            calls it does not change.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="solid" href={TOOL.invisibles.github} external>
              <GithubMark size={14} />
              <span>See on GitHub</span>
            </Button>
            <Button variant="outline" href={TOOL.invisibles.examples} external>
              <GithubMark size={14} />
              <span>Browse examples</span>
            </Button>
          </CtaRow>
        }
      />

      <Body>
        {/* What it is. */}
        <Chapter>
          <SectionHead
            title="What it is"
            lede={
              <>
                A transparent RPC proxy. Call methods on the proxy; they run on
                the remote object and return the result. Sync stays sync. Async
                stays async.
              </>
            }
          />
          <Section hue={TOOL.invisibles.hue}>
            <Stack gap="normal">
              <Description>
                No base class. No schema file. No stubs to generate. Expose any
                Python object; the proxy matches its API exactly.
              </Description>
              <CodeSample
                filename="usage.py"
                lang="python"
                langShort="py"
                lines={[
                  [{ c: 'cmt', t: '# local' }],
                  [{ t: 'result = service.' }, { c: 'nu', t: 'add' }, { t: '(5, 3)' }],
                  [{ t: 'data = ' }, { c: 'kw', t: 'await' }, { t: ' service.' }, { c: 'nu', t: 'fetch' }, { t: '(' }, { c: 'str', t: '"key"' }, { t: ')' }],
                  [],
                  [{ c: 'cmt', t: '# remote, identical' }],
                  [{ t: 'result = proxy.' }, { c: 'nu', t: 'add' }, { t: '(5, 3)' }],
                  [{ t: 'data = ' }, { c: 'kw', t: 'await' }, { t: ' proxy.' }, { c: 'nu', t: 'fetch' }, { t: '(' }, { c: 'str', t: '"key"' }, { t: ')' }],
                ]}
              />
              <Label>
                Iterators, context managers, operators, exceptions, nested
                returns. All work over the wire.
              </Label>
            </Stack>
          </Section>
        </Chapter>

        {/* What you get. */}
        <Chapter>
          <SectionHead
            title="What you get."
            lede={
              <>
                Three properties that hold whether the object lives here or
                across the wire.
              </>
            }
          />
          <Section>
            <GainGrid
              hue={TOOL.invisibles.hue}
              cols={3}
              items={[
                {
                  title: 'Any object',
                  body: 'Expose a service without inheriting anything. Existing code becomes remote without a rewrite.',
                },
                {
                  title: 'Sync and async, native',
                  body: 'Two connection channels do what they are good at: a sync pump for sync methods, an async loop for async methods.',
                },
                {
                  title: 'Full Python protocol',
                  body: (
                    <>
                      <code>for x in proxy</code>, <code>with proxy</code>,{' '}
                      <code>proxy[key]</code>, <code>len(proxy)</code>. Custom
                      exceptions come back typed.
                    </>
                  ),
                },
              ]}
            />
          </Section>
        </Chapter>

        {/* Powers Nu. */}
        <Chapter>
          <SectionHead
            title="Powers Nu."
            lede={
              <>
                <code>invisibles</code> is the foundation under{' '}
                <code>nustd.proxy</code>, the proxy fabric. Bind a fabric in
                one process, use it from another; same Refs, over TCP or
                Unix socket.
              </>
            }
          />
          <Section>
            <LinkGrid>
              <LinkCard href="/fabrics/proxy" name="nustd.proxy" hue={FABRIC.proxy.hue} tagline="Proxy fabric.">
                The fabric that puts other fabrics on the network. Built on
                invisibles.
              </LinkCard>
            </LinkGrid>
          </Section>
        </Chapter>

        <LikeThisBlock />
      </Body>
    </Page>
  );
}

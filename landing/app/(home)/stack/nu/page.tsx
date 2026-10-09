import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { Page, Header, Body } from '@/components/page';
import { PageBadge } from '@www/shared/components/meta/PageBadge';
import { Button } from '@www/shared/components/controls/Button';
import { CtaRow } from '@www/shared/components/layout/CtaRow';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { LikeThisBlock } from '@/components/chapters/LikeThisBlock';
import { Capabilities } from './_blocks/Capabilities';
import { SeeNuLive } from './_blocks/SeeNuLive';
import { IntroBrief } from './_blocks/IntroBrief';
import { pageOG, ogPageImage } from '@/lib/og';
import { PAGE_OG } from '@/lib/og-pages';

export const metadata: Metadata = pageOG({
  title: PAGE_OG.nu.title,
  description: PAGE_OG.nu.description,
  image: ogPageImage('nu'),
  path: '/stack/nu',
});

export default function NuPage() {
  return (
    <Page>
      <Header
        meta={<PageBadge kind="stack" name="nu" hue="plum" />}
        title="The interaction primitive."
        lede={
          <>
            Refs name what a program touches. Interactions say what to do with
            it. Fabrics run them against real backends.
          </>
        }
        actions={
          <CtaRow>
            <Button variant="solid" href="/docs">
              <BookOpen size={14} aria-hidden />
              <span>Read the docs</span>
            </Button>
            <Button variant="outline" href="https://github.com/nustackdev/nu">
              <GithubMark size={14} />
              <span>nustackdev/nu</span>
            </Button>
          </CtaRow>
        }
      />
      <Body>
        <Capabilities />
        <SeeNuLive />
        <IntroBrief />
        <LikeThisBlock />
      </Body>
    </Page>
  );
}

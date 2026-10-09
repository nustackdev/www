import { BookOpen } from 'lucide-react';
import { NuLogo } from '@www/shared/components/marks/NuLogo';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { DiscordMark } from '@www/shared/components/marks/DiscordMark';
import { XMark } from '@www/shared/components/marks/XMark';
import { Cell } from '@www/shared/components/grid/Cell';
import { CellContent } from '@www/shared/components/grid/CellContent';
import { Row } from '@www/shared/components/grid/Row';
import { Button, ButtonRepoLabel } from '@www/shared/components/controls/Button';
import { MonoKicker } from '@www/shared/components/meta/MonoKicker';
import { Meta } from '@www/shared/components/meta/Meta';
import { NumberedList } from '@www/shared/components/controls/NumberedList';
import { USE_CASES as USE_CASE_DATA } from '@/lib/use-cases';
import s from '../page.module.css';

// href intentionally omitted while per-case pages are unpublished — this hides
// the trailing "See →" link on each row (NumberedList only renders it when href is set).
const USE_CASES = USE_CASE_DATA.map((u) => ({
  label: u.name,
  desc: u.navDesc,
}));

/**
 * Hero — landing-only page header. Bespoke two-column layout:
 * slogan on the left, tagline + use-cases + CTAs + meta on the right.
 * Sub-pages use the standard `<Header>` primitive instead.
 */
export function Hero() {
  return (
    <Row template="minmax(0, 55fr) minmax(0, 45fr)" divider={false} stackAt="sm" className={s.heroRow}>
      <Cell yalign="middle" className={s.heroLeftCell}>
        <CellContent pad="lg">
          <div className={s.heroLeft}>
            <h1 className={s.slogan} aria-label="Nu the interaction primitive">
              <span className={s.sloganWord} aria-hidden>
                <NuLogo size="0.9em" className={s.sloganMark} />
                Nu &mdash;
              </span>{' '}
              <span className={s.sloganWord} aria-hidden>the</span>{' '}
              <span className={s.sloganWord} aria-hidden>interaction</span>{' '}
              <span className={s.sloganWord} aria-hidden>primitive.</span>
            </h1>
            <p className={s.heroTagline}>
              Build apps in one primitive that spans your whole stack &mdash; databases, UIs, AI agents, and services. No glue.{' '}
              <em className={s.taglineAccent}>50&times; less code.</em>
            </p>
          </div>
        </CellContent>
      </Cell>
      <Cell yalign="middle">
        <CellContent pad="lg">
          <div className={s.heroRight}>
            <div className={s.heroUseCases}>
              <MonoKicker as="p" size="xs" tracking="wider">
                Built for
              </MonoKicker>
              <NumberedList items={USE_CASES} />
            </div>

            <div className={s.heroCtaGroup}>
              <div className={s.heroCtaRow}>
                <Button variant="solid" href="/docs">
                  <BookOpen size={14} aria-hidden />
                  <span>Quickstart</span>
                </Button>
                <Button variant="solidAlt" href="https://github.com/nustackdev/nu">
                  <GithubMark size={14} />
                  <ButtonRepoLabel>nustackdev/nu</ButtonRepoLabel>
                </Button>
              </div>
              <div className={s.heroCtaRow}>
                <Button href="https://discord.gg/tCa8YE7XVr">
                  <DiscordMark size={14} />
                  <span>Discord</span>
                </Button>
                <Button href="https://twitter.com/nustackdev">
                  <XMark size={13} />
                  <span>Follow</span>
                </Button>
              </div>
            </div>

            <MonoKicker as="p" size="xs" tracking="wide">
              <Meta items={[<>Apache&#8209;2.0</>, 'Python 3.10+']} />
            </MonoKicker>
          </div>
        </CellContent>
      </Cell>
    </Row>
  );
}

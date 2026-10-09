import { NuLogo } from '@www/shared/components/marks/NuLogo';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { Cell } from '@www/shared/components/grid/Cell';
import { CellContent } from '@www/shared/components/grid/CellContent';
import { Row } from '@www/shared/components/grid/Row';
import { Button } from '@www/shared/components/controls/Button';
import { CommandLine } from '@www/shared/components/media/CommandLine';
import { StoreCompare } from './StoreCompare';
import s from './Hero.module.css';

/**
 * Hero — landing-only page header. One centered column: badge, category
 * line, one-sentence sub, install + CTAs, then the store comparison as
 * the visual. Sub-pages use the standard `<Header>` instead.
 */
export function Hero() {
  return (
    <Row cols={1} divider={false} className={s.row}>
      <Cell>
        <CellContent pad="lg">
          <div className={s.hero}>
            <p className={s.badge}>
              <NuLogo size="1.1em" />
              <span>nuspace</span>
              <span className={s.badgeSep} aria-hidden />
              <span className={s.badgeMeta}>Early · Self-hosted · AGPL&#8209;3.0</span>
            </p>

            <h1 className={s.title}>
              nuspace is an <span className={s.accent}>information base.</span>
            </h1>

            <p className={s.sub}>
              Data in context, and the programs that make it. One store for
              you and your agents.
            </p>

            <div className={s.actions}>
              <CommandLine command="pip install nuspace" className={s.install} />
              <div className={s.buttons}>
                <Button variant="solid" href="#start">
                  <span>Get started</span>
                </Button>
                <Button variant="solidAlt" href="https://github.com/nustackdev/nuspace">
                  <GithubMark size={14} />
                  <span>GitHub</span>
                </Button>
              </div>
            </div>

            <StoreCompare />
          </div>
        </CellContent>
      </Cell>
    </Row>
  );
}

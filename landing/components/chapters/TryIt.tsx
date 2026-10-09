import { Chapter, Section, SectionHead } from '@/components/page';
import { CommandLine } from '@www/shared/components/media/CommandLine';
import { MonoKicker } from '@www/shared/components/meta/MonoKicker';
import { Button } from '@www/shared/components/controls/Button';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import s from './TryIt.module.css';

/**
 * TryIt — the unified closing "Try it." chapter every fabric page uses.
 * Three cells in one row: install, run the demo, browse examples.
 * Zero props so the copy stays in one place — edit here, all pages follow.
 */
export function TryIt() {
  return (
    <Chapter>
      <SectionHead
        title="Try Nu."
        lede={
          <>
            One command gets you the wheel with every fabric. Then follow the
            movies tutorial to build a real app in an afternoon.
          </>
        }
      />
      <Section>
        <div className={s.row}>
          <div className={s.cell}>
            <MonoKicker as="p" size="xs" tracking="wider">
              <strong>01</strong> Install
            </MonoKicker>
            <CommandLine command='pip install "nustack-py[all]"' />
          </div>
          <div className={s.cell}>
            <MonoKicker as="p" size="xs" tracking="wider">
              <strong>02</strong> Run the demo
            </MonoKicker>
            <CommandLine command="nu demo movies" />
          </div>
          <div className={s.cell}>
            <MonoKicker as="p" size="xs" tracking="wider">
              <strong>03</strong> Build your app
            </MonoKicker>
            <Button
              href="https://github.com/nustackdev/nu/tree/main/examples"
              variant="outline"
              className={s.exploreCta}
            >
              <GithubMark size={14} />
              <span>Browse examples</span>
            </Button>
          </div>
        </div>
      </Section>
    </Chapter>
  );
}

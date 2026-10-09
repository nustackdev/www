import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { Chapter, Section, SectionHead } from '@/components/page';
import { TOOLS } from '@www/shared/lib/stack/tools';
import s from './nustd.module.css';

/** UnderTheHood — the standalone Python libs the fabrics stand on.
 * Moved from the old landing. */
export function UnderTheHood() {
  return (
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
              <a href={t.github} target="_blank" rel="noreferrer" className={s.underRepo}>
                <GithubMark size={12} />
                <span>{t.repo}</span>
              </a>
            </div>
          ))}
        </div>
      </Section>
    </Chapter>
  );
}

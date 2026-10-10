import Link from 'next/link';
import { TIERS, STACK } from '@www/shared/lib/stack/stack';
import { Intro } from './Intro';
import { Unit } from './Unit';
import g from './group.module.css';
import s from './UnderTheHood.module.css';

/** The ladder, top of each tier only: nuspace, Nu, the model. */
const LADDER = TIERS.map((t) => ({ tier: t, item: STACK.find((x) => x.tier === t.tier)! }));

/** UnderTheHood — the one line that connects anything, and the ladder. */
export function UnderTheHood() {
  return (
    <section className={g.root}>
      <Intro kicker="Under the hood" title="It's all Nu.">
        Refs name anything, interactions say what happens to them.
      </Intro>

      <Unit
        kicker="One line"
        title="Connect anything to anything in one line."
        description="The note is on screen, live. No backend, no api, no glue."
      >
        <pre className={s.code}>
          <code>
            <span className={s.ident}>ui_text</span>.<span className={s.call}>set</span>(
            <span className={s.ident}>storage</span>.note)
          </code>
        </pre>
      </Unit>

      <Unit
        kicker="The ladder"
        title="Three products, one idea."
        description="Interaction first. The model defines interactions, Nu expresses them, nuspace runs and keeps them."
      >
        <ol className={s.ladder}>
          {LADDER.map(({ tier, item }) => (
            <li key={item.slug}>
              <Link href={item.href} className={s.rung}>
                <span className={s.tier}>{tier.name}</span>
                <span className={s.name}>{item.name}</span>
                <span className={s.desc}>{tier.tagline}</span>
              </Link>
            </li>
          ))}
        </ol>
      </Unit>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { DemoVideo } from '@www/shared/components/media/demo/DemoVideo';
import { cn } from '@www/shared/lib/cn';
import { DEMOS, type DemoId } from '../demos';
import { HeroHead } from '../HeroHead';
import { Preview } from '../Preview';
import lab from '../lab.module.css';
import s from './Rail.module.css';

/** C: the video holds the stage, a rail of chapters lists every demo. The open one shows what it covers. */
export function Rail() {
  const [active, setActive] = useState<DemoId>('hero');

  return (
    <>
      <HeroHead />
      <div className={s.wrap}>
        <div className={s.stage}>
          <DemoVideo key={active} src={`/demos/${active}`} className={s.video} />
        </div>
        <ol className={s.rail} aria-label="Demos">
          {DEMOS.map((d, i) => {
            const on = d.id === active;
            return (
              <li key={d.id} className={cn(s.item, on && s.on)}>
                <button
                  type="button"
                  className={s.row}
                  aria-current={on ? 'true' : undefined}
                  aria-expanded={on}
                  onClick={() => setActive(d.id)}
                >
                  <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={s.thumb}>
                    <Preview id={d.id} play={!on} />
                  </span>
                  <span className={s.text}>
                    <span className={lab.kicker}>{d.name}</span>
                    <span className={s.title}>{d.title}</span>
                  </span>
                </button>
                <div className={s.more}>
                  <ul className={s.highlights}>
                    {d.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}

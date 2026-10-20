'use client';

import { useState } from 'react';
import { DemoVideo } from '@www/shared/components/media/demo/DemoVideo';
import { cn } from '@www/shared/lib/cn';
import { DEMOS, byId, type DemoId } from '../demos';
import { HeroHead } from '../HeroHead';
import { Preview } from '../Preview';
import { morph, vt } from '../motion';
import lab from '../lab.module.css';
import s from './Bento.module.css';

/** B: one grid, nothing moves out of it. The picked tile grows to 2x2 where it sits, the rest flow around it. */
export function Bento() {
  const [active, setActive] = useState<DemoId>('hero');
  const pick = (id: DemoId) => id !== active && morph(() => setActive(id));
  const d = byId(active);

  return (
    <>
      <HeroHead />
      <div className={s.wrap}>
        <div className={s.grid}>
          {DEMOS.map((x) => {
            const on = x.id === active;
            return (
              <div key={x.id} className={cn(s.tile, on && s.big)} style={vt('b', x.id)}>
                {on ? (
                  <DemoVideo key={x.id} src={`/demos/${x.id}`} />
                ) : (
                  <button type="button" className={s.pick} onClick={() => pick(x.id)} aria-label={`Play ${x.name}: ${x.title}`}>
                    <Preview id={x.id} />
                    <span className={s.tag}>{x.name}</span>
                  </button>
                )}
              </div>
            );
          })}
          <div className={s.info} style={vt('b', 'info')} aria-live="polite">
            <span className={lab.kicker}>{d.name}</span>
            <p className={s.infoTitle}>{d.title}</p>
            <p className={s.infoBody}>{d.body}</p>
          </div>
        </div>
      </div>
    </>
  );
}

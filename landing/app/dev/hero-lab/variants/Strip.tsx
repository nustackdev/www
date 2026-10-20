'use client';

import { useState } from 'react';
import { DemoVideo } from '@www/shared/components/media/demo/DemoVideo';
import { DEMOS, type DemoId } from '../demos';
import { HeroHead } from '../HeroHead';
import { Preview } from '../Preview';
import { morph, vt } from '../motion';
import lab from '../lab.module.css';
import s from './Strip.module.css';

/** A: the tour plays big, the other four sit in a strip under it. A pick trades places with the stage. */
export function Strip() {
  const [order, setOrder] = useState<DemoId[]>(DEMOS.map((d) => d.id));
  const [lead, ...rest] = order;

  const pick = (id: DemoId) =>
    morph(() =>
      setOrder((o) => {
        const i = o.indexOf(id);
        const next = [...o];
        [next[0], next[i]] = [next[i], next[0]];
        return next;
      }),
    );

  return (
    <>
      <HeroHead />
      <div className={s.stage}>
        <div className={s.lead} style={vt('a', lead)}>
          <DemoVideo key={lead} src={`/demos/${lead}`} eager />
        </div>
        <ul className={s.strip} aria-label="More demos">
          {rest.map((id) => {
            const d = DEMOS.find((x) => x.id === id)!;
            return (
              <li key={id}>
                <button type="button" className={s.thumb} onClick={() => pick(id)} aria-label={`Play ${d.name}: ${d.title}`}>
                  <span className={s.frame} style={vt('a', id)}>
                    <Preview id={id} />
                  </span>
                  <span className={s.meta}>
                    <span className={lab.kicker}>{d.name}</span>
                    <span className={s.thumbTitle}>{d.title}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

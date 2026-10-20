'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { DemoVideo } from '@www/shared/components/media/demo/DemoVideo';
import { cn } from '@www/shared/lib/cn';
import { DEMOS, byId, type DemoId } from '../demos';
import { HeroHead } from '../HeroHead';
import { Preview } from '../Preview';
import s from './Tabs.module.css';

/** D: the most familiar shape. One video, a segmented control over it; hover a tab to peek before you switch. */
export function Tabs() {
  const [active, setActive] = useState<DemoId>('hero');
  const [peek, setPeek] = useState<DemoId | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const d = byId(active);

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = DEMOS.length;
    const to = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1;
    if (to < 0) return;
    e.preventDefault();
    tabs.current[to]?.focus();
    setActive(DEMOS[to].id);
  };

  return (
    <>
      <HeroHead center />
      <div className={s.wrap}>
        <div className={s.control} role="tablist" aria-label="Demos">
          {DEMOS.map((x, i) => {
            const on = x.id === active;
            return (
              <div key={x.id} className={s.tabWrap} onPointerEnter={(e) => e.pointerType === 'mouse' && setPeek(x.id)} onPointerLeave={() => setPeek(null)}>
                <button
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`d-tab-${x.id}`}
                  aria-selected={on}
                  aria-controls="d-panel"
                  tabIndex={on ? 0 : -1}
                  className={cn(s.tab, on && s.on)}
                  onClick={() => {
                    setActive(x.id);
                    setPeek(null);
                  }}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  {x.name}
                </button>
                {peek === x.id && !on ? (
                  <div className={s.peek} aria-hidden>
                    <Preview id={x.id} className={s.peekMedia} />
                    <span className={s.peekTitle}>{x.title}</span>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <div id="d-panel" role="tabpanel" aria-labelledby={`d-tab-${active}`} className={s.panel}>
          <p key={`cap-${active}`} className={s.caption}>
            {d.body}
          </p>
          <DemoVideo key={active} src={`/demos/${active}`} />
        </div>
      </div>
    </>
  );
}

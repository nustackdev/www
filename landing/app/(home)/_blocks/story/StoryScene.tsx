'use client';

import { useCallback, useRef, useState, useSyncExternalStore } from 'react';
import { Check } from 'lucide-react';
import { Window } from '@www/shared/components/media/Window';
import { cn } from '@www/shared/lib/cn';
import { StoryPlayer, type StoryPlayerHandle } from './StoryPlayer';
import { beatAt, type Story } from './stories';
import s from './StoryScene.module.css';

const noop = () => () => {};

/**
 * StoryScene — a recorded space told as steps. The steps on the left say what
 * you do and what follows; the replay on the right plays them in order, and
 * the frame itself scrubs. Click a step to jump to it. On narrow screens the
 * replay comes first, the steps under it.
 */
export function StoryScene({ story }: { story: Story }) {
  const player = useRef<StoryPlayerHandle>(null);
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const [active, setActive] = useState(0);
  const { beats } = story;

  const onTime = useCallback((t: number) => setActive(beatAt(beats, t)), [beats]);

  const go = (i: number) => {
    const p = player.current;
    if (!p) return;
    p.seek(beats[i].start, { jump: true });
    p.play();
    setActive(i);
  };

  return (
    <div className={s.root}>
      <ol className={s.steps}>
        {beats.map((b, i) => {
          const on = i === active;
          const done = i < active;
          return (
            <li key={b.title}>
              <button
                className={cn(s.step, on && s.on, done && s.done)}
                aria-current={on ? 'step' : undefined}
                onClick={() => go(i)}
              >
                <span className={s.num} aria-hidden>
                  {done ? <Check size={14} strokeWidth={3} /> : i + 1}
                </span>
                <span className={s.text}>
                  <span className={s.title}>{b.title}</span>
                  <span className={s.result}>
                    <span>{b.result}</span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className={s.media}>
        <Window>
          {/* The server renders the empty frame; the player waits for the client's theme and motion settings. */}
          {mounted ? (
            <StoryPlayer ref={player} scene={story.scene} label={story.label} beats={beats} controls onTime={onTime} />
          ) : (
            <div className={s.placeholder} />
          )}
        </Window>
      </div>
    </div>
  );
}

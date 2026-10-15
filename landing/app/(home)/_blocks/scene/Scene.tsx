'use client';

import { useTheme } from 'next-themes';
import { Tape } from '@nustackdev/tape-player';
import { SCENES, type SceneDef, type SceneName } from './scenes';
import s from './Scene.module.css';

/** The nuspace build every scene plays in, as scripts/scenes.mjs writes it. */
const APP = '/scenes/nuspace/index.html';

export interface SceneProps {
  /** Scene id, the tape recording it plays. */
  name: SceneName;
  /** Frame aspect ratio. Reserved up front so nothing shifts when tape lands. */
  ratio?: '16 / 10' | '4 / 3';
  /** The frame is a scrub control: press and drag through the scene. */
  controls?: boolean;
  /** Tell it by its chapters: a subtitle and a timeline, on the frame. */
  chapters?: boolean;
}

/**
 * Scene — a tape playing in a bordered screen filling its container, in the
 * site's theme. On narrow screens it runs past the column, cut at the
 * window's edge. With `chapters` it is told on the frame like a
 * video: a subtitle per chapter, a timeline along the bottom edge. With
 * `controls` the frame scrubs.
 */
export function Scene({ name, ratio = '16 / 10', controls, chapters }: SceneProps) {
  const rec: SceneDef = SCENES[name];
  const [w, h] = ratio.split(' / ').map(Number);
  // nuspace keeps its theme in local storage: the replay gets the site's, and restarts in it on a flip.
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  return (
    <Tape.Root
      scene={rec.scene}
      app={APP}
      label={rec.label}
      chapters={chapters ? rec.chapters : undefined}
      storage={{ 'nuspace.theme': theme }}
      ready={!!resolvedTheme}
    >
      <div className={s.scene}>
        <div className={s.screen} style={{ aspectRatio: ratio }}>
          <Tape.Frame aspect={w / h}>
            {controls && <Tape.Scrubber />}
            {chapters && (
              <>
                <Tape.Caption className={s.subs} />
                <Tape.Chapters className={s.bar} />
              </>
            )}
          </Tape.Frame>
        </div>
      </div>
    </Tape.Root>
  );
}

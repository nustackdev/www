'use client';

import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

// The player is its own chunk, fetched after the page has loaded. It in turn
// fetches the scene and the app bundle only once the frame nears the viewport.
const LiveScene = dynamic(() => import('@nustackdev/tape-player').then((m) => m.LiveScene), {
  ssr: false,
});

/** The nuspace build every scene plays in, as `pnpm scenes:bundle` writes it. */
const APP = '/scenes/nuspace/index.html';

export function ScenePlayer({ scene, aspect, label }: { scene: string; aspect: number; label?: string }) {
  // nuspace keeps its theme in localStorage; the replay gets the site's, and
  // restarts in it when the site's flips. Unknown until mounted, so wait.
  const { resolvedTheme } = useTheme();
  if (!resolvedTheme) return null;
  return (
    <LiveScene
      app={APP}
      scene={`/scenes/${scene}.json`}
      aspect={aspect}
      label={label}
      storage={{ 'nuspace.theme': resolvedTheme === 'dark' ? 'dark' : 'light' }}
      style={{ position: 'absolute', inset: 0 }}
    />
  );
}

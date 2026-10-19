/** One chapter of a demo: where it starts and how it is told. */
export interface DemoChapter {
  /** Start, in seconds from the top of the clip. The first one is 0. */
  t: number;
  /** Short title, the label on the strip. A few words. */
  title: string;
  /** One line under it, the subtitle on the frame. */
  note?: string;
}

/** The sidecar: `<demo>/chapters.json`. See README.md next to this file. */
export interface DemoSidecar {
  /** What the clip shows, for screen readers. */
  label?: string;
  /** Clip length in seconds, so the bar lays out before the video loads. */
  duration?: number;
  chapters: DemoChapter[];
}

const cache = new Map<string, Promise<DemoSidecar | null>>();

/** Fetch a demo's sidecar once per page; null when it is missing or broken. */
export function loadSidecar(base: string): Promise<DemoSidecar | null> {
  let p = cache.get(base);
  if (!p) {
    p = fetch(`${base}/chapters.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j: DemoSidecar | null) =>
        j && Array.isArray(j.chapters) ? { ...j, chapters: [...j.chapters].sort((a, b) => a.t - b.t) } : null,
      )
      .catch(() => null);
    cache.set(base, p);
  }
  return p;
}

/** Index of the chapter playing at `t`. */
export function chapterAt(chapters: DemoChapter[], t: number): number {
  let i = 0;
  while (i + 1 < chapters.length && chapters[i + 1].t <= t) i++;
  return i;
}

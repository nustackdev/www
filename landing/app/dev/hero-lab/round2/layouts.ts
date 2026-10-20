// Plain module (no 'use client'), so the server page can pass these to Gallery as data.

/** A cell on the grid, 1-based column and row. */
export type Cell = [number, number];

export interface Layout {
  cols: number;
  /** The stage: top-left cell and span (square in cells, so it stays 16:10 like the clips). */
  stage: Cell;
  span: number;
  /** Where the nine thumbs go, in tab order minus the one on stage. */
  slots: Cell[];
}

/** Ready-made arrangements of one stage and nine thumbs. */
const range = (n: number, f: (i: number) => Cell) => Array.from({ length: n }, (_, i) => f(i));
export const LAYOUTS = {
  /** 5x5: stage 4x4, four thumbs down the right, five along the bottom. */
  ell: { cols: 5, stage: [1, 1], span: 4, slots: [...range(4, (i) => [5, i + 1]), ...range(5, (i) => [i + 1, 5])] },
  /** 9 columns: stage across all, the nine thumbs in one row under it. */
  row: { cols: 9, stage: [1, 1], span: 9, slots: range(9, (i) => [i + 1, 10]) },
  /** 10 columns: stage 9x9, the nine thumbs in one column on its right. */
  rail: { cols: 10, stage: [1, 1], span: 9, slots: range(9, (i) => [10, i + 1]) },
  /** 5 columns: stage 3x3 in the middle, three thumbs on each side, three under it. */
  wings: {
    cols: 5,
    stage: [2, 1],
    span: 3,
    slots: [...range(3, (i) => [1, i + 1]), ...range(3, (i) => [5, i + 1]), ...range(3, (i) => [i + 2, 4])],
  },
} satisfies Record<string, Layout>;


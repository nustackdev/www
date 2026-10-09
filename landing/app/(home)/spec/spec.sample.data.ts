import type { CodeTok } from '@www/shared/components/media/CodeSample';

/**
 * The counter+dashboard example as a plain box-drawing tree — not Python.
 * Each atom is labelled with its kind. The point is: the model is the tree
 * shape and the kinds, not any host-language syntax.
 */
export const SPEC_TREE_LINES: CodeTok[][] = [
  [{ t: 'program' }],
  [{ t: '├─ Parallel                                  ' }, { c: 'cmt', t: '# Flow · strategy' }],
  [{ t: '│  ├─ ForeverDo                              ' }, { c: 'cmt', t: '# Flow · control' }],
  [{ t: '│  │  └─ Sequential                          ' }, { c: 'cmt', t: '# Flow · strategy' }],
  [{ t: '│  │     ├─ Increment(Counter.val)           ' }, { c: 'cmt', t: '# Command → Ref(WRITE)' }],
  [{ t: '│  │     └─ Delay(1.0)                       ' }, { c: 'cmt', t: '# Query' }],
  [{ t: '│  └─ ReactForever                           ' }, { c: 'cmt', t: '# Flow · control' }],
  [{ t: '│     ├─ Counter.val.on_change               ' }, { c: 'cmt', t: '# StreamQuery' }],
  [{ t: '│     └─ Set(Dashboard.count, Counter.val)   ' }, { c: 'cmt', t: '# Command → Ref(WRITE)' }],
  [{ t: '└─ context' }],
  [{ t: '   ├─ Counter.val      → kv fabric' }],
  [{ t: '   └─ Dashboard.count  → ui fabric' }],
];

/**
 * The observability matrix — mutates × yields. Three live cells, one invalid.
 * Rendered in a monospaced block so the crossing reads at a glance.
 */
export const SPEC_MATRIX_LINES: CodeTok[][] = [
  [{ t: '                 mutates: no        mutates: yes' }],
  [{ t: 'yields: yes      (a) Query          (c) Action' }],
  [{ t: 'yields: no       (d) invalid        (b) Command' }],
  [],
  [{ c: 'cmt', t: '# a, b, c are the three live kinds. d is dead by construction:' }],
  [{ c: 'cmt', t: '# it neither mutates nor yields, so nothing observes it.' }],
];

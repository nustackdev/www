import type { CodeTok } from '@www/shared/components/media/CodeSample';

/**
 * nustd.mem showcase. Session and Cache Shapes with typed Refs, subscript
 * navigation, writes composed with `|`. Assembly binds a dict as the store.
 */
export const MEM_COUNTER_LINES: CodeTok[][] = [
  [{ c: 'kw', t: 'import' }, { t: ' nu' }],
  [{ c: 'kw', t: 'import' }, { t: ' nustd' }],
  [],
  [{ c: 'kw', t: 'class' }, { t: ' Session(' }, { c: 'nu', t: 'nu.Shape' }, { t: '):' }],
  [{ t: '    user: ' }, { c: 'nu', t: 'nustd.mem.StrRef' }],
  [{ t: '    hits: ' }, { c: 'nu', t: 'nustd.mem.IntRef' }],
  [{ t: '    tags: ' }, { c: 'nu', t: 'nustd.mem.PrimitiveListRef' }, { t: '[str]' }],
  [],
  [{ c: 'kw', t: 'class' }, { t: ' Cache(' }, { c: 'nu', t: 'nu.Shape' }, { t: '):' }],
  [{ t: '    sessions: ' }, { c: 'nu', t: 'nustd.mem.ShapesDictRef' }, { t: '[str, Session]' }],
  [{ t: '    active: ' }, { c: 'nu', t: 'nustd.mem.IntRef' }],
  [],
  [{ c: 'cmt', t: '# refs read and write like plain attributes' }],
  [{ t: 'who = Cache.sessions[' }, { c: 'str', t: '"ada"' }, { t: '].user' }],
  [{ t: 'score = Cache.sessions[' }, { c: 'str', t: '"ada"' }, { t: '].hits + ' }, { c: 'num', t: '1' }],
  [],
  [{ c: 'cmt', t: '# compose writes as one flow' }],
  [{ t: 'bump = (' }],
  [{ t: '    Cache.sessions[' }, { c: 'str', t: '"ada"' }, { t: '].hits.inc()' }],
  [{ t: '    | Cache.sessions[' }, { c: 'str', t: '"ada"' }, { t: '].tags.append(' }, { c: 'str', t: '"seen"' }, { t: ')' }],
  [{ t: '    | Cache.active.inc()' }],
  [{ t: ')' }],
  [],
  [{ c: 'cmt', t: '# assemble and run' }],
  [{ t: 'ctx = ' }, { c: 'nu', t: 'nu.Context' }, { t: '().bind(' }, { c: 'kw', t: 'dict' }, { t: ', {}, Cache)' }],
  [{ c: 'nu', t: 'nu.run' }, { t: '(bump, ctx=ctx)' }],
];

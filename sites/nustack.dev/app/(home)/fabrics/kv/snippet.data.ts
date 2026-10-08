import type { CodeTok } from '@www/shared/components/media/CodeSample';

/**
 * nustd.kv shape example. A Store with a dict of typed sub-shapes and a
 * primitive int slot. Refs navigate through subscript and dot. Reads batch
 * in a Snapshot for consistency, writes batch in a Transaction for integrity.
 * Backend is one line at the top.
 */
export const KV_SNIPPET_LINES: CodeTok[][] = [
  [{ c: 'kw', t: 'import' }, { t: ' nu' }],
  [{ c: 'kw', t: 'import' }, { t: ' nustd' }],
  [],
  [{ c: 'kw', t: 'class' }, { t: ' Profile(' }, { c: 'nu', t: 'nu.Shape' }, { t: '):' }],
  [{ t: '    name: ' }, { c: 'nu', t: 'nu.v.StrRef' }],
  [{ t: '    score: ' }, { c: 'nu', t: 'nu.v.IntRef' }],
  [],
  [{ c: 'kw', t: 'class' }, { t: ' Store(' }, { c: 'nu', t: 'nu.Shape' }, { t: '):' }],
  [{ t: '    profiles: ' }, { c: 'nu', t: 'nu.v.ShapesDictRef' }, { t: '[int, Profile]' }],
  [{ t: '    top: ' }, { c: 'nu', t: 'nu.v.IntRef' }],
  [],
  [{ c: 'cmt', t: '# refs read and write like plain attributes' }],
  [{ t: 'top_name = Store.profiles[Store.top].name' }],
  [{ t: 'delta = Store.profiles[' }, { c: 'num', t: '42' }, { t: '].score - Store.profiles[' }, { c: 'num', t: '7' }, { t: '].score' }],
  [],
  [{ c: 'cmt', t: '# batch reads in one snapshot for consistency' }],
  [{ t: 'view = ' }, { c: 'nu', t: 'nustd.kv.Snapshot' }, { t: '(top_name | delta)' }],
  [],
  [{ c: 'cmt', t: '# batch writes in one transaction for integrity' }],
  [{ t: 'bump = ' }, { c: 'nu', t: 'nustd.kv.Transaction' }, { t: '(' }],
  [{ t: '    Store.profiles[' }, { c: 'num', t: '42' }, { t: '].score.inc()' }],
  [{ t: '    | Store.top.set(' }, { c: 'num', t: '42' }, { t: ')' }],
  [{ t: ')' }],
  [],
  [{ c: 'cmt', t: '# rocksdb, lmdb, in-memory. same refs, same code.' }],
  [{ t: 'app = ' }, { c: 'nu', t: 'nu.With' }, { t: '(' }, { c: 'nu', t: 'nustd.kv.rocksdb_navigator' }, { t: '(' }, { c: 'str', t: '".db"' }, { t: '), body=bump)' }],
  [{ c: 'nu', t: 'nu.run' }, { t: '(app)' }],
];

import type { CodeTok } from '@www/shared/components/media/CodeSample';

/** virtuals — 60-second snippet: dict + nested list over in-memory KV. */
export const VIRTUALS_LINES: CodeTok[][] = [
  [{ c: 'kw', t: 'from' }, { t: ' virtuals ' }, { c: 'kw', t: 'import' }, { t: ' Navigator' }],
  [{ c: 'kw', t: 'from' }, { t: ' virtuals.views ' }, { c: 'kw', t: 'import' }, { t: ' EagerListView' }],
  [{ c: 'kw', t: 'from' }, { t: ' virtuals.storages.mem ' }, { c: 'kw', t: 'import' }, { t: ' InMemoryStorage' }],
  [{ c: 'kw', t: 'from' }, { t: ' virtuals.codecs ' }, { c: 'kw', t: 'import' }, { t: ' NoOpCodec' }],
  [],
  [{ t: 'nav = ' }, { c: 'nu', t: 'Navigator' }, { t: '(' }, { c: 'nu', t: 'InMemoryStorage' }, { t: '(codec=' }, { c: 'nu', t: 'NoOpCodec' }, { t: '()))' }],
  [],
  [{ c: 'kw', t: 'with' }, { t: ' nav.storage ' }, { c: 'kw', t: 'as' }, { t: ' storage, storage.transaction() ' }, { c: 'kw', t: 'as' }, { t: ' tx:' }],
  [{ t: '    root = nav.root(tx)' }],
  [],
  [{ c: 'cmt', t: '    # feels like a plain dict' }],
  [{ t: '    root[' }, { c: 'str', t: '"alice"' }, { t: '] = {' }, { c: 'str', t: '"age"' }, { t: ': ' }, { c: 'num', t: '30' }, { t: '}' }],
  [{ t: '    root[' }, { c: 'str', t: '"bob"' }, { t: '] = {' }, { c: 'str', t: '"age"' }, { t: ': ' }, { c: 'num', t: '25' }, { t: '}' }],
  [],
  [{ c: 'cmt', t: '    # open a list under the same root' }],
  [{ t: '    scores = root.open_child(' }, { c: 'str', t: '"scores"' }, { t: ', ' }, { c: 'nu', t: 'EagerListView' }, { t: ')' }],
  [{ t: '    scores.store([' }, { c: 'num', t: '100' }, { t: ', ' }, { c: 'num', t: '200' }, { t: ', ' }, { c: 'num', t: '300' }, { t: '])' }],
  [{ t: '    scores.append(' }, { c: 'num', t: '400' }, { t: ')' }],
  [],
  [{ c: 'cmt', t: '    # swap InMemoryStorage for RocksDB or LMDB, same code' }],
];

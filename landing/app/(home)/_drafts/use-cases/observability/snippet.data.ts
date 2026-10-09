import type { CodeTok } from '@www/shared/components/media/CodeSample';

/**
 * 60-second nulog snippet. One Nu tree that boots the store, mounts the
 * live viewer, writes a few log lines and one metric point inside a
 * transaction. Adapted from nulog README + examples/basic.py.
 */
export const NULOG_SNIPPET_LINES: CodeTok[][] = [
  [{ c: 'kw', t: 'import' }, { t: ' asyncio, nu, nustd, nulog' }],
  [],
  [{ t: 'tree = ' }, { c: 'nu', t: 'nu.With' }, { t: '(' }],
  [{ t: '    ' }, { c: 'nu', t: 'nulog.store' }, { t: '(' }, { c: 'str', t: '"logs.db"' }, { t: '),' }],
  [{ t: '    ' }, { c: 'nu', t: 'nulog.ui' }, { t: '([' }, { c: 'str', t: '"app"' }, { t: '], port=8080),' }],
  [{ t: '    body=' }, { c: 'nu', t: 'nustd.kv.Transaction' }, { t: '(' }],
  [{ t: '        ' }, { c: 'nu', t: 'nulog.info' }, { t: '(' }, { c: 'str', t: '"app"' }, { t: ', ' }, { c: 'str', t: '"server started"' }, { t: ', port=8080)' }],
  [{ t: '        >> ' }, { c: 'nu', t: 'nulog.warn' }, { t: '(' }, { c: 'str', t: '"app"' }, { t: ', ' }, { c: 'str', t: '"cache miss"' }, { t: ', key=' }, { c: 'str', t: '"user:42"' }, { t: ')' }],
  [{ t: '        >> ' }, { c: 'nu', t: 'nulog.observe' }, { t: '(' }, { c: 'str', t: '"cpu_load"' }, { t: ', 0.42)' }],
  [{ t: '    ),' }],
  [{ t: ')' }],
  [],
  [{ c: 'cmt', t: '# open http://127.0.0.1:8080 (live table, filters, counts)' }],
  [{ t: 'asyncio.run(' }, { c: 'nu', t: 'nu.arun' }, { t: '(tree))' }],
];

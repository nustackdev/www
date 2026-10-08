import type { CodeTok } from '@www/shared/components/media/CodeSample';

/** Declare a JSON API as a Nu service, then call it like any Ref. */
export const HTTP_SAMPLE_LINES: CodeTok[][] = [
  [{ c: 'kw', t: 'import' }, { t: ' nu' }],
  [{ c: 'kw', t: 'import' }, { t: ' nustd' }],
  [],
  [{ c: 'kw', t: 'class' }, { t: ' GitHub(' }, { c: 'nu', t: 'nu.Service' }, { t: '):' }],
  [{ t: '    get_repo = ' }, { c: 'nu', t: 'nustd.http.GETRef' }, { t: '.method(' }, { c: 'str', t: '"/repos/{owner}/{repo}"' }, { t: ')' }],
  [],
  [{ c: 'cmt', t: '# call it like a function; kwargs fill the path and query' }],
  [{ t: 'app = ' }, { c: 'nu', t: 'nu.With' }, { t: '(' }],
  [{ t: '    ' }, { c: 'nu', t: 'nustd.http.bind' }, { t: '(GitHub, base_url=' }, { c: 'str', t: '"https://api.github.com"' }, { t: '),' }],
  [{ t: '    body=' }, { c: 'nu', t: 'nu.print' }, { t: '(GitHub.get_repo(owner=' }, { c: 'str', t: '"nustackdev"' }, { t: ', repo=' }, { c: 'str', t: '"nu"' }, { t: ')),' }],
  [{ t: ')' }],
  [],
  [{ c: 'nu', t: 'nu.run' }, { t: '(app)' }],
];

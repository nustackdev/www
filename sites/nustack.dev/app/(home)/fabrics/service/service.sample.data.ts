import type { CodeTok } from '@www/shared/components/media/CodeSample';

/** Wrap a plain Python object as a Nu Service; its methods become Refs. */
export const SERVICE_SAMPLE_LINES: CodeTok[][] = [
  [{ c: 'kw', t: 'import' }, { t: ' nu' }],
  [{ c: 'kw', t: 'import' }, { t: ' nustd' }],
  [],
  [{ c: 'kw', t: 'class' }, { t: ' Calculator:' }],
  [{ t: '    ' }, { c: 'kw', t: 'def' }, { t: ' __init__(self): self.total = ' }, { t: '0' }],
  [{ t: '    ' }, { c: 'kw', t: 'def' }, { t: ' add(self, a, b): ' }, { c: 'kw', t: 'return' }, { t: ' a + b' }],
  [{ t: '    ' }, { c: 'kw', t: 'def' }, { t: ' bump(self, by): self.total += by; ' }, { c: 'kw', t: 'return' }, { t: ' self.total' }],
  [{ t: '    ' }, { c: 'kw', t: 'def' }, { t: ' reset(self): self.total = ' }, { t: '0' }],
  [],
  [{ c: 'kw', t: 'class' }, { t: ' Calc(' }, { c: 'nu', t: 'nu.Service' }, { t: '):' }],
  [{ t: '    add   = ' }, { c: 'nu', t: 'nustd.service.QueryRef' }, { t: '.method()' }],
  [{ t: '    bump  = ' }, { c: 'nu', t: 'nustd.service.ActionRef' }, { t: '.method()' }],
  [{ t: '    reset = ' }, { c: 'nu', t: 'nustd.service.CommandRef' }, { t: '.method()' }],
  [],
  [{ c: 'cmt', t: '# bind the Python target, then call methods like any other Ref' }],
  [{ t: 'app = ' }, { c: 'nu', t: 'nu.With' }, { t: '(' }],
  [{ t: '    ' }, { c: 'nu', t: 'nustd.service.bind' }, { t: '(Calc, target=Calculator()),' }],
  [{ t: '    body=' }, { c: 'nu', t: 'nu.print' }, { t: '(Calc.add(a=' }, { t: '1' }, { t: ', b=' }, { t: '2' }, { t: ')),' }],
  [{ t: ')' }],
  [],
  [{ c: 'nu', t: 'nu.run' }, { t: '(app)' }],
];

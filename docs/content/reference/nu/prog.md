---
title: prog
description: "nu.prog: interactions over Nu programs."
---

Module `nu.prog`.

nu.prog: interactions over Nu programs.

The `prog` fabric hosts interactions whose subject is a Nu program itself:

- `LoadNu` -- read python source, yield the Nu term it constructs. Source
  is the authoring format and the artifact of record; a Nu tree is what it
  lowers to, one way. Its `rewrite` slot is where a host says where the
  term lands, so no term can be obtained having skipped the rewrite.
- `Eval` -- dynamic evaluation. A scalar carrier yields a Nu term at
  runtime; Eval compiles it against the current schema, validates it against
  an optional promise, and drives it inside the current Runtime.
- `Program` -- the Form over source text. `Program(src).run()` is the
  ergonomic surface over the pair below; mixed into a substrate ref it
  becomes `ProgramRef`, a slot whose stored string is a program.
- `PyBrace` -- the environment source is *constructed* in, bound on ctx
  with `Provide`. No Nu is ever run inside a brace and nothing but plain
  data crosses into one; exactly two things come back, a Nu term or a
  Diagnostic.

`Eval(LoadNu(source))` is the pair: load a stored program, run it.

`nu.lang` keeps the vocabulary Eval leans on (`Sort.DYNAMIC`,
`Attr.HAS_DYNAMIC`) but has no knowledge of Eval itself. Importing
`nu.prog` registers Eval's placement law (`eval_carrier_is_scalar`) into
`nu.lang.laws.LAWS`.

## eval

Module `nu.prog.eval`.

Eval: dynamic evaluation of a Nu term produced at runtime.

Eval is the escape hatch from the static compile-then-drive model. Its sole
child (the *carrier*) is a scalar-yielding Nu subtree that, when evaluated,
returns another Nu term. Eval compiles that inner term against the same
schema as the outer program, checks it against an optional *promise*, and
drives it inside the current Runtime.

- Static composition matrix treats Eval as a *universal child* -- it slot-fits
  every parent row. The composition law cannot know what the carrier will
  produce, so we accept the placement statically and defer the discipline to:
- A promise on the Eval term, pinning any subset of ``{sort, cardinality,
  has_async_only_atom, has_sync_only_atom}``. Runtime dispatch validates the
  inner tree's actual attributes against each pinned field and raises with a
  targeted message on mismatch (see `eval_promise`).
- `eval_carrier_is_scalar`: the one static law Eval adds. The carrier must
  itself yield a scalar (checked through Span transparency via
  `CHILD_CARDINALITY`) so the runtime always gets exactly one Nu term per
  evaluation.

- Eval is opaque to the static effect walk (`COMPOSITION_EFFECTS`). Consumers
  that need to gate on possible dynamic effects read `HAS_DYNAMIC` and
  handle the subtree conservatively (see `is_pure`, `program_mutates`,
  `auto_flow_atomic`).
- Sync entry (`run`, `eval`) driving an Eval whose inner tree turns out to
  hold an async-only atom raises deep in dispatch. Pin
  `has_async_only_atom=False` on the promise to surface it earlier.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Eval](#eval-1) | `dynamic` | `Eval(carrier, promise=None)` | Runs a Nu term the carrier produced at runtime. |

### Eval

Runs a Nu term the carrier produced at runtime.

```python
Eval(carrier, promise=None)
```

Path `nu.prog.Eval`. Kind `Interaction`, sort `dynamic`, cardinality `scalar`. Arity 2 (1 required).

The carrier is evaluated like any other child and its value must be a Nu
term. That term is compiled against the same schema as the outer program
and driven in a nested Runtime that shares the outer ctx and budget, so
the inner tree sees the same fabrics, the same bound resources and the
same budget as the tree it was spliced into.

This is the one place a Nu tree grows after compile time, so everything
the static passes would have settled about the inner tree is deferred:
to the promise, which is checked once the term is in hand, and to
dispatch, which checks the sync/async placement.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `carrier` | `Nu` |  | a Nu subtree that yields a Nu term when evaluated. |
| `promise` | `dict[str, Any] \| None` | `None` | expectations pinned on the inner tree, any subset of `{"sort", "cardinality", "has_async_only_atom", "has_sync_only_atom"}`. An unknown key is a `ValueError` at construction. |

**Yields**

Whatever the inner tree yields, unchanged. Eval adds no EMPTY or
INVALID rule of its own, so a sentinel from the inner tree passes
straight out.

**Notes**

- The composition matrix treats an Eval as a universal child: it slot-fits every parent row, because no static pass can know what the carrier will produce.
- `eval_carrier_is_scalar` is the one static law it adds. The carrier must resolve, through Span transparency, to a scalar yielder, so dispatch always gets exactly one term per evaluation.
- A `cardinality` field on the promise is also what the parent slot-fits against: without one the Eval presents as SCALAR, so an Eval whose inner tree is a stream has to pin it to be placed where a stream is wanted.
- A `sort` promise matches on subsort, not identity, so pinning an interior sort accepts any descendant of it.
- The inner term is compiled on every evaluation. Nothing is cached, so an Eval inside a loop recompiles once per iteration.
- Opaque to the static effect walk. Consumers that need to gate on possible dynamic effects read `Attr.HAS_DYNAMIC` and treat the subtree conservatively (`is_pure`, `program_mutates`, `auto_flow_atomic`).
- A carrier that yields anything other than a Nu term raises `EvalPromiseError`, the same error a contradicted promise does.
- Under sync dispatch an inner tree holding an async-only atom raises `RuntimeError` at evaluation. Pin `has_async_only_atom=False` to surface it at the promise check instead, which names the axis rather than the dispatch hop.
- Under async dispatch the placement has to agree with the inner tree: an Eval on the event loop (under `Race`, `AnyN`, `ParallelAsync`) cannot host a sync-only inner tree, and one off the loop (under `ParallelThreaded`) cannot host an async-only one. Either way it raises `RuntimeError`.
- Nothing the inner tree raises while running is caught here. Wrap the Eval in a `TryCatch` to keep a dynamic program's failure local to the subtree that ran it.

**Examples**

```python
src = '''
import nu
def out():
    return nu.Int(6) * nu.Int(7)
'''
nu.run(nu.Eval(nu.LoadNu(src)))[0]
```

```
42
```

```python
nu.run(nu.Eval(nu.Literal(nu.Int(1) + nu.Int(2))))[0]
```

```
3
```

## load

Module `nu.prog.load`.

`LoadNu`: read python source, yield the Nu term it constructs.

The verb that makes a stored program runnable. `LoadNu` takes source text
and gives back a Nu term; `Eval` drives a term produced at runtime. Put
together, `Eval(LoadNu(source))` is the whole "load a stored program and
run it" move, and the two halves stay separable: a tool that only wants to
type-check or inspect a stored program loads it without evaluating it.

Where the source comes from is the tree's business. A literal is the demo
case, but the slot takes any `Nu[str]`, so the real one - reading the
source out of kv at an address the program computed - is the same node with
a different child.

Where the term *lands* is the loader's business. `rewrite` is a
`Nu -> Nu` transform applied to the constructed term before anyone can see
it, which is where re-rooting a snippet's bare ref chains under the block that
owns them goes (`rerooter`). It sits on `LoadNu` rather than
being a node someone composes in front of `Eval` for one reason: on the slot
there is no way to obtain a term that skipped it, and composed in front there
is, and forgetting it writes to the wrong paths silently.

Where it is *built* is ctx's business. `LoadNu` resolves a
`PyBrace` off `rt.ctx`; with none bound it falls
back to an in-process brace, so a bare `LoadNu` in a plain tree works with
no ceremony. Binding one is how a subtree opts into a different interpreter,
and `brace=` picks among several bound braces by tag, the same single
hashable tag `Teleport` takes.

#### Children and payload

`[source, entry, filename, *scope_values]`, with the scope *names* in
payload. Anything Nu-computable is a child, and a source address, an entry
point name and a scope value are all things a program can compute (a section
path read from kv is the motivating case). What stays in payload is the one
thing that is not a value at all: which slot carries which name. That is
structure, in the same sense `TryCatch.errors` is - it shapes the call,
it is not a value the call computes.

#### Failures

A `Diagnostic` becomes a raised
`ConstructionError`. `LoadNu` yields a Nu term
or raises; it never yields a Diagnostic, because a downstream `Eval` would
have to re-check for one on every value that passes through it. The record
itself stays reachable on `.diagnostic`, which is what a feedback loop
handing the failure back to its author reads.

A rewrite reaches the whole term it is handed, `Eval` carriers included,
because a carrier is a plain child. The one thing it cannot reach is a term
some *other* load builds at run time, inside a nested Runtime, after this
rewrite already ran. Rather than let that term through un-rewritten and write
to bare paths, a load carrying a rewrite refuses to yield a term with another
`LoadNu` in it (`RewriteEscapeError`). Nothing nests loads today.

Async classification: portable. The construction is blocking (a venv brace
sits on a pipe read for its whole duration), so `_acompile` runs it
off-thread rather than declaring the atom async-only.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [LoadNu](#loadnu) | `scalar_query` | `LoadNu(source, entry='out', scope=None, filename='<nu program>', brace=<UNSET>, rewrite=None)` | Constructs a Nu term from python source, in the brace bound on ctx. |

### LoadNu

Constructs a Nu term from python source, in the brace bound on ctx.

```python
LoadNu(source, entry='out', scope=None, filename='<nu program>', brace=<UNSET>, rewrite=None)
```

Path `nu.prog.LoadNu`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 6 (1 required).

The source is a whole module, not an expression, and the term comes from
calling its entry point. The entry point's own signature is the scope
contract: it declares by name what it needs, `scope` offers values by
name, and only the intersection is passed. So a snippet says what it
depends on rather than trusting an out-of-band convention about what
happens to be in scope.

Constructing is not running. `LoadNu` gives back the term and stops
there, which is what a tool that wants to inspect or type-check a stored
program needs; `Eval(LoadNu(source))` is the pair that also drives it.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `source` | `StrArg` |  | python source for a whole module. Any `Nu[str]`; a bare string auto-wraps into a Literal. |
| `entry` | `StrArg` | `'out'` | name of the entry point function in that module. |
| `scope` | `Mapping[str, object] \| None` | `None` | plain-data values offered to the entry point, bound by parameter name. Values are Nu children, so any of them may be computed; they must end up picklable for a venv brace. |
| `filename` | `StrArg` | `'<nu program>'` | name frames and diagnostics attribute the source to. |
| `brace` | `object` | `<UNSET>` | tag identifying the `PyBrace` on ctx. Omit for the untagged singleton, or for no brace at all. |
| `rewrite` | `Transform \| None` | `None` | a `Nu -> Nu` transform run on the constructed term before it is yielded. The binding context for *where* the term lands, the way `scope` is the binding context for what it reads: `rerooter` is the one that splices a snippet's bare ref chains under the block that owns them. |

**Yields**

The Nu term the entry point returned, rewritten and unevaluated.

**Notes**

- Source, entry, filename and every scope value are children, so all four are computable: reading the source out of kv at an address the program itself worked out is the same node with a different child. Only the mapping from slot to scope name lives in payload, because it shapes the call rather than being a value the call computes.
- The brace is resolved off `rt.ctx` at evaluation, by `PyBrace` plus the `brace` tag. With nothing bound it falls back to a shared in-process brace, so a bare `LoadNu` in a plain tree needs no bracket.
- Only plain data crosses into a brace. A venv brace pickles the scope to another interpreter, where a live object from this one does not exist, so the snippet imports what it needs and takes values.
- Scope keys the entry point does not declare are dropped rather than passed. A declared parameter with no offer and no default is a construction failure, not a `TypeError`.
- Every way the snippet can fail is one failure: the source does not parse, module-level code raises, the entry point is missing or is not callable, it raises, or it returns something that is not a Nu. All five come back as a `Diagnostic` and are raised as one `ConstructionError`.
- It never yields a Diagnostic, only raises. A downstream `Eval` would otherwise have to re-check every value passing through it for one.
- The traceback in a diagnostic renders the snippet's actual source lines, because the source is seeded into `linecache` under `filename` before it is compiled.
- Portable across sync and async. Construction is blocking (a venv brace sits on a pipe read for its whole duration), so the async path runs it off-thread rather than making the atom async-only.
- The rewrite runs on this side of the brace, on the term that came back, so it is a live python callable and never has to pickle.
- A rewrite is bound per load and there is no way around it, which is the point of it being a slot. A load with a rewrite refuses to yield a term holding another `LoadNu`, because that inner load builds its term later and would escape.

**Examples**

```python
src = '''
import nu
def out(n):
    return nu.Int(n) * nu.Int(10)
'''
nu.run(nu.LoadNu(src, scope={"n": 4}))[0]
```

```
Int(Mul(Int(4), Int(10)))
```

```python
try:
    nu.run(nu.LoadNu("def out( "))
except nu.prog.ConstructionError as err:
    print(err.diagnostic)
```

```
source does not parse: '(' was never closed (line 1)
```

## forms

Module `nu.prog.forms`.

`Program` - source text that constructs a Nu term, as a Form.

`Eval(LoadNu(source))` already says "load a stored program and run it".
`Program` is the ergonomic surface over that pair: it is a `Nu[str]`
carrying the source, and its verbs hand back the composed tree.

Two ways in, one type. Standalone, a literal is the child:

```python
Program(SOURCE).run()
```

Stored, the child is the ref that reads the source out of a fabric. That is
what `ProgramRef` and its mem twin are - the same
Form mixed into a substrate ref, so `Shape.program.run()` reads the source
from storage and runs what it constructs.

#### Verbs compose, they do not add atoms

`.load()` and `.run()` are plain methods that return composed Nu. There
is no `LoadProgram` atom, no `RunProgram` atom. This is the established
idiom - `IntRef.inc` is literally `return self.set(self + step)` - and it
earns its keep twice over here. A program is a thing you store and inspect,
so the tree a verb produces should show its real control flow: a
`.run(on_error=...)` is visibly a `TryCatch` around an `Eval` around a
`LoadNu`, walkable and attributable like any other tree. An opaque atom
would hide all three, and every consumer that reasons over trees (attribute
sweeps, effect classification, promise checks) would have to learn about it
separately.

The cost is that the verbs are not overridable per substrate. Nothing wants
that: where the source comes from is the child's business, and the child is
what differs between substrates.

Construction takes no `.of()`. The `nustd` Forms use classmethods
because their payloads need parsing atoms to build; `Program` does not.
`TypedNu.__init__` wraps a single child and `Nu` auto-wraps a non-Term
child into a `Literal`, so `Program(SOURCE)` with a bare `str` is
already the right node.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Program](#program) | `scalar_query` | `Program()` | Python source that constructs a Nu term. |

### Program

Python source that constructs a Nu term.

```python
Program()
```

Path `nu.prog.Program`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

The child yields the source text: a literal when the program is written
inline, a ref when it is stored. Both verbs thread the same construction
arguments through to `LoadNu`.

**Notes**

- The verbs compose rather than adding atoms. `.load()` is a `LoadNu`, `.run()` is an `Eval` over it, and `.run(on_error=...)` is those two inside a `TryCatch`. The tree shows the real control flow, so attribute sweeps, effect classification and promise checks all reach it with no special case for programs.
- Mixed into a substrate ref it becomes a program-valued slot (`nustd.kv`'s `ProgramRef` and its `nustd.mem` twin), where the child is what reads the source out of storage. Nothing else about the Form changes, which is why the verbs are not overridable per substrate.
- No `.of()` constructor. `Program(source)` with a bare `str` is already the right node, because `Nu` auto-wraps a non-Term child into a `Literal`.
- Everything the value carries is a `Str`: source text is what a program is until something constructs it.

**Example**

```python
src = '''
import nu
def out():
    return nu.Int(6) * nu.Int(7)
'''
nu.run(nu.prog.Program(src).run())[0]
```

```
42
```

**Methods**

#### `.load(entry='out', scope=None, filename='<nu program>', brace=<UNSET>, rewrite=None)`

Construct the term without running it.

Builds `Nu`.

The half a type-checker or an inspector wants: the source becomes a
Nu term and stops there.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `entry` | `StrArg` | `'out'` | name of the entry point function in the source module. |
| `scope` | `Mapping[str, object] \| None` | `None` | plain-data values offered to the entry point, bound by parameter name. |
| `filename` | `StrArg` | `'<nu program>'` | name frames and diagnostics attribute the source to. |
| `brace` | `object` | `<UNSET>` | tag identifying the `PyBrace` on ctx. Omit for the untagged singleton, or for no brace. |
| `rewrite` | `Transform \| None` | `None` | a `Nu -> Nu` transform run on the constructed term, which is where a host says where the snippet's refs land. |

**Notes**

- Constructing runs the module body and calls the entry point, so a snippet with import-time side effects has them here even though nothing evaluates the term afterwards.

Undocumented: example.

#### `.run(entry='out', scope=None, filename='<nu program>', brace=<UNSET>, rewrite=None, on_error=None)`

Construct the term and drive it.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `entry` | `StrArg` | `'out'` | name of the entry point function in the source module. |
| `scope` | `Mapping[str, object] \| None` | `None` | plain-data values offered to the entry point, bound by parameter name. |
| `filename` | `StrArg` | `'<nu program>'` | name frames and diagnostics attribute the source to. |
| `brace` | `object` | `<UNSET>` | tag identifying the `PyBrace` on ctx. |
| `rewrite` | `Transform \| None` | `None` | a `Nu -> Nu` transform run on the constructed term, before anything evaluates it. |
| `on_error` | `Nu \| None` | `None` | branch to run when construction fails. Given one, the whole thing is wrapped in a `TryCatch` filtered to `ConstructionError`, and the branch reads the caught exception off the attrs fabric with `AttrRef("error")`. Only construction failures are caught; whatever the program itself raises propagates. |

**Notes**

- The result is one `Eval`, so the program runs exactly once however many places read the yield. Compose the same `.run()` into two slots and it constructs and runs twice, which for a program that appends to a list is a silently wrong world; store the yield in a Ref and read that instead.
- `on_error` catches construction only. A program that constructs and then raises while running propagates, so wrap the whole thing in a second `TryCatch` when that failure should also be an outcome rather than a crash.

Undocumented: example.

**Inherited methods**

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

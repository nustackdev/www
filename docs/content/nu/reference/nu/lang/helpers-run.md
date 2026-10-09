---
title: helpers.run
description: "All-in-one entries: compile, validate, drive in one call."
---

Module `nu.lang.helpers.run`.

All-in-one entries: compile, validate, drive in one call.

Take a Term, compile it against the Nu schema, validate against the Nu
law set, then drive. Three phases in one call, what app code usually
wants. The standalone pieces stay available via `nu.lang` for callers
that want a Program in hand (e.g. for static inspection).

| Name | Call | Meaning |
| --- | --- | --- |
| [arun](#arun) | `lang.arun(term, ctx=None, max_parallel=1)` | Async sibling of `run`: compile, validate, then `aeval`. |
| [run](#run) | `lang.run(term, ctx=None, max_parallel=1)` | Compile a Term, validate it, evaluate it; return `(value, ctx)`. |
| [run_in_loop](#run_in_loop) | `lang.run_in_loop(term, ctx=None, max_parallel=1)` | Compile, validate, then drive on a fresh loop from sync code. |

## arun

Async sibling of `run`: compile, validate, then `aeval`.

```python
lang.arun(term, ctx=None, max_parallel=1)
```

Path `nu.lang.arun`. Defined on `nu.lang.helpers.run`, bound as a function. Builds `tuple[V, Context]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `term` | `Nu[V]` |  |  |
| `ctx` | `Context \| None` | `None` |  |
| `max_parallel` | `int` | `1` |  |

Undocumented: example.

## run

Compile a Term, validate it, evaluate it; return `(value, ctx)`.

```python
lang.run(term, ctx=None, max_parallel=1)
```

Path `nu.lang.run`. Defined on `nu.lang.helpers.run`, bound as a function. Builds `tuple[V, Context]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `term` | `Nu[V]` |  | a Nu Term (the description). |
| `ctx` | `Context \| None` | `None` | the Context to drive against; a fresh one if omitted. |
| `max_parallel` | `int` | `1` | tree-wide concurrency gate. `1` is sequential. |

Undocumented: example.

## run_in_loop

Compile, validate, then drive on a fresh loop from sync code.

```python
lang.run_in_loop(term, ctx=None, max_parallel=1)
```

Path `nu.lang.run_in_loop`. Defined on `nu.lang.helpers.run`, bound as a function. Builds `tuple[V, Context]`.

For the rare top-level sync caller whose Term compiles to an async-only
Program: spins a loop via `asyncio.run` and drives the async path so
the caller doesn't have to write an `async def`. Most callers should
use `arun` directly.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `term` | `Nu[V]` |  |  |
| `ctx` | `Context \| None` | `None` |  |
| `max_parallel` | `int` | `1` |  |

Undocumented: example.

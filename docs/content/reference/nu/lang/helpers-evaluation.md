---
title: helpers.evaluation
description: "Drive entries: run a compiled Program through the Runtime."
---

Module `nu.lang.helpers.evaluation`.

Drive entries: run a compiled Program through the Runtime.

Two families, by what the root yields:

- value root: `eval`, `aeval`, `eval_in_loop`: return `(value, ctx)`.
- stream root: `first`, `collect`, `afirst`, `alast`, `acollect`:
  iterate the root and return either a single item or a list, with the
  Context after execution.

Each opens a fresh `Budget` sized by `max_parallel` and closes it on
exit. Sync entries refuse a Program with an async-only subtree; callers
must use the async sibling, or `eval_in_loop` as the deliberate bridge.
Stream entries wrap iteration in `safely_(a)closing` so a short-circuit
(`first`, partial `collect`) still finalizes the underlying generator.

| Name | Call | Meaning |
| --- | --- | --- |
| [acollect](#acollect) | `lang.acollect(program, ctx=None, max_parallel=1)` | Async sibling of `collect`. |
| [aeval](#aeval) | `lang.aeval(program, ctx=None, max_parallel=1)` | Drive a Program asynchronously; return `(value, ctx)`. |
| [afirst](#afirst) | `lang.afirst(program, ctx=None, max_parallel=1)` | Async sibling of `first`. |
| [alast](#alast) | `lang.alast(program, ctx=None, max_parallel=1)` | Drain a stream-rooted Program and return the last item; `(value, ctx)`. |
| [collect](#collect) | `lang.collect(program, ctx=None, max_parallel=1)` | Materialize a stream-rooted Program to a list; `(values, ctx)`. |
| [eval](#eval) | `lang.eval(program, ctx=None, max_parallel=1)` | Drive a Program synchronously; return `(value, ctx)`. |
| [eval_in_loop](#eval_in_loop) | `lang.eval_in_loop(program, ctx=None, max_parallel=1)` | Drive an async-only Program from sync code by spinning a loop. |
| [first](#first) | `lang.first(program, ctx=None, max_parallel=1)` | Return the first item of a stream-rooted Program; `(value, ctx)`. |

## acollect

Async sibling of `collect`.

```python
lang.acollect(program, ctx=None, max_parallel=1)
```

Path `nu.lang.acollect`. Defined on `nu.lang.helpers.evaluation`, bound as a function. Builds `tuple[list, Context]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `program` | `Program` |  |  |
| `ctx` | `Context \| None` | `None` |  |
| `max_parallel` | `int` | `1` |  |

Undocumented: example.

## aeval

Drive a Program asynchronously; return `(value, ctx)`.

```python
lang.aeval(program, ctx=None, max_parallel=1)
```

Path `nu.lang.aeval`. Defined on `nu.lang.helpers.evaluation`, bound as a function. Builds `tuple[object, Context]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `program` | `Program` |  |  |
| `ctx` | `Context \| None` | `None` |  |
| `max_parallel` | `int` | `1` |  |

Undocumented: example.

## afirst

Async sibling of `first`.

```python
lang.afirst(program, ctx=None, max_parallel=1)
```

Path `nu.lang.afirst`. Defined on `nu.lang.helpers.evaluation`, bound as a function. Builds `tuple[object, Context]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `program` | `Program` |  |  |
| `ctx` | `Context \| None` | `None` |  |
| `max_parallel` | `int` | `1` |  |

Undocumented: example.

## alast

Drain a stream-rooted Program and return the last item; `(value, ctx)`.

```python
lang.alast(program, ctx=None, max_parallel=1)
```

Path `nu.lang.alast`. Defined on `nu.lang.helpers.evaluation`, bound as a function. Builds `tuple[object, Context]`.

Raises `RuntimeError` if the stream is empty.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `program` | `Program` |  |  |
| `ctx` | `Context \| None` | `None` |  |
| `max_parallel` | `int` | `1` |  |

Undocumented: example.

## collect

Materialize a stream-rooted Program to a list; `(values, ctx)`.

```python
lang.collect(program, ctx=None, max_parallel=1)
```

Path `nu.lang.collect`. Defined on `nu.lang.helpers.evaluation`, bound as a function. Builds `tuple[list, Context]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `program` | `Program` |  |  |
| `ctx` | `Context \| None` | `None` |  |
| `max_parallel` | `int` | `1` |  |

Undocumented: example.

## eval

Drive a Program synchronously; return `(value, ctx)`.

```python
lang.eval(program, ctx=None, max_parallel=1)
```

Path `nu.lang.eval`. Defined on `nu.lang.helpers.evaluation`, bound as a function. Builds `tuple[object, Context]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `program` | `Program` |  | a compiled Program. |
| `ctx` | `Context \| None` | `None` | the Context to drive against; a fresh one if omitted. |
| `max_parallel` | `int` | `1` | tree-wide concurrency gate. `1` is sequential. |

Undocumented: example.

## eval_in_loop

Drive an async-only Program from sync code by spinning a loop.

```python
lang.eval_in_loop(program, ctx=None, max_parallel=1)
```

Path `nu.lang.eval_in_loop`. Defined on `nu.lang.helpers.evaluation`, bound as a function. Builds `tuple[object, Context]`.

Convenience for the rare top-level sync caller whose Program contains an
async-only atom. Most callers should use `aeval` directly.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `program` | `Program` |  |  |
| `ctx` | `Context \| None` | `None` |  |
| `max_parallel` | `int` | `1` |  |

Undocumented: example.

## first

Return the first item of a stream-rooted Program; `(value, ctx)`.

```python
lang.first(program, ctx=None, max_parallel=1)
```

Path `nu.lang.first`. Defined on `nu.lang.helpers.evaluation`, bound as a function. Builds `tuple[object, Context]`.

Raises `RuntimeError` if the stream is empty.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `program` | `Program` |  |  |
| `ctx` | `Context \| None` | `None` |  |
| `max_parallel` | `int` | `1` |  |

Undocumented: example.

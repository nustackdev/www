---
title: parallel.parallel
description: "Parallel: join-on-all fan-in, smart + forced variants."
---

Module `nu.core.flows.parallel.parallel`.

Parallel: join-on-all fan-in, smart + forced variants.

- `Parallel` - smart. Sync uses the thread pool; async places each child
  per `Attr.ON_LOOP` (with per-child `(child, "threaded"|"async")`
  overrides taking precedence over the smart choice).
- `ParallelThreaded` - every child forced onto a worker thread under
  async. Rejects subtrees holding an async-only atom (compile-time law).
- `ParallelAsync` - every child forced onto the loop under async; the
  whole subtree becomes async-only, so sync `run` refuses it up front.
  Rejects subtrees holding a sync-only atom.
- `Gather` - alias for `Parallel`; kept for the yield-collecting name.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Gather](#gather) | `strategy` | `Gather(*items)` | Alias of `Parallel`, named for reading naturally at a yield site. |
| [Parallel](#parallel) | `strategy` | `Parallel(*items)` | Runs its children concurrently and joins once every one has finished. |
| [ParallelAsync](#parallelasync) | `strategy` | `ParallelAsync(*items)` | Parallel with every child forced onto the loop under async. |
| [ParallelThreaded](#parallelthreaded) | `strategy` | `ParallelThreaded(*items)` | Parallel with every child forced onto a worker thread under async. |

## Gather

Alias of `Parallel`, named for reading naturally at a yield site.

```python
Gather(*items)
```

Path `nu.core.flows.Gather`. Kind `Strategy`, sort `strategy`, cardinality `void`. Arity None (0 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*items` |  |  | children to run concurrently, each either a Nu instance or a `(child, "threaded"\|"async")` pair pinning its placement. |

**Notes**

- Identical to `Parallel` in every mechanical respect - same placement rules, same laws, same compiled thunks. The separate name exists so code that collects results reads `Gather` rather than `Parallel`.

**Example**

```python
nu.run(nu.Gather(nu.SetCmd(nu.AttrRef("a"), 1), nu.SetCmd(nu.AttrRef("b"), 2)))[1].attrs["b"]
```

```
2
```

Undocumented: yields.

## Parallel

Runs its children concurrently and joins once every one has finished.

```python
Parallel(*items)
```

Path `nu.core.flows.Parallel`. Kind `Strategy`, sort `strategy`, cardinality `void`. Arity None (0 required).

Each item is either a child or a `(child, "threaded"|"async")` pair
that pins that one child's placement. Sync `run` fans every child out
to the Budget's thread pool (or evaluates in order when
`max_parallel == 1`). Async `arun` places each child on a worker
thread or on the loop; an unpinned child follows the smart choice folded
from its subtree (`Attr.ON_LOOP`), a pinned child follows its own
`"threaded"`/`"async"` tag regardless of that fold. A smart
`Parallel` cannot host a Dyn child, since the smart fold needs every
child's async affinity visible at compile time; `ParallelThreaded` /
`ParallelAsync` force a mode instead of folding one.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*items` |  |  | children to run concurrently, each either a Nu instance or a `(child, "threaded"\|"async")` pair pinning its placement. |

**Notes**

- This is the `|` composition: `a | b` builds `Parallel(a, b)`.
- A child that raises propagates once its slot is awaited; the other children keep running and are not cancelled.
- Nothing here bounds how long a hung child is waited on - concurrent does not mean supervised.

**Example**

```python
nu.run(nu.Parallel(nu.SetCmd(nu.AttrRef("a"), 1), nu.SetCmd(nu.AttrRef("b"), 2)))[1].attrs["a"]
```

```
1
```

Undocumented: yields.

## ParallelAsync

Parallel with every child forced onto the loop under async.

```python
ParallelAsync(*items)
```

Path `nu.core.flows.ParallelAsync`. Kind `Strategy`, sort `strategy`, cardinality `void`. Arity None (0 required).

Declaring `requires_async` makes the whole subtree async-only, so a
sync `run` over it raises up front rather than reaching the thunk
below. Under `arun`, the smart fold and any per-child
`(child, "threaded")` tags are both overridden: every child runs on
the loop.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*items` |  |  | children to run concurrently. A per-child mode tag can still be passed for API symmetry with `Parallel` but has no effect, since `_FORCE_MODE` always wins. |

**Yields**

VOID, inherited from `Parallel`.

**Notes**

- Rejected at compile time when a child's subtree folds a sync-only atom, since the forced loop path cannot host one - the `parallel_async_no_sync_only_child` law.

Undocumented: example.

## ParallelThreaded

Parallel with every child forced onto a worker thread under async.

```python
ParallelThreaded(*items)
```

Path `nu.core.flows.ParallelThreaded`. Kind `Strategy`, sort `strategy`, cardinality `void`. Arity None (0 required).

The sync path is unchanged from `Parallel` (Budget's thread pool).
Under async, the smart fold and any per-child `(child, "async")` tags
are both overridden: every child lands on a worker thread.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*items` |  |  | children to run concurrently. A per-child mode tag can still be passed for API symmetry with `Parallel` but has no effect, since `_FORCE_MODE` always wins. |

**Yields**

VOID, inherited from `Parallel`.

**Notes**

- Rejected at compile time when a child's subtree folds an async-only atom, since a forced thread cannot host one - the `parallel_threaded_no_async_only_child` law.

Undocumented: example.

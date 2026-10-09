---
title: mp
description: "nustd.mp - the multiprocessing compute fabric."
---

Module `nustd.mp`.

nustd.mp - the multiprocessing compute fabric.

Same shape as `nustd.cluster`, backed by stdlib `multiprocessing` process
workers instead of ray actors. Zero-dependency, single-host: teleport a Nu
tree into a child process, run it there, get the result back.

- `MpWorker` - one long-lived child process hosting a Nu `Context`
  + tree executor. Provisioned per-instance by `Provide` / `ProvideList`
  / `ProvideDict`. `init` (a lifecycle bracket, typically `With(...)`)
  or `ctx_builder` (a callable) builds the worker's Context inside the
  child.
- `MpWorkerRef` - fabric ref. Reads the `MpWorker` bound on the
  Context.
- `Teleport` - the interaction; ships the body term to a tagged
  `MpWorker` and waits for its result. Works on both sync and async
  runtimes (pipe I/O is blocking either way; async wraps it off-thread).

Typical shape:

```python
Provide(MpWorker, {"name": "solo"},
    Teleport(some_tree),
)

ProvideList(MpWorker, [
    {"name": "w-0"},
    {"name": "w-1"},
],
    Sequential(
        Teleport(some_tree, target=0),
        Teleport(some_tree, target=1),
    ),
)
```

The default `start_method` is `"spawn"` - the child gets a clean
interpreter, so any callable / bracket you pass in `init` or
`ctx_builder` must be pickleable (top-level in a module, no closures).

## interactions

Module `nustd.mp.interactions`.

`Teleport`: ship the body to an `MpWorker` child process for execution.

Same shape as `nustd.cluster.Teleport` but targets `MpWorker` and works on
both sync and async runtimes - the parent-side pipe read/write is blocking
either way (async wraps it in `asyncio.to_thread`).

Policy: captures the body term (slot 0), resolves an `MpWorker` from ctx
by tag, and calls `worker.execute(body_term)` on it.

`target` is a single hashable used verbatim as the tag; omit (`UNSET`)
for the untagged singleton. `target=None` is a legitimate tag.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Teleport](#teleport) | `policy` | `Teleport(body, target=<UNSET>, carry=False)` | Runs the body in an `MpWorker` child process instead of in the caller. |

### Teleport

Runs the body in an `MpWorker` child process instead of in the caller.

```python
Teleport(body, target=<UNSET>, carry=False)
```

Path `nustd.mp.Teleport`. Kind `Policy`, sort `policy`, cardinality `transparent`. Arity 3 (1 required).

A policy over where, not what: the body is captured as a term and is
never evaluated locally. On each evaluation the tagged `MpWorker` is
read off the Context, the term goes down the pipe, and the child
compiles and evaluates it against its own Context before the value comes
back. Dropping a Teleport moves the work, it does not change it.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `body` | `Nu` |  | the Nu to run in the worker. Captured as a term, never run in the caller's process. |
| `target` | `object` | `<UNSET>` |  |
| `carry` | `bool` | `False` |  |

**Yields**

The value the body's root produced in the worker, None for an
effect-only body. When the body is a stream the collapsed remote
value is yielded as a one-item stream, and a None result yields an
empty one.

**Notes**

- `target` is the tag the `MpWorker` was bound under, passed verbatim to `ctx.get`: omit it for a bare `Provide`, the index for `ProvideList`, the key for `ProvideDict`. `None` is a usable tag, distinct from omitting it.
- `carry=True` copies the caller's `ctx.attrs` into a shallow copy of the worker's Context for that one execution, so loop variables bound by `Map` or `Filter` reach the body. Without it the body sees only what the worker's Context already holds.
- The body resolves its refs against the worker's Context, built in the child by the `MpWorker`'s `init` bracket or `ctx_builder`. Anything bound around the Teleport in the caller's tree is not visible there.
- Everything crossing the pipe is pickled, so the body term and what it captures must be pickleable.
- Both runtimes work. The pipe read blocks either way; the sync path blocks the calling thread, the async path waits off-thread so sibling work keeps running.
- A worker serves one request at a time behind a lock, so two Teleports at the same target serialize even under `Parallel`. Parallelism comes from binding a fleet and targeting each worker.
- A stream-rooted body evaluates to an async generator, which cannot be pickled back. Reduce it inside the body, with `Collect` or a fold, before teleporting.
- An exception raised in the child is sent back and re-raised here.

**Examples**

```python
Provide(MpWorker, {"name": "solo"},
    Teleport(Collect(heavy_stream)),
)
```

```python
ProvideList(MpWorker, [{"name": "w-0"}, {"name": "w-1"}],
    Parallel(
        Teleport(shard_0, target=0),
        Teleport(shard_1, target=1),
    ),
)
```

## refs

Module `nustd.mp.refs`.

`MpWorkerRef`: fabric ref that resolves the `MpWorker` bound on ctx.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [MpWorkerRef](#mpworkerref) | `ref` | `MpWorkerRef(address=None)` | The `MpWorker` bound on the Context. |

### MpWorkerRef

The `MpWorker` bound on the Context.

```python
MpWorkerRef(address=None)
```

Path `nustd.mp.MpWorkerRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Reading is a lookup and nothing else. No process is spawned, and the child of an already-provided worker is not contacted.
- The lookup runs against whichever Context is in force where the ref sits, so inside a `Teleport` body it reads the worker process's own Context rather than the parent's.

**Example**

```python
Provide(MpWorker, {"name": "solo"},
    MpWorkerRef().exists(),
)
```

**Methods**

#### `.fabric(ctx_builder=None, init=None, name=None, start_method='spawn')`

One long-lived child process hosting a Nu Context + tree executor.

Builds `None`.

`init` is a `_LifecycleBracket` (typically `With(Provide(...), ...)`)
shipped to the child. The child enters its `_aopen(Context())` on start
and keeps the resulting Context live until shutdown; the bracket's
resources tear down LIFO on `cleanup`.

`ctx_builder` is the alternative: a callable returning a Context (or
awaitable). Pass exactly one of `init` or `ctx_builder`, or neither
for a bare Context.

`start_method` is the `multiprocessing` start method (`"spawn"`,
`"fork"`, `"forkserver"`). Default `"spawn"` - cross-platform, the
child gets a clean interpreter, so `init` / `ctx_builder` (and their
captured state) must be pickleable.

`name` is forwarded to `Process` for readable `ps` output.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ctx_builder` | `Callable[[], Context \| Awaitable[Context]] \| None` | `None` |  |
| `init` | `_LifecycleBracket \| None` | `None` |  |
| `name` | `str \| None` | `None` |  |
| `start_method` | `str` | `'spawn'` |  |

Undocumented: example.

**Inherited methods**

From `nu.context.fabric.refs.FabricRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `FabricExists` | A Query yielding whether this Ref's fabric type is bound on the Context. |

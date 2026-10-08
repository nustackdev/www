---
title: refs
description: "`PoolRef`: the fabric ref that resolves the `WorkerPool` bound on ctx."
---

Module `nustd.mp_pool.refs`.

`PoolRef`: the fabric ref that resolves the `WorkerPool` bound on ctx.

A plain `FabricRef` and nothing more: the address is the fabric *type*, so
the read is the untagged binding. There is no tag child and no tag payload -
same shape `nustd.mp.MpWorkerRef` settled on.

It also carries this fabric's fluent surface. `PoolRef().launch()` and
`Launch(PoolRef())` build the same term; the methods exist so a pool ref
reads like the thing you address rather than an argument you thread, exactly
the way the Form mixins hang `set()` off an item ref.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [PoolRef](#poolref) | `ref` | `PoolRef(address=None)` | The `WorkerPool` bound on the Context. |

## PoolRef

The `WorkerPool` bound on the Context.

```python
PoolRef(address=None)
```

Path `nustd.mp_pool.PoolRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Reading it is a lookup and nothing else. No process is spawned and no worker is contacted; every interaction in this fabric takes this ref as a child and does the work itself.
- It is slot 0 of `Dispatch` and `Kill`, which is what satisfies the `ref_slots` law for those two: a VOID mutator has to land its write through a Ref to be observable at all.
- The lookup runs against whichever Context is in force where the ref sits, so a `PoolRef` inside a dispatched body reads the worker process's own Context, not the parent's.
- The methods below are a convenience over the constructors, not a second way of building anything: each one returns the same term the matching `Launch(...)` / `Kill(...)` call would.

**Example**

```python
Provide(WorkerPool, {"name": "nu"},
    Let("w", PoolRef().launch(), PoolRef().kill(AttrRef("w"))),
)
```

**Methods**

### `.fabric(init=None, start_method='spawn', name='nu', ready_timeout=30.0, grace=2.0)`

N worker processes owned by one bracket; the fleet itself is the fabric.

Builds `None`.

Provided once at the top of a tree:

```python
Provide(WorkerPool, {"init": With(...), "name": "nu"}, body)
```

and from there the interactions in this fabric address workers by id:
`Launch` spawns one and yields its id, `Dispatch` ships a resident
tree to it, `Teleport` does request/reply, `Kill` ends it. Bracket
close kills every worker that is still up, newest first.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `init` | `_LifecycleBracket \| None` | `None` | the lifecycle bracket every worker comes up holding. Shipped to the child, entered there, and torn down LIFO when the worker dies. `Launch` can override it per worker. |
| `start_method` | `str` | `'spawn'` | the `multiprocessing` start method. `"spawn"` by default, so the child gets a clean interpreter and `init` must be pickleable (top-level in a module, no closures). |
| `name` | `str` | `'nu'` | process name prefix; the worker id is appended. |
| `ready_timeout` | `float` | `30.0` | how long `launch` waits for the child to finish building its Context. |
| `grace` | `float` | `2.0` | how long a terminate is given before it escalates to SIGKILL, and how long each reap step waits. |

**Notes**

- No size, no warmth, no scheduling, no acquire/release. The pool owns processes and nothing else; policy is the caller's.
- Ids are monotonic and never reused, so a stale id reads as dead rather than as a different worker.
- Both lifecycles are supported. `acleanup` does its work inline with no await points at all, so a cancellation landing on the enclosing task cannot abandon a half-torn-down fleet.

Undocumented: example.

### `.launch(init=None)`

A `Launch` on this pool: spawn a worker, yield its id.

Builds `Launch`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `init` | `_LifecycleBracket \| Nu \| None` | `None` |  |

Undocumented: example.

### `.dispatch(body, worker=None, carry=False)`

A `Dispatch` on this pool: ship `body` to `worker`, do not wait.

Builds `Dispatch`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `body` | `Nu` |  |  |
| `worker` | `object` | `None` |  |
| `carry` | `bool` | `False` |  |

Undocumented: example.

### `.teleport(body, worker=None, carry=False)`

A `Teleport` on this pool: run `body` at `worker`, yield its value.

Builds `Teleport`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `body` | `Nu` |  |  |
| `worker` | `object` | `None` |  |
| `carry` | `bool` | `False` |  |

Undocumented: example.

### `.kill(worker=None)`

A `Kill` on this pool: end `worker` now and reap it.

Builds `Kill`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `worker` | `object` | `None` |  |

Undocumented: example.

### `.alive(worker=None)`

An `Alive` read on this pool: is `worker` still a live process.

Builds `Alive`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `worker` | `object` | `None` |  |

Undocumented: example.

### `.running(worker=None)`

A `Running` read on this pool: is a dispatched body still going.

Builds `Running`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `worker` | `object` | `None` |  |

Undocumented: example.

### `.workers()`

A `Workers` stream over this pool: every id it still tracks.

Builds `Workers`.

Undocumented: example.

**Inherited methods**

From `nu.context.fabric.refs.FabricRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `FabricExists` | A Query yielding whether this Ref's fabric type is bound on the Context. |

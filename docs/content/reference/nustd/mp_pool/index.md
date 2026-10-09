---
title: mp_pool
description: "nustd.mp_pool - the pool of worker processes, as one fabric."
---

Module `nustd.mp_pool`.

nustd.mp_pool - the pool of worker processes, as one fabric.

`nustd.mp` is the fabric of ONE process: its whole lifecycle is the
`With` / `Provide` bracket and it stays purely declarative.
`nustd.mp_pool` is the sibling where **the pool itself is the fabric**. One
`Provide` at the top of a tree owns N worker processes, and because the
fabric now spans many processes it legitimately owns interactions over them -
launch a worker, kill a worker, run a tree on worker id X. Those are
statements about the fabric's contents, not imperative escapes.

- `WorkerPool` - the resource. Owns `{id -> process}`. Bracket close kills
  every worker, newest first. No size, no warmth, no scheduling, no
  acquire/release: that is policy and belongs to callers.
- `PoolRef` - the fabric ref. Reading it is a lookup and nothing else. It
  also carries the fluent form of every interaction below.
- `Launch` / `Dispatch` / `Teleport` / `Kill` / `Alive` /
  `Running` / `Workers` - the interactions.

Everything is Nu. Every worker id and the `init` override is a **child**,
never payload, so a target can come from a `Ref`, an `AttrRef` or any
query:

```python
Provide(WorkerPool, {"init": With(Provide(Store, {...})), "name": "nu"},
    Sequential(
        SetCmd(AttrRef("w"), Launch()),
        Dispatch(body=resident_tree, worker=AttrRef("w")),
        SetCmd(AttrRef("n"), Teleport(body=Add(1, 2), worker=AttrRef("w"))),
        Kill(worker=AttrRef("w")),
    ),
)
```

The interactions are also reachable off the ref, which is the same term by a
shorter road:

```python
pool = PoolRef()
Sequential(
    SetCmd(AttrRef("w"), pool.launch()),
    pool.dispatch(resident_tree, AttrRef("w")),
    pool.kill(AttrRef("w")),
)
```

The one exception to "no payload" is a `Dispatch` body, which has to be
payload because a Command cannot hold a Flow in a child slot. The consequence
is worth knowing before you rely on it: a body in payload is not part of the
tree, so no walker, rewrite, analysis or render reaches it, and the caller has
to apply whatever passes it needs (`nustd.kv.auto_flow_atomic` among them) to
the body itself before building the `Dispatch`.

`Dispatch` vs `Teleport` is the crux. `Dispatch` returns as soon as the
child acknowledges receipt, so it is the verb for resident, never-terminating
trees - a `ReactForever` body using it never blocks. `Teleport` is
request/reply, for work that finishes.

Worker ids are monotonic ints and are never reused, so a stale id is
detectably dead rather than silently a different worker.

The default `start_method` is `"spawn"` - the child gets a clean
interpreter, so the `init` bracket and any dispatched body must be
pickleable (top-level in a module, no closures).

## interactions

Module `nustd.mp_pool.interactions`.

The interactions of the `nustd.mp_pool` fabric.

[Full entries](/docs/reference/nustd/mp_pool/interactions)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Alive](/docs/reference/nustd/mp_pool/interactions#alive) | `scalar_query` | `Alive(pool=None, worker=None)` | Whether the worker at this id is a process that is still up. |
| [Dispatch](/docs/reference/nustd/mp_pool/interactions#dispatch) | `scalar_command` | `Dispatch(pool=None, body=None, worker=None, carry=False)` | Ships the body to a worker and returns as soon as the child has it. |
| [Kill](/docs/reference/nustd/mp_pool/interactions#kill) | `scalar_command` | `Kill(pool=None, worker=None)` | Ends a worker now and reaps it. |
| [Launch](/docs/reference/nustd/mp_pool/interactions#launch) | `scalar_action` | `Launch(pool=None, init=None)` | Spawns one worker process in the pool and yields the id it got. |
| [Running](/docs/reference/nustd/mp_pool/interactions#running) | `scalar_query` | `Running(pool=None, worker=None)` | Whether a body dispatched to this worker is still executing. |
| [Teleport](/docs/reference/nustd/mp_pool/interactions#teleport) | `policy` | `Teleport(pool=None, body=None, worker=None, carry=False)` | Runs the body in a pool worker and yields what it produced there. |
| [Workers](/docs/reference/nustd/mp_pool/interactions#workers) | `stream_query` | `Workers(pool=None)` | Every worker id the pool still tracks, in launch order. |

## refs

Module `nustd.mp_pool.refs`.

`PoolRef`: the fabric ref that resolves the `WorkerPool` bound on ctx.

[Full entries](/docs/reference/nustd/mp_pool/refs)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [PoolRef](/docs/reference/nustd/mp_pool/refs#poolref) | `ref` | `PoolRef(address=None)` | The `WorkerPool` bound on the Context. |

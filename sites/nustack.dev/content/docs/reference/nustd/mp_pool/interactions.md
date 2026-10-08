---
title: interactions
description: "The interactions of the `nustd.mp_pool` fabric."
---

Module `nustd.mp_pool.interactions`.

The interactions of the `nustd.mp_pool` fabric.

Seven atoms over one `WorkerPool`: `Launch`, `Dispatch`, `Teleport`,
`Kill`, `Alive`, `Running`, `Workers`. Because the fabric spans many
processes, these are declarative statements about its contents rather than
imperative escapes - the same way `SetCmd` is a statement about the attrs
fabric.

**No caller value is payload.** Every worker id, every pool address and the
`init` override are children, so any of them can come from a `Ref`, an
`AttrRef` or any query. `nustd.mp.Teleport` keeps its target in
`self._payload`, which pins it at construction time; that is the mistake
this fabric exists not to repeat.

The one thing that *is* payload is `Dispatch`'s body, and it is payload for
a structural reason, not a shortcut. See the warning on that class: a body in
payload is not part of the tree, so no walker reaches it.

Slot order, which is what the laws read:

==========  =========================  ============  ====================
atom        slots                      sort          mutates
==========  =========================  ============  ====================
Launch      (pool, init)               ScalarAction  {0}
Dispatch    (pool, worker)             Command       {0}
Teleport    (body, pool, worker)       Policy        -
Kill        (pool, worker)             Command       {0}
Alive       (pool, worker)             ScalarQuery   -
Running     (pool, worker)             ScalarQuery   -
Workers     (pool,)                    StreamQuery   -
==========  =========================  ============  ====================

`Dispatch` carries its body in `_payload["body"]`; `Teleport` carries
its body as `children[0]`. The asymmetry is intended:

- `Dispatch` and `Kill` are VOID mutators, so `ref_slots` requires the
  mutation slot to hold a Ref. The pool ref is slot 0 in both.
- A Command's composition row holds value-yielding children only, and a
  resident body is typically a Flow (`ForeverDo`, `ReactForever`). A Flow
  in a Command's slot does not compose, so `Dispatch`'s body cannot be a
  child at all while `Dispatch` is a Command - hence the payload.
- `Teleport` is a Span, and Span transparency resolves both sort and
  cardinality from `children[0]`. Its body therefore *has* to be slot 0 or
  the node would present itself to its parent as a scalar ref. The
  constructor signature still reads `Teleport(pool, body, worker)`; only
  the child order differs.

.. warning:
   A `Dispatch` body is not part of the tree it sits in. Tree walkers,
   rewrites, analyses and renders all traverse `_children`, and payload is
   opaque to every one of them, so a dispatched body is silently skipped by
   whatever pass runs over the enclosing tree. Any pass the body needs must
   be applied by the caller, to the body, before the `Dispatch` is built.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Alive](#alive) | `scalar_query` | `Alive(pool=None, worker=None)` | Whether the worker at this id is a process that is still up. |
| [Dispatch](#dispatch) | `scalar_command` | `Dispatch(pool=None, body=None, worker=None, carry=False)` | Ships the body to a worker and returns as soon as the child has it. |
| [Kill](#kill) | `scalar_command` | `Kill(pool=None, worker=None)` | Ends a worker now and reaps it. |
| [Launch](#launch) | `scalar_action` | `Launch(pool=None, init=None)` | Spawns one worker process in the pool and yields the id it got. |
| [Running](#running) | `scalar_query` | `Running(pool=None, worker=None)` | Whether a body dispatched to this worker is still executing. |
| [Teleport](#teleport) | `policy` | `Teleport(pool=None, body=None, worker=None, carry=False)` | Runs the body in a pool worker and yields what it produced there. |
| [Workers](#workers) | `stream_query` | `Workers(pool=None)` | Every worker id the pool still tracks, in launch order. |

## Alive

Whether the worker at this id is a process that is still up.

```python
Alive(pool=None, worker=None)
```

Path `nustd.mp_pool.Alive`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (0 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `pool` | `Nu \| None` | `None` | the node yielding the `WorkerPool`. Defaults to the untagged `PoolRef`. |
| `worker` | `object` | `None` | the node yielding the worker id. |

**Yields**

True or False.

**Notes**

- A pure parent-side read of the process state; the child is never contacted, so a worker wedged in a tight loop still reads alive.
- An id that was killed, or never launched, reads False. Ids are never reused, so False is permanent for that id.

**Example**

```python
Alive(worker=AttrRef("w"))
```

## Dispatch

Ships the body to a worker and returns as soon as the child has it.

```python
Dispatch(pool=None, body=None, worker=None, carry=False)
```

Path `nustd.mp_pool.Dispatch`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 4 (0 required).

The verb for resident work - a tree that subscribes, loops, serves, and is
never expected to produce a value. The parent waits only for the child's
acknowledgement of receipt, so a `Dispatch` sitting inside a
`ReactForever` body never blocks that loop. Nothing ever awaits the
dispatched body; the only things that end it are `Kill` and pool
teardown.

Use `Teleport` instead when the work finishes and the value is the
point. Awaiting a reply from a resident body is the failure this split
exists to design away.

.. warning:
   **The body is payload, so it is not part of the tree.** Every pass Nu
   has - every walker, rewrite, analysis and the box-tree render -
   traverses `_children`, and payload is opaque to all of them. A
   dispatched body is therefore invisible to whatever runs over the tree
   that contains the `Dispatch`, and will be silently skipped rather
   than reported as unsupported.

   The caller owns that. Apply whatever passes the body needs *to the
   body*, before constructing the `Dispatch`:

```python
Dispatch(body=some_pass(resident_tree), worker=AttrRef("w"))
```

   `nustd.kv.auto_flow_atomic` is one such pass, and a good illustration of
   the cost: wrapping the enclosing tree leaves kv writes inside a
   dispatched body with no enclosing `Transaction` at run time, and
   nothing anywhere says so. It is an example, not the rule - the rule is
   that *no* pass reaches in here.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `pool` | `Nu \| None` | `None` | the node yielding the `WorkerPool`. Defaults to the untagged `PoolRef`. |
| `body` | `Nu \| None` | `None` | the tree to run in the worker. Kept in `_payload["body"]`, captured as a term, never evaluated in the caller. |
| `worker` | `object` | `None` | the node yielding the worker id. Any Nu - the id is still a child, so it can be a `Literal`, an `AttrRef` or a query. |
| `carry` | `bool` | `False` |  |

**Yields**

Nothing.

**Notes**

- It is a Command: it writes the pool through a Ref and yields nothing. That is also why the body cannot be a child - a Command's composition row holds value-yielding children only, and a resident body is usually a Flow.
- Because the body is not a child, no law sees it either. A body whose root yields a value is refused in the constructor instead, since nothing would consume that value.
- The body resolves its refs against the *worker's* Context, built in the child by the pool's (or the launch's) `init` bracket. Anything bound around the Dispatch in the caller's tree is not visible there.
- `carry=True` copies the caller's `ctx.attrs` into a copy of the worker's Context for that one body, so loop variables bound by `Map` or `Filter` reach it.
- Everything crossing the pipe is pickled, so the body term and what it captures must be pickleable.
- Several bodies can be dispatched to one worker; they run as concurrent tasks in the child's loop. A body that blocks the loop rather than awaiting will starve its siblings, which is a property of the body, not of the pool.
- An exception from a dispatched body is reported to the parent and dropped: there is no waiter to raise it in. `Running` going False is the only local signal that a body ended.

**Example**

```python
Dispatch(body=resident_tree, worker=AttrRef("w"))
```

## Kill

Ends a worker now and reaps it.

```python
Kill(pool=None, worker=None)
```

Path `nustd.mp_pool.Kill`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 2 (0 required).

A real kill, not a cooperative stop: a worker busy running a resident body
may never read its pipe again, so asking it nicely is asking to wait
forever. The process gets SIGTERM, a short grace period, then SIGKILL, and
is reaped either way.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `pool` | `Nu \| None` | `None` | the node yielding the `WorkerPool`. Defaults to the untagged `PoolRef`. |
| `worker` | `object` | `None` | the node yielding the worker id. Any Nu - a Literal, an `AttrRef`, a query over a shape. |

**Yields**

Nothing.

**Notes**

- Idempotent. An id that was already killed, or was never launched at all, is a no-op rather than an error, so a retry or a double-kill in a race costs nothing.
- It returns only once the process is reaped, so nothing is left in Z state behind it.
- Anything still waiting on that worker - a `Teleport` in flight on another thread - fails with `WorkerGone` rather than hanging.

**Example**

```python
Kill(worker=AttrRef("w"))
```

## Launch

Spawns one worker process in the pool and yields the id it got.

```python
Launch(pool=None, init=None)
```

Path `nustd.mp_pool.Launch`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`. Arity 2 (0 required).

The call returns once the child has finished building its Context and
said READY, so the id it yields is immediately usable as a target.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `pool` | `Nu \| None` | `None` | the node yielding the `WorkerPool`. Defaults to the untagged `PoolRef`. |
| `init` | `_LifecycleBracket \| Nu \| None` | `None` | a lifecycle bracket this one worker comes up holding, overriding the pool's own. A bracket is carried as a value, so a Ref or any query yielding one works here too. None means "use the pool's". |

**Yields**

The new worker's id, an int.

**Notes**

- Ids are monotonic and never reused, so an id kept past a `Kill` reads as dead rather than pointing at some later worker.
- This both mutates the pool and yields, which is why it is an action rather than a query: evaluating it twice launches two processes.
- Under `spawn` (the default start method) the bracket is pickled into the child, so it has to be pickleable - top-level in a module, no closures.
- A child that fails to build its Context is killed and reaped before the error propagates, so a failed launch leaves nothing behind.

**Example**

```python
Provide(WorkerPool, {"name": "nu"},
    SetCmd(AttrRef("w"), Launch()),
)
```

## Running

Whether a body dispatched to this worker is still executing.

```python
Running(pool=None, worker=None)
```

Path `nustd.mp_pool.Running`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (0 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `pool` | `Nu \| None` | `None` | the node yielding the `WorkerPool`. Defaults to the untagged `PoolRef`. |
| `worker` | `object` | `None` | the node yielding the worker id. |

**Yields**

True or False.

**Notes**

- Parent-side bookkeeping, not a ping: the answer is True from the child's acknowledgement of a `Dispatch` until it reports that body finished. So a worker that stops servicing its pipe does not turn this into a hang.
- It counts dispatched bodies only. A `Teleport` in flight is the caller's own blocking call and is not reflected here.
- A snapshot: the body can finish the instant after it is read.

**Example**

```python
Running(worker=AttrRef("w"))
```

## Teleport

Runs the body in a pool worker and yields what it produced there.

```python
Teleport(pool=None, body=None, worker=None, carry=False)
```

Path `nustd.mp_pool.Teleport`. Kind `Policy`, sort `policy`, cardinality `transparent`. Arity 4 (0 required).

Request/reply, for work that finishes. A policy over where, not what: the
body is captured as a term, never evaluated locally, and dropping the
Teleport moves the work without changing it.

The difference from `Dispatch` is the waiting. This one blocks until the
child answers, which is correct for a computation and catastrophic for a
resident tree.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `pool` | `Nu \| None` | `None` | the node yielding the `WorkerPool`. Defaults to the untagged `PoolRef`. |
| `body` | `Nu \| None` | `None` | the Nu to run in the worker. |
| `worker` | `object` | `None` | the node yielding the worker id. Any Nu, so the target can be computed - which is the whole point of this fabric's version. |
| `carry` | `bool` | `False` |  |

**Yields**

The value the body's root produced in the worker, None for an
effect-only body. A stream-shaped consumer gets the collapsed remote
value as a one-item stream.

**Notes**

- The body is `children[0]` even though the constructor takes it second: a Span resolves its sort and cardinality from its first child, so anything else there would make the node present as a ref.
- The body resolves its refs against the worker's Context. `carry=True` copies the caller's `ctx.attrs` across for that one execution.
- Both runtimes work. The pipe read blocks either way; the sync path blocks the calling thread, the async path waits off-thread.
- A stream-rooted body evaluates to an async generator, which cannot be pickled back. Reduce it inside the body with `Collect` or a fold before teleporting.
- An exception raised in the child comes back and is re-raised here. One that cannot be pickled is replaced by a `RuntimeError` carrying its type and message.
- If the worker is killed while the call is in flight it raises `WorkerGone` rather than hanging.

**Example**

```python
Teleport(body=Collect(heavy_stream), worker=AttrRef("w"))
```

## Workers

Every worker id the pool still tracks, in launch order.

```python
Workers(pool=None)
```

Path `nustd.mp_pool.Workers`. Kind `StreamQuery`, sort `stream_query`, cardinality `stream`. Arity 1 (0 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `pool` | `Nu \| None` | `None` | the node yielding the `WorkerPool`. Defaults to the untagged `PoolRef`. |

**Yields**

The worker ids, ints, ascending.

**Notes**

- Killed ids are gone from the stream; an id that is present may still be a dead process, which is what `Alive` is for.
- The list is taken as a snapshot before the stream starts, so a concurrent launch or kill does not disturb the iteration.

**Example**

```python
Collect(Workers())
```

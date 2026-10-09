---
title: interactions.atomicity
description: "Atomic boundaries over KV storage, and the retry that makes them survivable."
---

Module `nustd.kv.interactions.atomicity`.

Atomic boundaries over KV storage, and the retry that makes them survivable.

The core `Snapshot` and `Transaction` brackets are shape only: they mark a
region of the tree and run the body unchanged. The versions here fill that
shape in against real storage. Each overrides one lifecycle method, `_open`,
written as a `@contextmanager`: it finds the Navigator on the ctx, binds a
handle under it, hands the scoped ctx to the body, and tears the handle down
on the way out.

Binding is lazy, through `ctx.lazy`. A bracket that wraps a body which turns
out never to touch storage opens nothing, so wrapping generously costs nothing.
That is what makes `auto_flow_atomic` safe to run over a whole tree.

The open handles live in the contextmanager's frame, captured by closure. They
are never put on `self`, because a Term is immutable and one instance is
shared across every execution of the program that holds it.

`scope` is a plain data attribute, not part of the lifecycle: a shape tag
that says which Navigator this boundary is for. In a sharded setup, several
Navigators sit on the ctx under different tags, and the tag routes the bracket
to the right one. It also rides the atom's payload rather than an instance
attribute, so a tree rewrite carries it through.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Snapshot](#snapshot) | `bracket` | `Snapshot(scope=None)` | Gives its body one consistent read view of storage, and closes it after. |
| [Transaction](#transaction) | `bracket` | `Transaction(scope=None)` | Runs its body inside a write transaction: all of it lands, or none of it. |
| [RetryOnConflict](#retryonconflict) | `policy` | `RetryOnConflict(body, max_attempts=5, delay=0.1, backoff=2.0, jitter=0.5, errors=None, on_attempt_fail=None, on_success=None, on_fail=None)` | Re-runs its body when a storage transaction loses a race, and only then. |
| [Atomic](#atomic) |  | `kv.Atomic(scope=None)` | Brackets a body with whichever boundary its own writes call for. |

## Snapshot

Gives its body one consistent read view of storage, and closes it after.

```python
Snapshot(scope=None)
```

Path `nustd.kv.Snapshot`. Kind `Bracket`, sort `bracket`, cardinality `transparent`. Arity 1 (0 required).

Every read inside sees storage as it stood when the snapshot opened, so a
body reading the same key twice gets the same answer both times even if a
concurrent writer moved it in between. Nothing is committed on the way out;
there is nothing to commit.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `scope` | `Hashable \| None` | `None` | which Navigator to snapshot, by shape tag. None means the untagged one, which is the whole story unless storage is sharded. |

**Yields**

The body's own value, unchanged.

**Notes**

- The snapshot opens on first read, not on entry, so a body that never touches storage opens nothing.
- Under a stream body the boundary spans the whole drain, not just the call that builds the stream, so the consumer still reads against a live snapshot.
- With several Navigators bound under the same tag, one snapshot is opened per Navigator and all of them close on exit.
- Binds no write handle, so a mutating op placed inside has no transaction of its own to write through.

**Example**

```python
app = nu.With(
    nustd.kv.memory_navigator(),
    body=Snapshot(State.counters["hits"], State.counters["misses"]),
)
```

## Transaction

Runs its body inside a write transaction: all of it lands, or none of it.

```python
Transaction(scope=None)
```

Path `nustd.kv.Transaction`. Kind `Bracket`, sort `bracket`, cardinality `transparent`. Arity 1 (0 required).

Writes buffer in the transaction and become visible to everyone else at
the commit, which happens when the body finishes cleanly. Anything raised
out of the body aborts instead, and the exception carries on up, so a
half-applied write is not a state the rest of the program can observe.
Reads inside see the transaction's own pending writes.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `scope` | `Hashable \| None` | `None` | which Navigator to open the transaction against, by shape tag. None means the untagged one. |

**Yields**

The body's own value, unchanged.

**Notes**

- The transaction opens on first use, not on entry, so a body that never touches storage opens nothing and commits nothing.
- Under a stream body the boundary spans the whole drain, so the commit waits for the consumer to finish rather than firing when the stream is built.
- Aborts on any BaseException, including cancellation, not only on Exception.
- With several Navigators bound under the same tag, one transaction is opened per Navigator and each commits on its own. Atomicity is per storage, not across them.
- Committing can lose to a concurrent writer. Wrap in `RetryOnConflict` where that is expected.

**Examples**

```python
class State(nu.Shape):
    hits = nustd.kv.IntRef.slot()
```

```python
app = nu.With(
    nustd.kv.memory_navigator(),
    body=RetryOnConflict(Transaction(State.hits.inc())),
)
```

## RetryOnConflict

Re-runs its body when a storage transaction loses a race, and only then.

```python
RetryOnConflict(body, max_attempts=5, delay=0.1, backoff=2.0, jitter=0.5, errors=None, on_attempt_fail=None, on_success=None, on_fail=None)
```

Path `nustd.kv.RetryOnConflict`. Kind `Policy`, sort `policy`, cardinality `transparent`. Arity 9 (1 required).

Under concurrent writers a transaction that touches a hot key can fail to
commit, or time out waiting for a lock. Neither is a real error: the work
is still valid, it just needs doing again against fresh state. This is
`Retry` with exactly those two failures selected, so everything else -
a bug, a bad value, a missing key - still surfaces on the first try
instead of being run four more times.

Wrap it around the Transaction, not inside it. The retry has to re-enter
the boundary for the second attempt to see the state that beat it.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `body` | `Nu` |  | the Term to re-run. Normally a Transaction. |
| `max_attempts` | `IntArg` | `5` |  |
| `delay` | `FloatArg` | `0.1` |  |
| `backoff` | `FloatArg` | `2.0` |  |
| `jitter` | `FloatArg` | `0.5` |  |
| `errors` | `tuple[type[Exception], ...] \| type[Exception] \| None` | `None` |  |
| `on_attempt_fail` | `Nu \| None` | `None` |  |
| `on_success` | `Nu \| None` | `None` |  |
| `on_fail` | `Nu \| None` | `None` |  |

**Yields**

The body's value from the attempt that commits.

**Notes**

- Takes `Retry`'s keyword-only tuning as well - `max_attempts`, `delay`, `backoff`, `jitter`, `errors`, and the `on_attempt_fail` / `on_success` / `on_fail` hooks - with the same meanings.
- The defaults differ from `Retry`'s: five attempts rather than three, and a real delay with backoff and jitter, because they are set for hot-key contention rather than for a generic failure. The jitter is what stops a set of contending writers retrying in lockstep.
- Passing `errors` replaces the conflict set entirely, so use it only to widen or narrow what counts as retryable.
- Only the async path honours delay, backoff, jitter and the hooks. A sync run retries immediately.
- Exhausting the attempts re-raises the last conflict, so a caller that must not fail needs its own ceiling above this one.

**Example**

```python
app = nu.With(
    nustd.kv.memory_navigator(),
    body=RetryOnConflict(
        Transaction(State.hits.inc()),
        max_attempts=20,
    ),
)
```

## Atomic

Brackets a body with whichever boundary its own writes call for.

```python
kv.Atomic(scope=None)
```

Path `nustd.kv.Atomic`. Defined on `nustd.kv.interactions.atomicity`, bound as a function. Builds `Snapshot | Transaction`.

Saves the caller from having to know whether a branch mutates. It scans
the body for any node declaring a mutation position and returns a
Transaction if it finds one, a Snapshot if it does not.

The decision is made here, while the tree is being built, so what ends up
in the tree is an ordinary `Snapshot` or `Transaction` node and every
later pass sees a concrete type rather than a choice still to be made.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `scope` | `Hashable \| None` | `None` | the shape tag handed to whichever bracket is chosen. |

**Notes**

- Spelled like a class because it stands in for one at every call site; it is a function and cannot be subclassed or matched on.
- The scan reads declared mutation positions off the node classes, so it sees only writes already present in the tree at build time.
- It descends through everything, brackets included, so a write already covered by a nested Transaction still counts.
- For a whole tree rather than one body, `auto_flow_atomic` makes the same decision per Flow branch.

**Example**

```python
app = nu.With(
    nustd.kv.memory_navigator(),
    body=Atomic(State.hits.inc()),  # a Transaction
)
```

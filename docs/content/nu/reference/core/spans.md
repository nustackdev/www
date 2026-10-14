---
title: spans
description: "Span atoms: transparent Interactions that wrap a body to govern a region."
---

Module `nu.core.spans`.

Span atoms: transparent Interactions that wrap a body to govern a region.

A Span does no work of its own; it forwards the body's yield in the same shape
(TRANSPARENT cardinality) and shapes the surroundings - lifecycle (Bracket) or
execution policy (Policy). The body is the required slot-0 child; auxiliary
children sit alongside and are consumed internally.

`TryCatch`, `Retry`, `Timeout` - execution policy on failure or in time.

`Snapshot`, `Transaction` - lifecycle boundaries. The core ships them as
model-level shapes with no-op hooks (a bare bracket runs its body); a fabric
subclasses them and overrides the lifecycle hooks to drive a real store.

## policy

Module `nu.core.spans.policy`.

Policy spans: execution policy around a body.

Nu's Policy sub-shape of Span governs how a body runs on failure or in time:
re-run it, fall back, give up, bound it, rate-limit it. A Span is transparent
(TRANSPARENT cardinality): it forwards the body's yield in the same shape -
scalar, stream, or nothing - and the `span_cardinality_matches_body` law holds
the wrapper to the body's resolved cardinality.

- `TryCatch` - try / catch / finally with a typed error filter.
- `Retry` - re-run the body on failure, with backoff, jitter, a typed filter,
  and per-attempt hooks (async path).
- `Timeout` - bound the body by a wall-clock limit (async-only).

Conventions (see `AUTHORING.md`): structure lives in the tree, not `payload`
(an absent optional branch is a `Noop` slot; names are `StrArg` children;
numeric knobs are returning children); `ctx.attrs` is the one inter-Nu channel
(the caught error and the attempt count are `let`-bound there for the
handler that reads them, and only for as long as it runs; a handler written as
a lambda gets refs to them as its parameters); async-only atoms
declare `requires_async` and raise on the sync path as a backstop (the sync
entry refuses the subtree first).

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Retry](#retry) | `policy` | `Retry(body, max_attempts=3, delay=0.0, backoff=1.0, jitter=0.0, errors=None, on_attempt_fail=None, on_success=None, on_fail=None, error_key=None, attempt_key=None)` | Re-runs the body on a matching failure, up to `max_attempts` times. |
| [Timeout](#timeout) | `policy` | `Timeout(timeout, body, on_timeout=None)` | Bounds the body by a wall-clock limit; runs `on_timeout` if it's hit. |
| [TryCatch](#trycatch) | `policy` | `TryCatch(body, catch=None, finally_=None, errors=None, error_key=None)` | Runs `catch` when the body raises a matching error; `finally_` always runs after. |

### Retry

Re-runs the body on a matching failure, up to `max_attempts` times.

```python
Retry(body, max_attempts=3, delay=0.0, backoff=1.0, jitter=0.0, errors=None, on_attempt_fail=None, on_success=None, on_fail=None, error_key=None, attempt_key=None)
```

Path `nu.core.spans.Retry`. Kind `Policy`, sort `policy`, cardinality `transparent`. Arity 11 (1 required).

Sync runs a bare retry: `max_attempts` and `errors` only, no delay,
backoff, jitter or hooks. Async runs the full policy: `delay` grows by
`backoff` each attempt, `jitter` decorrelates the wait, and
`on_attempt_fail` / `on_success` / `on_fail` fire with the
attempt count and error bound. A hook is a lambda over what it can see
(`lambda err, attempt: ...` for a failure, `lambda attempt: ...` for
success, where there is no error), or a tree reading them under
`error_key` / `attempt_key`. A stream body is
retried by atomic re-evaluation - drained fresh each attempt, emitted
only on success, bounded streams only - and the stream path skips the
per-attempt hooks.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `body` | `Nu` |  | the Term to re-run. |
| `max_attempts` | `IntArg` | `3` | the ceiling on attempts, including the first. |
| `delay` | `FloatArg` | `0.0` | the wait before the first retry, in seconds (async only). |
| `backoff` | `FloatArg` | `1.0` | the multiplier applied to `delay` after each attempt (async only). |
| `jitter` | `FloatArg` | `0.0` | the fraction of `delay` to randomize by, `0` to `1` (async only). |
| `errors` | `tuple[type[Exception], ...] \| type[Exception] \| None` | `None` | the exception type(s) that trigger a retry. `None` matches any exception; an unmatched one propagates unretried. |
| `on_attempt_fail` | `Flow \| Command \| Span \| None` | `None` | runs after a failed attempt that still has retries left (async only): `lambda err, attempt: ...` or a tree. Optional. |
| `on_success` | `Flow \| Command \| Span \| None` | `None` | runs once the body succeeds (async only): `lambda attempt: ...` or a tree. Optional. |
| `on_fail` | `Flow \| Command \| Span \| None` | `None` | runs once attempts are exhausted, in place of re-raising (async only): `lambda err, attempt: ...` or a tree. Optional. |
| `error_key` | `StrArg \| None` | `None` | where the failing attempt's error message lands in the attrs fabric for a tree hook to read. Defaults to `"error"`. |
| `attempt_key` | `StrArg \| None` | `None` | where the attempt number (from 1) lands in the attrs fabric for a tree hook to read. Defaults to `"attempt"`. |

**Yields**

The body's value on the attempt that succeeds. On exhaustion:
re-raises the last error, unless `on_fail` is set, in which case
it yields `None` after running the hook.

**Notes**

- Each hook binds under names of its own, so lambda hooks and tree hooks mix freely. An explicit name next to a lambda hook that binds the same value raises.
- A lambda hook runs once, at construction, and gets refs, not values: it builds the hook and never inspects them in Python.

**Examples**

```python
import asyncio
asyncio.run(nu.arun(nu.Retry(nu.Div(1, 1), max_attempts=1)))[0]
```

```
1.0
```

```python
A hook reading what it is handed:
```

```python
gave_up = lambda err, attempt: nu.print("gave up after", attempt, "-", err)
_ = asyncio.run(nu.arun(nu.Retry(nu.Div(1, 0), max_attempts=2, on_fail=gave_up)))
```

```
gave up after 2 - division by zero
```

### Timeout

Bounds the body by a wall-clock limit; runs `on_timeout` if it's hit.

```python
Timeout(timeout, body, on_timeout=None)
```

Path `nu.core.spans.Timeout`. Kind `Policy`, sort `policy`, cardinality `transparent`. Arity 3 (2 required).

Async-only.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `timeout` | `FloatArg` |  | the wall-clock limit, in seconds. |
| `body` | `Nu` |  | the bounded Term. |
| `on_timeout` | `Flow \| Command \| Span \| None` | `None` | runs against the live context if the limit is hit. Optional: without it, the timeout raises `TimeoutError`. |

**Yields**

The body's value. `None` if `on_timeout` ran; otherwise
`TimeoutError` propagates.

**Notes**

- Hitting the limit cancels the body; a sync-only body offloaded to a thread can't be interrupted, so the limit stops the wait, not the thread itself.
- A cancel from outside always propagates, even when it lands as the body finishes.

**Example**

```python
import asyncio
asyncio.run(nu.arun(nu.Timeout(0.01, nu.Div(1, 1))))[0]
```

```
1.0
```

### TryCatch

Runs `catch` when the body raises a matching error; `finally_` always runs after.

```python
TryCatch(body, catch=None, finally_=None, errors=None, error_key=None)
```

Path `nu.core.spans.TryCatch`. Kind `Policy`, sort `policy`, cardinality `transparent`. Arity 5 (1 required).

Children (fixed): `[body, catch, finally_, error_key]`. An absent
`catch` / `finally_` is a `Noop` slot. `catch` runs with the
caught error bound at `error_key` for as long as it runs, a stream
catch for its whole drain; `finally_` runs after, on success or failure
alike.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `body` | `Nu` |  | the guarded Term. |
| `catch` | `Nu \| None` | `None` | runs on a matching failure, in place of the body: a lambda over the caught error, or a tree. Optional. |
| `finally_` | `Flow \| Command \| Span \| None` | `None` | runs after, regardless of outcome. Optional. |
| `errors` | `tuple[type[Exception], ...] \| type[Exception] \| None` | `None` | the exception type(s) to catch. `None` catches everything; an unmatched exception propagates past this node untouched. |
| `error_key` | `StrArg \| None` | `None` | where the caught exception (a `CaughtError`) lands in the attrs fabric for a tree `catch` to read. Defaults to `"error"`; a lambda mints its own. |

**Yields**

The body's value on success, or `catch`'s value on a caught
failure. Transparent otherwise: forwards the branch's shape as-is.

**Notes**

- The lambda runs once, at construction, and gets a ref to the error, not the error: it builds the handler and never inspects it in Python.

**Examples**

```python
nu.run(nu.TryCatch(nu.Div(1, 0), catch=lambda err: "failed: " + nu.Str(err)))[0]
```

```
'failed: division by zero'
```

```python
A tree catch, reading the error under the default name:
```

```python
nu.run(nu.TryCatch(nu.Div(1, 0), catch=nu.Str(nu.Attr("error")).upper()))[0]
```

```
'DIVISION BY ZERO'
```

## bracket

Module `nu.core.spans.bracket`.

Bracket spans: lifecycle boundaries around a body.

A Bracket is the lifecycle sub-shape of Span (sort BRACKET). It runs the body
inside a scope it opens before and tears down after, a snapshot to read
against, a transaction to commit or roll back. Transparent like every Span, it
forwards the body's yield unchanged (scalar, stream, or nothing).

The core ships two named brackets, `Snapshot` and `Transaction`, as the
model-level shapes. Their lifecycle is a no-op here: a bare core bracket just
runs its body. A fabric subclasses them and overrides the lifecycle to talk to a
real store (see `nustd.kv.interactions.atomicity`).

The lifecycle is one method, `_open` - a context manager. It opens the
boundary, provides what it opened on the task's own fabrics store for the
body, then commits on a clean exit or rolls back on an exception:

    @contextmanager
    def _open(self, ctx):
        txns = [...open...]                           # per-run handles, in the frame
        try:
            with ctx.fabrics.lazy(Txn, open_txn):     # provided for the body
                yield                                 # body runs here
        except BaseException:
            for t in txns: t.abort()                  # roll back, then re-raise
            raise
        else:
            for t in txns: t.commit()                 # commit

The per-run handles (the open snapshots, the open transactions) live in the
context manager's own frame, captured by closure - never on `self`. A Term is
immutable and shared across every execution, so it can hold no per-run state
(see `AUTHORING.md` - "No per-run or cross-call state"). The Context is never
replaced: the scope lives in the store and ends with the `with`. For a stream
body the scope spans the drain: it opens when the stream starts and closes
(commit / rollback) when it is exhausted, realizing the body's stream inside
the boundary.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Snapshot](#snapshot) | `bracket` | `Snapshot(body)` | Read-only boundary around a body: snapshots its reads, nothing to commit. |
| [Transaction](#transaction) | `bracket` | `Transaction(body)` | Atomic boundary around a body: commits on success, rolls back on failure. |

### Snapshot

Read-only boundary around a body: snapshots its reads, nothing to commit.

```python
Snapshot(body)
```

Path `nu.core.spans.Snapshot`. Kind `Bracket`, sort `bracket`, cardinality `transparent`. Arity 1 (1 required).

At the core level `_open` is a pass-through, so a bare
`Snapshot(body)` runs the body unchanged. A fabric-aware Snapshot
subclasses this and overrides `_open` to open a real read snapshot and
close it after, giving the body a consistent view to read against.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `body` |  |  | the interaction to run inside the boundary. |

**Yields**

The body's own yield, unchanged. A core Snapshot adds no lifecycle
of its own; only a fabric's override does.

**Example**

```python
nu.run(nu.Snapshot(nu.Add(1, 2)))[0]
```

```
3
```

### Transaction

Atomic boundary around a body: commits on success, rolls back on failure.

```python
Transaction(body)
```

Path `nu.core.spans.Transaction`. Kind `Bracket`, sort `bracket`, cardinality `transparent`. Arity 1 (1 required).

At the core level `_open` is a pass-through, so a bare
`Transaction(body)` runs the body unchanged. A fabric-aware
Transaction subclasses this and overrides `_open` to open a real
write transaction, committing it on a clean exit and aborting it if the
body raises.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `body` |  |  | the interaction to run inside the boundary. |

**Yields**

The body's own yield, unchanged. A core Transaction adds no
lifecycle of its own; only a fabric's override does.

**Example**

```python
nu.run(nu.Transaction(nu.Add(1, 2)))[0]
```

```
3
```

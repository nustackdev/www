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

`TryCatch`, `Retry`, `Timeout`, `Throttle`, `Debounce` - execution
policy on failure or in time.

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
- `Throttle` - drop body runs inside an interval of the prior run (async-only).
- `Debounce` - delay the body, cancelling a pending run on re-entry (async-only).

Conventions (see `AUTHORING.md`): structure lives in the tree, not `payload`
(an absent optional branch is a `Noop` slot; names are `StrArg` children;
numeric knobs are returning children); `ctx.attrs` is the one inter-Nu channel
(the error string, the attempt count, and the timing spans' cross-invocation
state all land there); a handler whose writes must not leak runs against a
`ctx._copy()`; async-only atoms declare `requires_async` and raise on the
sync path as a backstop (the sync entry refuses the subtree first).

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Debounce](#debounce) | `policy` | `Debounce(delay, body)` | Delays the body; a re-entry cancels the pending run and starts over. |
| [Retry](#retry) | `policy` | `Retry(body, max_attempts=3, delay=0.0, backoff=1.0, jitter=0.0, errors=None, on_attempt_fail=None, on_success=None, on_fail=None, error_key='error', attempt_key='attempt')` | Re-runs the body on a matching failure, up to `max_attempts` times. |
| [Throttle](#throttle) | `policy` | `Throttle(interval, body)` | Drops a body run that falls inside `interval` of the prior run. |
| [Timeout](#timeout) | `policy` | `Timeout(timeout, body, on_timeout=None)` | Bounds the body by a wall-clock limit; runs `on_timeout` if it's hit. |
| [TryCatch](#trycatch) | `policy` | `TryCatch(body, catch=None, finally_=None, errors=None, error_key='error')` | Runs `catch` when the body raises a matching error; `finally_` always runs after. |

### Debounce

Delays the body; a re-entry cancels the pending run and starts over.

```python
Debounce(delay, body)
```

Path `nu.core.spans.Debounce`. Kind `Policy`, sort `policy`, cardinality `transparent`. Arity 2 (2 required).

Async-only. Meaningful only under repeated invocation - each call
cancels the in-flight task and schedules a fresh one, so only the last
call in a burst fires.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `delay` | `FloatArg` |  | how long to wait before running the body, in seconds. |
| `body` | `Nu` |  | the debounced Term. |

**Yields**

`None`, immediately. The body's own value is never seen here.

**Notes**

- The pending task is cross-invocation state, so it lives in the attrs fabric keyed by this node.
- The body runs later, detached from the call that scheduled it - nothing observes its result through this node.

**Example**

```python
import asyncio
asyncio.run(nu.arun(nu.Debounce(0.0, nu.Div(1, 1))))[0]
```

### Retry

Re-runs the body on a matching failure, up to `max_attempts` times.

```python
Retry(body, max_attempts=3, delay=0.0, backoff=1.0, jitter=0.0, errors=None, on_attempt_fail=None, on_success=None, on_fail=None, error_key='error', attempt_key='attempt')
```

Path `nu.core.spans.Retry`. Kind `Policy`, sort `policy`, cardinality `transparent`. Arity 11 (1 required).

Sync runs a bare retry: `max_attempts` and `errors` only, no delay,
backoff, jitter or hooks. Async runs the full policy: `delay` grows by
`backoff` each attempt, `jitter` decorrelates the wait, and
`on_attempt_fail` / `on_success` / `on_fail` fire against an
isolated ctx copy carrying the attempt count and error. A stream body is
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
| `on_attempt_fail` | `Flow \| Command \| Span \| None` | `None` | runs after a failed attempt that still has retries left (async only). Optional. |
| `on_success` | `Flow \| Command \| Span \| None` | `None` | runs once the body succeeds (async only). Optional. |
| `on_fail` | `Flow \| Command \| Span \| None` | `None` | runs once attempts are exhausted, in place of re-raising (async only). Optional. |
| `error_key` | `StrArg` | `'error'` | where the failing attempt's error lands in the attrs fabric for a hook to read. |
| `attempt_key` | `StrArg` | `'attempt'` | where the attempt number lands in the attrs fabric for a hook to read. |

**Yields**

The body's value on the attempt that succeeds. On exhaustion:
re-raises the last error, unless `on_fail` is set, in which case
it yields `None` after running the hook.

**Example**

```python
import asyncio
asyncio.run(nu.arun(nu.Retry(nu.Div(1, 1), max_attempts=1)))[0]
```

```
1.0
```

### Throttle

Drops a body run that falls inside `interval` of the prior run.

```python
Throttle(interval, body)
```

Path `nu.core.spans.Throttle`. Kind `Policy`, sort `policy`, cardinality `transparent`. Arity 2 (2 required).

Async-only. Meaningful only under repeated invocation (a loop or a
reactive context) - a single call always runs.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `interval` | `FloatArg` |  | the minimum gap between runs, in seconds. |
| `body` | `Nu` |  | the throttled Term. |

**Yields**

The body's value, or `None` when the run is dropped.

**Notes**

- The last-run timestamp is cross-invocation state, so it lives in the attrs fabric keyed by this node (a Term is immutable and shared, so there's no instance state to hold it).

**Example**

```python
import asyncio
asyncio.run(nu.arun(nu.Throttle(60.0, nu.Div(1, 1))))[0]
```

```
1.0
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

- `asyncio.wait_for` cancels the awaited body coroutine; a sync-only body offloaded to a thread can't be interrupted, so the limit stops the wait, not the thread itself.

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
TryCatch(body, catch=None, finally_=None, errors=None, error_key='error')
```

Path `nu.core.spans.TryCatch`. Kind `Policy`, sort `policy`, cardinality `transparent`. Arity 5 (1 required).

Children (fixed): `[body, catch, finally_, error_key]`. An absent
`catch` / `finally_` is a `Noop` slot. `catch` runs against an
isolated context copy, so its writes stay local and only its value
forwards; `finally_` runs against the live context, on success or
failure alike.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `body` | `Nu` |  | the guarded Term. |
| `catch` | `Nu \| None` | `None` | runs on a matching failure, in place of the body. Optional. |
| `finally_` | `Flow \| Command \| Span \| None` | `None` | runs after, regardless of outcome. Optional. |
| `errors` | `tuple[type[Exception], ...] \| type[Exception] \| None` | `None` | the exception type(s) to catch. `None` catches everything; an unmatched exception propagates past this node untouched. |
| `error_key` | `StrArg` | `'error'` | where the caught exception (a `CaughtError`) lands in the attrs fabric for `catch` to read. |

**Yields**

The body's value on success, or `catch`'s value on a caught
failure. Transparent otherwise: forwards the branch's shape as-is.

**Example**

```python
nu.run(nu.TryCatch(nu.Div(1, 0), catch=nu.Str("failed")))[0]
```

```
'failed'
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
boundary, `yield`s the scoped context the body runs under, then commits on a
clean exit or rolls back on an exception:

    @contextmanager
    def _open(self, ctx):
        txns = [...open...]               # per-run handles, in the frame
        scoped = ctx.lazy(...)            # scope them into the context
        try:
            yield scoped                  # body runs here
        except BaseException:
            for t in txns: t.abort()      # roll back, then re-raise
            raise
        else:
            for t in txns: t.commit()     # commit

The per-run handles (the open snapshots, the open transactions) live in the
context manager's own frame, captured by closure - never on `self`. A Term is
immutable and shared across every execution, so it can hold no per-run state
(see `AUTHORING.md` - "No per-run or cross-call state"). The boundary is scoped
by swapping `rt.ctx` for the body's duration and restoring it after, the same
discipline `TryCatch` uses for its isolated handler. For a stream body the
scope spans the drain: it opens when the stream starts and closes (commit /
rollback) when it is exhausted, realizing the body's stream inside the boundary.

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

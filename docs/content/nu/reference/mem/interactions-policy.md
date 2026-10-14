---
title: interactions.policy
description: "Rate policies that keep their state in a mem ref: `Throttle` and `Debounce`."
---

Module `nu.mem.interactions.policy`.

Rate policies that keep their state in a mem ref: `Throttle` and `Debounce`.

Both only mean something under repeated invocation, so both carry state from
one call to the next: the time of the last run, the run still pending. A Term
is immutable and shared, so that state cannot live on the node. It lives in a
mem ref the caller passes, which makes it explicit and scoped: it lasts as long
as the frame (or bound dict) that holds the ref, and two policies never share
it unless they are handed the same ref.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Debounce](#debounce) | `policy` | `Debounce(delay, body, pending)` | Delays the body; a re-entry cancels the pending run and starts over. |
| [Throttle](#throttle) | `policy` | `Throttle(interval, body, last)` | Drops a body run that falls inside `interval` of the prior run. |

## Debounce

Delays the body; a re-entry cancels the pending run and starts over.

```python
Debounce(delay, body, pending)
```

Path `nu.mem.Debounce`. Kind `Policy`, sort `policy`, cardinality `transparent`. Arity 3 (3 required).

Async-only. Each call cancels the run still waiting and schedules a fresh
one, so only the last call in a burst fires.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `delay` | `FloatArg` |  | how long to wait before running the body, in seconds. |
| `body` | `Nu` |  | the debounced Term. |
| `pending` | `Nu` |  | the mem ref holding the scheduled run, an `asyncio.Task`. Unset or `None` means nothing is scheduled. |

**Yields**

`None`, immediately. The body's own value is never seen here.

**Notes**

- The body runs later, detached from the call that scheduled it: nothing observes its result through this node.
- The state lasts as long as what holds `pending`: put the frame around the loop, not inside it.

**Example**

```python
import asyncio
saves = lambda pending: nu.ForRangeDo(0, 3, nu.Debounce(0.01, nu.print("saved"), pending=pending))
_ = asyncio.run(nu.arun(nu.let(None, saves) >> nu.Delay(0.05)))
```

```
saved
```

## Throttle

Drops a body run that falls inside `interval` of the prior run.

```python
Throttle(interval, body, last)
```

Path `nu.mem.Throttle`. Kind `Policy`, sort `policy`, cardinality `transparent`. Arity 3 (3 required).

Async-only. A single call always runs; the policy shows under a loop or a
reaction, where calls come one after another.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `interval` | `FloatArg` |  | the minimum gap between runs, in seconds. |
| `body` | `Nu` |  | the throttled Term. |
| `last` | `Nu` |  | the mem ref holding the time of the last run. Unset or `None` means the body has never run. |

**Yields**

The body's value, or `None` when the run is dropped.

**Notes**

- The time is `time.monotonic()`, written before the body runs.
- The state lasts as long as what holds `last`: put the frame around the loop, not inside it.

**Example**

```python
import asyncio
pings = lambda last: nu.ForRangeDo(0, 3, nu.Throttle(60.0, nu.print("ping"), last=last))
_ = asyncio.run(nu.arun(nu.let(None, pings)))
```

```
ping
```

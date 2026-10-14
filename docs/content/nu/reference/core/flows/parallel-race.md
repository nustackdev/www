---
title: parallel.race
description: "Race: first-to-complete fan-in over the async loop."
---

Module `nu.core.flows.parallel.race`.

Race: first-to-complete fan-in over the async loop.

Async-only: real cancellation of the losers needs a loop. The sync thunk
raises as a backstop, but sync `run` refuses the async-only subtree first.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Race](#race) | `strategy` | `Race(*children)` | Runs its children concurrently; first to finish wins - the `&` composition. |

## Race

Runs its children concurrently; first to finish wins - the `&` composition.

```python
Race(*children)
```

Path `nu.core.flows.Race`. Kind `Strategy`, sort `strategy`, cardinality `void`. Arity None (0 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*children` |  |  | the mutating children to race. |

**Yields**

Nothing (VOID). The writes are whichever child wins.

**Notes**

- The losers are cancelled once the first child completes.
- Async-only: `_compile` raises `RuntimeError`, and sync `run` refuses the subtree up front via `requires_async`.

**Example**

```python
import asyncio
race = nu.Race(nu.print("fast"), nu.DelayedDo(1, nu.print("slow")))
_ = asyncio.run(nu.arun(race))
```

```
fast
```

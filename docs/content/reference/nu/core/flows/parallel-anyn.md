---
title: parallel.anyn
description: "AnyN: first-to-succeed fan-in over the async loop."
---

Module `nu.core.flows.parallel.anyn`.

AnyN: first-to-succeed fan-in over the async loop.

A child that raises is set aside; the wait continues. If every child fails,
the last error is re-raised. Async-only, like `Race`.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AnyN](#anyn) | `strategy` | `AnyN(*children)` | Runs its children concurrently; succeeds as soon as any one does. |

## AnyN

Runs its children concurrently; succeeds as soon as any one does.

```python
AnyN(*children)
```

Path `nu.core.flows.AnyN`. Kind `Strategy`, sort `strategy`, cardinality `void`. Arity None (0 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*children` |  |  | the mutating children to run. |

**Yields**

Nothing (VOID). The writes are the first child to succeed.

**Notes**

- A child that raises is set aside rather than failing the whole node; the wait continues for the rest. If every child fails, the last error is re-raised.
- Async-only: `_compile` raises `RuntimeError`, and sync `run` refuses the subtree up front via `requires_async`.

**Example**

```python
import asyncio
fail = nu.raise_(ValueError, "nope")
ok = nu.DelayedDo(0.05, nu.SetCmd(nu.AttrRef("winner"), "ok"))
asyncio.run(nu.arun(nu.AnyN(fail, ok)))[1].attrs
```

```
Attributes(winner='ok')
```

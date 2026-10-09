---
title: strategy
description: "Strategy flows: Command-composing atoms that dispatch their children."
---

Module `nu.core.flows.strategy`.

Strategy flows: Command-composing atoms that dispatch their children.

This module owns the sequential Strategy. The parallel-family Strategies
(`Parallel`, `Race`, `AnyN`, `Gather`, and their forced-mode
variants) live under `nu.core.flows.parallel` and are re-exported by
`nu.core.flows`.

A Strategy owns no effects itself; the children carry the writes, and the
`flow_body_is_mutator` law holds every slot to a mutating child.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Sequential](#sequential) | `strategy` | `Sequential(*children)` | Runs its children in order - the `>>` composition. |

## Sequential

Runs its children in order - the `>>` composition.

```python
Sequential(*children)
```

Path `nu.core.flows.Sequential`. Kind `Strategy`, sort `strategy`, cardinality `void`. Arity None (0 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*children` |  |  | the mutating children to run in order. |

**Yields**

Nothing (VOID). The writes are the children's.

**Notes**

- Calls the child thunks directly rather than going through `Runtime.eval` / `Runtime.aeval`, so the sequential hot path needs no Budget and skips the dispatch hop per child.

**Example**

```python
nu.run(nu.Sequential(nu.SetCmd(nu.AttrRef("a"), 1), nu.SetCmd(nu.AttrRef("b"), 2)))[1].attrs
```

```
Attributes(a=1, b=2)
```

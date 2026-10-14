---
title: noop
description: "Noop: the empty Flow - the identity of flow composition."
---

Module `nu.core.flows.noop`.

Noop: the empty Flow - the identity of flow composition.

A childless Strategy that composes nothing. It yields nothing and mutates
nothing, so it is the identity element of the flow monoid:
`Sequential(a, Noop(), b)` runs exactly like `Sequential(a, b)`. Use it as
the placeholder for a work slot that must hold a Nu but where nothing should
run - an else-less branch, a bodyless `DelayedDo`, an absent `catch` /
`finally_` / hook.

Being a Flow, it slot-fits wherever work fits: a Strategy child, a Control
body, a Span body. It does *not* fit a value slot or a param slot - a no-op
belongs where a mutator would go, never where a value is read. Owners still
identity-check it (`isinstance(child, Noop)`) to read "this optional branch
is absent" and skip it.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Noop](#noop) | `strategy` | `Noop()` | The empty Flow: composes nothing, the identity of flow composition. |

## Noop

The empty Flow: composes nothing, the identity of flow composition.

```python
Noop()
```

Path `nu.core.flows.Noop`. Kind `Strategy`, sort `strategy`, cardinality `void`.

**Yields**

Nothing (VOID).

**Notes**

- Slot-fits wherever work fits: a Strategy child, a Control body, a Span body. Rejected in a value slot or a param slot, since a no-op belongs where a mutator would go, never where a value is read.

**Example**

```python
nu.run(nu.Noop())[0] is None
```

```
True
```

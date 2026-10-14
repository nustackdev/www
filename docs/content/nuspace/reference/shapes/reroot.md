---
title: reroot
description: "Reroot: land a program's state refs under the plane and cell running it."
---

Module `nuspace.shapes.reroot`.

Reroot: land a program's state refs under the plane and cell running it.

A program names `CellState` and
`PlaneState` slots bare. At load the kernel
splices every such chain under its owner's `state`:

========================  ==========================================
chain rooted at           lands at
========================  ==========================================
a `CellState` subclass  `States.cells[cell]`
a `PlaneState` subclass `States.planes[plane].state`
anything else             left alone: another store, Space, ui refs
========================  ==========================================

Explicit bases rather than "anything not rooted at Space", because a movies
db ref a program brings along must not move. The splice itself is
`nu.shape.reroot`: the chain resolves one level deeper and picks up
States' tag, so it routes to the state store's navigator, never Space's.

| Name | Call | Meaning |
| --- | --- | --- |
| [reroot](#reroot) | `shapes.reroot(term, plane, cell)` | `term` with its cell state under `cell` and its plane state under `plane`. |
| [reroot_base](#reroot_base) | `shapes.reroot_base(term, base, at)` | `term` with the chains rooted at a `base` subclass spliced under `at`. |

## reroot

`term` with its cell state under `cell` and its plane state under `plane`.

```python
shapes.reroot(term, plane, cell)
```

Path `nuspace.shapes.reroot`. Defined on `nuspace.shapes.reroot`, bound as a function. Builds `nu.Nu`.

Both ids, since the two land apart: a cell's state is keyed by the cell
alone, the state it shares by its plane.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `term` | `nu.Nu` |  | Any Nu term, typically a loaded program. |
| `plane` | `nu.StrArg` |  | The plane id. Any `StrArg`, since the kernel binds it at run time (eg `nu.StrRef`). |
| `cell` | `nu.StrArg` |  | The cell id, same. |

Undocumented: example.

## reroot_base

`term` with the chains rooted at a `base` subclass spliced under `at`.

```python
shapes.reroot_base(term, base, at)
```

Path `nuspace.shapes.reroot_base`. Defined on `nuspace.shapes.reroot`, bound as a function. Builds `nu.Nu`.

The one splice both bases go through, exposed so an op can land a
program's state somewhere other than its own cell (eg a sibling's).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `term` | `nu.Nu` |  | Any Nu term. |
| `base` | `type[nu.Shape]` |  | `CellState` or `PlaneState`. Chains rooted at any other shape are left alone. |
| `at` | `nu.Nu` |  | The ref the chains land under, eg `States.planes[p].state`. |

Undocumented: example.

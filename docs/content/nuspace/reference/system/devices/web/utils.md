---
title: utils
description: "The small things both regions and the device are built out of. Helpers, not concepts."
---

Module `nuspace.system.devices.web.utils`.

The small things both regions and the device are built out of. Helpers, not concepts.

A mark for the refs nuspace mounts on a browser, the two halves idiom the
wire vocabulary is spelled in, where a cell's own ui lands under the viewer,
the arm factory, and the total readers an arm reads a browser event with.

**The two halves**, stated once so neither region respells them:

- An event rides a path of its own, `(*<ref>, "ops", <op>)`, so the path is
  the discrimination and a feed binds one arm per op. The op name is one
  segment and keeps its dots: `planes.open` is a name, not two levels.
- A write rides the ref's own path, tagged with an `op` key in the payload,
  because the browser registers one handler per node and a write to a path
  with no handler is dropped.

**Where a cell's ui lands.** A program names its ui refs bare. The session
env's rewrite, `CellRoot`, splices every bare ui chain under the
cell's own node on the viewer, and `rooted` keeps store chains (and
nuspace's own refs) out of it.

A worker unpickles `CellRoot` and the refs it holds, so this module
imports no web server, at module scope or through anything it imports.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [SpaceRef](#spaceref) | `ref` | `SpaceRef(address, parent_ref=None, owner_shape=None, props=None)` | Base for every ref nuspace itself mounts on a browser. A mark. |
| [cell_ui](#cell_ui) |  | `web.cell_ui(viewer, cell)` | One cell's own node under `viewer`. |
| [cells_ui](#cells_ui) |  | `web.cells_ui(viewer)` | Every drawn cell's node under `viewer`, as one ref: the plane, as drawn. |

## SpaceRef

Base for every ref nuspace itself mounts on a browser. A mark.

```python
SpaceRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nuspace.system.devices.web.SpaceRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

A chain rooted on one of these was put there by nuspace, which is what
tells it from a cell's own bare chain.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## cell_ui

One cell's own node under `viewer`.

```python
web.cell_ui(viewer, cell)
```

Path `nuspace.system.devices.web.cell_ui`. Defined on `nuspace.system.devices.web.utils`, bound as a function. Builds `SectionRef`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `viewer` | `Ref` |  | The ref cells are drawn on, bound to its place on the shell. |
| `cell` | `nu.StrArg` |  | The cell id, any `StrArg` (eg `ops.Here.cell`). |

Undocumented: example.

## cells_ui

Every drawn cell's node under `viewer`, as one ref: the plane, as drawn.

```python
web.cells_ui(viewer)
```

Path `nuspace.system.devices.web.cells_ui`. Defined on `nuspace.system.devices.web.utils`, bound as a function. Builds `SectionRef`.

Erasing it takes the plane off screen in one frame.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `viewer` | `Ref` |  |  |

Undocumented: example.

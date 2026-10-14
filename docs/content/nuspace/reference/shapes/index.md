---
title: shapes
description: "The store layout: layer zero."
---

Module `nuspace.shapes`.

The store layout: layer zero.

Imports `nu` and `nustd.kv` and nothing of nuspace, so everything above
reads it and it reads nothing back. Two stores, each its own root and tag.
Space, what the space is:

```python
Space
  planes        id -> Plane
    <p>
      name, meta
      props     system, ui, made_by, backend
      cells     [cell id], in order
      children  [plane id], in order
      parent    plane id, "" at the top level
      version   +1 on every write to one of its cells
  cells         id -> Cell
    <c>
      name, prog, version, meta
      props     made_by, has_ui
      plane     the plane it is on
  top           [plane id], the top level planes, in order
  kernel
    runs        id -> Run, every plane run ever, its cell runs and live workers inside
    running     {run id}, live
    workers     id -> Worker, every worker ever
    workers_running  {worker id}, live
    planes_running   plane id -> {run id}, live, of planes with any
  connections   id -> Connection
  state         SpaceState
    recents     [plane id], newest first
    info        path, opened, versions
  pinned        [plane id], in order
```

States, what the programs remember, by the same ids:

```python
States
  planes        id -> PlaneStates
    <p>
      state     PlaneState shapes, rerooted here
  cells         id -> CellStates
    <c>         CellState shapes, rerooted here
```

Plane and cell hold structure only, but for the plane's `backend`. What
ran and how it ended is a run. What a program remembers is a state.

## cell

Module `nuspace.shapes.cell`.

Cell: a program, the irreducible thing a space holds, on exactly one plane.

[Full entries](/docs/nuspace/reference/shapes/cell)

| Name | Call | Meaning |
| --- | --- | --- |
| [Cell](/docs/nuspace/reference/shapes/cell#cell) |  | A program. Structure only. |
| [CellProps](/docs/nuspace/reference/shapes/cell#cellprops) |  | What nuspace itself reads off a cell to work. Typed, unlike `meta`. |

## kernel

Module `nuspace.shapes.kernel`.

Kernel records: plane runs, their cell runs, the workers they run on, and what is live.

[Full entries](/docs/nuspace/reference/shapes/kernel)

| Name | Call | Meaning |
| --- | --- | --- |
| [CellRun](/docs/nuspace/reference/shapes/kernel#cellrun) |  | One execution of one cell, inside a plane run. Never mutated into another. |
| [Kernel](/docs/nuspace/reference/shapes/kernel#kernel) |  | Everything the kernel and the backends record. |
| [PlaneRuns](/docs/nuspace/reference/shapes/kernel#planeruns) |  | One plane's live plane runs: the ids in `running` whose run is of it. |
| [Run](/docs/nuspace/reference/shapes/kernel#run) |  | One execution of a plane: the thing started, stopped and killed. |
| [Worker](/docs/nuspace/reference/shapes/kernel#worker) |  | The executor unit a backend runs cells on: a process today, anything later. |

## state

Module `nuspace.shapes.state`.

Program declared state: the two bases a cell's shapes say whose they are by.

[Full entries](/docs/nuspace/reference/shapes/state)

| Name | Call | Meaning |
| --- | --- | --- |
| [CellState](/docs/nuspace/reference/shapes/state#cellstate) |  | Base for state owned by one cell. Lands at `States.cells[c]`. |
| [PlaneState](/docs/nuspace/reference/shapes/state#planestate) |  | Base for state shared by a plane's cells. Lands at `States.planes[p].state`. |

## states

Module `nuspace.shapes.states`.

States: the state store, where program declared state lives. Apart from Space.

[Full entries](/docs/nuspace/reference/shapes/states)

| Name | Call | Meaning |
| --- | --- | --- |
| [CellStates](/docs/nuspace/reference/shapes/states#cellstates) |  | One cell's state. No slots of its own: the program's `CellState` shapes fill it. |
| [PlaneStates](/docs/nuspace/reference/shapes/states#planestates) |  | One plane's state, shared by its cells in `state`. |
| [States](/docs/nuspace/reference/shapes/states#states) |  | The state store's root: every plane's state and every cell's, by id. |

## connection

Module `nuspace.shapes.connection`.

Connection: one live client of a device, eg a browser tab.

[Full entries](/docs/nuspace/reference/shapes/connection)

| Name | Call | Meaning |
| --- | --- | --- |
| [Connection](/docs/nuspace/reference/shapes/connection#connection) |  | What a device publishes about one client. Written by the device only. |

## plane

Module `nuspace.shapes.plane`.

Plane: a named, ordered group of cells.

[Full entries](/docs/nuspace/reference/shapes/plane)

| Name | Call | Meaning |
| --- | --- | --- |
| [Plane](/docs/nuspace/reference/shapes/plane#plane) |  | A group of cells, the runnable thing. How it runs is its `backend` prop only. |
| [PlaneProps](/docs/nuspace/reference/shapes/plane#planeprops) |  | What nuspace itself reads off a plane to work. Typed, unlike `meta`. |

## space

Module `nuspace.shapes.space`.

Space: the world. What you open.

[Full entries](/docs/nuspace/reference/shapes/space)

| Name | Call | Meaning |
| --- | --- | --- |
| [Space](/docs/nuspace/reference/shapes/space#space) |  | Planes, their cells, the top level, the kernel's records, device and space state. |
| [SpaceInfo](/docs/nuspace/reference/shapes/space#spaceinfo) |  | What the host says about the space it opened. Written once per open. |
| [SpaceState](/docs/nuspace/reference/shapes/space#spacestate) |  | Space wide state: things about the space as a whole, not one plane. |

## reroot

Module `nuspace.shapes.reroot`.

Reroot: land a program's state refs under the plane and cell running it.

[Full entries](/docs/nuspace/reference/shapes/reroot)

| Name | Call | Meaning |
| --- | --- | --- |
| [reroot](/docs/nuspace/reference/shapes/reroot#reroot) | `shapes.reroot(term, plane, cell)` | `term` with its cell state under `cell` and its plane state under `plane`. |
| [reroot_base](/docs/nuspace/reference/shapes/reroot#reroot_base) | `shapes.reroot_base(term, base, at)` | `term` with the chains rooted at a `base` subclass spliced under `at`. |

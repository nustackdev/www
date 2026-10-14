---
title: cell
description: "Cell: a program, the irreducible thing a space holds, on exactly one plane."
---

Module `nuspace.shapes.cell`.

Cell: a program, the irreducible thing a space holds, on exactly one plane.

| Name | Call | Meaning |
| --- | --- | --- |
| [Cell](#cell) |  | A program. Structure only. |
| [CellProps](#cellprops) |  | What nuspace itself reads off a cell to work. Typed, unlike `meta`. |

## Cell

A program. Structure only.

Path `nuspace.shapes.Cell`.

`prog` is python source whose entry point returns a Nu tree. `version`
counts its writes: every cell run records the version it ran, so a live
one running an older prog is told apart without reading source. A cell
carries no run info: runs, their output and their errors live under
`Space.kernel`.

`plane` is the id of the one plane it is on, the back pointer of that
plane's `cells`. The two are written together, in one commit, and never
disagree. A cell is addressed by its own id alone: ids are unique across
the space.

Its state is not here: it lives in the state store, at
`States.cells[c]` (`states`).

`props` is what nuspace reads to work (`CellProps`). `meta`
is free, for anything else.

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `name` | `ref` | `StrRef` |  | `nuspace.shapes.Cell.name` |
| `prog` | `ref` | `ProgramRef` |  | `nuspace.shapes.Cell.prog` |
| `version` | `ref` | `IntRef` |  | `nuspace.shapes.Cell.version` |
| `props` | `shape` | `CellProps` |  | `nuspace.shapes.Cell.props` |
| `meta` | `ref` | `DictRef[str, object]` |  | `nuspace.shapes.Cell.meta` |
| `plane` | `ref` | `StrRef` |  | `nuspace.shapes.Cell.plane` |

Undocumented: example.

## CellProps

What nuspace itself reads off a cell to work. Typed, unlike `meta`.

Path `nuspace.shapes.CellProps`.

`made_by` names the snippet the cell was made from (`""` for none).
A cell without one is not of any snippet's type.

`has_ui` says whether the cell's program draws: its constructed tree
holds a ui ref. Worked out whenever the prog is written, never by hand.

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `made_by` | `ref` | `StrRef` |  | `nuspace.shapes.CellProps.made_by` |
| `has_ui` | `ref` | `BoolRef` |  | `nuspace.shapes.CellProps.has_ui` |

Undocumented: example.

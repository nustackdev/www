---
title: plane
description: "Plane: a named, ordered group of cells."
---

Module `nuspace.shapes.plane`.

Plane: a named, ordered group of cells.

| Name | Call | Meaning |
| --- | --- | --- |
| [Plane](#plane) |  | A group of cells, the runnable thing. How it runs is its `backend` prop only. |
| [PlaneProps](#planeprops) |  | What nuspace itself reads off a plane to work. Typed, unlike `meta`. |

## Plane

A group of cells, the runnable thing. How it runs is its `backend` prop only.

Path `nuspace.shapes.Plane`.

`cells` is its cell ids, in order: membership and order in one list,
so rearranging them is one write that touches no cell. The cells
themselves are in `Space.cells`, each pointing back here through its
`plane`.

Nesting is two facts kept together, the way `cells` and a cell's
`plane` are: `children` is its subplane ids in sibling order, and
`parent` the plane listing it, `""` for a top level plane, which
`Space.top` lists instead. Either way is one read.

`version` goes up by one with every write to one of its cells, so
whoever follows the plane's cells watches one key.

`props` is what nuspace reads to work (`PlaneProps`). `meta`
is free, for anything else, eg a ui plane's `editable` and
`full_width`.

The state its cells share is not here: it lives in the state store, at
`States.planes[p].state` (`states`).

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `name` | `ref` | `StrRef` |  | `nuspace.shapes.Plane.name` |
| `props` | `shape` | `PlaneProps` |  | `nuspace.shapes.Plane.props` |
| `meta` | `ref` | `DictRef[str, object]` |  | `nuspace.shapes.Plane.meta` |
| `cells` | `ref` | `ListRef[str]` |  | `nuspace.shapes.Plane.cells` |
| `children` | `ref` | `ListRef[str]` |  | `nuspace.shapes.Plane.children` |
| `parent` | `ref` | `StrRef` |  | `nuspace.shapes.Plane.parent` |
| `version` | `ref` | `IntRef` |  | `nuspace.shapes.Plane.version` |

Undocumented: example.

## PlaneProps

What nuspace itself reads off a plane to work. Typed, unlike `meta`.

Path `nuspace.shapes.PlaneProps`.

`system` marks a protected plane, eg a service or home:
`remove_plane` refuses it, and that is all it means. `ui` says the
shell draws it, and nav brings a routed plane up iff it is set.
`made_by` names the registered Plane it was created from (`""` for
none). A record, nothing groups by it. `backend` names the backend its
runs execute on, as registered at open. There is no default: whoever
makes a plane names one, and a run of a plane with none fails. The one
run setting a plane holds.

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `system` | `ref` | `BoolRef` |  | `nuspace.shapes.PlaneProps.system` |
| `ui` | `ref` | `BoolRef` |  | `nuspace.shapes.PlaneProps.ui` |
| `made_by` | `ref` | `StrRef` |  | `nuspace.shapes.PlaneProps.made_by` |
| `backend` | `ref` | `StrRef` |  | `nuspace.shapes.PlaneProps.backend` |

Undocumented: example.

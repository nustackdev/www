---
title: space
description: "Space: the world. What you open."
---

Module `nuspace.shapes.space`.

Space: the world. What you open.

| Name | Call | Meaning |
| --- | --- | --- |
| [Space](#space) |  | Planes, their cells, the top level, the kernel's records, device and space state. |
| [SpaceInfo](#spaceinfo) |  | What the host says about the space it opened. Written once per open. |
| [SpaceState](#spacestate) |  | Space wide state: things about the space as a whole, not one plane. |

## Space

Planes, their cells, the top level, the kernel's records, device and space state.

Path `nuspace.shapes.Space`.

`planes` and `cells` are flat, so a plane or a cell is one lookup
away by its id alone. A plane lists its cell ids in order, a cell names
its plane. Nesting is on the planes too: a plane lists its children and
names its parent. `top` lists the planes with no parent, in order.

One writer per subtree: people, cells and services write `planes`,
`cells` and `top` through ops, the ops write intents into `kernel` and the
kernel and the backends its effects, the web device writes
`connections` and `state.recents`, the host writes `state.info`.

`pinned` is the plane ids pinned to the top of the sidebar, in order,
written through the pin ops. A pin is a shortcut: the plane stays where
it hangs.

`Space` is also the store's tag. kv refs find their navigator by root
shape class, so the store is bound under this class. Program state is
not here: it lives in the other store, under
`States`.

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `planes` | `ref` | `DictRef[str, Plane]` |  | `nuspace.shapes.Space.planes` |
| `cells` | `ref` | `DictRef[str, Cell]` |  | `nuspace.shapes.Space.cells` |
| `top` | `ref` | `ListRef[str]` |  | `nuspace.shapes.Space.top` |
| `kernel` | `shape` | `Kernel` |  | `nuspace.shapes.Space.kernel` |
| `connections` | `ref` | `DictRef[str, Connection]` |  | `nuspace.shapes.Space.connections` |
| `state` | `shape` | `SpaceState` |  | `nuspace.shapes.Space.state` |
| `pinned` | `ref` | `ListRef[str]` |  | `nuspace.shapes.Space.pinned` |

Undocumented: example.

## SpaceInfo

What the host says about the space it opened. Written once per open.

Path `nuspace.shapes.SpaceInfo`.

`path` is the space directory, `""` for a throwaway one. `opened`
is when this open started, in seconds since the epoch. `versions` maps
a package name (`nuspace`) to its installed version.

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `path` | `ref` | `StrRef` |  | `nuspace.shapes.SpaceInfo.path` |
| `opened` | `ref` | `FloatRef` |  | `nuspace.shapes.SpaceInfo.opened` |
| `versions` | `ref` | `DictRef[str, str]` |  | `nuspace.shapes.SpaceInfo.versions` |

Undocumented: example.

## SpaceState

Space wide state: things about the space as a whole, not one plane.

Path `nuspace.shapes.SpaceState`.

`recents` is the plane ids opened in a tab, newest first, deduped and
capped at `RECENTS_CAP`, written whole (D24) by the web device.
`info` is written by the host at open.

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `recents` | `ref` | `PrimitiveListRef` |  | `nuspace.shapes.SpaceState.recents` |
| `info` | `shape` | `SpaceInfo` |  | `nuspace.shapes.SpaceState.info` |

Undocumented: example.

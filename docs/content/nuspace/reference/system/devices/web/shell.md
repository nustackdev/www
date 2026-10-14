---
title: shell
description: "The frame: what a browser tab holds before any plane is drawn."
---

Module `nuspace.system.devices.web.shell`.

The frame: what a browser tab holds before any plane is drawn.

`Shell` is the top of the tree and its class body is the two regions:
the sidebar and the viewer. A ref's wire address is its chain and only its
chain, so `Shell.viewer` resolves at `("viewer",)` and a cell drawn on it
lands two levels below.

There is no route slot. The routes live in the store
(`connections[sid].routes`), written by the device from the viewer's
`planes.open` (D15); nothing reads them off the browser.

`Boot` seeds one tab. The shell is a static class, because a worker
unpickles cell chains rooted on it, so what varies per space (the viewer's
`/` menu, the sidebar's registered Planes and searchable snippets) is seeded here, as init frame props, rather than declared on the
slot. Chain props are a create time seed in the browser, so writes that come
later carry the slot's own props and change nothing.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Boot](#boot) | `scalar_command` | `Boot(shape_cls, seeds=None)` | Seed one browser's tree: clear it, then one `init` per slot. |
| [Shell](#shell) |  |  | The top of one browser tab: the sidebar and the viewer. |

## Boot

Seed one browser's tree: clear it, then one `init` per slot.

```python
Boot(shape_cls, seeds=None)
```

Path `nuspace.system.devices.web.Boot`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 2 (1 required).

Runs with one connection's session bound, so it reaches that tab alone.
The clearing `remove` goes first because a reconnect is a fresh session
while the browser still holds every node of the last one.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `shape_cls` | `type[nu.Shape]` |  | The shell whose slots seed the tree. |
| `seeds` | `Mapping[str, Mapping[str, Any]] \| None` | `None` | Extra props per top level slot, eg the viewer's `/` menu. |

Undocumented: yields, example.

## Shell

The top of one browser tab: the sidebar and the viewer.

Path `nuspace.system.devices.web.Shell`.

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `sidebar` | `ref` | `SidebarRef` |  | `nuspace.system.devices.web.Shell.sidebar` |
| `viewer` | `ref` | `ViewerRef` |  | `nuspace.system.devices.web.Shell.viewer` |

Undocumented: example.

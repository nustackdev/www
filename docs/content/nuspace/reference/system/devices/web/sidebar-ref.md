---
title: sidebar.ref
description: "The sidebar as one node on the browser's tree."
---

Module `nuspace.system.devices.web.sidebar.ref`.

The sidebar as one node on the browser's tree.

A component ref like `ButtonRef`, only wider: it renders the tree of planes
that draw. It holds no state and knows no store; everything it ships is
handed to it.

It is mounted with two props off the registry: `registered`, what the add
plane popup offers, in order, and `searchable`, the snippets the search
popup offers to search. Seeded when the shell boots, like the viewer's `/`
menu.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [SidebarRef](#sidebarref) | `ref` | `SidebarRef(address, parent_ref=None, owner_shape=None, props=None)` | Every plane that draws, as one browser node. |

## SidebarRef

Every plane that draws, as one browser node.

```python
SidebarRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nuspace.system.devices.web.SidebarRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_tree(rows, pinned)`

Replace the tree and the pins.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `rows` | `ListArg[dict]` |  |  |
| `pinned` | `ListArg[str]` |  |  |

Undocumented: example.

### `.on_create_plane()`

`{plane_id, parent_id, made_by, title}`.

Builds `Changed`.

Undocumented: example.

### `.on_rename_plane()`

`{plane_id, title}`.

Builds `Changed`.

Undocumented: example.

### `.on_delete_plane()`

`{plane_id}`.

Builds `Changed`.

Undocumented: example.

### `.on_move_plane()`

`{plane_id, parent_id, index}`.

Builds `Changed`.

Undocumented: example.

### `.on_pin_plane()`

`{plane_id, index}`.

Builds `Changed`.

Undocumented: example.

### `.on_unpin_plane()`

`{plane_id}`.

Builds `Changed`.

Undocumented: example.

### `.on_move_pin()`

`{plane_id, index}`.

Builds `Changed`.

Undocumented: example.

### `.on_search()`

`{query, snippets, titles}`.

Builds `Changed`.

Undocumented: example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

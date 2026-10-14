---
title: viewer.ref
description: "The viewer as one node on the browser's tree."
---

Module `nuspace.system.devices.web.viewer.ref`.

The viewer as one node on the browser's tree.

A component ref like `ButtonRef`, only wider: it renders the open planes'
cells, one pane per plane.
It never asks what kind of plane it draws; what it reads off the plane is
its meta (`editable`, `full_width`), which arrives with the plane like
anything else, and goes back through `plane.meta`.

It is mounted with one prop off the registered snippets (D19):
`snippets`, the `/` menu's entries in order. Seeded when the shell boots,
since the snippets are the host's registry and the shell is a static class.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ViewerRef](#viewerref) | `ref` | `ViewerRef(address, parent_ref=None, owner_shape=None, props=None)` | The open planes' cells, as one browser node. |

## ViewerRef

The open planes' cells, as one browser node.

```python
ViewerRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nuspace.system.devices.web.ViewerRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_plane(plane_id, title, meta, cells)`

Replace what one pane draws: one plane, its meta, and its cells in order.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `StrArg` |  |  |
| `title` | `StrArg` |  |  |
| `meta` | `DictArg[str, object]` |  |  |
| `cells` | `ListArg[dict]` |  |  |

Undocumented: example.

### `.set_absent(plane_id, reason)`

Say one pane has nothing to draw: its plane is missing or headless.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `StrArg` |  |  |
| `reason` | `StrArg` |  |  |

Undocumented: example.

### `.set_status(plane_id, statuses)`

Patch what one pane says about its cells.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `StrArg` |  |  |
| `statuses` | `ListArg[dict]` |  |  |

Undocumented: example.

### `.on_open()`

`{plane_ids}`, the full ordered list.

Builds `Changed`.

Undocumented: example.

### `.on_create_cell()`

`{plane_id, cell_id, name, index}`.

Builds `Changed`.

Undocumented: example.

### `.on_update_cell()`

`{cell_id, source}`.

Builds `Changed`.

Undocumented: example.

### `.on_delete_cell()`

`{cell_id}`.

Builds `Changed`.

Undocumented: example.

### `.on_reorder_cells()`

`{plane_id, cell_ids}`.

Builds `Changed`.

Undocumented: example.

### `.on_set_meta()`

`{plane_id, meta}`.

Builds `Changed`.

Undocumented: example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

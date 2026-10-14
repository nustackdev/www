---
title: refs.leaves.tree
description: "`TreeRef` -- nested rows that fold, with select, open, rename and move."
---

Module `nustd.ui.refs.leaves.tree`.

`TreeRef` -- nested rows that fold, with select, open, rename and move.

The server owns the nodes, the browser owns the moment. The nodes are a flat
list the server ships whole; which rows are open and which one is selected
the browser keeps as you click, and the server can set either. Everything
the user does arrives as one notify on the tree, its kind named in the
payload's `event` field, and each `on_*` takes only its own kind:

```python
class Files(nustd.ui.Page):
    tree = nustd.ui.TreeRef.slot(label="Files", editable=True, draggable=True)

nu.ReactForever(Files.tree.on_open(), lambda ev: open_file(ev["key"]))
nu.ReactForever(Files.tree.on_rename(), lambda ev: rename(ev["key"], ev["title"]))
```

The browser never changes the nodes itself. A rename or a move is a request:
the server applies it to whatever the tree stands for and ships the nodes
again with `set`. A request the server turns down leaves the
tree as it was.

**A node** is `{key, parent, label}` plus, optionally, `icon` (a short
string, eg an emoji) and `badge` (a short string after the label).
`parent` is another node's key, or None / "" at the top. Siblings keep the
order they arrive in.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [TreeRef](#treeref) | `ref` | `TreeRef(address, parent_ref=None, owner_shape=None, props=None)` | Nested rows that fold. The server owns the nodes; the browser reports what you do. |

## TreeRef

Nested rows that fold. The server owns the nodes; the browser reports what you do.

```python
TreeRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.TreeRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set(nodes)`

Replace every node. Open rows and the selection stay where they still apply.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `nodes` | `ListArg[dict]` |  |  |

Undocumented: example.

### `.set_selected(key)`

Select a row; "" selects none.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `StrArg` |  |  |

Undocumented: example.

### `.set_expanded(keys)`

Open exactly these rows.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `keys` | `ListArg[str]` |  |  |

Undocumented: example.

### `.on_change()`

Every event below, each naming itself in `event`.

Builds `Changed`.

Undocumented: example.

### `.on_select()`

`{event, key}`: a click or Space on a row.

Builds `Changed`.

Undocumented: example.

### `.on_open()`

`{event, key}`: Enter or a double click, the row's "do the thing".

Builds `Changed`.

Undocumented: example.

### `.on_toggle()`

`{event, key, open}`: a row folded or unfolded.

Builds `Changed`.

Undocumented: example.

### `.on_rename()`

`{event, key, title}`: an inline rename, trimmed and changed. Needs `editable`.

Builds `Changed`.

Undocumented: example.

### `.on_move()`

`{event, key, parent, index}`: a drop. Needs `draggable`.

Builds `Changed`.

`parent` "" is the top level; `index` counts the parent's children
without `key`.

Undocumented: example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

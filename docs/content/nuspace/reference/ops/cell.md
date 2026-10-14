---
title: cell
description: "Cell ops: write one, edit it, place it, drop it."
---

Module `nuspace.ops.cell`.

Cell ops: write one, edit it, place it, drop it.

The only writer of the two facts that must agree about a cell's place: the
plane's `cells` list and the cell's `plane`. Every op here that changes
one writes the other in the same commit. A cell stays on the plane it was
made on: nothing here moves one to another.

Every op here that writes a cell, or the plane's `cells`, counts it on
the plane's `version` in the same commit, so following a plane's cells is
one key to watch.

A cell is addressed by its id alone. An op that needs its plane reads
`plane` off it, inside its own bracket.

A cell's state is in the other store (States). Dropping a cell drops it
too, as a commit of its own after the structure one, in the order
`atomic_state` gives.

| Name | Call | Meaning |
| --- | --- | --- |
| [add_cell](#add_cell) | `ops.add_cell(plane_id, prog, cell_id=None, name='', index=None, made_by='', meta=None, into=None)` | Write a cell onto a plane and place it at `index`, in one commit. |
| [remove_cell](#remove_cell) | `ops.remove_cell(cell_id)` | Drop a cell: its live cell runs interrupted, off its plane, row deleted, then its state. |
| [rename_cell](#rename_cell) | `ops.rename_cell(cell_id, name)` | Set a cell's name. A no-op when it is missing. |
| [reorder_cells](#reorder_cells) | `ops.reorder_cells(plane_id, cell_ids)` | Put a plane's cells in the order given. |
| [set_cell_meta](#set_cell_meta) | `ops.set_cell_meta(cell_id, fields)` | Merge `fields` into a cell's meta. A no-op when it is missing. |
| [set_prog](#set_prog) | `ops.set_prog(cell_id, prog)` | Replace a cell's source, and its `has_ui` with it. Bumps its `version`. |

## add_cell

Write a cell onto a plane and place it at `index`, in one commit.

```python
ops.add_cell(plane_id, prog, cell_id=None, name='', index=None, made_by='', meta=None, into=None)
```

Path `nuspace.ops.add_cell`. Defined on `nuspace.ops.cell`, bound as a function. Builds `nu.Nu`.

`has_ui` is worked out from `prog` (`HasUi`). The props are
written every time, so an existing cell given again takes
the ones passed now.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  | The plane. Nothing is written when it is missing. |
| `prog` | `nu.StrArg` |  | The cell's source. |
| `cell_id` | `nu.StrArg \| None` | `None` | Its id, unique across the space. Minted when the term is evaluated when absent. Nothing is written when a cell of this id is on another plane. |
| `name` | `nu.StrArg` | `''` | What to call it. |
| `index` | `nu.IntArg \| None` | `None` | Where in the plane's cells. The end when absent. |
| `made_by` | `nu.StrArg` | `''` | Prop, the snippet it was made from, `""` for none. |
| `meta` | `dict[str, Any] \| nu.Nu \| None` | `None` | Fields to merge into its meta. |
| `into` | `nu.Ref \| None` | `None` | Set to the cell id in the commit, `""` when nothing was written, for a caller that needs a minted one: the record does not say which cell this call made. |

Undocumented: example.

## remove_cell

Drop a cell: its live cell runs interrupted, off its plane, row deleted, then its state.

```python
ops.remove_cell(cell_id)
```

Path `nuspace.ops.remove_cell`. Defined on `nuspace.ops.cell`, bound as a function. Builds `nu.Nu`.

Two commits, the row first. The other way round, a cell still on the
plane (and its runs, still live until the interrupt lands) would read
its state gone. This way the worst a crash between them leaves is state
no cell points at.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cell_id` | `nu.StrArg` |  |  |

Undocumented: example.

## rename_cell

Set a cell's name. A no-op when it is missing.

```python
ops.rename_cell(cell_id, name)
```

Path `nuspace.ops.rename_cell`. Defined on `nuspace.ops.cell`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cell_id` | `nu.StrArg` |  |  |
| `name` | `nu.StrArg` |  |  |

Undocumented: example.

## reorder_cells

Put a plane's cells in the order given.

```python
ops.reorder_cells(plane_id, cell_ids)
```

Path `nuspace.ops.reorder_cells`. Defined on `nuspace.ops.cell`, bound as a function. Builds `nu.Nu`.

Ids not on the plane are skipped, and cells left out keep their place
after the named ones, so a partial order is a move, not a truncation.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |
| `cell_ids` | `Sequence[nu.StrArg] \| nu.Nu` |  |  |

Undocumented: example.

## set_cell_meta

Merge `fields` into a cell's meta. A no-op when it is missing.

```python
ops.set_cell_meta(cell_id, fields)
```

Path `nuspace.ops.set_cell_meta`. Defined on `nuspace.ops.cell`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cell_id` | `nu.StrArg` |  |  |
| `fields` | `dict[str, Any] \| nu.Nu` |  |  |

Undocumented: example.

## set_prog

Replace a cell's source, and its `has_ui` with it. Bumps its `version`.

```python
ops.set_prog(cell_id, prog)
```

Path `nuspace.ops.set_prog`. Defined on `nuspace.ops.cell`, bound as a function. Builds `nu.Nu`.

Live cell runs keep running the prog they loaded: rerunning them is the
reload service's. Nothing validates: a broken prog stores fine, and reads as not drawing.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cell_id` | `nu.StrArg` |  |  |
| `prog` | `nu.StrArg` |  |  |

Undocumented: example.

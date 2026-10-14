---
title: refs.leaves.table
description: "`TableRef` -- rows and columns, and the row ops that change them in place."
---

Module `nustd.ui.refs.leaves.table`.

`TableRef` -- rows and columns, and the row ops that change them in place.

A collection leaf: the rows are data on the node, never child nodes, so a
table has no children. Server owns the rows, the browser reports what you do
to them.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [InsertRow](#insertrow) | `scalar_command` | `InsertRow()` | Insert `row` before the row at `index`, clamped to the rows shown. |
| [RemoveRows](#removerows) | `scalar_command` | `RemoveRows()` | Drop the rows with these `keys`; keys not shown are skipped. |
| [SetOrder](#setorder) | `scalar_command` | `SetOrder()` | Show the rows named by `keys` first, in that order; the rest keep theirs after. |
| [SetRow](#setrow) | `scalar_command` | `SetRow()` | Replace the row keyed `key` with `row`, or add it last when none is shown. |
| [TableRef](#tableref) | `ref` | `TableRef(address, parent_ref=None, owner_shape=None, props=None)` | Rows and columns. The server owns the rows; the browser reports what you do. |

## InsertRow

Insert `row` before the row at `index`, clamped to the rows shown.

```python
InsertRow()
```

Path `nustd.ui.InsertRow`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

## RemoveRows

Drop the rows with these `keys`; keys not shown are skipped.

```python
RemoveRows()
```

Path `nustd.ui.RemoveRows`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

## SetOrder

Show the rows named by `keys` first, in that order; the rest keep theirs after.

```python
SetOrder()
```

Path `nustd.ui.SetOrder`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

## SetRow

Replace the row keyed `key` with `row`, or add it last when none is shown.

```python
SetRow()
```

Path `nustd.ui.SetRow`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

## TableRef

Rows and columns. The server owns the rows; the browser reports what you do.

```python
TableRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.TableRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Reads by default: a header click asks for a sort, and that is all. Each
flag below turns on one more thing to ask for. Everything the user does
arrives as one notify on the table, its kind named in the payload's
`event` field, and each `on_*` takes only its own kind:

```python
class Shelf(nustd.ui.Page):
    table = nustd.ui.TableRef.slot(
        columns=["id", {"key": "title", "label": "Title"}],
        row_key="id",
        editable=True,
    )

nu.ReactForever(Shelf.table.on_edit(), lambda ev: save(ev["key"], ev["column"], ev["value"]))
```

The browser never changes the rows itself. An edit, an add, a delete or a
move is a request: the server applies it to whatever the table stands for
and ships the rows again, all of them with `set_rows` or only what
changed with `set_row`, `insert_row`, `remove_rows` and
`set_order` (a sort it confirms with `set_sort`). A request
the server turns down leaves the table as it was. Which rows are selected
the browser keeps as you click, and the server can set it with
`set_selected`.

**Column requests** (`columns_editable`) work the same way: an insert,
delete, rename, move, kind or align change arrives as an `on_column_*`
event, and the server confirms it by shipping the columns again with
`set_columns`, and the rows too when it rewrote cells. List rows
hold cells by position, so a server that inserts, deletes or moves
columns must ship list rows again with their cells where the new columns
are, in one frame with the columns: ``table.set({"columns": ..., "rows":
...})`, not `set_columns(...) | set_rows(...)``, which arrives as two
frames and shows cells under the wrong header in between. Mapping rows
hold cells by column key and come through a reshape untouched (a column
added shows empty until its cells are written). A table always keeps one
column: delete is not offered on the last one:

```python
nu.ReactForever(
    Shelf.table.on_column_rename(),
    lambda ev: Shelf.table.set_columns(renamed(ev["column"], ev["label"])),
)
```

**Columns** are strings or mappings, mixed freely. A string `s` is
`{"key": s}`; a mapping is ``{key, label?, kind?, options?, editable?,
align?, width?, sortable?}` with `kind`` one of "text" (the default),
"number", "bool" or "select" (picks from `options`). Every column sorts
unless it says `sortable: False`.

**Rows** are lists (cells by column position) or mappings (cells by column
key), mixed freely. `row_key` names the field that keys a row: a column
key for list rows, any field for mapping rows.

**Row keys.** Without `row_key` a row's key is its position as a string,
and the selection the browser keeps follows positions, not rows; so set
`row_key` whenever rows can be inserted, deleted, moved or re-sorted. Its
values must be unique: a duplicate gets "~2", "~3", ... in order so the
grid still works, and that suffixed key is what events carry. A row whose
key is missing or empty falls back to its index, which may collide with a
real key, so give every row one. Every event that names rows by key also
names them by position (`row_index`, `row_indexes`), so a table
without `row_key` is still fully usable. Keys of rows that are no longer
shown drop out of the selection.

**Positions** (`row_index`, `row_indexes`, the add and move `index`)
count within the rows shown, which under `max_rows` are the newest ones.

**Methods**

### `.set(table)`

Merge any props, eg `{"columns": [...], "rows": [...]}`.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `table` | `DictArg[str, Any]` |  |  |

Undocumented: example.

### `.set_rows(rows)`

Replace every row. The selection stays where its keys still apply.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `rows` | `ListArg[Any]` |  |  |

Undocumented: example.

### `.clear()`

Drop every row.

Builds `Nu`.

Undocumented: example.

### `.append(row)`

Add one row at the end, a list or a mapping; `max_rows` drops the oldest.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `row` | `ListArg[Any] \| DictArg[str, Any]` |  |  |

Undocumented: example.

### `.set_columns(columns)`

Replace the columns, strings or mappings as on the slot; the rows stay.

Builds `Nu`.

Mapping rows follow the columns by key. Over list rows a reshape
(insert, delete, move) needs the rows in the same frame:
`set({"columns": columns, "rows": rows})`, since a second frame
would show the old cells under the new headers until it lands.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `columns` | `ListArg[Any]` |  |  |

Undocumented: example.

### `.set_row(key, row)`

Replace the row keyed `key` in place, or add it at the end if none is shown.

Builds `Nu`.

An upsert: a row that is new to the browser lands last (`max_rows`
drops the oldest), and `set_order` can put it where it belongs.
`row` is a whole row, a list or a mapping, not a partial one.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `StrArg` |  |  |
| `row` | `ListArg[Any] \| DictArg[str, Any]` |  |  |

Undocumented: example.

### `.insert_row(index, row)`

Insert `row` before the row at `index`, or last past the end.

Builds `Nu`.

`index` counts the rows shown and is clamped to them; `max_rows`
then drops the oldest.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `index` | `IntArg` |  |  |
| `row` | `ListArg[Any] \| DictArg[str, Any]` |  |  |

Undocumented: example.

### `.remove_row(key)`

Drop the row keyed `key`; a key not shown is a no-op.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `StrArg` |  |  |

Undocumented: example.

### `.remove_rows(keys)`

Drop the rows with these keys; keys not shown are skipped.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `keys` | `ListArg[str]` |  |  |

Undocumented: example.

### `.set_order(keys)`

Reorder the rows shown to these keys, without shipping a row.

Builds `Nu`.

Rows named come first in this order; the ones left out keep their
order after them; keys not shown are skipped.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `keys` | `ListArg[str]` |  |  |

Undocumented: example.

### `.set_sort(column, direction)`

Show the arrows on `column`; the rows are the server's to sort.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `column` | `StrArg` |  |  |
| `direction` | `SortDirection \| StrArg` |  |  |

Undocumented: example.

### `.set_selected(keys)`

Select exactly these rows, by key; [] selects none.

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

### `.on_sort()`

`{event, sort_column, sort_direction}`: a header clicked; confirm with `set_sort`.

Builds `Changed`.

Undocumented: example.

### `.on_row_click()`

`{event, row_index, key}`: a body row clicked. Needs `clickable_rows`.

Builds `Changed`.

Undocumented: example.

### `.on_select()`

`{event, keys, row_indexes}`: the whole next selection. Needs `selection`.

Builds `Changed`.

`row_indexes` runs parallel to `keys`: each row's position as shown.

Undocumented: example.

### `.on_edit()`

`{event, key, row_index, column, value, previous}`: a cell's new value. Needs `editable`.

Builds `Changed`.

`value` is typed by the column's kind: a str for "text" and
"select", a number for "number", a bool for "bool".

Undocumented: example.

### `.on_add()`

`{event, index}`: a new row asked for at `index`. Needs `addable`.

Builds `Changed`.

The server decides what is in it, and its key.

Undocumented: example.

### `.on_delete()`

`{event, keys, row_indexes}`: these rows asked to go. Needs `deletable`.

Builds `Changed`.

`row_indexes` runs parallel to `keys`: each row's position as shown.

Undocumented: example.

### `.on_move()`

`{event, key, row_index, index}`: a row asked to move. Needs `draggable`.

Builds `Changed`.

`row_index` is where the row is now; `index` counts the rows
without it, so the row lands before the row at that index, or last.

Undocumented: example.

### `.on_column_add()`

`{event, index}`: a new column asked for at `index`. Needs `columns_editable`.

Builds `Changed`.

The server decides what it is (key, label, kind) and confirms with
`set_columns`; list rows go again with a cell at `index`.

Undocumented: example.

### `.on_column_delete()`

`{event, column, column_index}`: a column asked to go. Needs `columns_editable`.

Builds `Changed`.

Confirm with `set_columns`; list rows go again without its
cells, in the same frame (`set`). A table always keeps one
column: the browser does not offer delete on the last one.

Undocumented: example.

### `.on_column_rename()`

`{event, column, column_index, label, previous}`: new header text. Needs `columns_editable`.

Builds `Changed`.

`label` is as typed, untrimmed and possibly empty; `previous` is
the label shown. The header keeps `previous` until the server
confirms with `set_columns`.

Undocumented: example.

### `.on_column_move()`

`{event, column, column_index, index}`: a column asked to move. Needs `columns_editable`.

Builds `Changed`.

`index` counts the columns without it, so the column lands before
the column at that index, or last. Confirm with `set_columns`;
list rows go again with their cells moved the same way.

Undocumented: example.

### `.on_column_kind()`

`{event, column, column_index, kind, previous}`: another kind asked for. Needs `columns_editable`.

Builds `Changed`.

`kind` and `previous` are "text", "number", "bool" or "select"
(`previous` "text" when the column sets none). Confirm with
`set_columns`, and the rows when their cells were converted. A
column switched to "select" needs its `options` sent with it.

Undocumented: example.

### `.on_column_align()`

`{event, column, column_index, align, previous}`: another alignment. Needs `columns_editable`.

Builds `Changed`.

`align` and `previous` are "left", "center" or "right";
`previous` is what the column shows, its kind's default (number
right, bool center, else left) when it sets none.

Undocumented: example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

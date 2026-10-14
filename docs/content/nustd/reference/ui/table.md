---
title: table
description: "nustd.ui.table -- a table whose rows are what the store holds."
---

Module `nustd.ui.table`.

nustd.ui.table -- a table whose rows are what the store holds.

A package beside `lens` rather than a module in `refs`: `TableRef` is the
widget and stays in `refs`; this is the machinery that binds one to a store.

- `values`   -- the rules, plain Python over plain values: how a typed
                      value is stored, how rows sort, what a fresh column is.
- `presets`  -- `Row`, the stored row, and `sync`, a table kept equal
                      to its store, live across tabs.

`values` imports no fabric; `presets` imports `nustd.kv`, because placing
the storage boundary is the job it exists to do. See its docstring for the
layout and why the line is where it is.

## presets

Module `nustd.ui.table.presets`.

A table that is its store: requests written verbatim, every tab kept live.

`TableRef` is deliberately fabric-free. It sends frames and hands requests
over, and it neither knows nor cares what the rows stand for, so an app can
answer an edit with a refusal, a lookup or a write to anywhere. `values`
is fabric-free too: plain rules over plain values.

The common answer, though, is "store it": the grid is the data, and an edit is
a write. Doing that well takes a store. Reads and writes have to sit inside a
storage boundary, a request's writes belong in one transaction, and a write
from one tab has to reach every other. Somebody has to place the
`Transaction` and the `Snapshot`, and leaving it to each app makes it a
contract they have to know and can silently get wrong. Doing it here costs this
one module an import of `kv`.

So the layering is: the Ref knows nothing about fabrics, the preset knows about
kv. Reach for `sync` when the table should simply be what is stored.
Reach past it, for the Ref's `on_*` and its row-level ops, when a request is
a question your app answers (validation, refusals, a status line), the way
`examples/table.py` does.

**Layout.** One app Shape holds a table as up to four slots:

```python
class Sheet(nu.Shape):
    rows = nustd.kv.DictRef.slot(nustd.ui.table.Row)  # row key -> Row
    order = nustd.kv.ListRef.slot(str)                 # row keys, as shown
    columns = nustd.kv.ListRef.slot(object)            # column mappings, optional
    sort = nustd.kv.ObjectRef.slot()                   # {column, direction}, optional
```

A row is a `Row`, whose `cells` map column key to value, so a cell is
`rows[key].cells[column]` with an address of its own: an edit writes one
cell, and a watcher learns which row moved. A move or a sort rewrites
`order` and no row at all.

| Name | Call | Meaning |
| --- | --- | --- |
| [Row](#row) |  | One stored row: its cells by column key, each at an address of its own. |
| [sync](#sync) | `table.sync(table, rows, order, columns=None, sort=None, debounce=0.25)` | The table as the store holds it, as one tree: paint, apply requests, stay live. |

### Row

One stored row: its cells by column key, each at an address of its own.

Path `nustd.ui.table.Row`.

A Shape around a `DictRef` rather than the `DictRef` itself, because a
mapping slot declared to hold mappings stores each one as a single value,
and a row stored whole could be neither written one cell at a time nor
watched by row.

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `cells` | `ref` | `DictRef[str, object]` |  | `nustd.ui.table.Row.cells` |

Undocumented: example.

### sync

The table as the store holds it, as one tree: paint, apply requests, stay live.

```python
table.sync(table, rows, order, columns=None, sort=None, debounce=0.25)
```

Path `nustd.ui.table.sync`. Defined on `nustd.ui.table.presets`, bound as a function. Builds `nu.Nu`.

Policy free: what the browser asks for is what gets stored. An edit writes
the value coerced to its column's kind (see `coerce`). An
add stores an empty row under a fresh key, where it was asked for. A
delete deletes. A move rewrites `order` and nothing else. A sort
rewrites `order` by that column and stores the arrows; a later move or
add clears them, because the rows are no longer in the order they claim.
An edit of the sorted column re-sorts, for the same reason. The last
column is never deleted: a table keeps one. Turn on what the
browser may ask for on the slot (`editable`, `addable`, `deletable`,
`draggable`, `columns_editable`); this applies whatever arrives.

Each request's writes land in one transaction, retried on a conflict, and
the answer ships after it commits, read from what was stored: one row
(`set_row`, `insert_row`), the keys that went (`remove_rows`) or the
order (`set_order`). A request naming a row or a column that is gone
changes nothing and ships the whole table, so a browser that was behind
catches up.

Live: a write from any tab, or anything else writing the store, repaints
every tab. A row that changed ships alone (`set_row`, or
`remove_rows` once it is gone), the order on its own, the arrows on
their own, and a change to the columns or to the whole mapping repaints
the table. A burst is waited out for `debounce` seconds and shipped
once. The tab that asked gets its answer at once and the same rows again
when the burst settles, which changes nothing it shows.

Never finishes, which is what the ws host holds a tab's program to. Put
several in a `ParallelAsync`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `table` | `TableRef` |  | the `TableRef` on the mounted page. Its `row_key` names the field a row's key ships under, `"_key"` (not shown) when it names none. |
| `rows` | `StructuredRef` |  | a `DictRef` of `Row`, keyed by row key. |
| `order` | `StructuredRef` |  | a `ListRef` of row keys. Rows it does not name show last. |
| `columns` | `StructuredRef \| None` | `None` | a `ListRef` of column mappings, which turns column requests on: add, delete, rename, move, kind and align are stored, and a kind change re-coerces the column's cells. Seeded from the slot's columns while it holds none (the store cannot tell a list never written from an emptied one, which is also why the last column is never deleted). None keeps the slot's columns, fixed, and column requests change nothing. |
| `sort` | `StructuredRef \| None` | `None` | an `ObjectRef` to store the arrows in, so every tab shows them. None keeps them per tab: the order a sort writes is still shared, but only the tab that sorted shows why, and edits from other tabs do not re-sort. Pass one whenever more than one tab edits. |
| `debounce` | `float` | `0.25` | how long a burst of writes is waited out before a tab repaints. |

**Examples**

```python
class Sheet(nu.Shape):
    rows = nustd.kv.DictRef.slot(nustd.ui.table.Row)
    order = nustd.kv.ListRef.slot(str)
    columns = nustd.kv.ListRef.slot(object)
    sort = nustd.kv.ObjectRef.slot()
```

```python
ui = nustd.ui.table.sync(App.home.table, Sheet.rows, Sheet.order, Sheet.columns, sort=Sheet.sort)
```

## values

Module `nustd.ui.table.values`.

What a stored table is worth on the wire, and how a request reshapes it.

Plain Python over plain values, no fabric and no Ref: every function here takes
what a read produced (a column list, the cells of a row, the stored order) and
returns what to write or what to ship. The preset reads, calls one of these
through its atom, and writes or ships the answer, so the rules a table follows
(how a typed value is stored, where a blank sorts, what a fresh column is
called) live in one place a test can reach without a store.

Reads hand in kv views and sentinels as well as plain values: a list read back
from a ListRef holds views, and a slot never written reads as EMPTY. Each atom
lowers those first, so nothing that leaves here is tied to a store.

| Name | Call | Meaning |
| --- | --- | --- |
| [blank](#blank) | `table.blank(kind)` | The empty cell of `kind`: None for a number, False for a bool, else "". |
| [coerce](#coerce) | `table.coerce(value, kind)` | `value` as a cell of `kind` stores it. |

### blank

The empty cell of `kind`: None for a number, False for a bool, else "".

```python
table.blank(kind)
```

Path `nustd.ui.table.blank`. Defined on `nustd.ui.table.values`, bound as a function. Builds `object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `kind` | `object` |  |  |

Undocumented: example.

### coerce

`value` as a cell of `kind` stores it.

```python
table.coerce(value, kind)
```

Path `nustd.ui.table.coerce`. Defined on `nustd.ui.table.values`, bound as a function. Builds `object`.

A number is an int when it is integral and a float otherwise; text that
does not parse, or a value that is not a number, is None. A bool is the
bool itself, a finite number other than 0, or a string among `TRUE_WORDS`. Text
and select are strings, None being "" and a bool "true" or "false", the
words a bool cell reads back.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `object` |  |  |
| `kind` | `object` |  |  |

Undocumented: example.

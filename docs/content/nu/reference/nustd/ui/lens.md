---
title: lens
description: "nustd.ui.lens -- any Nu Shape, browsable as cascading columns."
---

Module `nustd.ui.lens`.

nustd.ui.lens -- any Nu Shape, browsable as cascading columns.

A package beside `core` and `nudle` rather than a module inside `refs`:
`refs` holds widgets, and this is a widget plus the two pieces of machinery
that make it worth having.

- `ref`      -- `LensRef`, the surface. Frames in, frames out.
- `columns`  -- what a Shape and a cursor are worth as columns. The walk.
- `presets`  -- `browse`, the whole thing assembled and ready to run.

`ref` and `columns` import no fabric; `presets` imports `nustd.kv`,
because placing the storage boundary is exactly the job it exists to do. See
its docstring for why that line is where it is.

Everything is reached through this package and nothing is re-exported flat,
`LensRef` included: a lens is a subsystem rather than a widget, so one name
holds all of it and a reader who has found `nustd.ui.lens` has found the
whole thing. `nustd.ui.lens.LensRef`, `nustd.ui.lens.browse`,
`nustd.ui.lens.columns`. That last name does double duty, as the module and
as the builder it exports; the builder wins on the package, which is the one
people call.

## ref

Module `nustd.ui.lens.ref`.

`LensRef` -- the lens surface as one Ref.

A widget like any other in the kit, and it obeys the kit's two conventions:
`_wire_type` names the browser component, and a Ref with one semantically
primary value spells it `set`. The cascade is not a single value -- it is a
cursor and the columns that cursor produced, always together -- so there is
`set_columns` and no bare `set`.

By the kit's grouping it is an output Ref: a server-owned sink the browser
renders and the server never reads back. It lives here rather than in
`refs/output.py` because it comes with two modules of machinery beside it,
and that machinery is not a widget.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [LensRef](#lensref) | `ref` | `LensRef(address, parent_ref=None, owner_shape=None)` | A Shape, browsable as cascading columns. The server reads, the browser walks. |

### LensRef

A Shape, browsable as cascading columns. The server reads, the browser walks.

```python
LensRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.lens.LensRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Both directions carry something, and which half owns what is the whole
design. The **columns** are the value, and the server owns them: it walks a
Shape, reads the store and ships the whole cascade with `set_columns`.
The **cursor** is an event, and the browser owns it: arrows and clicks move
it locally and it arrives here on `on_nav` as the whole new path, already
resolved, the same way a table's row click arrives as an index. Nothing is
ever read back off the node, which is why it groups with the sinks rather
than with the inputs.

Where the columns are read from never crosses the wire. A cursor is
relative to the Shape the caller pointed the lens at, and the prefix that
says where that Shape lives stays in the program (see
`columns`). So a lens anchored at a subtree cannot be
talked out of it by anything the browser sends.

The ref holds no state at all. A reload starts at the root and two tabs
disagree freely; anything on the server that wants to move a cursor ships a
`set_columns` with the cursor it wants.

**Methods**

#### `.set_columns(cursor, columns)`

Replace the cascade: the cursor, and one column per prefix of it.

Builds `Nu`.

Each column is `{kind, entries, total}`; each entry is
`{key, kind, preview, navigable, vtype}`, plus `text` and
`clipped` on a leaf column's single row. A full replacement rather
than a delta, so a browser that missed a frame is never left holding a
column it cannot be corrected on.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cursor` | `ListArg[str]` |  |  |
| `columns` | `ListArg[dict]` |  |  |

Undocumented: example.

#### `.on_nav()`

The whole new cursor, as a list of segments the browser resolved.

Builds `Changed`.

Undocumented: example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## presets

Module `nustd.ui.lens.presets`.

Assembled lenses: the whole surface as one tree, ready to run.

The rest of this package is deliberately fabric-free. `columns` builds a
term and `ref` sends frames, and neither needs a store to do its job, so
neither imports one -- that is what lets them compose into something other than
a browser (a test, a report, a different host) without dragging kv along.

Running that term is a different job, and it does need a store, because reads
have to happen inside a storage boundary and a term built at run time is
invisible to the pass that would otherwise place one. Somebody has to write the
`Snapshot`. Leaving it to the caller makes it a contract they have to know
and can silently get wrong; doing it here costs this one module an import of
`kv`.

So the layering is: primitives know nothing about fabrics, the preset knows
about kv. Reach for `browse` when you want a working lens. Reach past it,
for `columns` and the Ref, when you want the
cascade somewhere else, on your own boundary, or driven by something that is
not a browser cursor.

| Name | Call | Meaning |
| --- | --- | --- |
| [browse](#browse) | `lens.browse(lens, shape, prefix=None, max_rows=200)` | A working lens, as one tree: the first cascade, then one per move. |

### browse

A working lens, as one tree: the first cascade, then one per move.

```python
lens.browse(lens, shape, prefix=None, max_rows=200)
```

Path `nustd.ui.lens.browse`. Defined on `nustd.ui.lens.presets`, bound as a function. Builds `nu.Nu`.

Argument for argument this is `columns` with
the lens in front and the cursor taken out. The cursor is the one thing a
caller cannot supply, because it does not exist yet -- it is whatever the
browser sends, and the arm below is what turns each one into a cascade.

The first cascade is built here rather than waited for: the empty cursor is
the one cursor that is known before the browser says anything, so the page
paints on the first frame instead of on the first click.

Never finishes, which is what the ws host holds a tab's program to. Put
several in a `ParallelAsync` -- not in a smart `|`, which
refuses to pick a mode for a branch whose term appears at run time.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `lens` | `LensRef` |  | the `LensRef` on the mounted page, already reachable through its slot chain so its wire path resolves. |
| `shape` | `type[Shape]` |  | what to expect, and what the browser's cursor is relative to. |
| `prefix` | `StructuredRef \| None` | `None` | where `shape` lives. None reads it at the root of its own store. Never sent to the browser, so a lens given one cannot be navigated above it. |
| `max_rows` | `int` | `200` | the per-column cap. Pass the same number the slot declared, or the browser's `n/total` note disagrees with what was clipped. |

**Example**

```python
ui = nu.ParallelAsync(
    browse(App.home.all.lens, Cluster),
    browse(App.home.one.lens, Machine, prefix=Cluster.machines["red"]),
)
```

## columns

Module `nustd.ui.lens.columns`.

What a Shape is worth as columns, read wherever the Shape actually lives.

Two things say where to read and what to expect there, and they are separate on
purpose:

- **shape** is a Shape class. It says what structure to expect, and it is the
  root the browser's cursor is relative to. Segment one of a cursor names a slot
  on it.
- **prefix** is a Ref. It says where that structure sits, and it carries which
  store, because a Ref chain resolves its Navigator by the class it is rooted
  at and a bare path tuple would lose that. Leave it out and the shape is read
  at the root of its own store, which is how every kv program addresses today.

The read is prefix, then cursor: each slot ref is built with the level above it
as its parent, so the cursor only ever appends. **The prefix never crosses the
wire.** The browser sends a cursor relative to `shape` and gets columns back;
it is never told where any of it lives, and it cannot walk above the prefix
because there is no string path to walk up -- a segment that names no slot
yields an error column and nothing else.

The one hard trick is that the address arrives at runtime:

- `column_terms` is an **ordinary `-> Nu` builder**. Given a Shape
  class, a concrete cursor and a prefix it walks the Shape in python and
  returns a Nu term that reads whatever kv has to be read. A function, not an
  atom: it composes, and it introduces no thunk.
- `LensColumns` is that builder behind `host`, so the cursor can
  be a runtime value. The callable is fixed at class definition time, which is
  the sanctioned escape -- the callable is code, not data. Its children are the
  shape and the prefix (both addresses), the cursor and the cap.
- `columns` hands `LensColumns` to `Eval`, which compiles the
  produced term against the running program and drives it in the same ctx.

Dispatch is on the kernel Ref families, never on anything a storage layer
declares: `DictRef` is a `MappingRef`, `StrRef` is an `ItemRef`, and
that is the whole protocol. So a slot declared `DictRef(object)` opens as a
mapping and shows exactly what a program wrote into it, keys no Shape ever
named included -- the shape supplies the protocol, kv supplies the contents.
The walk stops only at something no shape declares as a container at all.

Nothing here opens a store, and nothing here imports a fabric. Building the
term needs no Navigator; only running it touches one. So the storage boundary
belongs to whoever runs the term: `browse` places it for
you, and a caller wiring the arm by hand writes the `nustd.kv.Snapshot(...)`
itself. An `Eval` is opaque to the static effect walk, so that bracket can
never be inferred from the tree.

| Name | Call | Meaning |
| --- | --- | --- |
| [column_terms](#column_terms) | `lens.column_terms(shape, cursor, prefix=None, max_rows=200)` | Every column for `cursor`: one per prefix of it, root first. |
| [columns](#columns-1) | `lens.columns(shape, cursor, prefix=None, max_rows=200)` | The columns for a cursor nobody knew at compile time. |

### column_terms

Every column for `cursor`: one per prefix of it, root first.

```python
lens.column_terms(shape, cursor, prefix=None, max_rows=200)
```

Path `nustd.ui.lens.column_terms`. Defined on `nustd.ui.lens.columns`, bound as a function. Builds `nu.Nu`.

Full replacement, not a delta. A navigation is one frame carrying the whole
cascade, so a browser that missed one is not left holding a stale column it
can never be told about.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `shape` | `type[Shape]` |  | what to expect, and what the cursor is relative to. |
| `cursor` | `object` |  | segments relative to `shape`, as a plain python sequence. |
| `prefix` | `StructuredRef \| None` | `None` | where `shape` lives. None reads it at the root of its store. |
| `max_rows` | `int` | `200` | how many rows one column ships. |

Undocumented: example.

### columns

The columns for a cursor nobody knew at compile time.

```python
lens.columns(shape, cursor, prefix=None, max_rows=200)
```

Path `nustd.ui.lens.columns`. Defined on `nustd.ui.lens.columns`, bound as a function. Builds `nu.Nu`.

`Eval` compiles what `LensColumns` built against the running
program and drives it in the same ctx, so the reads see the same store and
the same fabrics as everything else in the arm. The storage boundary is the
caller's to place: an `Eval` is opaque to the static effect walk, so
nothing infers one for these reads.

Guarded, and not as a second copy of the caller's guard: a read that raises
inside the `Eval` would leave the arm with nothing to write and the
browser waiting on a frame that never comes. A cascade always comes back,
even if all it says is what went wrong.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `shape` | `type[Shape]` |  |  |
| `cursor` | `nu.Nu` |  |  |
| `prefix` | `StructuredRef \| None` | `None` |  |
| `max_rows` | `int` | `200` |  |

Undocumented: example.

---
title: state
description: "State ops: reach another cell's or plane's state, wipe state."
---

Module `nuspace.ops.state`.

State ops: reach another cell's or plane's state, wipe state.

A program names its state bare and the kernel lands it in the States
store, under the cell running it. `sibling` lands it under another
cell of the same plane instead, so two cells meet without either knowing
the store's layout. `cell_state` and `plane_state` land it under
any cell's or plane's, for a reader that is not on that plane (eg a search).
`bracketed` lands a whole term under the running cell and brackets it,
for an author who wants the brackets placed for them.

| Name | Call | Meaning |
| --- | --- | --- |
| [bracketed](#bracketed) | `ops.bracketed(term)` | `term` landed under the running cell, with a bracket placed around each store access. |
| [cell_state](#cell_state) | `ops.cell_state(cell_id, term)` | `term` with its `CellState` chains landing under any cell. |
| [clear_cell_state](#clear_cell_state) | `ops.clear_cell_state(cell_id)` | Wipe a cell's state. |
| [clear_plane_state](#clear_plane_state) | `ops.clear_plane_state(plane_id)` | Wipe a plane's shared state. Its cells' own is left alone: `clear_cell_state`. |
| [plane_state](#plane_state) | `ops.plane_state(plane_id, term)` | `term` with its `PlaneState` chains landing under any plane's shared state. |
| [sibling](#sibling) | `ops.sibling(cell_id, term)` | `term` with its `CellState` chains landing under a sibling cell. |

## bracketed

`term` landed under the running cell, with a bracket placed around each store access.

```python
ops.bracketed(term)
```

Path `nuspace.ops.bracketed`. Defined on `nuspace.ops.state`, bound as a function. Builds `nu.Nu`.

The hands-off way to follow the bracket rule (see `utils`):
an author wraps a cell's whole `out()` in it and writes the rest bare.
Its state chains are rerooted under the running cell first, through
`Here` as `sibling` does, so they belong to
States before the brackets are placed; the kernel's own reroot then leaves
them alone. Then one pass per store, Space and then States, puts a
snapshot around each Flow branch that reads and a transaction around each
one that writes. Brackets already in the term, an op's own included, are
kept and looked into, never doubled.

Each branch of a Flow is bracketed on its own, so a loop, a wait or a
subscription gets a bracket per step and never one around itself. A
wrapper that is not a Flow (eg `Frame`, `let`, `With`, `TryCatch`,
`Timeout`) and reads a store outside its Flow branches gets one bracket
around all of it, so one that holds a loop, a wait or an `Eval` holds
that bracket for as long as they run. Code shaped like that brackets by
hand, with `atomic_state` and `snapshot`.

Only inside a cell run, where `Here` is held.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `term` | `nu.Nu` |  | What the cell runs, eg the body of `out()`. |

Undocumented: example.

## cell_state

`term` with its `CellState` chains landing under any cell.

```python
ops.cell_state(cell_id, term)
```

Path `nuspace.ops.cell_state`. Defined on `nuspace.ops.state`, bound as a function. Builds `nu.Nu`.

`sibling` for a cell on another plane. Bare, and routed to the
States store, as `sibling` is: its caller brackets it.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cell_id` | `nu.StrArg` |  | The cell. |
| `term` | `nu.Nu` |  | What to read or write there, eg `Doc.text`. |

Undocumented: example.

## clear_cell_state

Wipe a cell's state.

```python
ops.clear_cell_state(cell_id)
```

Path `nuspace.ops.clear_cell_state`. Defined on `nuspace.ops.state`, bound as a function. Builds `nu.Nu`.

A person's op, not a step in a restart: a cell coming back is meant to
find what it left. A no-op when the cell is missing. One commit on the
States store: whether the cell is there is read from a Space snapshot.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cell_id` | `nu.StrArg` |  |  |

Undocumented: example.

## clear_plane_state

Wipe a plane's shared state. Its cells' own is left alone: `clear_cell_state`.

```python
ops.clear_plane_state(plane_id)
```

Path `nuspace.ops.clear_plane_state`. Defined on `nuspace.ops.state`, bound as a function. Builds `nu.Nu`.

A no-op when the plane is missing. One commit on the States store, as
`clear_cell_state`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |

Undocumented: example.

## plane_state

`term` with its `PlaneState` chains landing under any plane's shared state.

```python
ops.plane_state(plane_id, term)
```

Path `nuspace.ops.plane_state`. Defined on `nuspace.ops.state`, bound as a function. Builds `nu.Nu`.

What a plane's own cells reach bare, reached from outside it: by an op
that seeds a plane's state, or a cell showing another plane's. Rerooted
here, the chains no longer root at `PlaneState`, so the kernel's own
reroot leaves them alone. Bare, and routed to the States store: its
caller brackets it.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  | The plane. |
| `term` | `nu.Nu` |  | What to read or write there, eg `Search.hits`. |

Undocumented: example.

## sibling

`term` with its `CellState` chains landing under a sibling cell.

```python
ops.sibling(cell_id, term)
```

Path `nuspace.ops.sibling`. Defined on `nuspace.ops.state`, bound as a function. Builds `nu.Nu`.

The sibling is `cell_id`, a cell of the same plane as the run
evaluating this, by convention: a cell's state is keyed by its id alone,
so this is `cell_state` under the name a program reads it by.
Rerooted here, the chains no longer root at `CellState`, so the
kernel's own reroot leaves them alone. `PlaneState` chains are
untouched and land at the shared plane state.

Bare, like any state read: it routes to the States store, so the
bracket its caller puts around it names `States`
(eg `atomic_state`, `snapshot`).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cell_id` | `nu.StrArg` |  | The sibling's id. Ids, not names: names are not unique. |
| `term` | `nu.Nu` |  | What to read or write there, eg `Tick.n`. |

Undocumented: example.

---
title: ops
description: "Layer one: the ops, nuspace's language."
---

Module `nuspace.ops`.

Layer one: the ops, nuspace's language.

Every op is a function returning a Nu term. Planes' cells, services and the
shell compose these and nothing narrower.

- **Writes are one commit each.** An op brackets itself in a kv transaction
  over `Space`, retried on conflict, so nothing reads
  half of it and it is safe from any process holding the store, a proxied
  navigator on a worker included. Nothing brackets a term for its author:
  ops, services and cell programs all keep the one bracket rule in
  `utils`, by hand with `atomic`, `atomic_state`
  and `snapshot`, or with `bracketed` around a whole program.
- **Queries yield, effects write.** A query, a pure read or computation,
  evaluates to its value. A flow or an op with effects never hands a
  result back: it writes what it made or decided into a ref, yields
  nothing, and chains with `>>`; whoever needs the result reads that
  ref. Mostly the ref is the record itself: a plane made is listed under its parent,
  a plane moved has its new parent. Where the record cannot say which one
  this call made, the op takes an `into` ref, a mem ref the caller holds
  or a kv ref in the store it commits to, and sets it as part of its
  writes.
- **Ids are minted at evaluation.** A term is built once and may run many
  times (eg in an arm), so an op that makes something mints its id when it
  runs.
- **Reads are bare.** They compose into any expression and read inside the
  enclosing bracket. Alone, wrap one in `nustd.kv.Snapshot(..., scope=Space)`,
  or in `snapshot` when it reads program state too.
- **Two stores.** Space holds structure, runs and devices; States holds
  program state, by plane and cell id. A write op commits to one; one that
  touches both is a commit to each, Space first (see
  `atomic_state`).
- **Kernel ops write intents only.** The kernel and the backends, in the
  host, make them true and write the effects (see `kernel`).

## nuspace.shapes.state

Module `nuspace.shapes.state`.

Program declared state: the two bases a cell's shapes say whose they are by.

[Full entries](/docs/nuspace/reference/ops/nuspace-shapes-state)

| Name | Call | Meaning |
| --- | --- | --- |
| [CellState](/docs/nuspace/reference/ops/nuspace-shapes-state#cellstate) |  | Base for state owned by one cell. Lands at `States.cells[c]`. |
| [PlaneState](/docs/nuspace/reference/ops/nuspace-shapes-state#planestate) |  | Base for state shared by a plane's cells. Lands at `States.planes[p].state`. |

## kernel

Module `nuspace.ops.kernel`.

Kernel ops: run planes, interrupt and kill them, run and interrupt their cells.

[Full entries](/docs/nuspace/reference/ops/kernel)

| Name | Call | Meaning |
| --- | --- | --- |
| [Here](/docs/nuspace/reference/ops/kernel#here) |  | Where a cell run's body runs: the ids the kernel holds for it in a frame. |
| [cell_interrupt](/docs/nuspace/reference/ops/kernel#cell_interrupt) | `ops.cell_interrupt(run_id, cell_run_id)` | Ask a cell run to stop. A no-op when it is not live. One commit. |
| [cell_run](/docs/nuspace/reference/ops/kernel#cell_run) | `ops.cell_run(run_id, cell_id, by='')` | Run a cell inside a live plane run: a new cell run, beside any other of it. One commit. |
| [cell_runs](/docs/nuspace/reference/ops/kernel#cell_runs) | `ops.cell_runs(run_id, live=False)` | A plane run's cell runs as dicts with their `id`, oldest first. Bare read. |
| [env](/docs/nuspace/reference/ops/kernel#env) | `ops.env(name)` | An env spec: the name a factory was registered under, then its args. |
| [latest](/docs/nuspace/reference/ops/kernel#latest) | `ops.latest(run_id, cell_id)` | A cell's newest cell run in a plane run, live or ended, `""` when it has none. Bare read. |
| [plane_interrupt](/docs/nuspace/reference/ops/kernel#plane_interrupt) | `ops.plane_interrupt(run_id)` | Ask every live cell run of a plane run to stop. One commit. |
| [plane_kill](/docs/nuspace/reference/ops/kernel#plane_kill) | `ops.plane_kill(run_id)` | Tear a plane run down: its backend kills whatever runs it. One commit. |
| [plane_run](/docs/nuspace/reference/ops/kernel#plane_run) | `ops.plane_run(plane_id, by='', envs=(), into=None)` | Run a plane: a new plane run with a cell run per cell, in order. One commit. |
| [plane_stop](/docs/nuspace/reference/ops/kernel#plane_stop) | `ops.plane_stop(run_id, grace=10.0)` | Interrupt a plane run, then kill it if it is still running after `grace` seconds. |
| [run](/docs/nuspace/reference/ops/kernel#run) | `ops.run(run_id)` | One plane run by id, live or ended, whole: every cell run under `cells`, every worker. Bare read. |
| [runs](/docs/nuspace/reference/ops/kernel#runs) | `ops.runs(plane=None)` | The live plane runs as dicts with their `id`, oldest first. Bare read. |
| [workers](/docs/nuspace/reference/ops/kernel#workers) | `ops.workers()` | The live workers as dicts with their `id`, oldest first. Bare read. |

## cell

Module `nuspace.ops.cell`.

Cell ops: write one, edit it, place it, drop it.

[Full entries](/docs/nuspace/reference/ops/cell)

| Name | Call | Meaning |
| --- | --- | --- |
| [add_cell](/docs/nuspace/reference/ops/cell#add_cell) | `ops.add_cell(plane_id, prog, cell_id=None, name='', index=None, made_by='', meta=None, into=None)` | Write a cell onto a plane and place it at `index`, in one commit. |
| [remove_cell](/docs/nuspace/reference/ops/cell#remove_cell) | `ops.remove_cell(cell_id)` | Drop a cell: its live cell runs interrupted, off its plane, row deleted, then its state. |
| [rename_cell](/docs/nuspace/reference/ops/cell#rename_cell) | `ops.rename_cell(cell_id, name)` | Set a cell's name. A no-op when it is missing. |
| [reorder_cells](/docs/nuspace/reference/ops/cell#reorder_cells) | `ops.reorder_cells(plane_id, cell_ids)` | Put a plane's cells in the order given. |
| [set_cell_meta](/docs/nuspace/reference/ops/cell#set_cell_meta) | `ops.set_cell_meta(cell_id, fields)` | Merge `fields` into a cell's meta. A no-op when it is missing. |
| [set_prog](/docs/nuspace/reference/ops/cell#set_prog) | `ops.set_prog(cell_id, prog)` | Replace a cell's source, and its `has_ui` with it. Bumps its `version`. |

## plane

Module `nuspace.ops.plane`.

Plane ops: make one, name it, annotate it, drop it.

[Full entries](/docs/nuspace/reference/ops/plane)

| Name | Call | Meaning |
| --- | --- | --- |
| [add_plane](/docs/nuspace/reference/ops/plane#add_plane) | `ops.add_plane(plane_id=None, backend, name='', parent='', system=False, ui=False, made_by='', meta=None, into=None)` | Make a plane with no cells and hang it under `parent`, in one commit. |
| [remove_plane](/docs/nuspace/reference/ops/plane#remove_plane) | `ops.remove_plane(plane_id)` | Drop a plane, its cells, and every plane nested below it, unpinning each. Then their state. |
| [rename_plane](/docs/nuspace/reference/ops/plane#rename_plane) | `ops.rename_plane(plane_id, name)` | Set a plane's name. A no-op when it is missing. |
| [set_plane_icon](/docs/nuspace/reference/ops/plane#set_plane_icon) | `ops.set_plane_icon(plane_id, icon)` | Set a plane's icon: a merge of `meta.icon`. A no-op when it is missing. |
| [set_plane_meta](/docs/nuspace/reference/ops/plane#set_plane_meta) | `ops.set_plane_meta(plane_id, fields)` | Merge `fields` into a plane's meta, shallow. A no-op when it is missing. |

## utils

Module `nuspace.ops.utils`.

Helpers the ops share: the bracket, run time ids, a total field read, a reorder.

[Full entries](/docs/nuspace/reference/ops/utils)

| Name | Call | Meaning |
| --- | --- | --- |
| [atomic](/docs/nuspace/reference/ops/utils#atomic) | `ops.atomic(body)` | `body` as one commit against the Space store, retried on conflict. |
| [atomic_state](/docs/nuspace/reference/ops/utils#atomic_state) | `ops.atomic_state(body)` | `body` as one commit against the States store, retried on conflict. |
| [mint_ordered_id](/docs/nuspace/reference/ops/utils#mint_ordered_id) | `ops.mint_ordered_id(prefix)` | A time ordered id like `p_<12 hex ms>_<4 hex seq>_<4 hex rand>`. |
| [snapshot](/docs/nuspace/reference/ops/utils#snapshot) | `ops.snapshot(term)` | `term` read in a snapshot of both stores, Space and States. |

## state

Module `nuspace.ops.state`.

State ops: reach another cell's or plane's state, wipe state.

[Full entries](/docs/nuspace/reference/ops/state)

| Name | Call | Meaning |
| --- | --- | --- |
| [bracketed](/docs/nuspace/reference/ops/state#bracketed) | `ops.bracketed(term)` | `term` landed under the running cell, with a bracket placed around each store access. |
| [cell_state](/docs/nuspace/reference/ops/state#cell_state) | `ops.cell_state(cell_id, term)` | `term` with its `CellState` chains landing under any cell. |
| [clear_cell_state](/docs/nuspace/reference/ops/state#clear_cell_state) | `ops.clear_cell_state(cell_id)` | Wipe a cell's state. |
| [clear_plane_state](/docs/nuspace/reference/ops/state#clear_plane_state) | `ops.clear_plane_state(plane_id)` | Wipe a plane's shared state. Its cells' own is left alone: `clear_cell_state`. |
| [plane_state](/docs/nuspace/reference/ops/state#plane_state) | `ops.plane_state(plane_id, term)` | `term` with its `PlaneState` chains landing under any plane's shared state. |
| [sibling](/docs/nuspace/reference/ops/state#sibling) | `ops.sibling(cell_id, term)` | `term` with its `CellState` chains landing under a sibling cell. |

## read

Module `nuspace.ops.read`.

Structure reads: what planes and cells exist, where, and in what order.

[Full entries](/docs/nuspace/reference/ops/read)

| Name | Call | Meaning |
| --- | --- | --- |
| [cell_exists](/docs/nuspace/reference/ops/read#cell_exists) | `ops.cell_exists(cell_id)` | Whether a cell is stored under this id. |
| [cell_named](/docs/nuspace/reference/ops/read#cell_named) | `ops.cell_named(plane_id, name)` | The id of the first cell on a plane called `name`, `""` for none. Names are not unique. |
| [cell_plane](/docs/nuspace/reference/ops/read#cell_plane) | `ops.cell_plane(cell_id)` | The id of the plane a cell is on, `""` for no such cell. |
| [cell_rows](/docs/nuspace/reference/ops/read#cell_rows) | `ops.cell_rows(plane_id)` | A plane's cells as `id, name, prog, props, meta`, in order. One read fills an editor. |
| [cells](/docs/nuspace/reference/ops/read#cells) | `ops.cells(plane_id)` | A plane's cell ids, in order. `[]` for a plane never written. |
| [children](/docs/nuspace/reference/ops/read#children) | `ops.children(plane_id='')` | A plane's child plane ids, in order, the top level ones for `""`. |
| [parent](/docs/nuspace/reference/ops/read#parent) | `ops.parent(plane_id)` | The plane listing this one, `""` at the top level and for no such plane. One read. |
| [plane_exists](/docs/nuspace/reference/ops/read#plane_exists) | `ops.plane_exists(plane_id)` | Whether a plane is stored under this id. |
| [plane_rows](/docs/nuspace/reference/ops/read#plane_rows) | `ops.plane_rows()` | Every plane as `id, name, props, meta, parent`. One read fills a sidebar. |
| [plane_title](/docs/nuspace/reference/ops/read#plane_title) | `ops.plane_title(plane_id)` | What to call a plane: its name, its id where the name is unwritten or `""`. Bare read. |
| [planes](/docs/nuspace/reference/ops/read#planes) | `ops.planes()` | Every plane id. Minted ids sort by creation, so this is creation order. |
| [prog](/docs/nuspace/reference/ops/read#prog) | `ops.prog(cell_id)` | A cell's source, `""` where there is none. |

## extend

Module `nuspace.ops.extend`.

Extension ops: create a registered Plane, insert a snippet.

[Full entries](/docs/nuspace/reference/ops/extend)

| Name | Call | Meaning |
| --- | --- | --- |
| [create_plane](/docs/nuspace/reference/ops/extend#create_plane) | `ops.create_plane(spec, parent='', name=None, plane_id=None, into=None)` | Create a plane from `spec`: drawn, its cells in order, its children under it. |
| [insert_snippet](/docs/nuspace/reference/ops/extend#insert_snippet) | `ops.insert_snippet(plane_id, snippet, index=None, cell_id=None, into=None)` | Add a cell from a snippet: its source as the prog, its name as the name and `made_by`. |

## pin

Module `nuspace.ops.pin`.

Pins: the planes pinned to the top of the sidebar, in order.

[Full entries](/docs/nuspace/reference/ops/pin)

| Name | Call | Meaning |
| --- | --- | --- |
| [move_pin](/docs/nuspace/reference/ops/pin#move_pin) | `ops.move_pin(plane_id, index)` | Move a pinned plane to `index`. A no-op when it is not pinned. |
| [pin_plane](/docs/nuspace/reference/ops/pin#pin_plane) | `ops.pin_plane(plane_id, index=None)` | Pin a plane at `index`, the end when None. One commit. |
| [pinned](/docs/nuspace/reference/ops/pin#pinned) | `ops.pinned()` | The pinned plane ids, in order. `[]` when nothing was ever pinned. Bare read. |
| [unpin_plane](/docs/nuspace/reference/ops/pin#unpin_plane) | `ops.unpin_plane(plane_id)` | Unpin a plane. The plane itself is left alone. A no-op when it is not pinned. |

## tree

Module `nuspace.ops.tree`.

Nesting: which plane hangs under which.

[Full entries](/docs/nuspace/reference/ops/tree)

| Name | Call | Meaning |
| --- | --- | --- |
| [move_plane](/docs/nuspace/reference/ops/tree#move_plane) | `ops.move_plane(plane_id, parent='', index=None)` | Hang `plane_id` under `parent` (a plane id, `""` for the top) at `index`. |

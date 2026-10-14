---
title: kernel
description: "Kernel ops: run planes, interrupt and kill them, run and interrupt their cells."
---

Module `nuspace.ops.kernel`.

Kernel ops: run planes, interrupt and kill them, run and interrupt their cells.

The store is the transport (D1): these write intents only. `plane_run`
and `cell_run` write new records into the live indexes, the interrupts
set `interrupt_requested`, `plane_kill` sets `termination_requested`.
The kernel, in the host where the backends live, sees the records and makes
them true, and it and the backends write every effect. So every op here is
safe from any process holding the store, a service on a worker included.

Every op is O(1) or O(k), k being what is live of what it asks about: a
plane's live runs are its `planes_running`, a run's live cell runs its
`cells_running`, its live workers its `workers_running`, never `runs`
nor all of `running`. A cell's newest cell run in a plane run is a point
read of the run's `latest` (`latest`), never a walk of its
`cells`, which grows with every reload.

| Name | Call | Meaning |
| --- | --- | --- |
| [Here](#here) |  | Where a cell run's body runs: the ids the kernel holds for it in a frame. |
| [cell_interrupt](#cell_interrupt) | `ops.cell_interrupt(run_id, cell_run_id)` | Ask a cell run to stop. A no-op when it is not live. One commit. |
| [cell_run](#cell_run) | `ops.cell_run(run_id, cell_id, by='')` | Run a cell inside a live plane run: a new cell run, beside any other of it. One commit. |
| [cell_runs](#cell_runs) | `ops.cell_runs(run_id, live=False)` | A plane run's cell runs as dicts with their `id`, oldest first. Bare read. |
| [env](#env) | `ops.env(name)` | An env spec: the name a factory was registered under, then its args. |
| [latest](#latest) | `ops.latest(run_id, cell_id)` | A cell's newest cell run in a plane run, live or ended, `""` when it has none. Bare read. |
| [plane_interrupt](#plane_interrupt) | `ops.plane_interrupt(run_id)` | Ask every live cell run of a plane run to stop. One commit. |
| [plane_kill](#plane_kill) | `ops.plane_kill(run_id)` | Tear a plane run down: its backend kills whatever runs it. One commit. |
| [plane_run](#plane_run) | `ops.plane_run(plane_id, by='', envs=(), into=None)` | Run a plane: a new plane run with a cell run per cell, in order. One commit. |
| [plane_stop](#plane_stop) | `ops.plane_stop(run_id, grace=10.0)` | Interrupt a plane run, then kill it if it is still running after `grace` seconds. |
| [run](#run) | `ops.run(run_id)` | One plane run by id, live or ended, whole: every cell run under `cells`, every worker. Bare read. |
| [runs](#runs) | `ops.runs(plane=None)` | The live plane runs as dicts with their `id`, oldest first. Bare read. |
| [workers](#workers) | `ops.workers()` | The live workers as dicts with their `id`, oldest first. Bare read. |

## Here

Where a cell run's body runs: the ids the kernel holds for it in a frame.

Path `nuspace.ops.Here`.

The kernel opens a frame over this Shape around every cell run's body,
so a program and its envs read these, eg `Here.plane`, and never set
them.

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `plane` | `ref` | `StrRef` |  | `nuspace.ops.Here.plane` |
| `cell` | `ref` | `StrRef` |  | `nuspace.ops.Here.cell` |
| `run` | `ref` | `StrRef` |  | `nuspace.ops.Here.run` |
| `cell_run` | `ref` | `StrRef` |  | `nuspace.ops.Here.cell_run` |

Undocumented: example.

## cell_interrupt

Ask a cell run to stop. A no-op when it is not live. One commit.

```python
ops.cell_interrupt(run_id, cell_run_id)
```

Path `nuspace.ops.cell_interrupt`. Defined on `nuspace.ops.kernel`, bound as a function. Builds `nu.Nu`.

Cooperative: its body watches `interrupt_requested` and ends itself
`interrupted`. There is no cell kill: a backend may not be able to
kill one cell alone, so kill is a plane op.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `run_id` | `nu.StrArg` |  |  |
| `cell_run_id` | `nu.StrArg` |  |  |

Undocumented: example.

## cell_run

Run a cell inside a live plane run: a new cell run, beside any other of it. One commit.

```python
ops.cell_run(run_id, cell_id, by='')
```

Path `nuspace.ops.cell_run`. Defined on `nuspace.ops.kernel`, bound as a function. Builds `nu.Nu`.

The new cell run is the cell's `latest` in the run, where a caller
reads it. Nothing is written when the plane run is not live or the cell
is not on its plane.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `run_id` | `nu.StrArg` |  |  |
| `cell_id` | `nu.StrArg` |  |  |
| `by` | `nu.StrArg` | `''` |  |

Undocumented: example.

## cell_runs

A plane run's cell runs as dicts with their `id`, oldest first. Bare read.

```python
ops.cell_runs(run_id, live=False)
```

Path `nuspace.ops.cell_runs`. Defined on `nuspace.ops.kernel`, bound as a function. Builds `nu.List`.

Every one it ever had, or with `live` only those in `cells_running`.
Minted ids sort by creation, so sorted is oldest first.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `run_id` | `nu.StrArg` |  |  |
| `live` | `bool` | `False` |  |

Undocumented: example.

## env

An env spec: the name a factory was registered under, then its args.

```python
ops.env(name)
```

Path `nuspace.ops.env`. Defined on `nuspace.ops.kernel`, bound as a function. Builds `list[str]`.

Plain data, so it is stored on the run (`Run.envs`) and anyone can run
the plane the same way again.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `str` |  |  |

Undocumented: example.

## latest

A cell's newest cell run in a plane run, live or ended, `""` when it has none. Bare read.

```python
ops.latest(run_id, cell_id)
```

Path `nuspace.ops.latest`. Defined on `nuspace.ops.kernel`, bound as a function. Builds `nu.Str`.

A point read of the run's `latest`: O(1) however many times the cell
was reloaded or restarted in it.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `run_id` | `nu.StrArg` |  |  |
| `cell_id` | `nu.StrArg` |  |  |

Undocumented: example.

## plane_interrupt

Ask every live cell run of a plane run to stop. One commit.

```python
ops.plane_interrupt(run_id)
```

Path `nuspace.ops.plane_interrupt`. Defined on `nuspace.ops.kernel`, bound as a function. Builds `nu.Nu`.

Once they have, `cells_running` is empty and the run ends.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `run_id` | `nu.StrArg` |  |  |

Undocumented: example.

## plane_kill

Tear a plane run down: its backend kills whatever runs it. One commit.

```python
ops.plane_kill(run_id)
```

Path `nuspace.ops.plane_kill`. Defined on `nuspace.ops.kernel`, bound as a function. Builds `nu.Nu`.

Not cooperative: its live cell runs end `killed` without a say. A
no-op when the run is not live.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `run_id` | `nu.StrArg` |  |  |

Undocumented: example.

## plane_run

Run a plane: a new plane run with a cell run per cell, in order. One commit.

```python
ops.plane_run(plane_id, by='', envs=(), into=None)
```

Path `nuspace.ops.plane_run`. Defined on `nuspace.ops.kernel`, bound as a function. Builds `nu.Nu`.

The run takes the plane's `backend` prop as it is now. A plane with no
cells makes a run the kernel ends at once. A plane with no backend makes
a run the kernel ends failed, the error saying so: there is no default.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  | The plane. |
| `by` | `nu.StrArg` | `''` | Who asked, eg `nav`. |
| `envs` | `Sequence[Sequence[str]] \| nu.Nu` | `()` | Env specs its cells run inside, outermost first, each `env(name, *args)`. |
| `into` | `nu.Ref \| None` | `None` | Set to the run id in the commit, `""` when the plane is missing, for a caller that needs it: the record does not say which run this call made. A retried commit sets it again, so it names the run that landed. |

Undocumented: example.

## plane_stop

Interrupt a plane run, then kill it if it is still running after `grace` seconds.

```python
ops.plane_stop(run_id, grace=10.0)
```

Path `nuspace.ops.plane_stop`. Defined on `nuspace.ops.kernel`, bound as a function. Builds `nu.Nu`.

Two intents, written as they fall due. Returns once the run has ended,
or once the kill is asked for: a caller waits `grace` at most.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `run_id` | `nu.StrArg` |  |  |
| `grace` | `nu.FloatArg` | `10.0` |  |

Undocumented: example.

## run

One plane run by id, live or ended, whole: every cell run under `cells`, every worker. Bare read.

```python
ops.run(run_id)
```

Path `nuspace.ops.run`. Defined on `nuspace.ops.kernel`, bound as a function. Builds `nu.Dict`.

The one read that walks a run's history, for inspecting it: O(what the
run ever had). Nothing that runs on repeat reads it.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `run_id` | `nu.StrArg` |  |  |

Undocumented: example.

## runs

The live plane runs as dicts with their `id`, oldest first. Bare read.

```python
ops.runs(plane=None)
```

Path `nuspace.ops.runs`. Defined on `nuspace.ops.kernel`, bound as a function. Builds `nu.List`.

Live is `running`, so this reads in the time of what is live, its
`workers` the live ones. With `plane`, that plane's live runs only.
A run's cell runs are `cell_runs`; an ended run is read by id with
`run`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane` | `nu.StrArg \| None` | `None` |  |

Undocumented: example.

## workers

The live workers as dicts with their `id`, oldest first. Bare read.

```python
ops.workers()
```

Path `nuspace.ops.workers`. Defined on `nuspace.ops.kernel`, bound as a function. Builds `nu.List`.

`handle` is the backend's own, not for reading into.

Undocumented: example.

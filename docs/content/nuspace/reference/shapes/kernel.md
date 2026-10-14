---
title: kernel
description: "Kernel records: plane runs, their cell runs, the workers they run on, and what is live."
---

Module `nuspace.shapes.kernel`.

Kernel records: plane runs, their cell runs, the workers they run on, and what is live.

No status anywhere. A record logs intents (`*_requested`, written by ops)
and effects (`started_at`, `terminated_at`, `exit`, `error`, written
by the kernel and the backends). Whether something is live is whether its id
is in an index: `running` for plane runs, `cells_running` for a plane
run's cell runs, `workers_running` for workers. Ending is a write of
`terminated_at` plus a delete from the index. Nothing moves, nothing is
pruned, and nothing iterates `runs` or `workers` whole.

An index has narrower copies, one per owner, written in the same commit as
the index itself: a plane's live runs (`planes_running`), a run's live
workers (`Run.workers_running`). What is live of one plane or one run is
read in the time of that, never of everything live.

| Name | Call | Meaning |
| --- | --- | --- |
| [CellRun](#cellrun) |  | One execution of one cell, inside a plane run. Never mutated into another. |
| [Kernel](#kernel) |  | Everything the kernel and the backends record. |
| [PlaneRuns](#planeruns) |  | One plane's live plane runs: the ids in `running` whose run is of it. |
| [Run](#run) |  | One execution of a plane: the thing started, stopped and killed. |
| [Worker](#worker) |  | The executor unit a backend runs cells on: a process today, anything later. |

## CellRun

One execution of one cell, inside a plane run. Never mutated into another.

Path `nuspace.shapes.CellRun`.

A reload or a restart is a new cell run. `version` is the cell's
version when this run was asked for, so a newer prog is told apart
without reading source. `by` says who asked. `worker` is the id of
the `Worker` its backend put it on.

`out` is `[ts, stream, text]` entries, a capped ring written whole by
the run's own body.

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `cell` | `ref` | `StrRef` |  | `nuspace.shapes.CellRun.cell` |
| `version` | `ref` | `IntRef` |  | `nuspace.shapes.CellRun.version` |
| `by` | `ref` | `StrRef` |  | `nuspace.shapes.CellRun.by` |
| `worker` | `ref` | `StrRef` |  | `nuspace.shapes.CellRun.worker` |
| `started_at` | `ref` | `FloatRef` |  | `nuspace.shapes.CellRun.started_at` |
| `interrupt_requested` | `ref` | `BoolRef` |  | `nuspace.shapes.CellRun.interrupt_requested` |
| `terminated_at` | `ref` | `FloatRef` |  | `nuspace.shapes.CellRun.terminated_at` |
| `exit` | `ref` | `StrRef` |  | `nuspace.shapes.CellRun.exit` |
| `error` | `ref` | `StrRef` |  | `nuspace.shapes.CellRun.error` |
| `out` | `ref` | `PrimitiveListRef` |  | `nuspace.shapes.CellRun.out` |

Undocumented: example.

## Kernel

Everything the kernel and the backends record.

Path `nuspace.shapes.Kernel`.

`runs` and `workers` are the source of truth, every one ever.
`running` and `workers_running` are the live ids, so what is live is
read in the time of what is live. `planes_running` is `running` by
plane: a plane is listed while it has a live run, and only then.

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `runs` | `ref` | `DictRef[str, Run]` |  | `nuspace.shapes.Kernel.runs` |
| `running` | `ref` | `SetRef[str]` |  | `nuspace.shapes.Kernel.running` |
| `workers` | `ref` | `DictRef[str, Worker]` |  | `nuspace.shapes.Kernel.workers` |
| `workers_running` | `ref` | `SetRef[str]` |  | `nuspace.shapes.Kernel.workers_running` |
| `planes_running` | `ref` | `DictRef[str, PlaneRuns]` |  | `nuspace.shapes.Kernel.planes_running` |

Undocumented: example.

## PlaneRuns

One plane's live plane runs: the ids in `running` whose run is of it.

Path `nuspace.shapes.PlaneRuns`.

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `runs` | `ref` | `SetRef[str]` |  | `nuspace.shapes.PlaneRuns.runs` |

Undocumented: example.

## Run

One execution of a plane: the thing started, stopped and killed.

Path `nuspace.shapes.Run`.

`backend` is the plane's backend when the run was asked for. `envs`
is the env specs its cells run inside, each `[name, *args]` naming a
factory registered at open: stored rather than the envs themselves
because a function cannot be stored, and so anyone can run the plane
the same way again.

`cells` is every cell run it ever had, `cells_running` the live ones.
`latest` maps each cell to its newest cell run, written with it, so a
cell's current run is a point read and never a walk of `cells`, which
grows with every reload. The run ends once `cells_running` is empty,
or on kill, its exit read off `latest`. `workers` is every worker
its backend ever gave it, `workers_running` the live ones.

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `plane` | `ref` | `StrRef` |  | `nuspace.shapes.Run.plane` |
| `backend` | `ref` | `StrRef` |  | `nuspace.shapes.Run.backend` |
| `by` | `ref` | `StrRef` |  | `nuspace.shapes.Run.by` |
| `envs` | `ref` | `PrimitiveListRef` |  | `nuspace.shapes.Run.envs` |
| `started_at` | `ref` | `FloatRef` |  | `nuspace.shapes.Run.started_at` |
| `termination_requested` | `ref` | `BoolRef` |  | `nuspace.shapes.Run.termination_requested` |
| `terminated_at` | `ref` | `FloatRef` |  | `nuspace.shapes.Run.terminated_at` |
| `exit` | `ref` | `StrRef` |  | `nuspace.shapes.Run.exit` |
| `error` | `ref` | `StrRef` |  | `nuspace.shapes.Run.error` |
| `cells` | `ref` | `DictRef[str, CellRun]` |  | `nuspace.shapes.Run.cells` |
| `cells_running` | `ref` | `SetRef[str]` |  | `nuspace.shapes.Run.cells_running` |
| `latest` | `ref` | `DictRef[str, str]` |  | `nuspace.shapes.Run.latest` |
| `workers` | `ref` | `SetRef[str]` |  | `nuspace.shapes.Run.workers` |
| `workers_running` | `ref` | `SetRef[str]` |  | `nuspace.shapes.Run.workers_running` |

Undocumented: example.

## Worker

The executor unit a backend runs cells on: a process today, anything later.

Path `nuspace.shapes.Worker`.

Written by its backend only, read by everybody. `run` is the plane run
it belongs to. `handle` is the backend's own address for it, a str
only the backend reads (the pool's id, for the process backends).
`exit` is `ok` when its backend let it go, `killed` when the plane
run was killed, `failed` when it died by itself (`error` says how).

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `backend` | `ref` | `StrRef` |  | `nuspace.shapes.Worker.backend` |
| `run` | `ref` | `StrRef` |  | `nuspace.shapes.Worker.run` |
| `handle` | `ref` | `StrRef` |  | `nuspace.shapes.Worker.handle` |
| `started_at` | `ref` | `FloatRef` |  | `nuspace.shapes.Worker.started_at` |
| `terminated_at` | `ref` | `FloatRef` |  | `nuspace.shapes.Worker.terminated_at` |
| `exit` | `ref` | `StrRef` |  | `nuspace.shapes.Worker.exit` |
| `error` | `ref` | `StrRef` |  | `nuspace.shapes.Worker.error` |

Undocumented: example.

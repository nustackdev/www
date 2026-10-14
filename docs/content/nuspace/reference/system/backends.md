---
title: backends
description: "Backends: what executes plane runs. Polymorphic fabrics the kernel never looks inside."
---

Module `nuspace.system.backends`.

Backends: what executes plane runs. Polymorphic fabrics the kernel never looks inside.

A plane names its backend (`props.backend`), a plane run records it, and
the kernel reaches it by that name through `BackendRef`. A new
backend is a `Backend` subclass registered by name at open,
with no kernel edit.

- `base`: the fabric, its ref, its interactions, and the worker
  records every backend writes through them.
- `pool`: the books both process backends keep over `nustd.mp_pool`.
- `async_`: `async`, one worker per plane run.
- `mp`: `mp`, one worker per cell run.

## base

Module `nuspace.system.backends.base`.

The backend fabric: what every backend is, how the kernel reaches one, what it records.

A backend executes plane runs. Each is a fabric, one instance per name,
bound on the host's context at open under `Backend` tagged with its
name. The kernel reads one with `BackendRef(name)`, the name off the plane
run's record, and speaks to it only through the interactions here, so it
never asks what kind it holds:

```python
StartRun(ref, run)             a plane run begins            -> made
PlaceCell(ref, run, cr)        where a cell run goes          -> [worker, made]
RunCell (kernel)               its body run there, to its end -> "" or why it was lost
EndCell(ref, run, cr)          a cell run is over             -> [worker let go]
KillRun(ref, run)              the plane run is over          -> [worker let go]
```

`made` is `[[worker, handle], ...]`, the workers a call brought up. A
worker is whatever unit the backend runs cells on (a process here, anything
later), its `handle` a str only the backend reads.

Workers are records the backends write and everybody reads (`start`,
`placed`, `lost`, `end_cell`, `kill`): the terms here
pair each interaction with its record writes, so no backend is ever half
recorded. The kernel only composes `released` into the commit that
ends a plane run, so its workers end with it, and `ended` into
reconcile's, for what a gone host left up.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [EndCell](#endcell) | `scalar_action` | `EndCell(backend, run_id, cell_run_id)` | `aend_cell`. Yields the workers let go. Shielded. |
| [KillRun](#killrun) | `scalar_action` | `KillRun(backend, run_id)` | `akill`. Yields the workers let go. Shielded. |
| [PlaceCell](#placecell) | `scalar_action` | `PlaceCell(backend, run_id, cell_run_id)` | `aplace`. Yields `[worker, made]`. |
| [StartRun](#startrun) | `scalar_action` | `StartRun(backend, run_id)` | `astart`. Yields the workers brought up. |
| [BackendRef](#backendref) | `ref` | `BackendRef(name)` | The `Backend` bound under `name` on the context. |
| [end_cell](#end_cell) |  | `backends.end_cell(backend, run_id, cell_run_id, exit_)` | `EndCell`, and the workers it let go recorded ended `exit_`. |
| [ended](#ended) |  | `backends.ended(worker_id, exit_, error='')` | A worker's end, written once, and out of `workers_running`. No bracket. |
| [kill](#kill) |  | `backends.kill(backend, run_id, exit_)` | `KillRun`, and the workers it let go recorded ended `exit_`. |
| [lost](#lost) |  | `backends.lost(worker_id, why)` | A worker that died by itself, recorded ended `failed` with why. No bracket. |
| [placed](#placed) |  | `backends.placed(backend, run_id, cell_run_id, place)` | The cell run's `worker` and the workers `place` brought up, recorded. One commit. |
| [released](#released) |  | `backends.released(run_id, exit_)` | Every live worker of a plane run ended `exit_`. No bracket. |
| [require_backend](#require_backend) |  | `backends.require_backend(value)` | Unwrap a `BackendRef`'s value. |
| [start](#start) |  | `backends.start(backend, run_id)` | `StartRun`, and the workers it brought up recorded. One commit for the records. |

### EndCell

`aend_cell`. Yields the workers let go. Shielded.

```python
EndCell(backend, run_id, cell_run_id)
```

Path `nuspace.system.backends.EndCell`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`. Arity 3 (3 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `backend` | `nu.Nu` |  |  |
| `run_id` | `nu.StrArg` |  |  |
| `cell_run_id` | `nu.StrArg` |  |  |

Undocumented: yields, example.

### KillRun

`akill`. Yields the workers let go. Shielded.

```python
KillRun(backend, run_id)
```

Path `nuspace.system.backends.KillRun`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `backend` | `nu.Nu` |  |  |
| `run_id` | `nu.StrArg` |  |  |

Undocumented: yields, example.

### PlaceCell

`aplace`. Yields `[worker, made]`.

```python
PlaceCell(backend, run_id, cell_run_id)
```

Path `nuspace.system.backends.PlaceCell`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`. Arity 3 (3 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `backend` | `nu.Nu` |  |  |
| `run_id` | `nu.StrArg` |  |  |
| `cell_run_id` | `nu.StrArg` |  |  |

Undocumented: yields, example.

### StartRun

`astart`. Yields the workers brought up.

```python
StartRun(backend, run_id)
```

Path `nuspace.system.backends.StartRun`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `backend` | `nu.Nu` |  |  |
| `run_id` | `nu.StrArg` |  |  |

Undocumented: yields, example.

### BackendRef

The `Backend` bound under `name` on the context.

```python
BackendRef(name)
```

Path `nuspace.system.backends.BackendRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Where none is, it yields a stand-in carrying the name, which every
interaction refuses with `UnknownBackendError` naming it.

**Methods**

#### `.fabric()`

What executes plane runs. Subclass it, register the subclass by name at open.

Every method is async and runs in the host. Worker ids are minted by the
backend (`mint_ordered_id("w")`), and each method says which workers
it brought up or let go, so the record writes around it stay generic.

A backend's bookkeeping (its handles, which cell run is where) is its
own. The kernel keeps none of it.

Undocumented: yields, example.

**Inherited methods**

From `nu.context.fabric.refs.FabricRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Bool` | Whether this Ref's fabric type is bound on the Context, as a `Bool`. |

Undocumented: example.

### end_cell

`EndCell`, and the workers it let go recorded ended `exit_`.

```python
backends.end_cell(backend, run_id, cell_run_id, exit_)
```

Path `nuspace.system.backends.end_cell`. Defined on `nuspace.system.backends.base`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `backend` | `nu.StrArg` |  |  |
| `run_id` | `nu.StrArg` |  |  |
| `cell_run_id` | `nu.StrArg` |  |  |
| `exit_` | `nu.StrArg` |  |  |

Undocumented: example.

### ended

A worker's end, written once, and out of `workers_running`. No bracket.

```python
backends.ended(worker_id, exit_, error='')
```

Path `nuspace.system.backends.ended`. Defined on `nuspace.system.backends.base`, bound as a function. Builds `nu.Nu`.

Out of both: its run's and the kernel's, in the same commit.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `worker_id` | `nu.StrArg` |  |  |
| `exit_` | `nu.StrArg` |  |  |
| `error` | `nu.StrArg` | `''` |  |

Undocumented: example.

### kill

`KillRun`, and the workers it let go recorded ended `exit_`.

```python
backends.kill(backend, run_id, exit_)
```

Path `nuspace.system.backends.kill`. Defined on `nuspace.system.backends.base`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `backend` | `nu.StrArg` |  |  |
| `run_id` | `nu.StrArg` |  |  |
| `exit_` | `nu.StrArg` |  |  |

Undocumented: example.

### lost

A worker that died by itself, recorded ended `failed` with why. No bracket.

```python
backends.lost(worker_id, why)
```

Path `nuspace.system.backends.lost`. Defined on `nuspace.system.backends.base`, bound as a function. Builds `nu.Nu`.

For the commit that ends the cell run it took with it (`RunCell`
yielded `why`). Written once: with `async`, every cell run on the
worker reports the same death, and the first one writes it.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `worker_id` | `nu.StrArg` |  |  |
| `why` | `nu.StrArg` |  |  |

Undocumented: example.

### placed

The cell run's `worker` and the workers `place` brought up, recorded. One commit.

```python
backends.placed(backend, run_id, cell_run_id, place)
```

Path `nuspace.system.backends.placed`. Defined on `nuspace.system.backends.base`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `backend` | `nu.StrArg` |  | The backend's registered name. |
| `run_id` | `nu.StrArg` |  | The plane run. |
| `cell_run_id` | `nu.StrArg` |  | The cell run placed. |
| `place` | `nu.Nu` |  | `[worker, made]`, what `PlaceCell` yielded. |

Undocumented: example.

### released

Every live worker of a plane run ended `exit_`. No bracket.

```python
backends.released(run_id, exit_)
```

Path `nuspace.system.backends.released`. Defined on `nuspace.system.backends.base`, bound as a function. Builds `nu.Nu`.

For the commit that ends the run: its workers' records end with it, so
nothing is left to write once the kernel lets go of the run, however it
is cancelled. The backend's own kill follows, and finds them ended.

Walks the run's `workers_running`, its live workers, never its
`workers`: with `mp` that is a worker per cell run ever.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `run_id` | `nu.StrArg` |  |  |
| `exit_` | `nu.StrArg` |  |  |

Undocumented: example.

### require_backend

Unwrap a `BackendRef`'s value.

```python
backends.require_backend(value)
```

Path `nuspace.system.backends.require_backend`. Defined on `nuspace.system.backends.base`, bound as a function. Builds `Backend`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `object` |  |  |

Undocumented: example.

### start

`StartRun`, and the workers it brought up recorded. One commit for the records.

```python
backends.start(backend, run_id)
```

Path `nuspace.system.backends.start`. Defined on `nuspace.system.backends.base`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `backend` | `nu.StrArg` |  |  |
| `run_id` | `nu.StrArg` |  |  |

Undocumented: example.

## nuspace.system.backends

Module `nuspace.system.backends`.

Backends: what executes plane runs. Polymorphic fabrics the kernel never looks inside.

A plane names its backend (`props.backend`), a plane run records it, and
the kernel reaches it by that name through `BackendRef`. A new
backend is a `Backend` subclass registered by name at open,
with no kernel edit.

- `base`: the fabric, its ref, its interactions, and the worker
  records every backend writes through them.
- `pool`: the books both process backends keep over `nustd.mp_pool`.
- `async_`: `async`, one worker per plane run.
- `mp`: `mp`, one worker per cell run.

| Name | Call | Meaning |
| --- | --- | --- |
| [provided](#provided) | `backends.provided(backends=None)` | Every backend bound on the context under its name: `BACKENDS`, then `backends`. |

### provided

Every backend bound on the context under its name: `BACKENDS`, then `backends`.

```python
backends.provided(backends=None)
```

Path `nuspace.system.backends.provided`. Defined on `nuspace.system.backends`, bound as a function. Builds `nu.With`.

Goes inside the pool and its shelf, which the process backends take from.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `backends` | `Mapping[str, type[Backend]] \| None` | `None` | Backend classes by name, on top of the built in ones. |

Undocumented: example.

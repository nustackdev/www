---
title: runs
description: "The run fold: one arm per plane run in `running`, in the host, where the backends are."
---

Module `nuspace.system.kernel.runs`.

The run fold: one arm per plane run in `running`, in the host, where the backends are.

An arm makes its plane run true, and ends it:

```python
backend start, started_at               a failure ends the run failed
then race
  (a) watch termination_requested: the run and its live cell runs end
      killed, then the backend kills
  (b) fold over cells_running: each new cell run placed and run by the
      backend until its body ends; one leaving it has its body
      cancelled and the backend let go of what it held
  (c) cells_running empty: the run ends, its exit read off each cell's
      newest cell run (``latest``)
finally: backend kill, whatever it still holds let go
```

A cell run's arm lives exactly as long as its body: the backend's run
returns when the body has ended, and says why when the worker died under
it, which ends the cell run `failed` here. With `async` one death fails
every cell run on the worker, with `mp` the one.

The arm never asks what backend it holds: every call goes through
`backends` by the name on the record. Ending is a write
of `terminated_at` and `exit` plus a delete from the index, in one
commit; the fold sees the run leave `running` and cancels the arm.

| Name | Call | Meaning |
| --- | --- | --- |
| [end_run](#end_run) | `kernel.end_run(run_id, exit_, error=None)` | A plane run's end: its live cell runs ended `exit_`, then its own, out of the live indexes. No bracket. |
| [outcome](#outcome) | `kernel.outcome(run_id)` | A plane run's exit, read off each cell's newest cell run (`latest`). Bare read. |
| [run_arm](#run_arm) | `kernel.run_arm(run_id)` | One plane run's whole life in the host. Ends only by the fold cancelling it. |
| [run_fold](#run_fold) | `kernel.run_fold()` | `run_arm` for every plane run in `running`, births and deaths included. |

## end_run

A plane run's end: its live cell runs ended `exit_`, then its own, out of the live indexes. No bracket.

```python
kernel.end_run(run_id, exit_, error=None)
```

Path `nuspace.system.kernel.end_run`. Defined on `nuspace.system.kernel.runs`, bound as a function. Builds `nu.Nu`.

Its live workers' records end in the same commit, `killed` with a
killed run and `ok` otherwise (`released`).
Written once: a run already ended keeps the end it has.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `run_id` | `nu.StrArg` |  |  |
| `exit_` | `nu.StrArg` |  |  |
| `error` | `nu.StrArg \| None` | `None` |  |

Undocumented: example.

## outcome

A plane run's exit, read off each cell's newest cell run (`latest`). Bare read.

```python
kernel.outcome(run_id)
```

Path `nuspace.system.kernel.outcome`. Defined on `nuspace.system.kernel.runs`, bound as a function. Builds `nu.Str`.

`failed` if any failed, else `ok` if any returned, else
`interrupted` if any was, else `ok` (a plane with no cells). A cell
run superseded by a reload or a restart does not count. One pass over
the run's cells, never its history, once, as it ends.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `run_id` | `nu.StrArg` |  |  |

Undocumented: example.

## run_arm

One plane run's whole life in the host. Ends only by the fold cancelling it.

```python
kernel.run_arm(run_id)
```

Path `nuspace.system.kernel.run_arm`. Defined on `nuspace.system.kernel.runs`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `run_id` | `nu.StrArg` |  |  |

Undocumented: example.

## run_fold

`run_arm` for every plane run in `running`, births and deaths included.

```python
kernel.run_fold()
```

Path `nuspace.system.kernel.run_fold`. Defined on `nuspace.system.kernel.runs`, bound as a function. Builds `nu.Nu`.

The index must exist before this subscribes (reconcile makes it).

Undocumented: example.

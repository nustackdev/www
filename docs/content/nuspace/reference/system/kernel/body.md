---
title: body
description: "The body of one cell run: built in the host, handed to a backend, run on a worker."
---

Module `nuspace.system.kernel.body`.

The body of one cell run: built in the host, handed to a backend, run on a worker.

Everything a cell run is, as one Nu term with its ids baked in as plain strs:

```python
Frame(Here: plane, cell, run, cell run ids)
  With(Captured)                       out, attributed to this cell run
    TryCatch(                          raised: exit failed, error, traceback
      envs' wraps, space-wide outermost
        mark started
        Race(program, interrupt watch, out flusher)
        exit ok, or interrupted when the watch won
    the end: out, exit, terminated_at, out of cells_running
```

The program is loaded on the worker from the store, so a cell run always
runs the prog as it is now. Its term is rewritten on the way in: reroot
first, then each env's rewrite. Nothing brackets it: a program opens its own
short bracket per store around each store access (D23), the way every op
does. The kernel's own reads and record writes are short brackets of their
own, never held open while the program runs.

Interrupt is cooperative and backend agnostic: the body watches its own
`interrupt_requested` and leaves when it reads true, so every backend gets
it for free. Kill is a plane op, the backend's.

| Name | Call | Meaning |
| --- | --- | --- |
| [build_body](#build_body) | `kernel.build_body(run_id, cell_run_id, plane, cell, envs=())` | One cell run's whole life on its worker, as a term to run there. |
| [end_cell_run](#end_cell_run) | `kernel.end_cell_run(run_id, cell_run_id, exit_, error=None, out=None)` | A cell run's end: `exit`, `error`, `terminated_at`, out of `cells_running`. No bracket. |

## build_body

One cell run's whole life on its worker, as a term to run there.

```python
kernel.build_body(run_id, cell_run_id, plane, cell, envs=())
```

Path `nuspace.system.kernel.build_body`. Defined on `nuspace.system.kernel.body`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `run_id` | `str` |  | The plane run's store id. |
| `cell_run_id` | `str` |  | The cell run's store id. |
| `plane` | `str` |  | The plane id. |
| `cell` | `str` |  | The cell id. |
| `envs` | `Sequence[Env]` | `()` | Resolved envs, outermost first. Their wraps are applied here, in the host, their rewrites ride along onto the worker. |

Undocumented: example.

## end_cell_run

A cell run's end: `exit`, `error`, `terminated_at`, out of `cells_running`. No bracket.

```python
kernel.end_cell_run(run_id, cell_run_id, exit_, error=None, out=None)
```

Path `nuspace.system.kernel.end_cell_run`. Defined on `nuspace.system.kernel.body`, bound as a function. Builds `nu.Nu`.

Written once: a cell run already ended keeps the end it has. Shared by
the body, which ends its own, and the kernel, which ends the ones whose
worker died or whose plane run was killed.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `run_id` | `nu.StrArg` |  | The plane run. |
| `cell_run_id` | `nu.StrArg` |  | The cell run. |
| `exit_` | `nu.StrArg` |  | How it ended, one of `EXITS`. |
| `error` | `nu.StrArg \| None` | `None` | Why, when there is something to say. |
| `out` | `nu.Nu \| None` | `None` | What `out` is set to, when the writer has it. |

Undocumented: example.

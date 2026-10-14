---
title: kernel
description: "The kernel: runs, interrupts and kills plane runs, runs and interrupts cell runs, records them."
---

Module `nuspace.system.kernel`.

The kernel: runs, interrupts and kills plane runs, runs and interrupts cell runs, records them.

Headless and in the host, where the backends are. The ops write intents to
the store (D1); the kernel reads them and makes them true through the
backends (`backends`), never asking which kind:

- `space`: the brackets a space opens in, and `open_kernel`.
- `envs`: named env factories, resolved per cell run in the host.
- `body`: one cell run's life on its worker.
- `out`: a cell run's stdout and stderr, captured per cell run.
- `dispatch`: a cell run's body built and run by its backend, to its end.
- `runs`: the fold over live plane runs.
- `reconcile`: at open, leftovers ended killed.
- `kernel`: all of it as one term.

## dispatch

Module `nuspace.system.kernel.dispatch`.

Running a cell run: its record read, its envs built, its body run by the backend to its end.

[Full entries](/docs/nuspace/reference/system/kernel/dispatch)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [RunCell](/docs/nuspace/reference/system/kernel/dispatch#runcell) | `scalar_action` | `RunCell(backend, run_id, cell_run_id)` | Run cell run `cell_run_id`'s body on the plane run's backend. Returns once it has ended. |

## envs

Module `nuspace.system.kernel.envs`.

Envs: what a run executes inside, built in the host from names.

[Full entries](/docs/nuspace/reference/system/kernel/envs)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [KernelConfigRef](/docs/nuspace/reference/system/kernel/envs#kernelconfigref) | `ref` | `KernelConfigRef(address=None)` | The `KernelConfig` bound on the context. EMPTY when none is. |

## collections.abc

Module `collections.abc`.

[Full entries](/docs/nuspace/reference/system/kernel/collections-abc)

| Name | Call | Meaning |
| --- | --- | --- |
| [EnvFactory](/docs/nuspace/reference/system/kernel/collections-abc#envfactory) | `kernel.EnvFactory()` |  |

## body

Module `nuspace.system.kernel.body`.

The body of one cell run: built in the host, handed to a backend, run on a worker.

[Full entries](/docs/nuspace/reference/system/kernel/body)

| Name | Call | Meaning |
| --- | --- | --- |
| [build_body](/docs/nuspace/reference/system/kernel/body#build_body) | `kernel.build_body(run_id, cell_run_id, plane, cell, envs=())` | One cell run's whole life on its worker, as a term to run there. |
| [end_cell_run](/docs/nuspace/reference/system/kernel/body#end_cell_run) | `kernel.end_cell_run(run_id, cell_run_id, exit_, error=None, out=None)` | A cell run's end: `exit`, `error`, `terminated_at`, out of `cells_running`. No bracket. |

## runs

Module `nuspace.system.kernel.runs`.

The run fold: one arm per plane run in `running`, in the host, where the backends are.

[Full entries](/docs/nuspace/reference/system/kernel/runs)

| Name | Call | Meaning |
| --- | --- | --- |
| [end_run](/docs/nuspace/reference/system/kernel/runs#end_run) | `kernel.end_run(run_id, exit_, error=None)` | A plane run's end: its live cell runs ended `exit_`, then its own, out of the live indexes. No bracket. |
| [outcome](/docs/nuspace/reference/system/kernel/runs#outcome) | `kernel.outcome(run_id)` | A plane run's exit, read off each cell's newest cell run (`latest`). Bare read. |
| [run_arm](/docs/nuspace/reference/system/kernel/runs#run_arm) | `kernel.run_arm(run_id)` | One plane run's whole life in the host. Ends only by the fold cancelling it. |
| [run_fold](/docs/nuspace/reference/system/kernel/runs#run_fold) | `kernel.run_fold()` | `run_arm` for every plane run in `running`, births and deaths included. |

## kernel

Module `nuspace.system.kernel.kernel`.

The kernel term: reconcile, then the run fold and pid 1.

[Full entries](/docs/nuspace/reference/system/kernel/kernel)

| Name | Call | Meaning |
| --- | --- | --- |
| [init_start](/docs/nuspace/reference/system/kernel/kernel#init_start) | `kernel.init_start(plane_id)` | Run `plane_id`, if the plane exists. pid 1. |
| [kernel](/docs/nuspace/reference/system/kernel/kernel#kernel) | `kernel.kernel(init=None)` | The whole kernel: reconcile, then `kernel_loop`. Never returns. |
| [kernel_loop](/docs/nuspace/reference/system/kernel/kernel#kernel_loop) | `kernel.kernel_loop(init=None)` | The run fold, and `init` run beside it. |

## space

Module `nuspace.system.kernel.space`.

The brackets a space is opened in: store, pool, spares, backends.

[Full entries](/docs/nuspace/reference/system/kernel/space)

| Name | Call | Meaning |
| --- | --- | --- |
| [navigator](/docs/nuspace/reference/system/kernel/space#navigator) | `kernel.navigator(path)` | Both stores in `path`, as any process opens them: Space, then States. |
| [open_kernel](/docs/nuspace/reference/system/kernel/space#open_kernel) | `kernel.open_kernel(body, path=None, spares=2, envs=None, space_envs=(), backends=None, init=None, name='nuspace')` | A space open in this process, the kernel running beside `body`. |
| [space_dir](/docs/nuspace/reference/system/kernel/space#space_dir) | `kernel.space_dir(path)` | `path` made absolute, refused if it holds a store of the old RocksDB layout. |
| [store](/docs/nuspace/reference/system/kernel/space#store) | `kernel.store(path=None)` | The space's stores as their owner opens them: the notification server, then `navigator`. |
| [worker_context](/docs/nuspace/reference/system/kernel/space#worker_context) | `kernel.worker_context(path)` | What every worker comes up holding. Pickled to the child, entered there. |
| [worker_pool](/docs/nuspace/reference/system/kernel/space#worker_pool) | `kernel.worker_pool(path, name='nuspace')` | The fleet, every worker holding `worker_context`. Closing kills them all. |

## reconcile

Module `nuspace.system.kernel.reconcile`.

Reconcile: at open, everything the last open left live has ended, killed.

[Full entries](/docs/nuspace/reference/system/kernel/reconcile)

| Name | Call | Meaning |
| --- | --- | --- |
| [reconcile](/docs/nuspace/reference/system/kernel/reconcile#reconcile) | `kernel.reconcile()` | End every live plane run and worker `killed`, empty the indexes. One commit. |

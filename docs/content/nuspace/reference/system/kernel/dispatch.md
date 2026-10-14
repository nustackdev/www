---
title: dispatch
description: "Running a cell run: its record read, its envs built, its body run by the backend to its end."
---

Module `nuspace.system.kernel.dispatch`.

Running a cell run: its record read, its envs built, its body run by the backend to its end.

The one place a cell run crosses into a backend. It happens in the host,
because the host holds the backends and the env factories: specs are
resolved here (D2), the wraps applied here, and what crosses is plain Nu.
Where it lands was decided before, by the backend's `place`.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [RunCell](#runcell) | `scalar_action` | `RunCell(backend, run_id, cell_run_id)` | Run cell run `cell_run_id`'s body on the plane run's backend. Returns once it has ended. |

## RunCell

Run cell run `cell_run_id`'s body on the plane run's backend. Returns once it has ended.

```python
RunCell(backend, run_id, cell_run_id)
```

Path `nuspace.system.kernel.RunCell`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`. Arity 3 (3 required).

Reads the plane run's plane and env specs and the cell run's cell
through a snapshot, resolves the specs through the
`KernelConfig` on the context (none bound resolves
nothing but refuses any spec), builds the body with
`build_body` and awaits it through the backend's
`arun`. Cancelled, the backend
cancels the body where it runs.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `backend` | `nu.StrArg` |  | The backend's registered name, any `StrArg`. |
| `run_id` | `nu.StrArg` |  | The plane run's store id. |
| `cell_run_id` | `nu.StrArg` |  | The cell run's store id, placed already. |

**Yields**

`""` when the body ran to its end, or why its worker was lost.

Undocumented: example.

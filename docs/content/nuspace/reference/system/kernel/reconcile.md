---
title: reconcile
description: "Reconcile: at open, everything the last open left live has ended, killed."
---

Module `nuspace.system.kernel.reconcile`.

Reconcile: at open, everything the last open left live has ended, killed.

A plane run in `running` or a worker in `workers_running` belongs to a
process that is gone, since workers die with the host. Ending each
`killed`, its live cell runs with it, makes the records true again before
anything else reads them, the narrower indexes (by plane, by run) emptied
with them. Only the indexes are walked, never history. It also makes the
kernel's containers real, since a fold subscribing to a container that is
not there never hears anything.

| Name | Call | Meaning |
| --- | --- | --- |
| [reconcile](#reconcile) | `kernel.reconcile()` | End every live plane run and worker `killed`, empty the indexes. One commit. |

## reconcile

End every live plane run and worker `killed`, empty the indexes. One commit.

```python
kernel.reconcile()
```

Path `nuspace.system.kernel.reconcile`. Defined on `nuspace.system.kernel.reconcile`, bound as a function. Builds `nu.Nu`.

Undocumented: example.

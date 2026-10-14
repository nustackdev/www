---
title: kernel
description: "The kernel term: reconcile, then the run fold and pid 1."
---

Module `nuspace.system.kernel.kernel`.

The kernel term: reconcile, then the run fold and pid 1.

Everything the kernel does is in the host, reading the intents the ops
wrote (D1) and making them true through the backends. Nothing else runs
cells.

| Name | Call | Meaning |
| --- | --- | --- |
| [init_start](#init_start) | `kernel.init_start(plane_id)` | Run `plane_id`, if the plane exists. pid 1. |
| [kernel](#kernel) | `kernel.kernel(init=None)` | The whole kernel: reconcile, then `kernel_loop`. Never returns. |
| [kernel_loop](#kernel_loop) | `kernel.kernel_loop(init=None)` | The run fold, and `init` run beside it. |

## init_start

Run `plane_id`, if the plane exists. pid 1.

```python
kernel.init_start(plane_id)
```

Path `nuspace.system.kernel.init_start`. Defined on `nuspace.system.kernel.kernel`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `str` |  |  |

Undocumented: example.

## kernel

The whole kernel: reconcile, then `kernel_loop`. Never returns.

```python
kernel.kernel(init=None)
```

Path `nuspace.system.kernel.kernel`. Defined on `nuspace.system.kernel.kernel`, bound as a function. Builds `nu.Nu`.

Needs the brackets of `open_kernel` around it: the store,
the pool, spares, the backends, and a `KernelConfig`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `init` | `str \| None` | `None` | A plane to run once reconciled. Skipped if it does not exist. |

Undocumented: example.

## kernel_loop

The run fold, and `init` run beside it.

```python
kernel.kernel_loop(init=None)
```

Path `nuspace.system.kernel.kernel_loop`. Defined on `nuspace.system.kernel.kernel`, bound as a function. Builds `nu.Nu`.

Assumes reconciled. Never returns.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `init` | `str \| None` | `None` |  |

Undocumented: example.

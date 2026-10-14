---
title: system
description: "Layer two: the system, built from ops."
---

Module `nuspace.system`.

Layer two: the system, built from ops.

- `kernel`: starts, stops, records and reaps runs.
- `services`: init, nav, supervisor, reload, reactions, as cells.
- `home`: the home plane `/` redirects to, seeded at open.
- `settings`: the space's settings plane, seeded at open.
- `search`: searches as planes, and the plane that shows them.

Devices come next, on top of the same ops.

**Modules**

| Module | What |
| --- | --- |
| [`nuspace.system.backends`](/docs/nuspace/reference/system/backends) | Backends: what executes plane runs. Polymorphic fabrics the kernel never looks inside. |
| [`nuspace.system.devices`](/docs/nuspace/reference/system/devices) | Devices: each owns an external resource and makes it bindable. Never runs cells. |
| [`nuspace.system.kernel`](/docs/nuspace/reference/system/kernel) | The kernel: runs, interrupts and kills plane runs, runs and interrupts cell runs, records them. |
| [`nuspace.system.services`](/docs/nuspace/reference/system/services) | Services: the system's policy, as cells on workers (D20). |

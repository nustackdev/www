---
title: nuspace.shapes.state
description: "Program declared state: the two bases a cell's shapes say whose they are by."
---

Module `nuspace.shapes.state`.

Program declared state: the two bases a cell's shapes say whose they are by.

A program names its state as if it were alone:

```python
class Tick(CellState):
    n = nustd.kv.IntRef.slot()

def out():
    return Tick.n.set(Tick.n + 1)
```

`Tick.n` resolves bare, at `("n",)`, under a root shape nobody binds. The
kernel reroots it at load (`reroot`), so it lands in the
state store (`states`) under the cell that runs it, and
neither store ever learns a program's classes. The
base is the whole address: which one a shape subclasses is the only thing
the rerooter asks.

| Name | Call | Meaning |
| --- | --- | --- |
| [CellState](#cellstate) |  | Base for state owned by one cell. Lands at `States.cells[c]`. |
| [PlaneState](#planestate) |  | Base for state shared by a plane's cells. Lands at `States.planes[p].state`. |

## CellState

Base for state owned by one cell. Lands at `States.cells[c]`.

Path `nuspace.ops.CellState`.

Only the cell's own program writes it. Persistent and shared by every run
of the cell, so a restart picks up where the last run left off.

Undocumented: example.

## PlaneState

Base for state shared by a plane's cells. Lands at `States.planes[p].state`.

Path `nuspace.ops.PlaneState`.

Where siblings meet: every cell of the plane that declares the same shape
reads and writes the same slots.

Undocumented: example.

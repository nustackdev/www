---
title: refs.containers.grid
description: "`GridRef` -- children in equal cells, row after row."
---

Module `nustd.ui.refs.containers.grid`.

`GridRef` -- children in equal cells, row after row.

A flow container, Column and Row's sibling. Every child is one cell, every
cell has the same width, and the width of the page decides how many fit on
a row: a dashboard of stat cards, a gallery, a wall of charts. A child says
nothing about its cell; the grid sizes them all.

- `columns=0` puts as many columns on a row as fit at `min_width`.
- `columns=N` puts at most N, never narrower than `min_width`, so the
  same grid is three wide on a desktop and stacks on a phone.

Declared, as a Shape:

    class Stats(Grid):
        users = CardRef.slot(title="Users")
        jobs = CardRef.slot(title="Jobs")
        errors = CardRef.slot(title="Errors")

    stats = Stats.slot(columns=3)

Or as Refs alone, with computed keys for as many cells as there are items:

    grid = GridRef("g", parent_ref=page_column, props={"min_width": 200})
    card = CardRef(nu.Str("c") + nu.str(i), parent_ref=grid)
    StatRef("s", parent_ref=card).set(value)

The Shape over it lives in `nustd.ui.shapes.grid`.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [GridRef](#gridref) | `ref` | `GridRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Equal cells, one child per cell, as many per row as the width allows. |

## GridRef

Equal cells, one child per cell, as many per row as the width allows.

```python
GridRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.GridRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`columns` caps the cells on a row (0: no cap, the width decides),
`min_width` is the narrowest a cell gets in px, `gap` and `padding` are
steps on the spacing ladder. `align` places each child in its cell
along the row: "stretch" gives every cell on a row the height of the
tallest, so a row of cards lines up. Pin chrome on slot().

**Methods**

### `.set_columns(n)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `n` | `IntArg` |  |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.refs.containers.base.DictContainerRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `Ref` |  |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

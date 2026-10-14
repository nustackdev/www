---
title: refs.containers.flow
description: "Flow containers -- Refs that lay their children out and carry nothing else."
---

Module `nustd.ui.refs.containers.flow`.

Flow containers -- Refs that lay their children out and carry nothing else.

Column stacks its children, Row puts them side by side. Neither has chrome
of its own beyond spacing and alignment, so neither has a `set()`: what
you write to is the children. The Shapes over them live in
`nustd.ui.shapes.flow`.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ColumnRef](#columnref) | `ref` | `ColumnRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Vertical flex layout. Pin chrome on the slot(). |
| [RowRef](#rowref) | `ref` | `RowRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Horizontal flex layout. Pin chrome on slot(). |

## ColumnRef

Vertical flex layout. Pin chrome on the slot().

```python
ColumnRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.ColumnRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

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

## RowRef

Horizontal flex layout. Pin chrome on slot().

```python
RowRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.RowRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

How a child sizes comes from its kind, not from a prop on it. A child with
no width of its own (a chart, a table, an input, a card) fills: the fill
children share the free width equally. Everything else (text, a button, a
badge) keeps its own size. `min_width` (px, on the 4px grid) is the
width a fill child asks for before it grows: a wrapping Row wraps fill
children at it, several per line rather than one per line, and a Row that
does not wrap shrinks them below it only once the line is full.

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

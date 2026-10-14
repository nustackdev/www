---
title: refs.containers.base
description: "`ContainerRef` -- the base every layout container Ref builds on."
---

Module `nustd.ui.refs.containers.base`.

`ContainerRef` -- the base every layout container Ref builds on.

Layer 1. A container Ref is a whole container on its own: it needs no Shape
to draw, to carry chrome or to hold children.

- **Children** come from `parent_ref=`: `TextRef("t", parent_ref=row)`
  puts a text in `row`. Navigating a Shape whose `_ref_cls` is this Ref
  (`page.toolbar.text`) reaches the same place by way of its slots.
- **Repetition is free.** The address is a term, so computed keys under one
  parent (`RowRef(nu.Str("r") + nu.str(i), parent_ref=col)`) are as many
  distinct children as there are keys, with nothing declared up front.
- **Props** ride `props=` on the constructor, or `slot(**props)` when the
  Ref is declared on a Shape; both go through this class's own `slot()`,
  so the defaults and normalization live here and nowhere else.
- **No `set()`** unless one chrome value is the thing the container
  carries (Modal: open). The rest of its chrome is `set_*`. `ListRef`
  keeps its old string `set(items)` for compatibility.
- **How it holds children** is the container's kind, one per class, the way
  kv has `ShapeRef`, `DictRef` and `ListRef`. A `DictContainerRef`
  takes children by key, a `ListContainerRef` by index, and a
  `ShapeContainerRef` only the ones its Shape declares. The first two may
  carry an item template, `slot(Item)` or `item=Item`, and `ref[key]`
  answers with an `Item` there, the way `DictRef.slot(Order)` answers
  `desks["d1"]` with an Order. Declared slots are keys too, so named and
  templated children mix. There are no collection ops: a UI child is a
  component, not a value, so the kind only says how a child is reached.

The parent's flow decides how a child displays: the same Badge is a block in
a Column, a cell in a Grid and a run of text in a Line. A child never says.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ContainerRef](#containerref) | `ref` | `ContainerRef(address, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Base for container Refs: open-ended children, optional chrome. Abstract. |
| [DictContainerRef](#dictcontainerref) | `ref` | `DictContainerRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | A container that takes its children by key. Abstract. |
| [ListContainerRef](#listcontainerref) | `ref` | `ListContainerRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | A container that takes its children by position. Abstract. |
| [ShapeContainerRef](#shapecontainerref) | `ref` | `ShapeContainerRef(address, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | A container whose children are only the ones its Shape declares. Abstract. |

## ContainerRef

Base for container Refs: open-ended children, optional chrome. Abstract.

```python
ContainerRef(address, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.ContainerRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Something is a container only when its children are open-ended user
composition. Fixed known parts (a button's label and icon) are props on
a leaf instead.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## DictContainerRef

A container that takes its children by key. Abstract.

```python
DictContainerRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.DictContainerRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`ref[key]` is the item template's child at `key`. The key is a term
like any address, so a computed key works too.

**Methods**

### `a[key]`

Builds `Ref`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `object` |  |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## ListContainerRef

A container that takes its children by position. Abstract.

```python
ListContainerRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.ListContainerRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`ref[i]` is the item template's child at index `i`, an int or an
int term. The browser draws indexed children in index order.

**Methods**

### `a[key]`

Builds `Ref`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `index` | `object` |  |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## ShapeContainerRef

A container whose children are only the ones its Shape declares. Abstract.

```python
ShapeContainerRef(address, section_cls=None, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.ShapeContainerRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

It takes no item template and cannot be subscripted.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

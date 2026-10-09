---
title: refs.item
description: "ItemRef hierarchy: leaf Ref + Form mixin tiers."
---

Module `nu.domains.shape.refs.item`.

ItemRef hierarchy: leaf Ref + Form mixin tiers.

ItemRef         = ItemForm + StructuredRef
    MutableItemRef  = MutableItemForm + ItemRef
    ReactiveItemRef = ReactiveItemForm + MutableItemRef

A leaf Ref names a single typed value, no child descent.
The Form mixins provide the slot-level API:
    base:     exists(), missing()
    mutable:  + set(), erase()
    reactive: + on_change()

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ItemRef](#itemref) | `ref` | `ItemRef(address, parent_ref=None, owner_shape=None)` | Leaf Ref: single typed value, no child descent. |
| [MutableItemRef](#mutableitemref) | `ref` | `MutableItemRef(address, parent_ref=None, owner_shape=None)` | Mutable leaf Ref: single typed value with write/erase. |
| [ReactiveItemRef](#reactiveitemref) | `ref` | `ReactiveItemRef(address, parent_ref=None, owner_shape=None)` | Reactive leaf Ref: single typed value with observation. |

## ItemRef

Leaf Ref: single typed value, no child descent.

```python
ItemRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.ItemRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

API: exists(), missing() (from ItemForm).

**Inherited methods**

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

Undocumented: example.

## MutableItemRef

Mutable leaf Ref: single typed value with write/erase.

```python
MutableItemRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.MutableItemRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

API: exists(), missing(), set(v), erase() (from MutableItemForm).

**Inherited methods**

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(value)` | `SetCmd` | Build a `SetCmd`. |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

Undocumented: example.

## ReactiveItemRef

Reactive leaf Ref: single typed value with observation.

```python
ReactiveItemRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.ReactiveItemRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

API: exists(), missing(), set(v), erase(), on_change() (from ReactiveItemForm).

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(value)` | `SetCmd` | Build a `SetCmd`. |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

Undocumented: example.

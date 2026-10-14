---
title: item
description: "Leaf family: a single value in a shape fabric, with no descent below it."
---

Module `nu.domains.shape.item`.

Leaf family: a single value in a shape fabric, with no descent below it.

Forms give the slot-level surface (read, write, observe the one value); refs
bind that surface to an address. A fabric's leaves mix a value form in beside
these, so the ref itself is an operand of the value it names.

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

From `nu.domains.shape.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Bool` | Whether this slot holds a value, as a `Bool`. |
| `.missing()` | `Bool` | Whether this slot holds no value, as a `Bool`: the negation of `exists()`. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a == b` | `Bool` | Self equal to other by value: an `Eq` term, never a Python bool. |
| `a != b` | `Bool` | Self not equal to other by value: a `Ne` term, never a Python bool. |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

Undocumented: example.

## MutableItemRef

Mutable leaf Ref: single typed value with write/erase.

```python
MutableItemRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.MutableItemRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

API: exists(), missing(), set(v), erase() (from MutableItemForm).

**Inherited methods**

From `nu.domains.shape.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(value)` | `SetCmd` | Build a `SetCmd`. |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Bool` | Whether this slot holds a value, as a `Bool`. |
| `.missing()` | `Bool` | Whether this slot holds no value, as a `Bool`: the negation of `exists()`. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a == b` | `Bool` | Self equal to other by value: an `Eq` term, never a Python bool. |
| `a != b` | `Bool` | Self not equal to other by value: a `Ne` term, never a Python bool. |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

Undocumented: example.

## ReactiveItemRef

Reactive leaf Ref: single typed value with observation.

```python
ReactiveItemRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.ReactiveItemRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

API: exists(), missing(), set(v), erase(), on_change() (from ReactiveItemForm).

**Inherited methods**

From `nu.domains.shape.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

From `nu.domains.shape.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(value)` | `SetCmd` | Build a `SetCmd`. |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Bool` | Whether this slot holds a value, as a `Bool`. |
| `.missing()` | `Bool` | Whether this slot holds no value, as a `Bool`: the negation of `exists()`. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a == b` | `Bool` | Self equal to other by value: an `Eq` term, never a Python bool. |
| `a != b` | `Bool` | Self not equal to other by value: a `Ne` term, never a Python bool. |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

Undocumented: example.

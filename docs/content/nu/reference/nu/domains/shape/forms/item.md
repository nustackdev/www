---
title: item
description: "Item (leaf) shape-fabric Forms: three tiers."
---

Module `nu.domains.shape.forms.item`.

Item (leaf) shape-fabric Forms: three tiers.

Three tiers that compose into ItemRef / MutableItemRef / ReactiveItemRef:

    ItemForm          exists(), missing()
    MutableItemForm   + set(), erase()
    ReactiveItemForm  + on_change()

Pure Form mixins, no Ref or substrate knowledge. Composed into
the shape/refs/* blueprints so the user-facing API comes from these Forms.

No generic peer: the Item trunk is shape-specific (a leaf value in the
document model has no pure-Python collection equivalent).

- No generic type params (T, InterfaceT); Refs are unparameterised.
- No value_type / interface_cls properties; substrate concern, not Form.

| Name | Call | Meaning |
| --- | --- | --- |
| [ItemForm](#itemform) | `ItemForm()` | Slot-level read surface for a leaf value. Ops: `exists()`, `missing()`. |
| [MutableItemForm](#mutableitemform) | `MutableItemForm()` | Slot-level write surface. Adds `set(value)` and `erase()`. |
| [ReactiveItemForm](#reactiveitemform) | `ReactiveItemForm()` | Slot-level reactive surface. Adds `on_change()`. |

## ItemForm

Slot-level read surface for a leaf value. Ops: `exists()`, `missing()`.

```python
ItemForm()
```

Path `nu.domains.shape.forms.ItemForm`.

**Methods**

### `.exists()`

Build an `Exists` query.

Builds `Exists`.

Undocumented: example.

### `.missing()`

Build a `Missing` query.

Builds `Missing`.

Undocumented: example.

**Inherited methods**

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

From `builtins.object`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a < b` |  | Return self<value. |
| `a <= b` |  | Return self<=value. |
| `a == b` |  | Return self==value. |
| `a != b` |  | Return self!=value. |
| `a > b` |  | Return self>value. |
| `a >= b` |  | Return self>=value. |

Undocumented: example.

## MutableItemForm

Slot-level write surface. Adds `set(value)` and `erase()`.

```python
MutableItemForm()
```

Path `nu.domains.shape.forms.MutableItemForm`.

**Methods**

### `.set(value)`

Build a `SetCmd`.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `object` |  |  |

Undocumented: example.

### `.erase()`

Build an `Erase`.

Builds `Erase`.

Undocumented: example.

### `.init(value)`

Set `value` iff the leaf is currently missing.

Builds `IfDo`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `object` |  |  |

Undocumented: example.

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

From `builtins.object`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a < b` |  | Return self<value. |
| `a <= b` |  | Return self<=value. |
| `a == b` |  | Return self==value. |
| `a != b` |  | Return self!=value. |
| `a > b` |  | Return self>value. |
| `a >= b` |  | Return self>=value. |

Undocumented: example.

## ReactiveItemForm

Slot-level reactive surface. Adds `on_change()`.

```python
ReactiveItemForm()
```

Path `nu.domains.shape.forms.ReactiveItemForm`.

**Methods**

### `.on_change()`

Subscribe to changes on this leaf.

Builds `OnPrimitiveChange`.

A leaf yields a scalar, not a view, so the subscription happens on the
*parent* view's child-change channel keyed by this leaf's address.
`OnPrimitiveChange` carries only the leaf ref (self); at runtime
it calls `ref._afetch_parent` and `ref._aaddress` to resolve the
parent view and address, then returns
`parent.on_child_change(address)`: one uniform path across
substrates, no per-substrate override needed.

Undocumented: example.

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

From `builtins.object`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a < b` |  | Return self<value. |
| `a <= b` |  | Return self<=value. |
| `a == b` |  | Return self==value. |
| `a != b` |  | Return self!=value. |
| `a > b` |  | Return self>value. |
| `a >= b` |  | Return self>=value. |

Undocumented: example.

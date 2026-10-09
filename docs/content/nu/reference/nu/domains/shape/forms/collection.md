---
title: collection
description: "Shape-domain Collection Form chain."
---

Module `nu.domains.shape.forms.collection`.

Shape-domain Collection Form chain.

Pure Form mixins: no Ref or substrate knowledge. They sit BETWEEN
the generic collection forms and the concrete Refs, adding shape-domain ops
(existence checks, fabric-level set/erase, tree-aware observation) on top of
whatever generic collection surface the Ref already exposes.

`on_change()` (observe self) is deliberately absent here. It is generic and
lives on the generic `ReactiveXxxForm` tiers in `nu.forms.collections.abc`,
returning `nu.core.reactive.OnChange`. `ReactiveCollectionForm`
provides only the three tree-aware methods, which reach for the shape-tier
counterparts in `nu.core.reactive` too: one unified location for every
reactive query.

| Name | Call | Meaning |
| --- | --- | --- |
| [CollectionForm](#collectionform) | `CollectionForm()` | Shape collection Form. Ops: `exists()`, `missing()`, `extract()`. |
| [MutableCollectionForm](#mutablecollectionform) | `MutableCollectionForm()` | Mutable shape collection Form. Adds `set(value)` and `erase()`. |
| [ReactiveCollectionForm](#reactivecollectionform) | `ReactiveCollectionForm()` | Reactive shape collection Form. Adds tree-aware observation. |

## CollectionForm

Shape collection Form. Ops: `exists()`, `missing()`, `extract()`.

```python
CollectionForm()
```

Path `nu.domains.shape.forms.CollectionForm`.

**Methods**

### `.exists()`

Build an `Exists` query.

Builds `Exists`.

Undocumented: example.

### `.missing()`

Build a `Missing` query.

Builds `Missing`.

Undocumented: example.

### `.extract()`

Build an `Extract` query.

Builds `Extract`.

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

## MutableCollectionForm

Mutable shape collection Form. Adds `set(value)` and `erase()`.

```python
MutableCollectionForm()
```

Path `nu.domains.shape.forms.MutableCollectionForm`.

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

Set `value` iff the collection is currently missing.

Builds `IfDo`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `object` |  |  |

Undocumented: example.

**Inherited methods**

From `nu.domains.shape.forms.collection.CollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |
| `.extract()` | `Extract` | Build an `Extract` query. |

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

## ReactiveCollectionForm

Reactive shape collection Form. Adds tree-aware observation.

```python
ReactiveCollectionForm()
```

Path `nu.domains.shape.forms.ReactiveCollectionForm`.

`on_change()` (observe self) is intentionally absent. It is generic and
supplied by the generic `ReactiveXxxForm` tier via MRO.

**Methods**

### `.on_child_change(address)`

Observe changes at a specific child address.

Builds `OnChildChange`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `address` | `object` |  |  |

Undocumented: example.

### `.on_children_change()`

Observe changes across all direct children.

Builds `OnChildrenChange`.

Undocumented: example.

### `.on_descendants_change()`

Observe changes across descendants matching `pattern`.

Builds `OnDescendantsChange`.

Undocumented: example.

**Inherited methods**

From `nu.domains.shape.forms.collection.MutableCollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(value)` | `SetCmd` | Build a `SetCmd`. |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the collection is currently missing. |

From `nu.domains.shape.forms.collection.CollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |
| `.extract()` | `Extract` | Build an `Extract` query. |

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

---
title: refs.shapes_mapping
description: "ShapesMappingRef hierarchy: mapping-of-shapes Ref + Form mixin tiers."
---

Module `nu.domains.shape.refs.shapes_mapping`.

ShapesMappingRef hierarchy: mapping-of-shapes Ref + Form mixin tiers.

ShapesMappingRef         = shape.MappingForm + StructuredRef
    MutableShapesMappingRef  = shape.MutableMappingForm + ShapesMappingRef
    ReactiveShapesMappingRef = shape.ReactiveMappingForm + MutableShapesMappingRef

shape.MappingForm already composes generic MappingForm + shape CollectionForm,
so exists()/missing()/extract()/store()/erase() are all present without a
separate ItemForm in the MRO.

Subscript access (`ref[key]`) returns a matching-tier ShapeRef whose address
is the key. The shape type for items is fixed at construction via
`item_shape_type`.

Form composition provides:
    base:     len(), contains(), iter(), [k], keys(), values(), items(), ...,
              exists(), missing(), extract()
    mutable:  + set(k,v), delete(k), update(), ..., store(v), erase()
    reactive: + on_change() (generic), on_child_change(), on_children_change(),
                on_descendants_change() (shape-domain)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [MutableShapesMappingRef](#mutableshapesmappingref) | `ref` | `MutableShapesMappingRef(address, item_shape_type, parent_ref=None, owner_shape=None)` | Mutable mapping-of-shapes Ref; subscript returns MutableShapeRef. |
| [ReactiveShapesMappingRef](#reactiveshapesmappingref) | `ref` | `ReactiveShapesMappingRef(address, item_shape_type, parent_ref=None, owner_shape=None)` | Reactive mapping-of-shapes Ref; subscript returns ReactiveShapeRef. |
| [ShapesMappingRef](#shapesmappingref) | `ref` | `ShapesMappingRef(address, item_shape_type, parent_ref=None, owner_shape=None)` | Mapping-of-shapes Ref; subscript descent returns a ShapeRef. |

## MutableShapesMappingRef

Mutable mapping-of-shapes Ref; subscript returns MutableShapeRef.

```python
MutableShapesMappingRef(address, item_shape_type, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.MutableShapesMappingRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Adds: set(k,v), delete(k), update(), ..., store(v), erase().

**Inherited methods**

From `nu.forms.collections.abc.mapping.MutableMappingForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set_item(key, value)` | `Any` | Set the value at key, inserting the key if it's missing: mapping[key] = value. |
| `.del_item(key)` | `Any` | Delete the entry at key: del mapping[key]. |
| `.update(other)` | `Any` | Write other's entries into self, in place: mapping.update(other). |
| `.pop(key, default=None)` | `ValueResultT` | Remove key and yield its value, or default if key is missing. |
| `.popitem()` | `ValueResultT` | Remove and yield an arbitrary (key, value) pair: mapping.popitem(). |
| `.setdefault(key, default=None)` | `ValueResultT` | Value at key, inserting default there first if key is missing. |
| `.merge_update(other)` | `CollectionResultT` | Merge other into self in place, and yield self: mapping \|= other. |
| `.clear()` | `Any` | Remove all entries: mapping.clear(). |

From `nu.domains.shape.refs.shapes_mapping.ShapesMappingRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `ItemResultT` | Navigate to the child ShapeRef at `key`, with self as parent. |

From `nu.forms.collections.abc.mapping.MappingForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.keys()` | `CollectionResultT` | All keys of the mapping: mapping.keys(). |
| `.values()` | `CollectionResultT` | All values of the mapping: mapping.values(). |
| `.items()` | `CollectionResultT` | All (key, value) pairs of the mapping: mapping.items(). |
| `.get_item(key, default=None)` | `ValueResultT` | Value at key, falling back to default: mapping.get_item(key, default). |
| `.copy()` | `CollectionResultT` | Shallow copy of self: mapping.copy(). |
| `.reversed_keys()` | `CollectionResultT` | Keys in reverse insertion order: reversed(mapping). |
| `.reversed_values()` | `CollectionResultT` | Values in reverse insertion order: reversed(mapping.values()). |
| `.reversed_items()` | `CollectionResultT` | (key, value) pairs in reverse insertion order: reversed(mapping.items()). |
| `.merge(other)` | `CollectionResultT` | Self and other merged into a new mapping: mapping \| other. |

From `nu.forms.collections.abc.collection.CollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.extract()` | `object` | Materialise the full subtree rooted at self. |

From `nu.forms.collections.abc.sized.SizedForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.len()` | `Int` | Length of self. |

From `nu.forms.collections.abc.iterable.IterableForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `iter(a)` | `Iterator[ElementT]` | Open self into a lazy iterator stream (Python's `iter`). |

From `nu.forms.collections.abc.container.ContainerForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.contains(item)` | `Bool` | Whether item is a member of self. |

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

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

Undocumented: example.

## ReactiveShapesMappingRef

Reactive mapping-of-shapes Ref; subscript returns ReactiveShapeRef.

```python
ReactiveShapesMappingRef(address, item_shape_type, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.ReactiveShapesMappingRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Adds: on_change(), on_child_change(), on_children_change(),
on_descendants_change().

**Inherited methods**

From `nu.forms.collections.abc.mapping.ReactiveMappingForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `object` | Subscribe to any change on this mapping slot. |

From `nu.forms.collections.abc.mapping.MutableMappingForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set_item(key, value)` | `Any` | Set the value at key, inserting the key if it's missing: mapping[key] = value. |
| `.del_item(key)` | `Any` | Delete the entry at key: del mapping[key]. |
| `.update(other)` | `Any` | Write other's entries into self, in place: mapping.update(other). |
| `.pop(key, default=None)` | `ValueResultT` | Remove key and yield its value, or default if key is missing. |
| `.popitem()` | `ValueResultT` | Remove and yield an arbitrary (key, value) pair: mapping.popitem(). |
| `.setdefault(key, default=None)` | `ValueResultT` | Value at key, inserting default there first if key is missing. |
| `.merge_update(other)` | `CollectionResultT` | Merge other into self in place, and yield self: mapping \|= other. |
| `.clear()` | `Any` | Remove all entries: mapping.clear(). |

From `nu.domains.shape.refs.shapes_mapping.ShapesMappingRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `ItemResultT` | Navigate to the child ShapeRef at `key`, with self as parent. |

From `nu.forms.collections.abc.mapping.MappingForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.keys()` | `CollectionResultT` | All keys of the mapping: mapping.keys(). |
| `.values()` | `CollectionResultT` | All values of the mapping: mapping.values(). |
| `.items()` | `CollectionResultT` | All (key, value) pairs of the mapping: mapping.items(). |
| `.get_item(key, default=None)` | `ValueResultT` | Value at key, falling back to default: mapping.get_item(key, default). |
| `.copy()` | `CollectionResultT` | Shallow copy of self: mapping.copy(). |
| `.reversed_keys()` | `CollectionResultT` | Keys in reverse insertion order: reversed(mapping). |
| `.reversed_values()` | `CollectionResultT` | Values in reverse insertion order: reversed(mapping.values()). |
| `.reversed_items()` | `CollectionResultT` | (key, value) pairs in reverse insertion order: reversed(mapping.items()). |
| `.merge(other)` | `CollectionResultT` | Self and other merged into a new mapping: mapping \| other. |

From `nu.forms.collections.abc.collection.CollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.extract()` | `object` | Materialise the full subtree rooted at self. |

From `nu.forms.collections.abc.sized.SizedForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.len()` | `Int` | Length of self. |

From `nu.forms.collections.abc.iterable.IterableForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `iter(a)` | `Iterator[ElementT]` | Open self into a lazy iterator stream (Python's `iter`). |

From `nu.forms.collections.abc.container.ContainerForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.contains(item)` | `Bool` | Whether item is a member of self. |

From `nu.domains.shape.forms.collection.ReactiveCollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_child_change(address)` | `OnChildChange` | Observe changes at a specific child address. |
| `.on_children_change()` | `OnChildrenChange` | Observe changes across all direct children. |
| `.on_descendants_change()` | `OnDescendantsChange` | Observe changes across descendants matching `pattern`. |

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

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

Undocumented: example.

## ShapesMappingRef

Mapping-of-shapes Ref; subscript descent returns a ShapeRef.

```python
ShapesMappingRef(address, item_shape_type, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.ShapesMappingRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Navigation is defined ONCE (`__getitem__`) and routes through
`_wrap_item_ref`; each tier defaults to the matching-tier ShapeRef, and
substrates override it (binding `ItemResultT`) to return their own ShapeRef.

**Methods**

### `a[key]`

Navigate to the child ShapeRef at `key`, with self as parent.

Builds `ItemResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `object` |  |  |

Undocumented: example.

**Inherited methods**

From `nu.forms.collections.abc.mapping.MappingForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.keys()` | `CollectionResultT` | All keys of the mapping: mapping.keys(). |
| `.values()` | `CollectionResultT` | All values of the mapping: mapping.values(). |
| `.items()` | `CollectionResultT` | All (key, value) pairs of the mapping: mapping.items(). |
| `.get_item(key, default=None)` | `ValueResultT` | Value at key, falling back to default: mapping.get_item(key, default). |
| `.copy()` | `CollectionResultT` | Shallow copy of self: mapping.copy(). |
| `.reversed_keys()` | `CollectionResultT` | Keys in reverse insertion order: reversed(mapping). |
| `.reversed_values()` | `CollectionResultT` | Values in reverse insertion order: reversed(mapping.values()). |
| `.reversed_items()` | `CollectionResultT` | (key, value) pairs in reverse insertion order: reversed(mapping.items()). |
| `.merge(other)` | `CollectionResultT` | Self and other merged into a new mapping: mapping \| other. |

From `nu.forms.collections.abc.collection.CollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.extract()` | `object` | Materialise the full subtree rooted at self. |

From `nu.forms.collections.abc.sized.SizedForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.len()` | `Int` | Length of self. |

From `nu.forms.collections.abc.iterable.IterableForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `iter(a)` | `Iterator[ElementT]` | Open self into a lazy iterator stream (Python's `iter`). |

From `nu.forms.collections.abc.container.ContainerForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.contains(item)` | `Bool` | Whether item is a member of self. |

From `nu.domains.shape.forms.collection.CollectionForm`:

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

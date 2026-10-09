---
title: refs.shape
description: "Virtuals shape reference: structured container backed by a virtuals View."
---

Module `nustd.kv.refs.shape`.

Virtuals shape reference: structured container backed by a virtuals View.

Field descent (`ref.field` / `ref["field"]`) is the blueprint's
`__getattr__` / `__getitem__`: it resolves the slot to the field's own
virtuals ref (`StrRef`, `IntRef`, ...) with this ref as `parent_ref`, so
navigation rides the substrate automatically.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ShapeRef](#shaperef) | `ref` | `ShapeRef(address, shape_type, view_type=None, parent_ref=None, owner_shape=None)` | A nested shape slot in KV storage: a fixed set of named fields. |

## ShapeRef

A nested shape slot in KV storage: a fixed set of named fields.

```python
ShapeRef(address, shape_type, view_type=None, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.ShapeRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Descending by field name resolves the declared slot into that field's own
ref, with this one as its parent, so a whole hierarchy is written as
nested Shape classes and navigated with dots.

**Notes**

- `ref.field` and `ref["field"]` are the same descent; the second is what to write when the field name is computed.
- Fields carry their own types, so descent lands on a typed leaf ref or on another container ref, not on a plain value.
- Nothing is created until a leaf underneath is written; the write then materializes every level along the way.
- The mapping surface (`keys`, `items`, `len`) reads the stored fields, so it only sees the fields actually written.

**Example**

```python
class Order(Shape):
    symbol = StrRef.slot()
class Portfolio(Shape):
    latest = ShapeRef.slot(Order)
run(Portfolio.latest.symbol.set("SOL"), ctx)
```

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

From `nu.domains.shape.refs.shape.ShapeRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `StructuredRef` | Navigate into shape slots via bracket access; mirror of __getattr__. |

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

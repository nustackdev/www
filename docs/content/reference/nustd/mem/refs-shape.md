---
title: refs.shape
description: "Dict shape reference: structured container backed by nested dict."
---

Module `nustd.mem.refs.shape`.

Dict shape reference: structured container backed by nested dict.

Field descent (`ShapeRef.field`) is the blueprint's `__getattr__`: it
resolves the slot to the field's own mem ref (`StrRef`, `IntRef`, ...) with
this ref as `parent_ref`, so navigation rides the substrate automatically.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ShapeRef](#shaperef) | `ref` | `ShapeRef(address, shape_type, parent_ref=None, owner_shape=None)` | A nested Shape slot in the dict substrate, stored as an inner dict. |

## ShapeRef

A nested Shape slot in the dict substrate, stored as an inner dict.

```python
ShapeRef(address, shape_type, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.ShapeRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Attribute access descends: `ref.field` resolves the named slot on the
held Shape class and hands back that field's own ref, parented here, so
dot chains navigate arbitrarily deep before anything is read. The mapping
calls on the ref itself act on the inner dict as a whole.

**Notes**

- The inner dict does not have to exist first: writing through a field creates every level on the way down.
- Nothing enforces the Shape: keys the class never declared can sit in the same dict and are read only through the mapping calls.

**Example**

```python
class Order(nu.Shape):
    symbol = nustd.mem.StrRef.slot()
class Book(nu.Shape):
    best = nustd.mem.ShapeRef.slot(Order)
data = {}
ctx = nu.Context().bind(dict, data, Book)
_ = nu.run(Book.best.symbol.set("AAPL"), ctx)
data
```

```
{'best': {'symbol': 'AAPL'}}
```

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

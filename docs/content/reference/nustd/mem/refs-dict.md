---
title: refs.dict
description: "Dict mapping reference: key-value container backed by nested dict."
---

Module `nustd.mem.refs.dict`.

Dict mapping reference: key-value container backed by nested dict.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [DictRef](#dictref) | `ref` | `DictRef(address, value_type, key_type, key_value_type, value_value_type, parent_ref=None, owner_shape=None)` | A mapping slot in the dict substrate, holding one plain dict of values. |

## DictRef

A mapping slot in the dict substrate, holding one plain dict of values.

```python
DictRef(address, value_type, key_type, key_value_type, value_value_type, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.DictRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Subscripting descends rather than reads: `ref[k]` is an `ItemRef` at
that key inside the stored dict, a ref in its own right that can be set,
erased or read on its own. The mapping calls (`keys`, `items`,
`update`, ...) act on the dict as a whole.

**Notes**

- The stored value is an ordinary dict and a read hands back that live object, so a mutation through the ref is visible to anyone else holding it.
- In-place calls read the container first and do nothing when the slot is absent, so `set` an empty dict before the first `set_item`.
- The declared key and value types are metadata; nothing coerces or rejects what is written.

**Example**

```python
class Port(nu.Shape):
    meta = nustd.mem.DictRef.slot(int)
data = {"meta": {"a": 1}}
ctx = nu.Context().bind(dict, data, Port)
_ = nu.run(Port.meta.set_item("b", 2), ctx)
nu.run(Port.meta["b"], ctx)[0]
nu.run(Port.meta.len(), ctx)[0]
```

```
2
2
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

From `nu.domains.shape.refs.mapping.MappingRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `ItemResultT` | Navigate to the child Ref at `key`, with self as parent. |

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

---
title: refs.dictshape
description: "Dict shapes dict reference: mapping of homogeneous shapes."
---

Module `nustd.mem.refs.dictshape`.

Dict shapes dict reference: mapping of homogeneous shapes.

Key descent (`ref[k]`) is the blueprint's `__getitem__`: it returns a
`ShapeRef` at the key with this ref as `parent_ref`. The value shape type is
passed to the blueprint as `item_shape_type`.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ShapesDictRef](#shapesdictref) | `ref` | `ShapesDictRef(address, shape_type, key_type, key_value_type, parent_ref=None, owner_shape=None)` | A keyed collection of one Shape's records, stored as a dict of dicts. |

## ShapesDictRef

A keyed collection of one Shape's records, stored as a dict of dicts.

```python
ShapesDictRef(address, shape_type, key_type, key_value_type, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.ShapesDictRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Subscripting descends: `ref[k]` is a `ShapeRef` at that key holding
the value Shape, so `users["ada"].name` is a path down to a leaf and
nothing is read until the whole chain runs. The mapping calls on the ref
itself act on the outer dict.

**Notes**

- Values are plain dicts, so a record is added by writing a dict, not a Shape instance.
- Writing through a key creates the outer dict and the record on the way down; the whole-container calls (`keys`, `update`, ...) instead do nothing while the slot is absent.

**Example**

```python
class User(nu.Shape):
    name = nustd.mem.StrRef.slot()
class Team(nu.Shape):
    users = nustd.mem.ShapesDictRef.slot(User)
data = {}
ctx = nu.Context().bind(dict, data, Team)
_ = nu.run(Team.users["ada"].name.set("Ada"), ctx)
data
```

```
{'users': {'ada': {'name': 'Ada'}}}
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

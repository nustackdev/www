---
title: refs.containers
description: "mem containers: collections whose elements each get an address of their own."
---

Module `nu.mem.refs.containers`.

mem containers: collections whose elements each get an address of their own.

A container slot declares the value it holds, and that declaration types it
throughout. Descent (`ref[k]`, `ref[i]`, `ref.field`) lands on the mem
ref for the declared value, and every value an op reads is that value's form.
A container reads as the live object held in the data dict.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [DictRef](#dictref) | `ref` | `DictRef(address, parent_ref=None, owner_shape=None)` | A mapping slot in the dict substrate, holding one plain dict of values. |
| [ListRef](#listref) | `ref` | `ListRef(address, parent_ref=None, owner_shape=None)` | A sequence slot in the dict substrate, holding one plain list of values. |
| [SetRef](#setref) | `ref` | `SetRef(address, parent_ref=None, owner_shape=None)` | A set slot in the dict substrate, holding one plain set of values. |
| [ShapeRef](#shaperef) | `ref` | `ShapeRef(address, shape_type, parent_ref=None, owner_shape=None)` | A nested Shape slot in the dict substrate, stored as an inner dict. |

## DictRef

A mapping slot in the dict substrate, holding one plain dict of values.

```python
DictRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.mem.DictRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Subscripting descends rather than reads: `ref[k]` is a ref at that key
inside the stored dict, settable and erasable on its own. The declared
value picks it: a core Python type lands on its mem leaf (`int` on
`IntRef`), a Shape on a `ShapeRef` for that shape, a mem leaf class on
itself, and anything else, a standard-library type included, on
`ObjectRef`. The mapping calls (`keys`,
`items`, `update`, ...) act on the dict as a whole.

**Notes**

- The stored value is an ordinary dict and a read hands back that live object, so a mutation through the ref is visible to anyone else holding it.
- Value reads (`get_item`, `pop`, `setdefault`) are the declared value's form, and `values`, `items` and `copy` carry the declared types on.
- Writing through a key creates the dict and every level above it; the in-place calls instead read the container first and do nothing while the slot is absent, so `set` an empty dict before the first `set_item`.
- The declared types shape the refs and forms; nothing coerces or rejects what is written.

**Example**

```python
class Port(nu.Shape):
    meta = nu.DictRef.slot(int)
data = {"meta": {"a": 1}}
ctx = nu.Context().bind(dict, data, Port)
_ = nu.run(Port.meta["b"].set(2), ctx)
nu.run(Port.meta["b"] + 1, ctx)[0]
nu.run(Port.meta.len(), ctx)[0]
```

```
3
2
```

**Methods**

### `.iter()`

A lazy stream over the keys, each the declared key's form.

Builds `Iterator[K]`.

Undocumented: example.

### `a[key]`

The mem ref for the declared value at `key`.

Builds `StructuredRef`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `object` |  |  |

Undocumented: example.

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
| `.merge_update(other)` | `CollectionResultT` | Merge other into self in place, and yield self, like Python's dict `\|=`. |
| `.clear()` | `Any` | Remove all entries: mapping.clear(). |

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
| `.merge(other)` | `CollectionResultT` | Self and other merged into a new mapping, like Python's dict `\|`. |

From `nu.forms.collections.abc.collection.CollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.extract()` | `object` | Materialise the full subtree rooted at self. |

From `nu.forms.collections.abc.sized.SizedForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.len()` | `Int` | Length of self. |

From `nu.forms.collections.abc.container.ContainerForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.contains(item)` | `Bool` | Whether item is a member of self. |

From `nu.domains.shape.collection.MutableCollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(value)` | `SetCmd` | Build a `SetCmd`. |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the collection is currently missing. |

From `nu.domains.shape.collection.CollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Bool` | Whether this collection slot holds a value, as a `Bool`. |
| `.missing()` | `Bool` | Whether this slot holds no value, as a `Bool`: the negation of `exists()`. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a == b` | `Bool` | Self equal to other by value: an `Eq` term, never a Python bool. |
| `a != b` | `Bool` | Self not equal to other by value: a `Ne` term, never a Python bool. |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

## ListRef

A sequence slot in the dict substrate, holding one plain list of values.

```python
ListRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.mem.ListRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Subscripting with an int descends rather than reads: `ref[i]` is the mem
ref for the declared value at that index, settable and erasable on its
own, picked as on a `DictRef`. A slice instead routes to the
sequence-level `slice` call and yields a new list.

**Notes**

- The stored value is an ordinary list and a read hands back that live object, so a mutation through the ref is visible to anyone else holding it.
- Element reads (`first_elem`, `pop`) are the declared value's form; a slice is a List carrying the declared type on.
- In-place calls read the container first and do nothing when the slot is absent, so `set` an empty list before the first `append`.
- An index past the end reads EMPTY rather than raising, like any other broken path.

**Example**

```python
class Port(nu.Shape):
    tags = nu.ListRef.slot(str)
data = {"tags": ["a"]}
ctx = nu.Context().bind(dict, data, Port)
_ = nu.run(Port.tags.append("b"), ctx)
nu.run(Port.tags[1].upper(), ctx)[0]
data
```

```
'B'
{'tags': ['a', 'b']}
```

**Methods**

### `.iter()`

A lazy stream over the elements, each the declared value's form.

Builds `Iterator[T]`.

Undocumented: example.

### `a[key]`

The mem ref for the declared value at `index`; a slice is a List.

Builds `StructuredRef`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `index` | `object` |  |  |

Undocumented: example.

**Inherited methods**

From `nu.forms.collections.abc.sequence.MutableSequenceForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.append(value)` | `Any` | Append value to the end of self. |
| `.extend(other)` | `Any` | Extend self with the elements of other, in order. |
| `.insert(index, value)` | `Any` | Insert value at index, shifting later elements right. |
| `.pop(index=-1)` | `ElementResultT` | Remove and return the element at index. |
| `.del_at(index)` | `Any` | Remove the element at index. |
| `.remove(value, missing_ok=False)` | `Any` | Remove the first occurrence of value. |
| `.reverse()` | `Any` | Reverse self in place. |
| `.sort()` | `Any` | Sort self in place, ascending, using the elements' natural order. |
| `.copy()` | `CollectionResultT` | Shallow copy of self: a new sequence with the same elements. |
| `.clear()` | `Any` | Remove every element from self. |

From `nu.forms.collections.abc.sequence.SequenceForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.first_elem()` | `ElementResultT` | First element of self. |
| `.last_elem()` | `ElementResultT` | Last element of self. |
| `.index(value)` | `Int` | Lowest index in self where value is found, searching from the left. |
| `.count(value)` | `Int` | Count of occurrences of value in self. |
| `.reversed()` | `CollectionResultT` | Self walked back to front, as a stream. |

From `nu.forms.collections.abc.collection.CollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.extract()` | `object` | Materialise the full subtree rooted at self. |

From `nu.forms.collections.abc.sized.SizedForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.len()` | `Int` | Length of self. |

From `nu.forms.collections.abc.container.ContainerForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.contains(item)` | `Bool` | Whether item is a member of self. |

From `nu.forms.collections.abc.sliceable.SliceableForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.slice(start, stop, step=None)` | `ResultT` | Slice of self from start to stop, stepping by step. |

From `nu.domains.shape.collection.MutableCollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(value)` | `SetCmd` | Build a `SetCmd`. |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the collection is currently missing. |

From `nu.domains.shape.collection.CollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Bool` | Whether this collection slot holds a value, as a `Bool`. |
| `.missing()` | `Bool` | Whether this slot holds no value, as a `Bool`: the negation of `exists()`. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a == b` | `Bool` | Self equal to other by value: an `Eq` term, never a Python bool. |
| `a != b` | `Bool` | Self not equal to other by value: a `Ne` term, never a Python bool. |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

## SetRef

A set slot in the dict substrate, holding one plain set of values.

```python
SetRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.mem.SetRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

No descent: a set has no addresses, so there is no child ref to navigate
to. Everything happens through the set calls - membership, the algebra
(`union`, `difference`, ...), and the in-place mutations.

**Notes**

- The stored value is an ordinary set and a read hands back that live object, so elements must be hashable and iteration order is whatever Python gives.
- The declared value types what comes out: `pop` is its form, and the set algebra yields a Set carrying it on.
- In-place calls read the container first and do nothing when the slot is absent, so `set` an empty set before the first `add`.

**Example**

```python
class Port(nu.Shape):
    members = nu.SetRef.slot(str)
ctx = nu.Context().bind(dict, {"members": {"a"}}, Port)
_ = nu.run(Port.members.add("b"), ctx)
sorted(nu.run(Port.members, ctx)[0])
```

```
['a', 'b']
```

**Methods**

### `.iter()`

A lazy stream over the elements, each the declared value's form.

Builds `Iterator[T]`.

Undocumented: example.

**Inherited methods**

From `nu.forms.collections.abc.set_.MutableSetForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.add(value)` | `Any` | Add value to self. |
| `.remove(value, missing_ok=False)` | `Any` | Remove value from self. |
| `.discard(value)` | `Any` | Remove value from self if present. |
| `.pop()` | `ElementResultT` | Remove and return an arbitrary element from self. |
| `.clear()` | `Any` | Remove every element from self. |
| `.update(other)` | `Any` | Add every element of other to self. |
| `.intersection_update(other)` | `Any` | Keep only the elements of self also found in other. |
| `.difference_update(other)` | `Any` | Remove every element of other from self. |
| `.symmetric_difference_update(other)` | `Any` | Keep the elements in exactly one of self and other. |

From `nu.forms.collections.abc.set_.SetLikeForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.union(other)` | `CollectionResultT` | Union of self and other. |
| `.intersection(other)` | `CollectionResultT` | Intersection of self and other. |
| `.difference(other)` | `CollectionResultT` | Elements of self that are not in other. |
| `.symmetric_difference(other)` | `CollectionResultT` | Elements in exactly one of self and other, not both. |
| `.issubset(other)` | `Bool` | Whether every element of self is in other. |
| `.issuperset(other)` | `Bool` | Whether every element of other is in self. |
| `.isdisjoint(other)` | `Bool` | Whether self and other share no elements. |
| `.copy()` | `CollectionResultT` | Shallow copy of self. |

From `nu.forms.collections.abc.collection.CollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.extract()` | `object` | Materialise the full subtree rooted at self. |

From `nu.forms.collections.abc.sized.SizedForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.len()` | `Int` | Length of self. |

From `nu.forms.collections.abc.container.ContainerForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.contains(item)` | `Bool` | Whether item is a member of self. |

From `nu.domains.shape.collection.MutableCollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(value)` | `SetCmd` | Build a `SetCmd`. |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the collection is currently missing. |

From `nu.domains.shape.collection.CollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Bool` | Whether this collection slot holds a value, as a `Bool`. |
| `.missing()` | `Bool` | Whether this slot holds no value, as a `Bool`: the negation of `exists()`. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a == b` | `Bool` | Self equal to other by value: an `Eq` term, never a Python bool. |
| `a != b` | `Bool` | Self not equal to other by value: a `Ne` term, never a Python bool. |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

## ShapeRef

A nested Shape slot in the dict substrate, stored as an inner dict.

```python
ShapeRef(address, shape_type, parent_ref=None, owner_shape=None)
```

Path `nu.mem.ShapeRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

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
    symbol = nu.StrRef.slot()
class Book(nu.Shape):
    best = nu.ShapeRef.slot(Order)
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
| `.merge_update(other)` | `CollectionResultT` | Merge other into self in place, and yield self, like Python's dict `\|=`. |
| `.clear()` | `Any` | Remove all entries: mapping.clear(). |

From `nu.domains.shape.shape.ShapeRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `StructuredRef` | Navigate into shape slots via bracket access; mirror of __getattr__. |

From `nu.domains.shape.mapping.MappingForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.iter()` | `Iterator` | A lazy stream over its keys, typed by the declared key. |

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
| `.merge(other)` | `CollectionResultT` | Self and other merged into a new mapping, like Python's dict `\|`. |

From `nu.forms.collections.abc.collection.CollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.extract()` | `object` | Materialise the full subtree rooted at self. |

From `nu.forms.collections.abc.sized.SizedForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.len()` | `Int` | Length of self. |

From `nu.forms.collections.abc.container.ContainerForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.contains(item)` | `Bool` | Whether item is a member of self. |

From `nu.domains.shape.collection.MutableCollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(value)` | `SetCmd` | Build a `SetCmd`. |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the collection is currently missing. |

From `nu.domains.shape.collection.CollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Bool` | Whether this collection slot holds a value, as a `Bool`. |
| `.missing()` | `Bool` | Whether this slot holds no value, as a `Bool`: the negation of `exists()`. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a == b` | `Bool` | Self equal to other by value: an `Eq` term, never a Python bool. |
| `a != b` | `Bool` | Self not equal to other by value: a `Ne` term, never a Python bool. |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

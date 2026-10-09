---
title: refs.primitives
description: "virtuals-substrate refs for whole-blob compound values."
---

Module `nustd.kv.refs.primitives`.

virtuals-substrate refs for whole-blob compound values.

Unlike the decomposing container refs (`ListRef` / `DictRef` / `SetRef`,
which fan a container out into per-element storage), these write the whole
container as one opaque value via `ItemPrimitiveSetCmd` and read it back as
a plain Python object. Each mixes in the matching collection Form, so the value
still carries the full list / dict / tuple / set interface.

Use for opaque or heterogeneous containers that should round-trip whole rather
than shape-decompose (log lines, raw account blobs, balance arrays, ...).

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [PrimitiveDictRef](#primitivedictref) | `ref` | `PrimitiveDictRef(address, parent_ref=None, owner_shape=None)` | A dict leaf in KV storage, written and read back whole as one blob. |
| [PrimitiveFrozenSetRef](#primitivefrozensetref) | `ref` | `PrimitiveFrozenSetRef(address, parent_ref=None, owner_shape=None)` | A frozenset leaf in KV storage, written and read back whole as one blob. |
| [PrimitiveListRef](#primitivelistref) | `ref` | `PrimitiveListRef(address, parent_ref=None, owner_shape=None)` | A list leaf in KV storage, written and read back whole as one blob. |
| [PrimitiveSetRef](#primitivesetref) | `ref` | `PrimitiveSetRef(address, parent_ref=None, owner_shape=None)` | A set leaf in KV storage, written and read back whole as one blob. |
| [PrimitiveTupleRef](#primitivetupleref) | `ref` | `PrimitiveTupleRef(address, parent_ref=None, owner_shape=None)` | A tuple leaf in KV storage, written and read back whole as one blob. |

## PrimitiveDictRef

A dict leaf in KV storage, written and read back whole as one blob.

```python
PrimitiveDictRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.PrimitiveDictRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Stored as one opaque value, so the keys get no addresses of their own and cannot be reached or watched individually.
- Reads come back as a real Python dict, nested contents included.
- The write path is `set` with a whole dict. The key-level mutations inherited from the Dict surface (`set_item`, `pop`, `update`, ...) do not reach the stored blob and leave it as it was, without raising.
- DictRef is the other choice: it decomposes into per-key storage and gives per-key navigation and change observation.

**Example**

```python
class Bag(Shape):
    meta = PrimitiveDictRef.slot()
run(Bag.meta.set({"a": 1, "b": [2, 3]}), ctx)
run(Bag.meta, ctx)
```

**Methods**

### `.set(value)`

Store the whole dict as one leaf value.

Builds `object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[dict[K, V]]` |  | the dict to store. May be a literal or an expression. |

**Yields**

Nothing. It is a command, run for the write.

**Notes**

- Overrides the decomposing slot write, so the dict lands as one opaque value with no per-key children underneath it.
- Replaces whatever was there; keys already stored are not merged in.

**Example**

```python
run(Bag.meta.set({"a": 1}), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nu.forms.collections.dict_.Dict`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `PrimitiveDictRef.create()` | `Dict[K, V]` | Fresh empty dict. |
| `PrimitiveDictRef.of(fields)` | `Dict[str, V]` | Dict built from named field expressions. |
| `a[key]` |  | Value at key. |
| `.keys()` | `DictKeys[K]` | Self's keys as a live view. |
| `.values()` | `DictValues[V]` | Self's values as a live view. |
| `.items()` | `DictItems[K, V]` | Self's key-value pairs as a live view. |
| `a > b` | `Bool` | Self strictly greater than other. |
| `a < b` | `Bool` | Self strictly less than other. |
| `a >= b` | `Bool` | Self greater than or equal to other. |
| `a <= b` | `Bool` | Self less than or equal to other. |
| `a == b` | `Bool` | Self equal to other by value. |
| `a != b` | `Bool` | Self not equal to other by value. |
| `.is_(other)` | `Bool` | Identity comparison: self is other. |

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

From `nu.forms.collections.abc.mapping.MappingForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
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

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## PrimitiveFrozenSetRef

A frozenset leaf in KV storage, written and read back whole as one blob.

```python
PrimitiveFrozenSetRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.PrimitiveFrozenSetRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Reads come back as a real Python frozenset, so the type survives the round trip.
- Carries the read-only set surface only: union, intersection and the rest yield new values and never touch storage.
- Has no decomposing counterpart; a frozenset slot is always stored whole.

**Example**

```python
class Bag(Shape):
    locked = PrimitiveFrozenSetRef.slot()
run(Bag.locked.set(frozenset({1, 2})), ctx)
run(Bag.locked, ctx)
```

**Methods**

### `.set(value)`

Store the whole frozenset as one leaf value.

Builds `object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[frozenset[T]]` |  | the frozenset to store. May be a literal or an expression. |

**Yields**

Nothing. It is a command, run for the write.

**Notes**

- Replaces whatever was there.

**Example**

```python
run(Bag.locked.set(frozenset({1, 2})), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nu.forms.collections.set_.FrozenSet`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `PrimitiveFrozenSetRef.create()` | `FrozenSet[T]` | Build an empty frozenset. |
| `PrimitiveFrozenSetRef.of(*items)` | `FrozenSet` | Build a frozenset from positional item expressions. |
| `a > b` | `Bool` | Self is a proper superset of other. |
| `a < b` | `Bool` | Self is a proper subset of other. |
| `a >= b` | `Bool` | Self is a superset of other, or equal. |
| `a <= b` | `Bool` | Self is a subset of other, or equal. |
| `a == b` | `Bool` | Self equal to other by value. |
| `a != b` | `Bool` | Self not equal to other by value. |
| `.is_(other)` | `Bool` | Identity comparison: self is other. |

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
| `a \| b` | `CollectionResultT` | Union: self \| other. |
| `a & b` | `CollectionResultT` | Intersection: self & other. |
| `a - b` | `CollectionResultT` | Difference: self - other. |
| `a ^ b` | `CollectionResultT` | Symmetric difference: self ^ other. |

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

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## PrimitiveListRef

A list leaf in KV storage, written and read back whole as one blob.

```python
PrimitiveListRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.PrimitiveListRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Stored as one opaque value, so the elements get no addresses of their own and cannot be reached or watched individually.
- Reads come back as a real Python list, so heterogeneous and nested contents round-trip as they were written.
- The write path is `set` with a whole list. The element-level mutations inherited from the List surface (`append`, `insert`, `del_at`, ...) do not reach the stored blob and leave it as it was, without raising.
- ListRef is the other choice: it decomposes into per-index storage and gives per-element navigation.

**Example**

```python
class Bag(Shape):
    rows = PrimitiveListRef.slot()
run(Bag.rows.set([1, "two", {"three": 3}]), ctx)
run(Bag.rows, ctx)
```

**Methods**

### `.set(value)`

Store the whole list as one leaf value.

Builds `object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[list[T]]` |  | the list to store. May be a literal or an expression. |

**Yields**

Nothing. It is a command, run for the write.

**Notes**

- Overrides the decomposing slot write, so the list lands as one opaque value with no per-index children underneath it.
- Replaces whatever was there; there is no merge with the value already stored.

**Example**

```python
run(Bag.rows.set([1, "two"]), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nu.forms.collections.list_.List`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `PrimitiveListRef.create()` | `List[T]` | Yield a fresh empty list. |
| `PrimitiveListRef.of(items)` | `List` | Yield a list from positional item expressions. |
| `a[key]` |  | Element at an int index, or subsequence for a slice. |
| `a + b` | `List[T]` | Concatenation of self and other. |
| `a * b` | `List[T]` | Self repeated n times. |
| `a[key] = value` | `Any` | Subscript write: self[index] = value. |
| `a > b` | `Bool` | Self strictly greater than other, element-by-element. |
| `a < b` | `Bool` | Self strictly less than other, element-by-element. |
| `a >= b` | `Bool` | Self greater than or equal to other, element-by-element. |
| `a <= b` | `Bool` | Self less than or equal to other, element-by-element. |
| `a == b` | `Bool` | Self equal to other by value. |
| `a != b` | `Bool` | Self not equal to other by value. |
| `.is_(other)` | `Bool` | Identity comparison: self is other. |

From `nu.forms.collections.abc.sequence.MutableSequenceForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.append(value)` | `Any` | Append value to the end of self. |
| `.extend(other)` | `Any` | Extend self with the elements of other, in order. |
| `.insert(index, value)` | `Any` | Insert value at index, shifting later elements right. |
| `.pop(index=-1)` | `ElementResultT` | Remove and return the element at index. |
| `.del_at(index)` | `Any` | Remove the element at index. |
| `.remove(value)` | `Any` | Remove the first occurrence of value. |
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

From `nu.forms.collections.abc.iterable.IterableForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `iter(a)` | `Iterator[ElementT]` | Open self into a lazy iterator stream (Python's `iter`). |

From `nu.forms.collections.abc.container.ContainerForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.contains(item)` | `Bool` | Whether item is a member of self. |

From `nu.forms.collections.abc.sliceable.SliceableForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.slice(start, stop, step=None)` | `ResultT` | Slice of self from start to stop, stepping by step. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## PrimitiveSetRef

A set leaf in KV storage, written and read back whole as one blob.

```python
PrimitiveSetRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.PrimitiveSetRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Reads come back as a real Python set, so membership and the set operators work on the value as they would in Python.
- The write path is `set` with a whole set. The element-level mutations inherited from the Set surface (`add`, `discard`, `update`, ...) do not reach the stored blob and leave it as it was, without raising.
- SetRef is the other choice: it decomposes into per-element storage and gives change observation.

**Example**

```python
class Bag(Shape):
    members = PrimitiveSetRef.slot()
run(Bag.members.set({1, 2, 3}), ctx)
run(Bag.members, ctx)
```

**Methods**

### `.set(value)`

Store the whole set as one leaf value.

Builds `object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[set[T]]` |  | the set to store. May be a literal or an expression. |

**Yields**

Nothing. It is a command, run for the write.

**Notes**

- Replaces whatever was there; it is not a union with the set already stored.

**Example**

```python
run(Bag.members.set({1, 2}), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nu.forms.collections.set_.Set`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `PrimitiveSetRef.create()` | `Set[T]` | Build a fresh empty set. |
| `PrimitiveSetRef.of(*items)` | `Set` | Build a set from positional item expressions. |
| `a > b` | `Bool` | Self is a proper superset of other. |
| `a < b` | `Bool` | Self is a proper subset of other. |
| `a >= b` | `Bool` | Self is a superset of other, or equal. |
| `a <= b` | `Bool` | Self is a subset of other, or equal. |
| `a == b` | `Bool` | Self equal to other by value. |
| `a != b` | `Bool` | Self not equal to other by value. |
| `.is_(other)` | `Bool` | Identity comparison: self is other. |

From `nu.forms.collections.abc.set_.MutableSetForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.add(value)` | `Any` | Add value to self. |
| `.remove(value)` | `Any` | Remove value from self. |
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
| `a \| b` | `CollectionResultT` | Union: self \| other. |
| `a & b` | `CollectionResultT` | Intersection: self & other. |
| `a - b` | `CollectionResultT` | Difference: self - other. |
| `a ^ b` | `CollectionResultT` | Symmetric difference: self ^ other. |

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

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## PrimitiveTupleRef

A tuple leaf in KV storage, written and read back whole as one blob.

```python
PrimitiveTupleRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.PrimitiveTupleRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Reads come back as a real Python tuple, so the type survives the round trip rather than degrading to a list.
- Has no decomposing counterpart: a tuple slot is always stored whole.
- Elements get no addresses of their own, so nothing under it can be reached or watched individually.

**Example**

```python
class Bag(Shape):
    pair = PrimitiveTupleRef.slot()
run(Bag.pair.set((1, "two")), ctx)
run(Bag.pair, ctx)
```

**Methods**

### `.set(value)`

Store the whole tuple as one leaf value.

Builds `object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[tuple]` |  | the tuple to store. May be a literal or an expression. |

**Yields**

Nothing. It is a command, run for the write.

**Notes**

- Replaces whatever was there.

**Example**

```python
run(Bag.pair.set((1, "two")), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nu.forms.collections.tuple_.Tuple`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `PrimitiveTupleRef.create()` | `Tuple[Unpack[Ts]]` | Empty tuple. |
| `PrimitiveTupleRef.of(items)` | `Tuple` | Tuple built from positional item expressions. |
| `a + b` | `Tuple` | Concatenation of self and other. |
| `a * b` | `Tuple` | Self repeated n times. |
| `a > b` | `Bool` | Self strictly greater than other, lexicographically. |
| `a < b` | `Bool` | Self strictly less than other, lexicographically. |
| `a >= b` | `Bool` | Self greater than or equal to other, lexicographically. |
| `a <= b` | `Bool` | Self less than or equal to other, lexicographically. |
| `a == b` | `Bool` | Self equal to other by value. |
| `a != b` | `Bool` | Self not equal to other by value. |
| `.is_(other)` | `Bool` | Identity comparison: self is other. |

From `nu.forms.collections.abc.sequence.SequenceForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `ElementResultT \| CollectionResultT` | Element at an int index, or subsequence for a slice. |
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

From `nu.forms.collections.abc.iterable.IterableForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `iter(a)` | `Iterator[ElementT]` | Open self into a lazy iterator stream (Python's `iter`). |

From `nu.forms.collections.abc.container.ContainerForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.contains(item)` | `Bool` | Whether item is a member of self. |

From `nu.forms.collections.abc.sliceable.SliceableForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.slice(start, stop, step=None)` | `ResultT` | Slice of self from start to stop, stepping by step. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

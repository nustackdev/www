---
title: refs.containers
description: "kv containers: collections whose elements each get an address of their own."
---

Module `nustd.kv.refs.containers`.

kv containers: collections whose elements each get an address of their own.

A container slot declares the value it holds, and that declaration types it
throughout. Descent (`ref[k]`, `ref[i]`, `ref.field`) lands on the kv ref
for the declared value, and every value an op reads is that value's form. A
container reads as a live View, so its collection ops run against storage.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [DictRef](#dictref) | `ref` | `DictRef(address, view_type=None, parent_ref=None, owner_shape=None)` | A mapping slot in KV storage, decomposed into a child per key. |
| [ListRef](#listref) | `ref` | `ListRef(address, view_type=None, parent_ref=None, owner_shape=None)` | An ordered list slot in KV storage, decomposed into per-index children. |
| [SetRef](#setref) | `ref` | `SetRef(address, view_type=None, parent_ref=None, owner_shape=None)` | A set slot in KV storage: unordered, unique elements, stored decomposed. |
| [ShapeRef](#shaperef) | `ref` | `ShapeRef(address, shape_type, parent_ref=None, owner_shape=None)` | A nested shape slot in KV storage: a fixed set of named fields. |

## DictRef

A mapping slot in KV storage, decomposed into a child per key.

```python
DictRef(address, view_type=None, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.DictRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Every value lives at its own address under the slot, so keys can be read,
written and watched one at a time without touching the rest. The declared
value picks the child: a core Python type lands on its kv leaf (`str` on
`StrRef`), a Shape on a `ShapeRef` for that shape, a kv leaf class on
itself, and anything else, a standard-library type included, on
`ObjectRef`.

**Notes**

- Ops run against the live View, so `len`, `contains` and `keys` are answered by storage rather than by materializing the mapping.
- Value reads (`get_item`, `pop`, `setdefault`) are the declared value's form, and `values`, `items` and `copy` carry the declared types on.
- A key vivifies on write: writing under a key that is not there yet creates it and every level above it.
- A key that has never been written reads as EMPTY; use `get_item` with a default when a fallback is wanted.
- The key may itself be an expression or a ref, including a ref from another fabric, so a lookup can be computed at run time.
- PrimitiveDictRef is the other choice: one opaque blob, no per-key addresses, but heterogeneous contents.

**Example**

```python
class Portfolio(Shape):
    owners = DictRef.slot(str)
    desks = DictRef.slot(Order)
run(Portfolio.owners["core"].set("gor"), ctx)
run(Portfolio.desks["desk-1"].symbol.set("SOL"), ctx)
```

**Methods**

### `.iter()`

A lazy stream over the keys, each the declared key's form.

Builds `Iterator[K]`.

Undocumented: example.

### `a[key]`

The kv ref for the declared value at `key`.

Builds `StructuredRef`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `object` |  |  |

Undocumented: example.

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

From `nu.domains.shape.collection.ReactiveCollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_child_change(address)` | `OnChildChange` | Observe writes at one child's own address; for its subtree use `on_descendants_change`. |
| `.on_children_change()` | `OnChildrenChange` | Observe writes at the direct children only; for subtrees use `on_descendants_change`. |
| `.on_descendants_change()` | `OnDescendantsChange` | Observe changes across descendants matching `pattern`. |

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

An ordered list slot in KV storage, decomposed into per-index children.

```python
ListRef(address, view_type=None, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.ListRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Every element lives at its own address under the slot, so the list can be
appended to, indexed and watched without reading the whole thing. The
declared value picks the child, as on a `DictRef`: indexing lands on
the kv ref for it, not on a plain value.

**Notes**

- Ops run against the live View, so `len` and `contains` are answered by storage instead of by materializing the list.
- Element reads (`first_elem`, `pop`) are the declared value's form; a slice is a value, a List carrying the declared type on.
- A position does not vivify: writing at an index the list does not reach raises IndexError, so append before assigning. Reading an out-of-range index yields EMPTY instead.
- Change observation covers the child, the children and the whole subtree, each with its own hook.
- PrimitiveListRef is the other choice: one opaque blob, no per-element addresses, but heterogeneous contents.

**Example**

```python
class Portfolio(Shape):
    tags = ListRef.slot(str)
    orders = ListRef.slot(Order)
run(Portfolio.tags.append("core"), ctx)
run(Portfolio.orders[0].symbol, ctx)
```

**Methods**

### `.iter()`

A lazy stream over the elements, each the declared value's form.

Builds `Iterator[T]`.

Undocumented: example.

### `a[key]`

The kv ref for the declared value at `index`; a slice is a List.

Builds `StructuredRef`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `index` | `object` |  |  |

Undocumented: example.

**Inherited methods**

From `nu.forms.collections.abc.sequence.ReactiveSequenceForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `object` | Subscribe to any change on this sequence slot. |

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

From `nu.domains.shape.collection.ReactiveCollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_child_change(address)` | `OnChildChange` | Observe writes at one child's own address; for its subtree use `on_descendants_change`. |
| `.on_children_change()` | `OnChildrenChange` | Observe writes at the direct children only; for subtrees use `on_descendants_change`. |
| `.on_descendants_change()` | `OnDescendantsChange` | Observe changes across descendants matching `pattern`. |

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

A set slot in KV storage: unordered, unique elements, stored decomposed.

```python
SetRef(address, view_type=None, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.SetRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Ops run against the live View, so membership and size are answered by storage rather than by reading the set out.
- Elements have no addresses of their own to descend into: a set has no keys, so there is no element ref and no subscript.
- The declared value types what comes out: `pop` is its form, and the set algebra (`union`, `intersection`, ...) yields a Set carrying it on. The in-place variants (`update`, `difference_update`, ...) are the ones that write.
- Change observation covers the child, the children and the whole subtree, each with its own hook.
- PrimitiveSetRef is the other choice: one opaque blob written whole.

**Example**

```python
class Portfolio(Shape):
    members = SetRef.slot(str)
run(Portfolio.members.add("gor"), ctx)
run(Portfolio.members.contains("gor"), ctx)
```

**Methods**

### `.iter()`

A lazy stream over the elements, each the declared value's form.

Builds `Iterator[T]`.

Undocumented: example.

**Inherited methods**

From `nu.forms.collections.abc.set_.ReactiveSetForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `object` | Subscribe to any change on this set slot. |

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

From `nu.domains.shape.collection.ReactiveCollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_child_change(address)` | `OnChildChange` | Observe writes at one child's own address; for its subtree use `on_descendants_change`. |
| `.on_children_change()` | `OnChildrenChange` | Observe writes at the direct children only; for subtrees use `on_descendants_change`. |
| `.on_descendants_change()` | `OnDescendantsChange` | Observe changes across descendants matching `pattern`. |

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

A nested shape slot in KV storage: a fixed set of named fields.

```python
ShapeRef(address, shape_type, parent_ref=None, owner_shape=None)
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

From `nu.domains.shape.collection.ReactiveCollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_child_change(address)` | `OnChildChange` | Observe writes at one child's own address; for its subtree use `on_descendants_change`. |
| `.on_children_change()` | `OnChildrenChange` | Observe writes at the direct children only; for subtrees use `on_descendants_change`. |
| `.on_descendants_change()` | `OnDescendantsChange` | Observe changes across descendants matching `pattern`. |

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

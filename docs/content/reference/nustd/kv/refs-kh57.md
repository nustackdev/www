---
title: refs.kh57
description: "Virtuals kh57 mapping reference: sparse int-keyed map with range sampling."
---

Module `nustd.kv.refs.kh57`.

Virtuals kh57 mapping reference: sparse int-keyed map with range sampling.

Thin extension of `DictRef` that pins keys to non-negative 57-bit ints,
defaults the view to `Kh57View`, and adds
`.sample(n, begin, end)` and `.range(begin, end)` on top of the standard
mapping surface. Physical storage lives under kh57-encoded child segments so
range reservoir sampling (`kh57.sample`) runs with low read amplification.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Kh57Ref](#kh57ref) | `ref` | `Kh57Ref(address, value_type, value_value_type, view_type=None, parent_ref=None, owner_shape=None)` | A sparse int-keyed mapping in KV storage, laid out for range sampling. |

## Kh57Ref

A sparse int-keyed mapping in KV storage, laid out for range sampling.

```python
Kh57Ref(address, value_type, value_value_type, view_type=None, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.Kh57Ref`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Same mapping surface as a dict slot, with the keys pinned to non-negative
57-bit ints and the physical layout encoded so that a sample or a scan
over a key range reads only that range. Built for the case where the map
holds billions of entries and the question is about a window of them.

**Notes**

- Keys are ints; a key outside the non-negative 57-bit range is out of contract.
- Iteration and `keys` come back in ascending key order, whatever order the writes happened in.
- `sample` and `range` are what the layout buys; everything else behaves as it does on a plain dict slot.
- Values are plain values here. Reach for Kh57ShapesRef when each entry should be a shape with fields of its own.

**Example**

```python
class Ledger(Shape):
    entries = Kh57Ref.slot(int)
run(Ledger.entries.set_item(42, 100), ctx)
run(Ledger.entries.sample(10, begin=0, end=1000), ctx)
```

**Methods**

### `.sample(n, begin=None, end=None)`

Draw a uniform sample of up to `n` entries from a key range.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `n` | `IntArg` |  | the ceiling on how many pairs come back. A range holding fewer than `n` entries yields all of them. |
| `begin` | `IntArg \| None` | `None` | inclusive lower bound on the key. None leaves the range open at the bottom. |
| `end` | `IntArg \| None` | `None` | exclusive upper bound on the key. None leaves the range open at the top. |

**Yields**

A list of `(int_key, value)` pairs, unordered. EMPTY when the
container is not reachable.

**Notes**

- Cost tracks `n`, not the size of the range, so a window holding a billion entries samples as cheaply as a small one.
- Each argument is a child, so any of them may be an expression or a ref read at run time.
- Draws from the unseeded module random source. Build the Kh57Sample atom directly with its `rng` argument when a run has to be reproducible.
- Stable under appends outside the queried range.

**Example**

```python
run(Ledger.entries.sample(100, begin=0, end=10_000), ctx)
```

### `.range(begin, end)`

Read a key range whole, in ascending key order.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `begin` | `IntArg` |  | inclusive lower bound on the key. Must be non-negative. |
| `end` | `IntArg` |  | exclusive upper bound on the key. Must stay inside the key space the container's layout covers. |

**Yields**

A list of `(int_key, value)` pairs, ascending by key. EMPTY
when the container is not reachable.

**Notes**

- Cost tracks the size of the range, so this is the wrong call for a window that grows without bound; sample that instead.
- Both bounds are required, unlike on `sample`, and both are children, so either may be computed at run time.
- An empty or inverted range yields an empty list rather than an error; bounds outside the key space raise ValueError.

**Example**

```python
run(Ledger.entries.range(0, 100), ctx)
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

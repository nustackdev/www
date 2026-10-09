---
title: refs.list
description: "Virtuals sequence reference: ordered container backed by a virtuals View."
---

Module `nustd.kv.refs.list`.

Virtuals sequence reference: ordered container backed by a virtuals View.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ListRef](#listref) | `ref` | `ListRef(address, item_type, item_value_type, view_type, parent_ref=None, owner_shape=None)` | An ordered list slot in KV storage, decomposed into per-index children. |

## ListRef

An ordered list slot in KV storage, decomposed into per-index children.

```python
ListRef(address, item_type, item_value_type, view_type, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.ListRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Every element lives at its own address under the slot, so the list can be
appended to, indexed and watched without reading the whole thing. The
element type is fixed at declaration, and indexing descends to a leaf ref
of that type rather than to a plain value.

**Notes**

- Ops run against the live View, so `len` and `contains` are answered by storage instead of by materializing the list.
- Indexing yields a leaf ref, which is what makes `ref[0].set(...)` and `ref[0].on_change()` possible.
- Slices stay materialized: a slice is a value, not a ref.
- A position does not vivify: writing at an index the list does not reach raises IndexError, so append before assigning. Reading an out-of-range index yields EMPTY instead.
- Change observation covers the child, the children and the whole subtree, each with its own hook.
- PrimitiveListRef is the other choice: one opaque blob, no per-element addresses, but heterogeneous contents.

**Example**

```python
class Portfolio(Shape):
    tags = ListRef.slot(str)
run(Portfolio.tags.append("core"), ctx)
run(Portfolio.tags[0], ctx)
```

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
| `.remove(value)` | `Any` | Remove the first occurrence of value. |
| `.reverse()` | `Any` | Reverse self in place. |
| `.sort()` | `Any` | Sort self in place, ascending, using the elements' natural order. |
| `.copy()` | `CollectionResultT` | Shallow copy of self: a new sequence with the same elements. |
| `.clear()` | `Any` | Remove every element from self. |

From `nu.domains.shape.refs.sequence.SequenceRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `ItemResultT` | Int index navigates to the child Ref; slice routes to the form-level slice op. |

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

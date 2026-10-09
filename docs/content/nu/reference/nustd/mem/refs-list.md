---
title: refs.list
description: "Dict sequence reference: ordered container backed by nested list."
---

Module `nustd.mem.refs.list`.

Dict sequence reference: ordered container backed by nested list.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ListRef](#listref) | `ref` | `ListRef(address, item_type, item_value_type, parent_ref=None, owner_shape=None)` | A sequence slot in the dict substrate, holding one plain list of values. |

## ListRef

A sequence slot in the dict substrate, holding one plain list of values.

```python
ListRef(address, item_type, item_value_type, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.ListRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Subscripting with an int descends rather than reads: `ref[i]` is an
`ItemRef` at that index inside the stored list, settable and erasable on
its own. A slice instead routes to the sequence-level `slice` call and
yields a new list.

**Notes**

- The stored value is an ordinary list and a read hands back that live object, so a mutation through the ref is visible to anyone else holding it.
- In-place calls read the container first and do nothing when the slot is absent, so `set` an empty list before the first `append`.
- The declared element type is metadata; nothing coerces or rejects what is written.

**Example**

```python
class Port(nu.Shape):
    tags = nustd.mem.ListRef.slot(str)
data = {"tags": ["a"]}
ctx = nu.Context().bind(dict, data, Port)
_ = nu.run(Port.tags.append("b"), ctx)
nu.run(Port.tags[1], ctx)[0]
data
```

```
'b'
{'tags': ['a', 'b']}
```

**Inherited methods**

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

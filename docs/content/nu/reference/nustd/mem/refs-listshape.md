---
title: refs.listshape
description: "Dict shapes list reference: sequence of homogeneous shapes."
---

Module `nustd.mem.refs.listshape`.

Dict shapes list reference: sequence of homogeneous shapes.

Index descent (`ref[i]`) is the blueprint's `__getitem__`: it returns a
`ShapeRef` at the index with this ref as `parent_ref`. The element shape type
is passed to the blueprint as `item_shape_type`.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ShapesListRef](#shapeslistref) | `ref` | `ShapesListRef(address, shape_type, parent_ref=None, owner_shape=None)` | A list of one Shape's records, stored as a plain list of inner dicts. |

## ShapesListRef

A list of one Shape's records, stored as a plain list of inner dicts.

```python
ShapesListRef(address, shape_type, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.ShapesListRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Subscripting descends: `ref[i]` is a `ShapeRef` at that index holding
the element Shape, so `rows[0].symbol` is a full path down to a leaf and
nothing is read until the whole chain runs.

**Notes**

- Elements are plain dicts, so a record is appended by appending a dict, not a Shape instance.
- In-place calls read the container first and do nothing when the slot is absent, so `set` an empty list before the first `append`.
- An index past the end reads EMPTY rather than raising, like any other broken path.

**Example**

```python
class Order(nu.Shape):
    symbol = nustd.mem.StrRef.slot()
class Book(nu.Shape):
    rows = nustd.mem.ShapesListRef.slot(Order)
ctx = nu.Context().bind(dict, {"rows": [{"symbol": "AAPL"}]}, Book)
nu.run(Book.rows[0].symbol, ctx)[0]
```

```
'AAPL'
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

From `nu.domains.shape.refs.shapes_sequence.ShapesSequenceRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `ItemResultT` | Int index navigates to the child ShapeRef; slice routes to the form-level slice op. |

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

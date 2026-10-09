---
title: refs.shapes_sequence
description: "ShapesSequenceRef hierarchy: sequence-of-shapes Ref + Form mixin tiers."
---

Module `nu.domains.shape.refs.shapes_sequence`.

ShapesSequenceRef hierarchy: sequence-of-shapes Ref + Form mixin tiers.

ShapesSequenceRef         = shape.SequenceForm + StructuredRef
    MutableShapesSequenceRef  = shape.MutableSequenceForm + ShapesSequenceRef
    ReactiveShapesSequenceRef = shape.ReactiveSequenceForm + MutableShapesSequenceRef

shape.SequenceForm already composes generic SequenceForm + shape CollectionForm,
so exists()/missing()/extract()/store()/erase() are all present without a
separate ItemForm in the MRO.

Subscript access (`ref[i]`) returns a matching-tier ShapeRef whose address
is the index. The element shape type is fixed at construction via
`item_shape_type`.

Form composition provides:
    base:     len(), contains(), iter(), [i], first_elem(), last_elem(), ...,
              exists(), missing(), extract()
    mutable:  + append(v), extend(), insert(i,v), pop(), ..., store(v), erase()
    reactive: + on_change() (generic), on_child_change(), on_children_change(),
                on_descendants_change() (shape-domain)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [MutableShapesSequenceRef](#mutableshapessequenceref) | `ref` | `MutableShapesSequenceRef(address, item_shape_type, parent_ref=None, owner_shape=None)` | Mutable sequence-of-shapes Ref; subscript returns MutableShapeRef. |
| [ReactiveShapesSequenceRef](#reactiveshapessequenceref) | `ref` | `ReactiveShapesSequenceRef(address, item_shape_type, parent_ref=None, owner_shape=None)` | Reactive sequence-of-shapes Ref; subscript returns ReactiveShapeRef. |
| [ShapesSequenceRef](#shapessequenceref) | `ref` | `ShapesSequenceRef(address, item_shape_type, parent_ref=None, owner_shape=None)` | Sequence-of-shapes Ref; subscript descent returns a ShapeRef. |

## MutableShapesSequenceRef

Mutable sequence-of-shapes Ref; subscript returns MutableShapeRef.

```python
MutableShapesSequenceRef(address, item_shape_type, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.MutableShapesSequenceRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Adds: append(v), extend(), insert(i,v), pop(), ..., store(v), erase().

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

Undocumented: example.

## ReactiveShapesSequenceRef

Reactive sequence-of-shapes Ref; subscript returns ReactiveShapeRef.

```python
ReactiveShapesSequenceRef(address, item_shape_type, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.ReactiveShapesSequenceRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Adds: on_change(), on_child_change(), on_children_change(),
on_descendants_change().

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

Undocumented: example.

## ShapesSequenceRef

Sequence-of-shapes Ref; subscript descent returns a ShapeRef.

```python
ShapesSequenceRef(address, item_shape_type, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.ShapesSequenceRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Navigation is defined ONCE (`__getitem__`) and routes through
`_wrap_item_ref`; each tier defaults to the matching-tier ShapeRef, and
substrates override it (binding `ItemResultT`) to return their own ShapeRef.

**Methods**

### `a[key]`

Int index navigates to the child ShapeRef; slice routes to the form-level slice op.

Builds `ItemResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `index` | `object` |  |  |

Undocumented: example.

**Inherited methods**

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

Undocumented: example.

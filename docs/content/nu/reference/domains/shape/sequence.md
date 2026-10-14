---
title: sequence
description: "Sequence family: an ordered collection in a shape fabric."
---

Module `nu.domains.shape.sequence`.

Sequence family: an ordered collection in a shape fabric.

Forms weave the Python sequence surface with the shape collection ops, tier by
tier, and type every result by what the slot declared: an element reads as the
declared value's form, and a slice carries the declared element type on.

Refs add descent. `ref[i]` is the child ref at that position, built by the
fabric from the declared value; a slice stays a value.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [MutableSequenceRef](#mutablesequenceref) | `ref` | `MutableSequenceRef(address, parent_ref=None, owner_shape=None)` | Mutable ordered container Ref. |
| [ReactiveSequenceRef](#reactivesequenceref) | `ref` | `ReactiveSequenceRef(address, parent_ref=None, owner_shape=None)` | Reactive ordered container Ref. |
| [SequenceRef](#sequenceref) | `ref` | `SequenceRef(address, parent_ref=None, owner_shape=None)` | Ordered container Ref; `ref[i]` navigates to the element's child Ref. |

## MutableSequenceRef

Mutable ordered container Ref.

```python
MutableSequenceRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.MutableSequenceRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

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
| `.remove(value, missing_ok=False)` | `Any` | Remove the first occurrence of value. |
| `.reverse()` | `Any` | Reverse self in place. |
| `.sort()` | `Any` | Sort self in place, ascending, using the elements' natural order. |
| `.copy()` | `CollectionResultT` | Shallow copy of self: a new sequence with the same elements. |
| `.clear()` | `Any` | Remove every element from self. |

From `nu.domains.shape.sequence.SequenceRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `StructuredRef` | Int index navigates to the child Ref; slice routes to the form-level slice op. |

From `nu.domains.shape.sequence.SequenceForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.iter()` | `Iterator` | A lazy stream over its elements, typed by the declared value. |

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

Undocumented: example.

## ReactiveSequenceRef

Reactive ordered container Ref.

```python
ReactiveSequenceRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.ReactiveSequenceRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Adds: on_change(), on_child_change(), on_children_change(),
on_descendants_change() on top of MutableSequenceRef.

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

From `nu.domains.shape.sequence.SequenceRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `StructuredRef` | Int index navigates to the child Ref; slice routes to the form-level slice op. |

From `nu.domains.shape.sequence.SequenceForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.iter()` | `Iterator` | A lazy stream over its elements, typed by the declared value. |

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

Undocumented: example.

## SequenceRef

Ordered container Ref; `ref[i]` navigates to the element's child Ref.

```python
SequenceRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.SequenceRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Navigation is defined once here and routes through `_wrap_item_ref`, the
one hook that returns a ref rather than a form. It is a substrate plug-point
on `StructuredRef`: the child is always a fabric's own ref, so the fabric's
substrate base supplies it, and a fabric that leaves it out fails loudly.

**Methods**

### `a[key]`

Int index navigates to the child Ref; slice routes to the form-level slice op.

Builds `StructuredRef`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `index` | `object` |  |  |

Undocumented: example.

**Inherited methods**

From `nu.domains.shape.sequence.SequenceForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.iter()` | `Iterator` | A lazy stream over its elements, typed by the declared value. |

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

Undocumented: example.

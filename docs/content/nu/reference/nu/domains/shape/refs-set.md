---
title: refs.set_
description: "SetRef hierarchy: unordered unique-element container Ref + Form mixin tiers."
---

Module `nu.domains.shape.refs.set_`.

SetRef hierarchy: unordered unique-element container Ref + Form mixin tiers.

SetRef         = shape.SetLikeForm + StructuredRef
    MutableSetRef  = shape.MutableSetForm + SetRef
    ReactiveSetRef = shape.ReactiveSetForm + MutableSetRef

shape.SetLikeForm already composes generic SetLikeForm + shape CollectionForm,
so exists()/missing()/extract()/store()/erase() are all present without a
separate ItemForm in the MRO.

Sets have no subscript navigation (no child descent); semantics are membership
and set-algebra. Slot-level operations still apply.

Form composition provides:
    base:     len(), contains(), iter(), union(), intersection(), ...,
              exists(), missing(), extract()
    mutable:  + add(v), remove(v), discard(v), pop(), ..., store(v), erase()
    reactive: + on_change() (generic), on_child_change(), on_children_change(),
                on_descendants_change() (shape-domain)

The `_wrap_*` abstract methods from SetLikeForm are left un-overridden
(raise NotImplementedError) in these blueprints. Substrate subclasses fill
them in.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [MutableSetRef](#mutablesetref) | `ref` | `MutableSetRef(address, parent_ref=None, owner_shape=None)` | Mutable unordered unique-element container Ref. |
| [ReactiveSetRef](#reactivesetref) | `ref` | `ReactiveSetRef(address, parent_ref=None, owner_shape=None)` | Reactive unordered unique-element container Ref. |
| [SetRef](#setref) | `ref` | `SetRef(address, parent_ref=None, owner_shape=None)` | Unordered unique-element container Ref; no child descent. |

## MutableSetRef

Mutable unordered unique-element container Ref.

```python
MutableSetRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.MutableSetRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Adds: add(v), remove(v), discard(v), pop(), update(), ..., store(v), erase().

**Inherited methods**

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

## ReactiveSetRef

Reactive unordered unique-element container Ref.

```python
ReactiveSetRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.ReactiveSetRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Adds: on_change(), on_child_change(), on_children_change(),
on_descendants_change() on top of MutableSetRef.

**Inherited methods**

From `nu.forms.collections.abc.set_.ReactiveSetForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `object` | Subscribe to any change on this set slot. |

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

## SetRef

Unordered unique-element container Ref; no child descent.

```python
SetRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.SetRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

SetLikeForm surface (len, contains, union, intersection, exists, missing, ...)
is available; methods that require _wrap_* overrides raise NotImplementedError
on this blueprint.

**Inherited methods**

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

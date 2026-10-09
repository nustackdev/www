---
title: refs.set
description: "Dict set reference: unordered unique-element container."
---

Module `nustd.mem.refs.set`.

Dict set reference: unordered unique-element container.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [SetRef](#setref) | `ref` | `SetRef(address, item_type, parent_ref=None, owner_shape=None)` | A set slot in the dict substrate, holding one plain set of values. |

## SetRef

A set slot in the dict substrate, holding one plain set of values.

```python
SetRef(address, item_type, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.SetRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

No descent: a set has no addresses, so there is no child ref to navigate
to. Everything happens through the set calls - membership, the algebra
(`union`, `difference`, ...), and the in-place mutations.

**Notes**

- The stored value is an ordinary set and a read hands back that live object, so elements must be hashable and iteration order is whatever Python gives.
- In-place calls read the container first and do nothing when the slot is absent, so `set` an empty set before the first `add`.
- The declared element type is metadata; nothing coerces or rejects what is written.

**Example**

```python
class Port(nu.Shape):
    members = nustd.mem.SetRef.slot(str)
ctx = nu.Context().bind(dict, {"members": {"a"}}, Port)
_ = nu.run(Port.members.add("b"), ctx)
sorted(nu.run(Port.members, ctx)[0])
```

```
['a', 'b']
```

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

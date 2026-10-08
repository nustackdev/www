---
title: set_
description: "Set collection: bases + mutations."
---

Module `nu.forms.collections.abc.set_`.

Set collection: bases + mutations.

SetLikeForm = Collection + union/intersection/difference/symmetric_difference/issubset/issuperset/isdisjoint
    + copy + __or__/__and__/__sub__/__xor__
MutableSetForm = SetLike + add/remove/discard/pop/clear/update/*_update + __ior__/__iand__/__isub__/__ixor__

Follows Python's collections.abc.Set / MutableSet pattern.

| Name | Call | Meaning |
| --- | --- | --- |
| [MutableSetForm](#mutablesetform) | `MutableSetForm()` | Base for mutable set values, like collections.abc.MutableSet. |
| [ReactiveSetForm](#reactivesetform) | `ReactiveSetForm()` | Reactive set. Adds on_change() for any-change observation. |
| [SetLikeForm](#setlikeform) | `SetLikeForm()` | Base for set values, like collections.abc.Set. |

## MutableSetForm

Base for mutable set values, like collections.abc.MutableSet.

```python
MutableSetForm()
```

Path `nu.forms.collections.abc.MutableSetForm`.

Adds add/remove/discard/pop/clear/update/*_update and the in-place
operators |= &= -= ^= on top of SetLikeForm.

**Notes**

- Every mutating method needs self bound to a Ref inside a shape; none of them run on a bare set literal.

**Methods**

### `.add(value)`

Add value to self.

Builds `Any`.

Example:
my_set.add(4)

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[ElementT]` |  | the element to add. |

**Yields**

Nothing (Command). Mutates self in place.

**Notes**

- A no-op if value is already present, matching Python's `set.add`.

Undocumented: example.

### `.remove(value)`

Remove value from self.

Builds `Any`.

Example:
my_set.remove(4)

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[ElementT]` |  | the element to remove. |

**Yields**

Nothing (Command). Mutates self in place. Raises at
evaluation time when value is not in self.

**Notes**

- Raises at evaluation time when value is absent. Use `discard` when a missing value shouldn't raise.

Undocumented: example.

### `.discard(value)`

Remove value from self if present.

Builds `Any`.

Example:
my_set.discard(4)

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[ElementT]` |  | the element to remove. |

**Yields**

Nothing (Command). Mutates self in place.

**Notes**

- Unlike `remove`, a missing value is not an error.

Undocumented: example.

### `.pop()`

Remove and return an arbitrary element from self.

Builds `ElementResultT`.

Example:
my_set.pop()

**Yields**

The removed element. Mutates self in place. Raises at
evaluation time when self is empty.

**Notes**

- Which element comes out is unspecified; do not rely on an order.
- Raises at evaluation time when self is empty.

Undocumented: example.

### `.clear()`

Remove every element from self.

Builds `Any`.

Example:
my_set.clear()

**Yields**

Nothing (Command). Mutates self in place, leaving it empty.

Undocumented: example.

### `.update(other)`

Add every element of other to self.

Builds `Any`.

Example:
my_set.update({4, 5})

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[set[ElementT] \| frozenset[ElementT]]` |  | the set whose elements are added to self. |

**Yields**

Nothing (Command). Mutates self in place.

Undocumented: example.

### `.intersection_update(other)`

Keep only the elements of self also found in other.

Builds `Any`.

Example:
my_set.intersection_update({2, 3})

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[set[ElementT] \| frozenset[ElementT]]` |  | the set to intersect self with. |

**Yields**

Nothing (Command). Mutates self in place.

Undocumented: example.

### `.difference_update(other)`

Remove every element of other from self.

Builds `Any`.

Example:
my_set.difference_update({2, 3})

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[set[ElementT] \| frozenset[ElementT]]` |  | the set of elements to remove from self. |

**Yields**

Nothing (Command). Mutates self in place.

Undocumented: example.

### `.symmetric_difference_update(other)`

Keep the elements in exactly one of self and other.

Builds `Any`.

Example:
my_set.symmetric_difference_update({2, 4})

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[set[ElementT] \| frozenset[ElementT]]` |  | the set to compare self against. |

**Yields**

Nothing (Command). Mutates self in place.

Undocumented: example.

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

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

From `builtins.object`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a < b` |  | Return self<value. |
| `a <= b` |  | Return self<=value. |
| `a == b` |  | Return self==value. |
| `a != b` |  | Return self!=value. |
| `a > b` |  | Return self>value. |
| `a >= b` |  | Return self>=value. |

Undocumented: example.

## ReactiveSetForm

Reactive set. Adds on_change() for any-change observation.

```python
ReactiveSetForm()
```

Path `nu.forms.collections.abc.ReactiveSetForm`.

Example:
my_set.on_change()

**Notes**

- The three tree-aware methods (on_child_change, on_children_change, on_descendants_change) are shape-domain and live on `nu.domains.shape.forms.collection.ReactiveCollectionForm`, not here.

**Methods**

### `.on_change()`

Subscribe to any change on this set slot.

Builds `object`.

Example:
my_set.on_change()

**Yields**

An OnChange observable that fires whenever self changes.

Undocumented: example.

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

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

From `builtins.object`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a < b` |  | Return self<value. |
| `a <= b` |  | Return self<=value. |
| `a == b` |  | Return self==value. |
| `a != b` |  | Return self!=value. |
| `a > b` |  | Return self>value. |
| `a >= b` |  | Return self>=value. |

Undocumented: example.

## SetLikeForm

Base for set values, like collections.abc.Set.

```python
SetLikeForm()
```

Path `nu.forms.collections.abc.SetLikeForm`.

Ops: union, intersection, difference, symmetric_difference, issubset,
issuperset, isdisjoint, copy, and operators | & - ^.

**Notes**

- Subclasses (e.g. `Set`) must implement `_wrap_set_result` to wrap a query result in their own concrete set type.
- Every op accepts a plain Python `set`/`frozenset` or another set-like form as the right operand.

**Example**

```python
nu.run(nu.Set({1, 2}).union({2, 3}))[0]
```

```
{1, 2, 3}
```

**Methods**

### `.union(other)`

Union of self and other.

Builds `CollectionResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[set[ElementT] \| frozenset[ElementT]]` |  | the set to union with self. |

**Yields**

A new set with every element from self and other. INVALID
when self or other is a sentinel.

**Example**

```python
nu.run(nu.Set({1, 2}).union({2, 3}))[0]
```

```
{1, 2, 3}
```

### `.intersection(other)`

Intersection of self and other.

Builds `CollectionResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[set[ElementT] \| frozenset[ElementT]]` |  | the set to intersect with self. |

**Yields**

A new set with only the elements found in both. INVALID when
self or other is a sentinel.

**Example**

```python
nu.run(nu.Set({1, 2, 3}).intersection({2, 3, 4}))[0]
```

```
{2, 3}
```

### `.difference(other)`

Elements of self that are not in other.

Builds `CollectionResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[set[ElementT] \| frozenset[ElementT]]` |  | the set to subtract from self. |

**Yields**

A new set with the elements of self minus the elements of
other. INVALID when self or other is a sentinel.

**Example**

```python
nu.run(nu.Set({1, 2, 3}).difference({2, 3}))[0]
```

```
{1}
```

### `.symmetric_difference(other)`

Elements in exactly one of self and other, not both.

Builds `CollectionResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[set[ElementT] \| frozenset[ElementT]]` |  | the set to compare against self. |

**Yields**

A new set with the elements that are in self or other but not
in both. INVALID when self or other is a sentinel.

**Example**

```python
nu.run(nu.Set({1, 2, 3}).symmetric_difference({2, 3, 4}))[0]
```

```
{1, 4}
```

### `.issubset(other)`

Whether every element of self is in other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[set[ElementT] \| frozenset[ElementT]]` |  | the set to test self against. |

**Yields**

True when self is a subset of other (equal sets count), False
otherwise. INVALID when self or other is a sentinel.

**Example**

```python
nu.run(nu.Set({1, 2, 3}).issubset({1, 2, 3, 4}))[0]
```

```
True
```

### `.issuperset(other)`

Whether every element of other is in self.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[set[ElementT] \| frozenset[ElementT]]` |  | the set to test against self. |

**Yields**

True when self is a superset of other (equal sets count),
False otherwise. INVALID when self or other is a sentinel.

**Example**

```python
nu.run(nu.Set({1, 2, 3}).issuperset({1, 2}))[0]
```

```
True
```

### `.isdisjoint(other)`

Whether self and other share no elements.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[set[ElementT] \| frozenset[ElementT]]` |  | the set to test against self. |

**Yields**

True when self and other have no elements in common, False
otherwise. INVALID when self or other is a sentinel.

**Example**

```python
nu.run(nu.Set({1, 2, 3}).isdisjoint({9, 10}))[0]
```

```
True
```

### `.copy()`

Shallow copy of self.

Builds `CollectionResultT`.

**Yields**

A new set with the same elements as self. INVALID when self
is a sentinel.

**Example**

```python
nu.run(nu.Set({1, 2, 3}).copy())[0]
```

```
{1, 2, 3}
```

### `a | b`

Union: self | other.

Builds `CollectionResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[set[ElementT] \| frozenset[ElementT]]` |  | the set to union with self. |

**Yields**

A new set with every element from self and other, same as
`union`. INVALID when self or other is a sentinel.

**Example**

```python
nu.run(nu.Set({1, 2, 3}) | {4, 5})[0]
```

```
{1, 2, 3, 4, 5}
```

### `a & b`

Intersection: self & other.

Builds `CollectionResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[set[ElementT] \| frozenset[ElementT]]` |  | the set to intersect with self. |

**Yields**

A new set with only the elements found in both, same as
`intersection`. INVALID when self or other is a sentinel.

**Example**

```python
nu.run(nu.Set({1, 2, 3}) & {2, 3})[0]
```

```
{2, 3}
```

### `a - b`

Difference: self - other.

Builds `CollectionResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[set[ElementT] \| frozenset[ElementT]]` |  | the set to subtract from self. |

**Yields**

A new set with the elements of self minus other, same as
`difference`. INVALID when self or other is a sentinel.

**Example**

```python
nu.run(nu.Set({1, 2, 3}) - {2})[0]
```

```
{1, 3}
```

### `a ^ b`

Symmetric difference: self ^ other.

Builds `CollectionResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[set[ElementT] \| frozenset[ElementT]]` |  | the set to compare against self. |

**Yields**

A new set with the elements in self or other but not both,
same as `symmetric_difference`. INVALID when self or other is
a sentinel.

**Example**

```python
nu.run(nu.Set({1, 2, 3}) ^ {2, 4})[0]
```

```
{1, 3, 4}
```

**Inherited methods**

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

From `builtins.object`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a < b` |  | Return self<value. |
| `a <= b` |  | Return self<=value. |
| `a == b` |  | Return self==value. |
| `a != b` |  | Return self!=value. |
| `a > b` |  | Return self>value. |
| `a >= b` |  | Return self>=value. |

---
title: collections.set_
description: "Set, FrozenSet - set interfaces."
---

Module `nu.forms.collections.set_`.

Set, FrozenSet - set interfaces.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [FrozenSet](#frozenset) | `scalar_query` | `FrozenSet()` | FrozenSet interface. Immutable set + comparable. |
| [Set](#set) | `scalar_query` | `Set()` | Set interface. Mutable set + comparable. |

## FrozenSet

FrozenSet interface. Immutable set + comparable.

```python
FrozenSet()
```

Path `nu.forms.FrozenSet`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Notes**

- Iteration order is arbitrary, matching Python's `frozenset`.
- `>`, `<`, `>=`, `<=` are subset/superset relations, not size comparisons. `union`, `intersection`, `difference`, `symmetric_difference` and the operators `|`, `&`, `-`, `^` live on the shared set base, not on this class.
- No `add`/`remove`/`update`/... unlike `Set`: a FrozenSet can't be mutated in place.

**Example**

```python
nu.run(nu.FrozenSet.of(1, 2, 3))[0]
```

```
frozenset({1, 2, 3})
```

**Methods**

### `FrozenSet.create()`

Build an empty frozenset.

Builds `FrozenSet[T]`.

**Yields**

An empty FrozenSet.

**Example**

```python
nu.run(nu.FrozenSet.create())[0]
```

```
frozenset()
```

### `FrozenSet.of(*items)`

Build a frozenset from positional item expressions.

Builds `FrozenSet`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*items` |  |  | expressions to evaluate and fold into the frozenset, in any order. |

**Yields**

A fresh FrozenSet holding the evaluated items. INVALID when any
item is a sentinel.

**Notes**

- Sibling to `Set.of`. Duplicate values collapse, same as Python `frozenset` construction.

**Example**

```python
nu.run(nu.FrozenSet.of(1, 2, 2, 3))[0]
```

```
frozenset({1, 2, 3})
```

### `a > b`

Self is a proper superset of other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FrozenSetArg[T]` |  | the set to compare against. |

**Yields**

True when self contains every element of other and at least one
more, False otherwise. INVALID when either operand is a
sentinel.

**Example**

```python
nu.run(nu.FrozenSet.of(1, 2, 3) > nu.FrozenSet.of(1, 2))[0]
```

```
True
```

### `a < b`

Self is a proper subset of other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FrozenSetArg[T]` |  | the set to compare against. |

**Yields**

True when every element of self is in other and other has at
least one more, False otherwise. INVALID when either operand is
a sentinel.

**Example**

```python
nu.run(nu.FrozenSet.of(1, 2) < nu.FrozenSet.of(1, 2, 3))[0]
```

```
True
```

### `a >= b`

Self is a superset of other, or equal.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FrozenSetArg[T]` |  | the set to compare against. |

**Yields**

True when every element of other is in self, False otherwise.
INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.FrozenSet.of(1, 2) >= nu.FrozenSet.of(1, 2))[0]
```

```
True
```

### `a <= b`

Self is a subset of other, or equal.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FrozenSetArg[T]` |  | the set to compare against. |

**Yields**

True when every element of self is in other, False otherwise.
INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.FrozenSet.of(1, 2) <= nu.FrozenSet.of(1, 2))[0]
```

```
True
```

### `a == b`

Self equal to other by value.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FrozenSetArg[T]` |  | the set to compare against. |

**Yields**

True when the sets hold the same elements, False otherwise.
INVALID when either operand is a sentinel.

**Notes**

- Value equality, not identity. Use `is_` for identity. Two sets compare equal regardless of insertion or iteration order.

**Example**

```python
nu.run(nu.FrozenSet.of(1, 2) == nu.FrozenSet.of(2, 1))[0]
```

```
True
```

### `a != b`

Self not equal to other by value.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FrozenSetArg[T]` |  | the set to compare against. |

**Yields**

True when the sets differ, False otherwise. INVALID when either
operand is a sentinel.

**Notes**

- Value inequality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.FrozenSet.of(1, 2) != nu.FrozenSet.of(1, 3))[0]
```

```
True
```

### `.is_(other)`

Identity comparison: self is other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FrozenSetArg[T]` |  | the value to compare identity against. |

**Yields**

True when self and other evaluate to the same Python object,
False otherwise.

**Notes**

- Object identity, not value equality. For value comparison use `==` instead.

**Example**

```python
nu.run(nu.FrozenSet.of(1, 2).is_(nu.FrozenSet.of(1, 2)))[0]
```

```
False
```

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

## Set

Set interface. Mutable set + comparable.

```python
Set()
```

Path `nu.forms.Set`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Notes**

- Iteration order is arbitrary, matching Python's `set`. Don't rely on insertion order surviving a round trip.
- `>`, `<`, `>=`, `<=` are subset/superset relations, not size comparisons: `a > b` means a is a proper superset of b, not that a has more elements. `union`, `intersection`, `difference`, `symmetric_difference` and the operators `|`, `&`, `-`, `^` live on the shared set base, not on this class.
- Mutating ops (`add`, `remove`, `discard`, `pop`, `clear`, `update`, ...) live on the shared mutable-set base too.

**Example**

```python
nu.run(nu.Set.of(1, 2, 3))[0]
```

```
{1, 2, 3}
```

**Methods**

### `Set.create()`

Build a fresh empty set.

Builds `Set[T]`.

**Yields**

An empty Set.

**Example**

```python
nu.run(nu.Set.create())[0]
```

```
set()
```

### `Set.of(*items)`

Build a set from positional item expressions.

Builds `Set`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*items` |  |  | expressions to evaluate and fold into the set, in any order. |

**Yields**

A fresh Set holding the evaluated items. INVALID when any item
is a sentinel.

**Notes**

- Sibling to `List.of` / `Tuple.of`. Duplicate values collapse, same as Python `set` construction.

**Example**

```python
nu.run(nu.Set.of(1, 2, 2, 3))[0]
```

```
{1, 2, 3}
```

### `a > b`

Self is a proper superset of other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `SetArg[T]` |  | the set to compare against. |

**Yields**

True when self contains every element of other and at least one
more, False otherwise. INVALID when either operand is a
sentinel.

**Example**

```python
nu.run(nu.Set.of(1, 2, 3) > nu.Set.of(1, 2))[0]
```

```
True
```

### `a < b`

Self is a proper subset of other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `SetArg[T]` |  | the set to compare against. |

**Yields**

True when every element of self is in other and other has at
least one more, False otherwise. INVALID when either operand is
a sentinel.

**Example**

```python
nu.run(nu.Set.of(1, 2) < nu.Set.of(1, 2, 3))[0]
```

```
True
```

### `a >= b`

Self is a superset of other, or equal.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `SetArg[T]` |  | the set to compare against. |

**Yields**

True when every element of other is in self, False otherwise.
INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.Set.of(1, 2) >= nu.Set.of(1, 2))[0]
```

```
True
```

### `a <= b`

Self is a subset of other, or equal.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `SetArg[T]` |  | the set to compare against. |

**Yields**

True when every element of self is in other, False otherwise.
INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.Set.of(1, 2) <= nu.Set.of(1, 2))[0]
```

```
True
```

### `a == b`

Self equal to other by value.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `SetArg[T]` |  | the set to compare against. |

**Yields**

True when the sets hold the same elements, False otherwise.
INVALID when either operand is a sentinel.

**Notes**

- Value equality, not identity. Use `is_` for identity. Two sets compare equal regardless of insertion or iteration order.

**Example**

```python
nu.run(nu.Set.of(1, 2) == nu.Set.of(2, 1))[0]
```

```
True
```

### `a != b`

Self not equal to other by value.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `SetArg[T]` |  | the set to compare against. |

**Yields**

True when the sets differ, False otherwise. INVALID when either
operand is a sentinel.

**Notes**

- Value inequality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.Set.of(1, 2) != nu.Set.of(1, 3))[0]
```

```
True
```

### `.is_(other)`

Identity comparison: self is other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `SetArg[T]` |  | the value to compare identity against. |

**Yields**

True when self and other evaluate to the same Python object,
False otherwise.

**Notes**

- Object identity, not value equality. For value comparison use `==` instead.

**Example**

```python
nu.run(nu.Set.of(1, 2).is_(nu.Set.of(1, 2)))[0]
```

```
False
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

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

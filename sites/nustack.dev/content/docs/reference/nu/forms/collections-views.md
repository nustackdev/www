---
title: collections.views
description: "Dict view interfaces - DictKeys, DictValues, DictItems."
---

Module `nu.forms.collections.views`.

Dict view interfaces - DictKeys, DictValues, DictItems.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [DictItems](#dictitems) | `scalar_query` | `DictItems()` | View of a Dict's `(key, value)` pairs, produced by `dict.items()`. |
| [DictKeys](#dictkeys) | `scalar_query` | `DictKeys()` | View of a Dict's keys, produced by `dict.keys()`. |
| [DictValues](#dictvalues) | `scalar_query` | `DictValues()` | View of a Dict's values, produced by `dict.values()`. |

## DictItems

View of a Dict's `(key, value)` pairs, produced by `dict.items()`.

```python
DictItems()
```

Path `nu.forms.DictItems`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Notes**

- Set-like: `union`, `intersection`, `difference`, `issubset`, and the `| & - ^` operators all work on it directly, matching Python's `dict.items()` when the values are hashable.
- Lazy and live: it holds no items of its own, it re-reads the backing Dict on every evaluation. Mutate the Dict and the view reflects it on the next `nu.run`.
- Iterable, sized (`len()`), and supports `contains` with a `(key, value)` tuple.

**Example**

```python
items = nu.Dict({"a": 1, "b": 2}).items()
nu.run(items.len())[0]
nu.run(items.contains(("a", 1)))[0]
```

```
2
True
```

**Methods**

### `.to_list()`

Snapshot the items into a List.

Builds `List[tuple[K, V]]`.

**Yields**

The `(key, value)` pairs as a plain List, in dict iteration
order. Unlike the view itself, the result no longer tracks the
backing Dict.

**Example**

```python
nu.run(nu.Dict({"a": 1, "b": 2}).items().to_list())[0]
```

```
[('a', 1), ('b', 2)]
```

### `.to_set()`

Snapshot the items into a Set.

Builds `Set[tuple[K, V]]`.

**Yields**

The `(key, value)` pairs as a plain Set. Unlike the view
itself, the result no longer tracks the backing Dict.

**Notes**

- Raises at evaluation time if any value is unhashable.

**Example**

```python
nu.run(nu.Dict({"a": 1, "b": 2}).items().to_set())[0] == {("a", 1), ("b", 2)}
```

```
True
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

## DictKeys

View of a Dict's keys, produced by `dict.keys()`.

```python
DictKeys()
```

Path `nu.forms.DictKeys`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Notes**

- Set-like: `union`, `intersection`, `difference`, `issubset`, and the `| & - ^` operators all work on it directly, matching Python's `dict.keys()`.
- Lazy and live: it holds no keys of its own, it re-reads the backing Dict on every evaluation. Mutate the Dict and the view reflects it on the next `nu.run`.
- Iterable, sized (`len()`), and supports `contains`.

**Example**

```python
keys = nu.Dict({"a": 1, "b": 2}).keys()
nu.run(keys.len())[0]
nu.run(keys.contains("a"))[0]
```

```
2
True
```

**Methods**

### `.to_list()`

Snapshot the keys into a List.

Builds `List[K]`.

**Yields**

The keys as a plain List, in dict iteration order. Unlike the
view itself, the result no longer tracks the backing Dict.

**Example**

```python
nu.run(nu.Dict({"a": 1, "b": 2}).keys().to_list())[0]
```

```
['a', 'b']
```

### `.to_set()`

Snapshot the keys into a Set.

Builds `Set[K]`.

**Yields**

The keys as a plain Set. Unlike the view itself, the result no
longer tracks the backing Dict.

**Example**

```python
nu.run(nu.Dict({"a": 1, "b": 2}).keys().to_set())[0] == {"a", "b"}
```

```
True
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

## DictValues

View of a Dict's values, produced by `dict.values()`.

```python
DictValues()
```

Path `nu.forms.DictValues`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Notes**

- Not set-like: values can repeat and aren't required to be hashable, so there's no `union`/`intersection`/`|`/`&` here, unlike `DictKeys` and `DictItems`. Just Collection: iterable, sized (`len()`), and `contains`.
- Lazy and live: it holds no values of its own, it re-reads the backing Dict on every evaluation. Mutate the Dict and the view reflects it on the next `nu.run`.

**Example**

```python
values = nu.Dict({"a": 1, "b": 2}).values()
nu.run(values.len())[0]
nu.run(values.contains(1))[0]
```

```
2
True
```

**Methods**

### `.to_list()`

Snapshot the values into a List.

Builds `List[V]`.

**Yields**

The values as a plain List, in dict iteration order. Unlike
the view itself, the result no longer tracks the backing Dict.

**Example**

```python
nu.run(nu.Dict({"a": 1, "b": 2}).values().to_list())[0]
```

```
[1, 2]
```

### `.to_set()`

Snapshot the values into a Set.

Builds `Set[V]`.

**Yields**

The values as a plain Set. Unlike the view itself, the result
no longer tracks the backing Dict.

**Notes**

- Raises at evaluation time if any value is unhashable.

**Example**

```python
nu.run(nu.Dict({"a": 1, "b": 2}).values().to_set())[0] == {1, 2}
```

```
True
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

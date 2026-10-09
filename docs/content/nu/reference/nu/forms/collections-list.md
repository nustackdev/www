---
title: collections.list_
description: "List - list interface."
---

Module `nu.forms.collections.list_`.

List - list interface.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [List](#list) | `scalar_query` | `List()` | List interface. Mutable sequence + comparable. |

## List

List interface. Mutable sequence + comparable.

```python
List()
```

Path `nu.forms.List`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Notes**

- `+` concatenates and `*` repeats, matching Python's list operators. There's no other arithmetic.
- Comparison operators compare element-by-element, Python list ordering, and yield Bool. Chained comparisons like `a > b > c` do not build a single term; write them as `And(a > b, b > c)`.
- Indexing with an out-of-range int raises at evaluation time, matching Python. Slicing never raises; out-of-range bounds clamp like Python slicing.
- Subscript write/delete (`self[i] = v`, `del self[i]`) mutate in place and need a Ref on the left, not a plain List value - they can't run standalone.

**Example**

```python
nu.run(nu.List.of(1, 2) + nu.List.of(3, 4))[0]
```

```
[1, 2, 3, 4]
```

**Methods**

### `List.create()`

Yield a fresh empty list.

Builds `List[T]`.

**Yields**

An empty list.

**Example**

```python
nu.run(nu.List.create())[0]
```

```
[]
```

### `List.of(items)`

Yield a list from positional item expressions.

Builds `List`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `items` |  |  | the item expressions, packed into the list in order. Each may be a Nu expression or a plain literal. |

**Yields**

The list `[<items[0]>, <items[1]>, ...]`. INVALID when any item
resolves to a sentinel.

**Notes**

- Sibling to `Tuple.of`, same evaluation shape, different wrapping.

**Example**

```python
nu.run(nu.List.of(1, 2, 3))[0]
```

```
[1, 2, 3]
```

### `a[key]`

Element at an int index, or subsequence for a slice.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` |  |  | an int index, or a Python slice of int start/stop/step. |

**Yields**

The element for an int key, the sublist for a slice. INVALID
when self is a sentinel or not a List.

**Notes**

- An out-of-range int index raises at evaluation time, matching Python. A slice never raises; out-of-range bounds clamp like Python slicing.
- Negative indices and negative slice bounds work as in Python.
- When `T` is a known primitive (`bool`, `int`, `float`, `str`, `bytes`), the overloads above narrow the int-index result to that Form's type for the type checker; anything else falls back to `Any`.

**Examples**

```python
nu.run(nu.List.of(1, 2, 3)[1])[0]
```

```
2
```

```python
nu.run(nu.List.of(1, 2, 3)[1:3])[0]
```

```
[2, 3]
```

### `a + b`

Concatenation of self and other.

Builds `List[T]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `ListArg[T]` |  | the list to append to self. |

**Yields**

The concatenation. INVALID when either operand is not a List or
is a sentinel.

**Example**

```python
nu.run(nu.List.of(1, 2) + nu.List.of(3, 4))[0]
```

```
[1, 2, 3, 4]
```

### `a * b`

Self repeated n times.

Builds `List[T]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `n` | `IntArg` |  | the repeat count. `0` or negative yields an empty list. |

**Yields**

The repeated list. INVALID when self is a sentinel or not a
List.

**Example**

```python
nu.run(nu.List.of(1, 2) * 3)[0]
```

```
[1, 2, 1, 2, 1, 2]
```

### `a[key] = value`

Subscript write: self[index] = value.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `index` | `IntArg` |  | the position to write to. An out-of-range index raises at evaluation time, matching Python. |
| `value` | `Arg[T]` |  | the value to store at index. |

**Yields**

Nothing (Command).

**Notes**

- Mutates self and needs a Ref on the left; it can't run standalone against a plain List value.

Undocumented: example.

### `a > b`

Self strictly greater than other, element-by-element.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `ListArg[T]` |  | the list to compare against. |

**Yields**

True when self sorts after other, False otherwise. INVALID when
either operand is not a List or is a sentinel.

**Example**

```python
nu.run(nu.List.of(1, 3) > nu.List.of(1, 2))[0]
```

```
True
```

### `a < b`

Self strictly less than other, element-by-element.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `ListArg[T]` |  | the list to compare against. |

**Yields**

True when self sorts before other, False otherwise. INVALID
when either operand is not a List or is a sentinel.

**Example**

```python
nu.run(nu.List.of(1, 2) < nu.List.of(1, 3))[0]
```

```
True
```

### `a >= b`

Self greater than or equal to other, element-by-element.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `ListArg[T]` |  | the list to compare against. |

**Yields**

True when self sorts after or equal to other, False otherwise.
INVALID when either operand is not a List or is a sentinel.

**Example**

```python
nu.run(nu.List.of(1, 2) >= nu.List.of(1, 2))[0]
```

```
True
```

### `a <= b`

Self less than or equal to other, element-by-element.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `ListArg[T]` |  | the list to compare against. |

**Yields**

True when self sorts before or equal to other, False otherwise.
INVALID when either operand is not a List or is a sentinel.

**Example**

```python
nu.run(nu.List.of(1, 2) <= nu.List.of(1, 3))[0]
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
| `other` | `ListArg[T]` |  | the list to compare against. |

**Yields**

True when the lists compare equal, False otherwise. INVALID
when either operand is not a List or is a sentinel.

**Notes**

- Value equality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.List.of(1, 2) == nu.List.of(1, 2))[0]
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
| `other` | `ListArg[T]` |  | the list to compare against. |

**Yields**

True when the lists differ, False otherwise. INVALID when
either operand is not a List or is a sentinel.

**Notes**

- Value inequality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.List.of(1, 2) != nu.List.of(1, 3))[0]
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
| `other` | `ListArg[T]` |  | the value to compare identity against. |

**Yields**

True when self and other evaluate to the same Python object,
False otherwise.

**Notes**

- Object identity, not value equality. For value comparison use `==` instead. Two lists built separately with equal elements are not the same object.

**Example**

```python
nu.run(nu.List.of(1, 2).is_(nu.List.of(1, 2)))[0]
```

```
False
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

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

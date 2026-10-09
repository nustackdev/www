---
title: collections.tuple_
description: "Tuple - tuple interface."
---

Module `nu.forms.collections.tuple_`.

Tuple - tuple interface.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Tuple](#tuple) | `scalar_query` | `Tuple()` | Tuple interface. Immutable sequence + comparable. |

## Tuple

Tuple interface. Immutable sequence + comparable.

```python
Tuple()
```

Path `nu.forms.Tuple`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Notes**

- No mutation methods: no `append`, `insert`, `pop`, `remove`. Every op that would change contents yields a new Tuple instead, unlike List which mutates in place.
- Arity is fixed at construction; there's no way to grow or shrink one after `of`/`create`.
- Indexing with an out-of-range int raises at evaluation time, matching Python. Slicing never raises, bounds are clamped.
- `+` and `*` concatenate and repeat like List's, but always produce a new Tuple.
- Slicing yields Tuple; iterating or mapping over the whole collection yields List, matching `_wrap_iterable_result`.

**Example**

```python
nu.run(nu.Tuple.of(1, 2, 3))[0]
```

```
(1, 2, 3)
```

**Methods**

### `Tuple.create()`

Empty tuple.

Builds `Tuple[Unpack[Ts]]`.

**Yields**

`()`.

**Example**

```python
nu.run(nu.Tuple.create())[0]
```

```
()
```

### `Tuple.of(items)`

Tuple built from positional item expressions.

Builds `Tuple`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `items` |  |  | the expressions to evaluate and pack, in order. |

**Yields**

The packed tuple. INVALID when any item resolves to a sentinel.

**Notes**

- Each argument is evaluated in the current context and packed: `Tuple.of(x, y, z)` yields `(<x>, <y>, <z>)`. Sibling to `List.of` and `Dict.of`.

**Example**

```python
nu.run(nu.Tuple.of(1, 2, 3))[0]
```

```
(1, 2, 3)
```

### `a + b`

Concatenation of self and other.

Builds `Tuple`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TupleArg[Unpack[Ts]]` |  | the tuple to append after self. |

**Yields**

A new tuple with self's items followed by other's. INVALID when
either operand is not a Tuple or is a sentinel.

**Example**

```python
nu.run(nu.Tuple.of(1, 2) + nu.Tuple.of(3, 4))[0]
```

```
(1, 2, 3, 4)
```

### `a * b`

Self repeated n times.

Builds `Tuple`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `n` | `IntArg` |  | the number of repetitions. |

**Yields**

A new tuple with self's items repeated n times, in order.
INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Tuple.of(1, 2) * 3)[0]
```

```
(1, 2, 1, 2, 1, 2)
```

### `a > b`

Self strictly greater than other, lexicographically.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TupleArg[Unpack[Ts]]` |  | the tuple to compare against. |

**Yields**

True when self sorts after other, False otherwise. INVALID when
either operand is not a Tuple or is a sentinel.

**Notes**

- Compares element by element, Python tuple ordering: the first differing pair decides.

**Example**

```python
nu.run(nu.Tuple.of(1, 3) > nu.Tuple.of(1, 2))[0]
```

```
True
```

### `a < b`

Self strictly less than other, lexicographically.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TupleArg[Unpack[Ts]]` |  | the tuple to compare against. |

**Yields**

True when self sorts before other, False otherwise. INVALID
when either operand is not a Tuple or is a sentinel.

**Notes**

- Compares element by element, Python tuple ordering: the first differing pair decides.

**Example**

```python
nu.run(nu.Tuple.of(1, 2) < nu.Tuple.of(1, 3))[0]
```

```
True
```

### `a >= b`

Self greater than or equal to other, lexicographically.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TupleArg[Unpack[Ts]]` |  | the tuple to compare against. |

**Yields**

True when self sorts after or equal to other, False otherwise.
INVALID when either operand is not a Tuple or is a sentinel.

**Example**

```python
nu.run(nu.Tuple.of(1, 2) >= nu.Tuple.of(1, 2))[0]
```

```
True
```

### `a <= b`

Self less than or equal to other, lexicographically.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TupleArg[Unpack[Ts]]` |  | the tuple to compare against. |

**Yields**

True when self sorts before or equal to other, False otherwise.
INVALID when either operand is not a Tuple or is a sentinel.

**Example**

```python
nu.run(nu.Tuple.of(1, 2) <= nu.Tuple.of(1, 3))[0]
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
| `other` | `TupleArg[Unpack[Ts]]` |  | the tuple to compare against. |

**Yields**

True when the tuples have the same length and equal items in
order, False otherwise. INVALID when either operand is not a
Tuple or is a sentinel.

**Notes**

- Value equality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.Tuple.of(1, 2) == nu.Tuple.of(1, 2))[0]
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
| `other` | `TupleArg[Unpack[Ts]]` |  | the tuple to compare against. |

**Yields**

True when the tuples differ, False otherwise. INVALID when
either operand is not a Tuple or is a sentinel.

**Notes**

- Value inequality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.Tuple.of(1, 2) != nu.Tuple.of(1, 3))[0]
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
| `other` | `TupleArg[Unpack[Ts]]` |  | the value to compare identity against. |

**Yields**

True when self and other evaluate to the same Python object,
False otherwise.

**Notes**

- Object identity, not value equality. For scalar comparison use `==` instead.

**Example**

```python
nu.run(nu.Tuple.of(1, 2).is_(nu.Tuple.of(1, 2)))[0]
```

```
False
```

**Inherited methods**

From `nu.forms.collections.abc.sequence.SequenceForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `ElementResultT \| CollectionResultT` | Element at an int index, or subsequence for a slice. |
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

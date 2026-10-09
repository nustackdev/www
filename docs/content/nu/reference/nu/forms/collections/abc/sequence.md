---
title: sequence
description: "Sequence collection: bases + mutations."
---

Module `nu.forms.collections.abc.sequence`.

Sequence collection: bases + mutations.

SequenceForm = Collection + Sliceable + first/last/index/count/reversed
MutableSequenceForm = Sequence + append/insert/pop/extend/remove/reverse

Sorted/Reversed are standalone functions in `abc.fn`.

Follows Python's collections.abc.Sequence / MutableSequence pattern.

| Name | Call | Meaning |
| --- | --- | --- |
| [MutableSequenceForm](#mutablesequenceform) | `MutableSequenceForm()` | Base for in-place-mutable sequences, like collections.abc.MutableSequence. |
| [ReactiveSequenceForm](#reactivesequenceform) | `ReactiveSequenceForm()` | Sequence with change subscriptions layered on MutableSequenceForm. |
| [SequenceForm](#sequenceform) | `SequenceForm()` | Base for ordered, indexable values, like collections.abc.Sequence. |

## MutableSequenceForm

Base for in-place-mutable sequences, like collections.abc.MutableSequence.

```python
MutableSequenceForm()
```

Path `nu.forms.collections.abc.MutableSequenceForm`.

**Notes**

- Every mutator here needs a Ref on the left; none of them evaluate standalone against a plain sequence value.
- `pop` is the one Action (mutates and returns a value); the rest are Commands (mutate, yield nothing).

**Methods**

### `.append(value)`

Append value to the end of self.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[ElementT]` |  | the element to append. |

**Yields**

Nothing (Command).

**Notes**

- Mutates self and needs a Ref on the left; it can't run standalone against a plain sequence value.

Undocumented: example.

### `.extend(other)`

Extend self with the elements of other, in order.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[Iterable[ElementT]]` |  | the iterable of elements to append. |

**Yields**

Nothing (Command).

**Notes**

- Mutates self and needs a Ref on the left; it can't run standalone against a plain sequence value.

Undocumented: example.

### `.insert(index, value)`

Insert value at index, shifting later elements right.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `index` | `IntArg` |  | the position to insert at. Out-of-range indices clamp like Python's `list.insert` rather than raising. |
| `value` | `Arg[ElementT]` |  | the element to insert. |

**Yields**

Nothing (Command).

**Notes**

- Mutates self and needs a Ref on the left; it can't run standalone against a plain sequence value.

Undocumented: example.

### `.pop(index=-1)`

Remove and return the element at index.

Builds `ElementResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `index` | `IntArg` | `-1` | the position to remove. Defaults to the last element. |

**Yields**

The removed element (Action). INVALID when index is out of
range or self is a sentinel.

**Notes**

- Mutates self and needs a Ref on the left; it can't run standalone against a plain sequence value.

Undocumented: example.

### `.del_at(index)`

Remove the element at index.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `index` | `IntArg` |  | the position to remove. An out-of-range index raises at evaluation time, matching Python's `del seq[i]`. |

**Yields**

Nothing (Command).

**Notes**

- Mutates self and needs a Ref on the left; it can't run standalone against a plain sequence value.
- Use this over `pop` when a Command is wanted instead of the Action `pop` yields.

Undocumented: example.

### `.remove(value)`

Remove the first occurrence of value.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[ElementT]` |  | the element to remove. |

**Yields**

Nothing (Command).

**Notes**

- Mutates self and needs a Ref on the left; it can't run standalone against a plain sequence value.
- A value that isn't present raises at evaluation time, matching Python's `list.remove`.

Undocumented: example.

### `.reverse()`

Reverse self in place.

Builds `Any`.

**Yields**

Nothing (Command).

**Notes**

- Mutates self and needs a Ref on the left; it can't run standalone against a plain sequence value.

Undocumented: example.

### `.sort()`

Sort self in place, ascending, using the elements' natural order.

Builds `Any`.

**Yields**

Nothing (Command).

**Notes**

- No `key` support yet; sorting by a derived key is deferred.
- Mutates self and needs a Ref on the left; it can't run standalone against a plain sequence value.

Undocumented: example.

### `.copy()`

Shallow copy of self: a new sequence with the same elements.

Builds `CollectionResultT`.

**Yields**

The copy. INVALID when self is a sentinel.

**Notes**

- Unlike the mutators above, this is a Query: it doesn't mutate self and evaluates fine against a plain sequence value.

**Example**

```python
nu.run(nu.List.of(1, 2, 3).copy())[0]
```

```
[1, 2, 3]
```

### `.clear()`

Remove every element from self.

Builds `Any`.

**Yields**

Nothing (Command).

**Notes**

- Mutates self and needs a Ref on the left; it can't run standalone against a plain sequence value.

Undocumented: example.

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

## ReactiveSequenceForm

Sequence with change subscriptions layered on MutableSequenceForm.

```python
ReactiveSequenceForm()
```

Path `nu.forms.collections.abc.ReactiveSequenceForm`.

**Notes**

- Adds `on_change` for any-change observation on this slot. The three tree-aware variants (on_child_change, on_children_change, on_descendants_change) are shape-domain and live on `nu.domains.shape.forms.collection.ReactiveCollectionForm`, not here.

**Methods**

### `.on_change()`

Subscribe to any change on this sequence slot.

Builds `object`.

**Yields**

An event stream firing whenever this slot changes.

Undocumented: example.

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

## SequenceForm

Base for ordered, indexable values, like collections.abc.Sequence.

```python
SequenceForm()
```

Path `nu.forms.collections.abc.SequenceForm`.

**Notes**

- Mixed in by List, Str, Bytes, Tuple, ListRef; this class only carries the shared shape. Concrete carriers narrow CollectionResultT/ElementResultT to their own types.
- Order is positional and stable: iteration, indexing, and `first_elem`/`last_elem` all agree on the same order.

**Methods**

### `a[key]`

Element at an int index, or subsequence for a slice.

Builds `ElementResultT | CollectionResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `IntArg \| slice` |  | an int index, or a Python slice of int start/stop/step. |

**Yields**

The element for an int key, the subsequence for a slice. INVALID
when self is a sentinel.

**Notes**

- An out-of-range int index raises at evaluation time, matching Python. A slice never raises; out-of-range bounds clamp like Python slicing, so a slice past the end yields a shorter (or empty) result rather than erroring.
- Negative indices and negative slice bounds work as in Python.

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

### `.first_elem()`

First element of self.

Builds `ElementResultT`.

**Yields**

The first element. INVALID when self is empty or a sentinel.

**Examples**

```python
nu.run(nu.List.of(1, 2, 3).first_elem())[0]
```

```
1
```

```python
nu.run(nu.List.of().first_elem())[0]
```

```
<INVALID>
```

### `.last_elem()`

Last element of self.

Builds `ElementResultT`.

**Yields**

The last element. INVALID when self is empty or a sentinel.

**Example**

```python
nu.run(nu.List.of(1, 2, 3).last_elem())[0]
```

```
3
```

### `.index(value)`

Lowest index in self where value is found, searching from the left.

Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[ElementT]` |  | the element to search for. |

**Yields**

The lowest matching index. INVALID when self is a sentinel or
value is not found.

**Notes**

- Unlike Python's `list.index`, a missing value does not raise: it yields INVALID instead.

**Examples**

```python
nu.run(nu.List.of(1, 2, 3).index(2))[0]
```

```
1
```

```python
nu.run(nu.List.of(1, 2, 3).index(5))[0]
```

```
<INVALID>
```

### `.count(value)`

Count of occurrences of value in self.

Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[ElementT]` |  | the element to count. |

**Yields**

The occurrence count, `0` when value is absent. INVALID when
self is a sentinel.

**Example**

```python
nu.run(nu.List.of(1, 2, 2, 3).count(2))[0]
```

```
2
```

### `.reversed()`

Self walked back to front, as a stream.

Builds `CollectionResultT`.

**Yields**

The elements of self in reverse order.

**Notes**

- Yields a stream, not a materialized copy; consume it through a Flow (`ForEachDo`) or a Ref-backed context. It doesn't evaluate standalone as a scalar against a plain sequence value.

Undocumented: example.

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

---
title: collections.iterator_
description: "Iterator - lazy iterator interface."
---

Module `nu.forms.collections.iterator_`.

Iterator - lazy iterator interface.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Iterator](#iterator) | `scalar_query` | `Iterator()` | Lazy stream over another form's elements. |

## Iterator

Lazy stream over another form's elements.

```python
Iterator()
```

Path `nu.forms.Iterator`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Opened by Python's `iter()` on an IterableForm, which wraps the source in
a stream-shaped `Iter` term. A term of this shape produces its items one
at a time rather than as a single value, and pulling from it advances a
position that can run dry.

**Notes**

- Stream-shaped, not scalar. `to_list`/`to_set`/`to_tuple` drain it into a concrete collection; `next` pulls one item at a time.
- Once exhausted, stays exhausted; there's no rewinding.

**Methods**

### `iter(a)`

Self, unchanged.

Builds `Iterator[T]`.

**Notes**

- Python's `iter()` on an iterator returns itself; a pure read, no new term is built.

Undocumented: example.

### `.to_list()`

Self drained into a List, in order.

Builds `List[T]`.

**Yields**

The List of items pulled.

**Notes**

- Consumes the iterator fully; it's exhausted afterward.

Undocumented: example.

### `.to_set()`

Self drained into a Set.

Builds `Set[T]`.

**Yields**

The Set of items pulled.

**Notes**

- Consumes the iterator fully; it's exhausted afterward.
- Duplicate items collapse; order is not preserved.

Undocumented: example.

### `.to_tuple()`

Self drained into a Tuple, in order.

Builds `Tuple`.

**Yields**

The Tuple of items pulled.

**Notes**

- Consumes the iterator fully; it's exhausted afterward.

Undocumented: example.

**Inherited methods**

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

Undocumented: example.

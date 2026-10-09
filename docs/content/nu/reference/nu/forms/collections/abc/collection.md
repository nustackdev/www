---
title: collection
description: "Collection capability."
---

Module `nu.forms.collections.abc.collection`.

Collection capability.

CollectionForm = Sized + Iterable + Container.

Follows Python's collections.abc.Collection pattern.

| Name | Call | Meaning |
| --- | --- | --- |
| [CollectionForm](#collectionform) | `CollectionForm()` | Base for collection values, like collections.abc.Collection. |

## CollectionForm

Base for collection values, like collections.abc.Collection.

```python
CollectionForm()
```

Path `nu.forms.collections.abc.CollectionForm`.

Combines `len()` from SizedForm, `contains()` from ContainerForm, and
the result-wrapping infrastructure from IterableForm.

**Example**

```python
nu.run(nu.List([1, 2, 3]).len())[0]
```

```
3
```

**Methods**

### `.extract()`

Materialise the full subtree rooted at self.

Builds `object`.

**Yields**

The materialised Python value. Preserves EMPTY vs INVALID when
self is a sentinel rather than collapsing them together.

**Notes**

- Recursively pulls the whole subtree out of the fabric into a plain Python value (dict / list / nested mix), unlike a plain read which only yields the value at self's own address.
- Needs self bound in a live fabric; it isn't a scalar expression `nu.run` can evaluate on its own.

**Example**

```python
nu.List([1, 2, 3]).extract()
```

**Inherited methods**

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

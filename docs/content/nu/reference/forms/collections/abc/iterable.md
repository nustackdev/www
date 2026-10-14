---
title: iterable
description: "Iterable capability."
---

Module `nu.forms.collections.abc.iterable`.

Iterable capability.

IterableForm: wrapping infrastructure for collection results.

Follows Python's collections.abc.Iterable pattern. In Nu's tree model,
iteration is controlled by Flows (ForEachDo, ForRangeDo) and streams
(`.iter()`, Map, Filter), never Python's iterator protocol: the `Nu` base
blocks `iter()` / `for` on every term. This marks types as iterable and provides
the wrapping infrastructure for typed results.

| Name | Call | Meaning |
| --- | --- | --- |
| [IterableForm](#iterableform) | `IterableForm()` | Base for values that support iteration, like collections.abc.Iterable. |

## IterableForm

Base for values that support iteration, like collections.abc.Iterable.

```python
IterableForm()
```

Path `nu.forms.collections.abc.IterableForm`.

Subclasses (SequenceForm, MappingForm, etc.) use the wrapping hooks here
to wrap op results in their own collection and element types.
Higher-order interactions (Map, Filter, Reduce, etc.) are standalone
functions in `abc.fn`, not methods on this class.

Example:

```python
nu.List.of(1, 2, 3).iter()
```

**Notes**

- Subclasses must override `_wrap_iterable_result` and `_wrap_element_result`.

**Methods**

### `.iter()`

Open self into a lazy iterator stream over its elements.

Builds `Iterator[ElementT]`.

Example:
nu.ForEachDo(nu.List.of(1, 2, 3).iter(), body)

**Yields**

An Iterator streaming self's elements.

**Notes**

- A pure read: builds the `Iter` stream query over self and wraps it as an Iterator.
- Named because Python's `iter()` / `for` would loop over the term at build time; the `Nu` base blocks them.
- The result is a lazy stream: loop it with `nu.ForEachDo`, drain it with `.to_list()`, or take its first item with `.first()`.

Undocumented: example.

**Inherited methods**

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a == b` | `Bool` | Self equal to other by value: an `Eq` term, never a Python bool. |
| `a != b` | `Bool` | Self not equal to other by value: a `Ne` term, never a Python bool. |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

From `builtins.object`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a < b` |  | Return self<value. |
| `a <= b` |  | Return self<=value. |
| `a > b` |  | Return self>value. |
| `a >= b` |  | Return self>=value. |

Undocumented: example.

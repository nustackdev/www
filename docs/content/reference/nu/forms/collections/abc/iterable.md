---
title: iterable
description: "Iterable capability."
---

Module `nu.forms.collections.abc.iterable`.

Iterable capability.

IterableForm: wrapping infrastructure for collection results.

Follows Python's collections.abc.Iterable pattern. In Nu's tree model,
iteration is controlled by Flows (ForEachDo, ForRangeDo), not Python's
iterator protocol. This marks types as iterable and provides
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

**Notes**

- Subclasses must override `_wrap_iterable_result` and `_wrap_element_result`.

**Example**

```python
iter(nu.List([1, 2, 3]))
```

**Methods**

### `iter(a)`

Open self into a lazy iterator stream (Python's `iter`).

Builds `Iterator[ElementT]`.

**Yields**

An Iterator streaming self's elements.

**Notes**

- A pure read: builds the `Iter` stream query over self and wraps it as an Iterator.
- Unlike `len`/`contains`, whose results Python coerces at the C level, `iter` keeps whatever `__iter__` returns, so the Nu tree survives.
- The result is a lazy stream, consumed by a Flow rather than handed straight to `nu.run`.

**Example**

```python
iter(nu.List([1, 2, 3]))
```

**Inherited methods**

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

---
title: sized
description: "Sized capability."
---

Module `nu.forms.collections.abc.sized`.

Sized capability.

SizedForm: values that have a length.

Follows Python's collections.abc.Sized pattern.

| Name | Call | Meaning |
| --- | --- | --- |
| [SizedForm](#sizedform) | `SizedForm()` | Base for values that have a length, like collections.abc.Sized. |

## SizedForm

Base for values that have a length, like collections.abc.Sized.

```python
SizedForm()
```

Path `nu.forms.collections.abc.SizedForm`.

**Example**

```python
nu.run(nu.List([1, 2, 3]).len())[0]
```

```
3
```

**Methods**

### `.len()`

Length of self.

Builds `Int`.

**Yields**

The element count as Int. EMPTY when self is EMPTY.

**Example**

```python
nu.run(nu.List([1, 2, 3]).len())[0]
```

```
3
```

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

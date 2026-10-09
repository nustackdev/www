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

The element count as Int. INVALID when self is a sentinel.

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

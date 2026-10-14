---
title: sliceable
description: "Sliceable capability."
---

Module `nu.forms.collections.abc.sliceable`.

Sliceable capability.

SliceableForm: values that support slicing.

| Name | Call | Meaning |
| --- | --- | --- |
| [SliceableForm](#sliceableform) | `SliceableForm()` | Base for values that support slicing. |

## SliceableForm

Base for values that support slicing.

```python
SliceableForm()
```

Path `nu.forms.collections.abc.SliceableForm`.

**Example**

```python
nu.run(nu.List([1, 2, 3, 4, 5]).slice(1, 4))[0]
```

```
[2, 3, 4]
```

**Methods**

### `.slice(start, stop, step=None)`

Slice of self from start to stop, stepping by step.

Builds `ResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `start` | `IntArg \| None` |  | the index to start at, inclusive. None starts from the beginning. |
| `stop` | `IntArg \| None` |  | the index to stop at, exclusive. None runs to the end. |
| `step` | `IntArg \| None` | `None` | the stride between elements. None means every element. |

**Yields**

The sliced value, wrapped by the subclass. EMPTY when self is
EMPTY.

**Notes**

- Bounds are clamped like Python slicing: an out-of-range start or stop never raises.

**Examples**

```python
nu.run(nu.List([1, 2, 3, 4, 5]).slice(1, 4))[0]
```

```
[2, 3, 4]
```

```python
nu.run(nu.List([1, 2, 3, 4, 5]).slice(0, 5, 2))[0]
```

```
[1, 3, 5]
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

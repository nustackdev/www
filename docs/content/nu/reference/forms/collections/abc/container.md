---
title: container
description: "Container capability."
---

Module `nu.forms.collections.abc.container`.

Container capability.

ContainerForm: values that support containment checks.

Follows Python's collections.abc.Container pattern.

| Name | Call | Meaning |
| --- | --- | --- |
| [ContainerForm](#containerform) | `ContainerForm()` | Base for values that support containment checks, like collections.abc.Container. |

## ContainerForm

Base for values that support containment checks, like collections.abc.Container.

```python
ContainerForm()
```

Path `nu.forms.collections.abc.ContainerForm`.

**Notes**

- Python's `in` operator coerces `__contains__`'s result to `bool` at the C level, which would collapse the Nu tree to a constant `True`. `.contains(item)` returns a real Bool tree node instead.

**Example**

```python
nu.run(nu.Set({1, 2, 3}).contains(2))[0]
```

```
True
```

**Methods**

### `.contains(item)`

Whether item is a member of self.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `item` | `object` |  | the value to test for membership. |

**Yields**

True when item is in self, False otherwise. EMPTY when self or
item is EMPTY.

**Examples**

```python
nu.run(nu.Set({1, 2, 3}).contains(2))[0]
```

```
True
```

```python
nu.run(nu.Set({1, 2, 3}).contains(9))[0]
```

```
False
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

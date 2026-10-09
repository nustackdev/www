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

True when item is in self, False otherwise. INVALID when self or
item is a sentinel.

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

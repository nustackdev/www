---
title: primitives.none_
description: "None_ - none interface."
---

Module `nu.forms.primitives.none_`.

None_ - none interface.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [None_](#none_) | `scalar_query` | `None_(source=None)` | None interface. Logical only. |

## None_

None interface. Logical only.

```python
None_(source=None)
```

Path `nu.forms.None_`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Notes**

- Wraps Python's `None`. It's the typical return of an effect-only Command, one that runs for a side effect and yields nothing meaningful (`sleep`, `inc`, `dec`).
- Unlike every other primitive, None_ defines no `__eq__` or `is_`. `==` between two None_ instances falls back to plain Python object identity, not a Nu comparison term, so it never builds a tree and two separate `None_()` instances compare unequal.
- EMPTY is a distinct sentinel from None: an address that resolved to no value at all, not one that resolved to the value `None`.

**Example**

```python
nu.run(nu.None_())[0] is None
```

```
True
```

**Methods**

### `.and_(other)`

Logical AND of self and other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `NoneArg` |  | the value to AND with self. Coerced to Bool by truthiness; `None` is always falsy. |

**Yields**

False, since self is always falsy. INVALID when either operand
is a sentinel.

**Notes**

- Short-circuits like Python: the right operand is only evaluated when the left does not already decide the result.

**Example**

```python
nu.run(nu.None_().and_(nu.None_()))[0]
```

```
False
```

### `.or_(other)`

Logical OR of self and other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `NoneArg` |  | the value to OR with self. Coerced to Bool by truthiness; `None` is always falsy. |

**Yields**

True when other is truthy, False otherwise since self never is.
INVALID when either operand is a sentinel.

**Notes**

- Short-circuits like Python: the right operand is only evaluated when the left does not already decide the result.

**Example**

```python
nu.run(nu.None_().or_(nu.None_()))[0]
```

```
False
```

### `.not_()`

Logical NOT of self.

Builds `Bool`.

**Yields**

True. INVALID when self is a sentinel.

**Notes**

- Self is always falsy, so this always yields True.

**Example**

```python
nu.run(nu.None_().not_())[0]
```

```
True
```

### `.bool_()`

Cast self to Bool.

Builds `Bool`.

**Yields**

False. INVALID when self is a sentinel.

**Notes**

- `None` is falsy under Python's truthiness rule, so this always yields False.

**Example**

```python
nu.run(nu.None_().bool_())[0]
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

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
- `==` / `!=` build an `Eq` / `Ne` term like every other Form, so `x == nu.None_()` asks whether x yields None at run time. There is no `is_`.
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

False, since self is always falsy. An EMPTY operand counts as
false.

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
An EMPTY operand counts as false.

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

True. EMPTY when self is EMPTY.

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

False. EMPTY when self is EMPTY.

**Notes**

- `None` is falsy under Python's truthiness rule, so this always yields False.

**Example**

```python
nu.run(nu.None_().bool_())[0]
```

```
False
```

### `a == b`

Self equal to other by value.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to compare against. Any type; equality never raises for mismatched types, it's just False. |

**Yields**

True when other is also None, False otherwise. EMPTY when
either operand is EMPTY.

**Example**

```python
nu.run(nu.None_() == nu.None_())[0]
```

```
True
```

### `a != b`

Self not equal to other by value.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to compare against. |

**Yields**

True when other is not None, False otherwise. EMPTY when
either operand is EMPTY.

**Example**

```python
nu.run(nu.None_() != 0)[0]
```

```
True
```

**Inherited methods**

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

---
title: primitives.float_
description: "Float - float interface."
---

Module `nu.forms.primitives.float_`.

Float - float interface.

Float = Form[float] + arithmetic + comparison + logical.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Float](#float) | `scalar_query` | `Float()` | Float interface. Numeric + comparable + logical. |

## Float

Float interface. Numeric + comparable + logical.

```python
Float()
```

Path `nu.forms.Float`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Notes**

- Arithmetic against an Int, or a plain int or float, stays Float. There's no promotion to track since Float is already the wider type.
- Division `/` and floor division `//` both stay Float. Unlike Int, where `/` promotes to Float but `//` stays Int, here every arithmetic operator returns Float.
- Comparison operators yield Bool. Chained comparisons like `a > b > c` do not build a single term; write them as `And(a > b, b > c)`.
- `nan` compares False against everything, including itself, so `Float(nan) == Float(nan)` is False.
- Logical operators are the named forms `and_`, `or_`, `not_`.

**Example**

```python
nu.run(nu.Float(2.5) * nu.Float(4.0))[0]
```

```
10.0
```

**Methods**

### `a + b`

Sum of self and other.

Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the value to add to self. Int, float, or plain int all stay Float. |

**Yields**

The sum. INVALID when either operand is a sentinel.

**Examples**

```python
nu.run(nu.Float(2.5) + nu.Float(1.5))[0]
```

```
4.0
```

```python
nu.run(nu.Float(2.0) + 1)[0]
```

```
3.0
```

### `a - b`

Self minus other.

Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the value to subtract from self. |

**Yields**

The difference. INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.Float(10.0) - nu.Float(3.5))[0]
```

```
6.5
```

### `a * b`

Product of self and other.

Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the value to multiply self by. |

**Yields**

The product. INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.Float(6.0) * nu.Float(7.0))[0]
```

```
42.0
```

### `a / b`

Self divided by other.

Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the divisor. |

**Yields**

The quotient. INVALID when either operand is a sentinel. Raises
at evaluation time when the divisor is zero.

**Notes**

- A zero divisor is not caught here; the underlying Div raises at evaluation time. Unlike IEEE 754, this does not yield `inf`.

**Example**

```python
nu.run(nu.Float(7.0) / nu.Float(2.0))[0]
```

```
3.5
```

### `a // b`

Self floor-divided by other.

Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the divisor. |

**Yields**

The floored quotient. INVALID when either operand is a
sentinel. Raises at evaluation time when the divisor is zero.

**Notes**

- Stays Float even though the result is a whole number, unlike Int `//` which returns Int. Rounds toward negative infinity, as Python's `//` does.

**Examples**

```python
nu.run(nu.Float(7.5) // nu.Float(2.0))[0]
```

```
3.0
```

```python
nu.run(nu.Float(-7.5) // nu.Float(2.0))[0]
```

```
-4.0
```

### `a % b`

Self modulo other.

Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the divisor. |

**Yields**

The remainder. INVALID when either operand is a sentinel.

**Notes**

- The result's sign follows the divisor, as Python's `%` does, so `-7.5 % 3.0` is `1.5` and not `-1.5`.

**Example**

```python
nu.run(nu.Float(-7.5) % nu.Float(3.0))[0]
```

```
1.5
```

### `a ** b`

Self raised to the other power.

Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the exponent. |

**Yields**

The power. INVALID when either operand is a sentinel.

**Notes**

- Unlike Int, a negative or fractional exponent does not raise. A negative base with a fractional exponent yields a Python complex number rather than raising, matching `**`.

**Example**

```python
nu.run(nu.Float(2.0) ** nu.Float(10.0))[0]
```

```
1024.0
```

### `-a`

Negation of self.

Builds `Float`.

**Yields**

The negation. INVALID when self is a sentinel.

**Example**

```python
nu.run(-nu.Float(4.5))[0]
```

```
-4.5
```

### `+a`

Self unchanged.

Builds `Float`.

**Yields**

The value unchanged. INVALID when self is a sentinel.

**Notes**

- Identity for numbers. Kept for symmetry with `__neg__` and so `+x` inside an expression is still a Nu term.

**Example**

```python
nu.run(+nu.Float(-4.5))[0]
```

```
-4.5
```

### `abs(a)`

Absolute value of self.

Builds `Float`.

**Yields**

The magnitude. INVALID when self is a sentinel.

**Example**

```python
nu.run(abs(nu.Float(-4.5)))[0]
```

```
4.5
```

### `a > b`

Self strictly greater than other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the value to compare against. Any Int, Float, or plain number. |

**Yields**

True when self is greater, False otherwise. INVALID when either
operand is a sentinel. False whenever either side is nan.

**Example**

```python
nu.run(nu.Float(5.5) > nu.Float(3.0))[0]
```

```
True
```

### `a < b`

Self strictly less than other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the value to compare against. Any Int, Float, or plain number. |

**Yields**

True when self is less, False otherwise. INVALID when either
operand is a sentinel. False whenever either side is nan.

**Example**

```python
nu.run(nu.Float(5.5) < nu.Float(3.0))[0]
```

```
False
```

### `a >= b`

Self greater than or equal to other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the value to compare against. Any Int, Float, or plain number. |

**Yields**

True when self is greater or equal, False otherwise. INVALID
when either operand is a sentinel. False whenever either side
is nan.

**Example**

```python
nu.run(nu.Float(5.5) >= nu.Float(5.5))[0]
```

```
True
```

### `a <= b`

Self less than or equal to other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the value to compare against. Any Int, Float, or plain number. |

**Yields**

True when self is less or equal, False otherwise. INVALID when
either operand is a sentinel. False whenever either side is
nan.

**Example**

```python
nu.run(nu.Float(3.0) <= nu.Float(5.5))[0]
```

```
True
```

### `a == b`

Self equal to other by value.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the value to compare against. Compared numerically, so `Float(1.0) == 1` is True. |

**Yields**

True when the values compare equal, False otherwise. INVALID
when either operand is a sentinel.

**Notes**

- Value equality, not identity. Use `is_` for identity.
- `nan` is never equal to anything, including another nan.

**Examples**

```python
nu.run(nu.Float(1.0) == 1)[0]
```

```
True
```

```python
nu.run(nu.Float(float("nan")) == nu.Float(float("nan")))[0]
```

```
False
```

### `a != b`

Self not equal to other by value.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the value to compare against. Compared numerically. |

**Yields**

True when the values differ, False otherwise. INVALID when
either operand is a sentinel.

**Notes**

- Value inequality, not identity. Use `is_` for identity.
- `nan` is unequal to everything, including another nan.

**Example**

```python
nu.run(nu.Float(1.0) != nu.Float(2.0))[0]
```

```
True
```

### `.is_(other)`

Identity comparison: self is other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the value to compare identity against. |

**Yields**

True when self and other evaluate to the same Python object,
False otherwise.

**Notes**

- Object identity, not value equality. For scalar comparison use `==` instead.

**Example**

```python
nu.run(nu.Float(1.0).is_(1.0))[0]
```

```
True
```

### `.and_(other)`

Logical AND of self and other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BoolArg \| FloatArg` |  | the value to AND with self. Coerced to Bool by truthiness (zero is False, everything else is True). |

**Yields**

True when both operands are truthy, False otherwise. INVALID
when either operand is a sentinel.

**Notes**

- Short-circuits like Python: the right operand is only evaluated when the left does not already decide the result.

**Example**

```python
nu.run(nu.Float(1.5).and_(nu.Float(0.0)))[0]
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
| `other` | `BoolArg \| FloatArg` |  | the value to OR with self. Coerced to Bool by truthiness. |

**Yields**

True when either operand is truthy, False otherwise. INVALID
when either operand is a sentinel.

**Notes**

- Short-circuits like Python: the right operand is only evaluated when the left does not already decide the result.

**Example**

```python
nu.run(nu.Float(0.0).or_(nu.Float(5.5)))[0]
```

```
True
```

### `.not_()`

Logical NOT of self.

Builds `Bool`.

**Yields**

True when self is zero, False otherwise. INVALID when self is a
sentinel.

**Notes**

- Zero yields True, every other value yields False.

**Example**

```python
nu.run(nu.Float(0.0).not_())[0]
```

```
True
```

### `.bool_()`

Cast self to Bool.

Builds `Bool`.

**Yields**

True when self is non-zero, False when self is zero. INVALID
when self is a sentinel.

**Notes**

- Zero becomes False, every other value becomes True, matching Python's truthiness rule.

**Example**

```python
nu.run(nu.Float(5.5).bool_())[0]
```

```
True
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

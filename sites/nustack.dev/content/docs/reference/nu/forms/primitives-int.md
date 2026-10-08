---
title: primitives.int_
description: "Int - integer interface."
---

Module `nu.forms.primitives.int_`.

Int - integer interface.

Int = Form[int] + arithmetic + comparison + logical + bitwise.
Handles int/float promotion: int op float -> Float.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Int](#int) | `scalar_query` | `Int()` | Integer interface. Full numeric + comparable + logical + bitwise. |

## Int

Integer interface. Full numeric + comparable + logical + bitwise.

```python
Int()
```

Path `nu.forms.Int`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Notes**

- Arithmetic against a Float or a Python float promotes the result to Float. Everything else stays Int.
- Division `/` always yields Float regardless of operand type; use `//` for integer floor division that stays Int.
- Comparison operators yield Bool. Chained comparisons like `a > b > c` do not build a single term; write them as `And(a > b, b > c)`.
- Logical operators are the named forms `and_`, `or_`, `not_`. The symbols `&`, `|`, `~` are bitwise and stay Int.

**Example**

```python
nu.run(nu.Int(6) * nu.Int(7))[0]
```

```
42
```

**Methods**

### `a + b`

Sum of self and other.

Builds `Int | Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the value to add to self. Int or plain int keeps the result Int; Float or plain float promotes it to Float. |

**Yields**

The sum. Promoted to Float when either operand is Float.
INVALID when either operand is a sentinel.

**Examples**

```python
nu.run(nu.Int(2) + nu.Int(3))[0]
```

```
5
```

```python
nu.run(nu.Int(2) + 1.5)[0]
```

```
3.5
```

### `a - b`

Self minus other.

Builds `Int | Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the value to subtract from self. Int or plain int keeps the result Int; Float or plain float promotes it to Float. |

**Yields**

The difference. Promoted to Float when either operand is Float.
INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.Int(10) - nu.Int(3))[0]
```

```
7
```

### `a * b`

Product of self and other.

Builds `Int | Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the value to multiply self by. Int or plain int keeps the result Int; Float or plain float promotes it to Float. |

**Yields**

The product. Promoted to Float when either operand is Float.
INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.Int(6) * nu.Int(7))[0]
```

```
42
```

### `a / b`

Self divided by other.

Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the divisor. Any type accepted, the result is always Float. |

**Yields**

The quotient as Float. INVALID when either operand is a sentinel.
Raises at evaluation time when the divisor is zero.

**Notes**

- Always yields Float, even when both operands are Int. Use `//` for integer floor division that stays Int.
- A zero divisor is not caught here; the underlying Div raises at evaluation time.

**Examples**

```python
nu.run(nu.Int(6) / nu.Int(2))[0]
```

```
3.0
```

```python
nu.run(nu.Int(7) / nu.Int(2))[0]
```

```
3.5
```

### `a // b`

Self floor-divided by other.

Builds `Int | Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the divisor. Int or plain int keeps the result Int; Float or plain float promotes it to Float. |

**Yields**

The floored quotient. Promoted to Float when either operand is
Float. INVALID when either operand is a sentinel. Raises at
evaluation time when the divisor is zero.

**Notes**

- Rounds toward negative infinity, as Python's `//` does, so `-7 // 2` is `-4` and not `-3`.

**Examples**

```python
nu.run(nu.Int(7) // nu.Int(2))[0]
```

```
3
```

```python
nu.run(nu.Int(-7) // nu.Int(2))[0]
```

```
-4
```

### `a % b`

Self modulo other.

Builds `Int | Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the divisor. Int or plain int keeps the result Int; Float or plain float promotes it to Float. |

**Yields**

The remainder. Promoted to Float when either operand is Float.
INVALID when either operand is a sentinel.

**Notes**

- The result's sign follows the divisor, as Python's `%` does, so `-7 % 3` is `2` and not `-1`.

**Example**

```python
nu.run(nu.Int(-7) % nu.Int(3))[0]
```

```
2
```

### `a ** b`

Self raised to the other power.

Builds `Int | Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg \| FloatArg` |  | the exponent. Int or plain int keeps the result Int; Float or plain float promotes it to Float. |

**Yields**

The power. Promoted to Float when either operand is Float.
INVALID when either operand is a sentinel.

**Notes**

- A negative exponent raises at evaluation time under Int since the result would be non-integer. Promote self to Float first for fractional powers.

**Example**

```python
nu.run(nu.Int(2) ** nu.Int(10))[0]
```

```
1024
```

### `-a`

Negation of self.

Builds `Int`.

**Yields**

The negation. INVALID when self is a sentinel.

**Example**

```python
nu.run(-nu.Int(4))[0]
```

```
-4
```

### `+a`

Self unchanged.

Builds `Int`.

**Yields**

The value unchanged. INVALID when self is a sentinel.

**Notes**

- Identity for numbers. Kept for symmetry with `__neg__` and so `+x` inside an expression is still a Nu term.

**Example**

```python
nu.run(+nu.Int(-4))[0]
```

```
-4
```

### `abs(a)`

Absolute value of self.

Builds `Int`.

**Yields**

The magnitude. INVALID when self is a sentinel.

**Example**

```python
nu.run(abs(nu.Int(-4)))[0]
```

```
4
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
operand is a sentinel.

**Example**

```python
nu.run(nu.Int(5) > nu.Int(3))[0]
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
operand is a sentinel.

**Example**

```python
nu.run(nu.Int(5) < nu.Int(3))[0]
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

True when self is greater or equal, False otherwise. INVALID when
either operand is a sentinel.

**Example**

```python
nu.run(nu.Int(5) >= nu.Int(5))[0]
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
either operand is a sentinel.

**Example**

```python
nu.run(nu.Int(3) <= nu.Int(5))[0]
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
| `other` | `IntArg \| FloatArg` |  | the value to compare against. Compared numerically, so `Int(1) == 1.0` is True. |

**Yields**

True when the values compare equal, False otherwise. INVALID when
either operand is a sentinel.

**Notes**

- Value equality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.Int(1) == 1.0)[0]
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
| `other` | `IntArg \| FloatArg` |  | the value to compare against. Compared numerically. |

**Yields**

True when the values differ, False otherwise. INVALID when either
operand is a sentinel.

**Notes**

- Value inequality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.Int(1) != nu.Int(2))[0]
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
False otherwise. For small ints Python interns values, so
distinct Int literals of equal value can still test identical.

**Notes**

- Object identity, not value equality. For scalar comparison use `==` instead.

**Examples**

```python
nu.run(nu.Int(1).is_(1.0))[0]
```

```
False
```

```python
nu.run(nu.Int(1) == 1.0)[0]
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
| `other` | `BoolArg \| IntArg` |  | the value to AND with self. Coerced to Bool by truthiness (zero is False, everything else is True). |

**Yields**

True when both operands are truthy, False otherwise. INVALID when
either operand is a sentinel.

**Notes**

- Short-circuits like Python: the right operand is only evaluated when the left does not already decide the result.
- Bitwise AND is `bitand`, not this.

**Example**

```python
nu.run(nu.Int(1).and_(nu.Int(0)))[0]
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
| `other` | `BoolArg \| IntArg` |  | the value to OR with self. Coerced to Bool by truthiness. |

**Yields**

True when either operand is truthy, False otherwise. INVALID when
either operand is a sentinel.

**Notes**

- Short-circuits like Python: the right operand is only evaluated when the left does not already decide the result.
- Bitwise OR is `bitor`, not this.

**Example**

```python
nu.run(nu.Int(0).or_(nu.Int(5)))[0]
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
- Bitwise NOT is `bitnot`, not this.

**Example**

```python
nu.run(nu.Int(0).not_())[0]
```

```
True
```

### `.bool_()`

Cast self to Bool.

Builds `Bool`.

**Yields**

True when self is non-zero, False when self is zero. INVALID when
self is a sentinel.

**Notes**

- Zero becomes False, every other value becomes True, matching Python's truthiness rule.

**Example**

```python
nu.run(nu.Int(5).bool_())[0]
```

```
True
```

### `.bitand(other)`

Bitwise AND: self & other.

Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg` |  | the integer to AND with self, bit by bit. |

**Yields**

The bitwise AND. INVALID when either operand is a sentinel.

**Notes**

- Named form rather than `__and__` to keep the logical `and_` and the bitwise AND from stepping on each other across the Bool / Int split.

**Example**

```python
nu.run(nu.Int(0b1100).bitand(0b1010))[0]
```

```
8
```

### `.bitor(other)`

Bitwise OR: self | other.

Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg` |  | the integer to OR with self, bit by bit. |

**Yields**

The bitwise OR. INVALID when either operand is a sentinel.

**Notes**

- Named form rather than `__or__`, symmetric with `bitand`.

**Example**

```python
nu.run(nu.Int(0b1100).bitor(0b1010))[0]
```

```
14
```

### `a ^ b`

Bitwise XOR: self ^ other.

Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg` |  | the integer to XOR with self, bit by bit. |

**Yields**

The bitwise XOR. INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.Int(0b1100) ^ nu.Int(0b1010))[0]
```

```
6
```

### `.bitnot()`

Bitwise NOT: ~self.

Builds `Int`.

**Yields**

The bitwise complement. INVALID when self is a sentinel.

**Notes**

- Named form rather than `__invert__`, symmetric with `bitand` and `bitor`.
- Two's complement, so `bitnot(x)` equals `-x - 1`.

**Example**

```python
nu.run(nu.Int(5).bitnot())[0]
```

```
-6
```

### `a << b`

Left shift: self shifted left by other bits.

Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg` |  | the shift amount in bits. Must be non-negative at evaluation time. |

**Yields**

The shifted value. INVALID when either operand is a sentinel.
Raises at evaluation time when the shift amount is negative.

**Notes**

- Fills the low bits with zeros. Equivalent to `self * 2**other` for non-negative shifts.

**Example**

```python
nu.run(nu.Int(1) << nu.Int(4))[0]
```

```
16
```

### `a >> b`

Right shift: self shifted right by other bits.

Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg` |  | the shift amount in bits. Must be non-negative at evaluation time. |

**Yields**

The shifted value. INVALID when either operand is a sentinel.
Raises at evaluation time when the shift amount is negative.

**Notes**

- Arithmetic shift, so the sign bit is preserved: shifting a negative number stays negative.
- Equivalent to `self // 2**other` for non-negative shifts.

**Example**

```python
nu.run(nu.Int(16) >> nu.Int(2))[0]
```

```
4
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

---
title: decimal
description: "Nu surface for Python's `decimal` module - the `Decimal` type."
---

Module `nustd.decimal`.

Nu surface for Python's `decimal` module - the `Decimal` type.

Mirrors `decimal` 1-1 for the value type: `Decimal` is a Form backed by
`decimal.Decimal`, so arithmetic stays exact. `decimal`'s module-level
helpers and contexts (`getcontext`, `localcontext`, `ROUND_*` ...) are out
of scope, so there are just two layers: `forms` (the class) and
`interactions` (the constructor and method atoms; arithmetic and comparison
use the core atoms). Import it like the stdlib:

```python
from nustd.decimal import Decimal    # Decimal.of("0.1") + Decimal.of("0.2")
```

## ScalarQuery

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Decimal](#decimal) | `scalar_query` | `Decimal()` | `decimal.Decimal` as a Form - exact, arbitrary-precision arithmetic. |

### Decimal

`decimal.Decimal` as a Form - exact, arbitrary-precision arithmetic.

```python
Decimal()
```

Path `nustd.decimal.Decimal`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Build one with `Decimal.of(...)` (string or int, coerced exactly) or
`Decimal.from_float(...)`; combine with the arithmetic operators; refine
with the method calls. Python does the real `Decimal` op on the resolved
values, so `Decimal.of("0.1") + Decimal.of("0.2")` is exactly
`Decimal('0.3')`.

**Methods**

#### `Decimal.of(value)`

Build a decimal from a string or int, exactly: `Decimal(str(value))`.

Builds `Decimal`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg \| IntArg` |  |  |

Undocumented: example.

#### `Decimal.from_float(value)`

From a binary float: `Decimal.from_float(f)` (carries float error).

Builds `Decimal`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |

Undocumented: example.

#### `a + b`

Builds `Decimal`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DecimalArg` |  |  |

Undocumented: summary, example.

#### `a - b`

Builds `Decimal`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DecimalArg` |  |  |

Undocumented: summary, example.

#### `a * b`

Builds `Decimal`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DecimalArg` |  |  |

Undocumented: summary, example.

#### `a / b`

Builds `Decimal`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DecimalArg` |  |  |

Undocumented: summary, example.

#### `a // b`

Builds `Decimal`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DecimalArg` |  |  |

Undocumented: summary, example.

#### `a % b`

Builds `Decimal`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DecimalArg` |  |  |

Undocumented: summary, example.

#### `a ** b`

Builds `Decimal`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DecimalArg \| IntArg` |  |  |

Undocumented: summary, example.

#### `-a`

Builds `Decimal`.

Undocumented: summary, example.

#### `abs(a)`

Builds `Decimal`.

Undocumented: summary, example.

#### `+a`

Builds `Decimal`.

Undocumented: summary, example.

#### `.quantize(exp)`

Round to the exponent of `exp` (e.g. `Decimal.of("0.01")`).

Builds `Decimal`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `exp` | `DecimalArg` |  |  |

Undocumented: example.

#### `.normalize()`

A canonical form with trailing zeros removed.

Builds `Decimal`.

Undocumented: example.

#### `.to_integral_value()`

The value rounded to the nearest integer, kept as a `Decimal`.

Builds `Decimal`.

Undocumented: example.

#### `.sqrt()`

The square root.

Builds `Decimal`.

Undocumented: example.

#### `.exp()`

The exponential, `e ** self`.

Builds `Decimal`.

Undocumented: example.

#### `.ln()`

The natural logarithm.

Builds `Decimal`.

Undocumented: example.

#### `.log10()`

The base-10 logarithm.

Builds `Decimal`.

Undocumented: example.

#### `.compare(other)`

`Decimal('-1')` / `'0'` / `'1'` for `self` <, ==, > `other`.

Builds `Decimal`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DecimalArg` |  |  |

Undocumented: example.

#### `.copy_abs()`

The absolute value (context-free, no rounding).

Builds `Decimal`.

Undocumented: example.

#### `.copy_negate()`

The negation (context-free, no rounding).

Builds `Decimal`.

Undocumented: example.

#### `.adjusted()`

The adjusted exponent after shifting out the coefficient's digits.

Builds `Int`.

Undocumented: example.

#### `.as_integer_ratio()`

The exact value as a `(numerator, denominator)` pair of ints.

Builds `Tuple`.

Undocumented: example.

#### `.is_finite()`

Whether the value is finite (not infinite, not NaN).

Builds `Bool`.

Undocumented: example.

#### `.is_infinite()`

Whether the value is positive or negative infinity.

Builds `Bool`.

Undocumented: example.

#### `.is_nan()`

Whether the value is a NaN (quiet or signaling).

Builds `Bool`.

Undocumented: example.

#### `.is_zero()`

Whether the value is zero (positive or negative).

Builds `Bool`.

Undocumented: example.

#### `.is_signed()`

Whether the sign bit is set (negative, including `-0`).

Builds `Bool`.

Undocumented: example.

#### `a > b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DecimalArg` |  |  |

Undocumented: summary, example.

#### `a < b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DecimalArg` |  |  |

Undocumented: summary, example.

#### `a >= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DecimalArg` |  |  |

Undocumented: summary, example.

#### `a <= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DecimalArg` |  |  |

Undocumented: summary, example.

#### `.eq(other)`

Whether two decimals are equal in value.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DecimalArg` |  |  |

Undocumented: example.

#### `.ne(other)`

Whether two decimals differ in value.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DecimalArg` |  |  |

Undocumented: example.

**Inherited methods**

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

Undocumented: example.

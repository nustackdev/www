---
title: fractions
description: "Nu surface for Python's `fractions` module - exact rational arithmetic."
---

Module `nustd.fractions`.

Nu surface for Python's `fractions` module - exact rational arithmetic.

Mirrors `fractions` 1-1: `Fraction` is the class (a Form), backed by
`fractions.Fraction`. `fractions` has no module-level functions, so there
are just two layers: `forms` (the class) and `interactions` (the
constructor and method atoms; property reads use core `GetAttr`,
arithmetic and comparison use the core atoms). Import it like the stdlib:

```python
from nustd.fractions import Fraction
import nustd.fractions as fractions    # fractions.Fraction.of(1, 3), ...
```

## ScalarQuery

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Fraction](#fraction) | `scalar_query` | `Fraction()` | `fractions.Fraction` as a Form - an exact rational number. |

### Fraction

`fractions.Fraction` as a Form - an exact rational number.

```python
Fraction()
```

Path `nustd.fractions.Fraction`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Named `Fraction` to mirror `from fractions import Fraction`. Build one
with `Fraction.of(num, den)` (or `from_float` / `from_decimal` /
`from_str`); read its parts as properties; combine with arithmetic and
comparison operators.

**Methods**

#### `Fraction.of(numerator, denominator=1)`

Build a fraction from numerator and denominator: `Fraction(n, d)`.

Builds `Fraction`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `numerator` | `IntArg` |  |  |
| `denominator` | `IntArg` | `1` |  |

Undocumented: example.

#### `Fraction.from_float(value)`

The exact fraction equal to a float: `Fraction.from_float(f)`.

Builds `Fraction`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |

Undocumented: example.

#### `Fraction.from_decimal(value)`

The exact fraction equal to a Decimal: `Fraction.from_decimal(d)`.

Builds `Fraction`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `DecimalArg` |  |  |

Undocumented: example.

#### `Fraction.from_str(value)`

Parse a fraction string: `Fraction(s)` (e.g. `"3/4"`, `"1.5"`).

Builds `Fraction`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

Undocumented: example.

#### `.numerator()`

The numerator (in lowest terms).

Builds `Int`.

Undocumented: example.

#### `.denominator()`

The denominator (in lowest terms, always positive).

Builds `Int`.

Undocumented: example.

#### `.limit_denominator(max_denominator=1000000)`

The closest fraction with denominator at most `max_denominator`.

Builds `Fraction`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `max_denominator` | `IntArg` | `1000000` |  |

Undocumented: example.

#### `.as_integer_ratio()`

The `(numerator, denominator)` pair as a tuple.

Builds `Tuple`.

Undocumented: example.

#### `a + b`

Builds `Fraction`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FractionArg \| IntArg` |  |  |

Undocumented: summary, example.

#### `a - b`

Builds `Fraction`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FractionArg \| IntArg` |  |  |

Undocumented: summary, example.

#### `a * b`

Builds `Fraction`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FractionArg \| IntArg` |  |  |

Undocumented: summary, example.

#### `a / b`

Builds `Fraction`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FractionArg \| IntArg` |  |  |

Undocumented: summary, example.

#### `a // b`

Builds `Fraction`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FractionArg \| IntArg` |  |  |

Undocumented: summary, example.

#### `a % b`

Builds `Fraction`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FractionArg \| IntArg` |  |  |

Undocumented: summary, example.

#### `a ** b`

Builds `Fraction`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg` |  |  |

Undocumented: summary, example.

#### `-a`

Builds `Fraction`.

Undocumented: summary, example.

#### `abs(a)`

Builds `Fraction`.

Undocumented: summary, example.

#### `+a`

Builds `Fraction`.

Undocumented: summary, example.

#### `a > b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FractionArg \| IntArg` |  |  |

Undocumented: summary, example.

#### `a < b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FractionArg \| IntArg` |  |  |

Undocumented: summary, example.

#### `a >= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FractionArg \| IntArg` |  |  |

Undocumented: summary, example.

#### `a <= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FractionArg \| IntArg` |  |  |

Undocumented: summary, example.

#### `.eq(other)`

Whether two fractions are equal.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FractionArg \| IntArg` |  |  |

Undocumented: example.

#### `.ne(other)`

Whether two fractions differ.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `FractionArg \| IntArg` |  |  |

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

---
title: fin
description: "Nu surface for financial value types - `Percentage` and `BasisPoint`."
---

Module `nustd.fin`.

Nu surface for financial value types - `Percentage` and `BasisPoint`.

There is no Python stdlib `fin` module; these are Nu's own value types, built
the same way the stdlib surfaces are - a native dataclass (`native`, exported
with a `Py` prefix) wrapped by a Form (`forms`) whose constructors and
methods are `interactions` atoms. Import them like the rest of the std
library:

```python
from nustd.fin import BasisPoint, Percentage       # Forms: Percentage.of(75.5)
from nustd.fin import PyBasisPoint, PyPercentage    # raw Python values
```

## ScalarQuery

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [BasisPoint](#basispoint) | `scalar_query` | `BasisPoint()` | A basis-point count as a Form - 1/100th of a percent (`500` = 5%). |
| [Percentage](#percentage) | `scalar_query` | `Percentage()` | A percentage as a Form (`75.5` = 75.5%). |

### BasisPoint

A basis-point count as a Form - 1/100th of a percent (`500` = 5%).

```python
BasisPoint()
```

Path `nustd.fin.BasisPoint`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Build one with `BasisPoint.of(500)` (or `from_pct` / `from_dec`);
convert with `to_pct` / `to_dec`; apply to an amount with `apply` /
`add_to` / `sub_from`.

**Methods**

#### `BasisPoint.of(value)`

A basis-point count from a raw int: `BasisPoint(500)`.

Builds `BasisPoint`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `IntArg` |  |  |

Undocumented: example.

#### `BasisPoint.from_pct(pct)`

From a percentage: `BasisPoint.from_pct(5.0)` -> 500 bps.

Builds `BasisPoint`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `pct` | `FloatArg` |  |  |

Undocumented: example.

#### `BasisPoint.from_dec(dec)`

From a decimal ratio: `BasisPoint.from_dec(0.05)` -> 500 bps.

Builds `BasisPoint`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `dec` | `FloatArg` |  |  |

Undocumented: example.

#### `.to_pct()`

The percentage (500 bps -> `5.0`).

Builds `Float`.

Undocumented: example.

#### `.to_dec()`

The decimal ratio (500 bps -> `0.05`).

Builds `Float`.

Undocumented: example.

#### `.to_int()`

The raw basis-point count.

Builds `Int`.

Undocumented: example.

#### `.apply(amount)`

This many basis points of `amount`.

Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `amount` | `FloatArg` |  |  |

Undocumented: example.

#### `.add_to(amount)`

`amount` grown by these basis points.

Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `amount` | `FloatArg` |  |  |

Undocumented: example.

#### `.sub_from(amount)`

`amount` reduced by these basis points.

Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `amount` | `FloatArg` |  |  |

Undocumented: example.

#### `a + b`

Builds `BasisPoint`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BasisPointArg` |  |  |

Undocumented: summary, example.

#### `a - b`

Builds `BasisPoint`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BasisPointArg` |  |  |

Undocumented: summary, example.

#### `a * b`

Builds `BasisPoint`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `factor` | `FloatArg` |  |  |

Undocumented: summary, example.

#### `a / b`

Builds `BasisPoint`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `divisor` | `FloatArg` |  |  |

Undocumented: summary, example.

#### `a // b`

Builds `BasisPoint`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `divisor` | `IntArg` |  |  |

Undocumented: summary, example.

#### `a > b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BasisPointArg` |  |  |

Undocumented: summary, example.

#### `a < b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BasisPointArg` |  |  |

Undocumented: summary, example.

#### `a >= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BasisPointArg` |  |  |

Undocumented: summary, example.

#### `a <= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BasisPointArg` |  |  |

Undocumented: summary, example.

#### `.eq(other)`

Whether two basis-point counts are equal.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BasisPointArg` |  |  |

Undocumented: example.

#### `.ne(other)`

Whether two basis-point counts differ.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BasisPointArg` |  |  |

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

### Percentage

A percentage as a Form (`75.5` = 75.5%).

```python
Percentage()
```

Path `nustd.fin.Percentage`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Build one with `Percentage.of(75.5)` (or `from_dec` / `from_bps` /
`from_ratio`); convert with `to_dec` / `to_bps`; apply to an amount
with `apply` / `add_to` / `sub_from`.

**Methods**

#### `Percentage.of(value)`

A percentage from a raw value: `Percentage(75.5)`.

Builds `Percentage`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |

Undocumented: example.

#### `Percentage.from_dec(dec)`

From a decimal ratio: `Percentage.from_dec(0.755)` -> 75.5%.

Builds `Percentage`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `dec` | `FloatArg` |  |  |

Undocumented: example.

#### `Percentage.from_bps(bps)`

From basis points: `Percentage.from_bps(7550)` -> 75.5%.

Builds `Percentage`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `bps` | `IntArg` |  |  |

Undocumented: example.

#### `Percentage.from_ratio(numerator, denominator)`

From a ratio: `Percentage.from_ratio(3, 4)` -> 75%.

Builds `Percentage`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `numerator` | `FloatArg` |  |  |
| `denominator` | `FloatArg` |  |  |

Undocumented: example.

#### `.to_dec()`

The decimal ratio (75.5% -> `0.755`).

Builds `Float`.

Undocumented: example.

#### `.to_bps()`

The basis points (75.5% -> `7550`).

Builds `Int`.

Undocumented: example.

#### `.to_float()`

The raw percentage value.

Builds `Float`.

Undocumented: example.

#### `.apply(amount)`

This percentage of `amount`.

Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `amount` | `FloatArg` |  |  |

Undocumented: example.

#### `.add_to(amount)`

`amount` grown by this percentage.

Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `amount` | `FloatArg` |  |  |

Undocumented: example.

#### `.sub_from(amount)`

`amount` reduced by this percentage.

Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `amount` | `FloatArg` |  |  |

Undocumented: example.

#### `.is_valid(min_val=0.0, max_val=100.0)`

Whether the value falls within `[min_val, max_val]`.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `min_val` | `float` | `0.0` |  |
| `max_val` | `float` | `100.0` |  |

Undocumented: example.

#### `.clamp(min_val=0.0, max_val=100.0)`

This percentage clamped to `[min_val, max_val]`.

Builds `Percentage`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `min_val` | `float` | `0.0` |  |
| `max_val` | `float` | `100.0` |  |

Undocumented: example.

#### `a + b`

Builds `Percentage`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `PercentageArg` |  |  |

Undocumented: summary, example.

#### `a - b`

Builds `Percentage`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `PercentageArg` |  |  |

Undocumented: summary, example.

#### `a * b`

Builds `Percentage`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `factor` | `FloatArg` |  |  |

Undocumented: summary, example.

#### `a / b`

Builds `Percentage`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `divisor` | `FloatArg` |  |  |

Undocumented: summary, example.

#### `-a`

Builds `Percentage`.

Undocumented: summary, example.

#### `a > b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `PercentageArg` |  |  |

Undocumented: summary, example.

#### `a < b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `PercentageArg` |  |  |

Undocumented: summary, example.

#### `a >= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `PercentageArg` |  |  |

Undocumented: summary, example.

#### `a <= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `PercentageArg` |  |  |

Undocumented: summary, example.

#### `.eq(other)`

Whether two percentages are equal.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `PercentageArg` |  |  |

Undocumented: example.

#### `.ne(other)`

Whether two percentages differ.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `PercentageArg` |  |  |

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

---
title: refs.std
description: "Dict-substrate refs for standard-library value types."
---

Module `nustd.mem.refs.std`.

Dict-substrate refs for standard-library value types.

Each ref is a typed slot in the nested-dict substrate whose stored form differs
from its domain type, so it overrides `store` (domain -> storage) and
`coerce` (storage -> domain). The value interface comes from mixing in the
matching `nustd` Form, exactly as `IntRef` mixes in `Int`.

- Decimal / Fraction / complex / Path / UUID: `str`
- date / datetime / time / timezone: `str` (ISO / offset)
- BasisPoint: `int` (raw basis points)
- Percentage: `float` (raw percentage)
- timedelta: `float` (total seconds)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [BasisPointRef](#basispointref) | `ref` | `BasisPointRef(address, parent_ref=None, owner_shape=None)` | A BasisPoint slot in the dict substrate, stored as a raw int of bps. |
| [ComplexRef](#complexref) | `ref` | `ComplexRef(address, parent_ref=None, owner_shape=None)` | A complex slot in the dict substrate, stored as `str(complex)`. |
| [DateRef](#dateref) | `ref` | `DateRef(address, parent_ref=None, owner_shape=None)` | A date slot in the dict substrate, stored as an ISO string. |
| [DatetimeRef](#datetimeref) | `ref` | `DatetimeRef(address, parent_ref=None, owner_shape=None)` | A datetime slot in the dict substrate, stored as an ISO string. |
| [DecimalRef](#decimalref) | `ref` | `DecimalRef(address, parent_ref=None, owner_shape=None)` | A Decimal slot in the dict substrate, stored as its exact string form. |
| [FractionRef](#fractionref) | `ref` | `FractionRef(address, parent_ref=None, owner_shape=None)` | A Fraction slot in the dict substrate, stored as `"numerator/denom"`. |
| [PathRef](#pathref) | `ref` | `PathRef(address, parent_ref=None, owner_shape=None)` | A filesystem path slot in the dict substrate, stored as a plain str. |
| [PercentageRef](#percentageref) | `ref` | `PercentageRef(address, parent_ref=None, owner_shape=None)` | A Percentage slot in the dict substrate, stored as a raw float. |
| [TimeRef](#timeref) | `ref` | `TimeRef(address, parent_ref=None, owner_shape=None)` | A time-of-day slot in the dict substrate, stored as an ISO string. |
| [TimedeltaRef](#timedeltaref) | `ref` | `TimedeltaRef(address, parent_ref=None, owner_shape=None)` | A timedelta slot in the dict substrate, stored as total seconds. |
| [TimezoneRef](#timezoneref) | `ref` | `TimezoneRef(address, parent_ref=None, owner_shape=None)` | A fixed-offset timezone slot, stored as its `UTC±HH:MM` string. |
| [UUIDRef](#uuidref) | `ref` | `UUIDRef(address, parent_ref=None, owner_shape=None)` | A UUID slot in the dict substrate, stored as its hyphenated string. |

## BasisPointRef

A BasisPoint slot in the dict substrate, stored as a raw int of bps.

```python
BasisPointRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.BasisPointRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Stored as the bps count itself (250 for 2.5%), an int, so no rounding creeps in the way a stored float would.

**Example**

```python
from nustd.fin import PyBasisPoint
class Fees(nu.Shape):
    taker = nustd.mem.BasisPointRef.slot()
data = {}
ctx = nu.Context().bind(dict, data, Fees)
_ = nu.run(Fees.taker.set(PyBasisPoint(250)), ctx)
data
nu.run(Fees.taker.apply(1000), ctx)[0]
```

```
{'taker': 250}
25.0
```

**Methods**

### `.set(value)`

Write a BasisPoint into the slot as a raw int of bps.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[PyBasisPoint \| int]` |  |  |

**Notes**

- A plain Python value is converted at tree-build time; a Nu operand gets a `ToInt` node instead.

Undocumented: example.

**Inherited methods**

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nustd.fin.forms.BasisPoint`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `BasisPointRef.of(value)` | `BasisPoint` | A basis-point count from a raw int: `BasisPoint(500)`. |
| `BasisPointRef.from_pct(pct)` | `BasisPoint` | From a percentage: `BasisPoint.from_pct(5.0)` -> 500 bps. |
| `BasisPointRef.from_dec(dec)` | `BasisPoint` | From a decimal ratio: `BasisPoint.from_dec(0.05)` -> 500 bps. |
| `.to_pct()` | `Float` | The percentage (500 bps -> `5.0`). |
| `.to_dec()` | `Float` | The decimal ratio (500 bps -> `0.05`). |
| `.to_int()` | `Int` | The raw basis-point count. |
| `.apply(amount)` | `Float` | This many basis points of `amount`. |
| `.add_to(amount)` | `Float` | `amount` grown by these basis points. |
| `.sub_from(amount)` | `Float` | `amount` reduced by these basis points. |
| `a + b` | `BasisPoint` |  |
| `a - b` | `BasisPoint` |  |
| `a * b` | `BasisPoint` |  |
| `a / b` | `BasisPoint` |  |
| `a // b` | `BasisPoint` |  |
| `a > b` | `Bool` |  |
| `a < b` | `Bool` |  |
| `a >= b` | `Bool` |  |
| `a <= b` | `Bool` |  |
| `.eq(other)` | `Bool` | Whether two basis-point counts are equal. |
| `.ne(other)` | `Bool` | Whether two basis-point counts differ. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## ComplexRef

A complex slot in the dict substrate, stored as `str(complex)`.

```python
ComplexRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.ComplexRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- `str(complex)` is what `complex(str)` reads back, so the value round-trips exactly, parentheses and all.

**Example**

```python
class Signal(nu.Shape):
    amp = nustd.mem.ComplexRef.slot()
data = {}
ctx = nu.Context().bind(dict, data, Signal)
_ = nu.run(Signal.amp.set(complex(1, 2)), ctx)
data
nu.run(Signal.amp.real(), ctx)[0]
```

```
{'amp': '(1+2j)'}
1.0
```

**Methods**

### `.set(value)`

Write a complex into the slot as its string form.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[complex \| str]` |  |  |

**Notes**

- A plain Python value is serialised at tree-build time; a Nu operand gets a `ToStr` node instead.

Undocumented: example.

**Inherited methods**

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nustd.cmath.forms.complex`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `ComplexRef.of(real=0, imag=0)` | `complex` | Build a complex number: `complex(real, imag)`. |
| `.real()` | `Float` | The real part. |
| `.imag()` | `Float` | The imaginary part. |
| `.conjugate()` | `complex` | The complex conjugate (negates the imaginary part). |
| `a + b` | `complex` |  |
| `a - b` | `complex` |  |
| `a * b` | `complex` |  |
| `a / b` | `complex` |  |
| `a ** b` | `complex` |  |
| `-a` | `complex` |  |
| `+a` | `complex` |  |
| `abs(a)` | `Float` |  |
| `.eq(other)` | `Bool` | Whether two complex numbers are equal. |
| `.ne(other)` | `Bool` | Whether two complex numbers differ. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## DateRef

A date slot in the dict substrate, stored as an ISO string.

```python
DateRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.DateRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Stored as `YYYY-MM-DD`, so the data dict stays readable and sorts by date lexicographically.
- A datetime written here is stringified whole, and reading it back as a date then fails on the time part; write `d.date()`.

**Example**

```python
from datetime import date
class Trade(nu.Shape):
    day = nustd.mem.DateRef.slot()
data = {}
ctx = nu.Context().bind(dict, data, Trade)
_ = nu.run(Trade.day.set(date(2024, 1, 2)), ctx)
data
nu.run(Trade.day.year(), ctx)[0]
```

```
{'day': '2024-01-02'}
2024
```

**Methods**

### `.set(value)`

Write a date into the slot as an ISO string.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[date \| str]` |  |  |

**Notes**

- A date is formatted at tree-build time and anything else is passed through `str`; a Nu operand gets a `ToStr` node, so what it yields has to be something `date.fromisoformat` accepts.

Undocumented: example.

**Inherited methods**

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nustd.datetime.forms.date`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `DateRef.of(year, month, day)` | `date` | Build a date: `date(year, month, day)`. |
| `DateRef.today()` | `date` | Today's date: `date.today()`. |
| `DateRef.from_iso(value)` | `date` | Parse an ISO date string: `date.fromisoformat(s)`. |
| `DateRef.from_ordinal(value)` | `date` | From a proleptic Gregorian ordinal: `date.fromordinal(n)`. |
| `DateRef.from_timestamp(value)` | `date` | From a POSIX timestamp: `date.fromtimestamp(t)`. |
| `.year()` | `Int` | The year. |
| `.month()` | `Int` | The month (1..12). |
| `.day()` | `Int` | The day of the month (1..31). |
| `.weekday()` | `Int` | The day of week, Monday=0. |
| `.isoweekday()` | `Int` | The day of week, Monday=1. |
| `.toordinal()` | `Int` | The proleptic Gregorian ordinal. |
| `.isoformat()` | `Str` | The date as an ISO string (YYYY-MM-DD). |
| `.ctime()` | `Str` | The date as a C-style string. |
| `.strftime(fmt)` | `Str` | Format the date with a strftime pattern. |
| `.replace(year=None, month=None, day=None)` | `date` | A copy with the given components replaced. |
| `a + b` | `date` |  |
| `a - b` | `date \| timedelta` |  |
| `a > b` | `Bool` |  |
| `a < b` | `Bool` |  |
| `a >= b` | `Bool` |  |
| `a <= b` | `Bool` |  |
| `.eq(other)` | `Bool` | Whether two dates are equal. |
| `.ne(other)` | `Bool` | Whether two dates differ. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## DatetimeRef

A datetime slot in the dict substrate, stored as an ISO string.

```python
DatetimeRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.DatetimeRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Whatever tzinfo the value carries rides along in the ISO string and comes back with it; a naive datetime stays naive.
- A number found in the slot is read as a UTC epoch timestamp, so a dict filled from a feed that stores epochs still lifts.

**Example**

```python
from datetime import datetime
class Event(nu.Shape):
    at = nustd.mem.DatetimeRef.slot()
data = {}
ctx = nu.Context().bind(dict, data, Event)
_ = nu.run(Event.at.set(datetime(2024, 1, 2, 3, 4)), ctx)
data
nu.run(Event.at.hour(), ctx)[0]
```

```
{'at': '2024-01-02T03:04:00'}
3
```

**Methods**

### `.set(value)`

Write a datetime into the slot as an ISO string.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[datetime \| str]` |  |  |

**Notes**

- A datetime is formatted at tree-build time and anything else is passed through `str`; a Nu operand gets a `ToStr` node.

Undocumented: example.

**Inherited methods**

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nustd.datetime.forms.datetime`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `DatetimeRef.of(year, month, day, hour=0, minute=0, second=0, microsecond=0)` | `datetime` | Build a datetime: `datetime(year, month, day, hour, ...)`. |
| `DatetimeRef.now(tz=None)` | `datetime` | The current local (or `tz`) datetime: `datetime.now(tz)`. |
| `DatetimeRef.from_iso(value)` | `datetime` | Parse an ISO datetime string: `datetime.fromisoformat(s)`. |
| `DatetimeRef.from_timestamp(value, tz=None)` | `datetime` | From a POSIX timestamp: `datetime.fromtimestamp(ts, tz)`. |
| `DatetimeRef.combine(date_value, time_value)` | `datetime` | Combine a date and a time: `datetime.combine(date, time)`. |
| `.year()` | `Int` | The year. |
| `.month()` | `Int` | The month (1..12). |
| `.day()` | `Int` | The day of the month (1..31). |
| `.hour()` | `Int` | The hour (0..23). |
| `.minute()` | `Int` | The minute (0..59). |
| `.second()` | `Int` | The second (0..59). |
| `.microsecond()` | `Int` | The microsecond (0..999999). |
| `.weekday()` | `Int` | The day of week, Monday=0. |
| `.isoweekday()` | `Int` | The day of week, Monday=1. |
| `.timestamp()` | `Float` | The POSIX timestamp. |
| `.isoformat()` | `Str` | The datetime as an ISO string. |
| `.strftime(fmt)` | `Str` | Format the datetime with a strftime pattern. |
| `.date()` | `date` | The date part. |
| `.time()` | `time` | The time part. |
| `.replace(year=None, month=None, day=None, hour=None, minute=None, second=None, microsecond=None)` | `datetime` | A copy with the given components replaced. |
| `a + b` | `datetime` |  |
| `a - b` | `datetime \| timedelta` |  |
| `a > b` | `Bool` |  |
| `a < b` | `Bool` |  |
| `a >= b` | `Bool` |  |
| `a <= b` | `Bool` |  |
| `.eq(other)` | `Bool` | Whether two datetimes are equal. |
| `.ne(other)` | `Bool` | Whether two datetimes differ. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## DecimalRef

A Decimal slot in the dict substrate, stored as its exact string form.

```python
DecimalRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.DecimalRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- The stored string is `str(Decimal)`, so precision and trailing zeros survive the round trip where a float would lose them.
- A Decimal already sitting in the data dict is read as it is, so a dict populated by hand works either way.

**Example**

```python
from decimal import Decimal
class Quote(nu.Shape):
    price = nustd.mem.DecimalRef.slot()
data = {}
ctx = nu.Context().bind(dict, data, Quote)
_ = nu.run(Quote.price.set(Decimal("1.250")), ctx)
data
nu.run(Quote.price, ctx)[0]
```

```
{'price': '1.250'}
Decimal('1.250')
```

**Methods**

### `.set(value)`

Write a Decimal into the slot as its string form.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[Decimal \| str]` |  |  |

**Notes**

- A plain Python value is serialised now, at tree-build time; a Nu operand gets a `ToStr` node instead, serialised when the tree runs.

Undocumented: example.

**Inherited methods**

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nustd.decimal.forms.Decimal`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `DecimalRef.of(value)` | `Decimal` | Build a decimal from a string or int, exactly: `Decimal(str(value))`. |
| `DecimalRef.from_float(value)` | `Decimal` | From a binary float: `Decimal.from_float(f)` (carries float error). |
| `a + b` | `Decimal` |  |
| `a - b` | `Decimal` |  |
| `a * b` | `Decimal` |  |
| `a / b` | `Decimal` |  |
| `a // b` | `Decimal` |  |
| `a % b` | `Decimal` |  |
| `a ** b` | `Decimal` |  |
| `-a` | `Decimal` |  |
| `abs(a)` | `Decimal` |  |
| `+a` | `Decimal` |  |
| `.quantize(exp)` | `Decimal` | Round to the exponent of `exp` (e.g. `Decimal.of("0.01")`). |
| `.normalize()` | `Decimal` | A canonical form with trailing zeros removed. |
| `.to_integral_value()` | `Decimal` | The value rounded to the nearest integer, kept as a `Decimal`. |
| `.sqrt()` | `Decimal` | The square root. |
| `.exp()` | `Decimal` | The exponential, `e ** self`. |
| `.ln()` | `Decimal` | The natural logarithm. |
| `.log10()` | `Decimal` | The base-10 logarithm. |
| `.compare(other)` | `Decimal` | `Decimal('-1')` / `'0'` / `'1'` for `self` <, ==, > `other`. |
| `.copy_abs()` | `Decimal` | The absolute value (context-free, no rounding). |
| `.copy_negate()` | `Decimal` | The negation (context-free, no rounding). |
| `.adjusted()` | `Int` | The adjusted exponent after shifting out the coefficient's digits. |
| `.as_integer_ratio()` | `Tuple` | The exact value as a `(numerator, denominator)` pair of ints. |
| `.is_finite()` | `Bool` | Whether the value is finite (not infinite, not NaN). |
| `.is_infinite()` | `Bool` | Whether the value is positive or negative infinity. |
| `.is_nan()` | `Bool` | Whether the value is a NaN (quiet or signaling). |
| `.is_zero()` | `Bool` | Whether the value is zero (positive or negative). |
| `.is_signed()` | `Bool` | Whether the sign bit is set (negative, including `-0`). |
| `a > b` | `Bool` |  |
| `a < b` | `Bool` |  |
| `a >= b` | `Bool` |  |
| `a <= b` | `Bool` |  |
| `.eq(other)` | `Bool` | Whether two decimals are equal in value. |
| `.ne(other)` | `Bool` | Whether two decimals differ in value. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## FractionRef

A Fraction slot in the dict substrate, stored as `"numerator/denom"`.

```python
FractionRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.FractionRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- The stored string is `str(Fraction)`, already in lowest terms, so the exact ratio round-trips.

**Example**

```python
from fractions import Fraction
class Split(nu.Shape):
    share = nustd.mem.FractionRef.slot()
data = {}
ctx = nu.Context().bind(dict, data, Split)
_ = nu.run(Split.share.set(Fraction(3, 4)), ctx)
data
nu.run(Split.share, ctx)[0]
```

```
{'share': '3/4'}
Fraction(3, 4)
```

**Methods**

### `.set(value)`

Write a Fraction into the slot as its string form.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[Fraction \| str]` |  |  |

**Notes**

- A plain Python value is serialised at tree-build time; a Nu operand gets a `ToStr` node instead.

Undocumented: example.

**Inherited methods**

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nustd.fractions.forms.Fraction`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `FractionRef.of(numerator, denominator=1)` | `Fraction` | Build a fraction from numerator and denominator: `Fraction(n, d)`. |
| `FractionRef.from_float(value)` | `Fraction` | The exact fraction equal to a float: `Fraction.from_float(f)`. |
| `FractionRef.from_decimal(value)` | `Fraction` | The exact fraction equal to a Decimal: `Fraction.from_decimal(d)`. |
| `FractionRef.from_str(value)` | `Fraction` | Parse a fraction string: `Fraction(s)` (e.g. `"3/4"`, `"1.5"`). |
| `.numerator()` | `Int` | The numerator (in lowest terms). |
| `.denominator()` | `Int` | The denominator (in lowest terms, always positive). |
| `.limit_denominator(max_denominator=1000000)` | `Fraction` | The closest fraction with denominator at most `max_denominator`. |
| `.as_integer_ratio()` | `Tuple` | The `(numerator, denominator)` pair as a tuple. |
| `a + b` | `Fraction` |  |
| `a - b` | `Fraction` |  |
| `a * b` | `Fraction` |  |
| `a / b` | `Fraction` |  |
| `a // b` | `Fraction` |  |
| `a % b` | `Fraction` |  |
| `a ** b` | `Fraction` |  |
| `-a` | `Fraction` |  |
| `abs(a)` | `Fraction` |  |
| `+a` | `Fraction` |  |
| `a > b` | `Bool` |  |
| `a < b` | `Bool` |  |
| `a >= b` | `Bool` |  |
| `a <= b` | `Bool` |  |
| `.eq(other)` | `Bool` | Whether two fractions are equal. |
| `.ne(other)` | `Bool` | Whether two fractions differ. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## PathRef

A filesystem path slot in the dict substrate, stored as a plain str.

```python
PathRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.PathRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Lifted to a `PurePath`, so the flavour follows the machine reading it: the same stored string is a PurePosixPath on Linux and a PureWindowsPath on Windows.
- Pure means no filesystem: the calls take the path apart and put it back together, they never touch disk.

**Example**

```python
from pathlib import PurePath
class Cfg(nu.Shape):
    root = nustd.mem.PathRef.slot()
data = {}
ctx = nu.Context().bind(dict, data, Cfg)
_ = nu.run(Cfg.root.set(PurePath("/srv/app.toml")), ctx)
data
nu.run(Cfg.root.name(), ctx)[0]
```

```
{'root': '/srv/app.toml'}
'app.toml'
```

**Methods**

### `.set(value)`

Write a path into the slot as a plain string.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[PurePath \| str]` |  |  |

**Notes**

- A plain Python value goes through `str` at tree-build time; a Nu operand gets a `ToStr` node.

Undocumented: example.

**Inherited methods**

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nustd.pathlib.forms.Path`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `PathRef.of()` | `Path` | Build a path from segments: `PurePath(*segments)`. |
| `PathRef.cwd()` | `Path` | The current working directory: `Path.cwd()`. |
| `PathRef.home()` | `Path` | The user's home directory: `Path.home()`. |
| `.name()` | `Str` | The final component (filename). |
| `.stem()` | `Str` | The final component without its suffix. |
| `.suffix()` | `Str` | The file extension of the final component (including the dot). |
| `.suffixes()` | `List` | All file extensions of the final component. |
| `.parts()` | `Tuple` | The path's components as a tuple. |
| `.parent()` | `Path` | The logical parent of the path. |
| `.root()` | `Str` | The root (e.g. `/` on POSIX). |
| `.anchor()` | `Str` | The concatenation of drive and root. |
| `.drive()` | `Str` | The drive (empty on POSIX). |
| `.with_name(name)` | `Path` | A copy with the final component's name replaced. |
| `.with_stem(stem)` | `Path` | A copy with the final component's stem replaced. |
| `.with_suffix(suffix)` | `Path` | A copy with the final component's suffix replaced. |
| `.joinpath()` | `Path` | Join one or more components onto the path. |
| `.relative_to(other)` | `Path` | The path relative to `other`. |
| `a / b` | `Path` | Join with `/`: `Path.of("a") / "b"`. |
| `.as_posix()` | `Str` | The path as a string with forward slashes. |
| `.as_uri()` | `Str` | The path as a `file://` URI (requires an absolute path). |
| `.match(pattern)` | `Bool` | Whether the path matches a glob pattern. |
| `.is_absolute()` | `Bool` | Whether the path is absolute. |
| `.is_relative_to(other)` | `Bool` | Whether the path is relative to `other`. |
| `a > b` | `Bool` |  |
| `a < b` | `Bool` |  |
| `a >= b` | `Bool` |  |
| `a <= b` | `Bool` |  |
| `.eq(other)` | `Bool` | Whether two paths are equal. |
| `.ne(other)` | `Bool` | Whether two paths differ. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## PercentageRef

A Percentage slot in the dict substrate, stored as a raw float.

```python
PercentageRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.PercentageRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Stored as the percentage number itself (2.5 for 2.5%), not the 0.025 decimal fraction.

**Example**

```python
from nustd.fin import PyPercentage
class Fees(nu.Shape):
    rate = nustd.mem.PercentageRef.slot()
data = {}
ctx = nu.Context().bind(dict, data, Fees)
_ = nu.run(Fees.rate.set(PyPercentage(2.5)), ctx)
data
nu.run(Fees.rate.to_bps(), ctx)[0]
```

```
{'rate': 2.5}
250
```

**Methods**

### `.set(value)`

Write a Percentage into the slot as a raw float.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[PyPercentage \| float]` |  |  |

**Notes**

- A plain Python value is converted at tree-build time; a Nu operand gets a `ToFloat` node instead.

Undocumented: example.

**Inherited methods**

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nustd.fin.forms.Percentage`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `PercentageRef.of(value)` | `Percentage` | A percentage from a raw value: `Percentage(75.5)`. |
| `PercentageRef.from_dec(dec)` | `Percentage` | From a decimal ratio: `Percentage.from_dec(0.755)` -> 75.5%. |
| `PercentageRef.from_bps(bps)` | `Percentage` | From basis points: `Percentage.from_bps(7550)` -> 75.5%. |
| `PercentageRef.from_ratio(numerator, denominator)` | `Percentage` | From a ratio: `Percentage.from_ratio(3, 4)` -> 75%. |
| `.to_dec()` | `Float` | The decimal ratio (75.5% -> `0.755`). |
| `.to_bps()` | `Int` | The basis points (75.5% -> `7550`). |
| `.to_float()` | `Float` | The raw percentage value. |
| `.apply(amount)` | `Float` | This percentage of `amount`. |
| `.add_to(amount)` | `Float` | `amount` grown by this percentage. |
| `.sub_from(amount)` | `Float` | `amount` reduced by this percentage. |
| `.is_valid(min_val=0.0, max_val=100.0)` | `Bool` | Whether the value falls within `[min_val, max_val]`. |
| `.clamp(min_val=0.0, max_val=100.0)` | `Percentage` | This percentage clamped to `[min_val, max_val]`. |
| `a + b` | `Percentage` |  |
| `a - b` | `Percentage` |  |
| `a * b` | `Percentage` |  |
| `a / b` | `Percentage` |  |
| `-a` | `Percentage` |  |
| `a > b` | `Bool` |  |
| `a < b` | `Bool` |  |
| `a >= b` | `Bool` |  |
| `a <= b` | `Bool` |  |
| `.eq(other)` | `Bool` | Whether two percentages are equal. |
| `.ne(other)` | `Bool` | Whether two percentages differ. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## TimeRef

A time-of-day slot in the dict substrate, stored as an ISO string.

```python
TimeRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.TimeRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Stored as `HH:MM:SS`, with microseconds and a tz offset appended only when the value carries them.

**Example**

```python
from datetime import time
class Session(nu.Shape):
    opens = nustd.mem.TimeRef.slot()
data = {}
ctx = nu.Context().bind(dict, data, Session)
_ = nu.run(Session.opens.set(time(9, 30)), ctx)
data
nu.run(Session.opens.minute(), ctx)[0]
```

```
{'opens': '09:30:00'}
30
```

**Methods**

### `.set(value)`

Write a time into the slot as an ISO string.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[time \| str]` |  |  |

**Notes**

- A time is formatted at tree-build time and anything else is passed through `str`; a Nu operand gets a `ToStr` node.

Undocumented: example.

**Inherited methods**

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nustd.datetime.forms.time`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `TimeRef.of(hour=0, minute=0, second=0, microsecond=0)` | `time` | Build a time: `time(hour, minute, second, microsecond)`. |
| `TimeRef.from_iso(value)` | `time` | Parse an ISO time string: `time.fromisoformat(s)`. |
| `.hour()` | `Int` | The hour (0..23). |
| `.minute()` | `Int` | The minute (0..59). |
| `.second()` | `Int` | The second (0..59). |
| `.microsecond()` | `Int` | The microsecond (0..999999). |
| `.isoformat()` | `Str` | The time as an ISO string. |
| `.strftime(fmt)` | `Str` | Format the time with a strftime pattern. |
| `.replace(hour=None, minute=None, second=None, microsecond=None)` | `time` | A copy with the given components replaced. |
| `a > b` | `Bool` |  |
| `a < b` | `Bool` |  |
| `a >= b` | `Bool` |  |
| `a <= b` | `Bool` |  |
| `.eq(other)` | `Bool` | Whether two times are equal. |
| `.ne(other)` | `Bool` | Whether two times differ. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## TimedeltaRef

A timedelta slot in the dict substrate, stored as total seconds.

```python
TimedeltaRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.TimedeltaRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- One float of seconds, so the stored number compares and sums directly without going through the ref.
- Sub-microsecond precision is lost, the same as `timedelta.total_seconds()` loses it.

**Example**

```python
from datetime import timedelta
class Job(nu.Shape):
    took = nustd.mem.TimedeltaRef.slot()
data = {}
ctx = nu.Context().bind(dict, data, Job)
_ = nu.run(Job.took.set(timedelta(minutes=90)), ctx)
data
nu.run(Job.took.seconds(), ctx)[0]
```

```
{'took': 5400.0}
5400
```

**Methods**

### `.set(value)`

Write a timedelta into the slot as a float of total seconds.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[timedelta \| float]` |  |  |

**Notes**

- A timedelta is converted at tree-build time and a plain number is taken as seconds already; a Nu operand gets a `TimedeltaTotalSeconds` node, so it must yield a timedelta.

Undocumented: example.

**Inherited methods**

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nustd.datetime.forms.timedelta`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `TimedeltaRef.of(days=0, seconds=0, microseconds=0, milliseconds=0, minutes=0, hours=0, weeks=0)` | `timedelta` | Build a timedelta from its components: `timedelta(...)`. |
| `.days()` | `Int` | The whole-days component. |
| `.seconds()` | `Int` | The seconds component (0..86399). |
| `.microseconds()` | `Int` | The microseconds component (0..999999). |
| `.total_seconds()` | `Float` | The total duration in seconds. |
| `a + b` | `timedelta` |  |
| `a - b` | `timedelta` |  |
| `a * b` | `timedelta` |  |
| `a / b` | `timedelta \| Float` |  |
| `a // b` | `timedelta` |  |
| `a % b` | `timedelta` |  |
| `-a` | `timedelta` |  |
| `abs(a)` | `timedelta` |  |
| `+a` | `timedelta` |  |
| `a > b` | `Bool` |  |
| `a < b` | `Bool` |  |
| `a >= b` | `Bool` |  |
| `a <= b` | `Bool` |  |
| `.eq(other)` | `Bool` | Whether two spans are equal. |
| `.ne(other)` | `Bool` | Whether two spans differ. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## TimezoneRef

A fixed-offset timezone slot, stored as its `UTC±HH:MM` string.

```python
TimezoneRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.TimezoneRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Only fixed offsets survive: the stored text is what `str` gives a `datetime.timezone`, and a named zone (`ZoneInfo`) written here does not come back as one.
- Reading parses the offset by hand, hours and optional minutes, so `"UTC"` alone lifts to UTC.

**Example**

```python
from datetime import timedelta, timezone
class Site(nu.Shape):
    tz = nustd.mem.TimezoneRef.slot()
data = {}
ctx = nu.Context().bind(dict, data, Site)
_ = nu.run(Site.tz.set(timezone(timedelta(hours=5, minutes=30))), ctx)
data
nu.run(Site.tz, ctx)[0]
```

```
{'tz': 'UTC+05:30'}
datetime.timezone(datetime.timedelta(seconds=19800))
```

**Methods**

### `.set(value)`

Write a timezone into the slot as its offset string.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[timezone \| str]` |  |  |

**Notes**

- A plain Python value goes through `str` at tree-build time; a Nu operand gets a `ToStr` node.

Undocumented: example.

**Inherited methods**

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nustd.datetime.forms.timezone`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `TimezoneRef.of(offset, name=None)` | `timezone` | Build a fixed-offset zone: `timezone(offset, name)`. |
| `TimezoneRef.utc()` | `timezone` | The UTC zone: `timezone.utc`. |
| `.utcoffset(dt=None)` | `timedelta` | The offset from UTC as a timedelta. |
| `.tzname(dt=None)` | `Str` | The zone's name. |
| `.dst(dt=None)` | `None_` | Daylight-saving adjustment (always None for a fixed offset). |
| `.eq(other)` | `Bool` | Whether two zones are equal. |
| `.ne(other)` | `Bool` | Whether two zones differ. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## UUIDRef

A UUID slot in the dict substrate, stored as its hyphenated string.

```python
UUIDRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.UUIDRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Parsing on read is `uuid.UUID(str)`, which takes the hyphenated form, a bare hex run, or a URN, so a hand-filled dict is forgiving.

**Example**

```python
import uuid
class Row(nu.Shape):
    rid = nustd.mem.UUIDRef.slot()
data = {}
ctx = nu.Context().bind(dict, data, Row)
_ = nu.run(Row.rid.set(uuid.UUID(int=1)), ctx)
data
nu.run(Row.rid.int_(), ctx)[0]
```

```
{'rid': '00000000-0000-0000-0000-000000000001'}
1
```

**Methods**

### `.set(value)`

Write a UUID into the slot as its hyphenated string.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[UUID \| str]` |  |  |

**Notes**

- A plain Python value goes through `str` at tree-build time; a Nu operand gets a `ToStr` node.

Undocumented: example.

**Inherited methods**

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nustd.uuid.forms.UUID`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `UUIDRef.from_str(value)` | `UUID` | Parse a hex string (with or without hyphens) into a UUID. |
| `UUIDRef.from_bytes(value)` | `UUID` | Build a UUID from 16 bytes. |
| `UUIDRef.from_int(value)` | `UUID` | Build a UUID from a 128-bit integer. |
| `.version()` | `Int` | The version number (1, 3, 4, or 5). |
| `.variant()` | `Str` | The variant. |
| `.time()` | `Int` | The 60-bit timestamp (version 1). |
| `.clock_seq()` | `Int` | The 14-bit clock sequence (version 1). |
| `.node()` | `Int` | The 48-bit node (version 1). |
| `.hex()` | `Str` | The UUID as a 32-character hex string. |
| `.urn()` | `Str` | The UUID as a URN (`urn:uuid:...`). |
| `.bytes()` | `Bytes` | The UUID as 16 bytes. |
| `.bytes_le()` | `Bytes` | The UUID as 16 bytes, little-endian. |
| `.int_()` | `Int` | The UUID as a 128-bit integer. |
| `a > b` | `Bool` |  |
| `a < b` | `Bool` |  |
| `a >= b` | `Bool` |  |
| `a <= b` | `Bool` |  |
| `.eq(other)` | `Bool` | Whether two UUIDs are equal. |
| `.ne(other)` | `Bool` | Whether two UUIDs differ. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

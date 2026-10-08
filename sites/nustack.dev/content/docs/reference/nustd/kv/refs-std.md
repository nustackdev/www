---
title: refs.std
description: "virtuals-substrate refs for standard-library value types."
---

Module `nustd.kv.refs.std`.

virtuals-substrate refs for standard-library value types.

Each ref is a typed leaf on the virtuals View substrate whose stored form differs
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
| [BasisPointRef](#basispointref) | `ref` | `BasisPointRef(address, parent_ref=None, owner_shape=None)` | A BasisPoint leaf in KV storage, stored as the raw int count of bps. |
| [ComplexRef](#complexref) | `ref` | `ComplexRef(address, parent_ref=None, owner_shape=None)` | A complex leaf in KV storage, stored as the str Python prints for it. |
| [DateRef](#dateref) | `ref` | `DateRef(address, parent_ref=None, owner_shape=None)` | A date leaf in KV storage, stored as an ISO `YYYY-MM-DD` str. |
| [DatetimeRef](#datetimeref) | `ref` | `DatetimeRef(address, parent_ref=None, owner_shape=None)` | A datetime leaf in KV storage, stored as an ISO str. |
| [DecimalRef](#decimalref) | `ref` | `DecimalRef(address, parent_ref=None, owner_shape=None)` | A Decimal leaf in KV storage, kept exact by storing its str form. |
| [FractionRef](#fractionref) | `ref` | `FractionRef(address, parent_ref=None, owner_shape=None)` | A Fraction leaf in KV storage, stored as its `numerator/denominator` str. |
| [PathRef](#pathref) | `ref` | `PathRef(address, parent_ref=None, owner_shape=None)` | A filesystem path leaf in KV storage, stored as its str form. |
| [PercentageRef](#percentageref) | `ref` | `PercentageRef(address, parent_ref=None, owner_shape=None)` | A Percentage leaf in KV storage, stored as the raw float percentage. |
| [TimeRef](#timeref) | `ref` | `TimeRef(address, parent_ref=None, owner_shape=None)` | A time-of-day leaf in KV storage, stored as an ISO `HH:MM:SS` str. |
| [TimedeltaRef](#timedeltaref) | `ref` | `TimedeltaRef(address, parent_ref=None, owner_shape=None)` | A timedelta leaf in KV storage, stored as a float count of seconds. |
| [TimezoneRef](#timezoneref) | `ref` | `TimezoneRef(address, parent_ref=None, owner_shape=None)` | A fixed-offset timezone leaf in KV storage, stored as its offset str. |
| [UUIDRef](#uuidref) | `ref` | `UUIDRef(address, parent_ref=None, owner_shape=None)` | A UUID leaf in KV storage, stored as its canonical hyphenated str. |

## BasisPointRef

A BasisPoint leaf in KV storage, stored as the raw int count of bps.

```python
BasisPointRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.BasisPointRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Stored as an int, so a rate is exact and no float rounding creeps in between writes and reads.
- Reads wrap the int back into a BasisPoint, so the conversions (`to_pct`, `to_dec`) and the fee helpers are there on the ref.
- An absent leaf reads as EMPTY, not as zero bps.

**Example**

```python
class Fee(Shape):
    taker = BasisPointRef.slot()
run(Fee.taker.set(25), ctx)
```

**Methods**

### `.set(value)`

Write a BasisPoint to the leaf, serialized to its raw int.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[PyBasisPoint \| int]` |  | a BasisPoint, an int count of bps, or an expression yielding either. |

**Notes**

- A plain value goes through `int()` before the write; an expression is wrapped in a ToInt. Either way a fractional input truncates toward zero rather than rounding.

**Example**

```python
run(Fee.taker.set(25), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

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

A complex leaf in KV storage, stored as the str Python prints for it.

```python
ComplexRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.ComplexRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Stored as str because a KV leaf holds one scalar; the pair is kept in the one text rather than in two slots.
- Reads parse back to a complex, so `real`, `imag` and the arithmetic all work on the value.
- An absent leaf reads as EMPTY.

**Example**

```python
class Wave(Shape):
    amplitude = ComplexRef.slot()
run(Wave.amplitude.set(complex(1, 2)), ctx)
```

**Methods**

### `.set(value)`

Write a complex to the leaf, serialized to its str form.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[complex \| str]` |  | a complex, a str spelling one, or an expression yielding either. |

**Notes**

- A plain value is stringified before the write; an expression is wrapped in a ToStr so the conversion happens at run time.

**Example**

```python
run(Wave.amplitude.set(complex(1, 2)), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

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

A date leaf in KV storage, stored as an ISO `YYYY-MM-DD` str.

```python
DateRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.DateRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- ISO on disk, so stored dates sort lexicographically in the same order they sort chronologically.
- Reads parse back to a date, so the field accessors and the arithmetic work on the value.
- An absent leaf reads as EMPTY.

**Example**

```python
class Order(Shape):
    booked = DateRef.slot()
run(Order.booked.set(date(2026, 1, 31)), ctx)
```

**Methods**

### `.set(value)`

Write a date to the leaf, serialized to an ISO str.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[date \| str]` |  | a date, an ISO str, or an expression yielding either. |

**Notes**

- A plain date is written with `isoformat`; anything else plain is stringified, and an expression is wrapped in a ToStr.
- A datetime passed here is a date subclass, so it writes its full ISO form, and reading that leaf back raises. Use DatetimeRef for a moment in time.

**Example**

```python
run(Order.booked.set(date(2026, 1, 31)), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

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

A datetime leaf in KV storage, stored as an ISO str.

```python
DatetimeRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.DatetimeRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- ISO on disk, tz offset included when the datetime carries one; a naive datetime stays naive through the round trip.
- A leaf holding a number instead of a str is read as a POSIX timestamp and comes back as an aware UTC datetime, which is how a slot written by something outside Nu still reads.
- An absent leaf reads as EMPTY.

**Example**

```python
class Order(Shape):
    filled_at = DatetimeRef.slot()
run(Order.filled_at.set(datetime.now(UTC)), ctx)
```

**Methods**

### `.set(value)`

Write a datetime to the leaf, serialized to an ISO str.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[datetime \| str]` |  | a datetime, an ISO str, or an expression yielding either. |

**Notes**

- A plain datetime is written with `isoformat`; anything else plain is stringified, and an expression is wrapped in a ToStr.
- Nothing is normalized to UTC on the way in, so the offset the value carried is the offset stored.

**Example**

```python
run(Order.filled_at.set(datetime.now(UTC)), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

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

A Decimal leaf in KV storage, kept exact by storing its str form.

```python
DecimalRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.DecimalRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Stored as str, so the value round-trips digit for digit; that is the whole reason to pick this over FloatRef for money.
- Reads parse back to a Decimal, so the arithmetic on the ref is decimal arithmetic, not float arithmetic.
- An absent leaf reads as EMPTY, not as zero.

**Example**

```python
class Order(Shape):
    price = DecimalRef.slot()
run(Order.price.set(Decimal("19.99")), ctx)
```

**Methods**

### `.set(value)`

Write a Decimal to the leaf, serialized to its str form.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[Decimal \| str]` |  | a Decimal, a str spelling one, or an expression yielding either. |

**Notes**

- A plain value is stringified before the write; an expression is wrapped in a ToStr so the conversion happens at run time.
- The str is whatever `str()` gives, so it parses back exactly.

**Example**

```python
run(Order.price.set(Decimal("19.99")), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

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

A Fraction leaf in KV storage, stored as its `numerator/denominator` str.

```python
FractionRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.FractionRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Stored as str, so the ratio survives exactly instead of being flattened to a float.
- Reads parse back to a Fraction, already in lowest terms because that is what Fraction does with the str.
- An absent leaf reads as EMPTY.

**Example**

```python
class Split(Shape):
    share = FractionRef.slot()
run(Split.share.set(Fraction(1, 3)), ctx)
```

**Methods**

### `.set(value)`

Write a Fraction to the leaf, serialized to its str form.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[Fraction \| str]` |  | a Fraction, a str spelling one, or an expression yielding either. |

**Notes**

- A plain value is stringified before the write; an expression is wrapped in a ToStr so the conversion happens at run time.

**Example**

```python
run(Split.share.set(Fraction(1, 3)), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

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

A filesystem path leaf in KV storage, stored as its str form.

```python
PathRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.PathRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Reads come back as a PurePath, so the path surface is the pure one: parts, parents, suffixes, joins. Nothing here touches a filesystem.
- Stored as written, so a path written on one platform reads back with that platform's separators.
- An absent leaf reads as EMPTY.

**Example**

```python
class Job(Shape):
    outdir = PathRef.slot()
run(Job.outdir.set(PurePath("/var/log")), ctx)
```

**Methods**

### `.set(value)`

Write a path to the leaf, serialized to str.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[PurePath \| str]` |  | a path, a str, or an expression yielding either. |

**Notes**

- A plain value is stringified before the write; an expression is wrapped in a ToStr.

**Example**

```python
run(Job.outdir.set(PurePath("/var/log")), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

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

A Percentage leaf in KV storage, stored as the raw float percentage.

```python
PercentageRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.PercentageRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Stored as the percentage itself, not as a fraction: 12.5 percent is 12.5 on disk, not 0.125.
- Reads wrap the float back into a Percentage, so the conversions (`to_dec`, `to_bps`) and the apply helpers are on the ref.
- Float storage, so it carries float rounding; BasisPointRef is the exact one.

**Example**

```python
class Fee(Shape):
    slippage = PercentageRef.slot()
run(Fee.slippage.set(0.5), ctx)
```

**Methods**

### `.set(value)`

Write a Percentage to the leaf, serialized to its raw float.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[PyPercentage \| float]` |  | a Percentage, a raw float percentage, or an expression yielding either. |

**Notes**

- A plain value goes through `float()` before the write; an expression is wrapped in a ToFloat.
- The number written is the percentage, so pass 12.5 for 12.5 percent.

**Example**

```python
run(Fee.slippage.set(0.5), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

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

A time-of-day leaf in KV storage, stored as an ISO `HH:MM:SS` str.

```python
TimeRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.TimeRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- A wall-clock time with no date attached, so nothing about it orders across days.
- Reads parse back to a time, keeping any tz offset the str carried.
- An absent leaf reads as EMPTY.

**Example**

```python
class Window(Shape):
    opens = TimeRef.slot()
run(Window.opens.set(time(9, 30)), ctx)
```

**Methods**

### `.set(value)`

Write a time to the leaf, serialized to an ISO str.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[time \| str]` |  | a time, an ISO str, or an expression yielding either. |

**Notes**

- A plain time is written with `isoformat`; anything else plain is stringified, and an expression is wrapped in a ToStr.

**Example**

```python
run(Window.opens.set(time(9, 30)), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

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

A timedelta leaf in KV storage, stored as a float count of seconds.

```python
TimedeltaRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.TimedeltaRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- One number on disk, so stored durations compare and sort as numbers without being parsed first.
- Reads rebuild the timedelta from that count, so `days`, `seconds` and the arithmetic are on the value.
- An absent leaf reads as EMPTY, not as a zero duration.

**Example**

```python
class Job(Shape):
    timeout = TimedeltaRef.slot()
run(Job.timeout.set(timedelta(minutes=5)), ctx)
```

**Methods**

### `.set(value)`

Write a timedelta to the leaf, serialized to total seconds.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[timedelta \| float]` |  | a timedelta, a float count of seconds, or an expression yielding either. |

**Notes**

- A plain timedelta goes through `total_seconds`; a plain number through `float()`; an expression is wrapped in a TimedeltaTotalSeconds, so it must yield a timedelta.

**Example**

```python
run(Job.timeout.set(timedelta(minutes=5)), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

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

A fixed-offset timezone leaf in KV storage, stored as its offset str.

```python
TimezoneRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.TimezoneRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Holds a fixed offset only, spelled the way `str(timezone)` spells it: `UTC` or `UTC+05:30`.
- A named zone is not what this slot stores: writing a ZoneInfo stores its name, and reading that leaf back raises.
- An absent leaf reads as EMPTY.

**Example**

```python
class Desk(Shape):
    zone = TimezoneRef.slot()
run(Desk.zone.set(timezone(timedelta(hours=4))), ctx)
```

**Methods**

### `.set(value)`

Write a timezone to the leaf, serialized to its offset str.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[timezone \| str]` |  | a timezone, an offset str, or an expression yielding either. |

**Notes**

- A plain value is stringified before the write; an expression is wrapped in a ToStr.
- Only the `UTC` and `UTC±HH:MM` spellings read back, so write a fixed-offset timezone here and nothing else.

**Example**

```python
run(Desk.zone.set(timezone(timedelta(hours=4))), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

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

A UUID leaf in KV storage, stored as its canonical hyphenated str.

```python
UUIDRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.UUIDRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Str on disk rather than 16 raw bytes, so the stored value is readable in a dump and matches what other systems expect.
- Reads parse back to a UUID, so `version`, `int_` and `hex` are on the ref.
- An absent leaf reads as EMPTY.

**Example**

```python
class Session(Shape):
    token = UUIDRef.slot()
run(Session.token.set(uuid4()), ctx)
```

**Methods**

### `.set(value)`

Write a UUID to the leaf, serialized to str.

Builds `SetCmd`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[UUID \| str]` |  | a UUID, a str spelling one, or an expression yielding either. |

**Notes**

- A plain value is stringified before the write; an expression is wrapped in a ToStr.
- Any spelling `UUID()` accepts reads back, so a str without hyphens still parses; it is stored as given.

**Example**

```python
run(Session.token.set(uuid4()), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

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

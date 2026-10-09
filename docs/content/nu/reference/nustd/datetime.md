---
title: datetime
description: "Nu surface for Python's `datetime` module."
---

Module `nustd.datetime`.

Nu surface for Python's `datetime` module.

Mirrors `datetime` 1-1: the classes `date` / `datetime` / `time` /
`timedelta` / `timezone` are Forms. `datetime` has no module-level
functions, so there is no `functions` layer - just `forms` (the classes)
and `interactions` (the constructor atoms; method calls use the shared
`nu.lang.MethodCallQuery`). Import it like the stdlib:

```python
from nustd.datetime import date, timedelta
import nustd.datetime as datetime    # datetime.date.today(), ...
```

## ScalarQuery

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [date](#date) | `scalar_query` | `date()` | `datetime.date` as a Form - a calendar date. |
| [datetime](#datetime) | `scalar_query` | `datetime()` | `datetime.datetime` as a Form - a date and a time. |
| [time](#time-1) | `scalar_query` | `time()` | `datetime.time` as a Form - a wall-clock time of day. |
| [timedelta](#timedelta) | `scalar_query` | `timedelta()` | `datetime.timedelta` as a Form - a span of time. |
| [timezone](#timezone) | `scalar_query` | `timezone()` | `datetime.timezone` as a Form - a fixed offset from UTC. |

### date

`datetime.date` as a Form - a calendar date.

```python
date()
```

Path `nustd.datetime.date`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Methods**

#### `date.of(year, month, day)`

Build a date: `date(year, month, day)`.

Builds `date`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `year` | `IntArg` |  |  |
| `month` | `IntArg` |  |  |
| `day` | `IntArg` |  |  |

Undocumented: example.

#### `date.today()`

Today's date: `date.today()`.

Builds `date`.

Undocumented: example.

#### `date.from_iso(value)`

Parse an ISO date string: `date.fromisoformat(s)`.

Builds `date`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

Undocumented: example.

#### `date.from_ordinal(value)`

From a proleptic Gregorian ordinal: `date.fromordinal(n)`.

Builds `date`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `IntArg` |  |  |

Undocumented: example.

#### `date.from_timestamp(value)`

From a POSIX timestamp: `date.fromtimestamp(t)`.

Builds `date`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |

Undocumented: example.

#### `.year()`

The year.

Builds `Int`.

Undocumented: example.

#### `.month()`

The month (1..12).

Builds `Int`.

Undocumented: example.

#### `.day()`

The day of the month (1..31).

Builds `Int`.

Undocumented: example.

#### `.weekday()`

The day of week, Monday=0.

Builds `Int`.

Undocumented: example.

#### `.isoweekday()`

The day of week, Monday=1.

Builds `Int`.

Undocumented: example.

#### `.toordinal()`

The proleptic Gregorian ordinal.

Builds `Int`.

Undocumented: example.

#### `.isoformat()`

The date as an ISO string (YYYY-MM-DD).

Builds `Str`.

Undocumented: example.

#### `.ctime()`

The date as a C-style string.

Builds `Str`.

Undocumented: example.

#### `.strftime(fmt)`

Format the date with a strftime pattern.

Builds `Str`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `fmt` | `StrArg` |  |  |

Undocumented: example.

#### `.replace(year=None, month=None, day=None)`

A copy with the given components replaced.

Builds `date`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `year` | `IntArg \| None` | `None` |  |
| `month` | `IntArg \| None` | `None` |  |
| `day` | `IntArg \| None` | `None` |  |

Undocumented: example.

#### `a + b`

Builds `date`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimedeltaArg` |  |  |

Undocumented: summary, example.

#### `a - b`

Builds `date | timedelta`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DateArg \| TimedeltaArg` |  |  |

Undocumented: summary, example.

#### `a > b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DateArg` |  |  |

Undocumented: summary, example.

#### `a < b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DateArg` |  |  |

Undocumented: summary, example.

#### `a >= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DateArg` |  |  |

Undocumented: summary, example.

#### `a <= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DateArg` |  |  |

Undocumented: summary, example.

#### `.eq(other)`

Whether two dates are equal.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DateArg` |  |  |

Undocumented: example.

#### `.ne(other)`

Whether two dates differ.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DateArg` |  |  |

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

### datetime

`datetime.datetime` as a Form - a date and a time.

```python
datetime()
```

Path `nustd.datetime.datetime`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Methods**

#### `datetime.of(year, month, day, hour=0, minute=0, second=0, microsecond=0)`

Build a datetime: `datetime(year, month, day, hour, ...)`.

Builds `datetime`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `year` | `IntArg` |  |  |
| `month` | `IntArg` |  |  |
| `day` | `IntArg` |  |  |
| `hour` | `IntArg` | `0` |  |
| `minute` | `IntArg` | `0` |  |
| `second` | `IntArg` | `0` |  |
| `microsecond` | `IntArg` | `0` |  |

Undocumented: example.

#### `datetime.now(tz=None)`

The current local (or `tz`) datetime: `datetime.now(tz)`.

Builds `datetime`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `tz` | `TimezoneArg \| None` | `None` |  |

Undocumented: example.

#### `datetime.from_iso(value)`

Parse an ISO datetime string: `datetime.fromisoformat(s)`.

Builds `datetime`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

Undocumented: example.

#### `datetime.from_timestamp(value, tz=None)`

From a POSIX timestamp: `datetime.fromtimestamp(ts, tz)`.

Builds `datetime`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |
| `tz` | `TimezoneArg \| None` | `None` |  |

Undocumented: example.

#### `datetime.combine(date_value, time_value)`

Combine a date and a time: `datetime.combine(date, time)`.

Builds `datetime`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `date_value` | `DateArg` |  |  |
| `time_value` | `TimeArg` |  |  |

Undocumented: example.

#### `.year()`

The year.

Builds `Int`.

Undocumented: example.

#### `.month()`

The month (1..12).

Builds `Int`.

Undocumented: example.

#### `.day()`

The day of the month (1..31).

Builds `Int`.

Undocumented: example.

#### `.hour()`

The hour (0..23).

Builds `Int`.

Undocumented: example.

#### `.minute()`

The minute (0..59).

Builds `Int`.

Undocumented: example.

#### `.second()`

The second (0..59).

Builds `Int`.

Undocumented: example.

#### `.microsecond()`

The microsecond (0..999999).

Builds `Int`.

Undocumented: example.

#### `.weekday()`

The day of week, Monday=0.

Builds `Int`.

Undocumented: example.

#### `.isoweekday()`

The day of week, Monday=1.

Builds `Int`.

Undocumented: example.

#### `.timestamp()`

The POSIX timestamp.

Builds `Float`.

Undocumented: example.

#### `.isoformat()`

The datetime as an ISO string.

Builds `Str`.

Undocumented: example.

#### `.strftime(fmt)`

Format the datetime with a strftime pattern.

Builds `Str`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `fmt` | `StrArg` |  |  |

Undocumented: example.

#### `.date()`

The date part.

Builds `date`.

Undocumented: example.

#### `.time()`

The time part.

Builds `time`.

Undocumented: example.

#### `.replace(year=None, month=None, day=None, hour=None, minute=None, second=None, microsecond=None)`

A copy with the given components replaced.

Builds `datetime`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `year` | `IntArg \| None` | `None` |  |
| `month` | `IntArg \| None` | `None` |  |
| `day` | `IntArg \| None` | `None` |  |
| `hour` | `IntArg \| None` | `None` |  |
| `minute` | `IntArg \| None` | `None` |  |
| `second` | `IntArg \| None` | `None` |  |
| `microsecond` | `IntArg \| None` | `None` |  |

Undocumented: example.

#### `a + b`

Builds `datetime`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimedeltaArg` |  |  |

Undocumented: summary, example.

#### `a - b`

Builds `datetime | timedelta`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DatetimeArg \| TimedeltaArg` |  |  |

Undocumented: summary, example.

#### `a > b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DatetimeArg` |  |  |

Undocumented: summary, example.

#### `a < b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DatetimeArg` |  |  |

Undocumented: summary, example.

#### `a >= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DatetimeArg` |  |  |

Undocumented: summary, example.

#### `a <= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DatetimeArg` |  |  |

Undocumented: summary, example.

#### `.eq(other)`

Whether two datetimes are equal.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DatetimeArg` |  |  |

Undocumented: example.

#### `.ne(other)`

Whether two datetimes differ.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DatetimeArg` |  |  |

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

### time

`datetime.time` as a Form - a wall-clock time of day.

```python
time()
```

Path `nustd.datetime.time`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Methods**

#### `time.of(hour=0, minute=0, second=0, microsecond=0)`

Build a time: `time(hour, minute, second, microsecond)`.

Builds `time`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `hour` | `IntArg` | `0` |  |
| `minute` | `IntArg` | `0` |  |
| `second` | `IntArg` | `0` |  |
| `microsecond` | `IntArg` | `0` |  |

Undocumented: example.

#### `time.from_iso(value)`

Parse an ISO time string: `time.fromisoformat(s)`.

Builds `time`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

Undocumented: example.

#### `.hour()`

The hour (0..23).

Builds `Int`.

Undocumented: example.

#### `.minute()`

The minute (0..59).

Builds `Int`.

Undocumented: example.

#### `.second()`

The second (0..59).

Builds `Int`.

Undocumented: example.

#### `.microsecond()`

The microsecond (0..999999).

Builds `Int`.

Undocumented: example.

#### `.isoformat()`

The time as an ISO string.

Builds `Str`.

Undocumented: example.

#### `.strftime(fmt)`

Format the time with a strftime pattern.

Builds `Str`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `fmt` | `StrArg` |  |  |

Undocumented: example.

#### `.replace(hour=None, minute=None, second=None, microsecond=None)`

A copy with the given components replaced.

Builds `time`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `hour` | `IntArg \| None` | `None` |  |
| `minute` | `IntArg \| None` | `None` |  |
| `second` | `IntArg \| None` | `None` |  |
| `microsecond` | `IntArg \| None` | `None` |  |

Undocumented: example.

#### `a > b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimeArg` |  |  |

Undocumented: summary, example.

#### `a < b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimeArg` |  |  |

Undocumented: summary, example.

#### `a >= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimeArg` |  |  |

Undocumented: summary, example.

#### `a <= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimeArg` |  |  |

Undocumented: summary, example.

#### `.eq(other)`

Whether two times are equal.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimeArg` |  |  |

Undocumented: example.

#### `.ne(other)`

Whether two times differ.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimeArg` |  |  |

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

### timedelta

`datetime.timedelta` as a Form - a span of time.

```python
timedelta()
```

Path `nustd.datetime.timedelta`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Methods**

#### `timedelta.of(days=0, seconds=0, microseconds=0, milliseconds=0, minutes=0, hours=0, weeks=0)`

Build a timedelta from its components: `timedelta(...)`.

Builds `timedelta`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `days` | `IntArg \| FloatArg` | `0` |  |
| `seconds` | `IntArg \| FloatArg` | `0` |  |
| `microseconds` | `IntArg \| FloatArg` | `0` |  |
| `milliseconds` | `IntArg \| FloatArg` | `0` |  |
| `minutes` | `IntArg \| FloatArg` | `0` |  |
| `hours` | `IntArg \| FloatArg` | `0` |  |
| `weeks` | `IntArg \| FloatArg` | `0` |  |

Undocumented: example.

#### `.days()`

The whole-days component.

Builds `Int`.

Undocumented: example.

#### `.seconds()`

The seconds component (0..86399).

Builds `Int`.

Undocumented: example.

#### `.microseconds()`

The microseconds component (0..999999).

Builds `Int`.

Undocumented: example.

#### `.total_seconds()`

The total duration in seconds.

Builds `Float`.

Undocumented: example.

#### `a + b`

Builds `timedelta`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimedeltaArg` |  |  |

Undocumented: summary, example.

#### `a - b`

Builds `timedelta`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimedeltaArg` |  |  |

Undocumented: summary, example.

#### `a * b`

Builds `timedelta`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `factor` | `IntArg \| FloatArg` |  |  |

Undocumented: summary, example.

#### `a / b`

Builds `timedelta | Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimedeltaArg \| IntArg \| FloatArg` |  |  |

Undocumented: summary, example.

#### `a // b`

Builds `timedelta`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `IntArg` |  |  |

Undocumented: summary, example.

#### `a % b`

Builds `timedelta`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimedeltaArg` |  |  |

Undocumented: summary, example.

#### `-a`

Builds `timedelta`.

Undocumented: summary, example.

#### `abs(a)`

Builds `timedelta`.

Undocumented: summary, example.

#### `+a`

Builds `timedelta`.

Undocumented: summary, example.

#### `a > b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimedeltaArg` |  |  |

Undocumented: summary, example.

#### `a < b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimedeltaArg` |  |  |

Undocumented: summary, example.

#### `a >= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimedeltaArg` |  |  |

Undocumented: summary, example.

#### `a <= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimedeltaArg` |  |  |

Undocumented: summary, example.

#### `.eq(other)`

Whether two spans are equal.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimedeltaArg` |  |  |

Undocumented: example.

#### `.ne(other)`

Whether two spans differ.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimedeltaArg` |  |  |

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

### timezone

`datetime.timezone` as a Form - a fixed offset from UTC.

```python
timezone()
```

Path `nustd.datetime.timezone`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Methods**

#### `timezone.of(offset, name=None)`

Build a fixed-offset zone: `timezone(offset, name)`.

Builds `timezone`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `offset` | `TimedeltaArg` |  |  |
| `name` | `StrArg \| None` | `None` |  |

Undocumented: example.

#### `timezone.utc()`

The UTC zone: `timezone.utc`.

Builds `timezone`.

Undocumented: example.

#### `.utcoffset(dt=None)`

The offset from UTC as a timedelta.

Builds `timedelta`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `dt` | `DatetimeArg \| None` | `None` |  |

Undocumented: example.

#### `.tzname(dt=None)`

The zone's name.

Builds `Str`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `dt` | `DatetimeArg \| None` | `None` |  |

Undocumented: example.

#### `.dst(dt=None)`

Daylight-saving adjustment (always None for a fixed offset).

Builds `None_`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `dt` | `DatetimeArg \| None` | `None` |  |

Undocumented: example.

#### `.eq(other)`

Whether two zones are equal.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimezoneArg` |  |  |

Undocumented: example.

#### `.ne(other)`

Whether two zones differ.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `TimezoneArg` |  |  |

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

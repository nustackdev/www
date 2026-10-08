---
title: sentinel
description: "Sentinel atoms: the predicates that observe EMPTY / INVALID."
---

Module `nu.core.sentinel`.

Sentinel atoms: the predicates that observe EMPTY / INVALID.

The one core family that is not a Python builtin: `IsEmpty` / `IsInvalid`
(and their negations) ask whether a value IS one of Nu's sentinels. Every other
atom propagates a sentinel operand; these observe it, so they are the only core
atoms that do **not** guard - the compile thunk runs the predicate on the raw
child value with no EMPTY / INVALID short-circuit.

They live in core because they are reused everywhere (the `Form` base exposes
them as `is_empty()` / `is_invalid()`, flows branch on them, callers guard
on them). Sort: all ScalarQuery (Q).

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [IsEmpty](#isempty) | `scalar_query` | `IsEmpty(value)` | True if its one child yields the EMPTY sentinel. |
| [IsInvalid](#isinvalid) | `scalar_query` | `IsInvalid(value)` | True if its one child yields the INVALID sentinel. |
| [NotEmpty](#notempty) | `scalar_query` | `NotEmpty(value)` | True if its one child does not yield EMPTY. |
| [NotInvalid](#notinvalid) | `scalar_query` | `NotInvalid(value)` | True if its one child does not yield INVALID. |

## IsEmpty

True if its one child yields the EMPTY sentinel.

```python
IsEmpty(value)
```

Path `nu.core.IsEmpty`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to test. |

**Yields**

A plain bool. Never INVALID - there is no sentinel operand for it to
collapse on.

**Notes**

- Accepts sentinels rather than propagating them: this is one of the few core atoms that does not guard, since observing EMPTY / INVALID is the whole point.

**Example**

```python
from nu.lang.sentinels import EMPTY
nu.run(nu.IsEmpty(EMPTY))[0]
nu.run(nu.IsEmpty(5))[0]
```

```
True
False
```

## IsInvalid

True if its one child yields the INVALID sentinel.

```python
IsInvalid(value)
```

Path `nu.core.IsInvalid`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to test. |

**Yields**

A plain bool. Never INVALID.

**Notes**

- Accepts sentinels rather than propagating them, same as `IsEmpty`. EMPTY is not INVALID and yields False.

**Example**

```python
from nu.lang.sentinels import INVALID
nu.run(nu.IsInvalid(INVALID))[0]
nu.run(nu.IsInvalid(5))[0]
```

```
True
False
```

## NotEmpty

True if its one child does not yield EMPTY.

```python
NotEmpty(value)
```

Path `nu.core.NotEmpty`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to test. |

**Yields**

A plain bool. Never INVALID.

**Notes**

- Accepts sentinels rather than propagating them, same as `IsEmpty`. INVALID counts as "not EMPTY" and yields True.

**Example**

```python
from nu.lang.sentinels import EMPTY
nu.run(nu.NotEmpty(EMPTY))[0]
nu.run(nu.NotEmpty(5))[0]
```

```
False
True
```

## NotInvalid

True if its one child does not yield INVALID.

```python
NotInvalid(value)
```

Path `nu.core.NotInvalid`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to test. |

**Yields**

A plain bool. Never INVALID.

**Notes**

- Accepts sentinels rather than propagating them, same as `IsEmpty`. EMPTY counts as "not INVALID" and yields True.

**Example**

```python
from nu.lang.sentinels import INVALID
nu.run(nu.NotInvalid(INVALID))[0]
nu.run(nu.NotInvalid(5))[0]
```

```
False
True
```

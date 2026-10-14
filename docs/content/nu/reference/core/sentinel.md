---
title: sentinel
description: "Sentinel atoms: the queries that observe EMPTY."
---

Module `nu.core.sentinel`.

Sentinel atoms: the queries that observe EMPTY.

The one core family that is not a Python builtin: `IsEmpty` / `NotEmpty`
ask whether a value IS EMPTY, and `Fallback` picks the first value that is
not. Every other query propagates an EMPTY operand; these observe it, so they
are the only core atoms that do **not** guard - the compile thunk reads the
raw child value with no EMPTY short-circuit.

They live in core because they are reused everywhere (the `Form` base exposes
them as `is_empty()` / `not_empty()` / `fallback()`, flows branch on them,
callers guard on them). Sort: all ScalarQuery (Q).

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Fallback](#fallback) | `scalar_query` | `Fallback(value, *alternatives)` | The first of its children that is not EMPTY. |
| [IsEmpty](#isempty) | `scalar_query` | `IsEmpty(value)` | True if its one child yields the EMPTY sentinel. |
| [NotEmpty](#notempty) | `scalar_query` | `NotEmpty(value)` | True if its one child does not yield EMPTY. |

## Fallback

The first of its children that is not EMPTY.

```python
Fallback(value, *alternatives)
```

Path `nu.core.Fallback`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity None (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to keep when it is present. |
| `*alternatives` |  |  | tried in order while everything before them is EMPTY. |

**Yields**

The first present child. EMPTY only when every child is EMPTY.

**Notes**

- Checks presence, not truthiness: `0`, `""`, `False` and `None` are present values and are kept.
- Short-circuits: children after the first present one are never evaluated.
- Reached as `x.fallback(a, b, ...)` on every Form, which also keeps the result in `x`'s Form.

**Example**

```python
from nu.lang.sentinels import EMPTY
nu.run(nu.Fallback(EMPTY, 0, 5))[0]
nu.run(nu.Fallback(EMPTY, EMPTY))[0]
```

```
0
<EMPTY>
```

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

A plain bool, never EMPTY.

**Notes**

- Accepts EMPTY rather than propagating it: this is one of the few core atoms that does not guard, since observing EMPTY is the whole point.

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

A plain bool, never EMPTY.

**Notes**

- Accepts EMPTY rather than propagating it, same as `IsEmpty`.

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

---
title: sentinels
description: "Sentinels - EMPTY and UNSET."
---

Module `nu.lang.sentinels`.

Sentinels - EMPTY and UNSET.

EMPTY is the one "no value" sentinel: no value here, either missing or
derived from missing. It originates at Ref resolution (the address resolves
to nothing) and flows from there like NULL in SQL: unknown flows through
expressions and never passes a condition.

- Queries propagate it. Any EMPTY operand gives EMPTY, without raising.
- Conditions read it as false. A branch, loop, filter or `And` / `Or`
  treats EMPTY like any falsy value, without poisoning the rest.
- Writes refuse it. Storing EMPTY into a Ref or fabric raises; absence is
  made by erasing, never by writing.
- Real errors stay errors. A wrong type or a bad call raises as in Python.

The checks that observe EMPTY (`IsEmpty`, `exists()`, `fallback()`)
take it as an ordinary input and yield a real answer. In a Stream, EMPTY is
just one yielded value; the stream consumer decides what it means per element.

| Name | Call | Meaning |
| --- | --- | --- |
| [is_empty](#is_empty) | `lang.is_empty(value)` | True if `value` is the EMPTY sentinel. |
| [is_sentinel](#is_sentinel) | `lang.is_sentinel(value)` | True if `value` is any Sentinel. |

## is_empty

True if `value` is the EMPTY sentinel.

```python
lang.is_empty(value)
```

Path `nu.lang.is_empty`. Defined on `nu.lang.sentinels`, bound as a function. Builds `TypeGuard[Empty]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `object` |  |  |

Undocumented: example.

## is_sentinel

True if `value` is any Sentinel.

```python
lang.is_sentinel(value)
```

Path `nu.lang.is_sentinel`. Defined on `nu.lang.sentinels`, bound as a function. Builds `TypeGuard[Sentinel]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `object` |  |  |

Undocumented: example.

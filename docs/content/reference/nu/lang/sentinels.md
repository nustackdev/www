---
title: sentinels
description: "Sentinels - EMPTY and INVALID."
---

Module `nu.lang.sentinels`.

Sentinels - EMPTY and INVALID.

EMPTY originates only at Ref resolution (the address resolves to nothing).
INVALID originates when an operation is applied to an EMPTY operand. If any
operand of a Query is EMPTY or INVALID, the Query returns INVALID - sentinels
collapse to INVALID upward through Query chains.

Sentinel-check ops (IsEmpty, IsInvalid) bypass propagation: they accept any
value and return Bool. In a Stream, a sentinel is just one yielded value;
the stream consumer decides what it means per element.

| Name | Call | Meaning |
| --- | --- | --- |
| [is_empty](#is_empty) | `lang.is_empty(value)` | True if `value` is the EMPTY sentinel. |
| [is_invalid](#is_invalid) | `lang.is_invalid(value)` | True if `value` is the INVALID sentinel. |
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

## is_invalid

True if `value` is the INVALID sentinel.

```python
lang.is_invalid(value)
```

Path `nu.lang.is_invalid`. Defined on `nu.lang.sentinels`, bound as a function. Builds `TypeGuard[Invalid]`.

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

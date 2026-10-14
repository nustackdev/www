---
title: primitives.sentinel_
description: "Sentinel interfaces - SentinelForm, EmptyForm."
---

Module `nu.forms.primitives.sentinel_`.

Sentinel interfaces - SentinelForm, EmptyForm.

Wraps EMPTY so it can appear as a typed Form node in a Nu tree, mainly so
`is_empty()` has something typed to call on.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [EmptyForm](#emptyform) | `scalar_query` | `EmptyForm()` | Wraps EMPTY, the no-value sentinel. |
| [SentinelForm](#sentinelform) | `scalar_query` | `SentinelForm()` | Base for the sentinel interfaces. |

## EmptyForm

Wraps EMPTY, the no-value sentinel.

```python
EmptyForm()
```

Path `nu.forms.EmptyForm`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Example**

```python
nu.run(nu.EmptyForm())[0]
```

```
<EMPTY>
```

**Inherited methods**

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a == b` | `Bool` | Self equal to other by value: an `Eq` term, never a Python bool. |
| `a != b` | `Bool` | Self not equal to other by value: a `Ne` term, never a Python bool. |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

## SentinelForm

Base for the sentinel interfaces.

```python
SentinelForm()
```

Path `nu.forms.SentinelForm`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Inherited methods**

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a == b` | `Bool` | Self equal to other by value: an `Eq` term, never a Python bool. |
| `a != b` | `Bool` | Self not equal to other by value: a `Ne` term, never a Python bool. |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

Undocumented: example.

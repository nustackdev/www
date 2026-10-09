---
title: primitives.sentinel_
description: "Sentinel interfaces - SentinelForm, EmptyForm, InvalidForm."
---

Module `nu.forms.primitives.sentinel_`.

Sentinel interfaces - SentinelForm, EmptyForm, InvalidForm.

Wraps EMPTY and INVALID so they can appear as typed Form nodes in a Nu tree,
mainly so `is_empty()` / `is_invalid()` have something typed to call on.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [EmptyForm](#emptyform) | `scalar_query` | `EmptyForm()` | Wraps EMPTY, the address-resolved-to-nothing sentinel. |
| [InvalidForm](#invalidform) | `scalar_query` | `InvalidForm()` | Wraps INVALID, the operation-not-applicable sentinel. |
| [SentinelForm](#sentinelform) | `scalar_query` | `SentinelForm()` | Base for the sentinel interfaces, EmptyForm and InvalidForm. |

## EmptyForm

Wraps EMPTY, the address-resolved-to-nothing sentinel.

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
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## InvalidForm

Wraps INVALID, the operation-not-applicable sentinel.

```python
InvalidForm()
```

Path `nu.forms.InvalidForm`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Notes**

- INVALID arises when an operation is applied to an EMPTY operand, and Query chains collapse to INVALID as soon as any operand is a sentinel. This Form does not produce that propagation itself, it just gives INVALID a typed node.

**Example**

```python
nu.run(nu.InvalidForm())[0]
```

```
<INVALID>
```

**Inherited methods**

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## SentinelForm

Base for the sentinel interfaces, EmptyForm and InvalidForm.

```python
SentinelForm()
```

Path `nu.forms.SentinelForm`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

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

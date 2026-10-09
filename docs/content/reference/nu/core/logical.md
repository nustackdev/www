---
title: logical
description: "Logical atoms: Python's boolean operators and truthiness."
---

Module `nu.core.logical`.

Logical atoms: Python's boolean operators and truthiness.

Maps Python's boolean operations onto Nu ScalarQueries. Pure compute; no
Context effect of their own.

Builtins / operators to cover (Python -> Nu):
- `and` -> `And`, `or` -> `Or`, `not` -> `Not`
- `bool` (truthiness) -> `ToBool`

Sorts: all ScalarQuery (Q). `And` / `Or` are variadic; `Not` and
`ToBool` are unary. `logical` owns `ToBool`; `cast` does not define it.

And / Or semantics: Python's `and` / `or` short-circuit and return an
operand (not a bool). Nu short-circuits the same way but always coerces to
`bool`, so a Nu `And` / `Or` yields a plain boolean while leaving the
operands past the deciding one unevaluated. That is what makes them usable
as guards: `And(not_empty(x), contains(x))` never runs `contains` when
`x` is empty. `And` yields `True` over no operands, `Or` yields
`False`.

Sentinels: every operand that is actually evaluated is checked; an `EMPTY`
or `INVALID` operand collapses the whole query to `INVALID` (per
`nu.lang.sentinels`). Short-circuit wins over sentinel poisoning - an
operand that is never evaluated can never poison the result.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [And](#and) | `scalar_query` | `And(*children)` | The conjunction of its boolean children, each coerced with `bool`. |
| [Not](#not) | `scalar_query` | `Not(value)` | The negation of its one child. |
| [Or](#or) | `scalar_query` | `Or(*children)` | The disjunction of its boolean children, each coerced with `bool`. |
| [ToBool](#tobool) | `scalar_query` | `ToBool(value)` | The truthiness of its one child. |
| [bool](#bool) |  | `core.bool(x)` | Coerce `x` to a Nu `Bool` term. |

## And

The conjunction of its boolean children, each coerced with `bool`.

```python
And(*children)
```

Path `nu.core.And`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity None (0 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*children` |  |  | the values to conjoin. |

**Yields**

A plain bool. INVALID when an evaluated child is EMPTY or INVALID.

**Notes**

- Short-circuits like Python's `and`: the first falsy child decides the result and the children after it are never evaluated. This is what lets `And` guard - a guard that still runs the thing it is guarding is not a guard.
- Short-circuit beats sentinel poisoning: a child that is never evaluated never contributes its sentinel, so `And(False, <INVALID>)` is `False`, not INVALID.
- No children at all yields True.

**Example**

```python
nu.run(nu.And(True, True))[0]
nu.run(nu.And(True, False))[0]
```

```
True
False
```

## Not

The negation of its one child.

```python
Not(value)
```

Path `nu.core.Not`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to negate. |

**Yields**

A plain bool. INVALID when the child is EMPTY or INVALID.

**Example**

```python
nu.run(nu.Not(True))[0]
```

```
False
```

## Or

The disjunction of its boolean children, each coerced with `bool`.

```python
Or(*children)
```

Path `nu.core.Or`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity None (0 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*children` |  |  | the values to disjoin. |

**Yields**

A plain bool. INVALID when an evaluated child is EMPTY or INVALID.

**Notes**

- Short-circuits like Python's `or`: the first truthy child decides the result and the children after it are never evaluated. This is what lets `Or` guard - a guard that still runs the thing it is guarding is not a guard.
- Short-circuit beats sentinel poisoning: a child that is never evaluated never contributes its sentinel, so `Or(True, <INVALID>)` is `True`, not INVALID.
- No children at all yields False.

**Example**

```python
nu.run(nu.Or(False, True))[0]
nu.run(nu.Or(False, False))[0]
```

```
True
False
```

## ToBool

The truthiness of its one child.

```python
ToBool(value)
```

Path `nu.core.ToBool`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to coerce. |

**Yields**

A plain bool. INVALID when the child is EMPTY or INVALID.

**Example**

```python
nu.run(nu.core.logical.ToBool(0))[0]
```

```
False
```

## bool

Coerce `x` to a Nu `Bool` term.

```python
core.bool(x)
```

Path `nu.core.bool`. Defined on `nu.core.logical`, bound as a function. Builds `object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `object` |  | the value to coerce. |

**Yields**

A Nu `Bool`.

**Notes**

- `Bool(ToBool(x))` in one call: Form-wraps the raw `ToBool` atom so the result composes like any other Nu term.

**Example**

```python
nu.run(nu.core.logical.bool(1))[0]
```

```
True
```

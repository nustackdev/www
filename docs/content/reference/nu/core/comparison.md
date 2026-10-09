---
title: comparison
description: "Comparison atoms: Python's ordering and identity operators."
---

Module `nu.core.comparison`.

Comparison atoms: Python's ordering and identity operators.

Maps Python's comparison operators onto Nu ScalarQueries yielding a bool. Pure
compute over their operands; no Context effect of their own.

Operators to cover (Python -> Nu):
- `==` -> `Eq`, `!=` -> `Ne`
- `<` -> `Lt`, `>` -> `Gt`, `<=` -> `Le`, `>=` -> `Ge`
- `is` / `is not` -> `Is` (identity)

Sorts: all ScalarQuery (Q). Membership (`in`) lives in `access` as
`Contains`.

Each atom is binary and defines `compile` (sync hot path) and `acompile`
(async hot path). Both return a thunk `(rt) -> value` (sync) or
`(rt) -> awaitable` (async) that captures the precompiled child thunks, so
recursion skips the `Runtime.eval` / `Runtime.aeval` dispatch hop per
child. Sentinel propagation is inlined: an EMPTY or INVALID operand collapses
the result to INVALID without comparing.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Eq](#eq) | `scalar_query` | `Eq(left, right)` | Whether its two children are equal (`==`). |
| [Ge](#ge) | `scalar_query` | `Ge(left, right)` | Whether the first child is greater than or equal to the second (`>=`). |
| [Gt](#gt) | `scalar_query` | `Gt(left, right)` | Whether the first child is greater than the second (`>`). |
| [Is](#is) | `scalar_query` | `Is(left, right)` | Whether its two children are the same object (`is`). |
| [Le](#le) | `scalar_query` | `Le(left, right)` | Whether the first child is less than or equal to the second (`<=`). |
| [Lt](#lt) | `scalar_query` | `Lt(left, right)` | Whether the first child is less than the second (`<`). |
| [Ne](#ne) | `scalar_query` | `Ne(left, right)` | Whether its two children are unequal (`!=`). |

## Eq

Whether its two children are equal (`==`).

```python
Eq(left, right)
```

Path `nu.core.Eq`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `left` |  |  | the first value. |
| `right` |  |  | the second value. |

**Yields**

A bool. INVALID when either child is EMPTY or INVALID.

**Notes**

- Delegates to Python's `==`, so equality is by value, not type: `1 == 1.0` is True regardless of int vs float.
- The right child is evaluated only after the left yields a value, so a sentinel on the left short-circuits without touching the right.

**Example**

```python
nu.run(nu.Eq(1, 1.0))[0]
```

```
True
```

## Ge

Whether the first child is greater than or equal to the second (`>=`).

```python
Ge(left, right)
```

Path `nu.core.Ge`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `left` |  |  | the value to check. |
| `right` |  |  | the value to check it against. |

**Yields**

A bool. INVALID when either child is EMPTY or INVALID.

**Notes**

- Delegates to Python's `>=`. Operands that don't support ordering between their types raise, same as bare Python; only a sentinel operand collapses to INVALID.
- The right child is evaluated only after the left yields a value, so a sentinel on the left short-circuits without touching the right.

**Example**

```python
nu.run(nu.Ge(2, 2))[0]
```

```
True
```

## Gt

Whether the first child is greater than the second (`>`).

```python
Gt(left, right)
```

Path `nu.core.Gt`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `left` |  |  | the value to check. |
| `right` |  |  | the value to check it against. |

**Yields**

A bool. INVALID when either child is EMPTY or INVALID.

**Notes**

- Delegates to Python's `>`. Operands that don't support ordering between their types raise, same as bare Python; only a sentinel operand collapses to INVALID.
- The right child is evaluated only after the left yields a value, so a sentinel on the left short-circuits without touching the right.

**Example**

```python
nu.run(nu.Gt(3, 2))[0]
```

```
True
```

## Is

Whether its two children are the same object (`is`).

```python
Is(left, right)
```

Path `nu.core.Is`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `left` |  |  | the first value. |
| `right` |  |  | the second value. |

**Yields**

A bool. INVALID when either child is EMPTY or INVALID.

**Notes**

- Delegates to Python's `is`: object identity, not value equality. Two distinct objects that compare equal (e.g. two separate lists with the same contents) are not the same object.
- The right child is evaluated only after the left yields a value, so a sentinel on the left short-circuits without touching the right.

**Example**

```python
x = object()
nu.run(nu.Is(x, x))[0]
```

```
True
```

## Le

Whether the first child is less than or equal to the second (`<=`).

```python
Le(left, right)
```

Path `nu.core.Le`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `left` |  |  | the value to check. |
| `right` |  |  | the value to check it against. |

**Yields**

A bool. INVALID when either child is EMPTY or INVALID.

**Notes**

- Delegates to Python's `<=`. Operands that don't support ordering between their types raise, same as bare Python; only a sentinel operand collapses to INVALID.
- The right child is evaluated only after the left yields a value, so a sentinel on the left short-circuits without touching the right.

**Example**

```python
nu.run(nu.Le(2, 2))[0]
```

```
True
```

## Lt

Whether the first child is less than the second (`<`).

```python
Lt(left, right)
```

Path `nu.core.Lt`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `left` |  |  | the value to check. |
| `right` |  |  | the value to check it against. |

**Yields**

A bool. INVALID when either child is EMPTY or INVALID.

**Notes**

- Delegates to Python's `<`. Operands that don't support ordering between their types raise, same as bare Python; only a sentinel operand collapses to INVALID.
- The right child is evaluated only after the left yields a value, so a sentinel on the left short-circuits without touching the right.

**Example**

```python
nu.run(nu.Lt(1, 2))[0]
```

```
True
```

## Ne

Whether its two children are unequal (`!=`).

```python
Ne(left, right)
```

Path `nu.core.Ne`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `left` |  |  | the first value. |
| `right` |  |  | the second value. |

**Yields**

A bool. INVALID when either child is EMPTY or INVALID.

**Notes**

- Delegates to Python's `!=`, so it's the negation of `Eq`: value comparison, not type comparison.
- The right child is evaluated only after the left yields a value, so a sentinel on the left short-circuits without touching the right.

**Example**

```python
nu.run(nu.Ne(1, 2))[0]
```

```
True
```

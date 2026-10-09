---
title: arithmetic
description: "Arithmetic atoms: Python's numeric builtins and operators."
---

Module `nu.core.arithmetic`.

Arithmetic atoms: Python's numeric builtins and operators.

Maps Python's native numeric functions and arithmetic operators onto Nu
ScalarQueries. None touch the Context on their own - effects only ride in
through Ref children.

Builtins / operators to cover (Python -> Nu):
- `+` -> `Add`, `-` -> `Sub`, `*` -> `Mul`, `/` -> `Div`
- `@` -> `MatMul`
- `//` -> `FloorDiv`, `%` -> `Mod`, `**` / `pow` -> `Pow`
- unary `-` -> `Neg`, unary `+` -> `Pos`, `abs` -> `Abs`
- `divmod` -> `DivMod`, `round` -> `Round`

Sorts: all ScalarQuery (Q). `Add` and `Mul` fold a variadic child list.
`Sub`, `Div`, `FloorDiv`, `Mod`, `Pow` and `DivMod` are binary.
`Neg`, `Pos` and `Abs` are unary. `Round` takes one child (value) or
two (value, ndigits). `DivMod` yields the `(quotient, remainder)` pair as
its single scalar.

Each atom defines `compile` (sync hot path) and `acompile` (async hot
path). Both return a thunk `(rt) -> value` (sync) or `(rt) -> awaitable`
(async) that captures the precompiled child thunks, so recursion skips the
`Runtime.eval` / `Runtime.aeval` dispatch hop per child. Sentinel
propagation is inlined: an EMPTY or INVALID operand collapses the result to
INVALID without further folding.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Abs](#abs) | `scalar_query` | `Abs(value)` | The absolute value of its one child. |
| [Add](#add) | `scalar_query` | `Add(*children)` | The sum of its scalar children. |
| [Div](#div) | `scalar_query` | `Div(left, right)` | The first child divided by the second (true division). |
| [DivMod](#divmod) | `scalar_query` | `DivMod(left, right)` | The `(quotient, remainder)` pair of its two children. |
| [FloorDiv](#floordiv) | `scalar_query` | `FloorDiv(left, right)` | The first child floor-divided by the second. |
| [MatMul](#matmul) | `scalar_query` | `MatMul(left, right)` | The matrix product of its two children. |
| [Mod](#mod) | `scalar_query` | `Mod(left, right)` | The first child modulo the second. |
| [Mul](#mul) | `scalar_query` | `Mul(*children)` | The product of its scalar children. |
| [Neg](#neg) | `scalar_query` | `Neg(value)` | The arithmetic negation of its one child. |
| [Pos](#pos) | `scalar_query` | `Pos(value)` | The unary plus of its one child. |
| [Pow](#pow) | `scalar_query` | `Pow(base, exponent)` | The first child raised to the power of the second. |
| [Round](#round) | `scalar_query` | `Round(value, ndigits)` | The first child rounded, to the second child's digits when given. |
| [Sub](#sub) | `scalar_query` | `Sub(left, right)` | The first child minus the second. |

## Abs

The absolute value of its one child.

```python
Abs(value)
```

Path `nu.core.Abs`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to take the magnitude of. |

**Yields**

The absolute value. INVALID when the child is EMPTY or INVALID.

**Example**

```python
nu.run(nu.Abs(-4))[0]
```

```
4
```

## Add

The sum of its scalar children.

```python
Add(*children)
```

Path `nu.core.Add`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity None (0 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*children` |  |  | the values to add, folded left to right. |

**Yields**

The sum. INVALID when any child is EMPTY or INVALID.

**Notes**

- Folds from the first child rather than from zero, so any type supporting `+` works, including string, list and tuple concatenation.
- No children at all yields 0, the additive identity.
- Children are evaluated in order and the fold stops at the first sentinel it meets.

**Example**

```python
nu.run(nu.Add(1, 2, 3))[0]
```

```
6
```

## Div

The first child divided by the second (true division).

```python
Div(left, right)
```

Path `nu.core.Div`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `left` |  |  | the numerator. |
| `right` |  |  | the denominator. |

**Yields**

The quotient. INVALID when either child is EMPTY or INVALID.

**Notes**

- True division, so two ints yield a float.
- A zero denominator raises. Only sentinels collapse to INVALID; a real error stays a real error.

**Example**

```python
nu.run(nu.Div(7, 2))[0]
```

```
3.5
```

## DivMod

The `(quotient, remainder)` pair of its two children.

```python
DivMod(left, right)
```

Path `nu.core.DivMod`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `left` |  |  | the value to divide. |
| `right` |  |  | the divisor. |

**Yields**

The pair. INVALID when either child is EMPTY or INVALID.

**Notes**

- One scalar that happens to be a pair, not two values, so indexing it is how either half is reached.

**Example**

```python
nu.run(nu.DivMod(7, 2))[0]
```

```
(3, 1)
```

## FloorDiv

The first child floor-divided by the second.

```python
FloorDiv(left, right)
```

Path `nu.core.FloorDiv`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `left` |  |  | the numerator. |
| `right` |  |  | the denominator. |

**Yields**

The floored quotient. INVALID when either child is EMPTY or INVALID.

**Notes**

- Floors toward negative infinity, as Python's `//` does, so -7 floor-divided by 2 is -4 and not -3.

**Example**

```python
nu.run(nu.FloorDiv(7, 2))[0]
```

```
3
```

## MatMul

The matrix product of its two children.

```python
MatMul(left, right)
```

Path `nu.core.MatMul`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `left` |  |  | the left operand. |
| `right` |  |  | the right operand. |

**Yields**

The product. INVALID when either child is EMPTY or INVALID.

**Notes**

- Delegates entirely to the operands' own `__matmul__`, so what a matrix product means is theirs to decide. Nu adds no numeric behaviour of its own here.
- Nothing in the standard library defines `@`, so in practice the operands come from a numeric library.
- The right child is evaluated only after the left yields a value, so a sentinel on the left short-circuits without touching the right.

**Example**

```python
class Grid:
    def __matmul__(self, other):
        return "product"
nu.run(nu.MatMul(Grid(), Grid()))[0]
```

```
'product'
```

## Mod

The first child modulo the second.

```python
Mod(left, right)
```

Path `nu.core.Mod`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `left` |  |  | the value to divide. |
| `right` |  |  | the divisor. |

**Yields**

The remainder. INVALID when either child is EMPTY or INVALID.

**Notes**

- The result takes the sign of the divisor, as Python's `%` does, so -7 modulo 3 is 2 and not -1.

**Example**

```python
nu.run(nu.Mod(7, 2))[0]
```

```
1
```

## Mul

The product of its scalar children.

```python
Mul(*children)
```

Path `nu.core.Mul`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity None (0 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*children` |  |  | the values to multiply. |

**Yields**

The product. INVALID when any child is EMPTY or INVALID.

**Notes**

- Starts from 1, the multiplicative identity, so no children at all yields 1.
- Children are evaluated in order and the fold stops at the first sentinel it meets.

**Example**

```python
nu.run(nu.Mul(2, 3, 4))[0]
```

```
24
```

## Neg

The arithmetic negation of its one child.

```python
Neg(value)
```

Path `nu.core.Neg`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to negate. |

**Yields**

The negation. INVALID when the child is EMPTY or INVALID.

**Example**

```python
nu.run(nu.Neg(4))[0]
```

```
-4
```

## Pos

The unary plus of its one child.

```python
Pos(value)
```

Path `nu.core.Pos`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to apply unary plus to. |

**Yields**

The value. INVALID when the child is EMPTY or INVALID.

**Notes**

- Identity for numbers, but a real operation nonetheless: a type defining `__pos__` decides what it means.

**Example**

```python
nu.run(nu.Pos(-4))[0]
```

```
-4
```

## Pow

The first child raised to the power of the second.

```python
Pow(base, exponent)
```

Path `nu.core.Pow`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `base` |  |  | the value to raise. |
| `exponent` |  |  | the power to raise it to. |

**Yields**

The power. INVALID when either child is EMPTY or INVALID.

**Notes**

- A negative exponent yields a float, as Python's `**` does.

**Example**

```python
nu.run(nu.Pow(2, 10))[0]
```

```
1024
```

## Round

The first child rounded, to the second child's digits when given.

```python
Round(value, ndigits)
```

Path `nu.core.Round`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to round. |
| `ndigits` |  |  | how many digits to keep. Optional: leave the child out entirely to round to a whole number. |

**Yields**

The rounded value. INVALID when either child is EMPTY or INVALID.

**Notes**

- Rounds half to even, as Python's `round` does, so 2.5 rounds to 2 and 3.5 rounds to 4.
- Without an ndigits child the result is an int. With one it keeps the value's own type.

**Example**

```python
nu.run(nu.Round(3.14159, 2))[0]
```

```
3.14
```

## Sub

The first child minus the second.

```python
Sub(left, right)
```

Path `nu.core.Sub`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `left` |  |  | the value to subtract from. |
| `right` |  |  | the value to subtract. |

**Yields**

The difference. INVALID when either child is EMPTY or INVALID.

**Notes**

- The right child is evaluated only after the left yields a value, so a sentinel on the left short-circuits without touching the right.

**Example**

```python
nu.run(nu.Sub(10, 3))[0]
```

```
7
```

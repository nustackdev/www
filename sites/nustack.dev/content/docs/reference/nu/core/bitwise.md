---
title: bitwise
description: "Bitwise atoms: Python's bit-level operators."
---

Module `nu.core.bitwise`.

Bitwise atoms: Python's bit-level operators.

Maps Python's bitwise operators onto Nu ScalarQueries over integers. Pure
compute; no Context effect of their own.

Operators to cover (Python -> Nu):
- `&` -> `BitAnd`, `|` -> `BitOr`, `^` -> `BitXor`
- `~` -> `BitNot` (unary)
- `<<` -> `LShift`, `>>` -> `RShift`

Sorts: all ScalarQuery (Q). `BitAnd` / `BitOr` / `BitXor` fold over
their children (identity `-1` for AND, `0` for OR / XOR); the shifts are
binary and `BitNot` is unary. Each atom defines `compile` (sync hot path)
and `acompile` (async hot path), both returning a thunk that captures the
precompiled child thunks. Sentinel propagation is inlined: an EMPTY or INVALID
operand collapses the result to INVALID.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [BitAnd](#bitand) | `scalar_query` | `BitAnd(*children)` | The bitwise AND of its scalar children. |
| [BitNot](#bitnot) | `scalar_query` | `BitNot(value)` | The bitwise NOT of its one child. |
| [BitOr](#bitor) | `scalar_query` | `BitOr(*children)` | The bitwise OR of its scalar children. |
| [BitXor](#bitxor) | `scalar_query` | `BitXor(*children)` | The bitwise XOR of its scalar children. |
| [LShift](#lshift) | `scalar_query` | `LShift(value, count)` | The first child shifted left by the second. |
| [RShift](#rshift) | `scalar_query` | `RShift(value, count)` | The first child shifted right by the second. |

## BitAnd

The bitwise AND of its scalar children.

```python
BitAnd(*children)
```

Path `nu.core.BitAnd`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity None (0 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*children` |  |  | the integers to AND together, folded left to right. |

**Yields**

The AND. INVALID when any child is EMPTY or INVALID.

**Notes**

- Starts from -1 (all bits set), the AND identity, so no children at all yields -1.
- Operands are Python ints, two's-complement under the hood, so a negative operand ANDs its infinite leading 1s in.
- Children are evaluated in order and the fold stops at the first sentinel it meets.

**Example**

```python
nu.run(nu.BitAnd(12, 10))[0]
```

```
8
```

## BitNot

The bitwise NOT of its one child.

```python
BitNot(value)
```

Path `nu.core.BitNot`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the integer to invert. |

**Yields**

The inverted value. INVALID when the child is EMPTY or INVALID.

**Notes**

- Python ints have no fixed width, so NOT is the identity `~x == -x - 1`: flipping every bit of a two's-complement number just negates it and subtracts one.

**Example**

```python
nu.run(nu.BitNot(5))[0]
```

```
-6
```

## BitOr

The bitwise OR of its scalar children.

```python
BitOr(*children)
```

Path `nu.core.BitOr`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity None (0 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*children` |  |  | the integers to OR together, folded left to right. |

**Yields**

The OR. INVALID when any child is EMPTY or INVALID.

**Notes**

- Starts from 0, the OR identity, so no children at all yields 0.
- Operands are Python ints, two's-complement under the hood, so a negative operand carries its infinite leading 1s through.
- Children are evaluated in order and the fold stops at the first sentinel it meets.

**Example**

```python
nu.run(nu.BitOr(12, 10))[0]
```

```
14
```

## BitXor

The bitwise XOR of its scalar children.

```python
BitXor(*children)
```

Path `nu.core.BitXor`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity None (0 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*children` |  |  | the integers to XOR together, folded left to right. |

**Yields**

The XOR. INVALID when any child is EMPTY or INVALID.

**Notes**

- Starts from 0, the XOR identity, so no children at all yields 0.
- Operands are Python ints, two's-complement under the hood, so a negative operand flips its infinite leading 1s in the fold.
- Children are evaluated in order and the fold stops at the first sentinel it meets.

**Example**

```python
nu.run(nu.BitXor(12, 10))[0]
```

```
6
```

## LShift

The first child shifted left by the second.

```python
LShift(value, count)
```

Path `nu.core.LShift`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the integer to shift. |
| `count` |  |  | how many bits to shift by. |

**Yields**

The shifted value. INVALID when either child is EMPTY or INVALID.

**Notes**

- Equivalent to multiplying by `2 ** count`; sign is preserved since Python ints have no fixed width to overflow out of.
- A negative count raises. Only sentinels collapse to INVALID; a real error stays a real error.
- The count child is evaluated only after the value yields, so a sentinel on the value short-circuits without touching the count.

**Example**

```python
nu.run(nu.LShift(1, 4))[0]
```

```
16
```

## RShift

The first child shifted right by the second.

```python
RShift(value, count)
```

Path `nu.core.RShift`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the integer to shift. |
| `count` |  |  | how many bits to shift by. |

**Yields**

The shifted value. INVALID when either child is EMPTY or INVALID.

**Notes**

- Arithmetic shift: floor division by `2 ** count`, sign extended, as Python's `>>` does. -16 shifted right by 2 is -4, not -3.
- A negative count raises. Only sentinels collapse to INVALID; a real error stays a real error.
- The count child is evaluated only after the value yields, so a sentinel on the value short-circuits without touching the count.

**Example**

```python
nu.run(nu.RShift(-16, 2))[0]
```

```
-4
```

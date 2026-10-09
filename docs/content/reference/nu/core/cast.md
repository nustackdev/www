---
title: cast
description: "Cast atoms: Python's type constructors and conversions."
---

Module `nu.core.cast`.

Cast atoms: Python's type constructors and conversions.

Maps Python's builtin type constructors onto Nu ScalarQueries that build a
value of the target type from their argument. Pure compute; no Context effect
of their own.

The split follows one rule - what the constructor consumes:

- scalar casts take a scalar operand and compute a scalar, so they are pure
  ScalarQueries with `compile` / `acompile` thunks (sentinel-aware, like
  `arithmetic`): `int` -> `ToInt`, `float` -> `ToFloat`,
  `complex` -> `ToComplex`, `str` -> `ToStr`, `bytes` -> `ToBytes`,
  `bytearray` -> `ToByteArray`. `ToInt`, `ToBytes` and `ToByteArray` take an
  optional second operand (base / encoding) where Python does, branched on
  child count like `arithmetic.Round`.
- collection constructors consume an iterable child and fold it to one
  container (Scalar over Stream, a Reduction in spirit), so they need the
  stream/fabric runtime that is not wired yet. They are declared
  structurally - ScalarQuery subclasses with no `compile` - and
  evaluate once the fabric lands: `list` -> `ToList`, `tuple` -> `ToTuple`,
  `set` -> `ToSet`, `frozenset` -> `ToFrozenSet`, `dict` -> `ToDict`.

`Bool` truthiness lives in `logical`; it is intentionally not defined here.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ToByteArray](#tobytearray) | `scalar_query` | `ToByteArray(value, encoding)` | The operand cast to `bytearray`. |
| [ToBytes](#tobytes) | `scalar_query` | `ToBytes(value, encoding)` | The operand cast to `bytes`. |
| [ToComplex](#tocomplex) | `scalar_query` | `ToComplex(real, imag)` | The operand cast to `complex`. |
| [ToDict](#todict) | `scalar_query` | `ToDict(value)` | The key/value pairs of the iterable child collected into a `dict`. |
| [ToFloat](#tofloat) | `scalar_query` | `ToFloat(value)` | The operand cast to `float`. |
| [ToFrozenSet](#tofrozenset) | `scalar_query` | `ToFrozenSet(value)` | The iterable child collected into a `frozenset`. |
| [ToInt](#toint) | `scalar_query` | `ToInt(value, base)` | The operand cast to `int`. |
| [ToList](#tolist) | `scalar_query` | `ToList(value)` | The iterable child collected into a `list`. |
| [ToSet](#toset) | `scalar_query` | `ToSet(value)` | The iterable child collected into a `set`. |
| [ToStr](#tostr) | `scalar_query` | `ToStr(value)` | The operand cast to `str`. |
| [ToTuple](#totuple) | `scalar_query` | `ToTuple(value)` | The iterable child collected into a `tuple`. |

## ToByteArray

The operand cast to `bytearray`.

```python
ToByteArray(value, encoding)
```

Path `nu.core.ToByteArray`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to convert. |
| `encoding` |  |  | optional. When given, `value` must be a string and is encoded with it. Without it, follows single-argument `bytearray()`: an int yields that many zero bytes, an iterable of ints yields those bytes. |

**Yields**

The bytearray. INVALID when either child is EMPTY or INVALID.

**Example**

```python
nu.run(nu.ToByteArray("hi", "utf-8"))[0]
```

```
bytearray(b'hi')
```

## ToBytes

The operand cast to `bytes`.

```python
ToBytes(value, encoding)
```

Path `nu.core.ToBytes`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to convert. |
| `encoding` |  |  | optional. When given, `value` must be a string and is encoded with it. Without it, follows single-argument `bytes()`: an int yields that many zero bytes, an iterable of ints yields those bytes. |

**Yields**

The bytes. INVALID when either child is EMPTY or INVALID.

**Example**

```python
nu.run(nu.ToBytes("hi", "utf-8"))[0]
```

```
b'hi'
```

## ToComplex

The operand cast to `complex`.

```python
ToComplex(real, imag)
```

Path `nu.core.ToComplex`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `real` |  |  | the value to convert, or the real part when `imag` is given. |
| `imag` |  |  | optional imaginary part. |

**Yields**

The complex number. INVALID when either child is EMPTY or INVALID.

**Notes**

- Without `imag`, follows single-argument `complex()`: numbers and complex-literal strings both convert.

**Example**

```python
nu.run(nu.ToComplex(2, 3))[0]
```

```
(2+3j)
```

## ToDict

The key/value pairs of the iterable child collected into a `dict`.

```python
ToDict(value)
```

Path `nu.core.ToDict`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | an iterable of `(key, value)` pairs. |

**Yields**

The dict. INVALID when the child is EMPTY or INVALID.

**Notes**

- A repeated key keeps the last pair's value, as for any Python `dict`.

**Example**

```python
nu.run(nu.ToDict([("a", 1), ("b", 2)]))[0]
```

```
{'a': 1, 'b': 2}
```

## ToFloat

The operand cast to `float`.

```python
ToFloat(value)
```

Path `nu.core.ToFloat`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to convert. |

**Yields**

The float. INVALID when the child is EMPTY or INVALID.

**Example**

```python
nu.run(nu.ToFloat("3.14"))[0]
```

```
3.14
```

## ToFrozenSet

The iterable child collected into a `frozenset`.

```python
ToFrozenSet(value)
```

Path `nu.core.ToFrozenSet`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the iterable to collect. |

**Yields**

The frozenset. INVALID when the child is EMPTY or INVALID.

**Notes**

- Duplicates collapse and order is not preserved, as for any Python `frozenset`.

**Example**

```python
nu.run(nu.ToFrozenSet([1, 1, 2]))[0]
```

```
frozenset({1, 2})
```

## ToInt

The operand cast to `int`.

```python
ToInt(value, base)
```

Path `nu.core.ToInt`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to convert. |
| `base` |  |  | optional. When given, `value` is parsed as a string in this base instead of being converted directly. |

**Yields**

The int. INVALID when either child is EMPTY or INVALID.

**Notes**

- Without `base`, follows `int()`: numeric strings, floats (truncated toward zero) and bools all convert.
- With `base`, follows `int(str, base)`: `value` must be a string, and a malformed literal for that base raises.

**Examples**

```python
nu.run(nu.ToInt("42"))[0]
```

```
42
```

```python
nu.run(nu.ToInt("2a", 16))[0]
```

```
42
```

## ToList

The iterable child collected into a `list`.

```python
ToList(value)
```

Path `nu.core.ToList`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the iterable to collect. |

**Yields**

The list. INVALID when the child is EMPTY or INVALID.

**Example**

```python
nu.run(nu.ToList((1, 2, 3)))[0]
```

```
[1, 2, 3]
```

## ToSet

The iterable child collected into a `set`.

```python
ToSet(value)
```

Path `nu.core.ToSet`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the iterable to collect. |

**Yields**

The set. INVALID when the child is EMPTY or INVALID.

**Notes**

- Duplicates collapse and order is not preserved, as for any Python `set`.

**Example**

```python
nu.run(nu.ToSet([1, 1, 2]))[0]
```

```
{1, 2}
```

## ToStr

The operand cast to `str`.

```python
ToStr(value)
```

Path `nu.core.ToStr`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to convert. |

**Yields**

The string. INVALID when the child is EMPTY or INVALID.

**Example**

```python
nu.run(nu.ToStr(42))[0]
```

```
'42'
```

## ToTuple

The iterable child collected into a `tuple`.

```python
ToTuple(value)
```

Path `nu.core.ToTuple`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the iterable to collect. |

**Yields**

The tuple. INVALID when the child is EMPTY or INVALID.

**Example**

```python
nu.run(nu.ToTuple([1, 2, 3]))[0]
```

```
(1, 2, 3)
```

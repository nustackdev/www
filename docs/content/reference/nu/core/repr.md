---
title: repr
description: "Representation atoms: Python's string and number renderings."
---

Module `nu.core.repr`.

Representation atoms: Python's string and number renderings.

Maps Python's builtins that render a value to text or to an alternate numeric
notation onto Nu ScalarQueries. Pure compute; no Context effect of their own.

Builtins to cover (Python -> Nu):
- text: `repr` -> `Repr`, `ascii` -> `Ascii`, `format` -> `Format`
- numeric notation: `bin` -> `Bin`, `hex` -> `Hex`, `oct` -> `Oct`
- code points: `ord` -> `Ord`, `chr` -> `Chr`

Sorts: all ScalarQuery (Q).

Each atom defines `compile` (sync hot path) and `acompile` (async hot
path). Both return a thunk `(rt) -> value` that captures the precompiled
child thunks, so recursion skips the `Runtime.eval` / `Runtime.aeval`
dispatch hop per child. Sentinel propagation is inlined: an EMPTY or INVALID
operand collapses the result to INVALID without further compute.

Most atoms are unary over one child. `Format` mirrors Python's
`format(value[, format_spec])` and branches on child count: one child
applies the empty format spec, two children apply the second child as the
spec.

The module name `repr` shadows the builtin name as a module path
(`nu.core.repr`); inside the module the builtin `repr()` still resolves
normally.

Most of these have no prior atom yet, so they are built fresh against the
builtins.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Ascii](#ascii) | `scalar_query` | `Ascii(value)` | The `ascii` string of its one child, with non-ASCII escaped. |
| [Bin](#bin) | `scalar_query` | `Bin(value)` | The binary string (`0b...`) of its one integer child. |
| [Chr](#chr) | `scalar_query` | `Chr(value)` | The character for its one integer code-point child. |
| [Format](#format) | `scalar_query` | `Format(value, spec)` | The `format` of a value under an optional format spec. |
| [Hex](#hex) | `scalar_query` | `Hex(value)` | The hexadecimal string (`0x...`) of its one integer child. |
| [Oct](#oct) | `scalar_query` | `Oct(value)` | The octal string (`0o...`) of its one integer child. |
| [Ord](#ord) | `scalar_query` | `Ord(value)` | The Unicode code point of its one single-character child. |
| [Repr](#repr) | `scalar_query` | `Repr(value)` | The `repr` string of its one child. |

## Ascii

The `ascii` string of its one child, with non-ASCII escaped.

```python
Ascii(value)
```

Path `nu.core.Ascii`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to represent. |

**Yields**

The ascii string. INVALID when the child is EMPTY or INVALID.

**Notes**

- Same as `Repr` except every non-ASCII code point comes back as a `\xXX`, `\uXXXX` or `\UXXXXXXXX` escape, so the result is always plain ASCII text.

**Example**

```python
nu.run(nu.Ascii("café"))[0]
```

```
"'caf\\xe9'"
```

## Bin

The binary string (`0b...`) of its one integer child.

```python
Bin(value)
```

Path `nu.core.Bin`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the integer to render. |

**Yields**

The binary string. INVALID when the child is EMPTY or INVALID.

**Notes**

- A negative value keeps its sign in front of the prefix, e.g. -10 renders as `-0b1010`, not a two's-complement bit pattern.

**Example**

```python
nu.run(nu.Bin(10))[0]
```

```
'0b1010'
```

## Chr

The character for its one integer code-point child.

```python
Chr(value)
```

Path `nu.core.Chr`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the code point, 0 through 0x10FFFF. |

**Yields**

The character. INVALID when the child is EMPTY or INVALID.

**Notes**

- Always yields a one-character string, never a raw byte or int.

**Example**

```python
nu.run(nu.Chr(65))[0]
```

```
'A'
```

## Format

The `format` of a value under an optional format spec.

```python
Format(value, spec)
```

Path `nu.core.Format`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to format. |
| `spec` |  |  | the format spec string. Optional: leave the child out entirely to apply the empty spec. |

**Yields**

The formatted string. INVALID when either child is EMPTY or INVALID.

**Notes**

- One child applies the empty spec (`format(value)`, usually the same as `str(value)`); two children apply the second as the spec mini-language string (`format(value, spec)`), e.g. `.2f` or `>10`.
- What a given spec means is up to the value's own `__format__`.

**Example**

```python
nu.run(nu.Format(3.14159, ".2f"))[0]
```

```
'3.14'
```

## Hex

The hexadecimal string (`0x...`) of its one integer child.

```python
Hex(value)
```

Path `nu.core.Hex`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the integer to render. |

**Yields**

The hex string. INVALID when the child is EMPTY or INVALID.

**Notes**

- A negative value keeps its sign in front of the prefix, e.g. -255 renders as `-0xff`, not a two's-complement bit pattern.

**Example**

```python
nu.run(nu.Hex(255))[0]
```

```
'0xff'
```

## Oct

The octal string (`0o...`) of its one integer child.

```python
Oct(value)
```

Path `nu.core.Oct`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the integer to render. |

**Yields**

The octal string. INVALID when the child is EMPTY or INVALID.

**Notes**

- A negative value keeps its sign in front of the prefix, e.g. -8 renders as `-0o10`, not a two's-complement bit pattern.

**Example**

```python
nu.run(nu.Oct(8))[0]
```

```
'0o10'
```

## Ord

The Unicode code point of its one single-character child.

```python
Ord(value)
```

Path `nu.core.Ord`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | a string of exactly one character. |

**Yields**

The code point, an int. INVALID when the child is EMPTY or INVALID.

**Notes**

- A string of any other length raises: this is not a bulk operation.

**Example**

```python
nu.run(nu.Ord("A"))[0]
```

```
65
```

## Repr

The `repr` string of its one child.

```python
Repr(value)
```

Path `nu.core.Repr`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to represent. |

**Yields**

The repr string. INVALID when the child is EMPTY or INVALID.

**Notes**

- Delegates to Python's `repr`, so a string comes back quoted with its special characters escaped, and any type defining `__repr__` renders however it chooses.

**Example**

```python
nu.run(nu.Repr("hi"))[0]
```

```
"'hi'"
```

---
title: forms
description: "The builtin `complex` as a Form - the value type behind `nustd.cmath`."
---

Module `nustd.cmath.forms`.

The builtin `complex` as a Form - the value type behind `nustd.cmath`.

`complex` is a builtin with no module of its own; `cmath` is its companion
set of functions, so the two co-locate here. This file is the value-type half:
`complex` as the typed access surface for Python's `complex` numbers.

The class name is lowercase `complex` to mirror the builtin (hence
`# noqa: N801`), backed by `from builtins import complex as _complex`.

- **property reads** (`.real`, `.imag`) reuse core `GetAttr`.
- **the constructor** is a `host` atom in `interactions`; the
  literal constructor is `.of(...)` since `__init__` wraps a Nu term.
- **`conjugate()`** is a `host` atom over the unbound method.
- **arithmetic** (`+ - * / ** -x +x abs`) reuses the core arithmetic atoms -
  Python performs the real op on the resolved values. `abs` is the magnitude
  (a float); the rest stay `complex`.
- **comparison**: `complex` supports only `==` / `!=` (it is not
  orderable), so just `eq` / `ne` via the core equality atoms.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [complex](#complex) | `scalar_query` | `complex()` | `builtins.complex` as a Form - a complex number. |

## complex

`builtins.complex` as a Form - a complex number.

```python
complex()
```

Path `nustd.cmath.complex`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Build one with `complex.of(real, imag)`; read its parts as properties
(`.real` / `.imag`); transform it with arithmetic or `conjugate()`.
Complex numbers are not orderable, so only `eq` / `ne` are provided.

**Methods**

### `complex.of(real=0, imag=0)`

Build a complex number: `complex(real, imag)`.

Builds `complex`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `real` | `FloatArg` | `0` |  |
| `imag` | `FloatArg` | `0` |  |

Undocumented: example.

### `.real()`

The real part.

Builds `Float`.

Undocumented: example.

### `.imag()`

The imaginary part.

Builds `Float`.

Undocumented: example.

### `.conjugate()`

The complex conjugate (negates the imaginary part).

Builds `complex`.

Undocumented: example.

### `a + b`

Builds `complex`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `ComplexArg` |  |  |

Undocumented: summary, example.

### `a - b`

Builds `complex`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `ComplexArg` |  |  |

Undocumented: summary, example.

### `a * b`

Builds `complex`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `ComplexArg` |  |  |

Undocumented: summary, example.

### `a / b`

Builds `complex`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `ComplexArg` |  |  |

Undocumented: summary, example.

### `a ** b`

Builds `complex`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `ComplexArg` |  |  |

Undocumented: summary, example.

### `-a`

Builds `complex`.

Undocumented: summary, example.

### `+a`

Builds `complex`.

Undocumented: summary, example.

### `abs(a)`

Builds `Float`.

Undocumented: summary, example.

### `.eq(other)`

Whether two complex numbers are equal.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `ComplexArg` |  |  |

Undocumented: example.

### `.ne(other)`

Whether two complex numbers differ.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `ComplexArg` |  |  |

Undocumented: example.

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

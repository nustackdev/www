---
title: math
description: "Nu surface for Python's `math` module."
---

Module `nustd.math`.

Nu surface for Python's `math` module.

`math` is a function module - module-level functions and constants, no central
class - so the Nu surface mirrors that: free functions (`sqrt`, `sin`,
`gcd`, ...) and constants (`pi`, `e`, `tau`, `inf`, `nan`). Two
layers behind it: `functions` (the wrappers and constants) and
`interactions` (the atoms each wrapper builds). Import it the way you would the
stdlib:

```python
from nustd.math import sqrt, pi
import nustd.math as math     # then math.sqrt(2), math.floor(3.7)
```

## Call

| Name | Call | Meaning |
| --- | --- | --- |
| [acos](#acos) | `math.acos(x)` | The arc cosine of `x`, in radians: mirrors `math.acos()`. |
| [asin](#asin) | `math.asin(x)` | The arc sine of `x`, in radians: mirrors `math.asin()`. |
| [atan](#atan) | `math.atan(x)` | The arc tangent of `x`, in radians: mirrors `math.atan()`. |
| [atan2](#atan2) | `math.atan2(y, x)` | The arc tangent of `y/x`, respecting quadrant: mirrors `math.atan2()`. |
| [ceil](#ceil) | `math.ceil(x)` | The ceiling of `x` as an int: mirrors `math.ceil()`. |
| [copysign](#copysign) | `math.copysign(x, y)` | `x` with the sign of `y`: mirrors `math.copysign()`. |
| [cos](#cos) | `math.cos(x)` | The cosine of `x` radians: mirrors `math.cos()`. |
| [degrees](#degrees) | `math.degrees(x)` | Radians `x` converted to degrees: mirrors `math.degrees()`. |
| [exp](#exp) | `math.exp(x)` | `e` raised to `x`: mirrors `math.exp()`. |
| [fabs](#fabs) | `math.fabs(x)` | The absolute value of `x` as a float: mirrors `math.fabs()`. |
| [factorial](#factorial) | `math.factorial(x)` | `x` factorial: mirrors `math.factorial()`. |
| [floor](#floor) | `math.floor(x)` | The floor of `x` as an int: mirrors `math.floor()`. |
| [fmod](#fmod) | `math.fmod(x, y)` | The C-library `fmod` of `x` and `y`: mirrors `math.fmod()`. |
| [gcd](#gcd) | `math.gcd(a, b)` | The greatest common divisor of `a` and `b`: mirrors `math.gcd()`. |
| [hypot](#hypot) | `math.hypot(x, y)` | The Euclidean norm `sqrt(x*x + y*y)`: mirrors `math.hypot()`. |
| [isclose](#isclose) | `math.isclose(a, b)` | Whether `a` and `b` are close: mirrors `math.isclose()`. |
| [isfinite](#isfinite) | `math.isfinite(x)` | Whether `x` is finite: mirrors `math.isfinite()`. |
| [isinf](#isinf) | `math.isinf(x)` | Whether `x` is positive or negative infinity: mirrors `math.isinf()`. |
| [isnan](#isnan) | `math.isnan(x)` | Whether `x` is NaN: mirrors `math.isnan()`. |
| [isqrt](#isqrt) | `math.isqrt(x)` | The integer square root of `x`: mirrors `math.isqrt()`. |
| [log](#log) | `math.log(x, base=None)` | The logarithm of `x` (natural, or to `base`): mirrors `math.log()`. |
| [log2](#log2) | `math.log2(x)` | The base-2 logarithm of `x`: mirrors `math.log2()`. |
| [log10](#log10) | `math.log10(x)` | The base-10 logarithm of `x`: mirrors `math.log10()`. |
| [pow](#pow) | `math.pow(base, exp)` | `base` raised to `exp`: mirrors `math.pow()`. |
| [radians](#radians) | `math.radians(x)` | Degrees `x` converted to radians: mirrors `math.radians()`. |
| [sin](#sin) | `math.sin(x)` | The sine of `x` radians: mirrors `math.sin()`. |
| [sqrt](#sqrt) | `math.sqrt(x)` | The square root of `x`: mirrors `math.sqrt()`. |
| [tan](#tan) | `math.tan(x)` | The tangent of `x` radians: mirrors `math.tan()`. |
| [trunc](#trunc) | `math.trunc(x)` | `x` truncated toward zero as an int: mirrors `math.trunc()`. |

### acos

The arc cosine of `x`, in radians: mirrors `math.acos()`.

```python
math.acos(x)
```

Path `nustd.math.acos`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### asin

The arc sine of `x`, in radians: mirrors `math.asin()`.

```python
math.asin(x)
```

Path `nustd.math.asin`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### atan

The arc tangent of `x`, in radians: mirrors `math.atan()`.

```python
math.atan(x)
```

Path `nustd.math.atan`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### atan2

The arc tangent of `y/x`, respecting quadrant: mirrors `math.atan2()`.

```python
math.atan2(y, x)
```

Path `nustd.math.atan2`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `y` | `FloatArg` |  |  |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### ceil

The ceiling of `x` as an int: mirrors `math.ceil()`.

```python
math.ceil(x)
```

Path `nustd.math.ceil`. Defined on `nustd.math.functions`, bound as a function. Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### copysign

`x` with the sign of `y`: mirrors `math.copysign()`.

```python
math.copysign(x, y)
```

Path `nustd.math.copysign`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |
| `y` | `FloatArg` |  |  |

Undocumented: example.

### cos

The cosine of `x` radians: mirrors `math.cos()`.

```python
math.cos(x)
```

Path `nustd.math.cos`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### degrees

Radians `x` converted to degrees: mirrors `math.degrees()`.

```python
math.degrees(x)
```

Path `nustd.math.degrees`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### exp

`e` raised to `x`: mirrors `math.exp()`.

```python
math.exp(x)
```

Path `nustd.math.exp`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### fabs

The absolute value of `x` as a float: mirrors `math.fabs()`.

```python
math.fabs(x)
```

Path `nustd.math.fabs`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### factorial

`x` factorial: mirrors `math.factorial()`.

```python
math.factorial(x)
```

Path `nustd.math.factorial`. Defined on `nustd.math.functions`, bound as a function. Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `IntArg` |  |  |

Undocumented: example.

### floor

The floor of `x` as an int: mirrors `math.floor()`.

```python
math.floor(x)
```

Path `nustd.math.floor`. Defined on `nustd.math.functions`, bound as a function. Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### fmod

The C-library `fmod` of `x` and `y`: mirrors `math.fmod()`.

```python
math.fmod(x, y)
```

Path `nustd.math.fmod`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |
| `y` | `FloatArg` |  |  |

Undocumented: example.

### gcd

The greatest common divisor of `a` and `b`: mirrors `math.gcd()`.

```python
math.gcd(a, b)
```

Path `nustd.math.gcd`. Defined on `nustd.math.functions`, bound as a function. Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `a` | `IntArg` |  |  |
| `b` | `IntArg` |  |  |

Undocumented: example.

### hypot

The Euclidean norm `sqrt(x*x + y*y)`: mirrors `math.hypot()`.

```python
math.hypot(x, y)
```

Path `nustd.math.hypot`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |
| `y` | `FloatArg` |  |  |

Undocumented: example.

### isclose

Whether `a` and `b` are close: mirrors `math.isclose()`.

```python
math.isclose(a, b)
```

Path `nustd.math.isclose`. Defined on `nustd.math.functions`, bound as a function. Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `a` | `FloatArg` |  |  |
| `b` | `FloatArg` |  |  |

Undocumented: example.

### isfinite

Whether `x` is finite: mirrors `math.isfinite()`.

```python
math.isfinite(x)
```

Path `nustd.math.isfinite`. Defined on `nustd.math.functions`, bound as a function. Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### isinf

Whether `x` is positive or negative infinity: mirrors `math.isinf()`.

```python
math.isinf(x)
```

Path `nustd.math.isinf`. Defined on `nustd.math.functions`, bound as a function. Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### isnan

Whether `x` is NaN: mirrors `math.isnan()`.

```python
math.isnan(x)
```

Path `nustd.math.isnan`. Defined on `nustd.math.functions`, bound as a function. Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### isqrt

The integer square root of `x`: mirrors `math.isqrt()`.

```python
math.isqrt(x)
```

Path `nustd.math.isqrt`. Defined on `nustd.math.functions`, bound as a function. Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `IntArg` |  |  |

Undocumented: example.

### log

The logarithm of `x` (natural, or to `base`): mirrors `math.log()`.

```python
math.log(x, base=None)
```

Path `nustd.math.log`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |
| `base` | `FloatArg \| None` | `None` |  |

Undocumented: example.

### log2

The base-2 logarithm of `x`: mirrors `math.log2()`.

```python
math.log2(x)
```

Path `nustd.math.log2`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### log10

The base-10 logarithm of `x`: mirrors `math.log10()`.

```python
math.log10(x)
```

Path `nustd.math.log10`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### pow

`base` raised to `exp`: mirrors `math.pow()`.

```python
math.pow(base, exp)
```

Path `nustd.math.pow`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `base` | `FloatArg` |  |  |
| `exp` | `FloatArg` |  |  |

Undocumented: example.

### radians

Degrees `x` converted to radians: mirrors `math.radians()`.

```python
math.radians(x)
```

Path `nustd.math.radians`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### sin

The sine of `x` radians: mirrors `math.sin()`.

```python
math.sin(x)
```

Path `nustd.math.sin`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### sqrt

The square root of `x`: mirrors `math.sqrt()`.

```python
math.sqrt(x)
```

Path `nustd.math.sqrt`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### tan

The tangent of `x` radians: mirrors `math.tan()`.

```python
math.tan(x)
```

Path `nustd.math.tan`. Defined on `nustd.math.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

### trunc

`x` truncated toward zero as an int: mirrors `math.trunc()`.

```python
math.trunc(x)
```

Path `nustd.math.trunc`. Defined on `nustd.math.functions`, bound as a function. Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: example.

---
title: cmath
description: "Nu surface for Python's `complex` builtin and its `cmath` companion."
---

Module `nustd.cmath`.

Nu surface for Python's `complex` builtin and its `cmath` companion.

A hybrid surface: `complex` is a builtin with no module of its own, and
`cmath` is its set of companion functions, so the two co-locate here. The
surface mirrors both 1-1:

- the `complex` value type is a Form (`complex.of(real, imag)`, `.real` /
  `.imag`, `conjugate()`, arithmetic, `eq` / `ne`).
- the `cmath` free functions (`sqrt`, `exp`, `phase`, `polar`, ...)
  and constants (`pi`, `e`, `tau`, `inf`, `nan`, `infj`, `nanj`).

Three layers behind it: `forms` (the `complex` type), `functions` (the
`cmath` wrappers and constants), and `interactions` (the atoms each builds).
Import it the way you would the stdlib:

```python
from nustd.cmath import complex, sqrt, phase, pi
import nustd.cmath as cmath    # then cmath.sqrt(...), cmath.phase(...)
```

The leaves that hold these values in a Shape slot sit one submodule per
fabric: `nustd.cmath.mem` for `nu.mem`, loaded with this package, and
`nustd.cmath.kv` for `nustd.kv`, imported by its own path.

## forms

Module `nustd.cmath.forms`.

The builtin `complex` as a Form - the value type behind `nustd.cmath`.

[Full entries](/docs/nustd/reference/cmath/forms)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [complex](/docs/nustd/reference/cmath/forms#complex) | `scalar_query` | `complex()` | `builtins.complex` as a Form - a complex number. |

## functions

Module `nustd.cmath.functions`.

Module-level functions and constants for `nustd.cmath`.

[Full entries](/docs/nustd/reference/cmath/functions)

| Name | Call | Meaning |
| --- | --- | --- |
| [acos](/docs/nustd/reference/cmath/functions#acos) | `cmath.acos(x)` | The arc cosine of `x`: mirrors `cmath.acos()`. |
| [asin](/docs/nustd/reference/cmath/functions#asin) | `cmath.asin(x)` | The arc sine of `x`: mirrors `cmath.asin()`. |
| [atan](/docs/nustd/reference/cmath/functions#atan) | `cmath.atan(x)` | The arc tangent of `x`: mirrors `cmath.atan()`. |
| [cos](/docs/nustd/reference/cmath/functions#cos) | `cmath.cos(x)` | The cosine of `x`: mirrors `cmath.cos()`. |
| [cosh](/docs/nustd/reference/cmath/functions#cosh) | `cmath.cosh(x)` | The hyperbolic cosine of `x`: mirrors `cmath.cosh()`. |
| [exp](/docs/nustd/reference/cmath/functions#exp) | `cmath.exp(x)` | `e` raised to `x`: mirrors `cmath.exp()`. |
| [isclose](/docs/nustd/reference/cmath/functions#isclose) | `cmath.isclose(a, b)` | Whether `a` and `b` are close: mirrors `cmath.isclose()`. |
| [isfinite](/docs/nustd/reference/cmath/functions#isfinite) | `cmath.isfinite(x)` | Whether both components of `x` are finite: mirrors `cmath.isfinite()`. |
| [isinf](/docs/nustd/reference/cmath/functions#isinf) | `cmath.isinf(x)` | Whether `x` has an infinite component: mirrors `cmath.isinf()`. |
| [isnan](/docs/nustd/reference/cmath/functions#isnan) | `cmath.isnan(x)` | Whether `x` has a NaN component: mirrors `cmath.isnan()`. |
| [log](/docs/nustd/reference/cmath/functions#log) | `cmath.log(x, base=None)` | The logarithm of `x` (natural, or to `base`): mirrors `cmath.log()`. |
| [log10](/docs/nustd/reference/cmath/functions#log10) | `cmath.log10(x)` | The base-10 logarithm of `x`: mirrors `cmath.log10()`. |
| [phase](/docs/nustd/reference/cmath/functions#phase) | `cmath.phase(x)` | The phase angle of `x`, in radians: mirrors `cmath.phase()`. |
| [polar](/docs/nustd/reference/cmath/functions#polar) | `cmath.polar(x)` | `x` as the polar pair `(r, phi)`: mirrors `cmath.polar()`. |
| [rect](/docs/nustd/reference/cmath/functions#rect) | `cmath.rect(r, phi)` | The complex number with modulus `r` and phase `phi`: mirrors `cmath.rect()`. |
| [sin](/docs/nustd/reference/cmath/functions#sin) | `cmath.sin(x)` | The sine of `x`: mirrors `cmath.sin()`. |
| [sinh](/docs/nustd/reference/cmath/functions#sinh) | `cmath.sinh(x)` | The hyperbolic sine of `x`: mirrors `cmath.sinh()`. |
| [sqrt](/docs/nustd/reference/cmath/functions#sqrt) | `cmath.sqrt(x)` | The square root of `x`: mirrors `cmath.sqrt()`. |
| [tan](/docs/nustd/reference/cmath/functions#tan) | `cmath.tan(x)` | The tangent of `x`: mirrors `cmath.tan()`. |
| [tanh](/docs/nustd/reference/cmath/functions#tanh) | `cmath.tanh(x)` | The hyperbolic tangent of `x`: mirrors `cmath.tanh()`. |

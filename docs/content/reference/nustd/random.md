---
title: random
description: "Nu surface for Python's `random` module."
---

Module `nustd.random`.

Nu surface for Python's `random` module.

`random` is a function module - module-level functions over a global RNG, no
central class - so the Nu surface mirrors that: free functions (`random`,
`randint`, `choice`, `sample`, ...). Two layers behind it: `functions`
(the typed wrappers) and `interactions` (the atoms each wrapper builds). Import
it the way you would the stdlib:

```python
from nustd.random import randint, choice
import nustd.random as random     # then random.randint(1, 6)
```

Every function reads the global RNG. The effectful / stateful pieces (`seed`,
`shuffle`, `getstate` / `setstate`) are deferred until the effect model
lands.

## Call

| Name | Call | Meaning |
| --- | --- | --- |
| [choice](#choice) | `random.choice(seq)` | A random element of `seq`: mirrors `random.choice()`. Non-deterministic. |
| [choices](#choices) | `random.choices(population, k)` | A `k`-sized list drawn with replacement: mirrors `random.choices()`. Non-deterministic. |
| [expovariate](#expovariate) | `random.expovariate(lambd)` | An exponential draw with rate `lambd`: mirrors `random.expovariate()`. Non-deterministic. |
| [gauss](#gauss) | `random.gauss(mu, sigma)` | A Gaussian draw with mean `mu` and stdev `sigma`: mirrors `random.gauss()`. Non-deterministic. |
| [getrandbits](#getrandbits) | `random.getrandbits(k)` | A non-negative int with `k` random bits: mirrors `random.getrandbits()`. Non-deterministic. |
| [normalvariate](#normalvariate) | `random.normalvariate(mu, sigma)` | A normal draw with mean `mu` and stdev `sigma`: mirrors `random.normalvariate()`. Non-deterministic. |
| [randint](#randint) | `random.randint(a, b)` | A random int `N` with `a <= N <= b`: mirrors `random.randint()`. Non-deterministic. |
| [random](#random) | `random.random()` | A random float in `[0.0, 1.0)`: mirrors `random.random()`. Non-deterministic. |
| [randrange](#randrange) | `random.randrange(start, stop)` | A random int in `range(start, stop)`: mirrors `random.randrange()`. Non-deterministic. |
| [sample](#sample) | `random.sample(population, k)` | A `k`-sized list drawn without replacement: mirrors `random.sample()`. Non-deterministic. |
| [triangular](#triangular) | `random.triangular(low, high)` | A triangular draw between `low` and `high`: mirrors `random.triangular()`. Non-deterministic. |
| [uniform](#uniform) | `random.uniform(a, b)` | A random float in `[a, b]`: mirrors `random.uniform()`. Non-deterministic. |

### choice

A random element of `seq`: mirrors `random.choice()`. Non-deterministic.

```python
random.choice(seq)
```

Path `nustd.random.choice`. Defined on `nustd.random.functions`, bound as a function. Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `seq` | `ListArg[object]` |  |  |

Undocumented: example.

### choices

A `k`-sized list drawn with replacement: mirrors `random.choices()`. Non-deterministic.

```python
random.choices(population, k)
```

Path `nustd.random.choices`. Defined on `nustd.random.functions`, bound as a function. Builds `List`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `population` | `ListArg[object]` |  |  |
| `k` | `IntArg` |  |  |

Undocumented: example.

### expovariate

An exponential draw with rate `lambd`: mirrors `random.expovariate()`. Non-deterministic.

```python
random.expovariate(lambd)
```

Path `nustd.random.expovariate`. Defined on `nustd.random.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `lambd` | `FloatArg` |  |  |

Undocumented: example.

### gauss

A Gaussian draw with mean `mu` and stdev `sigma`: mirrors `random.gauss()`. Non-deterministic.

```python
random.gauss(mu, sigma)
```

Path `nustd.random.gauss`. Defined on `nustd.random.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `mu` | `FloatArg` |  |  |
| `sigma` | `FloatArg` |  |  |

Undocumented: example.

### getrandbits

A non-negative int with `k` random bits: mirrors `random.getrandbits()`. Non-deterministic.

```python
random.getrandbits(k)
```

Path `nustd.random.getrandbits`. Defined on `nustd.random.functions`, bound as a function. Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `k` | `IntArg` |  |  |

Undocumented: example.

### normalvariate

A normal draw with mean `mu` and stdev `sigma`: mirrors `random.normalvariate()`. Non-deterministic.

```python
random.normalvariate(mu, sigma)
```

Path `nustd.random.normalvariate`. Defined on `nustd.random.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `mu` | `FloatArg` |  |  |
| `sigma` | `FloatArg` |  |  |

Undocumented: example.

### randint

A random int `N` with `a <= N <= b`: mirrors `random.randint()`. Non-deterministic.

```python
random.randint(a, b)
```

Path `nustd.random.randint`. Defined on `nustd.random.functions`, bound as a function. Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `a` | `IntArg` |  |  |
| `b` | `IntArg` |  |  |

Undocumented: example.

### random

A random float in `[0.0, 1.0)`: mirrors `random.random()`. Non-deterministic.

```python
random.random()
```

Path `nustd.random.random`. Defined on `nustd.random.functions`, bound as a function. Builds `Float`.

Undocumented: example.

### randrange

A random int in `range(start, stop)`: mirrors `random.randrange()`. Non-deterministic.

```python
random.randrange(start, stop)
```

Path `nustd.random.randrange`. Defined on `nustd.random.functions`, bound as a function. Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `start` | `IntArg` |  |  |
| `stop` | `IntArg` |  |  |

Undocumented: example.

### sample

A `k`-sized list drawn without replacement: mirrors `random.sample()`. Non-deterministic.

```python
random.sample(population, k)
```

Path `nustd.random.sample`. Defined on `nustd.random.functions`, bound as a function. Builds `List`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `population` | `ListArg[object]` |  |  |
| `k` | `IntArg` |  |  |

Undocumented: example.

### triangular

A triangular draw between `low` and `high`: mirrors `random.triangular()`. Non-deterministic.

```python
random.triangular(low, high)
```

Path `nustd.random.triangular`. Defined on `nustd.random.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `low` | `FloatArg` |  |  |
| `high` | `FloatArg` |  |  |

Undocumented: example.

### uniform

A random float in `[a, b]`: mirrors `random.uniform()`. Non-deterministic.

```python
random.uniform(a, b)
```

Path `nustd.random.uniform`. Defined on `nustd.random.functions`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `a` | `FloatArg` |  |  |
| `b` | `FloatArg` |  |  |

Undocumented: example.

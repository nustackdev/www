---
title: functools
description: "Nu surface for Python's `functools`."
---

Module `nustd.functools`.

Nu surface for Python's `functools`.

Only `reduce` is modeled: it is the one `functools` member that is a runtime
value operation (a fold over a stream). The rest are out of Nu's value model and
intentionally absent:

- `partial` / `partialmethod` / `cmp_to_key` produce *callables* - Nu has
  no first-class function value at the user surface.
- `lru_cache` / `cache` / `cached_property` are *stateful* (memoization) -
  they need the effect model (not yet built).
- `wraps` / `update_wrapper` / `total_ordering` are decorators over Python
  metadata, not runtime operations.

Import like the stdlib:

```python
from nustd.functools import reduce
```

## Call

| Name | Call | Meaning |
| --- | --- | --- |
| [reduce](#reduce) | `functools.reduce(function, iterable, initializer=<UNSET>)` | Fold `iterable` left-to-right with `function` (`functools.reduce`). |

### reduce

Fold `iterable` left-to-right with `function` (`functools.reduce`).

```python
functools.reduce(function, iterable, initializer=<UNSET>)
```

Path `nustd.functools.reduce`. Defined on `nustd.functools.functions`, bound as a function. Builds `Object`.

`function` is a lambda over the accumulator and the current item,
called once at construction with refs to them, so it builds the step and
never computes with them in Python. Given as a tree instead, it reads them
via `nu.Attr("acc")` and `nu.Attr("item")`. With `initializer` the
accumulator starts there; otherwise at the first item.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `function` | `Nu \| Callable[[Attr, Attr], Nu]` |  |  |
| `iterable` | `Arg[Iterable]` |  |  |
| `initializer` | `object` | `<UNSET>` |  |

**Examples**

```python
nu.run(nustd.functools.reduce(lambda acc, x: nu.Int(acc) * 10 + x, [1, 2, 3]))[0]
```

```
123
```

```python
The same as a tree:
```

```python
nu.run(nustd.functools.reduce(nu.Int(nu.Attr("acc")) * 10 + nu.Attr("item"), [1, 2, 3]))[0]
```

```
123
```

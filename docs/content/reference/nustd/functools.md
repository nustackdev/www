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

Path `nustd.functools.reduce`. Defined on `nustd.functools.functions`, bound as a function. Builds `Any`.

`function` is a Nu query that reads the accumulator and the current item
via a typed AttrRef - `IntAttrRef("acc")` and `IntAttrRef("item")` - so a
sum is `reduce(IntAttrRef("acc") + IntAttrRef("item"), xs)`. With
`initializer` the accumulator starts there; otherwise at the first item.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `function` | `Nu` |  |  |
| `iterable` | `Arg[Iterable]` |  |  |
| `initializer` | `object` | `<UNSET>` |  |

Undocumented: example.

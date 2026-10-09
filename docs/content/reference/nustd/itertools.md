---
title: itertools
description: "Nu surface for Python's `itertools` module."
---

Module `nustd.itertools`.

Nu surface for Python's `itertools` module.

`itertools` is a function module - free functions that build and combine
iterators, no central class - so the Nu surface mirrors that: free functions
over Nu streams. Two layers behind it: `functions` (the wrappers) and
`interactions` (the hand-written `StreamQuery` atoms each wrapper builds,
hot path, e2e, no factory).

A gap-fill: members already in Nu core (`map` / `filter` / `zip` /
`sorted` / `enumerate` / `reversed` / sums and folds) are not repeated
here. Import it the way you would the stdlib:

```python
from nustd.itertools import chain, islice, count
import nustd.itertools as itertools     # then itertools.product(a, b)
```

## Call

| Name | Call | Meaning |
| --- | --- | --- |
| [accumulate](#accumulate) | `itertools.accumulate(iterable, func=None)` | Running accumulation: mirrors `itertools.accumulate()`. |
| [batched](#batched) | `itertools.batched(iterable, n)` | Yield tuples of up to `n` items: mirrors `itertools.batched()`. |
| [chain](#chain) | `itertools.chain()` | Concatenate `iterables` end to end: mirrors `itertools.chain()`. |
| [chain_from_iterable](#chain_from_iterable) | `itertools.chain_from_iterable(iterable)` | Flatten an iterable of iterables one level: `itertools.chain.from_iterable()`. |
| [combinations](#combinations) | `itertools.combinations(iterable, r)` | `r`-length sorted subsequences: mirrors `itertools.combinations()`. |
| [combinations_with_replacement](#combinations_with_replacement) | `itertools.combinations_with_replacement(iterable, r)` | `r`-length subsequences allowing repeats: `combinations_with_replacement()`. |
| [compress](#compress) | `itertools.compress(data, selectors)` | Keep `data` items where `selectors` is truthy: `itertools.compress()`. |
| [count](#count) | `itertools.count(start=0, step=1)` | Count from `start` by `step` forever: mirrors `itertools.count()`. |
| [cycle](#cycle) | `itertools.cycle(iterable)` | Repeat `iterable` endlessly: mirrors `itertools.cycle()`. |
| [dropwhile](#dropwhile) | `itertools.dropwhile(predicate, iterable)` | Skip while `predicate` holds, then yield the rest: `itertools.dropwhile()`. |
| [filterfalse](#filterfalse) | `itertools.filterfalse(predicate, iterable)` | Keep items where `predicate` is falsy: mirrors `itertools.filterfalse()`. |
| [groupby](#groupby) | `itertools.groupby(iterable, key=None)` | Group consecutive items by `key`: mirrors `itertools.groupby()`. |
| [islice](#islice) | `itertools.islice(iterable)` | Slice `iterable` lazily: mirrors `itertools.islice()`. |
| [pairwise](#pairwise) | `itertools.pairwise(iterable)` | Yield overlapping consecutive pairs: mirrors `itertools.pairwise()`. |
| [permutations](#permutations) | `itertools.permutations(iterable, r=None)` | `r`-length ordered arrangements: mirrors `itertools.permutations()`. |
| [product](#product) | `itertools.product(repeat=1)` | The cartesian product of `iterables`: mirrors `itertools.product()`. |
| [repeat](#repeat) | `itertools.repeat(elem, times=None)` | Yield `elem` `times` times, or forever: mirrors `itertools.repeat()`. |
| [starmap](#starmap) | `itertools.starmap(function, iterable)` | Apply `function` to unpacked items: mirrors `itertools.starmap()`. |
| [takewhile](#takewhile) | `itertools.takewhile(predicate, iterable)` | Yield while `predicate` holds, stop at the first falsy: `itertools.takewhile()`. |
| [tee](#tee) | `itertools.tee(iterable, n=2)` | Split `iterable` into `n` independent iterators: `itertools.tee()`. |
| [zip_longest](#zip_longest) | `itertools.zip_longest(fillvalue=None)` | Zip to the longest, padding with `fillvalue`: `itertools.zip_longest()`. |

### accumulate

Running accumulation: mirrors `itertools.accumulate()`.

```python
itertools.accumulate(iterable, func=None)
```

Path `nustd.itertools.accumulate`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

Without `func` it is a running sum. With `func` (a Nu term) each step
reads the running value via `AttrRef("acc")` and the item via
`AttrRef("item")`; the first item is yielded as-is.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `iterable` | `Arg[Iterable]` |  |  |
| `func` | `Nu \| None` | `None` |  |

Undocumented: example.

### batched

Yield tuples of up to `n` items: mirrors `itertools.batched()`.

```python
itertools.batched(iterable, n)
```

Path `nustd.itertools.batched`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `iterable` | `Arg[Iterable]` |  |  |
| `n` | `IntArg` |  |  |

Undocumented: example.

### chain

Concatenate `iterables` end to end: mirrors `itertools.chain()`.

```python
itertools.chain()
```

Path `nustd.itertools.chain`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

Undocumented: example.

### chain_from_iterable

Flatten an iterable of iterables one level: `itertools.chain.from_iterable()`.

```python
itertools.chain_from_iterable(iterable)
```

Path `nustd.itertools.chain_from_iterable`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `iterable` | `Arg[Iterable]` |  |  |

Undocumented: example.

### combinations

`r`-length sorted subsequences: mirrors `itertools.combinations()`.

```python
itertools.combinations(iterable, r)
```

Path `nustd.itertools.combinations`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `iterable` | `Arg[Iterable]` |  |  |
| `r` | `IntArg` |  |  |

Undocumented: example.

### combinations_with_replacement

`r`-length subsequences allowing repeats: `combinations_with_replacement()`.

```python
itertools.combinations_with_replacement(iterable, r)
```

Path `nustd.itertools.combinations_with_replacement`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `iterable` | `Arg[Iterable]` |  |  |
| `r` | `IntArg` |  |  |

Undocumented: example.

### compress

Keep `data` items where `selectors` is truthy: `itertools.compress()`.

```python
itertools.compress(data, selectors)
```

Path `nustd.itertools.compress`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `data` | `Arg[Iterable]` |  |  |
| `selectors` | `Arg[Iterable]` |  |  |

Undocumented: example.

### count

Count from `start` by `step` forever: mirrors `itertools.count()`.

```python
itertools.count(start=0, step=1)
```

Path `nustd.itertools.count`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

Infinite - bound it with `islice` (or another short consumer).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `start` | `IntArg` | `0` |  |
| `step` | `IntArg` | `1` |  |

Undocumented: example.

### cycle

Repeat `iterable` endlessly: mirrors `itertools.cycle()`.

```python
itertools.cycle(iterable)
```

Path `nustd.itertools.cycle`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `iterable` | `Arg[Iterable]` |  |  |

Undocumented: example.

### dropwhile

Skip while `predicate` holds, then yield the rest: `itertools.dropwhile()`.

```python
itertools.dropwhile(predicate, iterable)
```

Path `nustd.itertools.dropwhile`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

`predicate` reads the current item via `AttrRef("item")`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `predicate` | `Nu` |  |  |
| `iterable` | `Arg[Iterable]` |  |  |

Undocumented: example.

### filterfalse

Keep items where `predicate` is falsy: mirrors `itertools.filterfalse()`.

```python
itertools.filterfalse(predicate, iterable)
```

Path `nustd.itertools.filterfalse`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

`predicate` reads the current item via `AttrRef("item")`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `predicate` | `Nu` |  |  |
| `iterable` | `Arg[Iterable]` |  |  |

Undocumented: example.

### groupby

Group consecutive items by `key`: mirrors `itertools.groupby()`.

```python
itertools.groupby(iterable, key=None)
```

Path `nustd.itertools.groupby`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

Yields `(key_value, tuple(group))` pairs. With `key` (a Nu term) the key
reads the item via `AttrRef("item")`; without it items group by identity.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `iterable` | `Arg[Iterable]` |  |  |
| `key` | `Nu \| None` | `None` |  |

Undocumented: example.

### islice

Slice `iterable` lazily: mirrors `itertools.islice()`.

```python
itertools.islice(iterable)
```

Path `nustd.itertools.islice`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

`args` is 1-3 ints: `stop` | `start, stop` | `start, stop, step`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `iterable` | `Arg[Iterable]` |  |  |

Undocumented: example.

### pairwise

Yield overlapping consecutive pairs: mirrors `itertools.pairwise()`.

```python
itertools.pairwise(iterable)
```

Path `nustd.itertools.pairwise`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `iterable` | `Arg[Iterable]` |  |  |

Undocumented: example.

### permutations

`r`-length ordered arrangements: mirrors `itertools.permutations()`.

```python
itertools.permutations(iterable, r=None)
```

Path `nustd.itertools.permutations`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `iterable` | `Arg[Iterable]` |  |  |
| `r` | `IntArg \| None` | `None` |  |

Undocumented: example.

### product

The cartesian product of `iterables`: mirrors `itertools.product()`.

```python
itertools.product(repeat=1)
```

Path `nustd.itertools.product`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `repeat` | `IntArg` | `1` |  |

Undocumented: example.

### repeat

Yield `elem` `times` times, or forever: mirrors `itertools.repeat()`.

```python
itertools.repeat(elem, times=None)
```

Path `nustd.itertools.repeat`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `elem` | `object` |  |  |
| `times` | `IntArg \| None` | `None` |  |

Undocumented: example.

### starmap

Apply `function` to unpacked items: mirrors `itertools.starmap()`.

```python
itertools.starmap(function, iterable)
```

Path `nustd.itertools.starmap`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

Each item is a tuple; `function` reads its parts via
`TupleAttrRef("item")[0]`, `[1]`, ...

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `function` | `Nu` |  |  |
| `iterable` | `Arg[Iterable]` |  |  |

Undocumented: example.

### takewhile

Yield while `predicate` holds, stop at the first falsy: `itertools.takewhile()`.

```python
itertools.takewhile(predicate, iterable)
```

Path `nustd.itertools.takewhile`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

`predicate` reads the current item via `AttrRef("item")`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `predicate` | `Nu` |  |  |
| `iterable` | `Arg[Iterable]` |  |  |

Undocumented: example.

### tee

Split `iterable` into `n` independent iterators: `itertools.tee()`.

```python
itertools.tee(iterable, n=2)
```

Path `nustd.itertools.tee`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Any`.

Returns an `Any` holding a *tuple* of `n` iterators (not a stream),
so it is the one member here backed by a `ScalarQuery`. Its source rides
as a scalar child (a `ScalarQuery` may not hold a stream), and the atom
materializes it with `sync_iter` before splitting.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `iterable` | `Arg[Iterable]` |  |  |
| `n` | `IntArg` | `2` |  |

Undocumented: example.

### zip_longest

Zip to the longest, padding with `fillvalue`: `itertools.zip_longest()`.

```python
itertools.zip_longest(fillvalue=None)
```

Path `nustd.itertools.zip_longest`. Defined on `nustd.itertools.functions`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `fillvalue` | `object` | `None` |  |

Undocumented: example.

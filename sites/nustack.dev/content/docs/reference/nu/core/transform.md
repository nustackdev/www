---
title: transform
description: "Transform atoms: Python's stream-to-stream builtins."
---

Module `nu.core.transform`.

Transform atoms: Python's stream-to-stream builtins.

Maps Python's builtins that take an iterable and yield another iterable onto Nu
StreamQueries (lazy lenses - pulled per item, no materialization). Pure shape
over their source; effects only ride in through Ref children.

Builtins to cover (Python -> Nu):
- `map` -> `Map`, `filter` -> `Filter`, `sorted` -> `Sorted`

Plus two transforms kept as core: `Flatten` (one-level concat) and
`Unique` (drop already-seen, order preserved).

`Map` and `Filter` bind each item into the attrs side-channel under a name
and evaluate a Nu child against it. The name is a **child** (a Query yielding
the name), so it can be a `Literal` or a Ref computed elsewhere - never an
opaque payload. The body reads the item with `AttrRef(<name>)`. The per-item
binding writes `ctx.attrs` directly - the model's side-channel for loop
variables, not a tracked fabric write.

Sorts: all StreamQuery (Q). `Sorted` / `Flatten` / `Unique` stay
structural stubs (no `compile`) until they are filled.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Filter](#filter) | `stream_query` | `Filter(source, predicate, key='item')` | Keeps the items of a stream child for which a predicate holds (lazy). |
| [Flatten](#flatten) | `stream_query` | `Flatten(source)` | Concatenates a source of iterables one level into a flat stream (lazy). |
| [Map](#map) | `stream_query` | `Map(source, transform, key='item')` | Applies a query child to every item of a stream child (lazy). |
| [SortBy](#sortby) | `stream_query` | `SortBy(source, key, reverse=False, item='item')` | Its source child, ordered by a per-item key expression (eager). |
| [Sorted](#sorted) | `stream_query` | `Sorted(source)` | Its source child, ordered (eager). |
| [Unique](#unique) | `stream_query` | `Unique(source)` | Yields each item of a source child once, first-seen order (lazy). |

## Filter

Keeps the items of a stream child for which a predicate holds (lazy).

```python
Filter(source, predicate, key='item')
```

Path `nu.core.Filter`. Kind `StreamQuery`, sort `stream_query`, cardinality `stream`. Arity 3 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `source` | `Arg[Iterable]` |  | the stream to filter. |
| `predicate` | `Nu` |  | evaluated once per item; the item passes when this is truthy. |
| `key` | `StrArg` | `'item'` | name each item is bound under while predicate runs. Defaults to `"item"`. |

**Yields**

A stream no longer than `source` (stream in, stream out), holding
the items where `predicate` held.

**Notes**

- `predicate` reads the item with `AttrRef(<name>)`, the same side-channel binding as `Map`.
- An EMPTY or INVALID `predicate` result drops the item rather than propagating the sentinel; only a genuine falsy value does that in Python's `filter`.
- Pulled lazily, one item at a time.

**Example**

```python
nu.run(nu.Collect(nu.Filter(nu.Iter([1, 2, 3, 4]), nu.Gt(nu.AttrRef("item"), 2))))[0]
```

```
[3, 4]
```

## Flatten

Concatenates a source of iterables one level into a flat stream (lazy).

```python
Flatten(source)
```

Path `nu.core.Flatten`. Kind `StreamQuery`, sort `stream_query`, cardinality `stream`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `source` |  |  | the stream of iterables to flatten. Each item must itself be iterable. |

**Yields**

A stream of every item from every sub-iterable of `source`, in
order (stream in, stream out).

**Notes**

- Only one level deep - an item that yields more iterables stays nested.
- No sentinel check of its own: an EMPTY or INVALID sub-item is treated like any other value and raises since it isn't iterable.

**Example**

```python
nu.run(nu.Collect(nu.Flatten(nu.Iter([[1, 2], [3], [4, 5]]))))[0]
```

```
[1, 2, 3, 4, 5]
```

## Map

Applies a query child to every item of a stream child (lazy).

```python
Map(source, transform, key='item')
```

Path `nu.core.Map`. Kind `StreamQuery`, sort `stream_query`, cardinality `stream`. Arity 3 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `source` | `Arg[Iterable]` |  | the stream to map over. |
| `transform` | `Nu` |  | evaluated once per item; its value replaces the item. |
| `key` | `StrArg` | `'item'` | name each item is bound under while transform runs. Defaults to `"item"`. |

**Yields**

A stream the same length as `source` (stream in, stream out),
each item `transform`'s result.

**Notes**

- `key` is itself a child (a `Literal` or a Ref), not a raw string, so it can be computed rather than fixed at write time.
- `transform` reads the item with `AttrRef(<name>)`. The binding writes `ctx.attrs` directly - the side-channel for loop variables, not a tracked fabric write.
- Pulled lazily, one item at a time; nothing runs ahead of the pull.
- No sentinel check of its own: an EMPTY or INVALID item, or an EMPTY or INVALID result from `transform`, passes straight through as a value rather than collapsing.

**Example**

```python
nu.run(nu.Collect(nu.Map(nu.Iter([1, 2, 3]), nu.Add(nu.AttrRef("item"), 1))))[0]
```

```
[2, 3, 4]
```

## SortBy

Its source child, ordered by a per-item key expression (eager).

```python
SortBy(source, key, reverse=False, item='item')
```

Path `nu.core.SortBy`. Kind `StreamQuery`, sort `stream_query`, cardinality `stream`. Arity 4 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `source` | `Arg[Iterable]` |  | the stream to sort. |
| `key` | `Nu` |  | evaluated once per item to produce its sort key. |
| `reverse` | `Arg[bool]` | `False` | descending order when truthy. Defaults to `False`. |
| `item` | `StrArg` | `'item'` | name each item is bound under while `key` runs. Defaults to `"item"`. |

**Yields**

A stream holding every item of `source`, ordered by `key`
(stream in, stream out).

**Notes**

- `key` reads the item with `AttrRef(<name>)`, the same side-channel binding as `Map` / `Filter`.
- Drains and sorts the whole source before yielding anything, the same barrier as `Sorted`.

**Example**

```python
nu.run(nu.Collect(nu.SortBy(nu.Iter(["bb", "a", "ccc"]), nu.Len(nu.AttrRef("item")))))[0]
```

```
['a', 'bb', 'ccc']
```

## Sorted

Its source child, ordered (eager).

```python
Sorted(source)
```

Path `nu.core.Sorted`. Kind `StreamQuery`, sort `stream_query`, cardinality `stream`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `source` |  |  | the stream to sort. |

**Yields**

A stream holding every item of `source`, ascending (stream in,
stream out).

**Notes**

- Drains the whole source before yielding anything - the one barrier among these lenses. A pull on its output blocks until the whole source is drained and sorted.
- Items must support ordering against each other.
- No sentinel check of its own: an EMPTY or INVALID item is compared like any other value and raises if it can't be ordered against the rest.

**Example**

```python
nu.run(nu.Collect(nu.Sorted(nu.Iter([3, 1, 2]))))[0]
```

```
[1, 2, 3]
```

## Unique

Yields each item of a source child once, first-seen order (lazy).

```python
Unique(source)
```

Path `nu.core.Unique`. Kind `StreamQuery`, sort `stream_query`, cardinality `stream`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `source` |  |  | the stream to dedupe. |

**Yields**

A stream holding each distinct item of `source` once, in
first-seen order (stream in, stream out).

**Notes**

- Items must be hashable.
- Keeps every distinct item seen so far to check membership, so memory grows with the number of distinct items, not the length of `source`.
- No sentinel check of its own: an EMPTY or INVALID item is kept like any other value and only passes through once.

**Example**

```python
nu.run(nu.Collect(nu.Unique(nu.Iter([1, 2, 1, 3, 2]))))[0]
```

```
[1, 2, 3]
```

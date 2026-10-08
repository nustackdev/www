---
title: iteration
description: "Iteration atoms: Python's iterator sources and stepping."
---

Module `nu.core.iteration`.

Iteration atoms: Python's iterator sources and stepping.

Maps Python's builtins that produce or advance iterators onto Nu. Mostly
StreamQuery sources; `next` is the odd one - it advances an iterator (mutates
its state) and yields the item, so it is an Action.

Builtins to cover (Python -> Nu):
- sources (Q-stream): `iter` -> `Iter`, `enumerate` -> `Enumerate`,
  `zip` -> `Zip`, `reversed` -> `Reversed`
- stepping (A): `next` -> `Next` (advance + yield; mutate-and-yield)

Sorts: StreamQuery (Q) for the sources, ScalarAction (A) for `Next`. Each
source returns an iterator from its thunk (the stream contract); the async twin
returns an async iterator. Lazy lenses (map / filter) live in `transform`;
folds in `reduction`.

`range` is a Python type, not a stream function, so it is a Form (a later
pass), not an atom here; stream a range with `Iter(<range value>)`. `Next`
steps a ref-held iterator, so it stays a structural stub until the iterator
fabric lands.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Enumerate](#enumerate) | `stream_query` | `Enumerate(source, start)` | Pairs each item of a source child with its running index. |
| [Iter](#iter) | `stream_query` | `Iter(source)` | Opens a scalar iterable child into a stream of its elements. |
| [Next](#next) | `scalar_action` | `Next(iterator)` | Advances a ref-held iterator child and yields the item it pulls. |
| [Reversed](#reversed) | `stream_query` | `Reversed(source)` | Yields the items of a source child in reverse order. |
| [Zip](#zip) | `stream_query` | `Zip(*sources)` | Threads several source children together item by item. |

## Enumerate

Pairs each item of a source child with its running index.

```python
Enumerate(source, start)
```

Path `nu.core.Enumerate`. Kind `StreamQuery`, sort `stream_query`, cardinality `stream`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `source` |  |  | the stream to enumerate. |
| `start` |  |  | the first index. Optional: leave the child out to start at 0. |

**Yields**

`(index, item)` tuples, one per item of `source`, the index
counting up from `start` (Python's `enumerate`).

**Notes**

- An EMPTY or INVALID `start` collapses the whole result to an empty stream rather than raising or falling back to 0.

**Examples**

```python
nu.run(nu.Collect(nu.Enumerate(nu.Iter(["a", "b"]))))[0]
```

```
[(0, 'a'), (1, 'b')]
```

```python
nu.run(nu.Collect(nu.Enumerate(nu.Iter(["a", "b"]), 1)))[0]
```

```
[(1, 'a'), (2, 'b')]
```

## Iter

Opens a scalar iterable child into a stream of its elements.

```python
Iter(source)
```

Path `nu.core.Iter`. Kind `StreamQuery`, sort `stream_query`, cardinality `stream`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `source` |  |  | the iterable value to open - list, tuple, range, generator, dict, set, or anything else Python can iterate. |

**Yields**

The elements of `source`, in iteration order. Lazy: the thunk
returns an iterator, nothing is pulled until something drains it.

**Notes**

- The inverse of a Reduction: a Reduction folds a stream down to a scalar, `Iter` opens a scalar back up into a stream.

**Example**

```python
nu.run(nu.Collect(nu.Iter([1, 2, 3])))[0]
```

```
[1, 2, 3]
```

## Next

Advances a ref-held iterator child and yields the item it pulls.

```python
Next(iterator)
```

Path `nu.core.Next`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `iterator` |  |  | the Ref to an iterator held in the Context. |

**Yields**

The next item pulled from the iterator.

**Notes**

- Mutates slot 0 (the iterator's position) as well as yielding, so `Next` is an Action, not a Query - the dual-citizen twin of Python's `next`, and the first concrete Action in core.
- Structural stub: no `compile` yet, waits on the iterator fabric. Async twin `anext` follows once async sources land.

Undocumented: example.

## Reversed

Yields the items of a source child in reverse order.

```python
Reversed(source)
```

Path `nu.core.Reversed`. Kind `StreamQuery`, sort `stream_query`, cardinality `stream`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `source` |  |  | the stream to reverse. |

**Yields**

The items of `source`, last to first.

**Notes**

- Materializes the whole source before yielding anything, since walking backwards needs the full sequence up front - not lazy, despite still yielding a stream.

**Example**

```python
nu.run(nu.Collect(nu.Reversed(nu.Iter([1, 2, 3]))))[0]
```

```
[3, 2, 1]
```

## Zip

Threads several source children together item by item.

```python
Zip(*sources)
```

Path `nu.core.Zip`. Kind `StreamQuery`, sort `stream_query`, cardinality `stream`. Arity None (0 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*sources` |  |  | the streams to zip, one item pulled from each per step. |

**Yields**

Tuples of one item per source, in source order.

**Notes**

- Stops at the shortest source, same as Python's `zip` (not the `strict` variant).
- No children at all yields an empty stream.

**Example**

```python
nu.run(nu.Collect(nu.Zip(nu.Iter([1, 2, 3]), nu.Iter(["a", "b"]))))[0]
```

```
[(1, 'a'), (2, 'b')]
```

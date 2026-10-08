---
title: interactions.kh57
description: "kh57 atoms: read a sub-range of an int-keyed series, sampled or whole."
---

Module `nustd.kv.interactions.kh57`.

kh57 atoms: read a sub-range of an int-keyed series, sampled or whole.

A `Kh57Ref` names a container whose keys are integers spread across levels,
built so that a uniform sample of any sub-range costs about the same whether
the range holds a thousand entries or a billion. These two atoms are the read
side of that: one draws a bounded sample, the other materializes everything.

Both take the container Ref at slot 0 and their bounds as ordinary children,
so a bound can be another Ref read at run time rather than a number fixed when
the tree was written. Both come back as a list of `(int_key, value)` pairs
and both answer EMPTY when the container is not reachable.

Neither is written directly in normal use. `Kh57Ref.sample` and
`Kh57Ref.range` build them, already wrapped in the `Any` form.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Kh57Sample](#kh57sample) | `scalar_query` | `Kh57Sample(ref, n, begin=None, end=None, rng=None)` | Draws a uniform sample of a kh57 series' sub-range, in bounded time. |
| [Kh57Range](#kh57range) | `scalar_query` | `Kh57Range(ref, begin, end)` | Reads a kh57 series' sub-range whole, in ascending key order. |

## Kh57Sample

Draws a uniform sample of a kh57 series' sub-range, in bounded time.

```python
Kh57Sample(ref, n, begin=None, end=None, rng=None)
```

Path `nustd.kv.Kh57Sample`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 5 (2 required).

Cost tracks `n` rather than the size of the range, so sampling a window
holding a billion entries is no dearer than one holding a thousand. That
is what makes it usable as the read behind a live chart over a series that
keeps growing.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` | `Nu` |  | the kh57 container Ref to sample. |
| `n` | `IntArg` |  | the ceiling on how many pairs come back. A range holding fewer than `n` entries yields all of them. |
| `begin` | `IntArg \| None` | `None` | inclusive lower bound on the int key. None leaves the range open at the bottom. |
| `end` | `IntArg \| None` | `None` | exclusive upper bound on the int key. None leaves the range open at the top. |
| `rng` | `random.Random \| None` | `None` |  |

**Yields**

A list of `(int_key, value)` pairs, unordered. EMPTY when the
container is not reachable.

**Notes**

- `n`, `begin` and `end` are children, so each may be a Ref read at run time; a raw value is wrapped as a Literal.
- The keyword-only `rng` picks the random source; seed it to make a run reproducible. It is not a child: it rides the atom's payload, so a tree rewrite carries it, but it cannot be computed.
- The sample is stable under appends outside the queried range: rows landing above `end` do not disturb what a fixed window returns.
- Bounds are evaluated after the container is opened, so a missing container short-circuits before they run.

**Examples**

```python
class State(nu.Shape):
    nums = nustd.kv.Kh57Ref.slot(int)
    cursor = nustd.kv.IntRef.slot()
```

```python
app = nu.With(
    nustd.kv.memory_navigator(),
    body=nustd.kv.Snapshot(Kh57Sample(State.nums, 200, 0, State.cursor)),
)
```

## Kh57Range

Reads a kh57 series' sub-range whole, in ascending key order.

```python
Kh57Range(ref, begin, end)
```

Path `nustd.kv.Kh57Range`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 3 (3 required).

The keys of a kh57 container are spread across levels, so a range is
assembled by merging one ordered walk per level. Cost tracks the size of
the range, unlike `Kh57Sample`: this is the atom for a window you know
is small, and the wrong one for a window that grows without bound.

The merged walk is drained into a list before the value leaves the atom,
to match `Kh57Sample`'s scalar shape. Anyone wanting to stream iterates
the list.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the kh57 container Ref to read. |
| `begin` |  |  | inclusive lower bound on the int key. Must be non-negative. |
| `end` |  |  | exclusive upper bound on the int key. Must not exceed the key space the container's level layout covers. |

**Yields**

A list of `(int_key, value)` pairs with `begin <= int_key < end`,
ascending by key. EMPTY when the container is not reachable.

**Notes**

- `begin` and `end` are children, so either may be a Ref read at run time; a raw value is wrapped as a Literal.
- Unlike `Kh57Sample` the bounds are required, not optional: there is no open-ended form.
- An empty or inverted range (`begin >= end`) yields an empty list rather than an error. Out-of-space bounds do raise `ValueError`.
- Bounds are evaluated after the container is opened, so a missing container short-circuits before they run.

**Example**

```python
app = nu.With(
    nustd.kv.memory_navigator(),
    body=nustd.kv.Snapshot(Kh57Range(State.nums, 0, 100)),
)
```

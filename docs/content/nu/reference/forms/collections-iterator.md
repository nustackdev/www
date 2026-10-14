---
title: collections.iterator_
description: "Iterator - lazy stream form."
---

Module `nu.forms.collections.iterator_`.

Iterator - lazy stream form.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Iterator](#iterator) | `stream_query` | `Iterator()` | Lazy stream over another form's elements. |

## Iterator

Lazy stream over another form's elements.

```python
Iterator()
```

Path `nu.forms.Iterator`. Kind `StreamQuery`, sort `stream_query`, cardinality `stream`.

Opened by `.iter()` on an IterableForm, which wraps the source in
a stream-shaped `Iter` term. A term of this shape produces its items one
at a time rather than as a single value, so it sits wherever a stream
goes: `nu.ForEachDo`, `nu.Map`, `nu.Collect`, and the itertools.

**Notes**

- Stream-shaped, not scalar. Its surface is stream operations only: `map`/`filter` stay streams, `to_list`/`to_set`/`to_tuple` drain it into a concrete collection, `next` pulls one item.
- No `==` / `!=`: an iterator has no value to compare, so both raise. Drain it first: `it.to_list() == [...]`.
- An element type rides on the payload as `type_info` when the source declared one (a typed collection ref opened with `.iter()`). The item `first` reads takes that type's form, and every op whose items are still the source's (`filter`, `to_list`, `to_set`) carries it on. `map` does not: the transform makes new items.

**Example**

```python
nu.run(nu.List.of(1, 2, 3).iter().to_list())[0]
```

```
[1, 2, 3]
```

**Methods**

### `.first()`

The first item this stream yields.

**Yields**

The first item. EMPTY when the stream is empty.

**Notes**

- The stream opens fresh on every evaluation, so there is no cursor to advance: this is its first item, pulled and nothing past it. Python's `next()` is blocked by the `Nu` base.
- The item takes the declared element type's form when the stream carries one, `Object` otherwise.

**Example**

```python
nu.run(nu.List.of(1, 2).iter().first())[0]
```

```
1
```

### `.map(transform, key=None)`

Each item replaced by transform's value, still a stream.

Builds `Iterator`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `transform` | `Nu \| Callable[[Attr], Nu]` |  | evaluated once per item; its value replaces the item. A lambda over the item, or a tree reading it with `nu.Attr(key)`. |
| `key` | `StrArg \| None` | `None` | the name each item is bound under, for a tree transform. Defaults to `"item"`; a lambda mints its own. |

**Yields**

An Iterator the same length as self, lazily mapped.

**Notes**

- The same binding as `nu.Map`: `key` is passed on only when given, so a lambda and an explicit name never meet.

**Examples**

```python
xs = nu.List.of(1, 2).iter()
nu.run(xs.map(lambda x: nu.Int(x) + 1).to_list())[0]
```

```
[2, 3]
```

```python
The same with a tree reading the default name:
```

```python
nu.run(xs.map(nu.Add(nu.Attr("item"), 1)).to_list())[0]
```

```
[2, 3]
```

### `.filter(predicate, key=None)`

Only the items predicate holds for, still a stream.

Builds `Iterator[T]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `predicate` | `Nu \| Callable[[Attr], Nu]` |  | evaluated once per item; the item stays when it is truthy. A lambda over the item, or a tree reading it with `nu.Attr(key)`. |
| `key` | `StrArg \| None` | `None` | the name each item is bound under, for a tree predicate. Defaults to `"item"`; a lambda mints its own. |

**Yields**

An Iterator over the kept items, in order.

**Notes**

- The same binding as `nu.Filter`: `key` is passed on only when given, so a lambda and an explicit name never meet.

**Examples**

```python
xs = nu.List.of(1, 2, 3).iter()
nu.run(xs.filter(lambda x: x > 1).to_list())[0]
```

```
[2, 3]
```

```python
The same with a tree reading an explicit name:
```

```python
nu.run(xs.filter(nu.Gt(nu.Attr("n"), 1), key="n").to_list())[0]
```

```
[2, 3]
```

### `.to_list()`

Self drained into a List, in order.

Builds `List[T]`.

**Yields**

The List of items pulled.

**Example**

```python
nu.run(nu.List.of(1, 2).iter().to_list())[0]
```

```
[1, 2]
```

### `.to_set()`

Self drained into a Set.

Builds `Set[T]`.

**Yields**

The Set of items pulled.

**Notes**

- Duplicate items collapse; order is not preserved.

**Example**

```python
nu.run(nu.List.of(1, 1, 2).iter().to_set())[0]
```

```
{1, 2}
```

### `.to_tuple()`

Self drained into a Tuple, in order.

Builds `Tuple`.

**Yields**

The Tuple of items pulled.

**Example**

```python
nu.run(nu.List.of(1, 2).iter().to_tuple())[0]
```

```
(1, 2)
```

**Inherited methods**

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

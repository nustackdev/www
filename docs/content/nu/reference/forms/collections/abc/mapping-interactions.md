---
title: mapping_interactions
description: "Mapping interactions."
---

Module `nu.forms.collections.abc.mapping_interactions`.

Mapping interactions.

Reads (Query): Keys, Values, Items, Get, ContainsKey,
    Copy, ReversedKeys, ReversedValues, ReversedItems, Merge
Mutate, yield nothing (Command): DeleteItem, Update (SetItem lives in nu.core.access)
Mutate and yield a value (Action): DictPop, PopItem, SetDefault,
    MergeUpdate

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ContainsKey](#containskey) | `scalar_query` | `ContainsKey()` | Test key membership: key in mapping. Yields a bool. |
| [DeleteItem](#deleteitem) | `scalar_command` | `DeleteItem()` | Delete entry by key: del mapping[key]. Mutates slot 0; returns nothing. |
| [DictPop](#dictpop) | `scalar_action` | `DictPop()` | Pop value by key with optional default: mapping.pop(key, default). |
| [Get](#get) | `scalar_query` | `Get()` | Get value from mapping with optional default: mapping.get_item(key, default) or mapping[key]. |
| [Items](#items) | `scalar_query` | `Items()` | Get items view from mapping: mapping.items(). |
| [Keys](#keys) | `scalar_query` | `Keys()` | Get keys view from mapping: mapping.keys(). |
| [Merge](#merge) | `scalar_query` | `Merge()` | Merge two mappings into a new one: mapping \| other. Yields a new dict. |
| [MergeUpdate](#mergeupdate) | `scalar_action` | `MergeUpdate()` | In-place merge: mapping \|= other. Mutates slot 0 and yields the mapping. |
| [PopItem](#popitem) | `scalar_action` | `PopItem()` | Pop arbitrary item: mapping.popitem(). |
| [ReversedItems](#reverseditems) | `scalar_query` | `ReversedItems()` | `(key, value)` pairs in reverse insertion order: reversed(mapping.items()). |
| [ReversedKeys](#reversedkeys) | `scalar_query` | `ReversedKeys()` | Reverse-order keys: reversed(mapping). Yields keys in reverse insertion order. |
| [ReversedValues](#reversedvalues) | `scalar_query` | `ReversedValues()` | Values in reverse insertion order: reversed(mapping.values()). |
| [SetDefault](#setdefault) | `scalar_action` | `SetDefault()` | Set default value if key missing: mapping.setdefault(key, default). |
| [Update](#update) | `scalar_command` | `Update()` | Update mapping with another: mapping.update(other). Mutates slot 0; returns nothing. |
| [Values](#values) | `scalar_query` | `Values()` | Get values view from mapping: mapping.values(). |

## ContainsKey

Test key membership: key in mapping. Yields a bool.

```python
ContainsKey()
```

Path `nu.forms.collections.abc.ContainsKey`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## DeleteItem

Delete entry by key: del mapping[key]. Mutates slot 0; returns nothing.

```python
DeleteItem()
```

Path `nu.forms.collections.abc.DeleteItem`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

## DictPop

Pop value by key with optional default: mapping.pop(key, default).

```python
DictPop()
```

Path `nu.forms.collections.abc.DictPop`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`.

Mutates slot 0 (removes the entry) and yields the value or default.

Undocumented: yields, example.

## Get

Get value from mapping with optional default: mapping.get_item(key, default) or mapping[key].

```python
Get()
```

Path `nu.forms.collections.abc.Get`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## Items

Get items view from mapping: mapping.items().

```python
Items()
```

Path `nu.forms.collections.abc.Items`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## Keys

Get keys view from mapping: mapping.keys().

```python
Keys()
```

Path `nu.forms.collections.abc.Keys`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## Merge

Merge two mappings into a new one: mapping | other. Yields a new dict.

```python
Merge()
```

Path `nu.forms.collections.abc.Merge`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## MergeUpdate

In-place merge: mapping |= other. Mutates slot 0 and yields the mapping.

```python
MergeUpdate()
```

Path `nu.forms.collections.abc.MergeUpdate`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`.

Python's `dict.__ior__` updates in place and returns `self`, so it both
mutates and yields -> Action.

Undocumented: yields, example.

## PopItem

Pop arbitrary item: mapping.popitem().

```python
PopItem()
```

Path `nu.forms.collections.abc.PopItem`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`.

Mutates slot 0 (removes the entry) and yields the (key, value) tuple.

Undocumented: yields, example.

## ReversedItems

`(key, value)` pairs in reverse insertion order: reversed(mapping.items()).

```python
ReversedItems()
```

Path `nu.forms.collections.abc.ReversedItems`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Scalar-shaped like `Items`. Same fast-path/fallback contract as
`ReversedValues` -- backends may implement `items_reverse()`
for a single-pass scan; otherwise the runtime uses
`reversed(obj.items())` (native on `dict` 3.8+).

Undocumented: yields, example.

## ReversedKeys

Reverse-order keys: reversed(mapping). Yields keys in reverse insertion order.

```python
ReversedKeys()
```

Path `nu.forms.collections.abc.ReversedKeys`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Scalar-shaped like `Keys` -- the thunk returns one iterator
handle (Python's `reversed(obj)` object). Downstream `Iter`
opens that handle into a stream lazily, so ``islice(m.reversed_keys(),
n)` reads only `n`` items regardless of stream size.

Undocumented: yields, example.

## ReversedValues

Values in reverse insertion order: reversed(mapping.values()).

```python
ReversedValues()
```

Path `nu.forms.collections.abc.ReversedValues`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Scalar-shaped like `Values` -- the thunk returns one iterator
handle. Downstream `Iter` opens the handle into a stream lazily,
so `islice(m.reversed_values(), n)` reads only `n` values regardless
of stream size.

Backend contract: prefers an explicit `values_reverse()` method on
the runtime mapping (fast path, one pass); falls back to
`reversed(obj.values())` when the mapping doesn't provide one --
that native path works for Python `dict` (3.8+) and any view whose
`.values()` returns a reversible sequence.

Undocumented: yields, example.

## SetDefault

Set default value if key missing: mapping.setdefault(key, default).

```python
SetDefault()
```

Path `nu.forms.collections.abc.SetDefault`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`.

Mutates slot 0 (inserts the entry when the key is missing) and yields the
value at the key.

Undocumented: yields, example.

## Update

Update mapping with another: mapping.update(other). Mutates slot 0; returns nothing.

```python
Update()
```

Path `nu.forms.collections.abc.Update`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

## Values

Get values view from mapping: mapping.values().

```python
Values()
```

Path `nu.forms.collections.abc.Values`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

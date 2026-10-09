---
title: collections.dict_
description: "Dict - dict interface."
---

Module `nu.forms.collections.dict_`.

Dict - dict interface.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Dict](#dict) | `scalar_query` | `Dict()` | Dict interface. Mutable mapping + comparable. |

## Dict

Dict interface. Mutable mapping + comparable.

```python
Dict()
```

Path `nu.forms.Dict`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Notes**

- Keys preserve insertion order, matching Python's `dict`.
- Ordering comparisons (`>`, `<`, `>=`, `<=`) raise `TypeError` at evaluation time rather than yielding INVALID - Python dicts don't support them either. Use `==`/`!=` for content comparison.
- `is_` tests object identity. Each evaluation of a `Dict.of`/ `Dict.create` expression builds a fresh dict, so comparing two separately-built dicts with `is_` is False even when their contents match, unlike Python's small-string interning for Str.

**Example**

```python
nu.run(nu.Dict.of(a=1, b=2))[0]
```

```
{'a': 1, 'b': 2}
```

**Methods**

### `Dict.create()`

Fresh empty dict.

Builds `Dict[K, V]`.

**Yields**

A new, empty dict. Never a sentinel.

**Example**

```python
nu.run(nu.Dict.create())[0]
```

```
{}
```

### `Dict.of(fields)`

Dict built from named field expressions.

Builds `Dict[str, V]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `fields` |  |  | keyword arguments, each evaluated in the current context and zipped back in by name: `a=x, b=y` builds `{"a": <x>, "b": <y>}`. Values may be Nu expressions or plain literals. |

**Yields**

The assembled dict. INVALID when any field is a sentinel.

**Notes**

- A field that resolves to a sentinel collapses the whole result to INVALID.

**Example**

```python
nu.run(nu.Dict.of(a=1, b=2))[0]
```

```
{'a': 1, 'b': 2}
```

### `a[key]`

Value at key.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` |  |  | the key to look up. |

**Yields**

The value, narrowed to a concrete Form (Bool, Int, Float, Str,
Bytes) when `V` is a known primitive type, Any otherwise.
INVALID when self is a sentinel.

**Notes**

- A missing key raises `KeyError` at evaluation time, matching Python's `dict[key]`. Use `get_item` for a default instead.

**Example**

```python
nu.run(nu.Dict.of(a=1, b=2)["a"])[0]
```

```
1
```

### `.keys()`

Self's keys as a live view.

Builds `DictKeys[K]`.

**Yields**

The keys, wrapped as DictKeys. INVALID when self is a sentinel.

**Notes**

- Insertion order, matching Python's `dict.keys()`.

**Example**

```python
list(nu.run(nu.Dict.of(a=1, b=2).keys())[0])
```

```
['a', 'b']
```

### `.values()`

Self's values as a live view.

Builds `DictValues[V]`.

**Yields**

The values, wrapped as DictValues. INVALID when self is a
sentinel.

**Notes**

- Insertion order, matching Python's `dict.values()`.

**Example**

```python
list(nu.run(nu.Dict.of(a=1, b=2).values())[0])
```

```
[1, 2]
```

### `.items()`

Self's key-value pairs as a live view.

Builds `DictItems[K, V]`.

**Yields**

The (key, value) pairs, wrapped as DictItems. INVALID when self
is a sentinel.

**Notes**

- Insertion order, matching Python's `dict.items()`.

**Example**

```python
list(nu.run(nu.Dict.of(a=1, b=2).items())[0])
```

```
[('a', 1), ('b', 2)]
```

### `a > b`

Self strictly greater than other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DictArg[K, V]` |  | the dict to compare against. |

**Yields**

Never yields; the comparison always raises.

**Notes**

- Python dicts don't support ordering, so this raises `TypeError` at evaluation time rather than yielding INVALID. Compare with `==`/`!=` instead.

**Example**

```python
nu.run(nu.Dict.of(a=1) > nu.Dict.of(a=2))[0]
```

```
Traceback (most recent call last):
TypeError: '>' not supported between instances of 'dict' and 'dict'
```

### `a < b`

Self strictly less than other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DictArg[K, V]` |  | the dict to compare against. |

**Yields**

Never yields; the comparison always raises.

**Notes**

- Python dicts don't support ordering, so this raises `TypeError` at evaluation time rather than yielding INVALID. Compare with `==`/`!=` instead.

**Example**

```python
nu.run(nu.Dict.of(a=1) < nu.Dict.of(a=2))[0]
```

```
Traceback (most recent call last):
TypeError: '<' not supported between instances of 'dict' and 'dict'
```

### `a >= b`

Self greater than or equal to other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DictArg[K, V]` |  | the dict to compare against. |

**Yields**

Never yields; the comparison always raises.

**Notes**

- Python dicts don't support ordering, so this raises `TypeError` at evaluation time rather than yielding INVALID. Compare with `==`/`!=` instead.

**Example**

```python
nu.run(nu.Dict.of(a=1) >= nu.Dict.of(a=2))[0]
```

```
Traceback (most recent call last):
TypeError: '>=' not supported between instances of 'dict' and 'dict'
```

### `a <= b`

Self less than or equal to other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DictArg[K, V]` |  | the dict to compare against. |

**Yields**

Never yields; the comparison always raises.

**Notes**

- Python dicts don't support ordering, so this raises `TypeError` at evaluation time rather than yielding INVALID. Compare with `==`/`!=` instead.

**Example**

```python
nu.run(nu.Dict.of(a=1) <= nu.Dict.of(a=2))[0]
```

```
Traceback (most recent call last):
TypeError: '<=' not supported between instances of 'dict' and 'dict'
```

### `a == b`

Self equal to other by value.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DictArg[K, V]` |  | the dict to compare against. |

**Yields**

True when the dicts have the same keys and values, False
otherwise. INVALID when either operand is not a Dict or is a
sentinel.

**Notes**

- Value equality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.Dict.of(a=1) == nu.Dict.of(a=1))[0]
```

```
True
```

### `a != b`

Self not equal to other by value.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DictArg[K, V]` |  | the dict to compare against. |

**Yields**

True when the dicts differ, False otherwise. INVALID when
either operand is not a Dict or is a sentinel.

**Notes**

- Value inequality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.Dict.of(a=1) != nu.Dict.of(a=2))[0]
```

```
True
```

### `.is_(other)`

Identity comparison: self is other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `DictArg[K, V]` |  | the value to compare identity against. |

**Yields**

True when self and other evaluate to the same Python object,
False otherwise.

**Notes**

- Object identity, not value equality. For content comparison use `==` instead.
- Each `Dict.of`/`Dict.create` expression builds a fresh dict on evaluation, so two separately-built dicts test not identical even with equal contents - there's no interning like Str gets for short literals.

**Example**

```python
nu.run(nu.Dict.of(a=1).is_(nu.Dict.of(a=1)))[0]
```

```
False
```

**Inherited methods**

From `nu.forms.collections.abc.mapping.MutableMappingForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set_item(key, value)` | `Any` | Set the value at key, inserting the key if it's missing: mapping[key] = value. |
| `.del_item(key)` | `Any` | Delete the entry at key: del mapping[key]. |
| `.update(other)` | `Any` | Write other's entries into self, in place: mapping.update(other). |
| `.pop(key, default=None)` | `ValueResultT` | Remove key and yield its value, or default if key is missing. |
| `.popitem()` | `ValueResultT` | Remove and yield an arbitrary (key, value) pair: mapping.popitem(). |
| `.setdefault(key, default=None)` | `ValueResultT` | Value at key, inserting default there first if key is missing. |
| `.merge_update(other)` | `CollectionResultT` | Merge other into self in place, and yield self: mapping \|= other. |
| `.clear()` | `Any` | Remove all entries: mapping.clear(). |

From `nu.forms.collections.abc.mapping.MappingForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.get_item(key, default=None)` | `ValueResultT` | Value at key, falling back to default: mapping.get_item(key, default). |
| `.copy()` | `CollectionResultT` | Shallow copy of self: mapping.copy(). |
| `.reversed_keys()` | `CollectionResultT` | Keys in reverse insertion order: reversed(mapping). |
| `.reversed_values()` | `CollectionResultT` | Values in reverse insertion order: reversed(mapping.values()). |
| `.reversed_items()` | `CollectionResultT` | (key, value) pairs in reverse insertion order: reversed(mapping.items()). |
| `.merge(other)` | `CollectionResultT` | Self and other merged into a new mapping: mapping \| other. |

From `nu.forms.collections.abc.collection.CollectionForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.extract()` | `object` | Materialise the full subtree rooted at self. |

From `nu.forms.collections.abc.sized.SizedForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.len()` | `Int` | Length of self. |

From `nu.forms.collections.abc.iterable.IterableForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `iter(a)` | `Iterator[ElementT]` | Open self into a lazy iterator stream (Python's `iter`). |

From `nu.forms.collections.abc.container.ContainerForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.contains(item)` | `Bool` | Whether item is a member of self. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

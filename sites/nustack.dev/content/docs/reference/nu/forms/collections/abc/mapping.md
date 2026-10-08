---
title: mapping
description: "Mapping collection: bases + mutations."
---

Module `nu.forms.collections.abc.mapping`.

Mapping collection: bases + mutations.

MappingForm = Collection + keys/values/items/get_item
MutableMappingForm = Mapping + set_item/del_item/update/pop/popitem/setdefault/clear

Follows Python's collections.abc.Mapping / MutableMapping pattern.

| Name | Call | Meaning |
| --- | --- | --- |
| [MappingForm](#mappingform) | `MappingForm()` | Base for mapping values: key lookup plus key/value/item views. |
| [MutableMappingForm](#mutablemappingform) | `MutableMappingForm()` | Base for mutable mapping values: adds in-place writes over MappingForm. |
| [ReactiveMappingForm](#reactivemappingform) | `ReactiveMappingForm()` | Reactive mapping: adds any-change observation over MutableMappingForm. |

## MappingForm

Base for mapping values: key lookup plus key/value/item views.

```python
MappingForm()
```

Path `nu.forms.collections.abc.MappingForm`.

**Notes**

- The five `_wrap_*` methods are the override seam: `_wrap_value_result` covers subscript and `get_item`; the other four cover collection-shaped results (`keys`, `values`, `items`, `copy`, `merge`). A concrete mapping Form overrides all five to pick its own result types.

**Methods**

### `a[key]`

Value at key: mapping[key].

Builds `ValueResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `Arg[KeyT]` |  | the key to look up. |

**Yields**

The value at key. INVALID when self or key is a sentinel.

**Notes**

- Raises at evaluation time when key is missing, matching Python's `dict[key]`. Use `get_item` for a default instead of a raise.

**Example**

```python
nu.run(nu.Dict({"a": 1})["a"])[0]
```

```
1
```

### `.keys()`

All keys of the mapping: mapping.keys().

Builds `CollectionResultT`.

**Yields**

A view over the keys, in insertion order. INVALID when self is
a sentinel.

**Example**

```python
nu.run(nu.Dict({"a": 1, "b": 2}).keys())[0]
```

```
dict_keys(['a', 'b'])
```

### `.values()`

All values of the mapping: mapping.values().

Builds `CollectionResultT`.

**Yields**

A view over the values, in insertion order. INVALID when self
is a sentinel.

**Example**

```python
nu.run(nu.Dict({"a": 1, "b": 2}).values())[0]
```

```
dict_values([1, 2])
```

### `.items()`

All (key, value) pairs of the mapping: mapping.items().

Builds `CollectionResultT`.

**Yields**

A view over the (key, value) pairs, in insertion order. INVALID
when self is a sentinel.

**Example**

```python
nu.run(nu.Dict({"a": 1, "b": 2}).items())[0]
```

```
dict_items([('a', 1), ('b', 2)])
```

### `.get_item(key, default=None)`

Value at key, falling back to default: mapping.get_item(key, default).

Builds `ValueResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `Arg[KeyT]` |  | the key to look up. |
| `default` | `Arg[ValueT] \| None` | `None` | the value to yield when key is missing. |

**Yields**

The value at key, or default when key is missing and default
is given. INVALID when self or key is a sentinel.

**Notes**

- Omitting default does not make a missing key safe: with no default this behaves like `mapping[key]` and raises at evaluation time on a missing key. Pass a default to get Python `dict.get`-style fallback behaviour instead.

**Examples**

```python
nu.run(nu.Dict({"a": 1}).get_item("a"))[0]
```

```
1
```

```python
nu.run(nu.Dict({"a": 1}).get_item("b", 0))[0]
```

```
0
```

### `.copy()`

Shallow copy of self: mapping.copy().

Builds `CollectionResultT`.

**Yields**

A new mapping with the same key/value pairs. INVALID when self
is a sentinel.

**Example**

```python
nu.run(nu.Dict({"a": 1}).copy())[0]
```

```
{'a': 1}
```

### `.reversed_keys()`

Keys in reverse insertion order: reversed(mapping).

Builds `CollectionResultT`.

**Yields**

An iterator over the keys, reversed. INVALID when self is a
sentinel.

**Example**

```python
list(nu.run(nu.Dict({"a": 1, "b": 2}).reversed_keys())[0])
```

```
['b', 'a']
```

### `.reversed_values()`

Values in reverse insertion order: reversed(mapping.values()).

Builds `CollectionResultT`.

**Yields**

An iterator over the values, reversed. INVALID when self is a
sentinel.

**Example**

```python
list(nu.run(nu.Dict({"a": 1, "b": 2}).reversed_values())[0])
```

```
[2, 1]
```

### `.reversed_items()`

(key, value) pairs in reverse insertion order: reversed(mapping.items()).

Builds `CollectionResultT`.

**Yields**

An iterator over the (key, value) pairs, reversed. INVALID
when self is a sentinel.

**Example**

```python
list(nu.run(nu.Dict({"a": 1, "b": 2}).reversed_items())[0])
```

```
[('b', 2), ('a', 1)]
```

### `.merge(other)`

Self and other merged into a new mapping: mapping | other.

Builds `CollectionResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[Mapping[KeyT, ValueT]]` |  | the mapping to merge in. Its keys win over self's on overlap. |

**Yields**

A new mapping holding self's entries overridden by other's.
INVALID when self or other is a sentinel.

**Example**

```python
nu.run(nu.Dict({"a": 1}).merge({"b": 2}))[0]
```

```
{'a': 1, 'b': 2}
```

**Inherited methods**

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

From `builtins.object`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a < b` |  | Return self<value. |
| `a <= b` |  | Return self<=value. |
| `a == b` |  | Return self==value. |
| `a != b` |  | Return self!=value. |
| `a > b` |  | Return self>value. |
| `a >= b` |  | Return self>=value. |

Undocumented: example.

## MutableMappingForm

Base for mutable mapping values: adds in-place writes over MappingForm.

```python
MutableMappingForm()
```

Path `nu.forms.collections.abc.MutableMappingForm`.

**Notes**

- `set_item`, `del_item`, `update`, and `clear` are Commands: they mutate slot 0 and yield nothing. Running them needs a Ref in slot 0, not a plain literal mapping.
- `pop`, `popitem`, `setdefault`, and `merge_update` are Actions: they mutate and yield a value.

**Methods**

### `.set_item(key, value)`

Set the value at key, inserting the key if it's missing: mapping[key] = value.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `Arg[KeyT]` |  | the key to set. |
| `value` | `Arg[ValueT]` |  | the value to store at key. |

**Notes**

- Mutating Command: mutates slot 0 in place, yields nothing. Needs a Ref in slot 0 to run; a plain literal mapping fails evaluation.

**Example**

```python
d.set_item("b", 2)
```

### `.del_item(key)`

Delete the entry at key: del mapping[key].

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `Arg[KeyT]` |  | the key to delete. |

**Notes**

- Mutating Command: mutates slot 0 in place, yields nothing. Needs a Ref in slot 0 to run; a plain literal mapping fails evaluation.

**Example**

```python
d.del_item("a")
```

### `.update(other)`

Write other's entries into self, in place: mapping.update(other).

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[Mapping[KeyT, ValueT]]` |  | the mapping whose entries to write in. Its values win over self's on shared keys. |

**Notes**

- Mutating Command: mutates slot 0 in place, yields nothing. Needs a Ref in slot 0 to run; a plain literal mapping fails evaluation.

**Example**

```python
d.update({"b": 2})
```

### `.pop(key, default=None)`

Remove key and yield its value, or default if key is missing.

Builds `ValueResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `Arg[KeyT]` |  | the key to remove. |
| `default` | `Arg[ValueT] \| None` | `None` | the value to yield when key is missing. |

**Yields**

The removed value, or default when key is missing. INVALID
when key is missing and no default is given, or when self or
key is a sentinel.

**Notes**

- Mutates slot 0 (removes the entry) and yields a value: an Action, not a Command.
- Without a default, a missing key yields INVALID rather than raising - unlike `__getitem__`/`get_item` with no default, which raise.

**Examples**

```python
nu.run(nu.Dict({"a": 1}).pop("a"))[0]
```

```
1
```

```python
nu.run(nu.Dict({"a": 1}).pop("b", 0))[0]
```

```
0
```

### `.popitem()`

Remove and yield an arbitrary (key, value) pair: mapping.popitem().

Builds `ValueResultT`.

**Yields**

The removed (key, value) pair. INVALID when self is empty or a
sentinel.

**Notes**

- Mutates slot 0 (removes the entry) and yields a value: an Action, not a Command.
- Removes in LIFO order, matching Python's `dict.popitem`.

**Example**

```python
nu.run(nu.Dict({"a": 1, "b": 2}).popitem())[0]
```

```
('b', 2)
```

### `.setdefault(key, default=None)`

Value at key, inserting default there first if key is missing.

Builds `ValueResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `Arg[KeyT]` |  | the key to look up, and to insert default at if missing. |
| `default` | `Arg[ValueT] \| None` | `None` | the value to insert and yield when key is missing. |

**Yields**

The value already at key, or default once inserted. INVALID
when self or key is a sentinel.

**Notes**

- Mutates slot 0 (inserts the entry when key is missing) and yields a value: an Action, not a Command.
- Self is unchanged when key is already present; default is only inserted on a miss.

**Examples**

```python
nu.run(nu.Dict({"a": 1}).setdefault("a", 9))[0]
```

```
1
```

```python
nu.run(nu.Dict({"a": 1}).setdefault("b", 9))[0]
```

```
9
```

### `.merge_update(other)`

Merge other into self in place, and yield self: mapping |= other.

Builds `CollectionResultT`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `Arg[Mapping[KeyT, ValueT]]` |  | the mapping to merge in. Its values win over self's on shared keys. |

**Yields**

Self, updated with other's entries. INVALID when self or
other is a sentinel.

**Notes**

- Mutates slot 0 in place and yields the mutated mapping: an Action, not a Command, mirroring Python's `dict.__ior__`.

**Example**

```python
nu.run(nu.Dict({"a": 1}).merge_update({"b": 2}))[0]
```

```
{'a': 1, 'b': 2}
```

### `.clear()`

Remove all entries: mapping.clear().

Builds `Any`.

**Notes**

- Mutating Command: mutates slot 0 in place, yields nothing. Needs a Ref in slot 0 to run; a plain literal mapping fails evaluation.

**Example**

```python
d.clear()
```

**Inherited methods**

From `nu.forms.collections.abc.mapping.MappingForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `ValueResultT` | Value at key: mapping[key]. |
| `.keys()` | `CollectionResultT` | All keys of the mapping: mapping.keys(). |
| `.values()` | `CollectionResultT` | All values of the mapping: mapping.values(). |
| `.items()` | `CollectionResultT` | All (key, value) pairs of the mapping: mapping.items(). |
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

From `builtins.object`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a < b` |  | Return self<value. |
| `a <= b` |  | Return self<=value. |
| `a == b` |  | Return self==value. |
| `a != b` |  | Return self!=value. |
| `a > b` |  | Return self>value. |
| `a >= b` |  | Return self>=value. |

Undocumented: example.

## ReactiveMappingForm

Reactive mapping: adds any-change observation over MutableMappingForm.

```python
ReactiveMappingForm()
```

Path `nu.forms.collections.abc.ReactiveMappingForm`.

**Notes**

- The three tree-aware observers (`on_child_change`, `on_children_change`, `on_descendants_change`) are shape-domain and live on `nu.domains.shape.forms.collection.ReactiveCollectionForm`, not here.

**Methods**

### `.on_change()`

Subscribe to any change on this mapping slot.

Builds `object`.

**Yields**

A subscription/stream over change events. Needs a live
reactive fabric to run.

**Notes**

- Fires on any mutation to this slot - set_item, del_item, update, pop, popitem, setdefault, merge_update, clear - without distinguishing which one.

**Example**

```python
d.on_change()
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
| `a[key]` | `ValueResultT` | Value at key: mapping[key]. |
| `.keys()` | `CollectionResultT` | All keys of the mapping: mapping.keys(). |
| `.values()` | `CollectionResultT` | All values of the mapping: mapping.values(). |
| `.items()` | `CollectionResultT` | All (key, value) pairs of the mapping: mapping.items(). |
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

From `builtins.object`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a < b` |  | Return self<value. |
| `a <= b` |  | Return self<=value. |
| `a == b` |  | Return self==value. |
| `a != b` |  | Return self!=value. |
| `a > b` |  | Return self>value. |
| `a >= b` |  | Return self>=value. |

Undocumented: example.

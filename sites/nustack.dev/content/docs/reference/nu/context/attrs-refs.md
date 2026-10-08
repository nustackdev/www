---
title: attrs.refs
description: "`AttrRef` and its typed variants."
---

Module `nu.context.attrs.refs`.

`AttrRef` and its typed variants.

An `AttrRef` names a slot in `ctx.attrs` by its resolved address (any child
that yields a value). Reads self-yield the value at that key (EMPTY when
unbound); writes and erases go through the Ref so a Command never touches
`ctx.attrs` directly - the write mechanism lives with the fabric.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AnyAttrRef](#anyattrref) | `ref` | `AnyAttrRef()` | An AttrRef with the dynamic any interface. |
| [AttrRef](#attrref) | `ref` | `AttrRef(address)` | A Ref into the `ctx.attrs` store, keyed by its resolved address. |
| [BoolAttrRef](#boolattrref) | `ref` | `BoolAttrRef()` | An AttrRef with the full boolean interface. |
| [BytesAttrRef](#bytesattrref) | `ref` | `BytesAttrRef()` | An AttrRef with the full bytes interface. |
| [DictAttrRef](#dictattrref) | `ref` | `DictAttrRef()` | An AttrRef with the full dict interface. |
| [FloatAttrRef](#floatattrref) | `ref` | `FloatAttrRef()` | An AttrRef with the full float interface. |
| [FrozenSetAttrRef](#frozensetattrref) | `ref` | `FrozenSetAttrRef()` | An AttrRef with the full frozenset interface. |
| [IntAttrRef](#intattrref) | `ref` | `IntAttrRef()` | An AttrRef with the full integer interface. |
| [ListAttrRef](#listattrref) | `ref` | `ListAttrRef()` | An AttrRef with the full list interface. |
| [NoneAttrRef](#noneattrref) | `ref` | `NoneAttrRef(source=None)` | An AttrRef with the none interface. |
| [SetAttrRef](#setattrref) | `ref` | `SetAttrRef()` | An AttrRef with the full set interface. |
| [StrAttrRef](#strattrref) | `ref` | `StrAttrRef()` | An AttrRef with the full string interface. |
| [TupleAttrRef](#tupleattrref) | `ref` | `TupleAttrRef()` | An AttrRef with the full tuple interface. |

## AnyAttrRef

An AttrRef with the dynamic any interface.

```python
AnyAttrRef()
```

Path `nu.context.AnyAttrRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Inherited methods**

From `nu.context.attrs.refs.AttrRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `AttrExists` | A Query yielding whether this Ref's address is bound in `ctx.attrs`. |

From `nu.forms.primitives.any_.Any`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a + b` | `Any` | Sum of self and other. |
| `a - b` | `Any` | Self minus other. |
| `a * b` | `Any` | Product of self and other. |
| `a @ b` | `Any` | Matrix multiplication: self @ other. |
| `a / b` | `Any` | Self divided by other. |
| `a // b` | `Any` | Self floor-divided by other. |
| `a % b` | `Any` | Self modulo other. |
| `a ** b` | `Any` | Self raised to the other power. |
| `-a` | `Any` | Negation of self. |
| `+a` | `Any` | Self unchanged. |
| `abs(a)` | `Any` | Absolute value of self. |
| `a > b` | `Bool` | Self strictly greater than other. |
| `a < b` | `Bool` | Self strictly less than other. |
| `a >= b` | `Bool` | Self greater than or equal to other. |
| `a <= b` | `Bool` | Self less than or equal to other. |
| `a == b` | `Bool` | Self equal to other by value. |
| `a != b` | `Bool` | Self not equal to other by value. |
| `.is_(other)` | `Bool` | Identity comparison: self is other. |
| `.and_(other)` | `Bool` | Logical AND of self and other. |
| `.or_(other)` | `Bool` | Logical OR of self and other. |
| `.not_()` | `Bool` | Logical NOT of self. |
| `.bool_()` | `Bool` | Cast self to Bool. |
| `.bitand(other)` | `Any` | Bitwise AND: self & other. |
| `.bitor(other)` | `Any` | Bitwise OR: self \| other. |
| `.bitnot()` | `Any` | Bitwise NOT: ~self. |
| `~a` | `Any` | Bitwise NOT: ~self. |
| `a ^ b` | `Any` | Bitwise XOR: self ^ other. |
| `a << b` | `Any` | Left shift: self shifted left by other bits. |
| `a >> b` | `Any` | Right shift: self shifted right by other bits. |
| `a[key]` | `Any` | Subscript access: self[key]. |
| `a[key] = value` | `object` | Subscript write: self[key] = value. |
| `.len_()` | `Int` | Length of self, as len(self). |
| `.contains(item)` | `Bool` | Membership test: item in self. |
| `.iter_()` | `Iterator` | Iterator over self, as iter(self). |
| `.has_attr(name)` | `Bool` | Attribute presence: hasattr(self, name). |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

Undocumented: example.

## AttrRef

A Ref into the `ctx.attrs` store, keyed by its resolved address.

```python
AttrRef(address)
```

Path `nu.context.AttrRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

The sole child is the address, evaluated through the runtime like any
other child, so a key can be fixed at write time or computed at run time.
Reading is the dual role: the Ref self-yields whatever sits at that key.
Writing and erasing never happen at the call site - a Command hands the
Ref its own node id, the Ref resolves its address and touches the store,
so the write mechanism stays with the fabric.

**Notes**

- An unbound slot and a slot holding EMPTY read the same, so reach for `.exists()` when the difference matters.
- `ctx.attrs` is the short-lived axis of the Context fabric: loop variables, counters, accumulators, markers. Anything longer-lived is a typed binding, read through `FabricRef`.
- `Map` and `Filter` bind their per-item loop variable into this same store, which is why a body reads the item with an `AttrRef`.
- The typed variants mix a Form in for its operator surface only. Nothing checks that the value at the key really has that type; an `IntAttrRef` over an unbound slot yields EMPTY, and arithmetic on it collapses to INVALID like any other sentinel operand.

**Examples**

```python
nu.run(nu.AttrRef("missing"))[0]
```

```
<EMPTY>
```

```python
nu.run(nu.SetCmd(nu.AttrRef("total"), 10))[1].attrs
```

```
Attributes(total=10)
```

```python
key = nu.SetCmd(nu.AttrRef("k"), "total")
nu.run(nu.Sequential(key, nu.SetCmd(nu.AttrRef(nu.AttrRef("k")), 5)))[1].attrs
```

```
Attributes(k='total', total=5)
```

**Methods**

### `.exists()`

A Query yielding whether this Ref's address is bound in `ctx.attrs`.

Builds `AttrExists`.

**Notes**

- The plain read cannot answer this: an unbound slot yields EMPTY and so does a slot bound to EMPTY.
- Only the address is resolved; the slot's value is never read.

Undocumented: example.

## BoolAttrRef

An AttrRef with the full boolean interface.

```python
BoolAttrRef()
```

Path `nu.context.BoolAttrRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Inherited methods**

From `nu.context.attrs.refs.AttrRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `AttrExists` | A Query yielding whether this Ref's address is bound in `ctx.attrs`. |

From `nu.forms.primitives.bool_.Bool`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.and_(other)` | `Bool` | Logical AND of self and other. |
| `.or_(other)` | `Bool` | Logical OR of self and other. |
| `.not_()` | `Bool` | Logical NOT of self. |
| `.bool_()` | `Bool` | Cast self to Bool. |
| `a > b` | `Bool` | Self strictly greater than other. |
| `a < b` | `Bool` | Self strictly less than other. |
| `a >= b` | `Bool` | Self greater than or equal to other. |
| `a <= b` | `Bool` | Self less than or equal to other. |
| `a == b` | `Bool` | Self equal to other by value. |
| `a != b` | `Bool` | Self not equal to other by value. |
| `.is_(other)` | `Bool` | Identity comparison: self is other. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

Undocumented: example.

## BytesAttrRef

An AttrRef with the full bytes interface.

```python
BytesAttrRef()
```

Path `nu.context.BytesAttrRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Inherited methods**

From `nu.context.attrs.refs.AttrRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `AttrExists` | A Query yielding whether this Ref's address is bound in `ctx.attrs`. |

From `nu.forms.primitives.bytes_.Bytes`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a + b` | `Bytes` | Concatenation of self and other. |
| `a[key]` | `Bytes \| Int` | Byte at an index, or a sub-range by slice. |
| `a > b` | `Bool` | Self strictly greater than other. |
| `a < b` | `Bool` | Self strictly less than other. |
| `a >= b` | `Bool` | Self greater than or equal to other. |
| `a <= b` | `Bool` | Self less than or equal to other. |
| `a == b` | `Bool` | Self equal to other by value. |
| `a != b` | `Bool` | Self not equal to other by value. |
| `.is_(other)` | `Bool` | Identity comparison: self is other. |
| `.and_(other)` | `Bool` | Logical AND of self and other. |
| `.or_(other)` | `Bool` | Logical OR of self and other. |
| `.not_()` | `Bool` | Logical NOT of self. |
| `.bool_()` | `Bool` | Cast self to Bool. |
| `.decode(encoding='utf-8')` | `Str` | Decode self to a string using the given encoding. |
| `.hex_()` | `Str` | Hex string of self, two digits per byte. |
| `.upper()` | `Bytes` | Self with ASCII letters uppercased. |
| `.lower()` | `Bytes` | Self with ASCII letters lowercased. |
| `.strip(chars=None)` | `Bytes` | Self with leading and trailing bytes removed. |
| `.lstrip(chars=None)` | `Bytes` | Self with leading bytes removed. |
| `.rstrip(chars=None)` | `Bytes` | Self with trailing bytes removed. |
| `.split_bytes(sep=None, maxsplit=-1)` | `List` | Self split into a List of Bytes on sep. |
| `.find_bytes(sub, start=0, end=None)` | `Int` | Lowest index of sub in self, or -1 if absent. |
| `.count_bytes(sub)` | `Int` | Number of non-overlapping occurrences of sub in self. |
| `.startswith(prefix)` | `Bool` | Self starts with prefix. |
| `.endswith(suffix)` | `Bool` | Self ends with suffix. |
| `.replace(old, new, count=-1)` | `Bytes` | Self with occurrences of old replaced by new. |
| `.removeprefix(prefix)` | `Bytes` | Self with prefix removed if present. |
| `.removesuffix(suffix)` | `Bytes` | Self with suffix removed if present. |
| `.translate(table, delete=b'')` | `Bytes` | Self translated through a 256-byte table, with bytes in delete dropped first. |
| `.title()` | `Bytes` | Self titlecased: each word's first cased byte upper, the rest lower. |
| `.capitalize()` | `Bytes` | Self with the first byte uppercased and the rest lowercased. |
| `.swapcase()` | `Bytes` | Self with uppercase and lowercase bytes swapped. |
| `.rsplit_bytes(sep=None, maxsplit=-1)` | `List` | Self split into a List of Bytes on sep, counting maxsplit from the right. |
| `.splitlines(keepends=False)` | `List` | Self split into a List of Bytes at line boundaries. |
| `.partition(sep)` | `Tuple` | Self split around the first occurrence of sep. |
| `.rpartition(sep)` | `Tuple` | Self split around the last occurrence of sep. |
| `.rfind_bytes(sub, start=0, end=None)` | `Int` | Highest index of sub in self, or -1 if absent. |
| `.index_bytes(sub, start=0, end=None)` | `Int` | Lowest index of sub in self. |
| `.rindex_bytes(sub, start=0, end=None)` | `Int` | Highest index of sub in self. |
| `.isascii()` | `Bool` | Self has only ASCII bytes. |
| `.isdigit()` | `Bool` | Self has only ASCII digit bytes, and at least one. |
| `.isalpha()` | `Bool` | Self has only ASCII letter bytes, and at least one. |
| `.isalnum()` | `Bool` | Self has only ASCII alphanumeric bytes, and at least one. |
| `.isspace()` | `Bool` | Self has only ASCII whitespace bytes, and at least one. |
| `.istitle()` | `Bool` | Self is titlecased, with at least one cased byte. |
| `.isupper()` | `Bool` | Self has all cased bytes uppercase, and at least one cased byte. |
| `.islower()` | `Bool` | Self has all cased bytes lowercase, and at least one cased byte. |
| `.center(width, fillbyte=b' ')` | `Bytes` | Self centered in a field of width, padded with fillbyte. |
| `.ljust(width, fillbyte=b' ')` | `Bytes` | Self left-justified in a field of width, padded with fillbyte. |
| `.rjust(width, fillbyte=b' ')` | `Bytes` | Self right-justified in a field of width, padded with fillbyte. |
| `.zfill(width)` | `Bytes` | Self padded with leading zero bytes to width. |
| `.expandtabs(tabsize=8)` | `Bytes` | Self with tab bytes expanded to spaces. |
| `.join(iterable)` | `Bytes` | Self used as separator between the elements of iterable. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

Undocumented: example.

## DictAttrRef

An AttrRef with the full dict interface.

```python
DictAttrRef()
```

Path `nu.context.DictAttrRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Inherited methods**

From `nu.context.attrs.refs.AttrRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `AttrExists` | A Query yielding whether this Ref's address is bound in `ctx.attrs`. |

From `nu.forms.collections.dict_.Dict`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `DictAttrRef.create()` | `Dict[K, V]` | Fresh empty dict. |
| `DictAttrRef.of(fields)` | `Dict[str, V]` | Dict built from named field expressions. |
| `a[key]` |  | Value at key. |
| `.keys()` | `DictKeys[K]` | Self's keys as a live view. |
| `.values()` | `DictValues[V]` | Self's values as a live view. |
| `.items()` | `DictItems[K, V]` | Self's key-value pairs as a live view. |
| `a > b` | `Bool` | Self strictly greater than other. |
| `a < b` | `Bool` | Self strictly less than other. |
| `a >= b` | `Bool` | Self greater than or equal to other. |
| `a <= b` | `Bool` | Self less than or equal to other. |
| `a == b` | `Bool` | Self equal to other by value. |
| `a != b` | `Bool` | Self not equal to other by value. |
| `.is_(other)` | `Bool` | Identity comparison: self is other. |

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

Undocumented: example.

## FloatAttrRef

An AttrRef with the full float interface.

```python
FloatAttrRef()
```

Path `nu.context.FloatAttrRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Inherited methods**

From `nu.context.attrs.refs.AttrRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `AttrExists` | A Query yielding whether this Ref's address is bound in `ctx.attrs`. |

From `nu.forms.primitives.float_.Float`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a + b` | `Float` | Sum of self and other. |
| `a - b` | `Float` | Self minus other. |
| `a * b` | `Float` | Product of self and other. |
| `a / b` | `Float` | Self divided by other. |
| `a // b` | `Float` | Self floor-divided by other. |
| `a % b` | `Float` | Self modulo other. |
| `a ** b` | `Float` | Self raised to the other power. |
| `-a` | `Float` | Negation of self. |
| `+a` | `Float` | Self unchanged. |
| `abs(a)` | `Float` | Absolute value of self. |
| `a > b` | `Bool` | Self strictly greater than other. |
| `a < b` | `Bool` | Self strictly less than other. |
| `a >= b` | `Bool` | Self greater than or equal to other. |
| `a <= b` | `Bool` | Self less than or equal to other. |
| `a == b` | `Bool` | Self equal to other by value. |
| `a != b` | `Bool` | Self not equal to other by value. |
| `.is_(other)` | `Bool` | Identity comparison: self is other. |
| `.and_(other)` | `Bool` | Logical AND of self and other. |
| `.or_(other)` | `Bool` | Logical OR of self and other. |
| `.not_()` | `Bool` | Logical NOT of self. |
| `.bool_()` | `Bool` | Cast self to Bool. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

Undocumented: example.

## FrozenSetAttrRef

An AttrRef with the full frozenset interface.

```python
FrozenSetAttrRef()
```

Path `nu.context.FrozenSetAttrRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Inherited methods**

From `nu.context.attrs.refs.AttrRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `AttrExists` | A Query yielding whether this Ref's address is bound in `ctx.attrs`. |

From `nu.forms.collections.set_.FrozenSet`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `FrozenSetAttrRef.create()` | `FrozenSet[T]` | Build an empty frozenset. |
| `FrozenSetAttrRef.of(*items)` | `FrozenSet` | Build a frozenset from positional item expressions. |
| `a > b` | `Bool` | Self is a proper superset of other. |
| `a < b` | `Bool` | Self is a proper subset of other. |
| `a >= b` | `Bool` | Self is a superset of other, or equal. |
| `a <= b` | `Bool` | Self is a subset of other, or equal. |
| `a == b` | `Bool` | Self equal to other by value. |
| `a != b` | `Bool` | Self not equal to other by value. |
| `.is_(other)` | `Bool` | Identity comparison: self is other. |

From `nu.forms.collections.abc.set_.SetLikeForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.union(other)` | `CollectionResultT` | Union of self and other. |
| `.intersection(other)` | `CollectionResultT` | Intersection of self and other. |
| `.difference(other)` | `CollectionResultT` | Elements of self that are not in other. |
| `.symmetric_difference(other)` | `CollectionResultT` | Elements in exactly one of self and other, not both. |
| `.issubset(other)` | `Bool` | Whether every element of self is in other. |
| `.issuperset(other)` | `Bool` | Whether every element of other is in self. |
| `.isdisjoint(other)` | `Bool` | Whether self and other share no elements. |
| `.copy()` | `CollectionResultT` | Shallow copy of self. |
| `a \| b` | `CollectionResultT` | Union: self \| other. |
| `a & b` | `CollectionResultT` | Intersection: self & other. |
| `a - b` | `CollectionResultT` | Difference: self - other. |
| `a ^ b` | `CollectionResultT` | Symmetric difference: self ^ other. |

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

Undocumented: example.

## IntAttrRef

An AttrRef with the full integer interface.

```python
IntAttrRef()
```

Path `nu.context.IntAttrRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Inherited methods**

From `nu.context.attrs.refs.AttrRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `AttrExists` | A Query yielding whether this Ref's address is bound in `ctx.attrs`. |

From `nu.forms.primitives.int_.Int`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a + b` | `Int \| Float` | Sum of self and other. |
| `a - b` | `Int \| Float` | Self minus other. |
| `a * b` | `Int \| Float` | Product of self and other. |
| `a / b` | `Float` | Self divided by other. |
| `a // b` | `Int \| Float` | Self floor-divided by other. |
| `a % b` | `Int \| Float` | Self modulo other. |
| `a ** b` | `Int \| Float` | Self raised to the other power. |
| `-a` | `Int` | Negation of self. |
| `+a` | `Int` | Self unchanged. |
| `abs(a)` | `Int` | Absolute value of self. |
| `a > b` | `Bool` | Self strictly greater than other. |
| `a < b` | `Bool` | Self strictly less than other. |
| `a >= b` | `Bool` | Self greater than or equal to other. |
| `a <= b` | `Bool` | Self less than or equal to other. |
| `a == b` | `Bool` | Self equal to other by value. |
| `a != b` | `Bool` | Self not equal to other by value. |
| `.is_(other)` | `Bool` | Identity comparison: self is other. |
| `.and_(other)` | `Bool` | Logical AND of self and other. |
| `.or_(other)` | `Bool` | Logical OR of self and other. |
| `.not_()` | `Bool` | Logical NOT of self. |
| `.bool_()` | `Bool` | Cast self to Bool. |
| `.bitand(other)` | `Int` | Bitwise AND: self & other. |
| `.bitor(other)` | `Int` | Bitwise OR: self \| other. |
| `a ^ b` | `Int` | Bitwise XOR: self ^ other. |
| `.bitnot()` | `Int` | Bitwise NOT: ~self. |
| `a << b` | `Int` | Left shift: self shifted left by other bits. |
| `a >> b` | `Int` | Right shift: self shifted right by other bits. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

Undocumented: example.

## ListAttrRef

An AttrRef with the full list interface.

```python
ListAttrRef()
```

Path `nu.context.ListAttrRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Inherited methods**

From `nu.context.attrs.refs.AttrRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `AttrExists` | A Query yielding whether this Ref's address is bound in `ctx.attrs`. |

From `nu.forms.collections.list_.List`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `ListAttrRef.create()` | `List[T]` | Yield a fresh empty list. |
| `ListAttrRef.of(items)` | `List` | Yield a list from positional item expressions. |
| `a[key]` |  | Element at an int index, or subsequence for a slice. |
| `a + b` | `List[T]` | Concatenation of self and other. |
| `a * b` | `List[T]` | Self repeated n times. |
| `a[key] = value` | `Any` | Subscript write: self[index] = value. |
| `a > b` | `Bool` | Self strictly greater than other, element-by-element. |
| `a < b` | `Bool` | Self strictly less than other, element-by-element. |
| `a >= b` | `Bool` | Self greater than or equal to other, element-by-element. |
| `a <= b` | `Bool` | Self less than or equal to other, element-by-element. |
| `a == b` | `Bool` | Self equal to other by value. |
| `a != b` | `Bool` | Self not equal to other by value. |
| `.is_(other)` | `Bool` | Identity comparison: self is other. |

From `nu.forms.collections.abc.sequence.MutableSequenceForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.append(value)` | `Any` | Append value to the end of self. |
| `.extend(other)` | `Any` | Extend self with the elements of other, in order. |
| `.insert(index, value)` | `Any` | Insert value at index, shifting later elements right. |
| `.pop(index=-1)` | `ElementResultT` | Remove and return the element at index. |
| `.del_at(index)` | `Any` | Remove the element at index. |
| `.remove(value)` | `Any` | Remove the first occurrence of value. |
| `.reverse()` | `Any` | Reverse self in place. |
| `.sort()` | `Any` | Sort self in place, ascending, using the elements' natural order. |
| `.copy()` | `CollectionResultT` | Shallow copy of self: a new sequence with the same elements. |
| `.clear()` | `Any` | Remove every element from self. |

From `nu.forms.collections.abc.sequence.SequenceForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.first_elem()` | `ElementResultT` | First element of self. |
| `.last_elem()` | `ElementResultT` | Last element of self. |
| `.index(value)` | `Int` | Lowest index in self where value is found, searching from the left. |
| `.count(value)` | `Int` | Count of occurrences of value in self. |
| `.reversed()` | `CollectionResultT` | Self walked back to front, as a stream. |

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

From `nu.forms.collections.abc.sliceable.SliceableForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.slice(start, stop, step=None)` | `ResultT` | Slice of self from start to stop, stepping by step. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

Undocumented: example.

## NoneAttrRef

An AttrRef with the none interface.

```python
NoneAttrRef(source=None)
```

Path `nu.context.NoneAttrRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Inherited methods**

From `nu.context.attrs.refs.AttrRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `AttrExists` | A Query yielding whether this Ref's address is bound in `ctx.attrs`. |

From `nu.forms.primitives.none_.None_`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.and_(other)` | `Bool` | Logical AND of self and other. |
| `.or_(other)` | `Bool` | Logical OR of self and other. |
| `.not_()` | `Bool` | Logical NOT of self. |
| `.bool_()` | `Bool` | Cast self to Bool. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

Undocumented: example.

## SetAttrRef

An AttrRef with the full set interface.

```python
SetAttrRef()
```

Path `nu.context.SetAttrRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Inherited methods**

From `nu.context.attrs.refs.AttrRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `AttrExists` | A Query yielding whether this Ref's address is bound in `ctx.attrs`. |

From `nu.forms.collections.set_.Set`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `SetAttrRef.create()` | `Set[T]` | Build a fresh empty set. |
| `SetAttrRef.of(*items)` | `Set` | Build a set from positional item expressions. |
| `a > b` | `Bool` | Self is a proper superset of other. |
| `a < b` | `Bool` | Self is a proper subset of other. |
| `a >= b` | `Bool` | Self is a superset of other, or equal. |
| `a <= b` | `Bool` | Self is a subset of other, or equal. |
| `a == b` | `Bool` | Self equal to other by value. |
| `a != b` | `Bool` | Self not equal to other by value. |
| `.is_(other)` | `Bool` | Identity comparison: self is other. |

From `nu.forms.collections.abc.set_.MutableSetForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.add(value)` | `Any` | Add value to self. |
| `.remove(value)` | `Any` | Remove value from self. |
| `.discard(value)` | `Any` | Remove value from self if present. |
| `.pop()` | `ElementResultT` | Remove and return an arbitrary element from self. |
| `.clear()` | `Any` | Remove every element from self. |
| `.update(other)` | `Any` | Add every element of other to self. |
| `.intersection_update(other)` | `Any` | Keep only the elements of self also found in other. |
| `.difference_update(other)` | `Any` | Remove every element of other from self. |
| `.symmetric_difference_update(other)` | `Any` | Keep the elements in exactly one of self and other. |

From `nu.forms.collections.abc.set_.SetLikeForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.union(other)` | `CollectionResultT` | Union of self and other. |
| `.intersection(other)` | `CollectionResultT` | Intersection of self and other. |
| `.difference(other)` | `CollectionResultT` | Elements of self that are not in other. |
| `.symmetric_difference(other)` | `CollectionResultT` | Elements in exactly one of self and other, not both. |
| `.issubset(other)` | `Bool` | Whether every element of self is in other. |
| `.issuperset(other)` | `Bool` | Whether every element of other is in self. |
| `.isdisjoint(other)` | `Bool` | Whether self and other share no elements. |
| `.copy()` | `CollectionResultT` | Shallow copy of self. |
| `a \| b` | `CollectionResultT` | Union: self \| other. |
| `a & b` | `CollectionResultT` | Intersection: self & other. |
| `a - b` | `CollectionResultT` | Difference: self - other. |
| `a ^ b` | `CollectionResultT` | Symmetric difference: self ^ other. |

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

Undocumented: example.

## StrAttrRef

An AttrRef with the full string interface.

```python
StrAttrRef()
```

Path `nu.context.StrAttrRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Inherited methods**

From `nu.context.attrs.refs.AttrRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `AttrExists` | A Query yielding whether this Ref's address is bound in `ctx.attrs`. |

From `nu.forms.primitives.str_.Str`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a + b` | `Str` | Concatenation of self and other. |
| `a[key]` | `Str` | Character at an int index, or substring for a slice. |
| `a > b` | `Bool` | Self strictly greater than other, lexicographically. |
| `a < b` | `Bool` | Self strictly less than other, lexicographically. |
| `a >= b` | `Bool` | Self greater than or equal to other, lexicographically. |
| `a <= b` | `Bool` | Self less than or equal to other, lexicographically. |
| `a == b` | `Bool` | Self equal to other by value. |
| `a != b` | `Bool` | Self not equal to other by value. |
| `.is_(other)` | `Bool` | Identity comparison: self is other. |
| `.and_(other)` | `Bool` | Logical AND of self and other. |
| `.or_(other)` | `Bool` | Logical OR of self and other. |
| `.not_()` | `Bool` | Logical NOT of self. |
| `.bool_()` | `Bool` | Cast self to Bool. |
| `.upper()` | `Str` | Self converted to uppercase. |
| `.lower()` | `Str` | Self converted to lowercase. |
| `.title()` | `Str` | Self converted to title case. |
| `.capitalize()` | `Str` | Self with only the first character capitalized. |
| `.swapcase()` | `Str` | Self with uppercase and lowercase characters swapped. |
| `.casefold()` | `Str` | Self folded for aggressive, caseless matching. |
| `.strip(chars=None)` | `Str` | Self with leading and trailing characters removed. |
| `.lstrip(chars=None)` | `Str` | Self with leading characters removed. |
| `.rstrip(chars=None)` | `Str` | Self with trailing characters removed. |
| `.split(sep=None, maxsplit=-1)` | `List` | Self split into a list on sep, from the left. |
| `.rsplit(sep=None, maxsplit=-1)` | `List` | Self split into a list on sep, from the right. |
| `.splitlines(keepends=False)` | `List` | Self split into a list at line boundaries. |
| `.partition(sep)` | `Tuple` | Self split around the first occurrence of sep into a 3-tuple. |
| `.rpartition(sep)` | `Tuple` | Self split around the last occurrence of sep into a 3-tuple. |
| `.find(sub, start=0, end=None)` | `Int` | Lowest index in self where sub is found, searching from the left. |
| `.rfind(sub, start=0, end=None)` | `Int` | Highest index in self where sub is found, searching from the right. |
| `.index(sub, start=0, end=None)` | `Int` | Lowest index in self where sub is found, searching from the left. |
| `.rindex(sub, start=0, end=None)` | `Int` | Highest index in self where sub is found, searching from the right. |
| `.count_substring(sub)` | `Int` | Count of non-overlapping occurrences of sub in self. |
| `.startswith(prefix)` | `Bool` | Whether self starts with prefix. |
| `.endswith(suffix)` | `Bool` | Whether self ends with suffix. |
| `.isdigit()` | `Bool` | Whether every character in self is a digit. |
| `.isalpha()` | `Bool` | Whether every character in self is alphabetic. |
| `.isalnum()` | `Bool` | Whether every character in self is alphanumeric. |
| `.isspace()` | `Bool` | Whether every character in self is whitespace. |
| `.isnumeric()` | `Bool` | Whether every character in self is numeric. |
| `.isdecimal()` | `Bool` | Whether every character in self is a decimal character. |
| `.isidentifier()` | `Bool` | Whether self is a valid Python identifier. |
| `.isprintable()` | `Bool` | Whether every character in self is printable. |
| `.istitle()` | `Bool` | Whether self is titlecased. |
| `.isupper()` | `Bool` | Whether every cased character in self is uppercase. |
| `.islower()` | `Bool` | Whether every cased character in self is lowercase. |
| `.isascii()` | `Bool` | Whether every character in self is ASCII. |
| `.center(width, fillchar=' ')` | `Str` | Self centered in a field of the given width. |
| `.ljust(width, fillchar=' ')` | `Str` | Self left-justified in a field of the given width. |
| `.rjust(width, fillchar=' ')` | `Str` | Self right-justified in a field of the given width. |
| `.zfill(width)` | `Str` | Self padded with leading zeros to the given width. |
| `.expandtabs(tabsize=8)` | `Str` | Self with tab characters expanded to spaces. |
| `.replace(old, new, count=-1)` | `Str` | Self with occurrences of old replaced by new. |
| `.removeprefix(prefix)` | `Str` | Self with the given prefix removed if present. |
| `.removesuffix(suffix)` | `Str` | Self with the given suffix removed if present. |
| `.translate(table)` | `Str` | Self with characters mapped through a translation table. |
| `.format_map(mapping)` | `Str` | Self formatted with `{field}` placeholders filled from mapping. |
| `.encode(encoding='utf-8')` | `Bytes` | Self encoded to Bytes. |
| `.join(iterable)` | `Str` | Elements of iterable joined together with self as separator. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

Undocumented: example.

## TupleAttrRef

An AttrRef with the full tuple interface.

```python
TupleAttrRef()
```

Path `nu.context.TupleAttrRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Inherited methods**

From `nu.context.attrs.refs.AttrRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `AttrExists` | A Query yielding whether this Ref's address is bound in `ctx.attrs`. |

From `nu.forms.collections.tuple_.Tuple`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `TupleAttrRef.create()` | `Tuple[Unpack[Ts]]` | Empty tuple. |
| `TupleAttrRef.of(items)` | `Tuple` | Tuple built from positional item expressions. |
| `a + b` | `Tuple` | Concatenation of self and other. |
| `a * b` | `Tuple` | Self repeated n times. |
| `a > b` | `Bool` | Self strictly greater than other, lexicographically. |
| `a < b` | `Bool` | Self strictly less than other, lexicographically. |
| `a >= b` | `Bool` | Self greater than or equal to other, lexicographically. |
| `a <= b` | `Bool` | Self less than or equal to other, lexicographically. |
| `a == b` | `Bool` | Self equal to other by value. |
| `a != b` | `Bool` | Self not equal to other by value. |
| `.is_(other)` | `Bool` | Identity comparison: self is other. |

From `nu.forms.collections.abc.sequence.SequenceForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a[key]` | `ElementResultT \| CollectionResultT` | Element at an int index, or subsequence for a slice. |
| `.first_elem()` | `ElementResultT` | First element of self. |
| `.last_elem()` | `ElementResultT` | Last element of self. |
| `.index(value)` | `Int` | Lowest index in self where value is found, searching from the left. |
| `.count(value)` | `Int` | Count of occurrences of value in self. |
| `.reversed()` | `CollectionResultT` | Self walked back to front, as a stream. |

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

From `nu.forms.collections.abc.sliceable.SliceableForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.slice(start, stop, step=None)` | `ResultT` | Slice of self from start to stop, stepping by step. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

Undocumented: example.

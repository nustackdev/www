---
title: refs.items
description: "kv leaves: one value at one address, read and written whole."
---

Module `nustd.kv.refs.items`.

kv leaves: one value at one address, read and written whole.

`ItemRef` is the leaf itself (slot-level read, write, erase and observe over
a kv leaf) and declares a slot once for every leaf. Each value leaf mixes one
value form in beside it, so the ref is an operand of the value it names; the
form decides the surface, the leaf decides where the value lives.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [BoolRef](#boolref) | `ref` | `BoolRef(address, parent_ref=None, owner_shape=None)` | A bool leaf in KV storage, carrying the whole Bool logical surface. |
| [BytesRef](#bytesref) | `ref` | `BytesRef(address, parent_ref=None, owner_shape=None)` | A bytes leaf in KV storage, carrying the whole Bytes operator surface. |
| [FloatRef](#floatref) | `ref` | `FloatRef(address, parent_ref=None, owner_shape=None)` | A float leaf in KV storage, carrying the whole Float operator surface. |
| [IntRef](#intref) | `ref` | `IntRef(address, parent_ref=None, owner_shape=None)` | An int leaf in KV storage, carrying the whole Int operator surface. |
| [ObjectRef](#objectref) | `ref` | `ObjectRef(address, parent_ref=None, owner_shape=None)` | A leaf in KV storage holding a value of no declared type. |
| [StrRef](#strref) | `ref` | `StrRef(address, parent_ref=None, owner_shape=None)` | A str leaf in KV storage, carrying the whole Str operator surface. |

## BoolRef

A bool leaf in KV storage, carrying the whole Bool logical surface.

```python
BoolRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.BoolRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Stored as a plain bool, so nothing is translated on read or write.
- An absent leaf reads as EMPTY, which is not False; test with `exists` or `is_empty` when the difference matters.

**Example**

```python
class Flags(Shape):
    live = BoolRef.slot()
run(Flags.live.set(True), ctx)
run(Flags.live.not_(), ctx)
```

**Inherited methods**

From `nu.domains.shape.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

From `nu.domains.shape.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(value)` | `SetCmd` | Build a `SetCmd`. |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Bool` | Whether this slot holds a value, as a `Bool`. |
| `.missing()` | `Bool` | Whether this slot holds no value, as a `Bool`: the negation of `exists()`. |

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
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

## BytesRef

A bytes leaf in KV storage, carrying the whole Bytes operator surface.

```python
BytesRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.BytesRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Stored as plain bytes, so nothing is translated on read or write.
- The leaf a raw payload belongs in: no decoding happens on the way through, unlike the std refs that serialize a domain type.

**Example**

```python
class Blob(Shape):
    raw = BytesRef.slot()
run(Blob.raw.set(b"payload"), ctx)
run(Blob.raw.hex_(), ctx)
```

**Inherited methods**

From `nu.domains.shape.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

From `nu.domains.shape.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(value)` | `SetCmd` | Build a `SetCmd`. |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Bool` | Whether this slot holds a value, as a `Bool`. |
| `.missing()` | `Bool` | Whether this slot holds no value, as a `Bool`: the negation of `exists()`. |

From `nu.forms.primitives.bytes_.Bytes`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a + b` | `Bytes` | Concatenation of self and other. |
| `a[key]` | `Bytes \| Int` | Byte at an index, or a sub-range by slice. |
| `.len()` | `Int` | Length of self in bytes. |
| `.contains(item)` | `Bool` | Substring test: item in self. |
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
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

## FloatRef

A float leaf in KV storage, carrying the whole Float operator surface.

```python
FloatRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.FloatRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Stored as a plain float, so nothing is translated on read or write.
- Reach for DecimalRef instead when the value is money or anything else that must round-trip exactly.

**Example**

```python
class Order(Shape):
    price = FloatRef.slot()
run(Order.price.set(12.5), ctx)
```

**Inherited methods**

From `nu.domains.shape.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

From `nu.domains.shape.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(value)` | `SetCmd` | Build a `SetCmd`. |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Bool` | Whether this slot holds a value, as a `Bool`. |
| `.missing()` | `Bool` | Whether this slot holds no value, as a `Bool`: the negation of `exists()`. |

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
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

## IntRef

An int leaf in KV storage, carrying the whole Int operator surface.

```python
IntRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.IntRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Stored as a plain int, so the stored form and the value form are the same and nothing is translated on the way in or out.
- Arithmetic on the ref builds an expression over the stored value; writing the result back is what `set`, `inc` and `dec` do.

**Example**

```python
class Counter(Shape):
    hits = IntRef.slot()
run(Counter.hits.set(0), ctx)
run(Counter.hits.inc(), ctx)
```

**Methods**

### `.inc(step=1)`

Add `step` to the stored int and write the result back.

Builds `None_`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `step` | `IntArg` | `1` | how much to add. May be an expression, not just a literal. |

**Notes**

- Read-modify-write in one term, not a storage-level atomic increment; wrap it in a transaction when concurrent writers can touch the same leaf.
- An absent leaf reads as EMPTY, so the addition is EMPTY and the write refuses to store it. Set the slot before incrementing it.

**Example**

```python
run(Counter.hits.inc(), ctx)
```

### `.dec(step=1)`

Subtract `step` from the stored int and write the result back.

Builds `None_`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `step` | `IntArg` | `1` | how much to subtract. May be an expression. |

**Notes**

- Same read-modify-write shape as `inc`, and the same refusal to store a sentinel when the leaf is absent.

**Example**

```python
run(Counter.hits.dec(2), ctx)
```

**Inherited methods**

From `nu.domains.shape.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

From `nu.domains.shape.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(value)` | `SetCmd` | Build a `SetCmd`. |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Bool` | Whether this slot holds a value, as a `Bool`. |
| `.missing()` | `Bool` | Whether this slot holds no value, as a `Bool`: the negation of `exists()`. |

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
| `.bitand(other)` | `Int` | Bitwise AND of self and other. |
| `.bitor(other)` | `Int` | Bitwise OR of self and other. |
| `.bitxor(other)` | `Int` | Bitwise XOR of self and other. |
| `.bitnot()` | `Int` | Bitwise NOT of self. |
| `.lshift(other)` | `Int` | Self shifted left by other bits. |
| `.rshift(other)` | `Int` | Self shifted right by other bits. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

## ObjectRef

A leaf in KV storage holding a value of no declared type.

```python
ObjectRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.ObjectRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

What a container descends to when its value is `object`, undeclared, or
a type with no kv leaf of its own. It carries the whole `Object` surface,
so the ref is still an operand: `==` builds an `Eq`, attribute and
subscript access descend into the value read, and a cast narrows it.

**Notes**

- A dict or list stored here reads back as a plain value, not a View.

**Example**

```python
class Bag(Shape):
    meta = DictRef.slot(object)
run(Bag.meta["title"] == "hello", ctx)
run(nu.Str(Bag.meta["title"]).upper(), ctx)
```

**Inherited methods**

From `nu.domains.shape.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

From `nu.domains.shape.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(value)` | `SetCmd` | Build a `SetCmd`. |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Bool` | Whether this slot holds a value, as a `Bool`. |
| `.missing()` | `Bool` | Whether this slot holds no value, as a `Bool`: the negation of `exists()`. |

From `nu.forms.primitives.object_.Object`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a + b` | `Object` | Sum of self and other. |
| `a - b` | `Object` | Self minus other. |
| `a * b` | `Object` | Product of self and other. |
| `a @ b` | `Object` | Matrix multiplication: self @ other. |
| `a / b` | `Object` | Self divided by other. |
| `a // b` | `Object` | Self floor-divided by other. |
| `a % b` | `Object` | Self modulo other. |
| `a ** b` | `Object` | Self raised to the other power. |
| `-a` | `Object` | Negation of self. |
| `+a` | `Object` | Self unchanged. |
| `abs(a)` | `Object` | Absolute value of self. |
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
| `.bitand(other)` | `Object` | Python's `&` on the values: bits for ints, intersection for sets. |
| `.bitor(other)` | `Object` | Python's `\|` on the values: bits for ints, union for sets, merge for dicts. |
| `.bitxor(other)` | `Object` | Python's `^` on the values: bits for ints, symmetric difference for sets. |
| `.bitnot()` | `Object` | Python's `~` on the value. |
| `.lshift(other)` | `Object` | Self shifted left by other bits: Python's `<<` on the values. |
| `.rshift(other)` | `Object` | Self shifted right by other bits: Python's `>>` on the values. |
| `.union(other)` | `Object` | Set union of self and other. |
| `.intersection(other)` | `Object` | Set intersection of self and other. |
| `.difference(other)` | `Object` | Elements of self that are not in other. |
| `.symmetric_difference(other)` | `Object` | Elements in exactly one of self and other. |
| `.merge(other)` | `Object` | Self and other merged into a new mapping: Python's dict `\|`. |
| `a[key]` | `Object` | Subscript access: self[key]. |
| `.len()` | `Int` | Length of self. |
| `.contains(item)` | `Bool` | Membership test: item in self. |
| `.iter()` | `Iterator` | Lazy iterator stream over self's elements. |
| `.has_attr(name)` | `Bool` | Attribute presence: hasattr(self, name). |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

## StrRef

A str leaf in KV storage, carrying the whole Str operator surface.

```python
StrRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.StrRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Stored as a plain str, so nothing is translated on read or write.
- Doubles as a key source: a str leaf can be the address of another ref, and it is resolved when the path is walked.

**Example**

```python
class Portfolio(Shape):
    name = StrRef.slot()
run(Portfolio.name.set("core"), ctx)
run(Portfolio.name.upper(), ctx)
```

**Inherited methods**

From `nu.domains.shape.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

From `nu.domains.shape.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(value)` | `SetCmd` | Build a `SetCmd`. |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Bool` | Whether this slot holds a value, as a `Bool`. |
| `.missing()` | `Bool` | Whether this slot holds no value, as a `Bool`: the negation of `exists()`. |

From `nu.forms.primitives.str_.Str`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a + b` | `Str` | Concatenation of self and other. |
| `a[key]` | `Str` | Character at an int index, or substring for a slice. |
| `.len()` | `Int` | Length of self in characters. |
| `.contains(item)` | `Bool` | Substring test: item in self. |
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
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

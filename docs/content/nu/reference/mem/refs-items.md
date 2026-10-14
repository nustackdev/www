---
title: refs.items
description: "mem leaves: one value at one key, read and written whole."
---

Module `nu.mem.refs.items`.

mem leaves: one value at one key, read and written whole.

`ItemRef` is the leaf itself (slot-level read, write and erase over one key
of a nested dict) and declares a slot once for every leaf. Each value leaf
mixes one value form in beside it, so the ref is an operand of the value it
names; the form decides the surface, the leaf decides where the value lives.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [BoolRef](#boolref) | `ref` | `BoolRef(address, parent_ref=None, owner_shape=None)` | A bool slot in the dict substrate, carrying the whole Bool surface. |
| [BytesRef](#bytesref) | `ref` | `BytesRef(address, parent_ref=None, owner_shape=None)` | A bytes slot in the dict substrate, carrying the whole Bytes surface. |
| [FloatRef](#floatref) | `ref` | `FloatRef(address, parent_ref=None, owner_shape=None)` | A float slot in the dict substrate, carrying the whole Float surface. |
| [IntRef](#intref) | `ref` | `IntRef(address, parent_ref=None, owner_shape=None)` | An int slot in the dict substrate, carrying the whole Int surface. |
| [ObjectRef](#objectref) | `ref` | `ObjectRef(address, parent_ref=None, owner_shape=None)` | A single stored value in the dict substrate, of no declared type. |
| [StrRef](#strref) | `ref` | `StrRef(address, parent_ref=None, owner_shape=None)` | A str slot in the dict substrate, carrying the whole Str surface. |

## BoolRef

A bool slot in the dict substrate, carrying the whole Bool surface.

```python
BoolRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.mem.BoolRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- An unwritten slot reads EMPTY, which is not False; use `.exists()` when the difference matters.

**Example**

```python
class User(nu.Shape):
    active = nu.BoolRef.slot()
ctx = nu.Context().bind(dict, {"active": True}, User)
nu.run(User.active.not_(), ctx)[0]
```

```
False
```

**Inherited methods**

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

A bytes slot in the dict substrate, carrying the whole Bytes surface.

```python
BytesRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.mem.BytesRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Stored as raw bytes, so a data dict holding one is no longer JSON-serialisable as it stands.

**Example**

```python
class Blob(nu.Shape):
    body = nu.BytesRef.slot()
ctx = nu.Context().bind(dict, {"body": b"hi"}, Blob)
nu.run(Blob.body.decode(), ctx)[0]
```

```
'hi'
```

**Inherited methods**

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

A float slot in the dict substrate, carrying the whole Float surface.

```python
FloatRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.mem.FloatRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Nothing coerces on write: an int written here comes back an int.

**Example**

```python
class User(nu.Shape):
    score = nu.FloatRef.slot()
ctx = nu.Context().bind(dict, {"score": 1.5}, User)
nu.run(User.score * 2, ctx)[0]
```

```
3.0
```

**Inherited methods**

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

An int slot in the dict substrate, carrying the whole Int surface.

```python
IntRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.mem.IntRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Every `Int` call is available on it, so the ref itself is an operand: `User.age + 1` builds arithmetic over the read.
- The value is stored as a plain int, so the data dict stays JSON-shaped.

**Example**

```python
class User(nu.Shape):
    age = nu.IntRef.slot()
ctx = nu.Context().bind(dict, {"age": 41}, User)
nu.run(User.age + 1, ctx)[0]
```

```
42
```

**Methods**

### `.inc(step=1)`

Add `step` to the stored int and write the result back.

Builds `None_`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `step` | `IntArg` | `1` |  |

**Notes**

- Read and write are two touches of the slot, not one atomic step; wrap it in a transaction when something else may write in between.
- On an unwritten slot the read is EMPTY, so the addition is EMPTY and the write raises.

**Example**

```python
class User(nu.Shape):
    age = nu.IntRef.slot()
data = {"age": 41}
ctx = nu.Context().bind(dict, data, User)
_ = nu.run(User.age.inc(), ctx)
data
```

```
{'age': 42}
```

### `.dec(step=1)`

Subtract `step` from the stored int and write the result back.

Builds `None_`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `step` | `IntArg` | `1` |  |

**Notes**

- Same two-touch read-then-write as `inc`.

**Example**

```python
class User(nu.Shape):
    age = nu.IntRef.slot()
data = {"age": 41}
ctx = nu.Context().bind(dict, data, User)
_ = nu.run(User.age.dec(2), ctx)
data
```

```
{'age': 39}
```

**Inherited methods**

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

A single stored value in the dict substrate, of no declared type.

```python
ObjectRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.mem.ObjectRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

What a container descends to when its value is `object`, undeclared, or
a type with no mem leaf of its own. It carries the whole `Object`
surface, so the ref is still an operand: `==` builds an `Eq`,
attribute and subscript access descend into the value read, and a cast
narrows it.

**Example**

```python
class Port(nu.Shape):
    meta = nu.DictRef.slot(object)
ctx = nu.Context().bind(dict, {"meta": {"title": "hi"}}, Port)
nu.run(Port.meta["title"] == "hi", ctx)[0]
```

```
True
```

**Inherited methods**

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

A str slot in the dict substrate, carrying the whole Str surface.

```python
StrRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.mem.StrRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Every `Str` call is available on it, so `User.name.upper()` reads the slot and builds the string op over it.

**Example**

```python
class User(nu.Shape):
    name = nu.StrRef.slot()
ctx = nu.Context().bind(dict, {"name": "ada"}, User)
nu.run(User.name.upper(), ctx)[0]
```

```
'ADA'
```

**Inherited methods**

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

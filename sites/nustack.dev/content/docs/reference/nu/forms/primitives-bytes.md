---
title: primitives.bytes_
description: "Bytes - bytes interface."
---

Module `nu.forms.primitives.bytes_`.

Bytes - bytes interface.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Bytes](#bytes) | `scalar_query` | `Bytes()` | Bytes interface. Sliceable + comparable + logical + bytes methods. |

## Bytes

Bytes interface. Sliceable + comparable + logical + bytes methods.

```python
Bytes()
```

Path `nu.forms.Bytes`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Notes**

- Indexing with `[]` yields Int, the byte's value 0-255. Slicing with `[:]` yields Bytes.
- `decode` and `hex_` are the only two methods that leave bytes: `decode` produces a Str, `hex_` produces a Str of hex digits. Every other method stays in Bytes.
- Comparison operators yield Bool, ordering lexicographically by byte value, same as Python's `bytes` ordering.
- Logical operators are the named forms `and_`, `or_`, `not_`.

**Example**

```python
nu.run(nu.Bytes(b"hi") + nu.Bytes(b" there"))[0]
```

```
b'hi there'
```

**Methods**

### `a + b`

Concatenation of self and other.

Builds `Bytes`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BytesArg` |  | the bytes to append to self. |

**Yields**

The concatenation. INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"foo") + nu.Bytes(b"bar"))[0]
```

```
b'foobar'
```

### `a[key]`

Byte at an index, or a sub-range by slice.

Builds `Bytes | Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `IntArg \| slice` |  | an Int or plain int for a single byte, or a Python slice for a sub-range. |

**Yields**

The byte's value 0-255 as Int for a single index. A new Bytes
for a slice. INVALID when self is a sentinel or the index is
out of range.

**Examples**

```python
nu.run(nu.Bytes(b"hello")[1])[0]
```

```
101
```

```python
nu.run(nu.Bytes(b"hello")[1:3])[0]
```

```
b'el'
```

### `a > b`

Self strictly greater than other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BytesArg` |  | the bytes to compare against. |

**Yields**

True when self sorts after other, False otherwise. INVALID when
either operand is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"b") > nu.Bytes(b"a"))[0]
```

```
True
```

### `a < b`

Self strictly less than other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BytesArg` |  | the bytes to compare against. |

**Yields**

True when self sorts before other, False otherwise. INVALID
when either operand is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"a") < nu.Bytes(b"b"))[0]
```

```
True
```

### `a >= b`

Self greater than or equal to other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BytesArg` |  | the bytes to compare against. |

**Yields**

True when self sorts after or equal to other, False otherwise.
INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"a") >= nu.Bytes(b"a"))[0]
```

```
True
```

### `a <= b`

Self less than or equal to other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BytesArg` |  | the bytes to compare against. |

**Yields**

True when self sorts before or equal to other, False otherwise.
INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"a") <= nu.Bytes(b"b"))[0]
```

```
True
```

### `a == b`

Self equal to other by value.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BytesArg` |  | the bytes to compare against. |

**Yields**

True when the byte values are equal, False otherwise. INVALID
when either operand is a sentinel.

**Notes**

- Value equality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.Bytes(b"abc") == nu.Bytes(b"abc"))[0]
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
| `other` | `BytesArg` |  | the bytes to compare against. |

**Yields**

True when the byte values differ, False otherwise. INVALID when
either operand is a sentinel.

**Notes**

- Value inequality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.Bytes(b"abc") != nu.Bytes(b"xyz"))[0]
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
| `other` | `BytesArg` |  | the value to compare identity against. |

**Yields**

True when self and other evaluate to the same Python object,
False otherwise.

**Notes**

- Object identity, not value equality. For value comparison use `==` instead.

**Example**

```python
nu.run(nu.Bytes(b"abc").is_(b"abc"))[0]
```

```
True
```

### `.and_(other)`

Logical AND of self and other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BytesArg` |  | the value to AND with self. Coerced to Bool by truthiness (empty bytes is False, everything else is True). |

**Yields**

True when both operands are truthy, False otherwise. INVALID
when either operand is a sentinel.

**Notes**

- Short-circuits like Python: the right operand is only evaluated when the left does not already decide the result.

**Example**

```python
nu.run(nu.Bytes(b"").and_(nu.Bytes(b"x")))[0]
```

```
False
```

### `.or_(other)`

Logical OR of self and other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BytesArg` |  | the value to OR with self. Coerced to Bool by truthiness. |

**Yields**

True when either operand is truthy, False otherwise. INVALID
when either operand is a sentinel.

**Notes**

- Short-circuits like Python: the right operand is only evaluated when the left does not already decide the result.

**Example**

```python
nu.run(nu.Bytes(b"x").or_(nu.Bytes(b"")))[0]
```

```
True
```

### `.not_()`

Logical NOT of self.

Builds `Bool`.

**Yields**

True when self is empty, False otherwise. INVALID when self is
a sentinel.

**Notes**

- Empty bytes yields True, every other value yields False.

**Example**

```python
nu.run(nu.Bytes(b"").not_())[0]
```

```
True
```

### `.bool_()`

Cast self to Bool.

Builds `Bool`.

**Yields**

True when self is non-empty, False when self is empty. INVALID
when self is a sentinel.

**Notes**

- Empty bytes becomes False, every other value becomes True, matching Python's truthiness rule.

**Example**

```python
nu.run(nu.Bytes(b"hi").bool_())[0]
```

```
True
```

### `.decode(encoding='utf-8')`

Decode self to a string using the given encoding.

Builds `Str`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `encoding` | `StrArg` | `'utf-8'` | the codec to decode with, `"utf-8"` by default. |

**Yields**

The decoded Str. INVALID when self is a sentinel, when the
bytes are not valid under the encoding, or when the encoding
name is unknown.

**Notes**

- This is where Bytes crosses into Str. Every other method on this class stays in bytes.

**Example**

```python
nu.run(nu.Bytes(b"hi there").decode())[0]
```

```
'hi there'
```

### `.hex_()`

Hex string of self, two digits per byte.

Builds `Str`.

**Yields**

The lowercase hex digits, no separators. INVALID when self is a
sentinel.

**Notes**

- The other place, besides `decode`, where Bytes crosses into Str.

**Example**

```python
nu.run(nu.Bytes(b"\\xff\\x00").hex_())[0]
```

```
'ff00'
```

### `.upper()`

Self with ASCII letters uppercased.

Builds `Bytes`.

**Yields**

The uppercased bytes. INVALID when self is a sentinel.

**Notes**

- ASCII only. Non-ASCII bytes pass through unchanged.

**Example**

```python
nu.run(nu.Bytes(b"Hi").upper())[0]
```

```
b'HI'
```

### `.lower()`

Self with ASCII letters lowercased.

Builds `Bytes`.

**Yields**

The lowercased bytes. INVALID when self is a sentinel.

**Notes**

- ASCII only. Non-ASCII bytes pass through unchanged.

**Example**

```python
nu.run(nu.Bytes(b"Hi").lower())[0]
```

```
b'hi'
```

### `.strip(chars=None)`

Self with leading and trailing bytes removed.

Builds `Bytes`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `chars` | `BytesArg \| None` | `None` | the bytes to strip. `None` strips ASCII whitespace. |

**Yields**

The stripped bytes. INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"  hi  ").strip())[0]
```

```
b'hi'
```

### `.lstrip(chars=None)`

Self with leading bytes removed.

Builds `Bytes`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `chars` | `BytesArg \| None` | `None` | the bytes to strip. `None` strips ASCII whitespace. |

**Yields**

The stripped bytes. INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"  hi  ").lstrip())[0]
```

```
b'hi  '
```

### `.rstrip(chars=None)`

Self with trailing bytes removed.

Builds `Bytes`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `chars` | `BytesArg \| None` | `None` | the bytes to strip. `None` strips ASCII whitespace. |

**Yields**

The stripped bytes. INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"  hi  ").rstrip())[0]
```

```
b'  hi'
```

### `.split_bytes(sep=None, maxsplit=-1)`

Self split into a List of Bytes on sep.

Builds `List`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sep` | `BytesArg \| None` | `None` | the separator. `None` splits on runs of ASCII whitespace and drops empty pieces. |
| `maxsplit` | `IntArg` | `-1` | the maximum number of splits. `-1` means no limit. |

**Yields**

The pieces as a List of Bytes. INVALID when self is a
sentinel.

**Example**

```python
nu.run(nu.Bytes(b"a,b,c").split_bytes(b","))[0]
```

```
[b'a', b'b', b'c']
```

### `.find_bytes(sub, start=0, end=None)`

Lowest index of sub in self, or -1 if absent.

Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sub` | `BytesArg` |  | the bytes to search for. |
| `start` | `IntArg` | `0` | the index to start searching from. |
| `end` | `IntArg \| None` | `None` | the index to stop searching at, exclusive. `None` means the end of self. |

**Yields**

The index of the first match, or -1 when sub is not found.
INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"abcabc").find_bytes(b"bc"))[0]
```

```
1
```

### `.count_bytes(sub)`

Number of non-overlapping occurrences of sub in self.

Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sub` | `BytesArg` |  | the bytes to count. |

**Yields**

The count. INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"abcabc").count_bytes(b"bc"))[0]
```

```
2
```

### `.startswith(prefix)`

Self starts with prefix.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `prefix` | `BytesArg` |  | the bytes to test for. |

**Yields**

True when self starts with prefix, False otherwise. INVALID
when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"hello").startswith(b"he"))[0]
```

```
True
```

### `.endswith(suffix)`

Self ends with suffix.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `suffix` | `BytesArg` |  | the bytes to test for. |

**Yields**

True when self ends with suffix, False otherwise. INVALID when
self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"hello").endswith(b"lo"))[0]
```

```
True
```

### `.replace(old, new, count=-1)`

Self with occurrences of old replaced by new.

Builds `Bytes`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `old` | `BytesArg` |  | the bytes to replace. |
| `new` | `BytesArg` |  | the replacement bytes. |
| `count` | `IntArg` | `-1` | the maximum number of replacements. `-1` replaces every occurrence. |

**Yields**

The replaced bytes. INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"aXbXc").replace(b"X", b"-"))[0]
```

```
b'a-b-c'
```

### `.removeprefix(prefix)`

Self with prefix removed if present.

Builds `Bytes`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `prefix` | `BytesArg` |  | the bytes to remove from the start. |

**Yields**

Self without the leading prefix, or self unchanged when the
prefix is not present. INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"prefoo").removeprefix(b"pre"))[0]
```

```
b'foo'
```

### `.removesuffix(suffix)`

Self with suffix removed if present.

Builds `Bytes`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `suffix` | `BytesArg` |  | the bytes to remove from the end. |

**Yields**

Self without the trailing suffix, or self unchanged when the
suffix is not present. INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"foobar").removesuffix(b"bar"))[0]
```

```
b'foo'
```

### `.translate(table, delete=b'')`

Self translated through a 256-byte table, with bytes in delete dropped first.

Builds `Bytes`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `table` | `BytesArg \| None` |  | a 256-byte lookup table mapping each byte value to its replacement. `None` skips translation and only applies delete. |
| `delete` | `BytesArg` | `b''` | bytes to drop from self before translating. |

**Yields**

The translated bytes. INVALID when self is a sentinel, or when
table is not exactly 256 bytes long.

**Example**

```python
nu.run(nu.Bytes(b"abc").translate(bytes.maketrans(b"ab", b"AB")))[0]
```

```
b'ABc'
```

### `.title()`

Self titlecased: each word's first cased byte upper, the rest lower.

Builds `Bytes`.

**Yields**

The titlecased bytes. INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"hello world").title())[0]
```

```
b'Hello World'
```

### `.capitalize()`

Self with the first byte uppercased and the rest lowercased.

Builds `Bytes`.

**Yields**

The capitalized bytes. INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"hello world").capitalize())[0]
```

```
b'Hello world'
```

### `.swapcase()`

Self with uppercase and lowercase bytes swapped.

Builds `Bytes`.

**Yields**

The case-swapped bytes. INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"Hello").swapcase())[0]
```

```
b'hELLO'
```

### `.rsplit_bytes(sep=None, maxsplit=-1)`

Self split into a List of Bytes on sep, counting maxsplit from the right.

Builds `List`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sep` | `BytesArg \| None` | `None` | the separator. `None` splits on runs of ASCII whitespace and drops empty pieces. |
| `maxsplit` | `IntArg` | `-1` | the maximum number of splits, applied from the right. `-1` means no limit. |

**Yields**

The pieces as a List of Bytes. INVALID when self is a
sentinel.

**Notes**

- Only differs from `split_bytes` when maxsplit limits the split count; the pieces themselves are the same bytes either way.

**Example**

```python
nu.run(nu.Bytes(b"a,b,c").rsplit_bytes(b",", 1))[0]
```

```
[b'a,b', b'c']
```

### `.splitlines(keepends=False)`

Self split into a List of Bytes at line boundaries.

Builds `List`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `keepends` | `BoolArg` | `False` | when True, keep the line-ending bytes on each piece. |

**Yields**

The lines as a List of Bytes. INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"a\\nb\\nc").splitlines())[0]
```

```
[b'a', b'b', b'c']
```

### `.partition(sep)`

Self split around the first occurrence of sep.

Builds `Tuple`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sep` | `BytesArg` |  | the separator to split on. |

**Yields**

A 3-tuple of (before, sep, after). When sep is not found,
(self, b"", b""). INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"key=value").partition(b"="))[0]
```

```
(b'key', b'=', b'value')
```

### `.rpartition(sep)`

Self split around the last occurrence of sep.

Builds `Tuple`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sep` | `BytesArg` |  | the separator to split on. |

**Yields**

A 3-tuple of (before, sep, after). When sep is not found,
(b"", b"", self). INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"a=b=c").rpartition(b"="))[0]
```

```
(b'a=b', b'=', b'c')
```

### `.rfind_bytes(sub, start=0, end=None)`

Highest index of sub in self, or -1 if absent.

Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sub` | `BytesArg` |  | the bytes to search for. |
| `start` | `IntArg` | `0` | the index to start searching from. |
| `end` | `IntArg \| None` | `None` | the index to stop searching at, exclusive. `None` means the end of self. |

**Yields**

The index of the last match, or -1 when sub is not found.
INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"abcabc").rfind_bytes(b"bc"))[0]
```

```
4
```

### `.index_bytes(sub, start=0, end=None)`

Lowest index of sub in self.

Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sub` | `BytesArg` |  | the bytes to search for. |
| `start` | `IntArg` | `0` | the index to start searching from. |
| `end` | `IntArg \| None` | `None` | the index to stop searching at, exclusive. `None` means the end of self. |

**Yields**

The index of the first match. INVALID when self is a sentinel
or when sub is not found.

**Notes**

- Like `find_bytes` but INVALID instead of -1 when sub is not found, mirroring Python's `index` raising `ValueError`.

**Example**

```python
nu.run(nu.Bytes(b"abc").index_bytes(b"b"))[0]
```

```
1
```

### `.rindex_bytes(sub, start=0, end=None)`

Highest index of sub in self.

Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sub` | `BytesArg` |  | the bytes to search for. |
| `start` | `IntArg` | `0` | the index to start searching from. |
| `end` | `IntArg \| None` | `None` | the index to stop searching at, exclusive. `None` means the end of self. |

**Yields**

The index of the last match. INVALID when self is a sentinel
or when sub is not found.

**Notes**

- Like `rfind_bytes` but INVALID instead of -1 when sub is not found, mirroring Python's `rindex` raising `ValueError`.

**Example**

```python
nu.run(nu.Bytes(b"abcabc").rindex_bytes(b"bc"))[0]
```

```
4
```

### `.isascii()`

Self has only ASCII bytes.

Builds `Bool`.

**Yields**

True when every byte is ASCII, False otherwise. INVALID when
self is a sentinel.

**Notes**

- Empty bytes is True.

**Example**

```python
nu.run(nu.Bytes(b"hello").isascii())[0]
```

```
True
```

### `.isdigit()`

Self has only ASCII digit bytes, and at least one.

Builds `Bool`.

**Yields**

True when every byte is an ASCII digit and self is non-empty,
False otherwise. INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"123").isdigit())[0]
```

```
True
```

### `.isalpha()`

Self has only ASCII letter bytes, and at least one.

Builds `Bool`.

**Yields**

True when every byte is an ASCII letter and self is non-empty,
False otherwise. INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"abc").isalpha())[0]
```

```
True
```

### `.isalnum()`

Self has only ASCII alphanumeric bytes, and at least one.

Builds `Bool`.

**Yields**

True when every byte is an ASCII letter or digit and self is
non-empty, False otherwise. INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"abc123").isalnum())[0]
```

```
True
```

### `.isspace()`

Self has only ASCII whitespace bytes, and at least one.

Builds `Bool`.

**Yields**

True when every byte is ASCII whitespace and self is non-empty,
False otherwise. INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"  ").isspace())[0]
```

```
True
```

### `.istitle()`

Self is titlecased, with at least one cased byte.

Builds `Bool`.

**Yields**

True when self follows title case, False otherwise. INVALID
when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"Hello World").istitle())[0]
```

```
True
```

### `.isupper()`

Self has all cased bytes uppercase, and at least one cased byte.

Builds `Bool`.

**Yields**

True when every cased byte is uppercase, False otherwise.
INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"ABC").isupper())[0]
```

```
True
```

### `.islower()`

Self has all cased bytes lowercase, and at least one cased byte.

Builds `Bool`.

**Yields**

True when every cased byte is lowercase, False otherwise.
INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"abc").islower())[0]
```

```
True
```

### `.center(width, fillbyte=b' ')`

Self centered in a field of width, padded with fillbyte.

Builds `Bytes`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `width` | `IntArg` |  | the target length. Self unchanged when width does not exceed its length. |
| `fillbyte` | `BytesArg` | `b' '` | the single byte to pad with, `b" "` by default. |

**Yields**

The padded bytes. INVALID when self is a sentinel, or when
fillbyte is not exactly one byte.

**Example**

```python
nu.run(nu.Bytes(b"hi").center(6))[0]
```

```
b'  hi  '
```

### `.ljust(width, fillbyte=b' ')`

Self left-justified in a field of width, padded with fillbyte.

Builds `Bytes`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `width` | `IntArg` |  | the target length. Self unchanged when width does not exceed its length. |
| `fillbyte` | `BytesArg` | `b' '` | the single byte to pad with, `b" "` by default. |

**Yields**

The padded bytes. INVALID when self is a sentinel, or when
fillbyte is not exactly one byte.

**Example**

```python
nu.run(nu.Bytes(b"hi").ljust(5))[0]
```

```
b'hi   '
```

### `.rjust(width, fillbyte=b' ')`

Self right-justified in a field of width, padded with fillbyte.

Builds `Bytes`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `width` | `IntArg` |  | the target length. Self unchanged when width does not exceed its length. |
| `fillbyte` | `BytesArg` | `b' '` | the single byte to pad with, `b" "` by default. |

**Yields**

The padded bytes. INVALID when self is a sentinel, or when
fillbyte is not exactly one byte.

**Example**

```python
nu.run(nu.Bytes(b"hi").rjust(5))[0]
```

```
b'   hi'
```

### `.zfill(width)`

Self padded with leading zero bytes to width.

Builds `Bytes`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `width` | `IntArg` |  | the target length. Self unchanged when width does not exceed its length. |

**Yields**

The zero-padded bytes. INVALID when self is a sentinel.

**Notes**

- A leading sign byte (`+` or `-`), if present, stays first and the zeros go after it.

**Example**

```python
nu.run(nu.Bytes(b"42").zfill(5))[0]
```

```
b'00042'
```

### `.expandtabs(tabsize=8)`

Self with tab bytes expanded to spaces.

Builds `Bytes`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `tabsize` | `IntArg` | `8` | the number of columns per tab stop, 8 by default. |

**Yields**

The expanded bytes. INVALID when self is a sentinel.

**Example**

```python
nu.run(nu.Bytes(b"a\\tb").expandtabs(4))[0]
```

```
b'a   b'
```

### `.join(iterable)`

Self used as separator between the elements of iterable.

Builds `Bytes`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `iterable` | `Iterable[BytesArg]` |  | the bytes-like elements to join. |

**Yields**

The joined bytes. INVALID when self is a sentinel, or when any
element is not bytes.

**Example**

```python
nu.run(nu.Bytes(b",").join([b"a", b"b", b"c"]))[0]
```

```
b'a,b,c'
```

**Inherited methods**

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

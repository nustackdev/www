---
title: uuid
description: "Nu surface for Python's `uuid` module."
---

Module `nustd.uuid`.

Nu surface for Python's `uuid` module.

Mirrors `uuid` 1-1: `UUID` is the class (a Form), `uuid1`/`uuid3`/
`uuid4`/`uuid5` are the module-level functions. Three layers behind it:
`forms` (the class), `functions` (the free functions), `interactions`
(the atoms both build). Import it the way you would the stdlib:

```python
from nustd.uuid import UUID, uuid4
import nustd.uuid as uuid     # then uuid.uuid4(), uuid.UUID.from_str(...)
```

## forms

Module `nustd.uuid.forms`.

UUID - the typed access surface for `uuid.UUID`.

A `UUID` is a Nu term that carries a `uuid.UUID`. Its operations split
the two ways the model intends:

- **accessors** (version, hex, bytes, ...) reuse the core `GetAttr` atom -
  a UUID component is just an attribute read, and core already models that.
- **comparisons** reuse the core comparison atoms (`Gt` ...).
- **constructors** are the one thing core can't do, so they wrap the new atoms
  from `interactions`.

That's the whole pattern: Form for access, interactions for the calls, reusing
core wherever it already expresses the op.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [UUID](#uuid) | `scalar_query` | `UUID()` | UUID interface - the `uuid.UUID` class as a Form. |

### UUID

UUID interface - the `uuid.UUID` class as a Form.

```python
UUID()
```

Path `nustd.uuid.UUID`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Mirrors the class surface only: the `UUID(...)` constructor (the
`from_*` alternate constructors below) plus instance ops (accessors,
conversions, comparison). The module-level generators `uuid1` / `uuid3`
/ `uuid4` / `uuid5` are NOT methods here - they live in `functions` as
free functions, matching the stdlib layout.

**Methods**

#### `UUID.from_str(value)`

Parse a hex string (with or without hyphens) into a UUID.

Builds `UUID`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

Undocumented: example.

#### `UUID.from_bytes(value)`

Build a UUID from 16 bytes.

Builds `UUID`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `BytesArg` |  |  |

Undocumented: example.

#### `UUID.from_int(value)`

Build a UUID from a 128-bit integer.

Builds `UUID`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `IntArg` |  |  |

Undocumented: example.

#### `.version()`

The version number (1, 3, 4, or 5).

Builds `Int`.

Undocumented: example.

#### `.variant()`

The variant.

Builds `Str`.

Undocumented: example.

#### `.time()`

The 60-bit timestamp (version 1).

Builds `Int`.

Undocumented: example.

#### `.clock_seq()`

The 14-bit clock sequence (version 1).

Builds `Int`.

Undocumented: example.

#### `.node()`

The 48-bit node (version 1).

Builds `Int`.

Undocumented: example.

#### `.hex()`

The UUID as a 32-character hex string.

Builds `Str`.

Undocumented: example.

#### `.urn()`

The UUID as a URN (`urn:uuid:...`).

Builds `Str`.

Undocumented: example.

#### `.bytes()`

The UUID as 16 bytes.

Builds `Bytes`.

Undocumented: example.

#### `.bytes_le()`

The UUID as 16 bytes, little-endian.

Builds `Bytes`.

Undocumented: example.

#### `.int_()`

The UUID as a 128-bit integer.

Builds `Int`.

Undocumented: example.

#### `a > b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `UUIDArg` |  |  |

Undocumented: summary, example.

#### `a < b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `UUIDArg` |  |  |

Undocumented: summary, example.

#### `a >= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `UUIDArg` |  |  |

Undocumented: summary, example.

#### `a <= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `UUIDArg` |  |  |

Undocumented: summary, example.

#### `.eq(other)`

Whether two UUIDs are equal.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `UUIDArg` |  |  |

Undocumented: example.

#### `.ne(other)`

Whether two UUIDs differ.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `UUIDArg` |  |  |

Undocumented: example.

**Inherited methods**

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

Undocumented: example.

## functions

Module `nustd.uuid.functions`.

Module-level functions for `nustd.uuid` - the function namespace.

These mirror `uuid.uuid1` / `uuid.uuid3` / `uuid.uuid4` / `uuid.uuid5`:
free functions, not methods on the type. Each is a thin wrapper that builds its
constructor interaction atom and returns a `UUID` form. The atoms live in
`interactions`; the value type lives in `forms`.

`uuid4` / `uuid1` read randomness / the clock. `uuid3` / `uuid5` are
pure functions of their args.

| Name | Call | Meaning |
| --- | --- | --- |
| [uuid1](#uuid1) | `uuid.uuid1(node=None, clock_seq=None)` | A host/time UUID (version 1): mirrors `uuid.uuid1()`. |
| [uuid3](#uuid3) | `uuid.uuid3(namespace, name)` | A name-based MD5 UUID (version 3): mirrors `uuid.uuid3()`. |
| [uuid4](#uuid4) | `uuid.uuid4()` | A random UUID (version 4): mirrors `uuid.uuid4()`. |
| [uuid5](#uuid5) | `uuid.uuid5(namespace, name)` | A name-based SHA-1 UUID (version 5): mirrors `uuid.uuid5()`. |

### uuid1

A host/time UUID (version 1): mirrors `uuid.uuid1()`.

```python
uuid.uuid1(node=None, clock_seq=None)
```

Path `nustd.uuid.uuid1`. Defined on `nustd.uuid.functions`, bound as a function. Builds `UUID`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `node` | `IntArg \| None` | `None` |  |
| `clock_seq` | `IntArg \| None` | `None` |  |

Undocumented: example.

### uuid3

A name-based MD5 UUID (version 3): mirrors `uuid.uuid3()`.

```python
uuid.uuid3(namespace, name)
```

Path `nustd.uuid.uuid3`. Defined on `nustd.uuid.functions`, bound as a function. Builds `UUID`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `namespace` | `UUIDArg` |  |  |
| `name` | `StrArg` |  |  |

Undocumented: example.

### uuid4

A random UUID (version 4): mirrors `uuid.uuid4()`.

```python
uuid.uuid4()
```

Path `nustd.uuid.uuid4`. Defined on `nustd.uuid.functions`, bound as a function. Builds `UUID`.

Undocumented: example.

### uuid5

A name-based SHA-1 UUID (version 5): mirrors `uuid.uuid5()`.

```python
uuid.uuid5(namespace, name)
```

Path `nustd.uuid.uuid5`. Defined on `nustd.uuid.functions`, bound as a function. Builds `UUID`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `namespace` | `UUIDArg` |  |  |
| `name` | `StrArg` |  |  |

Undocumented: example.

---
title: pathlib
description: "Nu surface for Python's `pathlib` module - pure path operations only."
---

Module `nustd.pathlib`.

Nu surface for Python's `pathlib` module - pure path operations only.

Mirrors `pathlib` 1-1: `Path` is the class (a Form), backed by `PurePath`
so only the lexical operations that never touch the filesystem are modeled.
`pathlib` has no module-level functions, so there are just two layers:
`forms` (the class) and `interactions` (the constructor and method atoms;
property reads use core `GetAttr`, comparison uses the core atoms).
Import it like the stdlib:

```python
from nustd.pathlib import Path
import nustd.pathlib as pathlib    # pathlib.Path.of("a", "b"), ...
```

## ScalarQuery

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Path](#path) | `scalar_query` | `Path()` | `pathlib` path as a Form - the pure (no filesystem I/O) surface. |

### Path

`pathlib` path as a Form - the pure (no filesystem I/O) surface.

```python
Path()
```

Path `nustd.pathlib.Path`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Named `Path` to mirror `from pathlib import Path`; backed by
`PurePath`, so only the lexical operations are modeled. Build one with
`Path.of(...)`; read its components as properties; transform it with the
method calls or the `/` operator.

**Methods**

#### `Path.of()`

Build a path from segments: `PurePath(*segments)`.

Builds `Path`.

Undocumented: example.

#### `Path.cwd()`

The current working directory: `Path.cwd()`.

Builds `Path`.

Undocumented: example.

#### `Path.home()`

The user's home directory: `Path.home()`.

Builds `Path`.

Undocumented: example.

#### `.name()`

The final component (filename).

Builds `Str`.

Undocumented: example.

#### `.stem()`

The final component without its suffix.

Builds `Str`.

Undocumented: example.

#### `.suffix()`

The file extension of the final component (including the dot).

Builds `Str`.

Undocumented: example.

#### `.suffixes()`

All file extensions of the final component.

Builds `List`.

Undocumented: example.

#### `.parts()`

The path's components as a tuple.

Builds `Tuple`.

Undocumented: example.

#### `.parent()`

The logical parent of the path.

Builds `Path`.

Undocumented: example.

#### `.root()`

The root (e.g. `/` on POSIX).

Builds `Str`.

Undocumented: example.

#### `.anchor()`

The concatenation of drive and root.

Builds `Str`.

Undocumented: example.

#### `.drive()`

The drive (empty on POSIX).

Builds `Str`.

Undocumented: example.

#### `.with_name(name)`

A copy with the final component's name replaced.

Builds `Path`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `StrArg` |  |  |

Undocumented: example.

#### `.with_stem(stem)`

A copy with the final component's stem replaced.

Builds `Path`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `stem` | `StrArg` |  |  |

Undocumented: example.

#### `.with_suffix(suffix)`

A copy with the final component's suffix replaced.

Builds `Path`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `suffix` | `StrArg` |  |  |

Undocumented: example.

#### `.joinpath()`

Join one or more components onto the path.

Builds `Path`.

Undocumented: example.

#### `.relative_to(other)`

The path relative to `other`.

Builds `Path`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `StrArg \| PathArg` |  |  |

Undocumented: example.

#### `a / b`

Join with `/`: `Path.of("a") / "b"`.

Builds `Path`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `StrArg \| PathArg` |  |  |

Undocumented: example.

#### `.as_posix()`

The path as a string with forward slashes.

Builds `Str`.

Undocumented: example.

#### `.as_uri()`

The path as a `file://` URI (requires an absolute path).

Builds `Str`.

Undocumented: example.

#### `.match(pattern)`

Whether the path matches a glob pattern.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `pattern` | `StrArg` |  |  |

Undocumented: example.

#### `.is_absolute()`

Whether the path is absolute.

Builds `Bool`.

Undocumented: example.

#### `.is_relative_to(other)`

Whether the path is relative to `other`.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `StrArg \| PathArg` |  |  |

Undocumented: example.

#### `a > b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `PathArg` |  |  |

Undocumented: summary, example.

#### `a < b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `PathArg` |  |  |

Undocumented: summary, example.

#### `a >= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `PathArg` |  |  |

Undocumented: summary, example.

#### `a <= b`

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `PathArg` |  |  |

Undocumented: summary, example.

#### `.eq(other)`

Whether two paths are equal.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `PathArg` |  |  |

Undocumented: example.

#### `.ne(other)`

Whether two paths differ.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `PathArg` |  |  |

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

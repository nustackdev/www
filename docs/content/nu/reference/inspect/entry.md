---
title: entry
description: "Entries: what a declared class holds, and the record behind one of them."
---

Module `nu.inspect.entry`.

Entries: what a declared class holds, and the record behind one of them.

Shared machinery for the two declarative kinds. A Shape declares slots, a
Service declares methods; both are class-level declarations that are never
instantiated, and both are read the same way - a flat list of named members,
each pointing at something that already has a record. "Entry" is that shared
word, and it is what lets one dispatch function serve both kinds.

Two levels, never a tree. `entries_of` gives the names and what each one
is; `parse_entry` resolves exactly one of them and hands back the record
the pointed-at thing already has - a RefRecord for a Ref slot or a Service
method, a ShapeRecord for a nested Shape. Nothing expands eagerly, because a
Shape can nest arbitrarily deep and an agent reading a 10-slot Shape wants 10
lines, then one lookup for the slot it cares about. The descent is the
reader's to drive.

A Service method resolves to a RefRecord rather than to an interaction
record: what a Service declares is a MethodRef subclass, and the interaction
it builds when called is named in that Ref's own Yields.

| Name | Call | Meaning |
| --- | --- | --- |
| [entries_of](#entries_of) | `inspect.entries_of(cls, path)` | One Entry per member `cls` declares. |
| [parse_entry](#parse_entry) | `inspect.parse_entry(cls, name, path='')` | The record for one entry of `cls`, or None when it declares no such name. |

## entries_of

One Entry per member `cls` declares.

```python
inspect.entries_of(cls, path)
```

Path `nu.inspect.entries_of`. Defined on `nu.inspect.entry`, bound as a function. Builds `tuple[Entry, ...]`.

`path` is where `cls` itself was reached, so each entry's path is
reachable from what the reader already typed.

Order is the order the metaclass collected the declarations in, which is
source order only when a class declares them all one way; a Shape that
mixes explicit `.slot()` assignments with bare annotations collects the
assignments first. Reordering here would be inventing an order, so it is
passed through as found.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cls` | `type` |  |  |
| `path` | `str` |  |  |

Undocumented: example.

## parse_entry

The record for one entry of `cls`, or None when it declares no such name.

```python
inspect.parse_entry(cls, name, path='')
```

Path `nu.inspect.parse_entry`. Defined on `nu.inspect.entry`, bound as a function. Builds `Record | None`.

Dispatches to whichever kind already covers the pointed-at thing rather
than inventing an entry record: this is a lookup step, not a kind.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cls` | `type` |  |  |
| `name` | `str` |  |  |
| `path` | `str` | `''` |  |

Undocumented: example.

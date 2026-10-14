---
title: mem
description: "nu.mem: the shape fabric over plain nested Python dicts, part of the kernel."
---

Module `nu.mem`.

nu.mem: the shape fabric over plain nested Python dicts, part of the kernel.

Local state is something every program has, so this fabric ships with the
core rather than in `nustd`, and its refs and interactions are flat at the
root too.

A Shape declares slots, each slot is a ref, and every ref is a path of keys
into one dict you hand in. No storage backend, no views, no reactivity: reads
walk the dict, writes mutate it in place, and the dict stays yours to print,
copy or dump.

A missing key on the way down reads EMPTY rather than raising, and a write
creates whatever levels it needs, so a Shape can be laid over an empty dict
and filled in as it goes.

Usage:

```python
import nu

class User(nu.Shape):
    name = nu.StrRef.slot()
    age = nu.IntRef.slot()

data = {}
ctx = nu.Context().bind(dict, data, User)
```

The core leaves (`IntRef`, `StrRef`, `FloatRef`, `BoolRef`,
`BytesRef`, `ObjectRef`) each carry their value Form, so the ref itself is
an operand. Leaves for standard-library values live with their library
(`nustd.decimal.mem.DecimalRef`, `nustd.datetime.mem.DatetimeRef`, ...).
Containers (`ListRef`, `DictRef`, `SetRef`) hold a plain list, dict or
set, and descend to the ref for the value they declare: a core leaf for a core
Python type, the leaf class itself when one is passed, a `ShapeRef` when the
value is a Shape, and `ObjectRef` for anything else. `ShapeRef` nests one
Shape inside another. `ProgramRef` holds Nu source.

`Frame` is the stack frame of a Nu program: a fresh dict bound for one
Shape around one body, for the values a body computes once and reads again,
counts or accumulates. `let` is the one-value frame: an anonymous slot
holding one disposable value for one body. `Throttle` and `Debounce` keep
their state in a mem ref the caller passes.

What goes into a Nu constructor is a tree, even a literal, and a mem ref is
no exception: it names where a value will be when the program runs, not the
value. Build-time Python may shape the tree but never branches on or computes
with the values going into it. The function a binder such as `let` takes
runs once, at construction, and only builds the tree; decisions over the
value are nodes of that tree.

So never write a Python `if` or arithmetic on a value on its way into a
constructor, even one you can see: `"high" if price > 100 else "low"`
decides once, at build time, for every run. Build the Nu expression,
`nu.If(p > 100, "high", "low")`, and the run decides.

## interactions.policy

Module `nu.mem.interactions.policy`.

Rate policies that keep their state in a mem ref: `Throttle` and `Debounce`.

[Full entries](/docs/nu/reference/mem/interactions-policy)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Debounce](/docs/nu/reference/mem/interactions-policy#debounce) | `policy` | `Debounce(delay, body, pending)` | Delays the body; a re-entry cancels the pending run and starts over. |
| [Throttle](/docs/nu/reference/mem/interactions-policy#throttle) | `policy` | `Throttle(interval, body, last)` | Drops a body run that falls inside `interval` of the prior run. |

## interactions.frame

Module `nu.mem.interactions.frame`.

`Frame`: a private mem store for one scope.

[Full entries](/docs/nu/reference/mem/interactions-frame)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Frame](/docs/nu/reference/mem/interactions-frame#frame) | `bracket` | `Frame(shape, body)` | Runs `body` with a fresh dict as the mem store for `shape`. |

## refs.items

Module `nu.mem.refs.items`.

mem leaves: one value at one key, read and written whole.

[Full entries](/docs/nu/reference/mem/refs-items)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [BoolRef](/docs/nu/reference/mem/refs-items#boolref) | `ref` | `BoolRef(address, parent_ref=None, owner_shape=None)` | A bool slot in the dict substrate, carrying the whole Bool surface. |
| [BytesRef](/docs/nu/reference/mem/refs-items#bytesref) | `ref` | `BytesRef(address, parent_ref=None, owner_shape=None)` | A bytes slot in the dict substrate, carrying the whole Bytes surface. |
| [FloatRef](/docs/nu/reference/mem/refs-items#floatref) | `ref` | `FloatRef(address, parent_ref=None, owner_shape=None)` | A float slot in the dict substrate, carrying the whole Float surface. |
| [IntRef](/docs/nu/reference/mem/refs-items#intref) | `ref` | `IntRef(address, parent_ref=None, owner_shape=None)` | An int slot in the dict substrate, carrying the whole Int surface. |
| [ObjectRef](/docs/nu/reference/mem/refs-items#objectref) | `ref` | `ObjectRef(address, parent_ref=None, owner_shape=None)` | A single stored value in the dict substrate, of no declared type. |
| [StrRef](/docs/nu/reference/mem/refs-items#strref) | `ref` | `StrRef(address, parent_ref=None, owner_shape=None)` | A str slot in the dict substrate, carrying the whole Str surface. |

## refs.containers

Module `nu.mem.refs.containers`.

mem containers: collections whose elements each get an address of their own.

[Full entries](/docs/nu/reference/mem/refs-containers)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [DictRef](/docs/nu/reference/mem/refs-containers#dictref) | `ref` | `DictRef(address, parent_ref=None, owner_shape=None)` | A mapping slot in the dict substrate, holding one plain dict of values. |
| [ListRef](/docs/nu/reference/mem/refs-containers#listref) | `ref` | `ListRef(address, parent_ref=None, owner_shape=None)` | A sequence slot in the dict substrate, holding one plain list of values. |
| [SetRef](/docs/nu/reference/mem/refs-containers#setref) | `ref` | `SetRef(address, parent_ref=None, owner_shape=None)` | A set slot in the dict substrate, holding one plain set of values. |
| [ShapeRef](/docs/nu/reference/mem/refs-containers#shaperef) | `ref` | `ShapeRef(address, shape_type, parent_ref=None, owner_shape=None)` | A nested Shape slot in the dict substrate, stored as an inner dict. |

## refs.prog

Module `nu.mem.refs.prog`.

mem program leaf: Nu source stored in a slot, runnable from it.

[Full entries](/docs/nu/reference/mem/refs-prog)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ProgramRef](/docs/nu/reference/mem/refs-prog#programref) | `ref` | `ProgramRef(address, parent_ref=None, owner_shape=None)` | A slot holding Nu program source, with the Program verbs on it. |

## interactions.let

Module `nu.mem.interactions.let`.

`let`: a frame for one disposable value, reached through the ref it hands you.

[Full entries](/docs/nu/reference/mem/interactions-let)

| Name | Call | Meaning |
| --- | --- | --- |
| [let](/docs/nu/reference/mem/interactions-let#let) | `mem.let(value, fn)` | Runs the body `fn` builds with `value` held in a fresh mem slot. |

---
title: core.base
description: "Generic UI Ref -- host-independent base for the widget kit."
---

Module `nustd.ui.core.base`.

Generic UI Ref -- host-independent base for the widget kit.

A Ref is a Nu Ref whose storage is a client rendering surface (a browser
tab, in nudle's case). `_wire_type` is the identifier the client uses to
pick a renderer; the methods a Ref exposes (`set`, `append`, `on_change`,
...) decide which interactions it accepts.

Built on `StructuredRef` (parent chain, `_root_shape`). Address
resolution walks the on-tree parent chain and returns the segments as a
tuple, same as `nustd.kv` does. Nothing outside the chain gets a say: a
segment is in the address because something navigated through it, never
because a class named itself. A nudle Page contributes its segment the
same way a Section does, by being reached through the slot that declares
it. Async-only: nustd.ui is a browser fabric.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Ref](#ref) | `ref` | `Ref(address, parent_ref=None, owner_shape=None)` | Base for Refs backed by a client rendering surface. Async-only. |

## Ref

Base for Refs backed by a client rendering surface. Async-only.

```python
Ref(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.Ref`. Kind `Ref`, sort `ref`, cardinality `scalar`.

A Ref with a single semantically primary value exposes `set()` for it
(`TextRef.set(text)`, `SliderRef.set(n)`); everything else it can drive
gets its own `set_*`. A container has no primary value, so it has no
`set()` at all -- see the `nustd.ui.refs` package docstring.

**Methods**

### `.erase()`

Drop this Ref's node on the client, and everything under it.

Builds `Nu`.

On every Ref, not on a chosen few: what goes away is the address, and
any Ref has one. On a container it takes the whole subtree, which is
how something that redraws from scratch clears what its last run left.

Nothing has to be put back by hand -- the next write carries the chain,
so the node comes back with its declared type and props the moment
anything is written to it again.

Undocumented: example.

Undocumented: example.

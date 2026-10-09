---
title: refs.base
description: "Dict substrate refs: navigate nested Python dicts under the runtime."
---

Module `nustd.mem.refs.base`.

Dict substrate refs: navigate nested Python dicts under the runtime.

`RefBase` is the first concrete substrate against the shape Ref seam
(`StructuredRef`): it fills the plug-points with nested-dict navigation.

A ref names one path segment, its address, held as `children[1]` and resolved
through the runtime like any child. The parent chain lives on the tree at
`children[0]` (walked via `parent_ref`); for the common shape-field case
those are static slot names, read off each parent's stored segment at compile
time. The root dict is bound in the Context under `(dict, root_shape)` and
fetched with `rt.ctx.get(dict, scope)`.

Read is the Ref's dual role (`compile` returns the navigate-and-fetch thunk);
`write` / `erase` resolve the address and mutate the parent container,
auto-creating intermediate dicts. Dynamic parent keys (a computed segment above
the leaf) resolve at runtime via `_resolve_path(rt, nid)`.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [RefBase](#refbase) | `ref` | `RefBase(address, parent_ref=None, owner_shape=None)` | A slot addressed by a path of keys through nested Python dicts. |

## RefBase

A slot addressed by a path of keys through nested Python dicts.

```python
RefBase(address, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.RefBase`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Every nustd.mem ref descends from this one. The path is the chain of
addresses from the root down to this ref: each level contributes one key,
resolved through the runtime at read time, so a level's key may itself be
a Query or another Ref rather than a fixed name. The root the walk starts
from is the plain dict bound in the Context under `dict`, scoped to the
Shape the chain was declared on.

**Notes**

- Bind the root with `Context().bind(dict, data, RootShape)`; the same dict is read and written in place, nothing is copied in or out.
- A read walks the whole path each time. Any missing key, bad index or non-subscriptable level along the way yields EMPTY rather than raising.
- A read yields the stored object itself, so a list or dict slot hands back the live container held in the data dict.
- Writing vivifies: every intermediate level missing on the way down is created as an empty dict before the leaf key is assigned.
- Erasing removes the leaf key when it is there and does nothing when it is not; it never creates intermediate levels.

**Example**

```python
class User(nu.Shape):
    age = nustd.mem.IntRef.slot()
data = {}
ctx = nu.Context().bind(dict, data, User)
_ = nu.run(User.age.set(41), ctx)
data
nu.run(User.age, ctx)[0]
```

```
{'age': 41}
41
```

---
title: nu.core.access
description: "Access atoms: Python's item and attribute management."
---

Module `nu.core.access`.

Access atoms: Python's item and attribute management.

Maps Python's member-access builtins and operators onto Nu - getting, setting,
and deleting an item or attribute of a plain Python value. Every atom here is a
`ScalarQuery`: a read yields the member, a write/delete mutates the value
in-place and yields it back. This is local Python mutation off a value, not a
fabric write - writing into a Ref's fabric location is the fabric's own
interaction (`context.Set` / `context.Delete` and the like), which lives in
the fabric dirs, never here. `core` is the pure Python builtins.

Builtins / operators to cover (Python -> Nu):
- items (read): `x[k]` -> `GetItem`, `len` -> `Len`,
  `in` -> `Contains`, `slice` / `x[a:b]` -> `Slice`
- items (write): `x[k] = v` -> `SetItem`, `del x[k]` -> `DelItem`
- attrs (read): `getattr` -> `GetAttr`, `hasattr` -> `HasAttr`
- attrs (write): `setattr` -> `SetAttr`, `delattr` -> `DelAttr`

Every atom is EVALUABLE: each defines `compile` (sync hot path) and
`acompile` (async hot path) returning a thunk that computes from its child
values, with inlined EMPTY / INVALID sentinel propagation (mirroring
`nu.core.arithmetic`). The writes apply Python's `x[k]=v` / `setattr` /
`del` to the object value and return that object so they compose. If a
remove-and-return variant is wanted (pop-style), that is an Action - note it,
but the builtins here are plain get/set/del.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [SetItem](#setitem) | `scalar_command` | `SetItem(target, key, value)` | Subscript write: `x[k] = v`. |

## SetItem

Subscript write: `x[k] = v`.

```python
SetItem(target, key, value)
```

Path `nu.forms.collections.abc.SetItem`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 3 (3 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `target` |  |  | the container to mutate. Slot 0, so it must hold a Ref. |
| `key` |  |  | the index or key to write to. |
| `value` |  |  | the value to store. |

**Yields**

Nothing.

**Notes**

- Mutates the container in place and yields nothing, matching Python's `x[k] = v`.
- A sentinel on any child bails out before mutating, the container is left untouched.

Undocumented: example.

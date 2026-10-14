---
title: extend
description: "Extension ops: create a registered Plane, insert a snippet."
---

Module `nuspace.ops.extend`.

Extension ops: create a registered Plane, insert a snippet.

The Planes and snippets themselves are `ext` specs, registered
by the host at open. Core ships none privileged: a third party registers the
same way.

| Name | Call | Meaning |
| --- | --- | --- |
| [create_plane](#create_plane) | `ops.create_plane(spec, parent='', name=None, plane_id=None, into=None)` | Create a plane from `spec`: drawn, its cells in order, its children under it. |
| [insert_snippet](#insert_snippet) | `ops.insert_snippet(plane_id, snippet, index=None, cell_id=None, into=None)` | Add a cell from a snippet: its source as the prog, its name as the name and `made_by`. |

## create_plane

Create a plane from `spec`: drawn, its cells in order, its children under it.

```python
ops.create_plane(spec, parent='', name=None, plane_id=None, into=None)
```

Path `nuspace.ops.create_plane`. Defined on `nuspace.ops.extend`, bound as a function. Builds `nu.Nu`.

One commit: the plane, its cells and its children land together or not
at all, so no reader ever sees a plane without its cells. Every id and
every cell's `has_ui` are worked out first, outside the bracket, the
way `add_cell` does.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `spec` | `Plane` |  | The registered Plane. It runs on `spec.backend`, and each child on its own spec's. |
| `parent` | `nu.StrArg` | `''` | The plane to hang it under, `""` for the top level. |
| `name` | `nu.StrArg \| None` | `None` | What to call it. `spec.label` when absent. |
| `plane_id` | `nu.StrArg \| None` | `None` | Its id. Minted when absent. Children always mint theirs. |
| `into` | `nu.Ref \| None` | `None` | Set to the new plane's id once the commit landed, for a caller that needs a minted one: the record does not say which plane this call made. |

Undocumented: example.

## insert_snippet

Add a cell from a snippet: its source as the prog, its name as the name and `made_by`.

```python
ops.insert_snippet(plane_id, snippet, index=None, cell_id=None, into=None)
```

Path `nuspace.ops.insert_snippet`. Defined on `nuspace.ops.extend`, bound as a function. Builds `nu.Nu`.

`into` is `add_cell`'s: set to the new cell's
id in the commit, `""` when nothing was written. A program that goes
on to write the cell holds it in a `nu.let` slot and hands the slot to
the snippet's ops:

```python
nu.let("", lambda cell: (
    ops.insert_snippet(plane, prose.SNIPPET, into=cell)
    >> prose.set_text(cell, "Water the basil")
))
```

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |
| `snippet` | `Snippet` |  |  |
| `index` | `nu.IntArg \| None` | `None` |  |
| `cell_id` | `nu.StrArg \| None` | `None` |  |
| `into` | `nu.Ref \| None` | `None` |  |

Undocumented: example.

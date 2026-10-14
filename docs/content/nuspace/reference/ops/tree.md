---
title: tree
description: "Nesting: which plane hangs under which."
---

Module `nuspace.ops.tree`.

Nesting: which plane hangs under which.

Two facts kept together, in one commit, the way a plane's `cells` and a
cell's `plane` are: the parent lists the plane in its `children`, the
plane names it in `parent`. A top level plane has `""` for a parent and
`Space.top` lists it. So every plane stays one lookup away in
`Space.planes`, its parent is one read, and moving a subtree is two list
edits: unlink from the old parent, link under the new one.

A `children` list is also its sibling order: a new plane is appended, a
move puts it where it is asked, a removal drops it and closes the gap.

| Name | Call | Meaning |
| --- | --- | --- |
| [move_plane](#move_plane) | `ops.move_plane(plane_id, parent='', index=None)` | Hang `plane_id` under `parent` (a plane id, `""` for the top) at `index`. |

## move_plane

Hang `plane_id` under `parent` (a plane id, `""` for the top) at `index`.

```python
ops.move_plane(plane_id, parent='', index=None)
```

Path `nuspace.ops.move_plane`. Defined on `nuspace.ops.tree`, bound as a function. Builds `nu.Nu`.

Reparents and reorders in one: `index` is a position among
`parent`'s children once the plane is out of them, the end when None.
Anything moves, system planes and home too. Refused when either is
missing, or when `parent` is the plane or sits below it: that would
make a cycle. Whether it moved is in the record: the plane's parent
and its place among the children.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |
| `parent` | `nu.StrArg` | `''` |  |
| `index` | `nu.IntArg \| None` | `None` |  |

Undocumented: example.

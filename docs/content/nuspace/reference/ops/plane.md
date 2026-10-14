---
title: plane
description: "Plane ops: make one, name it, annotate it, drop it."
---

Module `nuspace.ops.plane`.

Plane ops: make one, name it, annotate it, drop it.

Its props (`system`, `ui`, `made_by`, `backend`) are set when it is
made. Its meta is free and merged into any time.

A plane's icon is `meta.icon`, a string: `"lucide:<name>"` for one of the
shell's icon pack, `"emoji:<char>"` for an emoji, `""` or absent for the
default. `plane_icon` is the one place a spelling is read.

A plane is structure plus the one run setting, its `backend`: nothing else
here says how anything runs. Which
cells are on it and in what order is `cell`; where it hangs
is `tree`; whether it is pinned is `pin`.

| Name | Call | Meaning |
| --- | --- | --- |
| [add_plane](#add_plane) | `ops.add_plane(plane_id=None, backend, name='', parent='', system=False, ui=False, made_by='', meta=None, into=None)` | Make a plane with no cells and hang it under `parent`, in one commit. |
| [remove_plane](#remove_plane) | `ops.remove_plane(plane_id)` | Drop a plane, its cells, and every plane nested below it, unpinning each. Then their state. |
| [rename_plane](#rename_plane) | `ops.rename_plane(plane_id, name)` | Set a plane's name. A no-op when it is missing. |
| [set_plane_icon](#set_plane_icon) | `ops.set_plane_icon(plane_id, icon)` | Set a plane's icon: a merge of `meta.icon`. A no-op when it is missing. |
| [set_plane_meta](#set_plane_meta) | `ops.set_plane_meta(plane_id, fields)` | Merge `fields` into a plane's meta, shallow. A no-op when it is missing. |

## add_plane

Make a plane with no cells and hang it under `parent`, in one commit.

```python
ops.add_plane(plane_id=None, backend, name='', parent='', system=False, ui=False, made_by='', meta=None, into=None)
```

Path `nuspace.ops.add_plane`. Defined on `nuspace.ops.plane`, bound as a function. Builds `nu.Nu`.

The props are written every time, so an existing plane given again takes
the ones passed now.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg \| None` | `None` | Its id. Minted when the term is evaluated when absent. An existing plane given again keeps its cells and is rewritten and moved. |
| `backend` | `nu.StrArg` |  | Prop, the backend its runs execute on, by the name it was registered under at open (`mp`, `async`). Required: there is no default, and an empty one is refused. Picked by the kind of work its cells do: many awaiting tasks run well on `async`, sync code on `mp`. |
| `name` | `nu.StrArg` | `''` | What to call it. |
| `parent` | `nu.StrArg` | `''` | The plane to hang it under, `""` for the top level. A parent that does not exist falls back to the top level. |
| `system` | `nu.BoolArg` | `False` | Prop, a protected plane, eg a service or home. `remove_plane` refuses it. |
| `ui` | `nu.BoolArg` | `False` | Prop, the shell draws it and nav brings it up when routed. |
| `made_by` | `nu.StrArg` | `''` | Prop, the registered Plane it was created from. Nothing groups by it. |
| `meta` | `dict[str, Any] \| nu.Nu \| None` | `None` | Fields to merge into its meta. |
| `into` | `nu.Ref \| None` | `None` | Set to the plane id in the commit, for a caller that needs a minted one: the record does not say which plane this call made. |

Undocumented: example.

## remove_plane

Drop a plane, its cells, and every plane nested below it, unpinning each. Then their state.

```python
ops.remove_plane(plane_id)
```

Path `nuspace.ops.remove_plane`. Defined on `nuspace.ops.plane`, bound as a function. Builds `nu.Nu`.

Refused when the plane or any plane below it is a system plane. Live
runs of every plane going are killed in the same commit, so nothing keeps
running against rows that are gone. Whether it went is in the record:
`plane_exists`.

Two commits: the rows, then their state, one subtree delete per plane
and per cell. The first writes which planes and cells went into slots
of the op's own, where the second reads them. Rows first, as
`remove_cell` does, so no plane or cell still
there reads its state gone.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |

Undocumented: example.

## rename_plane

Set a plane's name. A no-op when it is missing.

```python
ops.rename_plane(plane_id, name)
```

Path `nuspace.ops.rename_plane`. Defined on `nuspace.ops.plane`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |
| `name` | `nu.StrArg` |  |  |

Undocumented: example.

## set_plane_icon

Set a plane's icon: a merge of `meta.icon`. A no-op when it is missing.

```python
ops.set_plane_icon(plane_id, icon)
```

Path `nuspace.ops.set_plane_icon`. Defined on `nuspace.ops.plane`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  | The plane. |
| `icon` | `nu.StrArg` |  | `"lucide:<name>"`, `"emoji:<char>"`, a bare lucide name, or `""` for the default. A Python string is checked and spelled by `plane_icon`; a term is stored as it evaluates. |

Undocumented: example.

## set_plane_meta

Merge `fields` into a plane's meta, shallow. A no-op when it is missing.

```python
ops.set_plane_meta(plane_id, fields)
```

Path `nuspace.ops.set_plane_meta`. Defined on `nuspace.ops.plane`, bound as a function. Builds `nu.Nu`.

Props are not reachable from here: they are set by `add_plane`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |
| `fields` | `dict[str, Any] \| nu.Nu` |  |  |

Undocumented: example.

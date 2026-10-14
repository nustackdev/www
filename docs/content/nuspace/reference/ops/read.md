---
title: read
description: "Structure reads: what planes and cells exist, where, and in what order."
---

Module `nuspace.ops.read`.

Structure reads: what planes and cells exist, where, and in what order.

Reads are bare: they carry no bracket, so they compose into any expression
and read inside whatever bracket encloses them (an op's own transaction
sees its pending writes). Evaluated alone, wrap one in
`nustd.kv.Snapshot(..., scope=Space)`.

Container reads go through `nu.list` or `extract`: a lazy view dies
with the bracket that opened it.

| Name | Call | Meaning |
| --- | --- | --- |
| [cell_exists](#cell_exists) | `ops.cell_exists(cell_id)` | Whether a cell is stored under this id. |
| [cell_named](#cell_named) | `ops.cell_named(plane_id, name)` | The id of the first cell on a plane called `name`, `""` for none. Names are not unique. |
| [cell_plane](#cell_plane) | `ops.cell_plane(cell_id)` | The id of the plane a cell is on, `""` for no such cell. |
| [cell_rows](#cell_rows) | `ops.cell_rows(plane_id)` | A plane's cells as `id, name, prog, props, meta`, in order. One read fills an editor. |
| [cells](#cells) | `ops.cells(plane_id)` | A plane's cell ids, in order. `[]` for a plane never written. |
| [children](#children) | `ops.children(plane_id='')` | A plane's child plane ids, in order, the top level ones for `""`. |
| [parent](#parent) | `ops.parent(plane_id)` | The plane listing this one, `""` at the top level and for no such plane. One read. |
| [plane_exists](#plane_exists) | `ops.plane_exists(plane_id)` | Whether a plane is stored under this id. |
| [plane_rows](#plane_rows) | `ops.plane_rows()` | Every plane as `id, name, props, meta, parent`. One read fills a sidebar. |
| [plane_title](#plane_title) | `ops.plane_title(plane_id)` | What to call a plane: its name, its id where the name is unwritten or `""`. Bare read. |
| [planes](#planes) | `ops.planes()` | Every plane id. Minted ids sort by creation, so this is creation order. |
| [prog](#prog) | `ops.prog(cell_id)` | A cell's source, `""` where there is none. |

## cell_exists

Whether a cell is stored under this id.

```python
ops.cell_exists(cell_id)
```

Path `nuspace.ops.cell_exists`. Defined on `nuspace.ops.read`, bound as a function. Builds `nu.Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cell_id` | `nu.StrArg` |  |  |

Undocumented: example.

## cell_named

The id of the first cell on a plane called `name`, `""` for none. Names are not unique.

```python
ops.cell_named(plane_id, name)
```

Path `nuspace.ops.cell_named`. Defined on `nuspace.ops.read`, bound as a function. Builds `nu.Str`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |
| `name` | `nu.StrArg` |  |  |

Undocumented: example.

## cell_plane

The id of the plane a cell is on, `""` for no such cell.

```python
ops.cell_plane(cell_id)
```

Path `nuspace.ops.cell_plane`. Defined on `nuspace.ops.read`, bound as a function. Builds `nu.Str`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cell_id` | `nu.StrArg` |  |  |

Undocumented: example.

## cell_rows

A plane's cells as `id, name, prog, props, meta`, in order. One read fills an editor.

```python
ops.cell_rows(plane_id)
```

Path `nuspace.ops.cell_rows`. Defined on `nuspace.ops.read`, bound as a function. Builds `nu.List`.

`props` is always whole, `{made_by, has_ui}`, defaults filled in.
`has_ui` reads True where it was never worked out: maybe it draws.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |

Undocumented: example.

## cells

A plane's cell ids, in order. `[]` for a plane never written.

```python
ops.cells(plane_id)
```

Path `nuspace.ops.cells`. Defined on `nuspace.ops.read`, bound as a function. Builds `nu.List`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |

Undocumented: example.

## children

A plane's child plane ids, in order, the top level ones for `""`.

```python
ops.children(plane_id='')
```

Path `nuspace.ops.children`. Defined on `nuspace.ops.read`, bound as a function. Builds `nu.List`.

`[]` for a plane never written.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` | `''` |  |

Undocumented: example.

## parent

The plane listing this one, `""` at the top level and for no such plane. One read.

```python
ops.parent(plane_id)
```

Path `nuspace.ops.parent`. Defined on `nuspace.ops.read`, bound as a function. Builds `nu.Str`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |

Undocumented: example.

## plane_exists

Whether a plane is stored under this id.

```python
ops.plane_exists(plane_id)
```

Path `nuspace.ops.plane_exists`. Defined on `nuspace.ops.read`, bound as a function. Builds `nu.Bool`.

`contains`, since a container ref always materialises a view and
`exists()` on a row answers True either way.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |

Undocumented: example.

## plane_rows

Every plane as `id, name, props, meta, parent`. One read fills a sidebar.

```python
ops.plane_rows()
```

Path `nuspace.ops.plane_rows`. Defined on `nuspace.ops.read`, bound as a function. Builds `nu.List`.

A few reads per plane, `parent` included: `""` for a top level one.

`props` is always whole, `{system, ui, made_by, backend}`, defaults
filled in. `backend` is `""` for a plane that names none.

Undocumented: example.

## plane_title

What to call a plane: its name, its id where the name is unwritten or `""`. Bare read.

```python
ops.plane_title(plane_id)
```

Path `nuspace.ops.plane_title`. Defined on `nuspace.ops.read`, bound as a function. Builds `nu.Str`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |

Undocumented: example.

## planes

Every plane id. Minted ids sort by creation, so this is creation order.

```python
ops.planes()
```

Path `nuspace.ops.planes`. Defined on `nuspace.ops.read`, bound as a function. Builds `nu.List`.

Undocumented: example.

## prog

A cell's source, `""` where there is none.

```python
ops.prog(cell_id)
```

Path `nuspace.ops.prog`. Defined on `nuspace.ops.read`, bound as a function. Builds `nu.Str`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cell_id` | `nu.StrArg` |  |  |

Undocumented: example.

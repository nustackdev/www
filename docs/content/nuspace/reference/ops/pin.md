---
title: pin
description: "Pins: the planes pinned to the top of the sidebar, in order."
---

Module `nuspace.ops.pin`.

Pins: the planes pinned to the top of the sidebar, in order.

`Space.pinned` is the one place a pin lives, a list of plane ids. A pin is
a shortcut: the plane stays where it hangs. Only a plane the shell
draws (`props.ui`) is pinned; removing a plane unpins it and every plane
below it (`remove_plane`).

An `index` is a position in the list with the plane taken out of it. One
out of range, negative included, is the end.

| Name | Call | Meaning |
| --- | --- | --- |
| [move_pin](#move_pin) | `ops.move_pin(plane_id, index)` | Move a pinned plane to `index`. A no-op when it is not pinned. |
| [pin_plane](#pin_plane) | `ops.pin_plane(plane_id, index=None)` | Pin a plane at `index`, the end when None. One commit. |
| [pinned](#pinned) | `ops.pinned()` | The pinned plane ids, in order. `[]` when nothing was ever pinned. Bare read. |
| [unpin_plane](#unpin_plane) | `ops.unpin_plane(plane_id)` | Unpin a plane. The plane itself is left alone. A no-op when it is not pinned. |

## move_pin

Move a pinned plane to `index`. A no-op when it is not pinned.

```python
ops.move_pin(plane_id, index)
```

Path `nuspace.ops.move_pin`. Defined on `nuspace.ops.pin`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |
| `index` | `nu.IntArg` |  |  |

Undocumented: example.

## pin_plane

Pin a plane at `index`, the end when None. One commit.

```python
ops.pin_plane(plane_id, index=None)
```

Path `nuspace.ops.pin_plane`. Defined on `nuspace.ops.pin`, bound as a function. Builds `nu.Nu`.

Already pinned, it stays where it is when `index` is None and moves
there otherwise. A no-op for a plane that is missing or not drawn.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |
| `index` | `nu.IntArg \| None` | `None` |  |

Undocumented: example.

## pinned

The pinned plane ids, in order. `[]` when nothing was ever pinned. Bare read.

```python
ops.pinned()
```

Path `nuspace.ops.pinned`. Defined on `nuspace.ops.pin`, bound as a function. Builds `nu.List`.

Undocumented: example.

## unpin_plane

Unpin a plane. The plane itself is left alone. A no-op when it is not pinned.

```python
ops.unpin_plane(plane_id)
```

Path `nuspace.ops.unpin_plane`. Defined on `nuspace.ops.pin`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |

Undocumented: example.

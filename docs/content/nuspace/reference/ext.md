---
title: ext
description: "Layer zero: the extension system, what a package plugs into a space with."
---

Module `nuspace.ext`.

Layer zero: the extension system, what a package plugs into a space with.

- `specs`: `Plane`, what `+` creates, and `Snippet`,
  what `/` inserts. Plain data.
- `registry`: `Extension`, a bundle of them, found through the
  `nuspace.extensions` entry point group, and the merged `Registry`
  a space opens with.

An extension imports from here, and nothing here imports the rest of nuspace.

## Call

| Name | Call | Meaning |
| --- | --- | --- |
| [discover](#discover) | `ext.discover(group='nuspace.extensions')` | Every extension installed under `group`, in entry point order. |
| [space_registry](#space_registry) | `ext.space_registry(planes=(), snippets=(), envs=None, extensions=None, discover=True)` | What a space registers: the loose arguments, then `extensions`, then installed ones. |

### discover

Every extension installed under `group`, in entry point order.

```python
ext.discover(group='nuspace.extensions')
```

Path `nuspace.ext.discover`. Defined on `nuspace.ext.registry`, bound as a function. Builds `list[Extension]`.

Each entry point loads to an `Extension`, or to a callable
returning one. One that fails to load, or is neither, is skipped with a
`RegistryWarning`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `group` | `str` | `'nuspace.extensions'` |  |

Undocumented: example.

### space_registry

What a space registers: the loose arguments, then `extensions`, then installed ones.

```python
ext.space_registry(planes=(), snippets=(), envs=None, extensions=None, discover=True)
```

Path `nuspace.ext.space_registry`. Defined on `nuspace.ext.registry`, bound as a function. Builds `Registry`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `planes` | `Sequence[Plane]` | `()` | Planes passed directly, ahead of everything. |
| `snippets` | `Sequence[Snippet]` | `()` | Snippets passed directly. |
| `envs` | `Mapping[str, EnvFactory] \| None` | `None` | Env factories passed directly. |
| `extensions` | `Sequence[Extension] \| None` | `None` | Explicit extensions, after the loose arguments. |
| `discover` | `bool` | `True` | Also load the `nuspace.extensions` entry points. |

Undocumented: example.

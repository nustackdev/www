---
title: refs.structural
description: "Structural Refs -- bound to non-render browser APIs."
---

Module `nustd.ui.refs.structural`.

Structural Refs -- bound to non-render browser APIs.

Index-level Refs whose side effects live on the platform (window.history,
document.title), not the visible body tree.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [NavRef](#navref) | `ref` | `NavRef(address, parent_ref=None, owner_shape=None)` | Bound to window.history + window.location. Index-level structural Ref. |
| [TitleRef](#titleref) | `ref` | `TitleRef(address, parent_ref=None, owner_shape=None)` | Bound to document.title. Index-level structural Ref. |

## NavRef

Bound to window.history + window.location. Index-level structural Ref.

```python
NavRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.NavRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Bidirectional: host writes manipulate window.history; user navigation
(link clicks, back/forward) ships a `notify` whose payload is the new URI.

All four host writes compile to the `write` op. `set(uri)` ships a bare
string; the other three ship a tagged dict the browser slice dispatches on.

**Methods**

### `.set(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

Undocumented: summary, example.

### `.replace(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

Undocumented: summary, example.

### `.back()`

Builds `Nu`.

Undocumented: summary, example.

### `.forward()`

Builds `Nu`.

Undocumented: summary, example.

### `.on_change()`

Builds `Changed`.

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## TitleRef

Bound to document.title. Index-level structural Ref.

```python
TitleRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.TitleRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Write-only from host. The browser-side slice writes assignments
directly to document.title; it is not a body slot and is not
rendered into the visible tree. Slot-level `default` and `suffix`
seed the browser on mount.

**Methods**

### `.set(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

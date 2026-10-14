---
title: refs.leaves.display
description: "Display leaves -- small status and identity marks."
---

Module `nustd.ui.refs.leaves.display`.

Display leaves -- small status and identity marks.

Server-owned sinks like the content leaves: the server pushes props with
`write`, the browser only renders. A write is a partial merge of props, so
each setter sends just the keys it names. Every Ref here is a `LeafRef`.

- `AvatarRef`: an image or initials for a person or thing.
- `BreadcrumbRef`: the trail to here; the crumbs are data, not children.
- `SkeletonRef`: a loading placeholder for a cell that fetches.
- `SpinnerRef`: busy with no known progress (`ProgressRef` covers known).
- `StatusPillRef`: icon + label status that reads without color.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AvatarRef](#avatarref) | `ref` | `AvatarRef(address, parent_ref=None, owner_shape=None, props=None)` | An image for a person or thing, initials from `name` when it has none. |
| [BreadcrumbRef](#breadcrumbref) | `ref` | `BreadcrumbRef(address, parent_ref=None, owner_shape=None, props=None)` | The trail to here, as crumbs of `{label, href}`. |
| [SkeletonRef](#skeletonref) | `ref` | `SkeletonRef(address, parent_ref=None, owner_shape=None, props=None)` | A pulsing placeholder where content is still loading. |
| [SpinnerRef](#spinnerref) | `ref` | `SpinnerRef(address, parent_ref=None, owner_shape=None, props=None)` | Busy with no known progress; `ProgressRef` covers known progress. |
| [StatusPillRef](#statuspillref) | `ref` | `StatusPillRef(address, parent_ref=None, owner_shape=None, props=None)` | A state as icon + label, so it reads without color. |

## AvatarRef

An image for a person or thing, initials from `name` when it has none.

```python
AvatarRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.AvatarRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`src` is the image url; while it loads, or when it fails, the avatar
shows up to two initials from `name`. `name` is also what a screen reader
announces. `size` runs 24, 32, 40 and 48 px.

**Methods**

### `.set_src(url)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `url` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_name(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_size(name)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `Size \| StrArg` |  |  |

Undocumented: summary, example.

### `.set(src, name=<UNSET>, size=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `src` | `StrArg` |  |  |
| `name` | `StrArg` | `<UNSET>` |  |
| `size` | `Size \| StrArg` | `<UNSET>` |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## BreadcrumbRef

The trail to here, as crumbs of `{label, href}`.

```python
BreadcrumbRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.BreadcrumbRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

The last crumb is the current page and is not a link; a crumb with no
`href` reads as plain text. A plain string is a crumb with that label and
no link. An href on another host gets the external mark, like `LinkRef`.

**Methods**

### `.set(items)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `items` | `ListArg[str] \| ListArg[dict[str, str]]` |  |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## SkeletonRef

A pulsing placeholder where content is still loading.

```python
SkeletonRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.SkeletonRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`text` draws `lines` bars of text height, the last one shorter. `rect` is
one block `height` px tall (96 when 0). `circle` is a disc `height` px
across (40 when 0), for an avatar to come. Text and rect take the width
they are given; a circle keeps its size. No primary value, so no `set()`.

**Methods**

### `.set_lines(n)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `n` | `IntArg` |  |  |

Undocumented: summary, example.

### `.set_shape(name)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `SkeletonShape \| StrArg` |  |  |

Undocumented: summary, example.

### `.set_height(px)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `px` | `IntArg` |  |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## SpinnerRef

Busy with no known progress; `ProgressRef` covers known progress.

```python
SpinnerRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.SpinnerRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`label` says what it is busy with, next to the spinner and as its
accessible name ("Loading" when empty). `size` runs 14, 16, 20 and 24 px.

**Methods**

### `.set_size(name)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `Size \| StrArg` |  |  |

Undocumented: summary, example.

### `.set(label)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `label` | `StrArg` |  |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## StatusPillRef

A state as icon + label, so it reads without color.

```python
StatusPillRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.StatusPillRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Each tone draws its own icon (a triangle for `danger`, a check for `ok`,
an info mark for `warn` and `info`, a ring for `neutral`), so the state
survives color blindness and grayscale. Unlike `BadgeRef`, which tags,
a pill says what state something is in.

**Methods**

### `.set_label(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_tone(name)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `Tone \| StrArg` |  |  |

Undocumented: summary, example.

### `.set(label, tone=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `label` | `StrArg` |  |  |
| `tone` | `Tone \| StrArg` | `<UNSET>` |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

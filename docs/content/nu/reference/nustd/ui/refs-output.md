---
title: refs.output
description: "Display / output Refs -- server-owned sinks that render into the body."
---

Module `nustd.ui.refs.output`.

Display / output Refs -- server-owned sinks that render into the body.

Server pushes values via `write` / `append`; the browser only renders,
never reads back.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AlertRef](#alertref) | `ref` | `AlertRef(address, parent_ref=None, owner_shape=None)` | Display banner ref. `write` carries partial updates; `notify` fires on user dismiss. |
| [BadgeRef](#badgeref) | `ref` | `BadgeRef(address, parent_ref=None, owner_shape=None)` | Display-only badge ref. One `write` op carries every mutation. |
| [CodeBlockRef](#codeblockref) | `ref` | `CodeBlockRef(address, parent_ref=None, owner_shape=None)` | Display-only code block. One `write` carries a partial dict {code, language, show_copy}. |
| [DividerRef](#dividerref) | `ref` | `DividerRef(address, parent_ref=None, owner_shape=None)` | Display-only divider ref. One `write` op carries every mutation. |
| [GaugeRef](#gaugeref) | `ref` | `GaugeRef(address, parent_ref=None, owner_shape=None)` | Display-only gauge ref. One `write` op carries every mutation. |
| [HeadingRef](#headingref) | `ref` | `HeadingRef(address, parent_ref=None, owner_shape=None)` | Display-only heading ref. One `write` op carries every mutation. |
| [ImageRef](#imageref) | `ref` | `ImageRef(address, parent_ref=None, owner_shape=None)` | Display-only image ref. One `write` op carries every mutation. |
| [JsonViewerRef](#jsonviewerref) | `ref` | `JsonViewerRef(address, parent_ref=None, owner_shape=None)` | Display-only json viewer ref. One `write` op carries every mutation via partial-merge. |
| [LinkRef](#linkref) | `ref` | `LinkRef(address, parent_ref=None, owner_shape=None)` | Display-only link ref. One `write` op carries every mutation. |
| [MarkdownRef](#markdownref) | `ref` | `MarkdownRef(address, parent_ref=None, owner_shape=None)` | Display-only markdown ref. Source string rendered as commonmark. |
| [ProgressRef](#progressref) | `ref` | `ProgressRef(address, parent_ref=None, owner_shape=None)` | Display-only progress ref. One `write` op carries every mutation. |
| [StatRef](#statref) | `ref` | `StatRef(address, parent_ref=None, owner_shape=None)` | Display-only stat ref. Server-owned, single `write` op carries partial updates. |
| [TableRef](#tableref) | `ref` | `TableRef(address, parent_ref=None, owner_shape=None)` | Tabular data; display by default, optional sortable headers and row click. |
| [TextRef](#textref) | `ref` | `TextRef(address, parent_ref=None, owner_shape=None)` | Display-only string ref. Body copy. |

## AlertRef

Display banner ref. `write` carries partial updates; `notify` fires on user dismiss.

```python
AlertRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.AlertRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Variant maps to the Alert primitive's `tone` (5 tones per kit): `neutral`
picks the plain elevated surface, the rest attach the matching status
wash / line / fg + auto icon. The renderer falls back to `neutral` for
unmapped values.

**Methods**

### `.set_variant(name)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `Variant \| StrArg` |  |  |

Undocumented: summary, example.

### `.set_title(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_body(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_dismissible(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

Undocumented: summary, example.

### `.set(title, body=<UNSET>, variant=<UNSET>, dismissible=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `title` | `StrArg` |  |  |
| `body` | `StrArg` | `<UNSET>` |  |
| `variant` | `Variant \| StrArg` | `<UNSET>` |  |
| `dismissible` | `BoolArg` | `<UNSET>` |  |

Undocumented: summary, example.

### `.on_dismiss()`

Builds `Changed`.

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## BadgeRef

Display-only badge ref. One `write` op carries every mutation.

```python
BadgeRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.BadgeRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Variant maps to the Badge primitive's status tones; `neutral` becomes the
kit `outline` (transparent bg, muted border).

**Methods**

### `.set_label(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_variant(name)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `Variant \| StrArg` |  |  |

Undocumented: summary, example.

### `.set(label, variant=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `label` | `StrArg` |  |  |
| `variant` | `Variant \| StrArg` | `<UNSET>` |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## CodeBlockRef

Display-only code block. One `write` carries a partial dict {code, language, show_copy}.

```python
CodeBlockRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.CodeBlockRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set(code=<UNSET>, language=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `code` | `StrArg` | `<UNSET>` |  |
| `language` | `StrArg` | `<UNSET>` |  |

Undocumented: summary, example.

### `.set_code(code)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `code` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_language(language)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `language` | `StrArg` |  |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## DividerRef

Display-only divider ref. One `write` op carries every mutation.

```python
DividerRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.DividerRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_label(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_align(side)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `side` | `Align \| StrArg` |  |  |

Undocumented: summary, example.

### `.set(label, align=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `label` | `StrArg` |  |  |
| `align` | `Align \| StrArg` | `<UNSET>` |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## GaugeRef

Display-only gauge ref. One `write` op carries every mutation.

```python
GaugeRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.GaugeRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Variant is the tone the arc reads with. `neutral` maps to the kit Gauge
`accent` tone (brand purple); the other three map 1:1 to status tokens.

**Methods**

### `.set_value(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |

Undocumented: summary, example.

### `.set_caption(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_variant(variant)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `variant` | `GaugeVariant \| StrArg` |  |  |

Undocumented: summary, example.

### `.set(value, caption=<UNSET>, variant=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |
| `caption` | `StrArg` | `<UNSET>` |  |
| `variant` | `GaugeVariant \| StrArg` | `<UNSET>` |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## HeadingRef

Display-only heading ref. One `write` op carries every mutation.

```python
HeadingRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.HeadingRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_label(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_level(n)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `n` | `IntArg` |  |  |

Undocumented: summary, example.

### `.set_align(side)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `side` | `Align \| StrArg` |  |  |

Undocumented: summary, example.

### `.set(label, level=<UNSET>, align=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `label` | `StrArg` |  |  |
| `level` | `IntArg` | `<UNSET>` |  |
| `align` | `Align \| StrArg` | `<UNSET>` |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## ImageRef

Display-only image ref. One `write` op carries every mutation.

```python
ImageRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.ImageRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_src(url)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `url` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_alt(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_fit(mode)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `mode` | `Fit \| StrArg` |  |  |

Undocumented: summary, example.

### `.set_size(width, height)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `width` | `IntArg \| None` |  |  |
| `height` | `IntArg \| None` |  |  |

Undocumented: summary, example.

### `.set_rounded(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

Undocumented: summary, example.

### `.set(src, alt=<UNSET>, fit=<UNSET>, width=<UNSET>, height=<UNSET>, rounded=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `src` | `StrArg` |  |  |
| `alt` | `StrArg` | `<UNSET>` |  |
| `fit` | `Fit \| StrArg` | `<UNSET>` |  |
| `width` | `IntArg` | `<UNSET>` |  |
| `height` | `IntArg` | `<UNSET>` |  |
| `rounded` | `BoolArg` | `<UNSET>` |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## JsonViewerRef

Display-only json viewer ref. One `write` op carries every mutation via partial-merge.

```python
JsonViewerRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.JsonViewerRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_value(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[Any]` |  |  |

Undocumented: summary, example.

### `.set_expand_depth(depth)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `depth` | `IntArg` |  |  |

Undocumented: summary, example.

### `.set_theme(name)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `Theme \| StrArg` |  |  |

Undocumented: summary, example.

### `.set_copyable(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

Undocumented: summary, example.

### `.set_sortable(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

Undocumented: summary, example.

### `.set_max_height(px)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `px` | `IntArg \| None` |  |  |

Undocumented: summary, example.

### `.set(value, expand_depth=<UNSET>, theme=<UNSET>, copyable=<UNSET>, sortable=<UNSET>, max_height=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Arg[Any]` |  |  |
| `expand_depth` | `IntArg` | `<UNSET>` |  |
| `theme` | `Theme \| StrArg` | `<UNSET>` |  |
| `copyable` | `BoolArg` | `<UNSET>` |  |
| `sortable` | `BoolArg` | `<UNSET>` |  |
| `max_height` | `IntArg` | `<UNSET>` |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## LinkRef

Display-only link ref. One `write` op carries every mutation.

```python
LinkRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.LinkRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_href(url)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `url` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_label(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_target(name)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `Target \| StrArg` |  |  |

Undocumented: summary, example.

### `.set_external(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg \| None` |  |  |

Undocumented: summary, example.

### `.set(href=<UNSET>, label=<UNSET>, target=<UNSET>, external=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `href` | `StrArg` | `<UNSET>` |  |
| `label` | `StrArg` | `<UNSET>` |  |
| `target` | `Target \| StrArg` | `<UNSET>` |  |
| `external` | `BoolArg \| None` | `<UNSET>` |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## MarkdownRef

Display-only markdown ref. Source string rendered as commonmark.

```python
MarkdownRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.MarkdownRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

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

## ProgressRef

Display-only progress ref. One `write` op carries every mutation.

```python
ProgressRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.ProgressRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_value(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |

Undocumented: summary, example.

### `.set_caption(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_indeterminate(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

Undocumented: summary, example.

### `.set(value, caption=<UNSET>, indeterminate=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |
| `caption` | `StrArg` | `<UNSET>` |  |
| `indeterminate` | `BoolArg` | `<UNSET>` |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## StatRef

Display-only stat ref. Server-owned, single `write` op carries partial updates.

```python
StatRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.StatRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_label(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_value(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_delta(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_trend(name)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `Trend \| StrArg` |  |  |

Undocumented: summary, example.

### `.set(value, label=<UNSET>, delta=<UNSET>, trend=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |
| `label` | `StrArg` | `<UNSET>` |  |
| `delta` | `StrArg` | `<UNSET>` |  |
| `trend` | `Trend \| StrArg` | `<UNSET>` |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## TableRef

Tabular data; display by default, optional sortable headers and row click.

```python
TableRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.TableRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Composes the kit Table primitive family. `dense=True` maps to the
primitive's `compact` density; `striped=True` selects the `striped` variant.

**Methods**

### `.set(table)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `table` | `DictArg[str, Any]` |  |  |

Undocumented: summary, example.

### `.clear()`

Builds `Nu`.

Undocumented: summary, example.

### `.append(row)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `row` | `ListArg[Any]` |  |  |

Undocumented: summary, example.

### `.set_sort(column, direction)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `column` | `StrArg` |  |  |
| `direction` | `SortDirection \| StrArg` |  |  |

Undocumented: summary, example.

### `.on_row_click()`

Builds `Changed`.

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## TextRef

Display-only string ref. Body copy.

```python
TextRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.TextRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

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

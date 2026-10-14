---
title: refs.leaves.input
description: "Input Refs -- tab-owned; server reads via `read` + `notify` path."
---

Module `nustd.ui.refs.leaves.input`.

Input Refs -- tab-owned; server reads via `read` + `notify` path.

Also home to the two Refs with both faces, `MarkdownRef` and `CodeRef`:
read-only by default, editable on request, readable either way.

The browser owns the live value. Host reads via `Ref` (round-trip
through session), subscribes to changes via `.on_change()` / `.on_click()`.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ButtonRef](#buttonref) | `ref` | `ButtonRef(address, parent_ref=None, owner_shape=None, props=None)` | Click trigger; subscribe via `.on_click()`. |
| [CheckboxRef](#checkboxref) | `ref` | `CheckboxRef(address, parent_ref=None, owner_shape=None, props=None)` | Boolean toggle whose checked state lives in the browser. |
| [CodeRef](#coderef) | `ref` | `CodeRef(address, parent_ref=None, owner_shape=None, props=None)` | Source code, read-only by default. Value is the text, both ways. |
| [DatePickerRef](#datepickerref) | `ref` | `DatePickerRef(address, parent_ref=None, owner_shape=None, props=None)` | Date input whose ISO yyyy-mm-dd value lives in the browser. |
| [InputRef](#inputref) | `ref` | `InputRef(address, parent_ref=None, owner_shape=None, props=None)` | Text input whose value lives in the browser. |
| [MarkdownRef](#markdownref) | `ref` | `MarkdownRef(address, parent_ref=None, owner_shape=None, props=None)` | A markdown document, read-only by default. Value is the markdown, both ways. |
| [NumberInputRef](#numberinputref) | `ref` | `NumberInputRef(address, parent_ref=None, owner_shape=None, props=None)` | Numeric input whose value lives in the browser. |
| [RadioGroupRef](#radiogroupref) | `ref` | `RadioGroupRef(address, parent_ref=None, owner_shape=None, props=None)` | Single-choice radio group whose value lives in the browser. |
| [SelectRef](#selectref) | `ref` | `SelectRef(address, parent_ref=None, owner_shape=None, props=None)` | Dropdown single-select whose value lives in the browser. |
| [SketchRef](#sketchref) | `ref` | `SketchRef(address, parent_ref=None, owner_shape=None, props=None)` | A board a person draws on with a pointer; the elements live in the browser. |
| [SliderRef](#sliderref) | `ref` | `SliderRef(address, parent_ref=None, owner_shape=None, props=None)` | Numeric slider whose value lives in the browser. |
| [SwitchRef](#switchref) | `ref` | `SwitchRef(address, parent_ref=None, owner_shape=None, props=None)` | On/off switch whose checked state lives in the browser. |
| [TagInputRef](#taginputref) | `ref` | `TagInputRef(address, parent_ref=None, owner_shape=None, props=None)` | Multi-tag entry field whose committed list lives in the browser. |
| [TextAreaRef](#textarearef) | `ref` | `TextAreaRef(address, parent_ref=None, owner_shape=None, props=None)` | Multi-line text input whose value lives in the browser. |
| [ToggleRef](#toggleref) | `ref` | `ToggleRef(address, parent_ref=None, owner_shape=None, props=None)` | Two-state toolbar button whose pressed state lives in the browser. |

## ButtonRef

Click trigger; subscribe via `.on_click()`.

```python
ButtonRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.ButtonRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`icon` names a lucide icon in kebab case, drawn before the label. With an
empty label the button draws as a square icon button, named for screen
readers by `tooltip` (or the icon name when there is none). `tooltip` is
the hover hint, shown whenever it is set.

The kit ships a curated set, not all of lucide: plus, minus, x, check,
play, pause, square, skip-forward, refresh-cw, rotate-ccw, undo-2, redo-2,
search, filter, settings, sliders-horizontal, more-horizontal,
more-vertical, trash-2, pencil, copy, save, download, upload, send, share-2,
external-link, link, chevron-left, chevron-right, chevron-up, chevron-down,
arrow-left, arrow-right, arrow-up, arrow-down, maximize-2, minimize-2,
info, circle-help, triangle-alert, bell, star, heart, bookmark, pin, eye,
eye-off, lock, unlock, sun, moon, sparkles, zap, bold, italic, underline,
code, terminal, wrap-text, list, layout-grid, file, file-text, folder,
home. An unknown name draws the label alone.

**Methods**

### `.on_click()`

Builds `Changed`.

Undocumented: summary, example.

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

### `.set_disabled(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

Undocumented: summary, example.

### `.set_icon(name)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_tooltip(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set(label, variant=<UNSET>, disabled=<UNSET>, icon=<UNSET>, tooltip=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `label` | `StrArg` |  |  |
| `variant` | `Variant \| StrArg` | `<UNSET>` |  |
| `disabled` | `BoolArg` | `<UNSET>` |  |
| `icon` | `StrArg` | `<UNSET>` |  |
| `tooltip` | `StrArg` | `<UNSET>` |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## CheckboxRef

Boolean toggle whose checked state lives in the browser.

```python
CheckboxRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.CheckboxRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `BoolArg` |  |  |

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

## CodeRef

Source code, read-only by default. Value is the text, both ways.

```python
CodeRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.CodeRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Read-only it renders a highlighted block with a copy button. With
`editable=True` the same view becomes an editor: the server seeds the text
with `set`, reads it back through `Ref` like any input Ref, and subscribes
with `on_change()`. The browser commits on cmd+enter and on blur, not on
every keystroke, so a read between commits sees the last committed text
and not what is under the caret. One engine for both modes, so flipping
`editable` never changes how the code looks.

Last actor wins, same as `MarkdownRef`. A `set` from the server replaces
the buffer outright, a notify from the browser replaces the server's
copy, and there is no merge.

**Methods**

### `.set(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_language(name)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_editable(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

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

## DatePickerRef

Date input whose ISO yyyy-mm-dd value lives in the browser.

```python
DatePickerRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.DatePickerRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

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

## InputRef

Text input whose value lives in the browser.

```python
InputRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.InputRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Default face is display (Inter); code-shaped fields opt into
JetBrains Mono via `mono=True`, which flips `font-mono` at render time.

**Methods**

### `.set(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

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

## MarkdownRef

A markdown document, read-only by default. Value is the markdown, both ways.

```python
MarkdownRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.MarkdownRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

The browser never shows the source. Read-only it renders the document;
with `editable=True` the same view becomes a live wysiwyg editor: the
server writes the source with `set`, reads it back through `Ref` like any
input Ref, and subscribes with `on_change()`. The browser notifies back
on a quiet moment or on blur. One engine for both modes, so a document
looks the same whether or not you can type in it.

The dialect: paragraphs, headings, bullet, numbered and checkbox lists,
quotes, code fences, GFM pipe tables, rules, images, bold, italic, inline
code and links. Code fences are syntax highlighted, with a language picker
when editable. Table cells hold inline content only, a pipe inside one is
backslash-escaped, and the editor writes every table in one form (outer
pipes, one space of padding, `---` / `:---` / `:---:` / `---:` delimiters).

Last actor wins. There is no merge, no OT, no CRDT: a `set` from the
server replaces the document outright, and a notify from the browser
replaces the server's copy. Two people typing into the same Ref at the
same time will clobber each other, by design.

**Methods**

### `.set(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_placeholder(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_editable(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

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

## NumberInputRef

Numeric input whose value lives in the browser.

```python
NumberInputRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.NumberInputRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_value(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |

Undocumented: summary, example.

### `.set_min(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg \| None` |  |  |

Undocumented: summary, example.

### `.set_max(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg \| None` |  |  |

Undocumented: summary, example.

### `.set_step(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |

Undocumented: summary, example.

### `.set_label(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set(value, min=<UNSET>, max=<UNSET>, step=<UNSET>, label=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |
| `min` | `FloatArg` | `<UNSET>` |  |
| `max` | `FloatArg` | `<UNSET>` |  |
| `step` | `FloatArg` | `<UNSET>` |  |
| `label` | `StrArg` | `<UNSET>` |  |

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

## RadioGroupRef

Single-choice radio group whose value lives in the browser.

```python
RadioGroupRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.RadioGroupRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_options(opts)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `opts` | `ListArg[str] \| ListArg[dict[str, str]]` |  |  |

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

## SelectRef

Dropdown single-select whose value lives in the browser.

```python
SelectRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.SelectRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`searchable=True` swaps the picker for one with a filter field, for long
option lists. Options, value, reads and notifies stay the same.

**Methods**

### `.set(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_options(opts)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `opts` | `ListArg[str] \| ListArg[dict[str, str]]` |  |  |

Undocumented: summary, example.

### `.set_searchable(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

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

## SketchRef

A board a person draws on with a pointer; the elements live in the browser.

```python
SketchRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.SketchRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Pen ink (pressure-aware from a pen), rects, ellipses, lines and arrows,
with a small floating toolbar for the tool, colors, size, undo, redo and
clear. A program draws on it too: write elements and they appear.

The value is a list of elements, every coordinate normalized to 0..1 of
the board with the origin top-left, `width` a fraction of the board's
shorter side:

```python
{"type": "path", "points": [[x, y], [x, y, pressure], ...], "stroke": "ink", "width": 0.012}
{"type": "rect" | "ellipse", "x": .., "y": .., "w": .., "h": .., "stroke": .., "fill": .., "width": ..}
{"type": "line" | "arrow", "points": [[x1, y1], [x2, y2]], "stroke": .., "width": ..}
```

A color is a palette name that follows the theme (`ink`, `gray`,
`red`, `amber`, `green`, `blue`, `violet`, each also as
`<name>-soft` for fills) or any CSS color (`"#e11d48"`). `"none"` is
no fill. A written element may leave out `stroke`, `fill` and
`width`; the board fills them from `defaults`, so a read always has
them.

The browser sends once per element, when the pointer lifts, and once per
undo, redo and clear, so `on_change()` fires on those and never per
move. `set(elements)` draws from the server, `set([])` or `clear()`
wipes, and reading the Ref gives the elements. Last actor wins: a `set`
replaces the board outright and starts its undo history over.

**Methods**

### `.set(elements)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `elements` | `ListArg[dict[str, Any]]` |  |  |

Undocumented: summary, example.

### `.clear()`

Builds `Nu`.

Undocumented: summary, example.

### `.set_label(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_readonly(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

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

## SliderRef

Numeric slider whose value lives in the browser.

```python
SliderRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.SliderRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_value(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |

Undocumented: summary, example.

### `.set_min(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |

Undocumented: summary, example.

### `.set_max(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |

Undocumented: summary, example.

### `.set_step(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |

Undocumented: summary, example.

### `.set_label(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_show_value(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

Undocumented: summary, example.

### `.set(value, min=<UNSET>, max=<UNSET>, step=<UNSET>, label=<UNSET>, show_value=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |
| `min` | `FloatArg` | `<UNSET>` |  |
| `max` | `FloatArg` | `<UNSET>` |  |
| `step` | `FloatArg` | `<UNSET>` |  |
| `label` | `StrArg` | `<UNSET>` |  |
| `show_value` | `BoolArg` | `<UNSET>` |  |

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

## SwitchRef

On/off switch whose checked state lives in the browser.

```python
SwitchRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.SwitchRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `BoolArg` |  |  |

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

## TagInputRef

Multi-tag entry field whose committed list lives in the browser.

```python
TagInputRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.TagInputRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `ListArg[str]` |  |  |

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

## TextAreaRef

Multi-line text input whose value lives in the browser.

```python
TextAreaRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.TextAreaRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`auto_resize=True` maps to the primitive's `field-sizing: content` mode.
Default face is display (Inter); set `mono=True` at class level for
code-shaped fields to flip `font-mono` at render.

**Methods**

### `.set(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

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

## ToggleRef

Two-state toolbar button whose pressed state lives in the browser.

```python
ToggleRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.ToggleRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Pressed or not is the value, read live like `SwitchRef`'s. `SwitchRef`
stays the control for a setting; this is for a toolbar (bold, wrap, pin).
`icon` takes the same lucide names as `ButtonRef.icon`, drawn before the
label; with an empty label the icon name is the accessible name.

**Methods**

### `.set(pressed)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `pressed` | `BoolArg` |  |  |

Undocumented: summary, example.

### `.set_label(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_icon(name)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `StrArg` |  |  |

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

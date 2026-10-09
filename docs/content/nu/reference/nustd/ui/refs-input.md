---
title: refs.input
description: "Input Refs -- tab-owned; server reads via `read` + `notify` path."
---

Module `nustd.ui.refs.input`.

Input Refs -- tab-owned; server reads via `read` + `notify` path.

The browser owns the live value. Host reads via `Ref` (round-trip
through session), subscribes to changes via `.on_change()` / `.on_click()`.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ButtonRef](#buttonref) | `ref` | `ButtonRef(address, parent_ref=None, owner_shape=None)` | Click trigger; subscribe via `.on_click()`. |
| [CheckboxRef](#checkboxref) | `ref` | `CheckboxRef(address, parent_ref=None, owner_shape=None)` | Boolean toggle whose checked state lives in the browser. |
| [DatePickerRef](#datepickerref) | `ref` | `DatePickerRef(address, parent_ref=None, owner_shape=None)` | Date input whose ISO yyyy-mm-dd value lives in the browser. |
| [InputRef](#inputref) | `ref` | `InputRef(address, parent_ref=None, owner_shape=None)` | Text input whose value lives in the browser. |
| [MonacoRef](#monacoref) | `ref` | `MonacoRef(address, parent_ref=None, owner_shape=None)` | Editable source code. Value is the text; the browser edits it in a real editor. |
| [NumberInputRef](#numberinputref) | `ref` | `NumberInputRef(address, parent_ref=None, owner_shape=None)` | Numeric input whose value lives in the browser. |
| [ProseRef](#proseref) | `ref` | `ProseRef(address, parent_ref=None, owner_shape=None)` | Editable rich text. Value is a markdown string; the browser edits wysiwyg. |
| [RadioGroupRef](#radiogroupref) | `ref` | `RadioGroupRef(address, parent_ref=None, owner_shape=None)` | Single-choice radio group whose value lives in the browser. |
| [SelectRef](#selectref) | `ref` | `SelectRef(address, parent_ref=None, owner_shape=None)` | Dropdown single-select whose value lives in the browser. |
| [SliderRef](#sliderref) | `ref` | `SliderRef(address, parent_ref=None, owner_shape=None)` | Numeric slider whose value lives in the browser. |
| [SwitchRef](#switchref) | `ref` | `SwitchRef(address, parent_ref=None, owner_shape=None)` | On/off switch whose checked state lives in the browser. |
| [TagInputRef](#taginputref) | `ref` | `TagInputRef(address, parent_ref=None, owner_shape=None)` | Multi-tag entry field whose committed list lives in the browser. |
| [TextAreaRef](#textarearef) | `ref` | `TextAreaRef(address, parent_ref=None, owner_shape=None)` | Multi-line text input whose value lives in the browser. |

## ButtonRef

Click trigger; subscribe via `.on_click()`.

```python
ButtonRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.ButtonRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

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

### `.set(label, variant=<UNSET>, disabled=<UNSET>, icon=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `label` | `StrArg` |  |  |
| `variant` | `Variant \| StrArg` | `<UNSET>` |  |
| `disabled` | `BoolArg` | `<UNSET>` |  |
| `icon` | `StrArg` | `<UNSET>` |  |

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
CheckboxRef(address, parent_ref=None, owner_shape=None)
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

## DatePickerRef

Date input whose ISO yyyy-mm-dd value lives in the browser.

```python
DatePickerRef(address, parent_ref=None, owner_shape=None)
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
InputRef(address, parent_ref=None, owner_shape=None)
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

## MonacoRef

Editable source code. Value is the text; the browser edits it in a real editor.

```python
MonacoRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.MonacoRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Bidirectional, unlike `CodeBlockRef` (display-only). The server seeds the
text with `set`, reads it back through `Ref` like any input Ref, and
subscribes with `on_change()`. The browser commits on cmd+enter and on
blur, not on every keystroke, so a read between commits sees the last
committed text and not what is under the caret.

Last actor wins, same as `ProseRef`. A `set` from the server replaces the
buffer outright, a notify from the browser replaces the server's copy,
and there is no merge.

The browser pays for a large editor chunk the first time one of these
mounts, so a code surface nobody edits wants `CodeBlockRef` instead.

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

### `.set_read_only(flag)`

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
NumberInputRef(address, parent_ref=None, owner_shape=None)
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

## ProseRef

Editable rich text. Value is a markdown string; the browser edits wysiwyg.

```python
ProseRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.ProseRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Bidirectional, unlike `MarkdownRef` (display-only). The server writes the
source with `set`, reads it back through `Ref` like any input Ref, and
subscribes with `on_change()`. The browser renders the markdown as a live
document and notifies back on a quiet moment or on blur.

Last actor wins. There is no merge, no OT, no CRDT: a `set` from the
server replaces the document outright, and a notify from the browser
replaces the server's copy. Two people typing into the same Ref at the
same time will clobber each other, by design.

`read_only=True` renders the same document but refuses edits, so a
program can reuse one renderer for both faces.

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

### `.set_read_only(flag)`

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

## RadioGroupRef

Single-choice radio group whose value lives in the browser.

```python
RadioGroupRef(address, parent_ref=None, owner_shape=None)
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
SelectRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.SelectRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

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

## SliderRef

Numeric slider whose value lives in the browser.

```python
SliderRef(address, parent_ref=None, owner_shape=None)
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
SwitchRef(address, parent_ref=None, owner_shape=None)
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
TagInputRef(address, parent_ref=None, owner_shape=None)
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
TextAreaRef(address, parent_ref=None, owner_shape=None)
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

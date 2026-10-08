---
title: ui
description: "nustd.ui -- component fabric."
---

Module `nustd.ui`.

nustd.ui -- component fabric.

Layout under `src/nustd/ui/`:

- `lens/`   -- the Shape lens: `LensRef`, the walk that turns a Shape and
                 a cursor into columns, and `browse` to assemble the two.
- `core/`   -- host-independent UI fabric: `Ref`, `Section` /
                 `SectionRef`, abstract `Session` / `Subscription`,
                 wire `Frame` + interactions (`Write` / `Append` /
                 `Remove` / `Changed`). Reusable by any host.
- `refs/`   -- widget kit (Row, Card, Table, Input, ...); depends only on core.
- `nudle/`  -- Page-based host: `Index` / `Page` / `PageRef`, the
                 `Boot` term, and the `serve` preset that assembles a
                 whole tree.

The uvicorn lifecycle, the book of live connections and the per-connection
fold live in `nustd.ws_server`, which knows nothing about ui.

The browser half is not in this package. It lives in the repo's npm workspace
at `pkgs/ts` (`ui-core`, `ui-kit`, and the `nudle` Vite app), and its
compiled bundle ships as the separate `nudle` wheel.

The public entry is `nustd.ui` itself: the core fabric, the widget kit and
the nudle host names are re-exported flat, so one `import nustd.ui` reaches
everything a UI program spells. The lens is the exception and stays whole
behind `nustd.ui.lens`, `LensRef` included: it is a subsystem rather than
a widget, and a surface split between two names is worse than one more dot.

**Modules**

| Module | What |
| --- | --- |
| [`nustd.ui.lens`](/docs/reference/nustd/ui/lens) | nustd.ui.lens -- any Nu Shape, browsable as cascading columns. |

## core.interactions

Module `nustd.ui.core.interactions`.

Wire interactions -- ops that flow over a Session on a Ref.

[Full entries](/docs/reference/nustd/ui/core-interactions)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Append](/docs/reference/nustd/ui/core-interactions#append) | `scalar_command` | `Append()` | Send an `append` frame on a Ref -- push onto a sequence. |
| [Changed](/docs/reference/nustd/ui/core-interactions#changed) | `scalar_query` | `Changed()` | Subscribe to client-side change notifications on a Ref. |
| [Remove](/docs/reference/nustd/ui/core-interactions#remove) | `scalar_command` | `Remove()` | Send a `remove` frame on a Ref -- drop its node and its whole subtree. |
| [Write](/docs/reference/nustd/ui/core-interactions#write) | `scalar_command` | `Write()` | Send a `write` frame on a Ref -- replace the value. |

## nudle.page

Module `nustd.ui.nudle.page`.

Top-level Shape kinds for nudle, and the term that boots one.

[Full entries](/docs/reference/nustd/ui/nudle-page)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Boot](/docs/reference/nustd/ui/nudle-page#boot) | `scalar_command` | `Boot(shape_cls)` | Seed one browser's tree: clear it, name it, then one `init` per slot. |
| [PageRef](/docs/reference/nustd/ui/nudle-page#pageref) | `ref` | `PageRef(address, section_cls, parent_ref=None, owner_shape=None)` | Substrate Ref backing a Page slot on an Index. |
| [Index](/docs/reference/nustd/ui/nudle-page#index) |  |  | Browser entrypoint. One per app. |
| [Page](/docs/reference/nustd/ui/nudle-page#page) |  |  | Section an Index mounts at a route. |

## refs.output

Module `nustd.ui.refs.output`.

Display / output Refs -- server-owned sinks that render into the body.

[Full entries](/docs/reference/nustd/ui/refs-output)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AlertRef](/docs/reference/nustd/ui/refs-output#alertref) | `ref` | `AlertRef(address, parent_ref=None, owner_shape=None)` | Display banner ref. `write` carries partial updates; `notify` fires on user dismiss. |
| [BadgeRef](/docs/reference/nustd/ui/refs-output#badgeref) | `ref` | `BadgeRef(address, parent_ref=None, owner_shape=None)` | Display-only badge ref. One `write` op carries every mutation. |
| [CodeBlockRef](/docs/reference/nustd/ui/refs-output#codeblockref) | `ref` | `CodeBlockRef(address, parent_ref=None, owner_shape=None)` | Display-only code block. One `write` carries a partial dict {code, language, show_copy}. |
| [DividerRef](/docs/reference/nustd/ui/refs-output#dividerref) | `ref` | `DividerRef(address, parent_ref=None, owner_shape=None)` | Display-only divider ref. One `write` op carries every mutation. |
| [GaugeRef](/docs/reference/nustd/ui/refs-output#gaugeref) | `ref` | `GaugeRef(address, parent_ref=None, owner_shape=None)` | Display-only gauge ref. One `write` op carries every mutation. |
| [HeadingRef](/docs/reference/nustd/ui/refs-output#headingref) | `ref` | `HeadingRef(address, parent_ref=None, owner_shape=None)` | Display-only heading ref. One `write` op carries every mutation. |
| [ImageRef](/docs/reference/nustd/ui/refs-output#imageref) | `ref` | `ImageRef(address, parent_ref=None, owner_shape=None)` | Display-only image ref. One `write` op carries every mutation. |
| [JsonViewerRef](/docs/reference/nustd/ui/refs-output#jsonviewerref) | `ref` | `JsonViewerRef(address, parent_ref=None, owner_shape=None)` | Display-only json viewer ref. One `write` op carries every mutation via partial-merge. |
| [LinkRef](/docs/reference/nustd/ui/refs-output#linkref) | `ref` | `LinkRef(address, parent_ref=None, owner_shape=None)` | Display-only link ref. One `write` op carries every mutation. |
| [MarkdownRef](/docs/reference/nustd/ui/refs-output#markdownref) | `ref` | `MarkdownRef(address, parent_ref=None, owner_shape=None)` | Display-only markdown ref. Source string rendered as commonmark. |
| [ProgressRef](/docs/reference/nustd/ui/refs-output#progressref) | `ref` | `ProgressRef(address, parent_ref=None, owner_shape=None)` | Display-only progress ref. One `write` op carries every mutation. |
| [StatRef](/docs/reference/nustd/ui/refs-output#statref) | `ref` | `StatRef(address, parent_ref=None, owner_shape=None)` | Display-only stat ref. Server-owned, single `write` op carries partial updates. |
| [TableRef](/docs/reference/nustd/ui/refs-output#tableref) | `ref` | `TableRef(address, parent_ref=None, owner_shape=None)` | Tabular data; display by default, optional sortable headers and row click. |
| [TextRef](/docs/reference/nustd/ui/refs-output#textref) | `ref` | `TextRef(address, parent_ref=None, owner_shape=None)` | Display-only string ref. Body copy. |

## refs.chart

Module `nustd.ui.refs.chart`.

Chart Refs -- typed visualization sinks over series payloads.

[Full entries](/docs/reference/nustd/ui/refs-chart)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AreaChart](/docs/reference/nustd/ui/refs-chart#areachart) | `ref` | `AreaChart(address, parent_ref=None, owner_shape=None)` | Display-only area chart. `write` (partial) and `append` (one row). |
| [BarChart](/docs/reference/nustd/ui/refs-chart#barchart) | `ref` | `BarChart(address, parent_ref=None, owner_shape=None)` | Display-only chart ref. `write` (partial) and `append` (one bar). |
| [LineChart](/docs/reference/nustd/ui/refs-chart#linechart) | `ref` | `LineChart(address, parent_ref=None, owner_shape=None)` | Display-only chart ref. `write` (partial) and `append` (one point or one series row). |
| [PieChart](/docs/reference/nustd/ui/refs-chart#piechart) | `ref` | `PieChart(address, parent_ref=None, owner_shape=None)` | Display-only pie chart ref. `write` (partial) and `append` (one slice). |
| [Sparkline](/docs/reference/nustd/ui/refs-chart#sparkline) | `ref` | `Sparkline(address, parent_ref=None, owner_shape=None)` | Display-only inline trend line. `write` (partial) and `append` (one point). |

## refs.input

Module `nustd.ui.refs.input`.

Input Refs -- tab-owned; server reads via `read` + `notify` path.

[Full entries](/docs/reference/nustd/ui/refs-input)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ButtonRef](/docs/reference/nustd/ui/refs-input#buttonref) | `ref` | `ButtonRef(address, parent_ref=None, owner_shape=None)` | Click trigger; subscribe via `.on_click()`. |
| [CheckboxRef](/docs/reference/nustd/ui/refs-input#checkboxref) | `ref` | `CheckboxRef(address, parent_ref=None, owner_shape=None)` | Boolean toggle whose checked state lives in the browser. |
| [DatePickerRef](/docs/reference/nustd/ui/refs-input#datepickerref) | `ref` | `DatePickerRef(address, parent_ref=None, owner_shape=None)` | Date input whose ISO yyyy-mm-dd value lives in the browser. |
| [InputRef](/docs/reference/nustd/ui/refs-input#inputref) | `ref` | `InputRef(address, parent_ref=None, owner_shape=None)` | Text input whose value lives in the browser. |
| [MonacoRef](/docs/reference/nustd/ui/refs-input#monacoref) | `ref` | `MonacoRef(address, parent_ref=None, owner_shape=None)` | Editable source code. Value is the text; the browser edits it in a real editor. |
| [NumberInputRef](/docs/reference/nustd/ui/refs-input#numberinputref) | `ref` | `NumberInputRef(address, parent_ref=None, owner_shape=None)` | Numeric input whose value lives in the browser. |
| [ProseRef](/docs/reference/nustd/ui/refs-input#proseref) | `ref` | `ProseRef(address, parent_ref=None, owner_shape=None)` | Editable rich text. Value is a markdown string; the browser edits wysiwyg. |
| [RadioGroupRef](/docs/reference/nustd/ui/refs-input#radiogroupref) | `ref` | `RadioGroupRef(address, parent_ref=None, owner_shape=None)` | Single-choice radio group whose value lives in the browser. |
| [SelectRef](/docs/reference/nustd/ui/refs-input#selectref) | `ref` | `SelectRef(address, parent_ref=None, owner_shape=None)` | Dropdown single-select whose value lives in the browser. |
| [SliderRef](/docs/reference/nustd/ui/refs-input#sliderref) | `ref` | `SliderRef(address, parent_ref=None, owner_shape=None)` | Numeric slider whose value lives in the browser. |
| [SwitchRef](/docs/reference/nustd/ui/refs-input#switchref) | `ref` | `SwitchRef(address, parent_ref=None, owner_shape=None)` | On/off switch whose checked state lives in the browser. |
| [TagInputRef](/docs/reference/nustd/ui/refs-input#taginputref) | `ref` | `TagInputRef(address, parent_ref=None, owner_shape=None)` | Multi-tag entry field whose committed list lives in the browser. |
| [TextAreaRef](/docs/reference/nustd/ui/refs-input#textarearef) | `ref` | `TextAreaRef(address, parent_ref=None, owner_shape=None)` | Multi-line text input whose value lives in the browser. |

## refs.structural

Module `nustd.ui.refs.structural`.

Structural Refs -- bound to non-render browser APIs.

[Full entries](/docs/reference/nustd/ui/refs-structural)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [NavRef](/docs/reference/nustd/ui/refs-structural#navref) | `ref` | `NavRef(address, parent_ref=None, owner_shape=None)` | Bound to window.history + window.location. Index-level structural Ref. |
| [TitleRef](/docs/reference/nustd/ui/refs-structural#titleref) | `ref` | `TitleRef(address, parent_ref=None, owner_shape=None)` | Bound to document.title. Index-level structural Ref. |

## core.base

Module `nustd.ui.core.base`.

Generic UI Ref -- host-independent base for the widget kit.

[Full entries](/docs/reference/nustd/ui/core-base)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Ref](/docs/reference/nustd/ui/core-base#ref) | `ref` | `Ref(address, parent_ref=None, owner_shape=None)` | Base for Refs backed by a client rendering surface. Async-only. |

## core.section

Module `nustd.ui.core.section`.

Section -- shape-based container primitive for the UI kit.

[Full entries](/docs/reference/nustd/ui/core-section)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [SectionRef](/docs/reference/nustd/ui/core-section#sectionref) | `ref` | `SectionRef(address, section_cls, parent_ref=None, owner_shape=None)` | Substrate Ref backing a Section slot. |
| [Section](/docs/reference/nustd/ui/core-section#section) |  |  | Base for shape-based layout primitives. |

## refs.layout

Module `nustd.ui.refs.layout`.

Layout Sections -- Shape-based containers that wrap other Refs.

[Full entries](/docs/reference/nustd/ui/refs-layout)

| Name | Call | Meaning |
| --- | --- | --- |
| [Accordion](/docs/reference/nustd/ui/refs-layout#accordion) |  | Stack of collapsible sections. Tab owns open state, server owns the section list. |
| [Card](/docs/reference/nustd/ui/refs-layout#card) |  | Card-styled Section: title + subtitle + body slots + footer. |
| [Column](/docs/reference/nustd/ui/refs-layout#column) |  | Vertical flex layout. Pin chrome on the slot(). |
| [Container](/docs/reference/nustd/ui/refs-layout#container) |  | Styled card-like box. Pin chrome on slot(). |
| [Field](/docs/reference/nustd/ui/refs-layout#field) |  | Label + child input + help / error text. Exactly one child slot. |
| [Fieldset](/docs/reference/nustd/ui/refs-layout#fieldset) |  | Grouped fields with a legend. Display-only, server-owned. |
| [Form](/docs/reference/nustd/ui/refs-layout#form) |  | Semantic form wrapper. Pin chrome on slot(); submit lives on a child ButtonRef. |
| [Modal](/docs/reference/nustd/ui/refs-layout#modal) |  | Dialog overlay. Pin chrome on slot(); declare body Refs as slots. |
| [Row](/docs/reference/nustd/ui/refs-layout#row) |  | Horizontal flex layout. Pin chrome on slot(). |
| [Tabs](/docs/reference/nustd/ui/refs-layout#tabs) |  | Tab strip plus active body. Subclass and declare one child slot per tab body. |

## nudle.driver

Module `nustd.ui.nudle.driver`.

`serve` -- the host's two layers stacked into one tree.

[Full entries](/docs/reference/nustd/ui/nudle-driver)

| Name | Call | Meaning |
| --- | --- | --- |
| [serve](/docs/reference/nustd/ui/nudle-driver#serve) | `ui.serve(index, program, static='nudle', host='127.0.0.1', port=8080, log_level='warning', open_browser=True, ready_timeout=10.0, shutdown_timeout=5.0)` | Serve `program` in the browser, one live arm per open tab. |

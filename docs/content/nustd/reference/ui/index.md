---
title: ui
description: "nustd.ui -- component fabric."
---

Module `nustd.ui`.

nustd.ui -- component fabric.

Layout under `src/nustd/ui/`:

- `lens/`   -- the Shape lens: `LensRef`, the walk that turns a Shape and
                 a cursor into columns, and `browse` to assemble the two.
- `table/`  -- `sync`: a `TableRef` kept equal to a kv store, live
                 across tabs, and `Row`, the stored row it reads.
- `core/`   -- host-independent UI fabric: `Ref`, `Section` /
                 `SectionRef`, abstract `Session` / `Subscription`,
                 wire `Frame` + interactions (`Send` / `Write` /
                 `Append` / `Remove` / `Changed`). Reusable by any host.
- `refs/`   -- layer 1, the widget kit as Refs: `containers/` (Column,
                 Row, Card, ...: open-ended children) and `leaves/` (Text,
                 Button, Table, charts, ...: drawn from props, no children).
                 Any UI can be built from these alone. Depends only on core.
- `shapes/` -- layer 2, a declarative DSL over the container Refs: one
                 `Section` per container (`Row`, `Card`, ...) that points
                 `_ref_cls` at its Ref and adds named child slots.
- `nudle/`  -- Page-based host: `Index` / `Page` / `PageRef`, the
                 `Boot` term, and the `serve` preset that assembles a
                 whole tree.

The uvicorn lifecycle, the book of live connections and the per-connection
fold live in `nustd.ws_server`, which knows nothing about ui.

The browser half is not in this package. It lives in the repo's npm workspace
at `pkgs/ts` (`ui-core`, `ui-kit`, and the `nudle` Vite app), and its
compiled bundle ships as the separate `nudle` wheel.

The public entry is `nustd.ui` itself: the core fabric, the widget kit, the
Shapes and the nudle host names are re-exported flat, so one `import nustd.ui` reaches
everything a UI program spells. The lens is the exception and stays whole
behind `nustd.ui.lens`, `LensRef` included: it is a subsystem rather than
a widget, and a surface split between two names is worse than one more dot.

**The host half loads on first use.** Building Refs and serving them are two
different jobs and only one of them needs a web server: `nudle` reaches
`nustd.ws_server`, which reaches uvicorn and starlette, and that was most of
what `import nustd.ui` cost. Plenty of processes only ever build Refs. The
case that made this worth doing is a worker drawing on a connection it holds
a proxy to: it pays the import on every launch and serves nothing, ever. So
`nudle`, `serve` and the four page names come through `__getattr__`
below, and naming any of them loads the host with its server, which is what
somebody naming them is asking for.

**Modules**

| Module | What |
| --- | --- |
| [`nustd.ui.lens`](/docs/nustd/reference/ui/lens) | nustd.ui.lens -- any Nu Shape, browsable as cascading columns. |
| [`nustd.ui.table`](/docs/nustd/reference/ui/table) | nustd.ui.table -- a table whose rows are what the store holds. |

## core.interactions

Module `nustd.ui.core.interactions`.

Wire interactions -- ops that flow over a Session on a Ref.

[Full entries](/docs/nustd/reference/ui/core-interactions)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Append](/docs/nustd/reference/ui/core-interactions#append) | `scalar_command` | `Append()` | Send an `append` frame on a Ref -- push onto a sequence. |
| [Changed](/docs/nustd/reference/ui/core-interactions#changed) | `scalar_query` | `Changed(ref, event=None)` | Subscribe to client-side change notifications on a Ref. |
| [Remove](/docs/nustd/reference/ui/core-interactions#remove) | `scalar_command` | `Remove()` | Send a `remove` frame on a Ref -- drop its node and its whole subtree. |
| [Send](/docs/nustd/reference/ui/core-interactions#send) | `scalar_command` | `Send()` | Send a frame on a Ref: its chain, and a payload built from the arguments. |
| [Write](/docs/nustd/reference/ui/core-interactions#write) | `scalar_command` | `Write()` | Send a `write` frame on a Ref -- replace the value. An EMPTY value raises. |

## nudle.page

Module `nustd.ui.nudle.page`.

Top-level Shape kinds for nudle, and the term that boots one.

[Full entries](/docs/nustd/reference/ui/nudle-page)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Boot](/docs/nustd/reference/ui/nudle-page#boot) | `scalar_command` | `Boot(shape_cls)` | Seed one browser's tree: clear it, name it, then one `init` per slot. |
| [PageRef](/docs/nustd/reference/ui/nudle-page#pageref) | `ref` | `PageRef(address, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Substrate Ref backing a Page slot on an Index. |
| [Index](/docs/nustd/reference/ui/nudle-page#index) |  |  | Browser entrypoint. One per app. |
| [Page](/docs/nustd/reference/ui/nudle-page#page) |  |  | Section an Index mounts at a route. |

## refs.leaves.table

Module `nustd.ui.refs.leaves.table`.

`TableRef` -- rows and columns, and the row ops that change them in place.

[Full entries](/docs/nustd/reference/ui/refs-leaves-table)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [InsertRow](/docs/nustd/reference/ui/refs-leaves-table#insertrow) | `scalar_command` | `InsertRow()` | Insert `row` before the row at `index`, clamped to the rows shown. |
| [RemoveRows](/docs/nustd/reference/ui/refs-leaves-table#removerows) | `scalar_command` | `RemoveRows()` | Drop the rows with these `keys`; keys not shown are skipped. |
| [SetOrder](/docs/nustd/reference/ui/refs-leaves-table#setorder) | `scalar_command` | `SetOrder()` | Show the rows named by `keys` first, in that order; the rest keep theirs after. |
| [SetRow](/docs/nustd/reference/ui/refs-leaves-table#setrow) | `scalar_command` | `SetRow()` | Replace the row keyed `key` with `row`, or add it last when none is shown. |
| [TableRef](/docs/nustd/reference/ui/refs-leaves-table#tableref) | `ref` | `TableRef(address, parent_ref=None, owner_shape=None, props=None)` | Rows and columns. The server owns the rows; the browser reports what you do. |

## refs.containers.chrome

Module `nustd.ui.refs.containers.chrome`.

Chrome containers -- Refs for the boxes that frame their children.

[Full entries](/docs/nustd/reference/ui/refs-containers-chrome)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AccordionRef](/docs/nustd/reference/ui/refs-containers-chrome#accordionref) | `ref` | `AccordionRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Stack of collapsible sections, each body the child at the section's id. |
| [BoxRef](/docs/nustd/reference/ui/refs-containers-chrome#boxref) | `ref` | `BoxRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Styled card-like box with an optional title. Pin chrome on slot(). |
| [CardRef](/docs/nustd/reference/ui/refs-containers-chrome#cardref) | `ref` | `CardRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Card-styled container: title + subtitle + body children + footer. |
| [FieldRef](/docs/nustd/reference/ui/refs-containers-chrome#fieldref) | `ref` | `FieldRef(address, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Label + one child input + help / error text. |
| [FieldsetRef](/docs/nustd/reference/ui/refs-containers-chrome#fieldsetref) | `ref` | `FieldsetRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Grouped fields with a legend. Display-only, server-owned. |
| [FormRef](/docs/nustd/reference/ui/refs-containers-chrome#formref) | `ref` | `FormRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Semantic form wrapper. Pin chrome on slot(); submit lives on a child ButtonRef. |
| [ModalRef](/docs/nustd/reference/ui/refs-containers-chrome#modalref) | `ref` | `ModalRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Dialog overlay. Open vs closed is the thing it carries, so it has a `set()`. |
| [TabsRef](/docs/nustd/reference/ui/refs-containers-chrome#tabsref) | `ref` | `TabsRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Tab strip plus active body. A tab's body is the child at the tab's id. |

## refs.leaves.output

Module `nustd.ui.refs.leaves.output`.

Content leaves -- server-owned sinks that render into the body.

[Full entries](/docs/nustd/reference/ui/refs-leaves-output)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AlertRef](/docs/nustd/reference/ui/refs-leaves-output#alertref) | `ref` | `AlertRef(address, parent_ref=None, owner_shape=None, props=None)` | Display banner ref. `write` carries partial updates; `notify` fires on user dismiss. |
| [BadgeRef](/docs/nustd/reference/ui/refs-leaves-output#badgeref) | `ref` | `BadgeRef(address, parent_ref=None, owner_shape=None, props=None)` | Display-only badge ref. One `write` op carries every mutation. |
| [DividerRef](/docs/nustd/reference/ui/refs-leaves-output#dividerref) | `ref` | `DividerRef(address, parent_ref=None, owner_shape=None, props=None)` | Display-only divider ref. One `write` op carries every mutation. |
| [EmptyStateRef](/docs/nustd/reference/ui/refs-leaves-output#emptystateref) | `ref` | `EmptyStateRef(address, parent_ref=None, owner_shape=None, props=None)` | What a region says while it has nothing to show. |
| [GaugeRef](/docs/nustd/reference/ui/refs-leaves-output#gaugeref) | `ref` | `GaugeRef(address, parent_ref=None, owner_shape=None, props=None)` | Display-only gauge ref. One `write` op carries every mutation. |
| [HeadingRef](/docs/nustd/reference/ui/refs-leaves-output#headingref) | `ref` | `HeadingRef(address, parent_ref=None, owner_shape=None, props=None)` | Display-only heading ref. One `write` op carries every mutation. |
| [ImageRef](/docs/nustd/reference/ui/refs-leaves-output#imageref) | `ref` | `ImageRef(address, parent_ref=None, owner_shape=None, props=None)` | Display-only image ref. One `write` op carries every mutation. |
| [JsonViewerRef](/docs/nustd/reference/ui/refs-leaves-output#jsonviewerref) | `ref` | `JsonViewerRef(address, parent_ref=None, owner_shape=None, props=None)` | Display-only json viewer ref. One `write` op carries every mutation via partial-merge. |
| [KbdRef](/docs/nustd/reference/ui/refs-leaves-output#kbdref) | `ref` | `KbdRef(address, parent_ref=None, owner_shape=None, props=None)` | One key cap, display only: a `K`, a `⌘`, an `Esc`. |
| [LinkRef](/docs/nustd/reference/ui/refs-leaves-output#linkref) | `ref` | `LinkRef(address, parent_ref=None, owner_shape=None, props=None)` | Display-only link ref. One `write` op carries every mutation. |
| [ProgressRef](/docs/nustd/reference/ui/refs-leaves-output#progressref) | `ref` | `ProgressRef(address, parent_ref=None, owner_shape=None, props=None)` | Display-only progress ref. One `write` op carries every mutation. |
| [ShortcutRef](/docs/nustd/reference/ui/refs-leaves-output#shortcutref) | `ref` | `ShortcutRef(address, parent_ref=None, owner_shape=None, props=None)` | A key combination by key name, display only: `["mod", "K"]`. |
| [StatRef](/docs/nustd/reference/ui/refs-leaves-output#statref) | `ref` | `StatRef(address, parent_ref=None, owner_shape=None, props=None)` | Display-only stat ref. Server-owned, single `write` op carries partial updates. |
| [StatusDotRef](/docs/nustd/reference/ui/refs-leaves-output#statusdotref) | `ref` | `StatusDotRef(address, parent_ref=None, owner_shape=None, props=None)` | A tone dot for a live state (connected, running, failing). |
| [TextRef](/docs/nustd/reference/ui/refs-leaves-output#textref) | `ref` | `TextRef(address, parent_ref=None, owner_shape=None, props=None)` | Display-only string ref. Body copy. |

## refs.leaves.chart

Module `nustd.ui.refs.leaves.chart`.

Chart Refs -- one browser node, an ECharts option, and typed builders over it.

[Full entries](/docs/nustd/reference/ui/refs-leaves-chart)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AreaChart](/docs/nustd/reference/ui/refs-leaves-chart#areachart) | `ref` | `AreaChart(address, parent_ref=None, owner_shape=None, props=None)` | A line chart filled underneath. `stack=True` for a stacked area. Same data as `LineChart`. |
| [BarChart](/docs/nustd/reference/ui/refs-leaves-chart#barchart) | `ref` | `BarChart(address, parent_ref=None, owner_shape=None, props=None)` | Bars per category, one bar series per name. |
| [BoxplotChart](/docs/nustd/reference/ui/refs-leaves-chart#boxplotchart) | `ref` | `BoxplotChart(address, parent_ref=None, owner_shape=None, props=None)` | The spread of each category's samples: whiskers at min and max, box at the quartiles. |
| [CandlestickChart](/docs/nustd/reference/ui/refs-leaves-chart#candlestickchart) | `ref` | `CandlestickChart(address, parent_ref=None, owner_shape=None, props=None)` | Open, close, low and high per period. |
| [Chart](/docs/nustd/reference/ui/refs-leaves-chart#chart) | `ref` | `Chart(address, parent_ref=None, owner_shape=None, props=None)` | A chart drawn from an ECharts option. The base every typed chart builds on. |
| [FunnelChart](/docs/nustd/reference/ui/refs-leaves-chart#funnelchart) | `ref` | `FunnelChart(address, parent_ref=None, owner_shape=None, props=None)` | Stages narrowing down. Same data as `PieChart`. |
| [GaugeChart](/docs/nustd/reference/ui/refs-leaves-chart#gaugechart) | `ref` | `GaugeChart(address, parent_ref=None, owner_shape=None, props=None)` | One value on an arc, between `min` and `max`. |
| [HeatmapChart](/docs/nustd/reference/ui/refs-leaves-chart#heatmapchart) | `ref` | `HeatmapChart(address, parent_ref=None, owner_shape=None, props=None)` | A grid of cells colored by value, on the sequential ramp. |
| [Histogram](/docs/nustd/reference/ui/refs-leaves-chart#histogram) | `ref` | `Histogram(address, parent_ref=None, owner_shape=None, props=None)` | How values spread: counts per bin, binned in Python on `set`. |
| [LineChart](/docs/nustd/reference/ui/refs-leaves-chart#linechart) | `ref` | `LineChart(address, parent_ref=None, owner_shape=None, props=None)` | Lines over an x axis, one per series name. |
| [PieChart](/docs/nustd/reference/ui/refs-leaves-chart#piechart) | `ref` | `PieChart(address, parent_ref=None, owner_shape=None, props=None)` | Slices of a whole. |
| [RadarChart](/docs/nustd/reference/ui/refs-leaves-chart#radarchart) | `ref` | `RadarChart(address, parent_ref=None, owner_shape=None, props=None)` | Several measures around a circle, one shape per item. |
| [SankeyChart](/docs/nustd/reference/ui/refs-leaves-chart#sankeychart) | `ref` | `SankeyChart(address, parent_ref=None, owner_shape=None, props=None)` | Flows between nodes, widths by value. |
| [ScatterChart](/docs/nustd/reference/ui/refs-leaves-chart#scatterchart) | `ref` | `ScatterChart(address, parent_ref=None, owner_shape=None, props=None)` | Points on two value axes, one color per series name. |
| [Sparkline](/docs/nustd/reference/ui/refs-leaves-chart#sparkline) | `ref` | `Sparkline(address, parent_ref=None, owner_shape=None, props=None)` | A small trend line: no axes, no grid, no tooltip. For stat cards and table cells. |
| [SunburstChart](/docs/nustd/reference/ui/refs-leaves-chart#sunburstchart) | `ref` | `SunburstChart(address, parent_ref=None, owner_shape=None, props=None)` | Nested rings sized by value. Same data as `TreemapChart`. |
| [TreemapChart](/docs/nustd/reference/ui/refs-leaves-chart#treemapchart) | `ref` | `TreemapChart(address, parent_ref=None, owner_shape=None, props=None)` | Nested rectangles sized by value. |

## refs.leaves.display

Module `nustd.ui.refs.leaves.display`.

Display leaves -- small status and identity marks.

[Full entries](/docs/nustd/reference/ui/refs-leaves-display)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AvatarRef](/docs/nustd/reference/ui/refs-leaves-display#avatarref) | `ref` | `AvatarRef(address, parent_ref=None, owner_shape=None, props=None)` | An image for a person or thing, initials from `name` when it has none. |
| [BreadcrumbRef](/docs/nustd/reference/ui/refs-leaves-display#breadcrumbref) | `ref` | `BreadcrumbRef(address, parent_ref=None, owner_shape=None, props=None)` | The trail to here, as crumbs of `{label, href}`. |
| [SkeletonRef](/docs/nustd/reference/ui/refs-leaves-display#skeletonref) | `ref` | `SkeletonRef(address, parent_ref=None, owner_shape=None, props=None)` | A pulsing placeholder where content is still loading. |
| [SpinnerRef](/docs/nustd/reference/ui/refs-leaves-display#spinnerref) | `ref` | `SpinnerRef(address, parent_ref=None, owner_shape=None, props=None)` | Busy with no known progress; `ProgressRef` covers known progress. |
| [StatusPillRef](/docs/nustd/reference/ui/refs-leaves-display#statuspillref) | `ref` | `StatusPillRef(address, parent_ref=None, owner_shape=None, props=None)` | A state as icon + label, so it reads without color. |

## refs.leaves.input

Module `nustd.ui.refs.leaves.input`.

Input Refs -- tab-owned; server reads via `read` + `notify` path.

[Full entries](/docs/nustd/reference/ui/refs-leaves-input)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ButtonRef](/docs/nustd/reference/ui/refs-leaves-input#buttonref) | `ref` | `ButtonRef(address, parent_ref=None, owner_shape=None, props=None)` | Click trigger; subscribe via `.on_click()`. |
| [CheckboxRef](/docs/nustd/reference/ui/refs-leaves-input#checkboxref) | `ref` | `CheckboxRef(address, parent_ref=None, owner_shape=None, props=None)` | Boolean toggle whose checked state lives in the browser. |
| [CodeRef](/docs/nustd/reference/ui/refs-leaves-input#coderef) | `ref` | `CodeRef(address, parent_ref=None, owner_shape=None, props=None)` | Source code, read-only by default. Value is the text, both ways. |
| [DatePickerRef](/docs/nustd/reference/ui/refs-leaves-input#datepickerref) | `ref` | `DatePickerRef(address, parent_ref=None, owner_shape=None, props=None)` | Date input whose ISO yyyy-mm-dd value lives in the browser. |
| [InputRef](/docs/nustd/reference/ui/refs-leaves-input#inputref) | `ref` | `InputRef(address, parent_ref=None, owner_shape=None, props=None)` | Text input whose value lives in the browser. |
| [MarkdownRef](/docs/nustd/reference/ui/refs-leaves-input#markdownref) | `ref` | `MarkdownRef(address, parent_ref=None, owner_shape=None, props=None)` | A markdown document, read-only by default. Value is the markdown, both ways. |
| [NumberInputRef](/docs/nustd/reference/ui/refs-leaves-input#numberinputref) | `ref` | `NumberInputRef(address, parent_ref=None, owner_shape=None, props=None)` | Numeric input whose value lives in the browser. |
| [RadioGroupRef](/docs/nustd/reference/ui/refs-leaves-input#radiogroupref) | `ref` | `RadioGroupRef(address, parent_ref=None, owner_shape=None, props=None)` | Single-choice radio group whose value lives in the browser. |
| [SelectRef](/docs/nustd/reference/ui/refs-leaves-input#selectref) | `ref` | `SelectRef(address, parent_ref=None, owner_shape=None, props=None)` | Dropdown single-select whose value lives in the browser. |
| [SketchRef](/docs/nustd/reference/ui/refs-leaves-input#sketchref) | `ref` | `SketchRef(address, parent_ref=None, owner_shape=None, props=None)` | A board a person draws on with a pointer; the elements live in the browser. |
| [SliderRef](/docs/nustd/reference/ui/refs-leaves-input#sliderref) | `ref` | `SliderRef(address, parent_ref=None, owner_shape=None, props=None)` | Numeric slider whose value lives in the browser. |
| [SwitchRef](/docs/nustd/reference/ui/refs-leaves-input#switchref) | `ref` | `SwitchRef(address, parent_ref=None, owner_shape=None, props=None)` | On/off switch whose checked state lives in the browser. |
| [TagInputRef](/docs/nustd/reference/ui/refs-leaves-input#taginputref) | `ref` | `TagInputRef(address, parent_ref=None, owner_shape=None, props=None)` | Multi-tag entry field whose committed list lives in the browser. |
| [TextAreaRef](/docs/nustd/reference/ui/refs-leaves-input#textarearef) | `ref` | `TextAreaRef(address, parent_ref=None, owner_shape=None, props=None)` | Multi-line text input whose value lives in the browser. |
| [ToggleRef](/docs/nustd/reference/ui/refs-leaves-input#toggleref) | `ref` | `ToggleRef(address, parent_ref=None, owner_shape=None, props=None)` | Two-state toolbar button whose pressed state lives in the browser. |

## refs.containers.disclosure

Module `nustd.ui.refs.containers.disclosure`.

Disclosure containers -- a region that opens and closes over its children.

[Full entries](/docs/nustd/reference/ui/refs-containers-disclosure)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [CollapsibleRef](/docs/nustd/reference/ui/refs-containers-disclosure#collapsibleref) | `ref` | `CollapsibleRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | One titled region whose children fold away. |
| [SheetRef](/docs/nustd/reference/ui/refs-containers-disclosure#sheetref) | `ref` | `SheetRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Drawer that slides in from an edge over the page, children as its body. |

## refs.containers.flow

Module `nustd.ui.refs.containers.flow`.

Flow containers -- Refs that lay their children out and carry nothing else.

[Full entries](/docs/nustd/reference/ui/refs-containers-flow)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ColumnRef](/docs/nustd/reference/ui/refs-containers-flow#columnref) | `ref` | `ColumnRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Vertical flex layout. Pin chrome on the slot(). |
| [RowRef](/docs/nustd/reference/ui/refs-containers-flow#rowref) | `ref` | `RowRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Horizontal flex layout. Pin chrome on slot(). |

## refs.containers.base

Module `nustd.ui.refs.containers.base`.

`ContainerRef` -- the base every layout container Ref builds on.

[Full entries](/docs/nustd/reference/ui/refs-containers-base)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ContainerRef](/docs/nustd/reference/ui/refs-containers-base#containerref) | `ref` | `ContainerRef(address, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Base for container Refs: open-ended children, optional chrome. Abstract. |
| [DictContainerRef](/docs/nustd/reference/ui/refs-containers-base#dictcontainerref) | `ref` | `DictContainerRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | A container that takes its children by key. Abstract. |
| [ListContainerRef](/docs/nustd/reference/ui/refs-containers-base#listcontainerref) | `ref` | `ListContainerRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | A container that takes its children by position. Abstract. |
| [ShapeContainerRef](/docs/nustd/reference/ui/refs-containers-base#shapecontainerref) | `ref` | `ShapeContainerRef(address, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | A container whose children are only the ones its Shape declares. Abstract. |

## refs.containers.grid

Module `nustd.ui.refs.containers.grid`.

`GridRef` -- children in equal cells, row after row.

[Full entries](/docs/nustd/reference/ui/refs-containers-grid)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [GridRef](/docs/nustd/reference/ui/refs-containers-grid#gridref) | `ref` | `GridRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Equal cells, one child per cell, as many per row as the width allows. |

## refs.leaves.base

Module `nustd.ui.refs.leaves.base`.

`LeafRef` -- the base every content, input and collection Ref builds on.

[Full entries](/docs/nustd/reference/ui/refs-leaves-base)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [LeafRef](/docs/nustd/reference/ui/refs-leaves-base#leafref) | `ref` | `LeafRef(address, parent_ref=None, owner_shape=None, props=None)` | Base for leaf Refs: one thing drawn from props, no children. Abstract. |

## refs.containers.line

Module `nustd.ui.refs.containers.line`.

`LineRef` -- inline flow: children run and wrap like words in a paragraph.

[Full entries](/docs/nustd/reference/ui/refs-containers-line)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [LineRef](/docs/nustd/reference/ui/refs-containers-line#lineref) | `ref` | `LineRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Children inline, wrapping at the container's width. Pin chrome on slot(). |

## refs.containers.list

Module `nustd.ui.refs.containers.list`.

`ListRef` -- a bulleted or numbered list whose items are any nodes.

[Full entries](/docs/nustd/reference/ui/refs-containers-list)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ListRef](/docs/nustd/reference/ui/refs-containers-list#listref) | `ref` | `ListRef(address, item=None, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | A bulleted or numbered list: string items first, then each child node. |

## refs.structural

Module `nustd.ui.refs.structural`.

Structural Refs -- bound to non-render browser APIs.

[Full entries](/docs/nustd/reference/ui/refs-structural)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [NavRef](/docs/nustd/reference/ui/refs-structural#navref) | `ref` | `NavRef(address, parent_ref=None, owner_shape=None, props=None)` | Bound to window.history + window.location. Index-level structural Ref. |
| [TitleRef](/docs/nustd/reference/ui/refs-structural#titleref) | `ref` | `TitleRef(address, parent_ref=None, owner_shape=None, props=None)` | Bound to document.title. Index-level structural Ref. |

## core.base

Module `nustd.ui.core.base`.

Generic UI Ref -- host-independent base for the widget kit.

[Full entries](/docs/nustd/reference/ui/core-base)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Ref](/docs/nustd/reference/ui/core-base#ref) | `ref` | `Ref(address, parent_ref=None, owner_shape=None, props=None)` | Base for Refs backed by a client rendering surface. Async-only. |

## core.section

Module `nustd.ui.core.section`.

Section -- shape-based container primitive for the UI kit.

[Full entries](/docs/nustd/reference/ui/core-section)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [SectionRef](/docs/nustd/reference/ui/core-section#sectionref) | `ref` | `SectionRef(address, section_cls=None, parent_ref=None, owner_shape=None, props=None)` | Substrate Ref under every container. |
| [Section](/docs/nustd/reference/ui/core-section#section) |  |  | Base for shape-based layout primitives. |

## refs.leaves.tree

Module `nustd.ui.refs.leaves.tree`.

`TreeRef` -- nested rows that fold, with select, open, rename and move.

[Full entries](/docs/nustd/reference/ui/refs-leaves-tree)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [TreeRef](/docs/nustd/reference/ui/refs-leaves-tree#treeref) | `ref` | `TreeRef(address, parent_ref=None, owner_shape=None, props=None)` | Nested rows that fold. The server owns the nodes; the browser reports what you do. |

## shapes.chrome

Module `nustd.ui.shapes.chrome`.

Chrome Shapes -- Card, Box, Tabs, Modal, Accordion, Form, Fieldset, Field.

[Full entries](/docs/nustd/reference/ui/shapes-chrome)

| Name | Call | Meaning |
| --- | --- | --- |
| [Accordion](/docs/nustd/reference/ui/shapes-chrome#accordion) |  | Stack of collapsible sections, each body the child at the section's id. |
| [Box](/docs/nustd/reference/ui/shapes-chrome#box) |  | Styled card-like box. Pin chrome on slot(). |
| [Card](/docs/nustd/reference/ui/shapes-chrome#card) |  | Card-styled Section: title + subtitle + body slots + footer. |
| [Field](/docs/nustd/reference/ui/shapes-chrome#field) |  | Label + child input + help / error text. Exactly one child slot. |
| [Fieldset](/docs/nustd/reference/ui/shapes-chrome#fieldset) |  | Grouped fields with a legend. Display-only, server-owned. |
| [Form](/docs/nustd/reference/ui/shapes-chrome#form) |  | Semantic form wrapper. Pin chrome on slot(); submit lives on a child ButtonRef. |
| [Modal](/docs/nustd/reference/ui/shapes-chrome#modal) |  | Dialog overlay. Pin chrome on slot(); declare body Refs as slots. |
| [Tabs](/docs/nustd/reference/ui/shapes-chrome#tabs) |  | Tab strip plus active body, each body the child at its tab id. |

## shapes.disclosure

Module `nustd.ui.shapes.disclosure`.

Disclosure Shapes -- Collapsible and Sheet.

[Full entries](/docs/nustd/reference/ui/shapes-disclosure)

| Name | Call | Meaning |
| --- | --- | --- |
| [Collapsible](/docs/nustd/reference/ui/shapes-disclosure#collapsible) |  | One titled region whose slots fold away. Props as `CollapsibleRef.slot`. |
| [Sheet](/docs/nustd/reference/ui/shapes-disclosure#sheet) |  | Edge drawer with its slots as the body. Props as `SheetRef.slot`. |

## shapes.flow

Module `nustd.ui.shapes.flow`.

Flow Shapes -- Column and Row, declared.

[Full entries](/docs/nustd/reference/ui/shapes-flow)

| Name | Call | Meaning |
| --- | --- | --- |
| [Column](/docs/nustd/reference/ui/shapes-flow#column) |  | Vertical stack of its slots. Props as `ColumnRef.slot`. |
| [Row](/docs/nustd/reference/ui/shapes-flow#row) |  | Its slots side by side. Props as `RowRef.slot`. |

## shapes.grid

Module `nustd.ui.shapes.grid`.

Grid Shape -- equal cells, declared.

[Full entries](/docs/nustd/reference/ui/shapes-grid)

| Name | Call | Meaning |
| --- | --- | --- |
| [Grid](/docs/nustd/reference/ui/shapes-grid#grid) |  | Its slots in equal cells, row after row. Props as `GridRef.slot`. |

## shapes.line

Module `nustd.ui.shapes.line`.

Line Shape -- slots that run inline, wrapping like a paragraph.

[Full entries](/docs/nustd/reference/ui/shapes-line)

| Name | Call | Meaning |
| --- | --- | --- |
| [Line](/docs/nustd/reference/ui/shapes-line#line) |  | Its slots inline, wrapping like a paragraph. Props as `LineRef.slot`. |

## shapes.list

Module `nustd.ui.shapes.list`.

List Shape -- a list whose slots are its items.

[Full entries](/docs/nustd/reference/ui/shapes-list)

| Name | Call | Meaning |
| --- | --- | --- |
| [List](/docs/nustd/reference/ui/shapes-list#list) |  | Bulleted or numbered list, one item per slot. Props as `ListRef.slot`. |

## nudle.driver

Module `nustd.ui.nudle.driver`.

`serve` -- the host's two layers stacked into one tree.

[Full entries](/docs/nustd/reference/ui/nudle-driver)

| Name | Call | Meaning |
| --- | --- | --- |
| [serve](/docs/nustd/reference/ui/nudle-driver#serve) | `ui.serve(index, program, static='nudle', routes=(), host='127.0.0.1', port=8080, log_level='warning', open_browser=True, ready_timeout=10.0, shutdown_timeout=5.0)` | Serve `program` in the browser, one live arm per open tab. |

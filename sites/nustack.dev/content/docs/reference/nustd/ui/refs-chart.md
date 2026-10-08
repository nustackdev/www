---
title: refs.chart
description: "Chart Refs -- typed visualization sinks over series payloads."
---

Module `nustd.ui.refs.chart`.

Chart Refs -- typed visualization sinks over series payloads.

Same directionality as other output Refs (server pushes points via
`write` / `append`; browser only renders). Grouped by shape rather
than by semantics because the payload contract is chart-specific.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AreaChart](#areachart) | `ref` | `AreaChart(address, parent_ref=None, owner_shape=None)` | Display-only area chart. `write` (partial) and `append` (one row). |
| [BarChart](#barchart) | `ref` | `BarChart(address, parent_ref=None, owner_shape=None)` | Display-only chart ref. `write` (partial) and `append` (one bar). |
| [LineChart](#linechart) | `ref` | `LineChart(address, parent_ref=None, owner_shape=None)` | Display-only chart ref. `write` (partial) and `append` (one point or one series row). |
| [PieChart](#piechart) | `ref` | `PieChart(address, parent_ref=None, owner_shape=None)` | Display-only pie chart ref. `write` (partial) and `append` (one slice). |
| [Sparkline](#sparkline) | `ref` | `Sparkline(address, parent_ref=None, owner_shape=None)` | Display-only inline trend line. `write` (partial) and `append` (one point). |

## AreaChart

Display-only area chart. `write` (partial) and `append` (one row).

```python
AreaChart(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.AreaChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_points(points)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `points` | `ListArg[Any]` |  |  |

Undocumented: summary, example.

### `.set_series(names)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `names` | `ListArg[Any]` |  |  |

Undocumented: summary, example.

### `.set_colors(colors)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `colors` | `ListArg[Any]` |  |  |

Undocumented: summary, example.

### `.set_stacked(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

Undocumented: summary, example.

### `.set_x_label(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_y_label(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_max_points(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `IntArg` |  |  |

Undocumented: summary, example.

### `.set_x_format(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `XFormat \| StrArg` |  |  |

Undocumented: summary, example.

### `.clear()`

Builds `Nu`.

Undocumented: summary, example.

### `.set(points=<UNSET>, series=<UNSET>, colors=<UNSET>, stacked=<UNSET>, x_label=<UNSET>, y_label=<UNSET>, max_points=<UNSET>, x_format=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `points` | `ListArg[Any]` | `<UNSET>` |  |
| `series` | `ListArg[Any]` | `<UNSET>` |  |
| `colors` | `ListArg[Any]` | `<UNSET>` |  |
| `stacked` | `BoolArg` | `<UNSET>` |  |
| `x_label` | `StrArg` | `<UNSET>` |  |
| `y_label` | `StrArg` | `<UNSET>` |  |
| `max_points` | `IntArg` | `<UNSET>` |  |
| `x_format` | `XFormat \| StrArg` | `<UNSET>` |  |

Undocumented: summary, example.

### `.append(x)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## BarChart

Display-only chart ref. `write` (partial) and `append` (one bar).

```python
BarChart(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.BarChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_bars(bars)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `bars` | `ListArg[Any]` |  |  |

Undocumented: summary, example.

### `.set_x_label(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_y_label(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_color(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_orientation(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `Orientation \| StrArg` |  |  |

Undocumented: summary, example.

### `.set_max_bars(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `IntArg` |  |  |

Undocumented: summary, example.

### `.clear()`

Builds `Nu`.

Undocumented: summary, example.

### `.set(bars=<UNSET>, x_label=<UNSET>, y_label=<UNSET>, color=<UNSET>, orientation=<UNSET>, max_bars=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `bars` | `ListArg[Any] \| DictArg[Any, Any]` | `<UNSET>` |  |
| `x_label` | `StrArg` | `<UNSET>` |  |
| `y_label` | `StrArg` | `<UNSET>` |  |
| `color` | `StrArg` | `<UNSET>` |  |
| `orientation` | `Orientation \| StrArg` | `<UNSET>` |  |
| `max_bars` | `IntArg` | `<UNSET>` |  |

Undocumented: summary, example.

### `.append(category, value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `category` | `StrArg` |  |  |
| `value` | `FloatArg` |  |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## LineChart

Display-only chart ref. `write` (partial) and `append` (one point or one series row).

```python
LineChart(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.LineChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_points(points)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `points` | `ListArg[Any]` |  |  |

Undocumented: summary, example.

### `.set_series(series_list)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `series_list` | `ListArg[Any]` |  |  |

Undocumented: summary, example.

### `.set_x_label(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_y_label(text)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `text` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_color(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_max_points(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `IntArg` |  |  |

Undocumented: summary, example.

### `.set_x_format(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `XFormat \| StrArg` |  |  |

Undocumented: summary, example.

### `.set_show_legend(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

Undocumented: summary, example.

### `.set_show_tooltip(flag)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `flag` | `BoolArg` |  |  |

Undocumented: summary, example.

### `.set_palette(colors)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `colors` | `ListArg[Any]` |  |  |

Undocumented: summary, example.

### `.clear()`

Builds `Nu`.

Undocumented: summary, example.

### `.set(points=<UNSET>, series=<UNSET>, x_label=<UNSET>, y_label=<UNSET>, color=<UNSET>, max_points=<UNSET>, x_format=<UNSET>, show_legend=<UNSET>, show_tooltip=<UNSET>, palette=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `points` | `ListArg[Any] \| DictArg[Any, Any]` | `<UNSET>` |  |
| `series` | `ListArg[Any]` | `<UNSET>` |  |
| `x_label` | `StrArg` | `<UNSET>` |  |
| `y_label` | `StrArg` | `<UNSET>` |  |
| `color` | `StrArg` | `<UNSET>` |  |
| `max_points` | `IntArg` | `<UNSET>` |  |
| `x_format` | `XFormat \| StrArg` | `<UNSET>` |  |
| `show_legend` | `BoolArg` | `<UNSET>` |  |
| `show_tooltip` | `BoolArg` | `<UNSET>` |  |
| `palette` | `ListArg[Any]` | `<UNSET>` |  |

Undocumented: summary, example.

### `.append(x, y)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |
| `y` | `FloatArg` |  |  |

Undocumented: summary, example.

### `.append_series(name, x, y)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `StrArg` |  |  |
| `x` | `FloatArg` |  |  |
| `y` | `FloatArg` |  |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## PieChart

Display-only pie chart ref. `write` (partial) and `append` (one slice).

```python
PieChart(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.PieChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_slices(slices)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `slices` | `ListArg[Any]` |  |  |

Undocumented: summary, example.

### `.set_colors(colors)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `colors` | `ListArg[Any]` |  |  |

Undocumented: summary, example.

### `.set_inner_radius(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `FloatArg` |  |  |

Undocumented: summary, example.

### `.set_show_labels(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `BoolArg` |  |  |

Undocumented: summary, example.

### `.set_show_legend(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `BoolArg` |  |  |

Undocumented: summary, example.

### `.set_total_label(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

Undocumented: summary, example.

### `.clear()`

Builds `Nu`.

Undocumented: summary, example.

### `.set(slices=<UNSET>, colors=<UNSET>, inner_radius=<UNSET>, show_labels=<UNSET>, show_legend=<UNSET>, total_label=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `slices` | `ListArg[Any] \| DictArg[Any, Any]` | `<UNSET>` |  |
| `colors` | `ListArg[Any]` | `<UNSET>` |  |
| `inner_radius` | `FloatArg` | `<UNSET>` |  |
| `show_labels` | `BoolArg` | `<UNSET>` |  |
| `show_legend` | `BoolArg` | `<UNSET>` |  |
| `total_label` | `StrArg` | `<UNSET>` |  |

Undocumented: summary, example.

### `.append(label, value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `label` | `StrArg` |  |  |
| `value` | `FloatArg` |  |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## Sparkline

Display-only inline trend line. `write` (partial) and `append` (one point).

```python
Sparkline(address, parent_ref=None, owner_shape=None)
```

Path `nustd.ui.Sparkline`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.set_points(points)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `points` | `ListArg[Any]` |  |  |

Undocumented: summary, example.

### `.set_color(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `StrArg` |  |  |

Undocumented: summary, example.

### `.set_height(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `IntArg` |  |  |

Undocumented: summary, example.

### `.set_max_points(value)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `IntArg` |  |  |

Undocumented: summary, example.

### `.clear()`

Builds `Nu`.

Undocumented: summary, example.

### `.set(points=<UNSET>, color=<UNSET>, height=<UNSET>, max_points=<UNSET>)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `points` | `ListArg[Any] \| DictArg[Any, Any]` | `<UNSET>` |  |
| `color` | `StrArg` | `<UNSET>` |  |
| `height` | `IntArg` | `<UNSET>` |  |
| `max_points` | `IntArg` | `<UNSET>` |  |

Undocumented: summary, example.

### `.append(x, y)`

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `FloatArg` |  |  |
| `y` | `FloatArg` |  |  |

Undocumented: summary, example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

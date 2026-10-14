---
title: refs.leaves.chart
description: "Chart Refs -- one browser node, an ECharts option, and typed builders over it."
---

Module `nustd.ui.refs.leaves.chart`.

Chart Refs -- one browser node, an ECharts option, and typed builders over it.

The browser has a single chart node, `Chart`, that draws whatever ECharts
option it holds. Every chart type here is a Python builder: its `slot`
turns a few common settings into an option, and its data hook turns the data
you hand `set` into the part of the option that holds it. A new chart type
is a new builder, never new browser code.

Every chart shares one small set of interactions, defined once on `Chart`:

- `set(data)`          replace the data (the builder decides its shape)
- `set(option=...)`    replace the whole option, drawn from scratch
- `merge(option)`      a partial option, merged the way ECharts merges
- `append(points, series=0)`  push points onto one series, keeping the
                         newest `max_points`. A series is a position or a
                         name; an unknown name adds a series styled like the
                         last one. Points are ECharts data items as the
                         chart's series takes them ([x, y], a bare y,
                         {name, value}, ...).
- `clear(series=None)` empty one series, or all of them
- `on_click()`         a data item clicked: ``{event, series,
                         series_index, name, index, value}``

Anything a builder does not expose (a log axis, a second y axis, mark lines,
a geo map) goes through the raw option: `option=` on any builder's slot is
merged over what it builds, `merge` changes it live, and ``Chart.slot(
option=...)`` takes an option whole. Formatters are ECharts template strings
(`"{value} ms"`, `"{b}: {d}%"`, `"{HH}:{mm}"` on a time axis), never
code. A color may be a kit token, `"var(--chart-3)"`, resolved in the
browser per theme.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AreaChart](#areachart) | `ref` | `AreaChart(address, parent_ref=None, owner_shape=None, props=None)` | A line chart filled underneath. `stack=True` for a stacked area. Same data as `LineChart`. |
| [BarChart](#barchart) | `ref` | `BarChart(address, parent_ref=None, owner_shape=None, props=None)` | Bars per category, one bar series per name. |
| [BoxplotChart](#boxplotchart) | `ref` | `BoxplotChart(address, parent_ref=None, owner_shape=None, props=None)` | The spread of each category's samples: whiskers at min and max, box at the quartiles. |
| [CandlestickChart](#candlestickchart) | `ref` | `CandlestickChart(address, parent_ref=None, owner_shape=None, props=None)` | Open, close, low and high per period. |
| [Chart](#chart) | `ref` | `Chart(address, parent_ref=None, owner_shape=None, props=None)` | A chart drawn from an ECharts option. The base every typed chart builds on. |
| [FunnelChart](#funnelchart) | `ref` | `FunnelChart(address, parent_ref=None, owner_shape=None, props=None)` | Stages narrowing down. Same data as `PieChart`. |
| [GaugeChart](#gaugechart) | `ref` | `GaugeChart(address, parent_ref=None, owner_shape=None, props=None)` | One value on an arc, between `min` and `max`. |
| [HeatmapChart](#heatmapchart) | `ref` | `HeatmapChart(address, parent_ref=None, owner_shape=None, props=None)` | A grid of cells colored by value, on the sequential ramp. |
| [Histogram](#histogram) | `ref` | `Histogram(address, parent_ref=None, owner_shape=None, props=None)` | How values spread: counts per bin, binned in Python on `set`. |
| [LineChart](#linechart) | `ref` | `LineChart(address, parent_ref=None, owner_shape=None, props=None)` | Lines over an x axis, one per series name. |
| [PieChart](#piechart) | `ref` | `PieChart(address, parent_ref=None, owner_shape=None, props=None)` | Slices of a whole. |
| [RadarChart](#radarchart) | `ref` | `RadarChart(address, parent_ref=None, owner_shape=None, props=None)` | Several measures around a circle, one shape per item. |
| [SankeyChart](#sankeychart) | `ref` | `SankeyChart(address, parent_ref=None, owner_shape=None, props=None)` | Flows between nodes, widths by value. |
| [ScatterChart](#scatterchart) | `ref` | `ScatterChart(address, parent_ref=None, owner_shape=None, props=None)` | Points on two value axes, one color per series name. |
| [Sparkline](#sparkline) | `ref` | `Sparkline(address, parent_ref=None, owner_shape=None, props=None)` | A small trend line: no axes, no grid, no tooltip. For stat cards and table cells. |
| [SunburstChart](#sunburstchart) | `ref` | `SunburstChart(address, parent_ref=None, owner_shape=None, props=None)` | Nested rings sized by value. Same data as `TreemapChart`. |
| [TreemapChart](#treemapchart) | `ref` | `TreemapChart(address, parent_ref=None, owner_shape=None, props=None)` | Nested rectangles sized by value. |

## AreaChart

A line chart filled underneath. `stack=True` for a stacked area. Same data as `LineChart`.

```python
AreaChart(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.AreaChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Inherited methods**

From `nustd.ui.refs.leaves.chart.Chart`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(data=<UNSET>, option=<UNSET>)` | `Nu` | Replace the data, or with `option=` the whole option (drawn from scratch). |
| `.merge(option)` | `Nu` | Merge a partial option, the way ECharts' setOption merges. |
| `.append(points, series=0)` | `Nu` | Push points onto one series, keeping the newest `max_points`. |
| `.clear(series=None)` | `Nu` | Empty one series' data (a position or a name), or every series'. |
| `.on_click()` | `Changed` | `{event, series, series_index, name, index, value}`: a data item clicked. |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## BarChart

Bars per category, one bar series per name.

```python
BarChart(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.BarChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`set` takes `{name: [[category, value], ...]}`, ``[[category, value],
...]` for the first series, `{category: value}`` for a single series, or
rows `[category, v1, v2, ...]` across the series. ``append([["Mon",
3]])`` adds a bar.

**Inherited methods**

From `nustd.ui.refs.leaves.chart.Chart`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(data=<UNSET>, option=<UNSET>)` | `Nu` | Replace the data, or with `option=` the whole option (drawn from scratch). |
| `.merge(option)` | `Nu` | Merge a partial option, the way ECharts' setOption merges. |
| `.append(points, series=0)` | `Nu` | Push points onto one series, keeping the newest `max_points`. |
| `.clear(series=None)` | `Nu` | Empty one series' data (a position or a name), or every series'. |
| `.on_click()` | `Changed` | `{event, series, series_index, name, index, value}`: a data item clicked. |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## BoxplotChart

The spread of each category's samples: whiskers at min and max, box at the quartiles.

```python
BoxplotChart(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.BoxplotChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`set` takes `{category: samples}`; the five numbers are worked out in
Python. Precomputed `[min, q1, median, q3, max]` rows go through
`merge`.

**Inherited methods**

From `nustd.ui.refs.leaves.chart.Chart`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(data=<UNSET>, option=<UNSET>)` | `Nu` | Replace the data, or with `option=` the whole option (drawn from scratch). |
| `.merge(option)` | `Nu` | Merge a partial option, the way ECharts' setOption merges. |
| `.append(points, series=0)` | `Nu` | Push points onto one series, keeping the newest `max_points`. |
| `.clear(series=None)` | `Nu` | Empty one series' data (a position or a name), or every series'. |
| `.on_click()` | `Changed` | `{event, series, series_index, name, index, value}`: a data item clicked. |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## CandlestickChart

Open, close, low and high per period.

```python
CandlestickChart(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.CandlestickChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`set` takes rows `[x, open, close, low, high]`; `append` takes the
same rows. Up periods draw in the ok tone, down in the danger tone.

**Inherited methods**

From `nustd.ui.refs.leaves.chart.Chart`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(data=<UNSET>, option=<UNSET>)` | `Nu` | Replace the data, or with `option=` the whole option (drawn from scratch). |
| `.merge(option)` | `Nu` | Merge a partial option, the way ECharts' setOption merges. |
| `.append(points, series=0)` | `Nu` | Push points onto one series, keeping the newest `max_points`. |
| `.clear(series=None)` | `Nu` | Empty one series' data (a position or a name), or every series'. |
| `.on_click()` | `Changed` | `{event, series, series_index, name, index, value}`: a data item clicked. |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## Chart

A chart drawn from an ECharts option. The base every typed chart builds on.

```python
Chart(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.Chart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`Chart.slot(option={...})` draws the option as given: any series,
component or setting ECharts has. The typed charts below build the option
for you.

**Methods**

### `.set(data=<UNSET>, option=<UNSET>)`

Replace the data, or with `option=` the whole option (drawn from scratch).

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `data` | `Arg` | `<UNSET>` |  |
| `option` | `DictArg[str, Any]` | `<UNSET>` |  |

Undocumented: example.

### `.merge(option)`

Merge a partial option, the way ECharts' setOption merges.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `option` | `DictArg[str, Any]` |  |  |

Undocumented: example.

### `.append(points, series=0)`

Push points onto one series, keeping the newest `max_points`.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `points` | `ListArg[Any]` |  |  |
| `series` | `StrArg \| IntArg` | `0` |  |

Undocumented: example.

### `.clear(series=None)`

Empty one series' data (a position or a name), or every series'.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `series` | `StrArg \| IntArg \| None` | `None` |  |

Undocumented: example.

### `.on_click()`

`{event, series, series_index, name, index, value}`: a data item clicked.

Builds `Changed`.

Undocumented: example.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## FunnelChart

Stages narrowing down. Same data as `PieChart`.

```python
FunnelChart(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.FunnelChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Inherited methods**

From `nustd.ui.refs.leaves.chart.Chart`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(data=<UNSET>, option=<UNSET>)` | `Nu` | Replace the data, or with `option=` the whole option (drawn from scratch). |
| `.merge(option)` | `Nu` | Merge a partial option, the way ECharts' setOption merges. |
| `.append(points, series=0)` | `Nu` | Push points onto one series, keeping the newest `max_points`. |
| `.clear(series=None)` | `Nu` | Empty one series' data (a position or a name), or every series'. |
| `.on_click()` | `Changed` | `{event, series, series_index, name, index, value}`: a data item clicked. |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## GaugeChart

One value on an arc, between `min` and `max`.

```python
GaugeChart(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.GaugeChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`set` takes a number (or `{name: value}` for several needles).
For the small inline gauge use `GaugeRef`; this is the ECharts one.

**Inherited methods**

From `nustd.ui.refs.leaves.chart.Chart`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(data=<UNSET>, option=<UNSET>)` | `Nu` | Replace the data, or with `option=` the whole option (drawn from scratch). |
| `.merge(option)` | `Nu` | Merge a partial option, the way ECharts' setOption merges. |
| `.append(points, series=0)` | `Nu` | Push points onto one series, keeping the newest `max_points`. |
| `.clear(series=None)` | `Nu` | Empty one series' data (a position or a name), or every series'. |
| `.on_click()` | `Changed` | `{event, series, series_index, name, index, value}`: a data item clicked. |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## HeatmapChart

A grid of cells colored by value, on the sequential ramp.

```python
HeatmapChart(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.HeatmapChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`set` takes `[[x, y, value], ...]` (x and y as labels or positions) or
a matrix, rows along y. Labels not declared are added in the order they
come. The color scale fits the data on every `set`.

**Inherited methods**

From `nustd.ui.refs.leaves.chart.Chart`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(data=<UNSET>, option=<UNSET>)` | `Nu` | Replace the data, or with `option=` the whole option (drawn from scratch). |
| `.merge(option)` | `Nu` | Merge a partial option, the way ECharts' setOption merges. |
| `.append(points, series=0)` | `Nu` | Push points onto one series, keeping the newest `max_points`. |
| `.clear(series=None)` | `Nu` | Empty one series' data (a position or a name), or every series'. |
| `.on_click()` | `Changed` | `{event, series, series_index, name, index, value}`: a data item clicked. |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## Histogram

How values spread: counts per bin, binned in Python on `set`.

```python
Histogram(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.Histogram`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`set` takes a list of numbers, or `{name: numbers}` for overlaid
series sharing one set of bins. `append` adds pre-binned bars only; to
re-bin, `set` again.

**Inherited methods**

From `nustd.ui.refs.leaves.chart.Chart`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(data=<UNSET>, option=<UNSET>)` | `Nu` | Replace the data, or with `option=` the whole option (drawn from scratch). |
| `.merge(option)` | `Nu` | Merge a partial option, the way ECharts' setOption merges. |
| `.append(points, series=0)` | `Nu` | Push points onto one series, keeping the newest `max_points`. |
| `.clear(series=None)` | `Nu` | Empty one series' data (a position or a name), or every series'. |
| `.on_click()` | `Changed` | `{event, series, series_index, name, index, value}`: a data item clicked. |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## LineChart

Lines over an x axis, one per series name.

```python
LineChart(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.LineChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`set` takes `{name: [[x, y], ...]}`, `[[x, y], ...]` for the first
series, bare y values, or rows `[x, y1, y2, ...]` across the series in
order. `append([[x, y]], "cpu")` streams a point.

**Inherited methods**

From `nustd.ui.refs.leaves.chart.Chart`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(data=<UNSET>, option=<UNSET>)` | `Nu` | Replace the data, or with `option=` the whole option (drawn from scratch). |
| `.merge(option)` | `Nu` | Merge a partial option, the way ECharts' setOption merges. |
| `.append(points, series=0)` | `Nu` | Push points onto one series, keeping the newest `max_points`. |
| `.clear(series=None)` | `Nu` | Empty one series' data (a position or a name), or every series'. |
| `.on_click()` | `Changed` | `{event, series, series_index, name, index, value}`: a data item clicked. |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## PieChart

Slices of a whole.

```python
PieChart(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.PieChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`set` takes `{name: value}`, `[[name, value], ...]`, ``[{name,
value}, ...]` or bare values. `append([{"name": "Fish", "value": 3}])``
adds a slice.

**Inherited methods**

From `nustd.ui.refs.leaves.chart.Chart`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(data=<UNSET>, option=<UNSET>)` | `Nu` | Replace the data, or with `option=` the whole option (drawn from scratch). |
| `.merge(option)` | `Nu` | Merge a partial option, the way ECharts' setOption merges. |
| `.append(points, series=0)` | `Nu` | Push points onto one series, keeping the newest `max_points`. |
| `.clear(series=None)` | `Nu` | Empty one series' data (a position or a name), or every series'. |
| `.on_click()` | `Changed` | `{event, series, series_index, name, index, value}`: a data item clicked. |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## RadarChart

Several measures around a circle, one shape per item.

```python
RadarChart(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.RadarChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`set` takes `{item name: [one value per indicator]}` or a single list
of values.

**Inherited methods**

From `nustd.ui.refs.leaves.chart.Chart`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(data=<UNSET>, option=<UNSET>)` | `Nu` | Replace the data, or with `option=` the whole option (drawn from scratch). |
| `.merge(option)` | `Nu` | Merge a partial option, the way ECharts' setOption merges. |
| `.append(points, series=0)` | `Nu` | Push points onto one series, keeping the newest `max_points`. |
| `.clear(series=None)` | `Nu` | Empty one series' data (a position or a name), or every series'. |
| `.on_click()` | `Changed` | `{event, series, series_index, name, index, value}`: a data item clicked. |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## SankeyChart

Flows between nodes, widths by value.

```python
SankeyChart(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.SankeyChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`set` takes links `[[source, target, value], ...]` (or ``{source,
target, value}` maps); the nodes are the names they mention. `append``
does not apply; `set` again.

**Inherited methods**

From `nustd.ui.refs.leaves.chart.Chart`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(data=<UNSET>, option=<UNSET>)` | `Nu` | Replace the data, or with `option=` the whole option (drawn from scratch). |
| `.merge(option)` | `Nu` | Merge a partial option, the way ECharts' setOption merges. |
| `.append(points, series=0)` | `Nu` | Push points onto one series, keeping the newest `max_points`. |
| `.clear(series=None)` | `Nu` | Empty one series' data (a position or a name), or every series'. |
| `.on_click()` | `Changed` | `{event, series, series_index, name, index, value}`: a data item clicked. |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## ScatterChart

Points on two value axes, one color per series name.

```python
ScatterChart(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.ScatterChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`set` takes `{name: [[x, y], ...]}` or `[[x, y], ...]` for the first
series. A third value, `[x, y, size]`, sets the dot size when `sized`.

**Inherited methods**

From `nustd.ui.refs.leaves.chart.Chart`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(data=<UNSET>, option=<UNSET>)` | `Nu` | Replace the data, or with `option=` the whole option (drawn from scratch). |
| `.merge(option)` | `Nu` | Merge a partial option, the way ECharts' setOption merges. |
| `.append(points, series=0)` | `Nu` | Push points onto one series, keeping the newest `max_points`. |
| `.clear(series=None)` | `Nu` | Empty one series' data (a position or a name), or every series'. |
| `.on_click()` | `Changed` | `{event, series, series_index, name, index, value}`: a data item clicked. |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## Sparkline

A small trend line: no axes, no grid, no tooltip. For stat cards and table cells.

```python
Sparkline(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.Sparkline`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`set` takes bare y values or `[[x, y], ...]`; `append([y])` streams.

**Inherited methods**

From `nustd.ui.refs.leaves.chart.Chart`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(data=<UNSET>, option=<UNSET>)` | `Nu` | Replace the data, or with `option=` the whole option (drawn from scratch). |
| `.merge(option)` | `Nu` | Merge a partial option, the way ECharts' setOption merges. |
| `.append(points, series=0)` | `Nu` | Push points onto one series, keeping the newest `max_points`. |
| `.clear(series=None)` | `Nu` | Empty one series' data (a position or a name), or every series'. |
| `.on_click()` | `Changed` | `{event, series, series_index, name, index, value}`: a data item clicked. |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## SunburstChart

Nested rings sized by value. Same data as `TreemapChart`.

```python
SunburstChart(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.SunburstChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Inherited methods**

From `nustd.ui.refs.leaves.chart.Chart`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(data=<UNSET>, option=<UNSET>)` | `Nu` | Replace the data, or with `option=` the whole option (drawn from scratch). |
| `.merge(option)` | `Nu` | Merge a partial option, the way ECharts' setOption merges. |
| `.append(points, series=0)` | `Nu` | Push points onto one series, keeping the newest `max_points`. |
| `.clear(series=None)` | `Nu` | Empty one series' data (a position or a name), or every series'. |
| `.on_click()` | `Changed` | `{event, series, series_index, name, index, value}`: a data item clicked. |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

## TreemapChart

Nested rectangles sized by value.

```python
TreemapChart(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.TreemapChart`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`set` takes nested `{name: value or {child: ...}}` or ECharts nodes
`[{name, value, children}]`.

**Inherited methods**

From `nustd.ui.refs.leaves.chart.Chart`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(data=<UNSET>, option=<UNSET>)` | `Nu` | Replace the data, or with `option=` the whole option (drawn from scratch). |
| `.merge(option)` | `Nu` | Merge a partial option, the way ECharts' setOption merges. |
| `.append(points, series=0)` | `Nu` | Push points onto one series, keeping the newest `max_points`. |
| `.clear(series=None)` | `Nu` | Empty one series' data (a position or a name), or every series'. |
| `.on_click()` | `Changed` | `{event, series, series_index, name, index, value}`: a data item clicked. |

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

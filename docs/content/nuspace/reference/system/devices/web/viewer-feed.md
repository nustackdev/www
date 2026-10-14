---
title: viewer.feed
description: "The viewer feed: one arm per interaction, all in parallel. Host only."
---

Module `nuspace.system.devices.web.viewer.feed`.

The viewer feed: one arm per interaction, all in parallel. Host only.

- **browser to store.** A viewer event runs one op over its own fields.
- **store to browser.** An open plane or its pane's run changed; its arm
  ships the plane or the statuses again, keyed by `plane_id`.

**A pane with nothing to draw is told why.** A route nav does not bring up
(`routable`) ships `set_absent` in
place of the plane: `missing` when there is no such plane, `headless`
when it is not a ui one. The same arm reships, so a plane deleted from
another tab turns its pane absent, and one that comes back or turns ui is
drawn again.

**Which planes are open** is `connections[sid].routes`, written by the
device's route arm (D15), never read off the browser. One arm per plane in
it: its subscriptions die with it when the plane leaves `routes`.

**Narrow watch.** A plane is shipped again when anything under its row
changes, its `version` counting every write to its cells included; the
statuses when the pane's plane run or the plane's cells change, or a cell
run of the pane's run starts, begins or ends. Nothing of another plane or
run wakes either, and neither does a cell writing its state or a cell run
writing its output. Both are level: each ship reads the store as it is, so
a change a fresh subscription missed ships on the next re-check, and only
what reads otherwise than it last shipped is sent.

**Meta goes both ways.** A shipped plane carries its whole meta, and a
`plane.meta` event merges keys into it. A plane's props never reach the
browser, a cell's ship as a flat `made_by` and `has_ui`, and neither is written from it.

**Statuses come from records, never stored.** A pane shows the plane run
nav made for it (`pane_run`), so two tabs
on one plane each see their own. Per cell: its live cell run in that run if
it has one, else its most recent. Live and not started is starting, live
and started is running. Ended, it is idle when it exited `ok`, stopped
when `interrupted` or `killed`, failed (with its error) when
`failed`. No run, or no cell run of the cell, is idle.

| Name | Call | Meaning |
| --- | --- | --- |
| [viewer_feed](#viewer_feed) | `web.viewer_feed(viewer, sid, snippets=())` | The viewer, live, as one term. Built per connection, never ends. |

## viewer_feed

The viewer, live, as one term. Built per connection, never ends.

```python
web.viewer_feed(viewer, sid, snippets=())
```

Path `nuspace.system.devices.web.viewer_feed`. Defined on `nuspace.system.devices.web.viewer.feed`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `viewer` | `Ref` |  | The shell's viewer ref. |
| `sid` | `nu.StrArg` |  | The connection id, whose `connections[sid].routes` says which planes are open. The row must exist before this runs. |
| `snippets` | `Iterable[Snippet]` | `()` | The registered snippets, what a created cell stores. |

Undocumented: example.

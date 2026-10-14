---
title: sidebar.feed
description: "The sidebar feed: one arm per interaction, all in parallel. Host only."
---

Module `nuspace.system.devices.web.sidebar.feed`.

The sidebar feed: one arm per interaction, all in parallel. Host only.

- **browser to store.** A sidebar event runs one op over its own fields.
- **store to browser.** The tree changed; the arm ships it again.

**One tree.** Every plane with `props.ui` is listed, under its parent and
in its parent's sibling order, top level planes (`Space.top`) under the
space row. `made_by` and `system` group nothing. A drawn plane whose
parent is not drawn (a service's child) is shown at the top level, after the
rest, so nothing drawn goes missing.

**Icons.** A row carries its plane's `meta.icon` and no other meta key.
The browser falls back to the registered Plane's icon when it is empty.

**System.** A row carries `props.system`, so the browser offers no delete
for a plane `remove_plane` refuses.

**Pins.** `Space.pinned` ships with the tree, in order, drawn planes only.
A pin is a shortcut: the pinned plane is in the tree as well.

**Search.** `search.run` makes a search (`search`)
over the snippets the space registered with a `search`; the browser opens
the search plane itself.

**Narrow watch.** The tree is shipped again when the set of planes, a
plane's name, props or icon, the nesting, or the pins change, and nothing
else: a cell writing its state or the kernel writing a run never wakes it.

| Name | Call | Meaning |
| --- | --- | --- |
| [sidebar_feed](#sidebar_feed) | `web.sidebar_feed(sidebar, planes, snippets=())` | The sidebar, live, as one term. Built per connection, never ends. |

## sidebar_feed

The sidebar, live, as one term. Built per connection, never ends.

```python
web.sidebar_feed(sidebar, planes, snippets=())
```

Path `nuspace.system.devices.web.sidebar_feed`. Defined on `nuspace.system.devices.web.sidebar.feed`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sidebar` | `Ref` |  | The shell's sidebar ref. |
| `planes` | `Sequence[Plane]` |  | The registered Planes, what `plane.create` can create. |
| `snippets` | `Sequence[Snippet]` | `()` | The registered snippets, what `search.run` can search. |

Undocumented: example.

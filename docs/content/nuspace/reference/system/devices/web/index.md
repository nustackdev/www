---
title: web
description: "The web device: the browser shell, its feeds, and the session env."
---

Module `nuspace.system.devices.web`.

The web device: the browser shell, its feeds, and the session env.

- `shell`: the frame a tab holds, the sidebar and the viewer.
- `sidebar`, `viewer`: each region's ref, wire vocabulary and
  feed.
- `session`: how a worker reaches a connection, and the host's book.
- `env`: the session env factory (D17).
- `device`: `serve_web`, the term and the envs to register.

Everything here but `device` is safe for a worker to import: a
drawing run's body holds refs from this package, and unpickling it imports
them. `device` reaches the ws server, which imports uvicorn and
starlette, so it is loaded only when `serve_web` is asked for.

## shell

Module `nuspace.system.devices.web.shell`.

The frame: what a browser tab holds before any plane is drawn.

[Full entries](/docs/nuspace/reference/system/devices/web/shell)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Boot](/docs/nuspace/reference/system/devices/web/shell#boot) | `scalar_command` | `Boot(shape_cls, seeds=None)` | Seed one browser's tree: clear it, then one `init` per slot. |
| [Shell](/docs/nuspace/reference/system/devices/web/shell#shell) |  |  | The top of one browser tab: the sidebar and the viewer. |

## session

Module `nuspace.system.devices.web.session`.

One browser connection, and how a worker reaches it.

[Full entries](/docs/nuspace/reference/system/devices/web/session)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ConnectedSession](/docs/nuspace/reference/system/devices/web/session#connectedsession) | `bracket` | `ConnectedSession(address, sid)` | Bind connection `sid` as the session, over the pipe at `address`. |
| [piped_session](/docs/nuspace/reference/system/devices/web/session#piped_session) |  | `web.piped_session(address, sid, body)` | `body` with connection `sid` bound as the session it draws on. |
| [served_sessions](/docs/nuspace/reference/system/devices/web/session#served_sessions) |  | `web.served_sessions(address)` | Every live connection on one socket, so a worker can draw on one. |

## sidebar.ref

Module `nuspace.system.devices.web.sidebar.ref`.

The sidebar as one node on the browser's tree.

[Full entries](/docs/nuspace/reference/system/devices/web/sidebar-ref)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [SidebarRef](/docs/nuspace/reference/system/devices/web/sidebar-ref#sidebarref) | `ref` | `SidebarRef(address, parent_ref=None, owner_shape=None, props=None)` | Every plane that draws, as one browser node. |

## utils

Module `nuspace.system.devices.web.utils`.

The small things both regions and the device are built out of. Helpers, not concepts.

[Full entries](/docs/nuspace/reference/system/devices/web/utils)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [SpaceRef](/docs/nuspace/reference/system/devices/web/utils#spaceref) | `ref` | `SpaceRef(address, parent_ref=None, owner_shape=None, props=None)` | Base for every ref nuspace itself mounts on a browser. A mark. |
| [cell_ui](/docs/nuspace/reference/system/devices/web/utils#cell_ui) |  | `web.cell_ui(viewer, cell)` | One cell's own node under `viewer`. |
| [cells_ui](/docs/nuspace/reference/system/devices/web/utils#cells_ui) |  | `web.cells_ui(viewer)` | Every drawn cell's node under `viewer`, as one ref: the plane, as drawn. |

## viewer.ref

Module `nuspace.system.devices.web.viewer.ref`.

The viewer as one node on the browser's tree.

[Full entries](/docs/nuspace/reference/system/devices/web/viewer-ref)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ViewerRef](/docs/nuspace/reference/system/devices/web/viewer-ref#viewerref) | `ref` | `ViewerRef(address, parent_ref=None, owner_shape=None, props=None)` | The open planes' cells, as one browser node. |

## device

Module `nuspace.system.devices.web.device`.

The web device: the ws server, its connections in the store, the feeds.

[Full entries](/docs/nuspace/reference/system/devices/web/device)

| Name | Call | Meaning |
| --- | --- | --- |
| [connection](/docs/nuspace/reference/system/devices/web/device#connection) | `web.connection(sid, planes=(), snippets=(), shell=Shell)` | What one browser tab runs, with its session bound. Never ends. |
| [serve_web](/docs/nuspace/reference/system/devices/web/device#serve_web) | `web.serve_web(planes=(), snippets=(), host='127.0.0.1', port=8080, static='nuspace_ui', open_browser=True, log_level='warning', session_address=None)` | The web device: the term the host runs, and the envs it registers. |

## env

Module `nuspace.system.devices.web.env`.

The session env (D17): a run drawing on one browser connection.

[Full entries](/docs/nuspace/reference/system/devices/web/env)

| Name | Call | Meaning |
| --- | --- | --- |
| [session_env](/docs/nuspace/reference/system/devices/web/env#session_env) | `web.session_env(address)` | The session env factory for a host serving connections at `address`. |

## sidebar.feed

Module `nuspace.system.devices.web.sidebar.feed`.

The sidebar feed: one arm per interaction, all in parallel. Host only.

[Full entries](/docs/nuspace/reference/system/devices/web/sidebar-feed)

| Name | Call | Meaning |
| --- | --- | --- |
| [sidebar_feed](/docs/nuspace/reference/system/devices/web/sidebar-feed#sidebar_feed) | `web.sidebar_feed(sidebar, planes, snippets=())` | The sidebar, live, as one term. Built per connection, never ends. |

## viewer.feed

Module `nuspace.system.devices.web.viewer.feed`.

The viewer feed: one arm per interaction, all in parallel. Host only.

[Full entries](/docs/nuspace/reference/system/devices/web/viewer-feed)

| Name | Call | Meaning |
| --- | --- | --- |
| [viewer_feed](/docs/nuspace/reference/system/devices/web/viewer-feed#viewer_feed) | `web.viewer_feed(viewer, sid, snippets=())` | The viewer, live, as one term. Built per connection, never ends. |

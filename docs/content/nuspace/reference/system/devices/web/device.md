---
title: device
description: "The web device: the ws server, its connections in the store, the feeds."
---

Module `nuspace.system.devices.web.device`.

The web device: the ws server, its connections in the store, the feeds.

A device owns an external resource and makes it bindable. It never runs a
cell (D1): which plane runs for a tab is the nav service's call, made from
`connections[sid].routes`, which this device writes and nobody else (D14).

Per connection, one arm:

1. `connections[sid] = {opened: now, routes: []}`;
2. in parallel: the route arm, and the shell boot followed by the sidebar
   and viewer feeds. The route arm subscribes beside the boot rather than
   after it, so the browser's first `planes.open` cannot land before
   anybody listens;
3. on every way out, `connections[sid]` is deleted.

The route arm (D15): the viewer's `planes.open` carries the full ordered
list of open planes (its panes, left to right). Deduped with order kept and
empty ids dropped, it is written whole as `routes`. Every plane that left
the list has its cells erased as drawn first. The planes newly in the list
are pushed onto `Space.state.recents` in the same commit (`remember`).

What a run needs to draw on a tab is the session env, returned beside the
term for the host to register with the kernel.

Beside the socket the server answers one plain route,
`/api/telemetry-config`: the user's telemetry choice and id (see
`_telemetry`), so the browser's events follow the same opt out.

| Name | Call | Meaning |
| --- | --- | --- |
| [connection](#connection) | `web.connection(sid, planes=(), snippets=(), shell=Shell)` | What one browser tab runs, with its session bound. Never ends. |
| [serve_web](#serve_web) | `web.serve_web(planes=(), snippets=(), host='127.0.0.1', port=8080, static='nuspace_ui', open_browser=True, log_level='warning', session_address=None)` | The web device: the term the host runs, and the envs it registers. |

## connection

What one browser tab runs, with its session bound. Never ends.

```python
web.connection(sid, planes=(), snippets=(), shell=Shell)
```

Path `nuspace.system.devices.web.connection`. Defined on `nuspace.system.devices.web.device`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sid` | `nu.StrArg` |  | The connection id. |
| `planes` | `Sequence[Plane]` | `()` | The registered Planes, what the sidebar can create. |
| `snippets` | `Sequence[Snippet]` | `()` | The registered snippets, for the viewer's `/` menu and the sidebar's search. |
| `shell` | `type[Shell]` | `Shell` | The shell every tab holds. |

Undocumented: example.

## serve_web

The web device: the term the host runs, and the envs it registers.

```python
web.serve_web(planes=(), snippets=(), host='127.0.0.1', port=8080, static='nuspace_ui', open_browser=True, log_level='warning', session_address=None)
```

Path `nuspace.system.devices.web.serve_web`. Defined on `nuspace.system.devices.web.device`, bound as a function. Builds `tuple[nu.Nu, dict[str, EnvFactory]]`.

The term opens the server and the socket workers draw through, then
runs one arm per connection. Connections a previous open left are the
host's to clear, before init starts (D34). It
never returns; it goes in a `body=` slot, beside the kernel, inside the
store brackets (`open_kernel`).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `planes` | `Sequence[Plane]` | `()` | The registered Planes, what the sidebar can create. |
| `snippets` | `Sequence[Snippet]` | `()` | The registered snippets: the viewer's `/` menu, and what a cell made from each entry stores. |
| `host` | `str` | `'127.0.0.1'` | The interface the server binds. |
| `port` | `int` | `8080` | The port the server binds. |
| `static` | `str \| None` | `'nuspace_ui'` | The wheel shipping the browser bundle. None serves the socket alone, eg for a vite dev server. |
| `open_browser` | `bool` | `True` | Open the URL once the server is up. |
| `log_level` | `str` | `'warning'` | How much the server says. |
| `session_address` | `str \| None` | `None` | `host:port` for the connection socket. A free port by default. |

Undocumented: example.

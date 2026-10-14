---
title: session
description: "One browser connection, and how a worker reaches it."
---

Module `nuspace.system.devices.web.session`.

One browser connection, and how a worker reaches it.

A cell never runs in the host, so a cell that draws is always across a
process boundary. The two ends talk over a frame pipe: one TCP stream per
worker process, length-prefixed msgpack messages, every live connection
multiplexed over it by sid.

- **worker side**: `piped_session` binds a `PipeSession` for
  connection `sid`, a local `Session` whose every call is a message
  on the worker's one pipe. This module imports no web server at module
  scope: a worker unpickling a body would otherwise load uvicorn and starlette
  for a server it never runs.
- **host side**: `served_sessions` puts `SessionPipe` on one
  socket, a router on the host's loop between the pipe and the ws server's
  book of connections.

**Why a pipe and not a proxy.** Both ends are asyncio loops, and the host's
is the one every browser socket lives on. A proxy is a blocking call: a
browser edit firing a reverse proxy into the worker blocked the host loop,
and the worker drawing in answer needed that same loop, so the host hung.
Here nothing blocks and nothing calls back: the host only reads and writes
messages, the worker owns its subscriptions, and a notify is one message.

Messages, each a msgpack array whose first item is the kind:

- worker -> host: `open(rid, sid)`, `send(sid, frame)`,
  `read(rid, sid, path)`, `sub(id, sid, path)`, `unsub(id)`
- host -> worker: `reply(rid, ok, value)`, `notify(id, payload)`

`frame` is a frame already encoded the way the browser reads it.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ConnectedSession](#connectedsession) | `bracket` | `ConnectedSession(address, sid)` | Bind connection `sid` as the session, over the pipe at `address`. |
| [piped_session](#piped_session) |  | `web.piped_session(address, sid, body)` | `body` with connection `sid` bound as the session it draws on. |
| [served_sessions](#served_sessions) |  | `web.served_sessions(address)` | Every live connection on one socket, so a worker can draw on one. |

## ConnectedSession

Bind connection `sid` as the session, over the pipe at `address`.

```python
ConnectedSession(address, sid)
```

Path `nuspace.system.devices.web.ConnectedSession`. Kind `Bracket`, sort `bracket`, cardinality `transparent`. Arity 2 (2 required).

Opening asks the host whether the connection is live, so a run for a tab
that closed between dispatch and now fails here rather than drawing into
nothing.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `address` | `str` |  | `host:port` where `served_sessions` listens. |
| `sid` | `str` |  | The connection id, fixed when the run's env is built. |

Undocumented: yields, example.

## piped_session

`body` with connection `sid` bound as the session it draws on.

```python
web.piped_session(address, sid, body)
```

Path `nuspace.system.devices.web.piped_session`. Defined on `nuspace.system.devices.web.session`, bound as a function. Builds `nu.With`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `address` | `str` |  | `host:port` where `served_sessions` listens. |
| `sid` | `str` |  | The connection id. |
| `body` | `nu.Nu` |  | What runs with the connection bound. Pickled into the worker. |

Undocumented: example.

## served_sessions

Every live connection on one socket, so a worker can draw on one.

```python
web.served_sessions(address)
```

Path `nuspace.system.devices.web.served_sessions`. Defined on `nuspace.system.devices.web.session`, bound as a function. Builds `nu.With`.

Goes inside the server bracket: the book it reads is the server's.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `address` | `str` |  | `host:port` to listen on. |

Undocumented: example.

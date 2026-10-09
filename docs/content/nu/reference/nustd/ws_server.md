---
title: ws_server
description: "nustd.ws_server -- a websocket host, in three layers plus a bracket."
---

Module `nustd.ws_server`.

nustd.ws_server -- a websocket host, in three layers plus a bracket.

Generic connection lifecycle and nothing else: it knows sockets, not wire
formats. The session class handed to it owns the protocol end to end.

1. `fabric` -- a server that boots uvicorn, binds itself, and stops on the
   way out. It owns the book of live connections and the channel that
   announces that book moving.
2. `ref` -- `ServerRef`, the server as a value inside the tree.
3. `interactions` -- every term that reaches the book: the live ids, the
   change subscription, one connection's `done`, and `SessionFor`, the
   bracket that hands an arm the transport of the connection it belongs to.
4. `driver` -- the fold that runs one arm of the program per connection.

Plus `preset`, where `listen` stacks the bracket for a `nu.With` spec
slot. The lifetime of an arm is the lifetime of a socket, in both directions.

## interactions

Module `nustd.ws_server.interactions`.

Every term that reaches the connection book, and the bracket that opens one.

The four atoms take a `ServerRef` in slot 0 and read the `WebServer` it
resolves to, yielding INVALID when no server bracket is open around this
subtree. `SessionFor` is the bracket an arm runs inside, holding that
connection's transport.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [LiveSessions](#livesessions) | `scalar_query` | `LiveSessions()` | The session id of every connection the server currently holds open. |
| [MarkSessionDone](#marksessiondone) | `scalar_command` | `MarkSessionDone()` | Record that the program of the connection at slot 1 has ended. |
| [SessionDone](#sessiondone) | `scalar_query` | `SessionDone()` | Whether the program of the connection at slot 1 has already ended. |
| [SessionFor](#sessionfor) | `bracket` | `SessionFor(body=None, sid_attr='sid')` | Bind the ws transport of the connection this arm belongs to. |
| [SessionsChanged](#sessionschanged) | `scalar_query` | `SessionsChanged()` | Subscribe to connections opening and closing, on one ordered channel. |

### LiveSessions

The session id of every connection the server currently holds open.

```python
LiveSessions()
```

Path `nustd.ws_server.LiveSessions`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

### MarkSessionDone

Record that the program of the connection at slot 1 has ended.

```python
MarkSessionDone()
```

Path `nustd.ws_server.MarkSessionDone`. Kind `Command`, sort `scalar_command`, cardinality `void`.

A sid the server does not hold is a plain miss: nothing is created and
nothing is announced.

Undocumented: yields, example.

### SessionDone

Whether the program of the connection at slot 1 has already ended.

```python
SessionDone()
```

Path `nustd.ws_server.SessionDone`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

False for a sid the server does not hold: a closed socket has no arm
left to guard.

Undocumented: yields, example.

### SessionFor

Bind the ws transport of the connection this arm belongs to.

```python
SessionFor(body=None, sid_attr='sid')
```

Path `nustd.ws_server.SessionFor`. Kind `Bracket`, sort `bracket`, cardinality `transparent`. Arity 2 (0 required).

Reads the sid off the Context the fold branched for this arm, looks the
live session up in the server's connection book, and binds it under the
session class's `_nu_bind_as` -- the abstract type the protocol's terms
ask for -- falling back to the concrete class when there is none. Nothing
is torn down: the server owns the session and the endpoint closes it.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `body` | `Nu \| None` | `None` | the tree that runs with the session bound. |
| `sid_attr` | `str` | `'sid'` | the attr the fold parked this arm's session id under. |

Undocumented: yields, example.

### SessionsChanged

Subscribe to connections opening and closing, on one ordered channel.

```python
SessionsChanged()
```

Path `nustd.ws_server.SessionsChanged`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Both moments ride the same subscription, so the open and the close of one
sid can never be seen out of order. Nothing else emits on it, so a write
into the registry does not wake whoever is bound.

Undocumented: yields, example.

## ref

Module `nustd.ws_server.ref`.

`ServerRef` -- the running `WebServer`, reachable from inside the tree.

Its four methods are the whole surface the fold and its arms need: the live
session ids, a subscription on connections opening and closing, and the read
and the write of one connection's `done` flag.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ServerRef](#serverref) | `ref` | `ServerRef(address=None)` | The `WebServer` bound on the Context, and the registry it holds. |

### ServerRef

The `WebServer` bound on the Context, and the registry it holds.

```python
ServerRef(address=None)
```

Path `nustd.ws_server.ServerRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Reads as the server instance itself, EMPTY when no server bracket is open
around this subtree.

**Methods**

#### `.fabric(session_cls, static=None, host='127.0.0.1', port=8080, log_level='warning', banner='Nu ws server', open_browser=True, ready_timeout=10.0, shutdown_timeout=5.0)`

Boot a ws server for the body's duration; bind it; stop it on the way out.

Builds `None`.

Owns the sockets and nothing else -- there is no `app` kwarg, the program
a connection runs is a child of the tree.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `session_cls` | `Callable[[WebSocket], SessionProtocol]` |  | built once per accepted socket, with the `WebSocket` as its only argument. Its `run_intake` is what holds the connection open, and its `_nu_bind_as` is what an arm binds it under. |
| `static` | `str \| None` | `None` | the importable wheel that ships a compiled SPA under `build/`. None mounts nothing and exposes `/ws` alone. |
| `host` | `str` | `'127.0.0.1'` |  |
| `port` | `int` | `8080` |  |
| `log_level` | `str` | `'warning'` | uvicorn log level. Defaults to `"warning"` -- we print our own ready/stopped banner. |
| `banner` | `str` | `'Nu ws server'` | what the ready and stopped lines call this server. |
| `open_browser` | `bool` | `True` |  |
| `ready_timeout` | `float` | `10.0` | how long `asetup` waits for uvicorn to come up. |
| `shutdown_timeout` | `float` | `5.0` | how long `acleanup` waits for graceful exit before cancelling the task. |

**Example**

```python
nu.With(
    nustd.ws_server.listen(session_cls=EchoSession, port=8080),
    body=program,
)
```

#### `.sessions()`

The ids of every live ws connection, as one list.

Builds `LiveSessions`.

Undocumented: example.

#### `.on_change()`

A change source firing a sid per connection opened and closed.

Builds `SessionsChanged`.

Undocumented: example.

#### `.done(sid)`

Whether the program for `sid` has already ended.

Builds `SessionDone`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sid` | `object` |  |  |

Undocumented: example.

#### `.mark_done(sid)`

Record that the program for `sid` has ended.

Builds `MarkSessionDone`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sid` | `object` |  |  |

Undocumented: example.

**Inherited methods**

From `nu.context.fabric.refs.FabricRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `FabricExists` | A Query yielding whether this Ref's fabric type is bound on the Context. |

Undocumented: example.

## preset

Module `nustd.ws_server.preset`.

`listen` -- the server bracket, ready to drop in a `nu.With` spec slot.

| Name | Call | Meaning |
| --- | --- | --- |
| [listen](#listen) | `ws_server.listen(session_cls, static=None, host='127.0.0.1', port=8080, log_level='warning', banner='Nu ws server', open_browser=True, ready_timeout=10.0, shutdown_timeout=5.0)` | The bare server bracket: `Provide(WebServer, {...})`, no body. |

### listen

The bare server bracket: `Provide(WebServer, {...})`, no body.

```python
ws_server.listen(session_cls, static=None, host='127.0.0.1', port=8080, log_level='warning', banner='Nu ws server', open_browser=True, ready_timeout=10.0, shutdown_timeout=5.0)
```

Path `nustd.ws_server.listen`. Defined on `nustd.ws_server.preset`, bound as a function. Builds `Provide`.

For hand-assembled trees. Stack it with `sessions_fold` to get one live
arm per connection. Bodyless, so it belongs in a `nu.With` spec slot and
nowhere else -- run standalone it compiles that empty slot to a literal and
yields None.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `session_cls` | `Callable[[WebSocket], SessionProtocol]` |  | built once per accepted socket, with the `WebSocket` as its only argument. Owns the wire format end to end. |
| `static` | `str \| None` | `None` | the wheel shipping the compiled SPA. None serves `/ws` alone, for a headless run or a separate vite dev server. |
| `host` | `str` | `'127.0.0.1'` | uvicorn bind host. |
| `port` | `int` | `8080` | uvicorn bind port. |
| `log_level` | `str` | `'warning'` | uvicorn log level. Default silences uvicorn's info chatter so only our own ready/stopped banner is printed. |
| `banner` | `str` | `'Nu ws server'` | what the ready and stopped lines call this server. |
| `open_browser` | `bool` | `True` | open the bound URL in the default browser once ready. |
| `ready_timeout` | `float` | `10.0` | how long `asetup` waits for uvicorn to come up. |
| `shutdown_timeout` | `float` | `5.0` | how long `acleanup` waits for graceful exit before cancelling the task. |

**Example**

```python
nu.With(
    nustd.ws_server.listen(session_cls=EchoSession, port=8080),
    body=program,
)
```

## driver

Module `nustd.ws_server.driver`.

The Nu side of a connection: fold over the live ones, hand each its session.

Three terms, in the order they run:

- `sessions_fold` -- one live arm per connection the server holds open.
- `session_for` -- inside an arm, bind that connection's transport.
- `run_once` -- inside an arm, run the program at most once per connection.

The fold reads the server's connection book directly, so there is nothing
between a socket opening and an arm starting.

| Name | Call | Meaning |
| --- | --- | --- |
| [run_once](#run_once) | `ws_server.run_once(body, sid_attr='sid')` | Run `body` for this connection at most once, and mark it done after. |
| [session_for](#session_for) | `ws_server.session_for(sid_attr='sid', body=None)` | `SessionFor` in call order: the attr first, then what runs under it. |
| [sessions_fold](#sessions_fold) | `ws_server.sessions_fold(arm)` | Run `arm` once per live connection, births and deaths included. |

### run_once

Run `body` for this connection at most once, and mark it done after.

```python
ws_server.run_once(body, sid_attr='sid')
```

Path `nustd.ws_server.run_once`. Defined on `nustd.ws_server.driver`, bound as a function. Builds `Nu`.

The fold frees the key of every arm whose task has ended and respawns it,
so a program that returns would be booted again on the next connect or
disconnect. `done` on the connection is what a respawned arm reads to
become a no-op. A failure is reported and marks done all the same, so a
program that raises leaves a stopped connection instead of a retry loop.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `body` | `Nu` |  | what one connection runs, whatever it sends at connect included. |
| `sid_attr` | `str` | `'sid'` | the attr the fold parked this arm's session id under. |

**Example**

```python
session_for(SID_ATTR, run_once(program))
```

### session_for

`SessionFor` in call order: the attr first, then what runs under it.

```python
ws_server.session_for(sid_attr='sid', body=None)
```

Path `nustd.ws_server.session_for`. Defined on `nustd.ws_server.driver`, bound as a function. Builds `SessionFor`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sid_attr` | `str` | `'sid'` |  |
| `body` | `Nu \| None` | `None` |  |

**Example**

```python
session_for(SID_ATTR, run_once(program))
```

### sessions_fold

Run `arm` once per live connection, births and deaths included.

```python
ws_server.sessions_fold(arm)
```

Path `nustd.ws_server.sessions_fold`. Defined on `nustd.ws_server.driver`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `arm` | `Nu` |  | the body one connection gets. Spawned when the connection appears in the server's book, cancelled and drained when it goes. |

Undocumented: example.

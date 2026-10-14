---
title: valkey
description: "nustd.valkey - a private Valkey server, as one fabric."
---

Module `nustd.valkey`.

nustd.valkey - a private Valkey server, as one fabric.

Cross-process kv change notifications ride Redis pub/sub
(`nustd.kv.sqlite_navigator_redis` and friends). This fabric makes sure
there is a Redis-protocol server to ride on without anyone installing one: the
host brings up the `valkey-server` binary bundled in the `valkeylite`
wheel, private to one data dir, on a unix socket.

- `ValkeyServer` - the resource. Setup reaps a server a crashed owner left
  behind, starts a fresh one and returns once it answers `PING`. Cleanup
  stops it. A watchdog stops it too if the owner dies without cleanup.
- `ValkeyRef` - the fabric ref, with the fluent `url()` / `ping()`.
- `Url` / `Ping` - the interactions, both reads.
- `server(data_dir)` - the preset `Provide`.
- `url_for(data_dir)` - the server's address, known before it starts:

```python
d = ".nu/valkey"
app = nu.With(
    nustd.valkey.server(d),
    nustd.kv.sqlite_navigator_redis(".nu/kv.sqlite", redis_url=nustd.valkey.url_for(d)),
    body=program,
)
```

Importing this module pulls nothing beyond the stdlib; `valkeylite` is
reached for only when a server starts, so a worker that only needs the URL
does not need the extra installed.

## interactions

Module `nustd.valkey.interactions`.

The interactions of the `nustd.valkey` fabric.

Two reads over one `ValkeyServer`: `Url` and `Ping`. Starting and
stopping are not interactions. The server's whole lifecycle is its `Provide`
bracket, the same way `nustd.mp`'s one process is, because everything that
talks to it (a kv stack's publisher and observer) is bound inside that bracket
and a server stopped mid-body would pull the floor out from under them.

The server address is a **child**, never payload, so it can come from any Ref
or query.

==========  =========  ===========
atom        slots      sort
==========  =========  ===========
Url         (server,)  ScalarQuery
Ping        (server,)  ScalarQuery
==========  =========  ===========

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Ping](#ping) | `scalar_query` | `Ping(server=None)` | Whether the bound server answers a `PING` right now. |
| [Url](#url) | `scalar_query` | `Url(server=None)` | The `unix://` URL a Redis client reaches the bound server with. |

### Ping

Whether the bound server answers a `PING` right now.

```python
Ping(server=None)
```

Path `nustd.valkey.Ping`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (0 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `server` | `Nu \| None` | `None` | the node yielding the `ValkeyServer`. Defaults to the untagged `ValkeyRef`. |

**Yields**

True or False.

**Notes**

- A real round trip over the unix socket, not a process check, so a wedged server reads False.
- Never raises for a dead server; that is what False is for.

**Example**

```python
With(nustd.valkey.server(".vk"), body=Ping())
```

### Url

The `unix://` URL a Redis client reaches the bound server with.

```python
Url(server=None)
```

Path `nustd.valkey.Url`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (0 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `server` | `Nu \| None` | `None` | the node yielding the `ValkeyServer`. Defaults to the untagged `ValkeyRef`. |

**Yields**

The URL, a str.

**Notes**

- The same string `nustd.valkey.url_for(data_dir)` builds without a server, which is what a kv preset built outside the tree needs. This read is for the tree that wants it from the bound server itself.
- A pure read; the server is not contacted.

**Example**

```python
With(nustd.valkey.server(".vk"), body=Print(STDOUT, Url()))
```

## refs

Module `nustd.valkey.refs`.

`ValkeyRef`: the fabric ref that resolves the `ValkeyServer` bound on ctx.

A plain `FabricRef`: the address is the fabric type, so the read is the
untagged binding, same as `nustd.mp_pool.PoolRef`. It also carries this
fabric's fluent surface: `ValkeyRef().url()` and `Url(ValkeyRef())` build
the same term.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ValkeyRef](#valkeyref) | `ref` | `ValkeyRef(address=None)` | The `ValkeyServer` bound on the Context. |

### ValkeyRef

The `ValkeyServer` bound on the Context.

```python
ValkeyRef(address=None)
```

Path `nustd.valkey.ValkeyRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Reading it is a lookup and nothing else; the server is not contacted.
- The methods are a convenience over the constructors, each returning the same term the matching `Url(...)` / `Ping(...)` call would.

**Example**

```python
With(nustd.valkey.server(".vk"), body=ValkeyRef().ping())
```

**Methods**

#### `.fabric(data_dir, socket_path=None, logfile='valkey.log', config=None, ready_timeout=10.0, grace=2.0, watchdog=True)`

A private Valkey server for one data dir, owned by one bracket.

Builds `None`.

Provided once near the top of a tree, around whatever talks to it:

```python
With(
    Provide(ValkeyServer, {"data_dir": d}),
    sqlite_navigator_redis(db, redis_url=url_for(d)),
    body=program,
)
```

Setup reaps a server a crashed owner left behind in the same dir, starts a
fresh one on the dir's unix socket and returns once it answers `PING`.
Cleanup stops it and removes its pid, owner and socket files.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `data_dir` | `str \| os.PathLike[str]` |  | the directory the server owns. Created if missing. Holds the config, pid file, owner file and log. |
| `socket_path` | `str \| None` | `None` | an explicit unix socket path, overriding the one derived from `data_dir`. Every client has to be told the same path. |
| `logfile` | `str \| None` | `'valkey.log'` | where the server logs, relative to `data_dir` unless absolute. None discards the log. |
| `config` | `dict[str, object] \| None` | `None` | extra Valkey config directives, name to value, applied over the defaults (no RDB, no AOF, no TCP port). |
| `ready_timeout` | `float` | `10.0` | how long setup waits for the first `PONG`. |
| `grace` | `float` | `2.0` | how long a SIGTERM is given before SIGKILL, on stop and on reap. |
| `watchdog` | `bool` | `True` | run the `sh` watchdog that stops the server when this process dies. Off leaves only the reap at next start. |

**Notes**

- No persistence by default: `save ""` and `appendonly no`. The server is a notification bus, its keyspace is disposable.
- `port 0`: unix socket only, nothing listens on TCP.
- A live server whose owner is also alive is not reaped; setup raises `ValkeyInUse` instead, so two hosts on one dir do not keep killing each other's server.
- Both lifecycles are supported. `asetup` polls readiness with `asyncio.sleep`; `acleanup` runs inline with no await points, so a cancellation cannot abandon a half-stopped server.

Undocumented: example.

#### `.url()`

A `Url` read on this server: the `unix://` URL clients connect with.

Builds `Url`.

Undocumented: example.

#### `.ping()`

A `Ping` read on this server: does it answer right now.

Builds `Ping`.

Undocumented: example.

**Inherited methods**

From `nu.context.fabric.refs.FabricRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Bool` | Whether this Ref's fabric type is bound on the Context, as a `Bool`. |

## presets

Module `nustd.valkey.presets`.

Presets over `nustd.valkey`: the bracket that brings a server up, and its address.

`server(data_dir)` is the `Provide` a host puts at the top of its tree.
`url_for(data_dir)` is the address that server will listen on, computed
without starting anything, so the kv stack that talks to it can be built in
the same `With`, and a worker process can build the same URL on its own:

```python
d = ".nu/valkey"
app = nu.With(
    nustd.valkey.server(d),
    nustd.kv.sqlite_navigator_redis(".nu/kv.sqlite", redis_url=nustd.valkey.url_for(d)),
    body=program,
)
```

`With` opens its brackets in order, so the server is answering before the
kv stack's Redis publisher and observer connect, and it is stopped after they
have closed.

| Name | Call | Meaning |
| --- | --- | --- |
| [server](#server) | `valkey.server(data_dir, socket_path=None, logfile='valkey.log', config=None, ready_timeout=10.0, grace=2.0, watchdog=True, tags=())` | Brings up a private Valkey server for `data_dir` for the body's duration. |

### server

Brings up a private Valkey server for `data_dir` for the body's duration.

```python
valkey.server(data_dir, socket_path=None, logfile='valkey.log', config=None, ready_timeout=10.0, grace=2.0, watchdog=True, tags=())
```

Path `nustd.valkey.server`. Defined on `nustd.valkey.presets`, bound as a function. Builds `Provide`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `data_dir` | `str \| os.PathLike[str]` |  | the directory the server owns: config, pid file, log. |
| `socket_path` | `str \| None` | `None` | an explicit unix socket path instead of the one derived from `data_dir`. Pass the same one to `url_for`. |
| `logfile` | `str \| None` | `'valkey.log'` | the server log, relative to `data_dir` unless absolute. None discards it. |
| `config` | `dict[str, object] \| None` | `None` | extra Valkey directives applied over the defaults. |
| `ready_timeout` | `float` | `10.0` | how long setup waits for the server to answer. |
| `grace` | `float` | `2.0` | SIGTERM to SIGKILL escalation window, on stop and on reap. |
| `watchdog` | `bool` | `True` | stop the server if this process dies without cleanup. |
| `tags` | `Sequence[object]` | `()` | tags for the binding, so two servers can be told apart. |

**Yields**

A `Provide` bracket binding the `ValkeyServer`.

**Notes**

- No persistence, no TCP port: a unix socket only.
- A server a crashed owner left in the same dir is reaped first.

**Example**

```python
nu.With(nustd.valkey.server(".vk"), body=program)
```

## resources

Module `nustd.valkey.resources`.

`ValkeyServer`: the fabric that owns one private Valkey server process.

The server is the bundled `valkey-server` binary from the `valkeylite`
wheel, spawned directly rather than through `valkeylite.ValkeyServer`. That
class is fine for a test fixture and wrong for a host that has to come back
after a crash, so the parts that matter are done here instead:

- **One data dir, one server.** The dir holds `valkey.conf`, `valkey.pid`
  (the server's pid), `valkey.owner` (the pid of the process that owns it)
  and `valkey.log`.
- **A known address before start.** The unix socket path is derived from the
  data dir by hash, `/tmp/nu-vk-<hash>.sock`, so every process can build the
  URL on its own and it stays under macOS's 104 byte socket path limit
  however deep the dir is.
- **No orphans.** A small `sh` watchdog holds the read end of a pipe whose
  write end only the owner has. When the owner dies by any means, even
  SIGKILL, the pipe closes and the watchdog sends the server SIGTERM. If the
  watchdog is gone too, the next start in the same dir reaps the leftover
  server from its pid file.
- **Fast start.** Readiness is a raw RESP `PING` polled every millisecond
  or so, not every 100ms, so the bracket opens as soon as the server answers.
- **Own session.** Server and watchdog run in their own session, so a Ctrl-C
  on the terminal reaches the host, whose bracket then stops the server in
  order, instead of killing the server under whatever still talks to it.

`valkeylite` is imported only to find the binary, at setup, so importing
this module (and building a URL in a worker) needs nothing installed.

| Name | Call | Meaning |
| --- | --- | --- |
| [socket_path_for](#socket_path_for) | `valkey.socket_path_for(data_dir)` | The unix socket path the server for `data_dir` listens on. |
| [url_for](#url_for) | `valkey.url_for(data_dir, socket_path=None)` | The `unix://` URL a Redis client uses to reach the server for `data_dir`. |

### socket_path_for

The unix socket path the server for `data_dir` listens on.

```python
valkey.socket_path_for(data_dir)
```

Path `nustd.valkey.socket_path_for`. Defined on `nustd.valkey.resources`, bound as a function. Builds `str`.

Deterministic: the same absolute dir always maps to the same path, so any
process can compute it without asking the owner, before the server is up.
Short: `/tmp` plus a hash, well under the 104 byte limit macOS puts on a
socket path, however long `data_dir` is.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `data_dir` | `str \| os.PathLike[str]` |  |  |

Undocumented: example.

### url_for

The `unix://` URL a Redis client uses to reach the server for `data_dir`.

```python
valkey.url_for(data_dir, socket_path=None)
```

Path `nustd.valkey.url_for`. Defined on `nustd.valkey.resources`, bound as a function. Builds `str`.

`socket_path` overrides the derived path, and has to match the one the
server was started with.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `data_dir` | `str \| os.PathLike[str]` |  |  |
| `socket_path` | `str \| None` | `None` |  |

Undocumented: example.

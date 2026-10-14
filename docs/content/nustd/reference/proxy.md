---
title: proxy
description: "nustd.proxy - transparent RPC transport for fabrics."
---

Module `nustd.proxy`.

nustd.proxy - transparent RPC transport for fabrics.

Pure transport. No new refs, no new interactions - method calls on a client
proxy go over the wire and land on the server-side bound fabric. Same
fabric dispatch (`FabricRef`) that works locally works remotely.

- `InvisiblesServer` - reads the root fabric from ctx (by type + optional
  tag) and serves it over TCP / Unix socket.
- `InvisiblesClient` - connects and exposes the remote root as `.root`.
- `InvisiblesProxy` - bracket sugar that provisions a client and binds its
  `.root` under a caller-named fabric type in one step.

Typical topology, using `feed_run`'s ledger-main pattern:

```python
# Server side (inside a Ray worker actor typically)
Provide(RocksDBStorage, {"path": "/data/ledger-main", "codec": ...},
    Provide(Navigator, {"root_view": DictView},
        Provide(InvisiblesServer, {"target": Navigator,
                                   "address": "10.0.0.1:19000"},
            serve_forever_body,
        ),
    ),
)

# Client side (driver)
InvisiblesProxy(Navigator, address="10.0.0.1:19000",
    driver_body,
)
```

## Bracket

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [InvisiblesProxy](#invisiblesproxy) | `bracket` | `InvisiblesProxy(target, body=None, address, tag=None, transport='tcp', timeout=5.0, max_retries=3, bg_serve=False, buffered_iteration=True)` | Runs its body against a remote fabric as if the fabric were local. |

### InvisiblesProxy

Runs its body against a remote fabric as if the fabric were local.

```python
InvisiblesProxy(target, body=None, address, tag=None, transport='tcp', timeout=5.0, max_retries=3, bg_serve=False, buffered_iteration=True)
```

Path `nustd.proxy.InvisiblesProxy`. Kind `Bracket`, sort `bracket`, cardinality `transparent`. Arity 9 (2 required).

Connects to an `InvisiblesServer`, takes the root fabric it serves, and
binds that remote object on the context under the type the caller names.
Everything below reads the name and gets the proxy, so a tree written
against a local fabric runs unchanged against a remote one, and the
transport is a line at the top rather than a change to the body.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `target` | `type` |  | the fabric type the remote root is bound under. What the body asks the context for. |
| `body` | `Nu \| None` | `None` | what runs while the connection is open. |
| `address` | `str` |  |  |
| `tag` | `object` | `None` |  |
| `transport` | `str` | `'tcp'` |  |
| `timeout` | `float` | `5.0` |  |
| `max_retries` | `int` | `3` |  |
| `bg_serve` | `bool` | `False` |  |
| `buffered_iteration` | `bool` | `True` |  |

**Yields**

The body's yield, unchanged. Transparent in cardinality too: a stream
body stays a stream, and the connection stays open across the drain.

**Notes**

- Async only. A sync run raises, because connecting is lifecycle work the sync path refuses to do.
- Two things land on the context, both under `tag`: the remote root under `target`, and the `InvisiblesClient` itself, so a body can reach the connection when it needs to.
- A `target` carrying `_nu_bind_as` binds under that type instead, the same redirection `Provide` honours.
- Connecting retries up to `max_retries` times with a growing pause between attempts, and raises ConnectionError when they all fail.
- Calls on the bound root block the caller for the round trip even under the async runtime: invisibles frames them synchronously.
- `bg_serve` runs a background serving thread, needed when the remote side calls back into this process.
- The connection closes when the body finishes, so nothing survives the bracket.

**Example**

```python
app = nustd.proxy.InvisiblesProxy(
    Navigator,
    address="10.0.0.1:19000",
    body=driver_body,
)
```

---
title: core.interactions
description: "Wire interactions -- ops that flow over a Session on a Ref."
---

Module `nustd.ui.core.interactions`.

Wire interactions -- ops that flow over a Session on a Ref.

Each class's lowercased name becomes its op string in the protocol Frame
(see protocol.py). Refs decide which interactions they expose by returning
the corresponding class from their methods (e.g. ButtonRef.on_click ->
Changed, HeadingRef.set -> Write).

- Write   -- server -> client, replace a Ref's value
- Append  -- server -> client, append to a sequence-typed Ref
- Remove  -- server -> client, drop a Ref's node and everything under it
- Changed -- subscribe to client-side notifications on a Ref

All four target the abstract `Session` from core.session -- the host
plugs in its concrete transport (nudle over ws; others in future).

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Append](#append) | `scalar_command` | `Append()` | Send an `append` frame on a Ref -- push onto a sequence. |
| [Changed](#changed) | `scalar_query` | `Changed()` | Subscribe to client-side change notifications on a Ref. |
| [Remove](#remove) | `scalar_command` | `Remove()` | Send a `remove` frame on a Ref -- drop its node and its whole subtree. |
| [Write](#write) | `scalar_command` | `Write()` | Send a `write` frame on a Ref -- replace the value. |

## Append

Send an `append` frame on a Ref -- push onto a sequence.

```python
Append()
```

Path `nustd.ui.Append`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Multi-arg form for charts: `chart.append(x, y)` ships `[x, y]` as
payload. Single-arg form ships the value directly.

Undocumented: yields, example.

## Changed

Subscribe to client-side change notifications on a Ref.

```python
Changed()
```

Path `nustd.ui.Changed`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Resolves to a `Subscription` handle that ReactForever and friends drive.
No outbound frame is sent when this evaluates -- the client pushes
`notify` frames whenever the Ref changes, and the session dispatches
them to the subscription's callbacks.

Resolves the Ref's wire path but never evals the Ref child: subscribing
must not trigger a read. Consumers drive the returned Subscription via
its `bind` / `unbind` / `close` interface.

Undocumented: yields, example.

## Remove

Send a `remove` frame on a Ref -- drop its node and its whole subtree.

```python
Remove()
```

Path `nustd.ui.Remove`. Kind `Command`, sort `scalar_command`, cardinality `void`.

The plain path and no chain: a remove is addressed at a node that is
already there, so there is nothing to bring into being on the way down.
A path the browser does not have is a no-op there, which is what the
first run of anything that wipes before it draws relies on.

Undocumented: yields, example.

## Write

Send a `write` frame on a Ref -- replace the value.

```python
Write()
```

Path `nustd.ui.Write`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

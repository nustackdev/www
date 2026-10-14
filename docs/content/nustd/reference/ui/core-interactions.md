---
title: core.interactions
description: "Wire interactions -- ops that flow over a Session on a Ref."
---

Module `nustd.ui.core.interactions`.

Wire interactions -- ops that flow over a Session on a Ref.

Each class's name in snake_case becomes its op string in the protocol Frame
(see protocol.py). Refs decide which interactions they expose by returning
the corresponding class from their methods (e.g. ButtonRef.on_click ->
Changed, HeadingRef.set -> Write).

- Send    -- the base of every outbound interaction with a payload
- Write   -- server -> client, replace a Ref's value
- Append  -- server -> client, append to a sequence-typed Ref
- Remove  -- server -> client, drop a Ref's node and everything under it
- Changed -- subscribe to client-side notifications on a Ref, all of them
             or only one event's

A component with changes of its own (a table's one-row update, say) adds
them as `Send` subclasses next to its Ref, each its own op, rather than as
a sub-op inside a generic payload.

All of them target the abstract `Session` from core.session -- the host
plugs in its concrete transport (nudle over ws; others in future).

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Append](#append) | `scalar_command` | `Append()` | Send an `append` frame on a Ref -- push onto a sequence. |
| [Changed](#changed) | `scalar_query` | `Changed(ref, event=None)` | Subscribe to client-side change notifications on a Ref. |
| [Remove](#remove) | `scalar_command` | `Remove()` | Send a `remove` frame on a Ref -- drop its node and its whole subtree. |
| [Send](#send) | `scalar_command` | `Send()` | Send a frame on a Ref: its chain, and a payload built from the arguments. |
| [Write](#write) | `scalar_command` | `Write()` | Send a `write` frame on a Ref -- replace the value. An EMPTY value raises. |

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
Changed(ref, event=None)
```

Path `nustd.ui.Changed`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (1 required).

Resolves to a `Subscription` handle that ReactForever and friends drive.
No outbound frame is sent when this evaluates -- the client pushes
`notify` frames whenever the Ref changes, and the session dispatches
them to the subscription's callbacks.

Resolves the Ref's wire path but never evals the Ref child: subscribing
must not trigger a read. Consumers drive the returned Subscription via
its `bind` / `unbind` / `close` interface.

A Ref that sends several kinds of notify names each in the payload's
`event` field, and `event` here takes only that kind: the rest never
reach the callbacks. Left out, every notify on the Ref arrives.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` | `Ref` |  | The Ref whose notifications to take. |
| `event` | `StrArg \| None` | `None` | Only the notifies whose `event` field is this. |

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

## Send

Send a frame on a Ref: its chain, and a payload built from the arguments.

```python
Send()
```

Path `nustd.ui.Send`. Kind `Command`, sort `scalar_command`, cardinality `void`.

The base every outbound interaction with a payload stands on. It resolves
the Ref's chain (so the browser can bring every node on the way into
being), evaluates the arguments in order, refuses EMPTY, and ships one
frame whose op is the subclass's name in snake_case (`SetRow` ships
`set_row`). The browser hands it to the node's handler of that name.

A component with changes of its own declares them as subclasses rather
than as a sub-op inside some generic payload: name the fields in
`_payload_fields` and the payload is the mapping of those names to the
arguments, eg `class SetRow(Send): _payload_fields = ("key", "row")` for
`SetRow(table, key, row)` -> `{"key": ..., "row": ...}`. Override
`_frame_payload` for any other shape, and `_frame_op` for a class
that ships more than one op (a Card's three chrome strings).

Undocumented: yields, example.

## Write

Send a `write` frame on a Ref -- replace the value. An EMPTY value raises.

```python
Write()
```

Path `nustd.ui.Write`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

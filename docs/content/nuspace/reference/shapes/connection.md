---
title: connection
description: "Connection: one live client of a device, eg a browser tab."
---

Module `nuspace.shapes.connection`.

Connection: one live client of a device, eg a browser tab.

| Name | Call | Meaning |
| --- | --- | --- |
| [Connection](#connection) |  | What a device publishes about one client. Written by the device only. |

## Connection

What a device publishes about one client. Written by the device only.

Path `nuspace.shapes.Connection`.

`routes` is where the client is: the plane ids it has open, as panes
left to right, written whole every time (D24). It is what nav watches
to decide what runs for it. Services on workers read it through the
store, since the device itself lives in the host.

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `routes` | `ref` | `PrimitiveListRef` |  | `nuspace.shapes.Connection.routes` |
| `opened` | `ref` | `FloatRef` |  | `nuspace.shapes.Connection.opened` |

Undocumented: example.

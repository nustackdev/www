---
title: jqueue
description: "Janus-backed queue ref for the nu-mem fabric."
---

Module `nustd.mem.refs.jqueue`.

Janus-backed queue ref for the nu-mem fabric.

A bounded FIFO bridging asyncio and threads. Use when one side runs on
the event loop (e.g. fetchers) and the other in a thread (e.g.
processors). `put` and `get` work in both modes; the underlying
`janus.Queue` routes each call to the right half.

Needs janus, which rides the optional `nustd[mem]` extra.

Not re-exported from `nustd.mem` (the janus import is optional), so reach for
it by its own path.

Usage:

```python
from nustd.mem.refs.jqueue import JQueueRef
from nu.domains.shape import Shape

class Buf(Shape):
    queue = JQueueRef.slot(capacity=16, item_type=int)
```

## interactions

Module `nustd.mem.refs.jqueue.interactions`.

Interactions for JQueueRef / JQueue.

- Put: Command, blocks when full for back-pressure.
- Get: ScalarAction, blocks when empty, yields one item (mutating producer).
- QSize: ScalarQuery, snapshot count.
- Close: Command, shuts down both halves.

Get mutates the underlying janus.Queue while yielding the popped item, so it
is a ScalarAction (effect + yield) rather than a ScalarQuery, and declares
`mutates` on slot 0. QSize is a pure read: the queue ref in its read slot
yields READ automatically, so it needs no `mutates`.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Close](#close) | `scalar_command` | `Close(queue)` | Shuts the queue down, both the sync and the async half at once. |
| [Get](#get) | `scalar_action` | `Get(queue)` | Takes the oldest item, waiting for one when the queue is empty. |
| [Put](#put) | `scalar_command` | `Put(queue, value)` | Enqueues a value, waiting for room when the queue is full. |
| [QSize](#qsize) | `scalar_query` | `QSize(queue)` | How many items are waiting in the queue at this instant. |

### Close

Shuts the queue down, both the sync and the async half at once.

```python
Close(queue)
```

Path `nustd.mem.refs.jqueue.Close`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `queue` | `JQueue` |  | the node yielding the queue to shut down. |

**Yields**

Nothing.

**Notes**

- Items already queued are not thrown away: consumers drain what is left and only then start raising QueueClosed.
- Any later `put` raises QueueClosed; there is no reopening.
- The slot still holds the same queue object afterwards, so a read does not hand back a fresh one.

**Example**

```python
from nustd.mem.refs.jqueue import JQueueRef, QueueClosed
class Buf(nu.Shape):
    queue = JQueueRef.slot(item_type=int)
ctx = nu.Context().bind(dict, {}, Buf)
_ = nu.run(Buf.queue.close(), ctx)
try:
    _ = nu.run(Buf.queue.put(1), ctx)
except QueueClosed:
    print("closed")
```

```
closed
```

### Get

Takes the oldest item, waiting for one when the queue is empty.

```python
Get(queue)
```

Path `nustd.mem.refs.jqueue.Get`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `queue` | `JQueue` |  | the node yielding the queue to read from. |

**Yields**

The item taken from the queue.

**Notes**

- It both consumes and yields, which is why it is an action rather than a query: evaluating it twice takes two items, so it is not something to treat as a repeatable read.
- Routes itself by mode - the sync run blocks the calling thread, the async run awaits on the event loop.
- Once the queue is shut down and drained it raises QueueClosed, including for a consumer already waiting when the shutdown lands.

**Example**

```python
from nustd.mem.refs.jqueue import JQueueRef
class Buf(nu.Shape):
    queue = JQueueRef.slot(capacity=2, item_type=int)
ctx = nu.Context().bind(dict, {}, Buf)
_ = nu.run(Buf.queue.put(7), ctx)
nu.run(Buf.queue.get(), ctx)[0]
```

```
7
```

### Put

Enqueues a value, waiting for room when the queue is full.

```python
Put(queue, value)
```

Path `nustd.mem.refs.jqueue.Put`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `queue` | `JQueue` |  | the node yielding the queue to write into. |
| `value` | `object` |  | what to enqueue. |

**Yields**

Nothing.

**Notes**

- Waiting is the point: a bounded queue turns a fast producer into a slow one instead of letting the backlog grow.
- Routes itself by mode - the sync run blocks the calling thread, the async run awaits on the event loop - so the same tree works from either side.
- A shut-down queue raises QueueClosed rather than dropping the value.

**Example**

```python
from nustd.mem.refs.jqueue import JQueueRef
class Buf(nu.Shape):
    queue = JQueueRef.slot(capacity=2, item_type=int)
ctx = nu.Context().bind(dict, {}, Buf)
_ = nu.run(Buf.queue.put(1), ctx)
nu.run(Buf.queue.qsize(), ctx)[0]
```

```
1
```

### QSize

How many items are waiting in the queue at this instant.

```python
QSize(queue)
```

Path `nustd.mem.refs.jqueue.QSize`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `queue` | `JQueue` |  | the node yielding the queue to count. |

**Yields**

The item count as an int.

**Notes**

- A snapshot, not a guarantee: another thread or task can add or take an item before the value is used, so it says nothing about whether the next `get` will wait.
- A pure read - it never touches the queue's contents - so the only fabric effect in the tree is the ref that fetches the queue.

**Example**

```python
from nustd.mem.refs.jqueue import JQueueRef
class Buf(nu.Shape):
    queue = JQueueRef.slot(item_type=int)
ctx = nu.Context().bind(dict, {}, Buf)
nu.run(Buf.queue.qsize(), ctx)[0]
```

```
0
```

## form

Module `nustd.mem.refs.jqueue.form`.

JQueue: typed surface for janus-backed queue refs.

Pure TypedNu wrapper. Holds no state; methods build interaction trees
against the wrapped Nu (typically a JQueueRef).

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [JQueue](#jqueue) | `scalar_query` | `JQueue(operand)` | The queue verbs, over any node that yields a janus queue. |

### JQueue

The queue verbs, over any node that yields a janus queue.

```python
JQueue(operand)
```

Path `nustd.mem.refs.jqueue.JQueue`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Holds nothing itself: it wraps one Nu child, normally a `JQueueRef`,
and every call on it builds an interaction over that child. A ref that
reads a queue therefore gets `put`, `get`, `qsize` and `close`
just by mixing this in.

**Notes**

- The calls do not touch the queue: they build a tree, and nothing happens until it runs.

**Example**

```python
from nustd.mem.refs.jqueue import JQueueRef
class Buf(nu.Shape):
    queue = JQueueRef.slot(item_type=int)
ctx = nu.Context().bind(dict, {}, Buf)
_ = nu.run(Buf.queue.put(7), ctx)
nu.run(Buf.queue.qsize(), ctx)[0]
```

```
1
```

**Methods**

#### `.put(value)`

Enqueue `value`, waiting for room when the queue is full.

Builds `Put`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `object` |  |  |

**Notes**

- Blocking is the back-pressure: a bounded queue makes the producer wait rather than growing without limit.
- Raises QueueClosed when the queue is already shut down.

**Example**

```python
run(Buf.queue.put(1), ctx)
```

#### `.get()`

Take the oldest item, waiting for one when the queue is empty.

Builds `Get`.

**Notes**

- This both mutates the queue and yields, so it is an action, not a read; it cannot be treated as a pure query.
- Raises QueueClosed once the queue is shut down and drained.

**Example**

```python
run(Buf.queue.get(), ctx)
```

#### `.qsize()`

Count the items waiting in the queue right now.

Builds `QSize`.

**Notes**

- A snapshot only: a producer or consumer on another thread can change it the moment it is read.

**Example**

```python
run(Buf.queue.qsize(), ctx)
```

#### `.close()`

Shut the queue down on both the sync and the async half.

Builds `Close`.

**Notes**

- Items already queued stay readable; consumers drain them and only then start raising QueueClosed.

**Example**

```python
run(Buf.queue.close(), ctx)
```

**Inherited methods**

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

## ref

Module `nustd.mem.refs.jqueue.ref`.

JQueueRef: janus-backed queue ref in the nu-mem fabric.

A leaf ref: occupies a slot in a Shape, holds metadata (capacity,
item_type), and on first fetch vivifies a `janus.Queue` at the slot's
path in the backing dict. Subsequent fetches return the same live queue.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [JQueueRef](#jqueueref) | `ref` | `JQueueRef(address, parent_ref=None, owner_shape=None, capacity=None, item_type=object)` | A slot holding a live janus queue, bridging the loop and the threads. |

### JQueueRef

A slot holding a live janus queue, bridging the loop and the threads.

```python
JQueueRef(address, parent_ref=None, owner_shape=None, capacity=None, item_type=object)
```

Path `nustd.mem.refs.jqueue.JQueueRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Reading it hands back the queue object itself rather than any stored
data, which is what makes one side able to `put` from a thread while
the other `get`s on the event loop. The queue is created the first time
the slot is read and kept there, so every later read in the same backing
dict is the same queue.

**Notes**

- Capacity and item type come from the slot declaration; no capacity means unbounded, and the item type is metadata that nothing checks against what is actually put in.
- The queue lives in the backing dict like any other value, so it is not JSON-shaped and does not survive being serialised.
- Vivification needs a real dict at the parent path; a non-dict there raises TypeError rather than yielding a sentinel.
- Because reading vivifies, a plain read is enough to create the queue before any producer starts.

**Example**

```python
from nustd.mem.refs.jqueue import JQueueRef
class Buf(nu.Shape):
    queue = JQueueRef.slot(capacity=2, item_type=int)
ctx = nu.Context().bind(dict, {}, Buf)
_ = nu.run(Buf.queue.put(1), ctx)
nu.run(Buf.queue.get(), ctx)[0]
```

```
1
```

**Inherited methods**

From `nustd.mem.refs.jqueue.form.JQueue`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.put(value)` | `Put` | Enqueue `value`, waiting for room when the queue is full. |
| `.get()` | `Get` | Take the oldest item, waiting for one when the queue is empty. |
| `.qsize()` | `QSize` | Count the items waiting in the queue right now. |
| `.close()` | `Close` | Shut the queue down on both the sync and the async half. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

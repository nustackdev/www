---
title: stream
description: "Stream flow: drain-then-follow over ordered collections."
---

Module `nu.core.flows.stream`.

Stream flow: drain-then-follow over ordered collections.

The `cat file; tail -f` of Nu. One declaration that handles batch
catch-up, live follow, and the transition between them.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Stream](#stream) | `stream_query` | `Stream(source, body, key='stream_key', log_key='stream_log_key')` | Drain-then-follow over an ordered collection; cursor tracks position. |

## Stream

Drain-then-follow over an ordered collection; cursor tracks position.

```python
Stream(source, body, key='stream_key', log_key='stream_log_key')
```

Path `nu.core.flows.Stream`. Kind `StreamQuery`, sort `stream_query`, cardinality `stream`. Arity 4 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `source` | `object` |  | the ordered collection to stream over. |
| `body` | `object` |  | the Nu run per item, once `key` is bound to its position. |
| `key` | `object` | `'stream_key'` | the `ctx.attrs` name the current item's cursor key is bound under, for `body` to read. |
| `log_key` | `object` | `'stream_log_key'` | the `ctx.attrs` name the underlying log cursor is bound under. |

**Yields**

The body's results, drained then followed, as an async stream.

**Notes**

- Children are `[advance, change, body, key, log_key]`: `advance` is an `AdvanceCursor` over `source`, `change` an `OnChildrenChange` subscription on `source`.
- Drains existing items first (walks `advance` to exhaustion, running `body` per item), then subscribes and follows new items as they arrive, draining again on each change notification.
- The cursor writes to `ctx.attrs[key]` / `ctx.attrs[log_key]` are untracked bookkeeping side-channels, the same allowance `Map` / `Filter` give their loop-var, not fabric writes.
- Async-only: `_compile` raises `NotImplementedError`, since following requires an event loop.

**Examples**

```python
A stream needs a real ordered-collection substrate to drive
``advance`` / ``change``, so it can't run standalone here::
```

```python
    Stream(SequenceRef("items"), SequenceRef("body"))
```

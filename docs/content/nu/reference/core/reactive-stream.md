---
title: reactive.stream
description: "Stream flow: drain-then-follow over ordered collections."
---

Module `nu.core.reactive.stream`.

Stream flow: drain-then-follow over ordered collections.

The `cat file; tail -f` of Nu. One declaration that handles batch
catch-up, live follow, and the transition between them.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Stream](#stream) | `stream_query` | `Stream(source, body, key=None, log_key='stream_log_key')` | Drain-then-follow over an ordered collection; cursor tracks position. |

## Stream

Drain-then-follow over an ordered collection; cursor tracks position.

```python
Stream(source, body, key=None, log_key='stream_log_key')
```

Path `nu.core.Stream`. Kind `StreamQuery`, sort `stream_query`, cardinality `stream`. Arity 4 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `source` | `object` |  | the ordered collection to stream over. |
| `body` | `object` |  | the Nu run per item: a lambda over the item's cursor key, or a tree reading it with `Attr(key)`. |
| `key` | `object` | `None` | the `ctx.attrs` name the current item's cursor key is bound under, for a tree `body` to read. Defaults to `"stream_key"`; a lambda mints its own. |
| `log_key` | `object` | `'stream_log_key'` | the `ctx.attrs` name the underlying log cursor is bound under. |

**Yields**

The body's results, drained then followed, as an async stream.

**Notes**

- Children are `[advance, change, body, key, log_key]`: `advance` is an `AdvanceCursor` over `source`, `change` an `OnChildrenChange` subscription on `source`.
- Drains existing items first (walks `advance` to exhaustion, running `body` per item), then subscribes and follows new items as they arrive, draining again on each change notification.
- `key` is bound per item for as long as that item's `body` is drained, the same scoped binding `Map` / `Filter` give their loop variable. `log_key` is the cursor's own position, bound for the stream's whole drain (starting from an outer binding when there is one) and advanced item by item.
- Async-only: `_compile` raises `NotImplementedError`, since following requires an event loop.

**Examples**

```python
A stream needs a real ordered-collection substrate to drive
``advance`` / ``change``, so it can't run standalone here::
```

```python
    Stream(SequenceRef("items"), lambda key: nu.print(key))
```

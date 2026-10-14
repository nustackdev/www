---
title: interactions.collections
description: "Container-level KV atoms: sweep every direct primitive child at once."
---

Module `nustd.kv.interactions.collections`.

Container-level KV atoms: sweep every direct primitive child at once.

Both atoms hold a container Ref at slot 0, fetch the view it names, and act on
the whole child set in one storage sweep rather than one address at a time.

Like their leaf-level siblings in `item`, they are `Unsafe` because they
assume every direct child is a primitive: they use the container's raw scan
filter and do not look up node types. A nested container under the same view
is not something they handle, it is something the caller has ruled out. They
need a virtuals view carrying `UnsafePrimitiveOpsBase`.

The two differ on a missing container: the scan swallows the navigation error
and reports emptiness, the clear lets it out.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ClearPrimitivesUnsafeCmd](#clearprimitivesunsafecmd) | `scalar_command` | `ClearPrimitivesUnsafeCmd(ref)` | Deletes every direct primitive child of a container, keeping the container. |
| [ScanPrimitivesUnsafe](#scanprimitivesunsafe) | `scalar_query` | `ScanPrimitivesUnsafe(ref)` | Reads every direct primitive value under a container in one raw scan. |

## ClearPrimitivesUnsafeCmd

Deletes every direct primitive child of a container, keeping the container.

```python
ClearPrimitivesUnsafeCmd(ref)
```

Path `nustd.kv.ClearPrimitivesUnsafeCmd`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 1 (1 required).

Scans the container's own level and deletes each key it finds. The
container itself survives, so the Ref stays valid and writable after.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the container Ref to empty. Its view must carry `UnsafePrimitiveOpsBase`, and its direct children must all be primitives. |

**Yields**

Nothing.

**Notes**

- Declares slot 0 as a mutation position, so `auto_flow_atomic` braces the branch in a Transaction.
- Unlike `ScanPrimitivesUnsafe` it does not absorb a navigation failure: a missing address along the Ref's path raises KeyError or IndexError.
- Deletes keys with no descendant cleanup, so a nested container that was there loses its own key and leaves its subtree orphaned.
- Needs a write-capable storage context: run it under a Transaction, not a Snapshot.

**Example**

```python
app = nu.With(
    nustd.kv.memory_navigator(),
    body=nustd.kv.Transaction(ClearPrimitivesUnsafeCmd(State.counters)),
)
```

## ScanPrimitivesUnsafe

Reads every direct primitive value under a container in one raw scan.

```python
ScanPrimitivesUnsafe(ref)
```

Path `nustd.kv.ScanPrimitivesUnsafe`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

One prefix-and-length filtered scan over the container's own level, so
the cost is the values themselves rather than a lookup per address.
Nothing distinguishes a primitive from a container marker here, so a
nested container under the same view would come back as its raw marker
rather than being skipped.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the container Ref to scan. Its view must carry `UnsafePrimitiveOpsBase`, and its direct children must all be primitives. |

**Yields**

A generator of the stored values. EMPTY when the container is not
reachable - a missing address along the Ref's path is answered as
emptiness, not raised.

**Notes**

- A ScalarQuery, so the whole scan is one value on the tree, not a stream. What it hands back is lazy all the same, so the storage read happens as the consumer pulls, inside whatever bracket is still open.
- Values arrive in the container's own storage order.

**Example**

```python
app = nu.With(
    nustd.kv.memory_navigator(),
    body=nustd.kv.Snapshot(
        nu.Collect(nu.Iter(ScanPrimitivesUnsafe(State.counters))),
    ),
)
```

---
title: interactions.item
description: "Leaf-level KV atoms: read, write and delete one primitive at one address."
---

Module `nustd.kv.interactions.item`.

Leaf-level KV atoms: read, write and delete one primitive at one address.

Every atom here holds a leaf Ref at slot 0 and reaches the value through the
Ref's *parent* view, resolving the parent chain and the leaf address from the
Ref rather than from the value itself. That is the whole shape: a leaf Ref
plus, for the writers, a value at slot 1.

The ones spelled `Unsafe` skip the checks the ordinary shape ops make -
node-type lookup, container-vs-primitive validation, existence of the parent
chain - and go straight to a single `ctx.get` / `ctx.put` / `ctx.delete`.
That is what buys them their speed and what makes them wrong to reach for by
hand: they are the target a tree deformer rewrites ordinary reads and writes
into once it has proved the chain exists and the child is a primitive. The
caller carries both guarantees.

They also demand a substrate that has the operations at all: a virtuals view
with `UnsafePrimitiveOpsBase` in its MRO. A view without it fails at the
attribute, not at a check.

Sorts: `ItemPrimitiveGetUnsafe` is a ScalarQuery. The rest are Commands and
declare slot 0 as a mutation position, so `auto_flow_atomic` sees them as
writes and braces them in a Transaction.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [InitItemCmd](#inititemcmd) | `scalar_command` | `InitItemCmd(ref)` | Walks a container Ref's path and drops the view it lands on. |
| [ItemPrimitiveGetUnsafe](#itemprimitivegetunsafe) | `scalar_query` | `ItemPrimitiveGetUnsafe(ref)` | Reads one primitive off a Ref's parent view in a single storage get. |
| [ItemPrimitiveSetUnsafeCmd](#itemprimitivesetunsafecmd) | `scalar_command` | `ItemPrimitiveSetUnsafeCmd(ref, value)` | Writes one primitive, creating the parent chain first if it is missing. |
| [ItemPrimitiveSetUnsafeParentSkipCmd](#itemprimitivesetunsafeparentskipcmd) | `scalar_command` | `ItemPrimitiveSetUnsafeParentSkipCmd(ref, value)` | Writes one primitive as a bare put, assuming the parent chain exists. |
| [ItemPrimitiveDeleteUnsafeCmd](#itemprimitivedeleteunsafecmd) | `scalar_command` | `ItemPrimitiveDeleteUnsafeCmd(ref)` | Deletes one primitive as a bare storage delete. |
| [ItemPrimitiveSetCmd](#itemprimitivesetcmd) | `scalar_command` | `ItemPrimitiveSetCmd(ref, value)` | Stores a whole value as one opaque blob under a Ref, container or not. |

## InitItemCmd

Walks a container Ref's path and drops the view it lands on.

```python
InitItemCmd(ref)
```

Path `nustd.kv.InitItemCmd`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 1 (1 required).

Resolves the Ref's path and opens the view at the end of it, discarding
the result. The walk is pure navigation - it opens containers, it does
not create them - so on a path of static addresses it does not touch
storage at all.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the container Ref to walk to. Must be a `ViewRef`; a leaf `PrimitiveRef` has no view of its own to open. |

**Yields**

Nothing.

**Notes**

- Declares slot 0 as a mutation position even though it writes nothing, so a Flow branch holding it is braced in a Transaction rather than a Snapshot.
- Raises KeyError or IndexError when an address along the path does not normalize, the way a plain read of that Ref would.

Undocumented: example.

## ItemPrimitiveGetUnsafe

Reads one primitive off a Ref's parent view in a single storage get.

```python
ItemPrimitiveGetUnsafe(ref)
```

Path `nustd.kv.ItemPrimitiveGetUnsafe`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

Resolves the Ref's parent view and leaf address, then does one `ctx.get`
against it. No node-type lookup, no primitive assertion, no check that the
parent chain exists: an absent chain is a storage-level miss, which reads
back the same as an absent value.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the leaf Ref to read. Its parent must be a view carrying `UnsafePrimitiveOpsBase`, and its child must be a primitive. |

**Yields**

The stored value. EMPTY when nothing is stored at the address, and
also when the substrate hands back INVALID - the two collapse to one
answer here, so this atom never yields INVALID.

**Notes**

- Reads through whatever snapshot or transaction is on the ctx, so it sees a Transaction's own uncommitted writes.
- Does not create anything. A missing parent chain stays missing.

**Example**

```python
app = nu.With(
    nustd.kv.memory_navigator(),
    body=nustd.kv.Snapshot(ItemPrimitiveGetUnsafe(State.counters["hits"])),
)
```

## ItemPrimitiveSetUnsafeCmd

Writes one primitive, creating the parent chain first if it is missing.

```python
ItemPrimitiveSetUnsafeCmd(ref, value)
```

Path `nustd.kv.ItemPrimitiveSetUnsafeCmd`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 2 (2 required).

The self-sufficient unsafe writer: it still skips node-type lookup and the
primitive assertion, but it does call `ensure_created` on the parent view
before the put, so it does not need an `InitItemCmd` ahead of it. Use
this one unless the chain is provably already there.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the leaf Ref to write to. |
| `value` |  |  | evaluated then stored as-is, with no decomposition. A container lands as one opaque blob. |

**Yields**

Nothing.

**Notes**

- Declares slot 0 as a mutation position, so `auto_flow_atomic` braces the branch in a Transaction.
- The value is evaluated after the parent view and address resolve.
- Raises `ValueError` when the value slot evaluates to EMPTY or INVALID; sentinels are never stored.

**Example**

```python
app = nu.With(
    nustd.kv.memory_navigator(),
    body=nustd.kv.Transaction(
        ItemPrimitiveSetUnsafeCmd(State.counters["hits"], 1),
    ),
)
```

## ItemPrimitiveSetUnsafeParentSkipCmd

Writes one primitive as a bare put, assuming the parent chain exists.

```python
ItemPrimitiveSetUnsafeParentSkipCmd(ref, value)
```

Path `nustd.kv.ItemPrimitiveSetUnsafeParentSkipCmd`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 2 (2 required).

The fastest write in the fabric and the one with no safety net at all: it
skips even the `ensure_created` that `ItemPrimitiveSetUnsafeCmd` keeps.
The caller owes the parent chain, normally by having run one ordinary
write, or one `ItemPrimitiveSetUnsafeCmd`, before the hot loop. Writing
under a chain that was never created leaves an orphan key that the
container's own scan never sees.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the leaf Ref to write to. |
| `value` |  |  | evaluated then stored as-is, with no decomposition. |

**Yields**

Nothing.

**Notes**

- Declares slot 0 as a mutation position, so `auto_flow_atomic` braces the branch in a Transaction.
- Raises `ValueError` when the value slot evaluates to EMPTY or INVALID; sentinels are never stored.

**Example**

```python
app = nu.With(
    nustd.kv.memory_navigator(),
    body=nustd.kv.Transaction(
        ItemPrimitiveSetUnsafeCmd(State.counters["hits"], 0),
        nu.ForeverDo(
            ItemPrimitiveSetUnsafeParentSkipCmd(State.counters["hits"], 1),
        ),
    ),
)
```

## ItemPrimitiveDeleteUnsafeCmd

Deletes one primitive as a bare storage delete.

```python
ItemPrimitiveDeleteUnsafeCmd(ref)
```

Path `nustd.kv.ItemPrimitiveDeleteUnsafeCmd`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the leaf Ref whose value is removed. |

**Yields**

Nothing.

**Notes**

- Declares slot 0 as a mutation position, so `auto_flow_atomic` braces the branch in a Transaction.
- Deleting an address that holds nothing is a no-op, not an error.
- Removes only the leaf. The containers above it stay, so the parent chain remains valid for later writes.

**Example**

```python
app = nu.With(
    nustd.kv.memory_navigator(),
    body=nustd.kv.Transaction(
        ItemPrimitiveDeleteUnsafeCmd(State.counters["hits"]),
    ),
)
```

## ItemPrimitiveSetCmd

Stores a whole value as one opaque blob under a Ref, container or not.

```python
ItemPrimitiveSetCmd(ref, value)
```

Path `nustd.kv.ItemPrimitiveSetCmd`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 2 (2 required).

The safe writer of the group, and the only one here that does not need
`UnsafePrimitiveOpsBase`: it goes through the parent view's
`_primitive_write`, which creates the container chain and then puts the
value at a single key. What it bypasses is decomposition, not safety - an
ordinary set fans a list or dict out into per-element storage, this one
keeps it whole.

That is what backs `PrimitiveListRef`, `PrimitiveDictRef` and
`PrimitiveSetRef`: containers that should round-trip as one object
rather than shape-decompose.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the leaf Ref to write to. |
| `value` |  |  | evaluated then stored whole, whatever its structure. |

**Yields**

Nothing.

**Notes**

- Declares slot 0 as a mutation position, so `auto_flow_atomic` braces the branch in a Transaction.
- The value is evaluated before the parent view resolves, the reverse of the unsafe writers' order.
- Raises `ValueError` when the value slot evaluates to EMPTY or INVALID; sentinels are never stored.

**Examples**

```python
class State(nu.Shape):
    raw = nustd.kv.PrimitiveListRef.slot()
```

```python
app = nu.With(
    nustd.kv.memory_navigator(),
    body=nustd.kv.Transaction(ItemPrimitiveSetCmd(State.raw, [1, 2, 3])),
)
```

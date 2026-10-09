---
title: refs.base
description: "Virtuals storage substrate refs: navigate the virtuals View hierarchy."
---

Module `nustd.kv.refs.base`.

Virtuals storage substrate refs: navigate the virtuals View hierarchy.

`ViewRef` and `PrimitiveRef` are the two concrete substrates against the
shape Ref seam (`StructuredRef`): they fill the plug-points with virtuals
View navigation, backed by a tkv snapshot / transaction resolved from the
Context.

A ref names one path segment: its address, held as `children[1]` and
resolved through the runtime like any child. The parent chain lives on the tree
at `children[0]` (walked via `parent_ref`); for the common shape-field case
those are static slot names, read off each parent's stored ``(_segment,
_type_marker)`` at compile time. The Navigator + storage context (snapshot/transaction) come from the
Context under `(Navigator, root_shape)` / ``(TransactionProtocol|SnapshotProtocol,
root_shape)`` and are resolved with predicate routing (site + path).

Read is the Ref's dual role:
- `ViewRef._compile` returns the navigate-and-fetch-the-view thunk (faceted
  lazy / eager), so collection ops run against a live virtuals View.
- `PrimitiveRef._compile` navigates to the parent View and subscripts the leaf.

`write` / `erase` resolve the address and mutate through the parent View
(`parent[addr] = value` / `del parent[addr]`), which the virtuals library
decomposes / cleans up.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [PrimitiveRef](#primitiveref) | `ref` | `PrimitiveRef(address, value_type, parent_ref=None, owner_shape=None)` | A ref to one leaf value in KV storage, read by subscripting its parent. |
| [ViewRef](#viewref) | `ref` | `ViewRef(address, view_type=None, parent_ref=None, owner_shape=None)` | A ref to one container slot in KV storage, read as a live virtuals View. |

## PrimitiveRef

A ref to one leaf value in KV storage, read by subscripting its parent.

```python
PrimitiveRef(address, value_type, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.PrimitiveRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Evaluating it opens the parent container and subscripts it at this leaf's
address, so what comes back is the stored value rather than a View. The
path is built the same way as for a container ref: every level's address
is a child on the tree, resolved at run time.

**Notes**

- Yields EMPTY when the leaf is absent, when the parent has no such key or index, and when storage holds its own empty marker there. Reading a missing leaf is not an error.
- A write materializes every ancestor along the path first, so a leaf can be written into storage that has nothing above it yet.
- Erasing a leaf that is not there is a no-op.
- A subclass that stores a value in some other form overrides the lift-on-read and the write command; the leaf address itself is unaffected by that.
- Carries the parent lookup that primitive change observation needs, so a typed leaf ref gets `on_change` with no substrate work.

**Example**

```python
class Portfolio(Shape):
    name = StrRef.slot()
run(Portfolio.name.set("core"), ctx)
run(Portfolio.name, ctx)
```

## ViewRef

A ref to one container slot in KV storage, read as a live virtuals View.

```python
ViewRef(address, view_type=None, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.ViewRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Evaluating it navigates to its path and hands back the View itself, not a
copy, so every container op written on the ref (`keys`, `append`,
`add`, `len`, ...) runs against storage rather than against a
materialized Python value.

The path is the parent chain: each level contributes an address that is a
child on the tree and is evaluated at run time, so a key may be a literal,
a computed expression, or a ref from another fabric. The Navigator and the
storage context are pulled from the Context under the ref's root shape,
with the resolved path passed along so a binding can route on it.

**Notes**

- Read and write take different doors: reads open the path as-is, while a write materializes every ancestor first, so writing deep into never-touched storage creates the whole chain.
- A whole-container write stores through the parent with the ref's own declared view class, so a slot declared as Kh57View keeps that layout instead of collapsing onto the container layer's default.
- Erasing a slot that is not there is a no-op, not an error.
- Never yields EMPTY: an unwritten path opens as an empty View, which reads as length zero.
- The storage context is a transaction when one is bound, otherwise a snapshot; a snapshot is read-only, so writes need the transaction.

**Example**

```python
class Portfolio(Shape):
    tags = ListRef.slot(str)
run(Portfolio.tags.append("core"), ctx)
run(Portfolio.tags.len(), ctx)
```

---
title: base
description: "The address chain every shape ref is: a parent on the tree, then its own address."
---

Module `nu.domains.shape.base`.

The address chain every shape ref is: a parent on the tree, then its own address.

A ref's parent is `children[0]` (structural: walked, never value-read) and its
own address is `children[1]` (a value, resolved through the runtime like any
child). A chain's top ref points at the shared `ANCHOR`, so every generic
pass reaches the whole chain as ordinary tree.

Substrates fill the plug-points here with their own storage walk; nothing in
this module knows how any fabric reads or writes.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [StructuredRef](#structuredref) | `ref` | `StructuredRef(address, parent_ref=None, owner_shape=None)` | Abstract base for shape-fabric Refs. |
| [root_shape](#root_shape) |  | `shape.root_shape(ref)` | The Shape class a Ref chain is rooted at. |

## StructuredRef

Abstract base for shape-fabric Refs.

```python
StructuredRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.domains.shape.StructuredRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

`children[0]` = parent (a StructuredRef, or `ANCHOR` at a chain
root), marked `structural`. `children[1]` = this Ref's address (a value).

Undocumented: example.

## root_shape

The Shape class a Ref chain is rooted at.

```python
shape.root_shape(ref)
```

Path `nu.domains.shape.root_shape`. Defined on `nu.domains.shape.base`, bound as a function. Builds `type[Shape] | None`.

A chain finds its fabric by this class: which Navigator answers it, which
transaction it writes through, which shard it lives on. So anything handed
a Ref as a *location* and then building its own reads underneath it has to
carry the class along, or the reads land on whatever is bound untagged.

A function rather than a property because a Ref's attribute surface belongs
to the value it names: every public name there is a name a Shape can no
longer use for a slot.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` | `StructuredRef` |  |  |

Undocumented: example.

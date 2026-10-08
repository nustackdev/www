---
title: refs.base
description: "StructuredRef: abstract base for all shape-fabric Refs."
---

Module `nu.domains.shape.refs.base`.

StructuredRef: abstract base for all shape-fabric Refs.

A StructuredRef encodes a hierarchical path into a shape fabric. The parent
lives IN the tree as `children[0]` (marked `structural`: address structure,
never value-read); this Ref's own address is `children[1]` (a value, resolved
through the runtime like any child). A chain's top Ref points `children[0]` at
the shared `ANCHOR`, a leaf Ref that terminates the chain at the fabric
root.

With the parent on the tree, every generic pass reaches the whole Ref uniformly:
no `walk_ref_chain` bridging two worlds, and inline becomes a plain fold.

`address` / `aaddress` resolve `children[1]` through the runtime. Substrate
plug-points (`_afetch_parent`, `_aresolve_address`) carry their signatures and
raise NotImplementedError; substrate subclasses override these. `compile` /
`acompile` are left to substrate subclasses (or blueprint Refs used purely for
structural navigation).

| Name | Call | Meaning |
| --- | --- | --- |
| [root_shape](#root_shape) | `shape.root_shape(ref)` | The Shape class a Ref chain is rooted at. |

## root_shape

The Shape class a Ref chain is rooted at.

```python
shape.root_shape(ref)
```

Path `nu.domains.shape.root_shape`. Defined on `nu.domains.shape.refs.base`, bound as a function. Builds `type[Shape] | None`.

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

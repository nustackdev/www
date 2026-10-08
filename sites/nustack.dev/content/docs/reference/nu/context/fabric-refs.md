---
title: fabric.refs
description: "`FabricRef`: a Ref into a Context binding."
---

Module `nu.context.fabric.refs`.

`FabricRef`: a Ref into a Context binding.

Every ctx-bound thing is a Fabric (the empty marker Protocol). A `FabricRef`
names one by its resolved address (the fabric type). The read is the dual role:
self-yield the bound fabric (`EMPTY` when unbound). Fabrics are bound on the
Context, not written through a Ref, so `FabricRef` is read-only *as a value*.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [FabricRef](#fabricref) | `ref` | `FabricRef(address=None)` | A Ref into a Context binding, keyed by the fabric type it resolves to. |

## FabricRef

A Ref into a Context binding, keyed by the fabric type it resolves to.

```python
FabricRef(address=None)
```

Path `nu.context.FabricRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

The sole child is the address, and it resolves to a type rather than to a
key: the read looks that type up on the Context and self-yields whatever
instance is bound there. Nothing is ever written through this Ref -
instances arrive on the Context from a `Provide` bracket, so the value
side of a `FabricRef` is read-only.

Each concrete fabric gets its own subclass carrying the type it names in
the `fabric` class attribute, which is what the address falls back to
when none is passed:

```python
class Solana(FabricRef):
    fabric = SolanaClient
```

`Solana()` then resolves `SolanaClient` from the Context. A bare
`FabricRef(SolanaClient)` still works for the untyped, one-off read.

**Notes**

- This base reads the untagged binding only. Context resolution falls back from more tags to fewer, never the other way, so an instance bound under `Provide(..., tag="a")` is not reachable here. A subclass that wants tags stores them itself and forwards them to `ctx.get` (see `nustd.cluster.refs.RayServiceRef`).
- A binding holding EMPTY and no binding at all read the same, so use `.exists()` when the difference matters.
- The fabric axis is for the long-lived, typed things - storage handles, cluster handles, clients. Short-lived scratch values live on the attrs axis behind `AttrRef`.

**Examples**

```python
class Counter:
    def __init__(self, start=0):
        self.n = start
nu.run(nu.Provide(Counter, {"start": 5}, nu.FabricRef(Counter).exists()))[0]
```

```
True
```

```python
nu.run(nu.FabricRef(Counter).exists())[0]
```

```
False
```

**Methods**

### `.exists()`

A Query yielding whether this Ref's fabric type is bound on the Context.

Builds `FabricExists`.

**Notes**

- The plain read cannot answer this: an unbound type yields EMPTY and so does a type bound to EMPTY.

Undocumented: example.

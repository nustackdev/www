---
title: fabric.queries
description: "Fabric existence query."
---

Module `nu.context.fabric.queries`.

Fabric existence query.

The dual-role read of a `FabricRef` yields the bound fabric or `EMPTY`.
That aliases a bound `EMPTY`, so existence needs an explicit query.
`FabricExists` holds a `FabricRef` in a read slot and answers
whether its fabric type is bound on the Context.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [FabricExists](#fabricexists) | `scalar_query` | `FabricExists(ref)` | Whether the fabric type of its `FabricRef` is bound on the Context. |

## FabricExists

Whether the fabric type of its `FabricRef` is bound on the Context.

```python
FabricExists(ref)
```

Path `nu.context.FabricExists`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the `FabricRef` whose address is resolved and looked up. |

**Yields**

True or False, never a sentinel.

**Notes**

- Normally written as `FabricRef(...).exists()` rather than built by hand.
- Exists because the dual-role read cannot answer the question: an unbound type yields EMPTY, and so does a type bound to EMPTY.
- Answering goes through Context resolution, so a lazily bound factory is materialized by the check itself.

**Example**

```python
class Counter:
    pass
nu.run(nu.FabricRef(Counter).exists())[0]
```

```
False
```

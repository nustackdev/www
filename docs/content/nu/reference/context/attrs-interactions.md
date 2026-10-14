---
title: attrs.interactions
description: "Attrs interactions: `AttrExists`."
---

Module `nu.context.attrs.interactions`.

Attrs interactions: `AttrExists`.

The read itself is the `Attr` Ref's dual role. `AttrExists` complements
it: an unbound read yields EMPTY, which a name bound to EMPTY would alias, so
existence needs an explicit query. It holds its Ref in a read slot; effect
synthesis binds it to a read on the attrs fabric.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AttrExists](#attrexists) | `scalar_query` | `AttrExists(ref)` | Whether the name its attrs ref names is bound in `ctx.attrs`. |

## AttrExists

Whether the name its attrs ref names is bound in `ctx.attrs`.

```python
AttrExists(ref)
```

Path `nu.context.AttrExists`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the attrs ref whose address is resolved and looked up. |

**Yields**

True or False, never a sentinel. An address that resolves to EMPTY
is looked up as a key like any other, and is simply absent.

**Notes**

- Normally written as `ref.exists()` rather than built by hand.
- Needed because the dual-role read cannot answer the question: an unbound name yields EMPTY, and so does a name bound to EMPTY.
- Only the address is resolved; the value is never read.

**Examples**

```python
nu.run(nu.Attr("x").exists())[0]
```

```
False
```

```python
nu.run(nu.Collect(nu.Map(nu.Iter([1]), nu.Attr("item").exists())))[0]
```

```
[True]
```

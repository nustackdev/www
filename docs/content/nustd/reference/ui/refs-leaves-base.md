---
title: refs.leaves.base
description: "`LeafRef` -- the base every content, input and collection Ref builds on."
---

Module `nustd.ui.refs.leaves.base`.

`LeafRef` -- the base every content, input and collection Ref builds on.

Layer 1. A leaf draws one thing from its own props: a text, a button, a
chart, a table. Its fixed known parts are props (a button's `label` and
`icon`), never child nodes, and it never has children: building a Ref with
`parent_ref=` a leaf raises `TypeError` and names a container to use.
Composition is what containers are for.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [LeafRef](#leafref) | `ref` | `LeafRef(address, parent_ref=None, owner_shape=None, props=None)` | Base for leaf Refs: one thing drawn from props, no children. Abstract. |

## LeafRef

Base for leaf Refs: one thing drawn from props, no children. Abstract.

```python
LeafRef(address, parent_ref=None, owner_shape=None, props=None)
```

Path `nustd.ui.LeafRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Inherited methods**

From `nustd.ui.core.base.Ref`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.erase()` | `Nu` | Drop this Ref's node on the client, and everything under it. |

Undocumented: example.

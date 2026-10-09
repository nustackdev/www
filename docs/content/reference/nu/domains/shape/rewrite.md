---
title: rewrite
description: "Re-rooting: splice every bare ref chain in a tree under a new parent."
---

Module `nu.domains.shape.rewrite`.

Re-rooting: splice every bare ref chain in a tree under a new parent.

A snippet author writes slots without knowing where they live:

```python
class Section(nu.Shape):
    inp = nustd.ui.InputRef.slot()

def out():
    return Section.inp.set("whatever")
```

`Section.inp` is a chain root, so it resolves bare, at `("inp",)`. The
host that owns the snippet knows where it belongs and says so afterwards, by
rewriting the term between constructing it and evaluating it: every chain
root gets the host's parent ref spliced in where its `ANCHOR`
was, so the whole chain resolves one level deeper.

This works because a ref's parent is `children[0]` of an immutable term,
not an attribute on a live object. Addressing walks that link at run time, so
a rewritten tree simply resolves somewhere else - there is no object graph to
fix up and no precomputed path to invalidate. The source chain is untouched,
which is what lets the same `Section.inp` be spliced under two different
parents in two different terms.

#### Policy is the caller's

Which parent, and which chains are exempt, are both arguments. `rooted` is
the exemption: a predicate asked about each chain root, answering "the author
rooted this one deliberately, leave it alone". That is how one block reaches
another on purpose - it names the other block's root explicitly, and the
rewrite passes it by. A chain the predicate claims is still *recursed into*,
because a dynamic address inside it is its own chain and is judged on its own.

#### Two things to get right

- Every child is recursed into, with no exception for a level's address. A
  dynamic index that is itself a ref (`Shop.orders[Cursor.current]`) is a
  chain like any other, and leaving it alone resolves it against the old
  root while the spine around it moved.
- `root_shape` is rebuilt on every node. It no longer contributes to an
  address, but it is still the tag that routes a write to a navigator and
  scopes `auto_flow_atomic`, so a spliced chain has to pick up the tag of
  the parent it landed under. Stale is invisible under a default navigator
  and wrong under a tagged one.

| Name | Call | Meaning |
| --- | --- | --- |
| [reroot](#reroot) | `shape.reroot(root, under, rooted=None)` | Rewrite `root` so every bare ref chain in it hangs off `under`. |
| [rerooter](#rerooter) | `shape.rerooter(under, rooted=None)` | `reroot` with its policy fixed, as a plain `Nu -> Nu` transform. |

## reroot

Rewrite `root` so every bare ref chain in it hangs off `under`.

```python
shape.reroot(root, under, rooted=None)
```

Path `nu.domains.shape.reroot`. Defined on `nu.domains.shape.rewrite`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  | the tree to rewrite. Any Nu term, not only a ref. |
| `under` | `StructuredRef` |  | the ref the bare chains are spliced under. Its own chain and its `root_shape` come along, so a chain rewritten under `World.shop` resolves at `("shop", ...)` and routes to whatever navigator `World` is tagged with. |
| `rooted` | `Callable[[StructuredRef], bool] \| None` | `None` | predicate asked about each chain root (the ref whose parent is the ANCHOR). True means the author rooted that chain on purpose and it is left where it is. With none given every chain is spliced. |

**Notes**

- Non-ref nodes are walked through, so a ref buried under flows, spans and interactions is reached the same as one at the top.
- A level's address child is recursed into like any other, so a dynamic index that is itself a ref moves with the spine.
- An exempt chain is passed by but still recursed into: an address inside it is a separate chain and gets its own answer.
- Subtrees that come back unchanged are returned by identity, so an already-rooted term is the same object it went in as.
- Payload is copied per rebuilt node rather than shared, because `_with_children` aliases the dict and writing `root_shape` into it would corrupt the chain the snippet still holds.

**Example**

```python
term = Section.inp.set("hi")
reroot(term, Page.sections["form"])
```

```
# resolves at ("sections", "form", "inp")
```

## rerooter

`reroot` with its policy fixed, as a plain `Nu -> Nu` transform.

```python
shape.rerooter(under, rooted=None)
```

Path `nu.domains.shape.rerooter`. Defined on `nu.domains.shape.rewrite`, bound as a function. Builds `Transform`.

The form a rewrite slot takes: bind the parent and the exemption once,
hand the result to whatever produces the term.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `under` | `StructuredRef` |  | the ref bare chains are spliced under. |
| `rooted` | `Callable[[StructuredRef], bool] \| None` | `None` | predicate exempting chain roots the author placed himself. |

**Example**

```python
nu.LoadNu(src, rewrite=rerooter(Page.sections[name]))
```

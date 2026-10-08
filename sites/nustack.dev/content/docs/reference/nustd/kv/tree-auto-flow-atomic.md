---
title: tree.auto_flow_atomic
description: "The pass that decides, per branch, where a storage boundary belongs."
---

Module `nustd.kv.tree.auto_flow_atomic`.

The pass that decides, per branch, where a storage boundary belongs.

Writing atomicity by hand means answering the same question at every branch of
a tree - does this touch storage, and does it write - and getting it wrong in
either direction: a missing bracket leaves a read with no snapshot to resolve
against, an over-broad one holds a transaction open across work that had no
business being inside it.

The question is answerable from the tree itself. A Ref names the storage it
reads, and a node declares which of its slots it mutates. So the pass reads
both and places the boundary at the smallest branch that needs it, which is
the direct child of a Flow rather than the Flow as a whole - sibling branches
of a Sequential get their own brackets and commit independently.

The rest of the file is the bookkeeping that makes the walk honest: which refs
an enclosing bracket already covers, which scope dominates which, and where
the walk must stop because it cannot see through a node.

| Name | Call | Meaning |
| --- | --- | --- |
| [auto_flow_atomic](#auto_flow_atomic) | `kv.auto_flow_atomic(tree, scope=None)` | Rewrites a tree so every branch touching storage sits in the right bracket. |

## auto_flow_atomic

Rewrites a tree so every branch touching storage sits in the right bracket.

```python
kv.auto_flow_atomic(tree, scope=None)
```

Path `nustd.kv.auto_flow_atomic`. Defined on `nustd.kv.tree.auto_flow_atomic`, bound as a function. Builds `Nu`.

Walks bottom-up and, at each Flow, replaces each direct child by a
`Transaction` around it if the branch writes storage, a `Snapshot` if
it only reads, and by itself if it does neither. A branch that already
sits inside a bracket covering it is left alone. What comes back is a new
tree; the one passed in is untouched.

A ref counts as a write only where it sits in a slot the enclosing node
declared as mutating. That is why the pass can tell `ref.set(v)` from
the same ref read as an argument, without knowing anything about either
node beyond its declaration.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `tree` | `Nu` |  | the tree to rewrite. |
| `scope` | `Hashable \| None` | `None` | the shape whose storage this pass is about, as a tag. None, the default, treats every ref as in scope and tags the brackets it adds as unscoped. Pass a shape to run one pass per storage in a sharded program, each leaving the others' refs alone. |

**Notes**

- A Flow directly under a Flow is left alone. Its own children were already bracketed on the way up, and bracketing it again would merge branches that were meant to commit separately.
- A bare subtree that is not a Flow is bracketed too, so `auto_flow_atomic(some_ref)` resolves on its own without the caller wiring a bracket by hand.
- An existing bracket whose scope covers this pass stops the descent entirely. One with a different scope is descended into, and what it covers is subtracted from what the pass still has to place.
- Dynamic subtrees are opaque: their effects are not visible until run time, so the pass does not descend through them and does not bracket them. Whatever they dispatch to owns its own atomicity.
- Safe to run over a tree with no storage in it at all: a branch with no refs is returned unchanged, and a bracket around a body that never reads opens no handle.

**Example**

```python
app = nu.With(
    nustd.kv.rocksdb_navigator(".dbcounter"),
    body=nu.ParallelAsync(
        nustd.ui.serve(App, nustd.kv.auto_flow_atomic(ui)),
        nustd.kv.auto_flow_atomic(tick),
    ),
)
```

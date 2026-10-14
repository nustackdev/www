---
title: walk
description: "Tree walking -- traversal iterators over Term structures."
---

Module `nu.tree.walk`.

Tree walking -- traversal iterators over Term structures.

All functions are lazy (generators) and non-mutating. Domain-free: they
touch only `._children` and identity, so they work on any Term tree.

| Name | Call | Meaning |
| --- | --- | --- |
| [ancestors](#ancestors) | `tree.ancestors(target, root)` | Path from root to target (exclusive of target), or None if not found. |
| [bfs](#bfs) | `tree.bfs(root)` | Breadth-first traversal. |
| [leaves](#leaves) | `tree.leaves(root)` | Yield only leaf nodes (no children). |
| [postorder](#postorder) | `tree.postorder(root)` | Depth-first post-order. Yields children before root. |
| [preorder](#preorder) | `tree.preorder(root)` | Depth-first pre-order. Yields root before children. |

## ancestors

Path from root to target (exclusive of target), or None if not found.

```python
tree.ancestors(target, root)
```

Path `nu.tree.ancestors`. Defined on `nu.tree.walk`, bound as a function. Builds `list[Nu] | None`.

Uses identity comparison (`is`).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `target` | `Nu` |  |  |
| `root` | `Nu` |  |  |

Undocumented: example.

## bfs

Breadth-first traversal.

```python
tree.bfs(root)
```

Path `nu.tree.bfs`. Defined on `nu.tree.walk`, bound as a function. Builds `Iterator[Nu]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  |  |

Undocumented: example.

## leaves

Yield only leaf nodes (no children).

```python
tree.leaves(root)
```

Path `nu.tree.leaves`. Defined on `nu.tree.walk`, bound as a function. Builds `Iterator[Nu]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  |  |

Undocumented: example.

## postorder

Depth-first post-order. Yields children before root.

```python
tree.postorder(root)
```

Path `nu.tree.postorder`. Defined on `nu.tree.walk`, bound as a function. Builds `Iterator[Nu]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  |  |

Undocumented: example.

## preorder

Depth-first pre-order. Yields root before children.

```python
tree.preorder(root)
```

Path `nu.tree.preorder`. Defined on `nu.tree.walk`, bound as a function. Builds `Iterator[Nu]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  |  |

Undocumented: example.

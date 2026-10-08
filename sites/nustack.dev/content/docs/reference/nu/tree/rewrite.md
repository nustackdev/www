---
title: rewrite
description: "Generic tree rewrites -- structural Term-to-Term operations."
---

Module `nu.tree.rewrite`.

Generic tree rewrites -- structural Term-to-Term operations.

Transforms are `Nu -> Nu` functions that change tree shape. All
operations are non-mutating (return new trees) and domain-free -- they
touch only `._children` and `._with_children`, so they apply to any
Term tree. Child reconstruction goes through `with_children`, so
there is no type dispatch.

| Name | Call | Meaning |
| --- | --- | --- |
| [apply](#apply) | `tree.apply(root)` | Apply transforms in order to root. |
| [compose](#compose) | `tree.compose()` | Compose transforms left-to-right. |
| [conditional_wrap](#conditional_wrap) | `tree.conditional_wrap(root, pred, wrapper)` | Wrap each matching child, bottom-up. |
| [graft](#graft) | `tree.graft(root, target, subtree)` | Replace target node with subtree (identity comparison). |
| [map_children](#map_children) | `tree.map_children(node, fn)` | Apply fn to each direct child, reconstruct via `with_children`. |
| [map_nodes](#map_nodes) | `tree.map_nodes(root, fn, order='bottom_up')` | Apply fn to every node in the tree. |
| [prune](#prune) | `tree.prune(root, pred)` | Remove subtrees matching pred. Returns `None` if root matches. |
| [replace](#replace) | `tree.replace(root, pred, replacement)` | Replace nodes matching pred with `replacement(node)`. Bottom-up. |
| [unwrap](#unwrap) | `tree.unwrap(root, pred)` | Remove single-child wrapper nodes matching pred, splicing child up. |
| [wrap](#wrap) | `tree.wrap(root, pred, wrapper)` | Wrap nodes matching pred: `node -> wrapper(node)`. Bottom-up. |

## apply

Apply transforms in order to root.

```python
tree.apply(root)
```

Path `nu.tree.apply`. Defined on `nu.tree.rewrite`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  |  |

Undocumented: example.

## compose

Compose transforms left-to-right.

```python
tree.compose()
```

Path `nu.tree.compose`. Defined on `nu.tree.rewrite`, bound as a function. Builds `Transform`.

`compose(f, g)(x) == g(f(x))`.

Undocumented: example.

## conditional_wrap

Wrap each matching child, bottom-up.

```python
tree.conditional_wrap(root, pred, wrapper)
```

Path `nu.tree.conditional_wrap`. Defined on `nu.tree.rewrite`, bound as a function. Builds `Nu`.

At each node, matching children are wrapped individually via
`wrapper(child)`. Non-matching children are recursed into.

Matching children are **not** recursed into -- they are claimed
whole by the nearest non-matching ancestor, giving the biggest
matching subtree at each level.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  |  |
| `pred` | `Callable[[Nu], bool]` |  |  |
| `wrapper` | `Callable[[Nu], Nu]` |  |  |

Undocumented: example.

## graft

Replace target node with subtree (identity comparison).

```python
tree.graft(root, target, subtree)
```

Path `nu.tree.graft`. Defined on `nu.tree.rewrite`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  |  |
| `target` | `Nu` |  |  |
| `subtree` | `Nu` |  |  |

Undocumented: example.

## map_children

Apply fn to each direct child, reconstruct via `with_children`.

```python
tree.map_children(node, fn)
```

Path `nu.tree.map_children`. Defined on `nu.tree.rewrite`, bound as a function. Builds `Nu`.

Shallow (one level). For deep transforms, use `map_nodes`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `node` | `Nu` |  |  |
| `fn` | `Callable[[Nu], Nu]` |  |  |

Undocumented: example.

## map_nodes

Apply fn to every node in the tree.

```python
tree.map_nodes(root, fn, order='bottom_up')
```

Path `nu.tree.map_nodes`. Defined on `nu.tree.rewrite`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  | Tree root. |
| `fn` | `Callable[[Nu], Nu]` |  | Function applied to each node. |
| `order` | `Literal['bottom_up', 'top_down']` | `'bottom_up'` | `"bottom_up"` (default) transforms children first, `"top_down"` transforms parent first. |

Undocumented: example.

## prune

Remove subtrees matching pred. Returns `None` if root matches.

```python
tree.prune(root, pred)
```

Path `nu.tree.prune`. Defined on `nu.tree.rewrite`, bound as a function. Builds `Nu | None`.

Preserves unchanged subtrees by identity.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  |  |
| `pred` | `Callable[[Nu], bool]` |  |  |

Undocumented: example.

## replace

Replace nodes matching pred with `replacement(node)`. Bottom-up.

```python
tree.replace(root, pred, replacement)
```

Path `nu.tree.replace`. Defined on `nu.tree.rewrite`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  |  |
| `pred` | `Callable[[Nu], bool]` |  |  |
| `replacement` | `Callable[[Nu], Nu]` |  |  |

Undocumented: example.

## unwrap

Remove single-child wrapper nodes matching pred, splicing child up.

```python
tree.unwrap(root, pred)
```

Path `nu.tree.unwrap`. Defined on `nu.tree.rewrite`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  |  |
| `pred` | `Callable[[Nu], bool]` |  |  |

Undocumented: example.

## wrap

Wrap nodes matching pred: `node -> wrapper(node)`. Bottom-up.

```python
tree.wrap(root, pred, wrapper)
```

Path `nu.tree.wrap`. Defined on `nu.tree.rewrite`, bound as a function. Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  |  |
| `pred` | `Callable[[Nu], bool]` |  |  |
| `wrapper` | `Callable[[Nu], Nu]` |  |  |

Undocumented: example.

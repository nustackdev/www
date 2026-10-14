---
title: query
description: "Tree queries -- read-only inspection of Term structures."
---

Module `nu.tree.query`.

Tree queries -- read-only inspection of Term structures.

Domain-free: predicates and counts over any Term tree.

| Name | Call | Meaning |
| --- | --- | --- |
| [children](#children) | `tree.children(node)` | The node's direct children, in slot order. |
| [count](#count) | `tree.count(root, pred=None)` | Count nodes matching predicate. `None` counts all. |
| [depth](#depth) | `tree.depth(root)` | Maximum depth. A leaf has depth 0. |
| [equal](#equal) | `tree.equal(a, b)` | Structural equality: same kinds, same payloads, same children, recursively. |
| [find](#find) | `tree.find(root, pred)` | Find all nodes matching predicate (pre-order). |
| [find_first](#find_first) | `tree.find_first(root, pred)` | Find first matching node (pre-order), or None. |
| [payload](#payload) | `tree.payload(node)` | The node's construction data: what it holds besides its children. |
| [size](#size) | `tree.size(root)` | Total number of nodes. |

## children

The node's direct children, in slot order.

```python
tree.children(node)
```

Path `nu.tree.children`. Defined on `nu.tree.query`, bound as a function. Builds `tuple[Nu, ...]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `node` | `Nu` |  |  |

Undocumented: example.

## count

Count nodes matching predicate. `None` counts all.

```python
tree.count(root, pred=None)
```

Path `nu.tree.count`. Defined on `nu.tree.query`, bound as a function. Builds `int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  |  |
| `pred` | `Callable[[Nu], bool] \| None` | `None` |  |

Undocumented: example.

## depth

Maximum depth. A leaf has depth 0.

```python
tree.depth(root)
```

Path `nu.tree.depth`. Defined on `nu.tree.query`, bound as a function. Builds `int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  |  |

Undocumented: example.

## equal

Structural equality: same kinds, same payloads, same children, recursively.

```python
tree.equal(a, b)
```

Path `nu.tree.equal`. Defined on `nu.tree.query`, bound as a function. Builds `bool`.

The explicit spelling of "these two trees are the same program". `==` on
a term builds a comparison term (on a Form) or raises (on a bare term), so
it never answers this. Plain values in payloads compare by type and
`==`; terms anywhere inside them (a body held in a payload, a case
table) compare structurally.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `a` | `object` |  |  |
| `b` | `object` |  |  |

Undocumented: example.

## find

Find all nodes matching predicate (pre-order).

```python
tree.find(root, pred)
```

Path `nu.tree.find`. Defined on `nu.tree.query`, bound as a function. Builds `list[Nu]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  |  |
| `pred` | `Callable[[Nu], bool]` |  |  |

Undocumented: example.

## find_first

Find first matching node (pre-order), or None.

```python
tree.find_first(root, pred)
```

Path `nu.tree.find_first`. Defined on `nu.tree.query`, bound as a function. Builds `Nu | None`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  |  |
| `pred` | `Callable[[Nu], bool]` |  |  |

Undocumented: example.

## payload

The node's construction data: what it holds besides its children.

```python
tree.payload(node)
```

Path `nu.tree.payload`. Defined on `nu.tree.query`, bound as a function. Builds `Mapping[str, object]`.

Read-only by contract. A rewrite that keeps a node's payload shares it,
so two variants of one node report the same mapping.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `node` | `Nu` |  |  |

Undocumented: example.

## size

Total number of nodes.

```python
tree.size(root)
```

Path `nu.tree.size`. Defined on `nu.tree.query`, bound as a function. Builds `int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `root` | `Nu` |  |  |

Undocumented: example.

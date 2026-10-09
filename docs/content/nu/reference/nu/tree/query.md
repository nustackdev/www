---
title: query
description: "Tree queries -- read-only inspection of Term structures."
---

Module `nu.tree.query`.

Tree queries -- read-only inspection of Term structures.

Domain-free: predicates and counts over any Term tree.

| Name | Call | Meaning |
| --- | --- | --- |
| [count](#count) | `tree.count(root, pred=None)` | Count nodes matching predicate. `None` counts all. |
| [depth](#depth) | `tree.depth(root)` | Maximum depth. A leaf has depth 0. |
| [find](#find) | `tree.find(root, pred)` | Find all nodes matching predicate (pre-order). |
| [find_first](#find_first) | `tree.find_first(root, pred)` | Find first matching node (pre-order), or None. |
| [size](#size) | `tree.size(root)` | Total number of nodes. |

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

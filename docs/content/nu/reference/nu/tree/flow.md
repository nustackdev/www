---
title: flow
description: "Flow-aware wrapping primitives."
---

Module `nu.tree.flow`.

Flow-aware wrapping primitives.

Generic, semantically-aware tools for injecting wrappers (Brackets,
Policies, instrumentation) at the natural unit of mutation: the Flow.
No fabric or boundary knowledge. Wrappers and predicates are
caller-provided. Effect analysis (which Refs a subtree touches) lives
in the sibling `effects` module.

| Name | Call | Meaning |
| --- | --- | --- |
| [is_flow](#is_flow) | `tree.is_flow(node)` | Predicate: node is a Flow. |
| [wrap_flow_children](#wrap_flow_children) | `tree.wrap_flow_children(tree, wrapper, descend=None)` | At each Flow node, replace every direct child with `wrapper(child)`. |
| [wrap_flows](#wrap_flows) | `tree.wrap_flows(tree, wrapper, predicate=None)` | Wrap outermost Flow nodes with `wrapper(flow)`. |

## is_flow

Predicate: node is a Flow.

```python
tree.is_flow(node)
```

Path `nu.tree.is_flow`. Defined on `nu.tree.flow`, bound as a function. Builds `bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `node` | `Nu` |  |  |

Undocumented: example.

## wrap_flow_children

At each Flow node, replace every direct child with `wrapper(child)`.

```python
tree.wrap_flow_children(tree, wrapper, descend=None)
```

Path `nu.tree.wrap_flow_children`. Defined on `nu.tree.flow`, bound as a function. Builds `Nu`.

Walk is bottom-up: inner Flows are processed before outer ones, so
by the time the outer Flow is reached, its inner Flow children
already carry their per-branch wraps.

The Flow node itself is unchanged in shape. Only its children are
swapped. Use this when the boundary unit is the Flow's branch, not
the Flow as a whole.

`descend`: optional predicate. If it returns `False` for a node,
that subtree is treated as opaque and recursion stops there. Use this
to keep existing wrappers (e.g. Brackets) intact while still letting
the outer Flow wrap them as a whole.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `tree` | `Nu` |  |  |
| `wrapper` | `Callable[[Nu], Nu]` |  |  |
| `descend` | `Callable[[Nu], bool] \| None` | `None` |  |

Undocumented: example.

## wrap_flows

Wrap outermost Flow nodes with `wrapper(flow)`.

```python
tree.wrap_flows(tree, wrapper, predicate=None)
```

Path `nu.tree.wrap_flows`. Defined on `nu.tree.flow`, bound as a function. Builds `Nu`.

Walks top-down. When a Flow (matching `predicate` if given) is
found, calls `wrapper(flow)` and does not recurse inside. That
subtree is claimed whole. Non-matching nodes are recursed into.

Use this to inject one boundary per outermost unit of mutation,
respecting the algebraic structure already present in the tree.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `tree` | `Nu` |  |  |
| `wrapper` | `Callable[[Nu], Nu]` |  |  |
| `predicate` | `Callable[[Nu], bool] \| None` | `None` |  |

Undocumented: example.

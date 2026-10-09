---
title: tree
description: "Nu tree -- traversal, queries, and structural rewrites over Term trees."
---

Module `nu.tree`.

Nu tree -- traversal, queries, and structural rewrites over Term trees.

The generic metaprogramming toolkit (Layer 2): a top-level package built
on `lang`, domain-free. Every helper operates on the Term structure
(`._children` / `._with_children`) and the `lang` kinds (Flow / Ref /
Effect) -- it knows no domain or fabric.

- `walk`    -- lazy traversals (preorder / postorder / bfs / leaves / ancestors).
- `query`   -- read-only inspection (find / find_first / count / size / depth).
- `rewrite` -- generic Nu -> Nu transforms (map_nodes / replace / wrap / unwrap / ...).
- `effects` -- pre-compile effect analysis (is_pure / reads / writes / fabrics / touches_fabric).
- `flow`    -- flow-aware wrapping primitives (wrap_flows / wrap_flow_children / is_flow).

Layering: `engine` holds the primitives (Term, Attribute, compile);
this toolkit sits above `lang`; domain/fabric-specific rewrite *passes*
(e.g. shape ref annotation in `domains.shape.rewrite`) sit above this.

## walk

Module `nu.tree.walk`.

Tree walking -- traversal iterators over Term structures.

[Full entries](/docs/reference/nu/tree/walk)

| Name | Call | Meaning |
| --- | --- | --- |
| [ancestors](/docs/reference/nu/tree/walk#ancestors) | `tree.ancestors(target, root)` | Path from root to target (exclusive of target), or None if not found. |
| [bfs](/docs/reference/nu/tree/walk#bfs) | `tree.bfs(root)` | Breadth-first traversal. |
| [leaves](/docs/reference/nu/tree/walk#leaves) | `tree.leaves(root)` | Yield only leaf nodes (no children). |
| [postorder](/docs/reference/nu/tree/walk#postorder) | `tree.postorder(root)` | Depth-first post-order. Yields children before root. |
| [preorder](/docs/reference/nu/tree/walk#preorder) | `tree.preorder(root)` | Depth-first pre-order. Yields root before children. |

## rewrite

Module `nu.tree.rewrite`.

Generic tree rewrites -- structural Term-to-Term operations.

[Full entries](/docs/reference/nu/tree/rewrite)

| Name | Call | Meaning |
| --- | --- | --- |
| [apply](/docs/reference/nu/tree/rewrite#apply) | `tree.apply(root)` | Apply transforms in order to root. |
| [compose](/docs/reference/nu/tree/rewrite#compose) | `tree.compose()` | Compose transforms left-to-right. |
| [conditional_wrap](/docs/reference/nu/tree/rewrite#conditional_wrap) | `tree.conditional_wrap(root, pred, wrapper)` | Wrap each matching child, bottom-up. |
| [graft](/docs/reference/nu/tree/rewrite#graft) | `tree.graft(root, target, subtree)` | Replace target node with subtree (identity comparison). |
| [map_children](/docs/reference/nu/tree/rewrite#map_children) | `tree.map_children(node, fn)` | Apply fn to each direct child, reconstruct via `with_children`. |
| [map_nodes](/docs/reference/nu/tree/rewrite#map_nodes) | `tree.map_nodes(root, fn, order='bottom_up')` | Apply fn to every node in the tree. |
| [prune](/docs/reference/nu/tree/rewrite#prune) | `tree.prune(root, pred)` | Remove subtrees matching pred. Returns `None` if root matches. |
| [replace](/docs/reference/nu/tree/rewrite#replace) | `tree.replace(root, pred, replacement)` | Replace nodes matching pred with `replacement(node)`. Bottom-up. |
| [unwrap](/docs/reference/nu/tree/rewrite#unwrap) | `tree.unwrap(root, pred)` | Remove single-child wrapper nodes matching pred, splicing child up. |
| [wrap](/docs/reference/nu/tree/rewrite#wrap) | `tree.wrap(root, pred, wrapper)` | Wrap nodes matching pred: `node -> wrapper(node)`. Bottom-up. |

## query

Module `nu.tree.query`.

Tree queries -- read-only inspection of Term structures.

[Full entries](/docs/reference/nu/tree/query)

| Name | Call | Meaning |
| --- | --- | --- |
| [count](/docs/reference/nu/tree/query#count) | `tree.count(root, pred=None)` | Count nodes matching predicate. `None` counts all. |
| [depth](/docs/reference/nu/tree/query#depth) | `tree.depth(root)` | Maximum depth. A leaf has depth 0. |
| [find](/docs/reference/nu/tree/query#find) | `tree.find(root, pred)` | Find all nodes matching predicate (pre-order). |
| [find_first](/docs/reference/nu/tree/query#find_first) | `tree.find_first(root, pred)` | Find first matching node (pre-order), or None. |
| [size](/docs/reference/nu/tree/query#size) | `tree.size(root)` | Total number of nodes. |

## effects

Module `nu.tree.effects`.

Pre-compilation effect analysis over Term trees.

[Full entries](/docs/reference/nu/tree/effects)

| Name | Call | Meaning |
| --- | --- | --- |
| [fabrics](/docs/reference/nu/tree/effects#fabrics) | `tree.fabrics(node)` | Fold the subtree's Refs to the set of fabric identities they touch. |
| [has_write_on_fabric](/docs/reference/nu/tree/effects#has_write_on_fabric) | `tree.has_write_on_fabric(node, ref_types)` | Predicate: subtree has a WRITE effect through a Ref of given type. |
| [is_pure](/docs/reference/nu/tree/effects#is_pure) | `tree.is_pure(node)` | An atom or composition with no tracked effects is pure. |
| [iter_effects](/docs/reference/nu/tree/effects#iter_effects) | `tree.iter_effects(node)` | Walk the subtree yielding `(ref_instance, effect)` for every Ref child. |
| [reads](/docs/reference/nu/tree/effects#reads) | `tree.reads(node)` | Refs the subtree reads. |
| [touches_fabric](/docs/reference/nu/tree/effects#touches_fabric) | `tree.touches_fabric(node, ref_types)` | Predicate: subtree holds at least one Ref whose type is in ref_types. |
| [writes](/docs/reference/nu/tree/effects#writes) | `tree.writes(node)` | Refs the subtree writes. |

## flow

Module `nu.tree.flow`.

Flow-aware wrapping primitives.

[Full entries](/docs/reference/nu/tree/flow)

| Name | Call | Meaning |
| --- | --- | --- |
| [is_flow](/docs/reference/nu/tree/flow#is_flow) | `tree.is_flow(node)` | Predicate: node is a Flow. |
| [wrap_flow_children](/docs/reference/nu/tree/flow#wrap_flow_children) | `tree.wrap_flow_children(tree, wrapper, descend=None)` | At each Flow node, replace every direct child with `wrapper(child)`. |
| [wrap_flows](/docs/reference/nu/tree/flow#wrap_flows) | `tree.wrap_flows(tree, wrapper, predicate=None)` | Wrap outermost Flow nodes with `wrapper(flow)`. |

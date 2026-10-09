---
title: attributes.sort
description: "Sort attribute: the structural taxonomy of a Term."
---

Module `nu.lang.attributes.sort`.

Sort attribute: the structural taxonomy of a Term.

A sort is a node's structural category. Sorts form a tree with two roots, Ref
and Interaction; `subsort` walks it. The composition matrix records, per
parent sort, the child sorts that parent may hold; `matrix_sort` folds any
sort onto the eight that carry a row. The synthesized `has_command` folds
the sort tree to a subtree-presence flag.

The user-facing Term classes that declare these sorts live in
`nu.lang.kinds`; this module owns the value space (`Sort` enum,
matrix, helpers) and the sort-flavored attribute folds only.

| Name | Call | Meaning |
| --- | --- | --- |
| [matrix_sort](#matrix_sort) | `lang.matrix_sort(sort)` | Resolve `sort` to the matrix sort it slot-fits as, or None. |
| [subsort](#subsort) | `lang.subsort(sort, ancestor)` | Return whether `sort` is `ancestor` or descends from it in the tree. |

## matrix_sort

Resolve `sort` to the matrix sort it slot-fits as, or None.

```python
lang.matrix_sort(sort)
```

Path `nu.lang.matrix_sort`. Defined on `nu.lang.attributes.sort`, bound as a function. Builds `Sort | None`.

A Reduction slot-fits as a ScalarQuery, anything under Command as a
ScalarCommand, and so on. An interior sort with no matrix row yields None.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sort` | `Sort` |  |  |

Undocumented: example.

## subsort

Return whether `sort` is `ancestor` or descends from it in the tree.

```python
lang.subsort(sort, ancestor)
```

Path `nu.lang.subsort`. Defined on `nu.lang.attributes.sort`, bound as a function. Builds `bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sort` | `Sort` |  |  |
| `ancestor` | `Sort` |  |  |

Undocumented: example.

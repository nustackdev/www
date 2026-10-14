---
title: effects
description: "Pre-compilation effect analysis over Term trees."
---

Module `nu.tree.effects`.

Pre-compilation effect analysis over Term trees.

A tree walk that reads each node's declared mutation slots and yields the
`(Ref, Effect)` edges of the subtree -- the same information the
effect attribute (`nu.lang.attributes.effects`) synthesizes at compile
time, but available *before* a Program exists. Rewrites that inject
boundaries (Brackets, Policies) run pre-compile and need exactly this.

Folds on top of the walk: `is_pure` / `reads` / `writes` /
`fabrics` and the fabric predicates `touches_fabric` /
`has_write_on_fabric`.

| Name | Call | Meaning |
| --- | --- | --- |
| [fabrics](#fabrics) | `tree.fabrics(node)` | Fold the subtree's Refs to the set of fabric identities they touch. |
| [has_write_on_fabric](#has_write_on_fabric) | `tree.has_write_on_fabric(node, ref_types)` | Predicate: subtree has a WRITE effect through a Ref of given type. |
| [is_pure](#is_pure) | `tree.is_pure(node)` | An atom or composition with no tracked effects is pure. |
| [iter_effects](#iter_effects) | `tree.iter_effects(node)` | Walk the subtree yielding `(ref_instance, effect)` for every Ref child. |
| [reads](#reads) | `tree.reads(node)` | Refs the subtree reads. |
| [touches_fabric](#touches_fabric) | `tree.touches_fabric(node, ref_types)` | Predicate: subtree holds at least one Ref whose type is in ref_types. |
| [writes](#writes) | `tree.writes(node)` | Refs the subtree writes. |

## fabrics

Fold the subtree's Refs to the set of fabric identities they touch.

```python
tree.fabrics(node)
```

Path `nu.tree.fabrics`. Defined on `nu.tree.effects`, bound as a function. Builds `frozenset[type]`.

A Ref's fabric identity is its type.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `node` | `Nu` |  |  |

Undocumented: example.

## has_write_on_fabric

Predicate: subtree has a WRITE effect through a Ref of given type.

```python
tree.has_write_on_fabric(node, ref_types)
```

Path `nu.tree.has_write_on_fabric`. Defined on `nu.tree.effects`, bound as a function. Builds `bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `node` | `Nu` |  |  |
| `ref_types` | `tuple[type, ...]` |  |  |

Undocumented: example.

## is_pure

An atom or composition with no tracked effects is pure.

```python
tree.is_pure(node)
```

Path `nu.tree.is_pure`. Defined on `nu.tree.effects`, bound as a function. Builds `bool`.

A subtree carrying a dynamic (Sort.DYNAMIC) node is never pure: the
inner tree the carrier will produce is opaque at analysis time, so we
treat the whole subtree as potentially effectful.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `node` | `Nu` |  |  |

Undocumented: example.

## iter_effects

Walk the subtree yielding `(ref_instance, effect)` for every Ref child.

```python
tree.iter_effects(node)
```

Path `nu.tree.iter_effects`. Defined on `nu.tree.effects`, bound as a function. Builds `Iterator[tuple[Ref, Effect]]`.

Mirrors the effect synthesis (`nu.lang.attributes.effects`): a Ref
child in a mutation slot (declared via `mutates`) binds as WRITE; a Ref
child in a structural slot (declared via `structural`) binds as nothing -
it is address structure, never evaluated; any other Ref child binds as
READ. The recursion still descends every child, so value reads nested
inside a structural subtree are collected. Pre-compilation tree walk -- no
Program needed.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `node` | `Nu` |  |  |

Undocumented: example.

## reads

Refs the subtree reads.

```python
tree.reads(node)
```

Path `nu.tree.reads`. Defined on `nu.tree.effects`, bound as a function. Builds `frozenset[Ref]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `node` | `Nu` |  |  |

Undocumented: example.

## touches_fabric

Predicate: subtree holds at least one Ref whose type is in ref_types.

```python
tree.touches_fabric(node, ref_types)
```

Path `nu.tree.touches_fabric`. Defined on `nu.tree.effects`, bound as a function. Builds `bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `node` | `Nu` |  |  |
| `ref_types` | `tuple[type, ...]` |  |  |

Undocumented: example.

## writes

Refs the subtree writes.

```python
tree.writes(node)
```

Path `nu.tree.writes`. Defined on `nu.tree.effects`, bound as a function. Builds `frozenset[Ref]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `node` | `Nu` |  |  |

Undocumented: example.

---
title: shape
description: "Nu shape domain: declare structure once, reach it through refs any fabric backs."
---

Module `nu.domains.shape`.

Nu shape domain: declare structure once, reach it through refs any fabric backs.

A Shape declares slots; each slot is a ref blueprint that a fabric completes
with its own storage. Blueprints come in families (item, mapping, sequence,
set, shape), each in three tiers (read, mutable, reactive), and carry the whole
Form surface of their family. A fabric supplies only how a path is read and
written, and which of its refs a descent lands on.

Reactive queries (`OnChange` and its tree-aware siblings) live in
`nu.core.reactive`, one interface for every substrate, reached through the
shape Form mixins.

## interactions

Module `nu.domains.shape.interactions`.

Shape fabric queries and commands: all shape interactions in one place.

[Full entries](/docs/nu/reference/domains/shape/interactions)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AdvanceCursor](/docs/nu/reference/domains/shape/interactions#advancecursor) | `scalar_query` | `AdvanceCursor()` | Read the next key after the cursor on an ordered view. |
| [Erase](/docs/nu/reference/domains/shape/interactions#erase) | `scalar_command` | `Erase()` | Remove the slot-0 structured Ref from its fabric. |
| [Exists](/docs/nu/reference/domains/shape/interactions#exists) | `scalar_query` | `Exists()` | Yield True if the slot-0 Ref's address is bound (value is not EMPTY). Never EMPTY. |
| [Extract](/docs/nu/reference/domains/shape/interactions#extract) | `scalar_query` | `Extract()` | Materialise the full subtree at the slot-0 Ref via `view.extract()`. |
| [Load](/docs/nu/reference/domains/shape/interactions#load) | `scalar_query` | `Load()` | Yield the value at the slot-0 Ref; EMPTY if the address is unbound. |
| [Missing](/docs/nu/reference/domains/shape/interactions#missing) | `scalar_query` | `Missing()` | Yield True if the slot-0 Ref's address is unbound (value is EMPTY). Never EMPTY. |
| [PrimitiveSet](/docs/nu/reference/domains/shape/interactions#primitiveset) | `scalar_command` | `PrimitiveSet()` | Write the slot-1 value to the slot-0 Ref via `_primitive_write`. |
| [SetCmd](/docs/nu/reference/domains/shape/interactions#setcmd) | `scalar_command` | `SetCmd()` | Write the slot-1 value to the slot-0 structured Ref's address. |

## item

Module `nu.domains.shape.item`.

Leaf family: a single value in a shape fabric, with no descent below it.

[Full entries](/docs/nu/reference/domains/shape/item)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ItemRef](/docs/nu/reference/domains/shape/item#itemref) | `ref` | `ItemRef(address, parent_ref=None, owner_shape=None)` | Leaf Ref: single typed value, no child descent. |
| [MutableItemRef](/docs/nu/reference/domains/shape/item#mutableitemref) | `ref` | `MutableItemRef(address, parent_ref=None, owner_shape=None)` | Mutable leaf Ref: single typed value with write/erase. |
| [ReactiveItemRef](/docs/nu/reference/domains/shape/item#reactiveitemref) | `ref` | `ReactiveItemRef(address, parent_ref=None, owner_shape=None)` | Reactive leaf Ref: single typed value with observation. |

## mapping

Module `nu.domains.shape.mapping`.

Mapping family: a key-value collection in a shape fabric.

[Full entries](/docs/nu/reference/domains/shape/mapping)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [MappingRef](/docs/nu/reference/domains/shape/mapping#mappingref) | `ref` | `MappingRef(address, parent_ref=None, owner_shape=None)` | Key-value container Ref; `ref[key]` navigates to the value's child Ref. |
| [MutableMappingRef](/docs/nu/reference/domains/shape/mapping#mutablemappingref) | `ref` | `MutableMappingRef(address, parent_ref=None, owner_shape=None)` | Mutable key-value container Ref. |
| [ReactiveMappingRef](/docs/nu/reference/domains/shape/mapping#reactivemappingref) | `ref` | `ReactiveMappingRef(address, parent_ref=None, owner_shape=None)` | Reactive key-value container Ref. |

## sequence

Module `nu.domains.shape.sequence`.

Sequence family: an ordered collection in a shape fabric.

[Full entries](/docs/nu/reference/domains/shape/sequence)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [MutableSequenceRef](/docs/nu/reference/domains/shape/sequence#mutablesequenceref) | `ref` | `MutableSequenceRef(address, parent_ref=None, owner_shape=None)` | Mutable ordered container Ref. |
| [ReactiveSequenceRef](/docs/nu/reference/domains/shape/sequence#reactivesequenceref) | `ref` | `ReactiveSequenceRef(address, parent_ref=None, owner_shape=None)` | Reactive ordered container Ref. |
| [SequenceRef](/docs/nu/reference/domains/shape/sequence#sequenceref) | `ref` | `SequenceRef(address, parent_ref=None, owner_shape=None)` | Ordered container Ref; `ref[i]` navigates to the element's child Ref. |

## set_

Module `nu.domains.shape.set_`.

Set family: an unordered collection of unique elements in a shape fabric.

[Full entries](/docs/nu/reference/domains/shape/set)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [MutableSetRef](/docs/nu/reference/domains/shape/set#mutablesetref) | `ref` | `MutableSetRef(address, parent_ref=None, owner_shape=None)` | Mutable unordered unique-element container Ref. |
| [ReactiveSetRef](/docs/nu/reference/domains/shape/set#reactivesetref) | `ref` | `ReactiveSetRef(address, parent_ref=None, owner_shape=None)` | Reactive unordered unique-element container Ref. |
| [SetRef](/docs/nu/reference/domains/shape/set#setref) | `ref` | `SetRef(address, parent_ref=None, owner_shape=None)` | Unordered unique-element container Ref; no child descent. |

## shape

Module `nu.domains.shape.shape`.

Shape family: a nested Shape in a shape fabric, navigated by slot name.

[Full entries](/docs/nu/reference/domains/shape/shape)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [MutableShapeRef](/docs/nu/reference/domains/shape/shape#mutableshaperef) | `ref` | `MutableShapeRef(address, shape_type, parent_ref=None, owner_shape=None)` | Mutable structured container Ref. |
| [ReactiveShapeRef](/docs/nu/reference/domains/shape/shape#reactiveshaperef) | `ref` | `ReactiveShapeRef(address, shape_type, parent_ref=None, owner_shape=None)` | Reactive structured container Ref. |
| [ShapeRef](/docs/nu/reference/domains/shape/shape#shaperef) | `ref` | `ShapeRef(address, shape_type, parent_ref=None, owner_shape=None)` | Structured container Ref; slot navigation via attribute or bracket access. |

## base

Module `nu.domains.shape.base`.

The address chain every shape ref is: a parent on the tree, then its own address.

[Full entries](/docs/nu/reference/domains/shape/base)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [StructuredRef](/docs/nu/reference/domains/shape/base#structuredref) | `ref` | `StructuredRef(address, parent_ref=None, owner_shape=None)` | Abstract base for shape-fabric Refs. |
| [root_shape](/docs/nu/reference/domains/shape/base#root_shape) |  | `shape.root_shape(ref)` | The Shape class a Ref chain is rooted at. |

## rewrite

Module `nu.domains.shape.rewrite`.

Re-rooting: splice every bare ref chain in a tree under a new parent.

[Full entries](/docs/nu/reference/domains/shape/rewrite)

| Name | Call | Meaning |
| --- | --- | --- |
| [reroot](/docs/nu/reference/domains/shape/rewrite#reroot) | `shape.reroot(root, under, rooted=None)` | Rewrite `root` so every bare ref chain in it hangs off `under`. |
| [rerooter](/docs/nu/reference/domains/shape/rewrite#rerooter) | `shape.rerooter(under, rooted=None)` | `reroot` with its policy fixed, as a plain `Nu -> Nu` transform. |

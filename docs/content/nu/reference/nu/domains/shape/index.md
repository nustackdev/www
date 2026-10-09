---
title: shape
description: "Nu shape fabric: DSL + Ref blueprints (3-tier matrix) + queries/commands."
---

Module `nu.domains.shape`.

Nu shape fabric: DSL + Ref blueprints (3-tier matrix) + queries/commands.

- `Shape`, `ShapeMeta`, `Slot`, `SlotDescriptor`: the DSL.
- 21 Ref blueprints for structural navigation and substrate extension (7 families x 3 tiers).
- `SetCmd`, `Erase`: slot-level write commands.
- `Load`, `Exists`, `Missing`, `Extract`,
  `AdvanceCursor`: slot-level read queries.
- `reroot` / `rerooter`: splice the bare ref chains in a term under a
  new parent, so a snippet written without a mount point gets one.
- `root_shape`: which Shape a Ref chain is rooted at, for code handed a Ref
  as a location and building its own reads under it.

Reactive queries (`OnChange` / `OnChildChange` /
`OnChildrenChange` / `OnDescendantsChange` /
`OnPrimitiveChange`) live in `nu.core.reactive` -- one unified
interface for every substrate, reached through the shape Form mixins.

**Modules**

| Module | What |
| --- | --- |
| [`nu.domains.shape.forms`](/docs/nu/reference/nu/domains/shape/forms) | Shape-domain Form chain. |

## interactions

Module `nu.domains.shape.interactions`.

Shape fabric queries and commands: all shape interactions in one place.

[Full entries](/docs/nu/reference/nu/domains/shape/interactions)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AdvanceCursor](/docs/nu/reference/nu/domains/shape/interactions#advancecursor) | `scalar_query` | `AdvanceCursor()` | Read the next key after the cursor on an ordered view. |
| [Erase](/docs/nu/reference/nu/domains/shape/interactions#erase) | `scalar_command` | `Erase()` | Remove the slot-0 structured Ref from its fabric. |
| [Exists](/docs/nu/reference/nu/domains/shape/interactions#exists) | `scalar_query` | `Exists()` | Yield True if the slot-0 Ref's address is bound (value is not a sentinel). |
| [Extract](/docs/nu/reference/nu/domains/shape/interactions#extract) | `scalar_query` | `Extract()` | Materialise the full subtree at the slot-0 Ref via `view.extract()`. |
| [Load](/docs/nu/reference/nu/domains/shape/interactions#load) | `scalar_query` | `Load()` | Yield the value at the slot-0 Ref; EMPTY if the address is unbound. |
| [Missing](/docs/nu/reference/nu/domains/shape/interactions#missing) | `scalar_query` | `Missing()` | Yield True if the slot-0 Ref's address is unbound (value is a sentinel). |
| [PrimitiveSet](/docs/nu/reference/nu/domains/shape/interactions#primitiveset) | `scalar_command` | `PrimitiveSet()` | Write the slot-1 value to the slot-0 Ref via `_primitive_write`. |
| [SetCmd](/docs/nu/reference/nu/domains/shape/interactions#setcmd) | `scalar_command` | `SetCmd()` | Write the slot-1 value to the slot-0 structured Ref's address. |

## refs.item

Module `nu.domains.shape.refs.item`.

ItemRef hierarchy: leaf Ref + Form mixin tiers.

[Full entries](/docs/nu/reference/nu/domains/shape/refs-item)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ItemRef](/docs/nu/reference/nu/domains/shape/refs-item#itemref) | `ref` | `ItemRef(address, parent_ref=None, owner_shape=None)` | Leaf Ref: single typed value, no child descent. |
| [MutableItemRef](/docs/nu/reference/nu/domains/shape/refs-item#mutableitemref) | `ref` | `MutableItemRef(address, parent_ref=None, owner_shape=None)` | Mutable leaf Ref: single typed value with write/erase. |
| [ReactiveItemRef](/docs/nu/reference/nu/domains/shape/refs-item#reactiveitemref) | `ref` | `ReactiveItemRef(address, parent_ref=None, owner_shape=None)` | Reactive leaf Ref: single typed value with observation. |

## refs.mapping

Module `nu.domains.shape.refs.mapping`.

MappingRef hierarchy: key-value container Ref + Form mixin tiers.

[Full entries](/docs/nu/reference/nu/domains/shape/refs-mapping)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [MappingRef](/docs/nu/reference/nu/domains/shape/refs-mapping#mappingref) | `ref` | `MappingRef(address, parent_ref=None, owner_shape=None)` | Key-value container Ref; `ref[key]` navigates to the value's child Ref. |
| [MutableMappingRef](/docs/nu/reference/nu/domains/shape/refs-mapping#mutablemappingref) | `ref` | `MutableMappingRef(address, parent_ref=None, owner_shape=None)` | Mutable key-value container Ref. |
| [ReactiveMappingRef](/docs/nu/reference/nu/domains/shape/refs-mapping#reactivemappingref) | `ref` | `ReactiveMappingRef(address, parent_ref=None, owner_shape=None)` | Reactive key-value container Ref. |

## refs.sequence

Module `nu.domains.shape.refs.sequence`.

SequenceRef hierarchy: ordered container Ref + Form mixin tiers.

[Full entries](/docs/nu/reference/nu/domains/shape/refs-sequence)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [MutableSequenceRef](/docs/nu/reference/nu/domains/shape/refs-sequence#mutablesequenceref) | `ref` | `MutableSequenceRef(address, parent_ref=None, owner_shape=None)` | Mutable ordered container Ref. |
| [ReactiveSequenceRef](/docs/nu/reference/nu/domains/shape/refs-sequence#reactivesequenceref) | `ref` | `ReactiveSequenceRef(address, parent_ref=None, owner_shape=None)` | Reactive ordered container Ref. |
| [SequenceRef](/docs/nu/reference/nu/domains/shape/refs-sequence#sequenceref) | `ref` | `SequenceRef(address, parent_ref=None, owner_shape=None)` | Ordered container Ref; `ref[i]` navigates to the element's child Ref. |

## refs.set_

Module `nu.domains.shape.refs.set_`.

SetRef hierarchy: unordered unique-element container Ref + Form mixin tiers.

[Full entries](/docs/nu/reference/nu/domains/shape/refs-set)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [MutableSetRef](/docs/nu/reference/nu/domains/shape/refs-set#mutablesetref) | `ref` | `MutableSetRef(address, parent_ref=None, owner_shape=None)` | Mutable unordered unique-element container Ref. |
| [ReactiveSetRef](/docs/nu/reference/nu/domains/shape/refs-set#reactivesetref) | `ref` | `ReactiveSetRef(address, parent_ref=None, owner_shape=None)` | Reactive unordered unique-element container Ref. |
| [SetRef](/docs/nu/reference/nu/domains/shape/refs-set#setref) | `ref` | `SetRef(address, parent_ref=None, owner_shape=None)` | Unordered unique-element container Ref; no child descent. |

## refs.shape

Module `nu.domains.shape.refs.shape`.

ShapeRef hierarchy: structured container Ref with named-slot navigation.

[Full entries](/docs/nu/reference/nu/domains/shape/refs-shape)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [MutableShapeRef](/docs/nu/reference/nu/domains/shape/refs-shape#mutableshaperef) | `ref` | `MutableShapeRef(address, shape_type, parent_ref=None, owner_shape=None)` | Mutable structured container Ref. |
| [ReactiveShapeRef](/docs/nu/reference/nu/domains/shape/refs-shape#reactiveshaperef) | `ref` | `ReactiveShapeRef(address, shape_type, parent_ref=None, owner_shape=None)` | Reactive structured container Ref. |
| [ShapeRef](/docs/nu/reference/nu/domains/shape/refs-shape#shaperef) | `ref` | `ShapeRef(address, shape_type, parent_ref=None, owner_shape=None)` | Structured container Ref; slot navigation via attribute or bracket access. |

## refs.shapes_mapping

Module `nu.domains.shape.refs.shapes_mapping`.

ShapesMappingRef hierarchy: mapping-of-shapes Ref + Form mixin tiers.

[Full entries](/docs/nu/reference/nu/domains/shape/refs-shapes-mapping)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [MutableShapesMappingRef](/docs/nu/reference/nu/domains/shape/refs-shapes-mapping#mutableshapesmappingref) | `ref` | `MutableShapesMappingRef(address, item_shape_type, parent_ref=None, owner_shape=None)` | Mutable mapping-of-shapes Ref; subscript returns MutableShapeRef. |
| [ReactiveShapesMappingRef](/docs/nu/reference/nu/domains/shape/refs-shapes-mapping#reactiveshapesmappingref) | `ref` | `ReactiveShapesMappingRef(address, item_shape_type, parent_ref=None, owner_shape=None)` | Reactive mapping-of-shapes Ref; subscript returns ReactiveShapeRef. |
| [ShapesMappingRef](/docs/nu/reference/nu/domains/shape/refs-shapes-mapping#shapesmappingref) | `ref` | `ShapesMappingRef(address, item_shape_type, parent_ref=None, owner_shape=None)` | Mapping-of-shapes Ref; subscript descent returns a ShapeRef. |

## refs.shapes_sequence

Module `nu.domains.shape.refs.shapes_sequence`.

ShapesSequenceRef hierarchy: sequence-of-shapes Ref + Form mixin tiers.

[Full entries](/docs/nu/reference/nu/domains/shape/refs-shapes-sequence)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [MutableShapesSequenceRef](/docs/nu/reference/nu/domains/shape/refs-shapes-sequence#mutableshapessequenceref) | `ref` | `MutableShapesSequenceRef(address, item_shape_type, parent_ref=None, owner_shape=None)` | Mutable sequence-of-shapes Ref; subscript returns MutableShapeRef. |
| [ReactiveShapesSequenceRef](/docs/nu/reference/nu/domains/shape/refs-shapes-sequence#reactiveshapessequenceref) | `ref` | `ReactiveShapesSequenceRef(address, item_shape_type, parent_ref=None, owner_shape=None)` | Reactive sequence-of-shapes Ref; subscript returns ReactiveShapeRef. |
| [ShapesSequenceRef](/docs/nu/reference/nu/domains/shape/refs-shapes-sequence#shapessequenceref) | `ref` | `ShapesSequenceRef(address, item_shape_type, parent_ref=None, owner_shape=None)` | Sequence-of-shapes Ref; subscript descent returns a ShapeRef. |

## rewrite

Module `nu.domains.shape.rewrite`.

Re-rooting: splice every bare ref chain in a tree under a new parent.

[Full entries](/docs/nu/reference/nu/domains/shape/rewrite)

| Name | Call | Meaning |
| --- | --- | --- |
| [reroot](/docs/nu/reference/nu/domains/shape/rewrite#reroot) | `shape.reroot(root, under, rooted=None)` | Rewrite `root` so every bare ref chain in it hangs off `under`. |
| [rerooter](/docs/nu/reference/nu/domains/shape/rewrite#rerooter) | `shape.rerooter(under, rooted=None)` | `reroot` with its policy fixed, as a plain `Nu -> Nu` transform. |

## refs.base

Module `nu.domains.shape.refs.base`.

StructuredRef: abstract base for all shape-fabric Refs.

[Full entries](/docs/nu/reference/nu/domains/shape/refs-base)

| Name | Call | Meaning |
| --- | --- | --- |
| [root_shape](/docs/nu/reference/nu/domains/shape/refs-base#root_shape) | `shape.root_shape(ref)` | The Shape class a Ref chain is rooted at. |

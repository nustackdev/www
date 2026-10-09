---
title: forms
description: "Shape-domain Form chain."
---

Module `nu.domains.shape.forms`.

Shape-domain Form chain.

Re-exports all shape Form tiers across all families:

Item trunk (no generic peer):
    ItemForm / MutableItemForm / ReactiveItemForm

Collection trunk (base + mutable + reactive):
    CollectionForm / MutableCollectionForm / ReactiveCollectionForm

Glue tiers (compose generic + shape per tier):
    MappingForm / MutableMappingForm / ReactiveMappingForm
    SequenceForm / MutableSequenceForm / ReactiveSequenceForm
    SetLikeForm / MutableSetForm / ReactiveSetForm

## collection

Module `nu.domains.shape.forms.collection`.

Shape-domain Collection Form chain.

[Full entries](/docs/reference/nu/domains/shape/forms/collection)

| Name | Call | Meaning |
| --- | --- | --- |
| [CollectionForm](/docs/reference/nu/domains/shape/forms/collection#collectionform) | `CollectionForm()` | Shape collection Form. Ops: `exists()`, `missing()`, `extract()`. |
| [MutableCollectionForm](/docs/reference/nu/domains/shape/forms/collection#mutablecollectionform) | `MutableCollectionForm()` | Mutable shape collection Form. Adds `set(value)` and `erase()`. |
| [ReactiveCollectionForm](/docs/reference/nu/domains/shape/forms/collection#reactivecollectionform) | `ReactiveCollectionForm()` | Reactive shape collection Form. Adds tree-aware observation. |

## item

Module `nu.domains.shape.forms.item`.

Item (leaf) shape-fabric Forms: three tiers.

[Full entries](/docs/reference/nu/domains/shape/forms/item)

| Name | Call | Meaning |
| --- | --- | --- |
| [ItemForm](/docs/reference/nu/domains/shape/forms/item#itemform) | `ItemForm()` | Slot-level read surface for a leaf value. Ops: `exists()`, `missing()`. |
| [MutableItemForm](/docs/reference/nu/domains/shape/forms/item#mutableitemform) | `MutableItemForm()` | Slot-level write surface. Adds `set(value)` and `erase()`. |
| [ReactiveItemForm](/docs/reference/nu/domains/shape/forms/item#reactiveitemform) | `ReactiveItemForm()` | Slot-level reactive surface. Adds `on_change()`. |

## mapping

Module `nu.domains.shape.forms.mapping`.

Shape-domain Mapping Form glue: tier-by-tier composition.

[Full entries](/docs/reference/nu/domains/shape/forms/mapping)

| Name | Call | Meaning |
| --- | --- | --- |
| [MappingForm](/docs/reference/nu/domains/shape/forms/mapping#mappingform) | `MappingForm()` | Shape mapping: key-value ops + exists/missing/extract. |
| [MutableMappingForm](/docs/reference/nu/domains/shape/forms/mapping#mutablemappingform) | `MutableMappingForm()` | Mutable shape mapping: key-value ops + exists/missing/extract + set/erase. |
| [ReactiveMappingForm](/docs/reference/nu/domains/shape/forms/mapping#reactivemappingform) | `ReactiveMappingForm()` | Reactive shape mapping. Adds on_change + tree-aware on_child_change* family. |

## sequence

Module `nu.domains.shape.forms.sequence`.

Shape-domain Sequence Form glue: tier-by-tier composition.

[Full entries](/docs/reference/nu/domains/shape/forms/sequence)

| Name | Call | Meaning |
| --- | --- | --- |
| [MutableSequenceForm](/docs/reference/nu/domains/shape/forms/sequence#mutablesequenceform) | `MutableSequenceForm()` | Mutable shape sequence: ordered-element ops + exists/missing/extract + set/erase. |
| [ReactiveSequenceForm](/docs/reference/nu/domains/shape/forms/sequence#reactivesequenceform) | `ReactiveSequenceForm()` | Reactive shape sequence. Adds on_change + tree-aware on_child_change* family. |
| [SequenceForm](/docs/reference/nu/domains/shape/forms/sequence#sequenceform) | `SequenceForm()` | Shape sequence: ordered-element ops + exists/missing/extract. |

## set_

Module `nu.domains.shape.forms.set_`.

Shape-domain Set Form glue: tier-by-tier composition.

[Full entries](/docs/reference/nu/domains/shape/forms/set)

| Name | Call | Meaning |
| --- | --- | --- |
| [MutableSetForm](/docs/reference/nu/domains/shape/forms/set#mutablesetform) | `MutableSetForm()` | Mutable shape set: set ops + exists/missing/extract + set/erase. |
| [ReactiveSetForm](/docs/reference/nu/domains/shape/forms/set#reactivesetform) | `ReactiveSetForm()` | Reactive shape set. Adds on_change + tree-aware on_child_change* family. |
| [SetLikeForm](/docs/reference/nu/domains/shape/forms/set#setlikeform) | `SetLikeForm()` | Shape set: unordered-unique-element ops + exists/missing/extract. |

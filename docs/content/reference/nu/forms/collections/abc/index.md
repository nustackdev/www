---
title: abc
description: "Generic collection interfaces and interactions."
---

Module `nu.forms.collections.abc`.

Generic collection interfaces and interactions.

## set_interactions

Module `nu.forms.collections.abc.set_interactions`.

Set interactions.

[Full entries](/docs/reference/nu/forms/collections/abc/set-interactions)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AddCmd](/docs/reference/nu/forms/collections/abc/set-interactions#addcmd) | `scalar_command` | `AddCmd()` | Add element to set: s.add(value). Mutates the set; returns nothing. |
| [Difference](/docs/reference/nu/forms/collections/abc/set-interactions#difference) | `scalar_query` | `Difference()` | Set difference: left.difference(right). Returns a new set. |
| [DifferenceUpdate](/docs/reference/nu/forms/collections/abc/set-interactions#differenceupdate) | `scalar_command` | `DifferenceUpdate()` | Remove elements found in other: s.difference_update(other). Mutates the set; returns nothing. |
| [Discard](/docs/reference/nu/forms/collections/abc/set-interactions#discard) | `scalar_command` | `Discard()` | Discard element from set: s.discard(value). Mutates the set; returns nothing. |
| [Intersection](/docs/reference/nu/forms/collections/abc/set-interactions#intersection) | `scalar_query` | `Intersection()` | Set intersection: left.intersection(right). Returns a new set. |
| [IntersectionUpdate](/docs/reference/nu/forms/collections/abc/set-interactions#intersectionupdate) | `scalar_command` | `IntersectionUpdate()` | Keep only elements found in both: s.intersection_update(other). |
| [IsDisjoint](/docs/reference/nu/forms/collections/abc/set-interactions#isdisjoint) | `scalar_query` | `IsDisjoint()` | Test if disjoint: left.isdisjoint(right). Returns a bool. |
| [IsSubset](/docs/reference/nu/forms/collections/abc/set-interactions#issubset) | `scalar_query` | `IsSubset()` | Test if subset: left <= right. Returns a bool. |
| [IsSuperset](/docs/reference/nu/forms/collections/abc/set-interactions#issuperset) | `scalar_query` | `IsSuperset()` | Test if superset: left >= right. Returns a bool. |
| [Remove](/docs/reference/nu/forms/collections/abc/set-interactions#remove) | `scalar_command` | `Remove()` | Remove element from set: s.remove(value). Mutates the set; returns nothing. |
| [SetAnd](/docs/reference/nu/forms/collections/abc/set-interactions#setand) | `scalar_query` | `SetAnd()` | Set intersection operator: left & right. Returns a new set. |
| [SetIAnd](/docs/reference/nu/forms/collections/abc/set-interactions#setiand) | `scalar_action` | `SetIAnd()` | In-place intersection: left &= right. Mutates the set; returns the set. |
| [SetIOr](/docs/reference/nu/forms/collections/abc/set-interactions#setior) | `scalar_action` | `SetIOr()` | In-place union: left \|= right. Mutates the set; returns the set. |
| [SetISub](/docs/reference/nu/forms/collections/abc/set-interactions#setisub) | `scalar_action` | `SetISub()` | In-place difference: left -= right. Mutates the set; returns the set. |
| [SetIXor](/docs/reference/nu/forms/collections/abc/set-interactions#setixor) | `scalar_action` | `SetIXor()` | In-place symmetric difference: left ^= right. Mutates the set; returns the set. |
| [SetOr](/docs/reference/nu/forms/collections/abc/set-interactions#setor) | `scalar_query` | `SetOr()` | Set union operator: left \| right. Returns a new set. |
| [SetPop](/docs/reference/nu/forms/collections/abc/set-interactions#setpop) | `scalar_action` | `SetPop()` | Pop arbitrary element: s.pop(). Mutates the set; returns the element. |
| [SetSub](/docs/reference/nu/forms/collections/abc/set-interactions#setsub) | `scalar_query` | `SetSub()` | Set difference operator: left - right. Returns a new set. |
| [SetUpdate](/docs/reference/nu/forms/collections/abc/set-interactions#setupdate) | `scalar_command` | `SetUpdate()` | Update set with elements from other: s.update(other). Mutates the set; returns nothing. |
| [SetXor](/docs/reference/nu/forms/collections/abc/set-interactions#setxor) | `scalar_query` | `SetXor()` | Set symmetric difference operator: left ^ right. Returns a new set. |
| [SymmetricDifference](/docs/reference/nu/forms/collections/abc/set-interactions#symmetricdifference) | `scalar_query` | `SymmetricDifference()` | Set symmetric difference: left.symmetric_difference(right). Returns a new set. |
| [SymmetricDifferenceUpdate](/docs/reference/nu/forms/collections/abc/set-interactions#symmetricdifferenceupdate) | `scalar_command` | `SymmetricDifferenceUpdate()` | Keep elements in either but not both: s.symmetric_difference_update(other). |
| [Union](/docs/reference/nu/forms/collections/abc/set-interactions#union) | `scalar_query` | `Union()` | Set union: left.union(right). Returns a new set. |

## sequence_interactions

Module `nu.forms.collections.abc.sequence_interactions`.

Sequence interactions.

[Full entries](/docs/reference/nu/forms/collections/abc/sequence-interactions)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Append](/docs/reference/nu/forms/collections/abc/sequence-interactions#append) | `scalar_command` | `Append()` | Append item to end: seq.append(value). Mutates slot 0; returns nothing. |
| [Count](/docs/reference/nu/forms/collections/abc/sequence-interactions#count) | `scalar_query` | `Count()` | Count occurrences: seq.count(value). |
| [DelIndex](/docs/reference/nu/forms/collections/abc/sequence-interactions#delindex) | `scalar_command` | `DelIndex()` | Subscript delete: del seq[index]. Mutates slot 0; returns nothing. |
| [Extend](/docs/reference/nu/forms/collections/abc/sequence-interactions#extend) | `scalar_command` | `Extend()` | Extend sequence with iterable: seq.extend(other). Mutates slot 0; returns nothing. |
| [First](/docs/reference/nu/forms/collections/abc/sequence-interactions#first) | `scalar_query` | `First()` | First element: seq[0]. Returns Invalid if empty. |
| [IAdd](/docs/reference/nu/forms/collections/abc/sequence-interactions#iadd) | `scalar_action` | `IAdd()` | In-place concat: seq += other. Mutates slot 0 and returns it (Python __iadd__). |
| [IMul](/docs/reference/nu/forms/collections/abc/sequence-interactions#imul) | `scalar_action` | `IMul()` | In-place repeat: seq *= n. Mutates slot 0 and returns it (Python __imul__). |
| [IndexOf](/docs/reference/nu/forms/collections/abc/sequence-interactions#indexof) | `scalar_query` | `IndexOf()` | Find index of value: seq.index(value). Returns Invalid if not found. |
| [Insert](/docs/reference/nu/forms/collections/abc/sequence-interactions#insert) | `scalar_command` | `Insert()` | Insert item at index: seq.insert(index, value). Mutates slot 0; returns nothing. |
| [Last](/docs/reference/nu/forms/collections/abc/sequence-interactions#last) | `scalar_query` | `Last()` | Last element: seq[-1]. Returns Invalid if empty. |
| [Pop](/docs/reference/nu/forms/collections/abc/sequence-interactions#pop) | `scalar_action` | `Pop()` | Pop item at index: seq.pop(index). Mutates slot 0 and returns the popped value. |
| [RemoveValue](/docs/reference/nu/forms/collections/abc/sequence-interactions#removevalue) | `scalar_command` | `RemoveValue()` | Remove first occurrence of value: seq.remove(value). Mutates slot 0; returns nothing. |
| [Reverse](/docs/reference/nu/forms/collections/abc/sequence-interactions#reverse) | `scalar_command` | `Reverse()` | Reverse sequence in-place: seq.reverse(). Mutates slot 0; returns nothing. |
| [SetIndex](/docs/reference/nu/forms/collections/abc/sequence-interactions#setindex) | `scalar_command` | `SetIndex()` | Subscript write: seq[index] = value. Mutates slot 0; returns nothing. |
| [Sort](/docs/reference/nu/forms/collections/abc/sequence-interactions#sort) | `scalar_command` | `Sort()` | Sort sequence in-place: list.sort(). Mutates slot 0; returns nothing. |

## shared_interactions

Module `nu.forms.collections.abc.shared_interactions`.

Shared collection mutation commands.

[Full entries](/docs/reference/nu/forms/collections/abc/shared-interactions)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Clear](/docs/reference/nu/forms/collections/abc/shared-interactions#clear) | `scalar_command` | `Clear()` | Clear all items: collection.clear(); mutates the collection, returns nothing. |

## mapping_interactions

Module `nu.forms.collections.abc.mapping_interactions`.

Mapping interactions.

[Full entries](/docs/reference/nu/forms/collections/abc/mapping-interactions)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ContainsKey](/docs/reference/nu/forms/collections/abc/mapping-interactions#containskey) | `scalar_query` | `ContainsKey()` | Test key membership: key in mapping. Yields a bool. |
| [DeleteItem](/docs/reference/nu/forms/collections/abc/mapping-interactions#deleteitem) | `scalar_command` | `DeleteItem()` | Delete entry by key: del mapping[key]. Mutates slot 0; returns nothing. |
| [DictPop](/docs/reference/nu/forms/collections/abc/mapping-interactions#dictpop) | `scalar_action` | `DictPop()` | Pop value by key with optional default: mapping.pop(key, default). |
| [Get](/docs/reference/nu/forms/collections/abc/mapping-interactions#get) | `scalar_query` | `Get()` | Get value from mapping with optional default: mapping.get_item(key, default) or mapping[key]. |
| [Items](/docs/reference/nu/forms/collections/abc/mapping-interactions#items) | `scalar_query` | `Items()` | Get items view from mapping: mapping.items(). |
| [Keys](/docs/reference/nu/forms/collections/abc/mapping-interactions#keys) | `scalar_query` | `Keys()` | Get keys view from mapping: mapping.keys(). |
| [Merge](/docs/reference/nu/forms/collections/abc/mapping-interactions#merge) | `scalar_query` | `Merge()` | Merge two mappings into a new one: mapping \| other. Yields a new dict. |
| [MergeUpdate](/docs/reference/nu/forms/collections/abc/mapping-interactions#mergeupdate) | `scalar_action` | `MergeUpdate()` | In-place merge: mapping \|= other. Mutates slot 0 and yields the mapping. |
| [PopItem](/docs/reference/nu/forms/collections/abc/mapping-interactions#popitem) | `scalar_action` | `PopItem()` | Pop arbitrary item: mapping.popitem(). |
| [ReversedItems](/docs/reference/nu/forms/collections/abc/mapping-interactions#reverseditems) | `scalar_query` | `ReversedItems()` | `(key, value)` pairs in reverse insertion order: reversed(mapping.items()). |
| [ReversedKeys](/docs/reference/nu/forms/collections/abc/mapping-interactions#reversedkeys) | `scalar_query` | `ReversedKeys()` | Reverse-order keys: reversed(mapping). Yields keys in reverse insertion order. |
| [ReversedValues](/docs/reference/nu/forms/collections/abc/mapping-interactions#reversedvalues) | `scalar_query` | `ReversedValues()` | Values in reverse insertion order: reversed(mapping.values()). |
| [SetDefault](/docs/reference/nu/forms/collections/abc/mapping-interactions#setdefault) | `scalar_action` | `SetDefault()` | Set default value if key missing: mapping.setdefault(key, default). |
| [Update](/docs/reference/nu/forms/collections/abc/mapping-interactions#update) | `scalar_command` | `Update()` | Update mapping with another: mapping.update(other). Mutates slot 0; returns nothing. |
| [Values](/docs/reference/nu/forms/collections/abc/mapping-interactions#values) | `scalar_query` | `Values()` | Get values view from mapping: mapping.values(). |

## nu.core.access

Module `nu.core.access`.

Access atoms: Python's item and attribute management.

[Full entries](/docs/reference/nu/forms/collections/abc/nu-core-access)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [SetItem](/docs/reference/nu/forms/collections/abc/nu-core-access#setitem) | `scalar_command` | `SetItem(target, key, value)` | Subscript write: `x[k] = v`. |

## collection

Module `nu.forms.collections.abc.collection`.

Collection capability.

[Full entries](/docs/reference/nu/forms/collections/abc/collection)

| Name | Call | Meaning |
| --- | --- | --- |
| [CollectionForm](/docs/reference/nu/forms/collections/abc/collection#collectionform) | `CollectionForm()` | Base for collection values, like collections.abc.Collection. |

## container

Module `nu.forms.collections.abc.container`.

Container capability.

[Full entries](/docs/reference/nu/forms/collections/abc/container)

| Name | Call | Meaning |
| --- | --- | --- |
| [ContainerForm](/docs/reference/nu/forms/collections/abc/container#containerform) | `ContainerForm()` | Base for values that support containment checks, like collections.abc.Container. |

## iterable

Module `nu.forms.collections.abc.iterable`.

Iterable capability.

[Full entries](/docs/reference/nu/forms/collections/abc/iterable)

| Name | Call | Meaning |
| --- | --- | --- |
| [IterableForm](/docs/reference/nu/forms/collections/abc/iterable#iterableform) | `IterableForm()` | Base for values that support iteration, like collections.abc.Iterable. |

## mapping

Module `nu.forms.collections.abc.mapping`.

Mapping collection: bases + mutations.

[Full entries](/docs/reference/nu/forms/collections/abc/mapping)

| Name | Call | Meaning |
| --- | --- | --- |
| [MappingForm](/docs/reference/nu/forms/collections/abc/mapping#mappingform) | `MappingForm()` | Base for mapping values: key lookup plus key/value/item views. |
| [MutableMappingForm](/docs/reference/nu/forms/collections/abc/mapping#mutablemappingform) | `MutableMappingForm()` | Base for mutable mapping values: adds in-place writes over MappingForm. |
| [ReactiveMappingForm](/docs/reference/nu/forms/collections/abc/mapping#reactivemappingform) | `ReactiveMappingForm()` | Reactive mapping: adds any-change observation over MutableMappingForm. |

## sequence

Module `nu.forms.collections.abc.sequence`.

Sequence collection: bases + mutations.

[Full entries](/docs/reference/nu/forms/collections/abc/sequence)

| Name | Call | Meaning |
| --- | --- | --- |
| [MutableSequenceForm](/docs/reference/nu/forms/collections/abc/sequence#mutablesequenceform) | `MutableSequenceForm()` | Base for in-place-mutable sequences, like collections.abc.MutableSequence. |
| [ReactiveSequenceForm](/docs/reference/nu/forms/collections/abc/sequence#reactivesequenceform) | `ReactiveSequenceForm()` | Sequence with change subscriptions layered on MutableSequenceForm. |
| [SequenceForm](/docs/reference/nu/forms/collections/abc/sequence#sequenceform) | `SequenceForm()` | Base for ordered, indexable values, like collections.abc.Sequence. |

## set_

Module `nu.forms.collections.abc.set_`.

Set collection: bases + mutations.

[Full entries](/docs/reference/nu/forms/collections/abc/set)

| Name | Call | Meaning |
| --- | --- | --- |
| [MutableSetForm](/docs/reference/nu/forms/collections/abc/set#mutablesetform) | `MutableSetForm()` | Base for mutable set values, like collections.abc.MutableSet. |
| [ReactiveSetForm](/docs/reference/nu/forms/collections/abc/set#reactivesetform) | `ReactiveSetForm()` | Reactive set. Adds on_change() for any-change observation. |
| [SetLikeForm](/docs/reference/nu/forms/collections/abc/set#setlikeform) | `SetLikeForm()` | Base for set values, like collections.abc.Set. |

## sized

Module `nu.forms.collections.abc.sized`.

Sized capability.

[Full entries](/docs/reference/nu/forms/collections/abc/sized)

| Name | Call | Meaning |
| --- | --- | --- |
| [SizedForm](/docs/reference/nu/forms/collections/abc/sized#sizedform) | `SizedForm()` | Base for values that have a length, like collections.abc.Sized. |

## sliceable

Module `nu.forms.collections.abc.sliceable`.

Sliceable capability.

[Full entries](/docs/reference/nu/forms/collections/abc/sliceable)

| Name | Call | Meaning |
| --- | --- | --- |
| [SliceableForm](/docs/reference/nu/forms/collections/abc/sliceable#sliceableform) | `SliceableForm()` | Base for values that support slicing. |

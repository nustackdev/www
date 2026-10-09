---
title: set_interactions
description: "Set interactions."
---

Module `nu.forms.collections.abc.set_interactions`.

Set interactions.

Reads (Query):
    Union, Intersection, Difference, SymmetricDifference
    IsSubset, IsSuperset, IsDisjoint
    Copy
    SetOr, SetAnd, SetSub, SetXor

Mutations that return nothing (Command):
    AddCmd, Remove, Discard
    SetUpdate, IntersectionUpdate, DifferenceUpdate,
    SymmetricDifferenceUpdate

Mutations that return a value (Action):
    SetPop (set.pop returns an arbitrary element)
    SetIOr, SetIAnd, SetISub, SetIXor (in-place operators return self)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AddCmd](#addcmd) | `scalar_command` | `AddCmd()` | Add element to set: s.add(value). Mutates the set; returns nothing. |
| [Difference](#difference) | `scalar_query` | `Difference()` | Set difference: left.difference(right). Returns a new set. |
| [DifferenceUpdate](#differenceupdate) | `scalar_command` | `DifferenceUpdate()` | Remove elements found in other: s.difference_update(other). Mutates the set; returns nothing. |
| [Discard](#discard) | `scalar_command` | `Discard()` | Discard element from set: s.discard(value). Mutates the set; returns nothing. |
| [Intersection](#intersection) | `scalar_query` | `Intersection()` | Set intersection: left.intersection(right). Returns a new set. |
| [IntersectionUpdate](#intersectionupdate) | `scalar_command` | `IntersectionUpdate()` | Keep only elements found in both: s.intersection_update(other). |
| [IsDisjoint](#isdisjoint) | `scalar_query` | `IsDisjoint()` | Test if disjoint: left.isdisjoint(right). Returns a bool. |
| [IsSubset](#issubset) | `scalar_query` | `IsSubset()` | Test if subset: left <= right. Returns a bool. |
| [IsSuperset](#issuperset) | `scalar_query` | `IsSuperset()` | Test if superset: left >= right. Returns a bool. |
| [Remove](#remove) | `scalar_command` | `Remove()` | Remove element from set: s.remove(value). Mutates the set; returns nothing. |
| [SetAnd](#setand) | `scalar_query` | `SetAnd()` | Set intersection operator: left & right. Returns a new set. |
| [SetIAnd](#setiand) | `scalar_action` | `SetIAnd()` | In-place intersection: left &= right. Mutates the set; returns the set. |
| [SetIOr](#setior) | `scalar_action` | `SetIOr()` | In-place union: left \|= right. Mutates the set; returns the set. |
| [SetISub](#setisub) | `scalar_action` | `SetISub()` | In-place difference: left -= right. Mutates the set; returns the set. |
| [SetIXor](#setixor) | `scalar_action` | `SetIXor()` | In-place symmetric difference: left ^= right. Mutates the set; returns the set. |
| [SetOr](#setor) | `scalar_query` | `SetOr()` | Set union operator: left \| right. Returns a new set. |
| [SetPop](#setpop) | `scalar_action` | `SetPop()` | Pop arbitrary element: s.pop(). Mutates the set; returns the element. |
| [SetSub](#setsub) | `scalar_query` | `SetSub()` | Set difference operator: left - right. Returns a new set. |
| [SetUpdate](#setupdate) | `scalar_command` | `SetUpdate()` | Update set with elements from other: s.update(other). Mutates the set; returns nothing. |
| [SetXor](#setxor) | `scalar_query` | `SetXor()` | Set symmetric difference operator: left ^ right. Returns a new set. |
| [SymmetricDifference](#symmetricdifference) | `scalar_query` | `SymmetricDifference()` | Set symmetric difference: left.symmetric_difference(right). Returns a new set. |
| [SymmetricDifferenceUpdate](#symmetricdifferenceupdate) | `scalar_command` | `SymmetricDifferenceUpdate()` | Keep elements in either but not both: s.symmetric_difference_update(other). |
| [Union](#union) | `scalar_query` | `Union()` | Set union: left.union(right). Returns a new set. |

## AddCmd

Add element to set: s.add(value). Mutates the set; returns nothing.

```python
AddCmd()
```

Path `nu.forms.collections.abc.AddCmd`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

## Difference

Set difference: left.difference(right). Returns a new set.

```python
Difference()
```

Path `nu.forms.collections.abc.Difference`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## DifferenceUpdate

Remove elements found in other: s.difference_update(other). Mutates the set; returns nothing.

```python
DifferenceUpdate()
```

Path `nu.forms.collections.abc.DifferenceUpdate`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

## Discard

Discard element from set: s.discard(value). Mutates the set; returns nothing.

```python
Discard()
```

Path `nu.forms.collections.abc.Discard`. Kind `Command`, sort `scalar_command`, cardinality `void`.

No error if the element is absent (Python parity).

Undocumented: yields, example.

## Intersection

Set intersection: left.intersection(right). Returns a new set.

```python
Intersection()
```

Path `nu.forms.collections.abc.Intersection`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## IntersectionUpdate

Keep only elements found in both: s.intersection_update(other).

```python
IntersectionUpdate()
```

Path `nu.forms.collections.abc.IntersectionUpdate`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Mutates the set; returns nothing.

Undocumented: yields, example.

## IsDisjoint

Test if disjoint: left.isdisjoint(right). Returns a bool.

```python
IsDisjoint()
```

Path `nu.forms.collections.abc.IsDisjoint`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## IsSubset

Test if subset: left <= right. Returns a bool.

```python
IsSubset()
```

Path `nu.forms.collections.abc.IsSubset`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## IsSuperset

Test if superset: left >= right. Returns a bool.

```python
IsSuperset()
```

Path `nu.forms.collections.abc.IsSuperset`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## Remove

Remove element from set: s.remove(value). Mutates the set; returns nothing.

```python
Remove()
```

Path `nu.forms.collections.abc.Remove`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Raises KeyError if the element is absent (Python parity).

Undocumented: yields, example.

## SetAnd

Set intersection operator: left & right. Returns a new set.

```python
SetAnd()
```

Path `nu.forms.collections.abc.SetAnd`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## SetIAnd

In-place intersection: left &= right. Mutates the set; returns the set.

```python
SetIAnd()
```

Path `nu.forms.collections.abc.SetIAnd`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`.

Undocumented: yields, example.

## SetIOr

In-place union: left |= right. Mutates the set; returns the set.

```python
SetIOr()
```

Path `nu.forms.collections.abc.SetIOr`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`.

Undocumented: yields, example.

## SetISub

In-place difference: left -= right. Mutates the set; returns the set.

```python
SetISub()
```

Path `nu.forms.collections.abc.SetISub`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`.

Undocumented: yields, example.

## SetIXor

In-place symmetric difference: left ^= right. Mutates the set; returns the set.

```python
SetIXor()
```

Path `nu.forms.collections.abc.SetIXor`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`.

Undocumented: yields, example.

## SetOr

Set union operator: left | right. Returns a new set.

```python
SetOr()
```

Path `nu.forms.collections.abc.SetOr`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## SetPop

Pop arbitrary element: s.pop(). Mutates the set; returns the element.

```python
SetPop()
```

Path `nu.forms.collections.abc.SetPop`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`.

Returns INVALID if the set is empty (Python raises KeyError).

Undocumented: yields, example.

## SetSub

Set difference operator: left - right. Returns a new set.

```python
SetSub()
```

Path `nu.forms.collections.abc.SetSub`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## SetUpdate

Update set with elements from other: s.update(other). Mutates the set; returns nothing.

```python
SetUpdate()
```

Path `nu.forms.collections.abc.SetUpdate`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

## SetXor

Set symmetric difference operator: left ^ right. Returns a new set.

```python
SetXor()
```

Path `nu.forms.collections.abc.SetXor`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## SymmetricDifference

Set symmetric difference: left.symmetric_difference(right). Returns a new set.

```python
SymmetricDifference()
```

Path `nu.forms.collections.abc.SymmetricDifference`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## SymmetricDifferenceUpdate

Keep elements in either but not both: s.symmetric_difference_update(other).

```python
SymmetricDifferenceUpdate()
```

Path `nu.forms.collections.abc.SymmetricDifferenceUpdate`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Mutates the set; returns nothing.

Undocumented: yields, example.

## Union

Set union: left.union(right). Returns a new set.

```python
Union()
```

Path `nu.forms.collections.abc.Union`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

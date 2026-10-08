---
title: sequence_interactions
description: "Sequence interactions."
---

Module `nu.forms.collections.abc.sequence_interactions`.

Sequence interactions.

Reads (Query): First, Last, IndexOf, Count, Copy
Mutators returning nothing (Command): Append, Extend, Insert,
    RemoveValue, Reverse, Sort, SetIndex, DelIndex
Mutators returning a value (Action): Pop, IAdd, IMul

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Append](#append) | `scalar_command` | `Append()` | Append item to end: seq.append(value). Mutates slot 0; returns nothing. |
| [Count](#count) | `scalar_query` | `Count()` | Count occurrences: seq.count(value). |
| [DelIndex](#delindex) | `scalar_command` | `DelIndex()` | Subscript delete: del seq[index]. Mutates slot 0; returns nothing. |
| [Extend](#extend) | `scalar_command` | `Extend()` | Extend sequence with iterable: seq.extend(other). Mutates slot 0; returns nothing. |
| [First](#first) | `scalar_query` | `First()` | First element: seq[0]. Returns Invalid if empty. |
| [IAdd](#iadd) | `scalar_action` | `IAdd()` | In-place concat: seq += other. Mutates slot 0 and returns it (Python __iadd__). |
| [IMul](#imul) | `scalar_action` | `IMul()` | In-place repeat: seq *= n. Mutates slot 0 and returns it (Python __imul__). |
| [IndexOf](#indexof) | `scalar_query` | `IndexOf()` | Find index of value: seq.index(value). Returns Invalid if not found. |
| [Insert](#insert) | `scalar_command` | `Insert()` | Insert item at index: seq.insert(index, value). Mutates slot 0; returns nothing. |
| [Last](#last) | `scalar_query` | `Last()` | Last element: seq[-1]. Returns Invalid if empty. |
| [Pop](#pop) | `scalar_action` | `Pop()` | Pop item at index: seq.pop(index). Mutates slot 0 and returns the popped value. |
| [RemoveValue](#removevalue) | `scalar_command` | `RemoveValue()` | Remove first occurrence of value: seq.remove(value). Mutates slot 0; returns nothing. |
| [Reverse](#reverse) | `scalar_command` | `Reverse()` | Reverse sequence in-place: seq.reverse(). Mutates slot 0; returns nothing. |
| [SetIndex](#setindex) | `scalar_command` | `SetIndex()` | Subscript write: seq[index] = value. Mutates slot 0; returns nothing. |
| [Sort](#sort) | `scalar_command` | `Sort()` | Sort sequence in-place: list.sort(). Mutates slot 0; returns nothing. |

## Append

Append item to end: seq.append(value). Mutates slot 0; returns nothing.

```python
Append()
```

Path `nu.forms.collections.abc.Append`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

## Count

Count occurrences: seq.count(value).

```python
Count()
```

Path `nu.forms.collections.abc.Count`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## DelIndex

Subscript delete: del seq[index]. Mutates slot 0; returns nothing.

```python
DelIndex()
```

Path `nu.forms.collections.abc.DelIndex`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

## Extend

Extend sequence with iterable: seq.extend(other). Mutates slot 0; returns nothing.

```python
Extend()
```

Path `nu.forms.collections.abc.Extend`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

## First

First element: seq[0]. Returns Invalid if empty.

```python
First()
```

Path `nu.forms.collections.abc.First`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## IAdd

In-place concat: seq += other. Mutates slot 0 and returns it (Python __iadd__).

```python
IAdd()
```

Path `nu.forms.collections.abc.IAdd`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`.

Undocumented: yields, example.

## IMul

In-place repeat: seq *= n. Mutates slot 0 and returns it (Python __imul__).

```python
IMul()
```

Path `nu.forms.collections.abc.IMul`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`.

Undocumented: yields, example.

## IndexOf

Find index of value: seq.index(value). Returns Invalid if not found.

```python
IndexOf()
```

Path `nu.forms.collections.abc.IndexOf`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## Insert

Insert item at index: seq.insert(index, value). Mutates slot 0; returns nothing.

```python
Insert()
```

Path `nu.forms.collections.abc.Insert`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

## Last

Last element: seq[-1]. Returns Invalid if empty.

```python
Last()
```

Path `nu.forms.collections.abc.Last`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## Pop

Pop item at index: seq.pop(index). Mutates slot 0 and returns the popped value.

```python
Pop()
```

Path `nu.forms.collections.abc.Pop`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`.

Default index is -1 (last item).

Undocumented: yields, example.

## RemoveValue

Remove first occurrence of value: seq.remove(value). Mutates slot 0; returns nothing.

```python
RemoveValue()
```

Path `nu.forms.collections.abc.RemoveValue`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

## Reverse

Reverse sequence in-place: seq.reverse(). Mutates slot 0; returns nothing.

```python
Reverse()
```

Path `nu.forms.collections.abc.Reverse`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

## SetIndex

Subscript write: seq[index] = value. Mutates slot 0; returns nothing.

```python
SetIndex()
```

Path `nu.forms.collections.abc.SetIndex`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

## Sort

Sort sequence in-place: list.sort(). Mutates slot 0; returns nothing.

```python
Sort()
```

Path `nu.forms.collections.abc.Sort`. Kind `Command`, sort `scalar_command`, cardinality `void`.

No-key variant only (key= injection is deferred).

Undocumented: yields, example.

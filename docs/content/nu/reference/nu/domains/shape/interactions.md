---
title: interactions
description: "Shape fabric queries and commands: all shape interactions in one place."
---

Module `nu.domains.shape.interactions`.

Shape fabric queries and commands: all shape interactions in one place.

Read queries (polymorphic on Ref class):
- `Load`: yield the value at the slot-0 Ref (EMPTY if absent).
- `Exists`: True if the slot-0 Ref's address is bound.
- `Missing`: True if the slot-0 Ref's address is unbound.
- `Extract`: materialise the full subtree rooted at the Ref.
- `AdvanceCursor`: read the next key after the cursor on an ordered view.

Write commands (polymorphic on Ref class):
- `SetCmd`: write the slot-1 value to the slot-0 Ref's address.
- `Erase`: remove the slot-0 Ref from its fabric.

The substrate optimizer matches on the concrete Ref class.

Reactive queries (`OnChange`, `OnChildChange`,
`OnChildrenChange`, `OnDescendantsChange`,
`OnPrimitiveChange`) live in `nu.core.reactive`: one unified
interface for all substrates, reached through the shape Form mixins.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AdvanceCursor](#advancecursor) | `scalar_query` | `AdvanceCursor()` | Read the next key after the cursor on an ordered view. |
| [Erase](#erase) | `scalar_command` | `Erase()` | Remove the slot-0 structured Ref from its fabric. |
| [Exists](#exists) | `scalar_query` | `Exists()` | Yield True if the slot-0 Ref's address is bound (value is not a sentinel). |
| [Extract](#extract) | `scalar_query` | `Extract()` | Materialise the full subtree at the slot-0 Ref via `view.extract()`. |
| [Load](#load) | `scalar_query` | `Load()` | Yield the value at the slot-0 Ref; EMPTY if the address is unbound. |
| [Missing](#missing) | `scalar_query` | `Missing()` | Yield True if the slot-0 Ref's address is unbound (value is a sentinel). |
| [PrimitiveSet](#primitiveset) | `scalar_command` | `PrimitiveSet()` | Write the slot-1 value to the slot-0 Ref via `_primitive_write`. |
| [SetCmd](#setcmd) | `scalar_command` | `SetCmd()` | Write the slot-1 value to the slot-0 structured Ref's address. |

## AdvanceCursor

Read the next key after the cursor on an ordered view.

```python
AdvanceCursor()
```

Path `nu.domains.shape.AdvanceCursor`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Children: `[source_ref, cursor_ref]`. Calls `view.next_key_after(cursor)`
on the ordered view yielded by slot 0. A `None` or absent cursor starts
from the beginning. Returns `(log_key, actual_key)` or `None` if exhausted.

Undocumented: yields, example.

## Erase

Remove the slot-0 structured Ref from its fabric.

```python
Erase()
```

Path `nu.domains.shape.Erase`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

## Exists

Yield True if the slot-0 Ref's address is bound (value is not a sentinel).

```python
Exists()
```

Path `nu.domains.shape.Exists`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## Extract

Materialise the full subtree at the slot-0 Ref via `view.extract()`.

```python
Extract()
```

Path `nu.domains.shape.Extract`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Distinct from `Load`: Load yields the value at the Ref's
address; Extract recursively materialises the subtree into a plain
Python value (dict / list / nested mix). The view may be lazy; `.eager`
is unwrapped when present, matching `CollectionExtract` mechanics.

Undocumented: yields, example.

## Load

Yield the value at the slot-0 Ref; EMPTY if the address is unbound.

```python
Load()
```

Path `nu.domains.shape.Load`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## Missing

Yield True if the slot-0 Ref's address is unbound (value is a sentinel).

```python
Missing()
```

Path `nu.domains.shape.Missing`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Undocumented: yields, example.

## PrimitiveSet

Write the slot-1 value to the slot-0 Ref via `_primitive_write`.

```python
PrimitiveSet()
```

Path `nu.domains.shape.PrimitiveSet`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Bypasses the compound-value decomposition of `SetCmd` (which
recurses into containers).  Use for Refs that store compound values as a
single opaque blob (e.g. `PrimitiveDictRef`, `PrimitiveListRef`,
`PrimitiveSetRef` substrates).

Raises `ValueError` when the value slot evaluates to a sentinel,
matching `ItemPrimitiveSetCmd` mechanics.

Requires the parent view to support `_primitive_write` /
`_aprimitive_write` (the abstract hook declared on `StructuredRef`).

Undocumented: yields, example.

## SetCmd

Write the slot-1 value to the slot-0 structured Ref's address.

```python
SetCmd()
```

Path `nu.domains.shape.SetCmd`. Kind `Command`, sort `scalar_command`, cardinality `void`.

Undocumented: yields, example.

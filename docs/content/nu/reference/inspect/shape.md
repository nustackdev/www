---
title: shape
description: "The shape kind: record, parse, verify."
---

Module `nu.inspect.shape`.

The shape kind: record, parse, verify.

A Shape is a declared structure: a class of slots, never instantiated, whose
attribute access hands out Refs. It is the one kind nu does not export. Every
Shape belongs to whoever wrote the app, which is exactly why it is here: an
agent handed a bound app has to ask what this Shape is before it can write a
line of Nu against it.

The record is prose plus a flat list of entries, one per slot, and stops
there. `entry.parse_entry` is the next step down. See `nu.inspect.entry`
for why the descent is not a tree.


#### The docstring contract for a Shape

The rule is the same one the format is built on - write only the facts that
cannot be read off the code - and this is the first kind where it *removes* a
requirement instead of adding one.

- **Slots are not written.** Every slot is on `_slots`: its name, its ref
  class, its declared type, its config. A docstring that lists them is
  duplicating derivable data, and the duplicate is the copy that goes stale.
  This is the inverse of an interaction, where Args is required precisely
  because a variadic constructor puts the arity nowhere else.
- **Args is a violation.** A Shape is never called and never instantiated, so
  an Args section is not a wording mistake, it is a claim about a call that
  does not exist.
- **Yields is a violation**, for the same reason: a Shape is not a term and
  does not evaluate. What a *slot* yields belongs to that slot's ref class.
- Summary, description and notes are the whole writable surface. Notes is
  where a Shape earns its docstring: which fabric it is meant to be bound
  under, which slots are written by whom, what invariant holds across slots.
  None of that is on `_slots`.
- Example is allowed but rarely doctestable, since a Shape needs a live
  context to do anything; a plain snippet is fine.

| Name | Call | Meaning |
| --- | --- | --- |
| [catalogue_shapes](#catalogue_shapes) | `inspect.catalogue_shapes(module)` | A ShapeRecord per Shape the module declares, in export order. |
| [parse_shape](#parse_shape) | `inspect.parse_shape(cls, path='', aliases=())` | One ShapeRecord for `cls`. Slots are listed, not expanded. |
| [verify_shape](#verify_shape) | `inspect.verify_shape(cls)` | Every way `cls` lies about the format. |

## catalogue_shapes

A ShapeRecord per Shape the module declares, in export order.

```python
inspect.catalogue_shapes(module)
```

Path `nu.inspect.catalogue_shapes`. Defined on `nu.inspect.shape`, bound as a function. Builds `tuple[ShapeRecord, ...]`.

A Shape is declared, not exported by nu, so this is not the entry point
the other kinds' catalogues are - `parse_shape` is. It exists for the
one question that comes before any of it: an agent pointed at an app
module asking what is in here.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `module` | `ModuleType` |  |  |

Undocumented: example.

## parse_shape

One ShapeRecord for `cls`. Slots are listed, not expanded.

```python
inspect.parse_shape(cls, path='', aliases=())
```

Path `nu.inspect.parse_shape`. Defined on `nu.inspect.shape`, bound as a function. Builds `ShapeRecord`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cls` | `type` |  |  |
| `path` | `str` | `''` |  |
| `aliases` | `tuple[str, ...]` | `()` |  |

Undocumented: example.

## verify_shape

Every way `cls` lies about the format.

```python
inspect.verify_shape(cls)
```

Path `nu.inspect.verify_shape`. Defined on `nu.inspect.shape`, bound as a function. Builds `list[Violation]`.

Adds the two removals to the shared laws: a declarative class that is
never called cannot honestly carry Args or Yields. That slots must not be
enumerated in prose is the other half of the contract and is deliberately
not checked - a note about one slot is often the only place a real
invariant is written, and this runs over the whole stack, where a false
positive sends someone to rewrite a docstring that was right.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cls` | `type` |  |  |

Undocumented: example.

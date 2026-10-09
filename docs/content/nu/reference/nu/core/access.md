---
title: access
description: "Access atoms: Python's item and attribute management."
---

Module `nu.core.access`.

Access atoms: Python's item and attribute management.

Maps Python's member-access builtins and operators onto Nu - getting, setting,
and deleting an item or attribute of a plain Python value. Every atom here is a
`ScalarQuery`: a read yields the member, a write/delete mutates the value
in-place and yields it back. This is local Python mutation off a value, not a
fabric write - writing into a Ref's fabric location is the fabric's own
interaction (`context.Set` / `context.Delete` and the like), which lives in
the fabric dirs, never here. `core` is the pure Python builtins.

Builtins / operators to cover (Python -> Nu):
- items (read): `x[k]` -> `GetItem`, `len` -> `Len`,
  `in` -> `Contains`, `slice` / `x[a:b]` -> `Slice`
- items (write): `x[k] = v` -> `SetItem`, `del x[k]` -> `DelItem`
- attrs (read): `getattr` -> `GetAttr`, `hasattr` -> `HasAttr`
- attrs (write): `setattr` -> `SetAttr`, `delattr` -> `DelAttr`

Every atom is EVALUABLE: each defines `compile` (sync hot path) and
`acompile` (async hot path) returning a thunk that computes from its child
values, with inlined EMPTY / INVALID sentinel propagation (mirroring
`nu.core.arithmetic`). The writes apply Python's `x[k]=v` / `setattr` /
`del` to the object value and return that object so they compose. If a
remove-and-return variant is wanted (pop-style), that is an Action - note it,
but the builtins here are plain get/set/del.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Contains](#contains) | `scalar_query` | `Contains(container, item)` | Containment: `item in container`. |
| [DelAttr](#delattr) | `scalar_command` | `DelAttr(obj, name)` | Attribute delete: `delattr(obj, name)`. |
| [DelItem](#delitem) | `scalar_command` | `DelItem(target, key)` | Subscript delete: `del x[k]`. |
| [GetAttr](#getattr) | `scalar_query` | `GetAttr(obj, name, default)` | Attribute read: `getattr(obj, name[, default])`. |
| [GetItem](#getitem) | `scalar_query` | `GetItem(target, key)` | Subscript access: `x[k]`. |
| [HasAttr](#hasattr) | `scalar_query` | `HasAttr(obj, name)` | Attribute presence: `hasattr(obj, name)`. |
| [Len](#len) | `scalar_query` | `Len(value)` | Length: `len(x)` of its one child. |
| [SetAttr](#setattr) | `scalar_command` | `SetAttr(obj, name, value)` | Attribute write: `setattr(obj, name, value)`. |
| [SetItem](#setitem) | `scalar_command` | `SetItem(target, key, value)` | Subscript write: `x[k] = v`. |
| [Slice](#slice) | `scalar_query` | `Slice(start, stop, step)` | The `slice(...)` builtin: builds a slice object. |

## Contains

Containment: `item in container`.

```python
Contains(container, item)
```

Path `nu.core.Contains`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `container` |  |  | the object to search. |
| `item` |  |  | the value to look for. |

**Yields**

True or False. INVALID when either child is EMPTY or INVALID.

**Example**

```python
nu.run(nu.Contains(nu.Literal([1, 2, 3]), nu.Literal(9)))[0]
```

```
False
```

## DelAttr

Attribute delete: `delattr(obj, name)`.

```python
DelAttr(obj, name)
```

Path `nu.core.DelAttr`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `obj` |  |  | the object to mutate. Slot 0, so it must hold a Ref. |
| `name` |  |  | the attribute name to remove. |

**Yields**

Nothing.

**Notes**

- Mutates the object in place and yields nothing.
- A sentinel on either child bails out before mutating, the object is left untouched.
- A missing attribute raises Python's own `AttributeError`, it does not bail silently.

Undocumented: example.

## DelItem

Subscript delete: `del x[k]`.

```python
DelItem(target, key)
```

Path `nu.core.DelItem`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `target` |  |  | the container to mutate. Slot 0, so it must hold a Ref. |
| `key` |  |  | the index or key to remove. |

**Yields**

Nothing.

**Notes**

- Mutates the container in place and yields nothing.
- A sentinel on either child bails out before mutating, the container is left untouched.
- A missing key raises Python's own `KeyError` / `IndexError`, it does not bail silently.

Undocumented: example.

## GetAttr

Attribute read: `getattr(obj, name[, default])`.

```python
GetAttr(obj, name, default)
```

Path `nu.core.GetAttr`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 3 (3 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `obj` |  |  | the object to read from. |
| `name` |  |  | the attribute name. |
| `default` |  |  | value to return when the attribute is absent. Optional: leave the child out entirely to let a missing attribute raise. |

**Yields**

The attribute value. INVALID when `obj`, `name`, or (if given)
`default` is EMPTY or INVALID.

**Notes**

- Without a default child, a missing attribute raises Python's own `AttributeError`, it is not folded into EMPTY.

**Example**

```python
nu.run(nu.GetAttr(nu.Literal(1j), nu.Literal("imag")))[0]
```

```
1.0
```

## GetItem

Subscript access: `x[k]`.

```python
GetItem(target, key)
```

Path `nu.core.GetItem`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `target` |  |  | the object to index. |
| `key` |  |  | the index or key to look up. |

**Yields**

The member at that key. INVALID when either child is EMPTY or
INVALID.

**Notes**

- A missing key or out-of-range index raises Python's own `KeyError` / `IndexError`, it is not folded into EMPTY.

**Example**

```python
nu.run(nu.GetItem(nu.Literal([10, 20, 30]), nu.Literal(1)))[0]
```

```
20
```

## HasAttr

Attribute presence: `hasattr(obj, name)`.

```python
HasAttr(obj, name)
```

Path `nu.core.HasAttr`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `obj` |  |  | the object to check. |
| `name` |  |  | the attribute name. |

**Yields**

True or False. INVALID when either child is EMPTY or INVALID.

**Example**

```python
nu.run(nu.HasAttr(nu.Literal(1j), nu.Literal("imag")))[0]
```

```
True
```

## Len

Length: `len(x)` of its one child.

```python
Len(value)
```

Path `nu.core.Len`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the object to measure. |

**Yields**

The length. INVALID when the child is EMPTY or INVALID.

**Example**

```python
nu.run(nu.Len(nu.Literal("abcd")))[0]
```

```
4
```

## SetAttr

Attribute write: `setattr(obj, name, value)`.

```python
SetAttr(obj, name, value)
```

Path `nu.core.SetAttr`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 3 (3 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `obj` |  |  | the object to mutate. Slot 0, so it must hold a Ref. |
| `name` |  |  | the attribute name. |
| `value` |  |  | the value to store. |

**Yields**

Nothing.

**Notes**

- Mutates the object in place and yields nothing, matching Python's `setattr`.
- A sentinel on any child bails out before mutating, the object is left untouched.

Undocumented: example.

## SetItem

Subscript write: `x[k] = v`.

```python
SetItem(target, key, value)
```

Path `nu.core.SetItem`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 3 (3 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `target` |  |  | the container to mutate. Slot 0, so it must hold a Ref. |
| `key` |  |  | the index or key to write to. |
| `value` |  |  | the value to store. |

**Yields**

Nothing.

**Notes**

- Mutates the container in place and yields nothing, matching Python's `x[k] = v`.
- A sentinel on any child bails out before mutating, the container is left untouched.

Undocumented: example.

## Slice

The `slice(...)` builtin: builds a slice object.

```python
Slice(start, stop, step)
```

Path `nu.core.Slice`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 3 (3 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `start` |  |  | the start index, or None for the beginning. |
| `stop` |  |  | the stop index, or None for the end. |
| `step` |  |  | the step, or None for 1. |

**Yields**

A `slice` object. INVALID when any child is EMPTY or INVALID.

**Example**

```python
nu.run(nu.Slice(nu.Literal(1), nu.Literal(3), nu.Literal(None)))[0]
```

```
slice(1, 3, None)
```

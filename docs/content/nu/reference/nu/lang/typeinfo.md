---
title: typeinfo
description: "Recursive type info for shape slots."
---

Module `nu.lang.typeinfo`.

Recursive type info for shape slots.

`TypeInfo` is the runtime carrier for an annotation-derived type. Refs stash
it on their payload; wrappers read it to pick the child ref/form on subscript
or attribute descent.

A Shape slot annotation is one of:

- **Bare ref class** (`nm.StrRef`, `nd.HeadingRef`): a `Ref` subclass
  with no generic parameters. Represented as `TypeInfo(<ref_cls>)`.
- **Parametric ref class** (`nv.PrimitiveListRef[str]`,
  `nm.ShapesDictRef[int, Order]`): a `Ref` subclass with generic params.
  Represented as `TypeInfo(<ref_origin>, key=..., elem=...)` where key/elem
  recurse.
- **Bare Shape subclass** (`Order`): a shorthand for a `ShapeRef`
  navigating that shape. Represented as `TypeInfo(<shape_cls>)`.
- **Python primitive** (`str`, `int`, ...): only appears as an inner
  type arg of a `Primitive*Ref` (blob-stored collection). Represented as
  `TypeInfo(<primitive_cls>)`.
- **`Any`**: the fallback (non-trivial union, unresolvable forward ref,
  unknown type).

- `TypeInfo.from_annotation(ann, hints)` normalizes any annotation into a
  recursive `TypeInfo`: resolves `T | None` to `T`, folds non-trivial
  unions to `Any`, recognises Ref subclasses (bare + parametric), Shape
  subclasses, primitives, native container generics, and
  `ForwardRef` / string annotations via `hints`.
- `TypeInfo.to_form(tier=None)` dispatches `py_type` to a concrete
  `Form` class, meaningful at primitive-leaf yield positions. Ref-typed
  or Shape-typed levels are handled by the wrapper directly (it descends
  into the ref/shape instead of yielding a value-Form). `Any` is the
  fallback.

| Name | Call | Meaning |
| --- | --- | --- |
| [value_type_for](#value_type_for) | `lang.value_type_for(python_type)` | Map a Python primitive type to its `Form` class (`Any` fallback). |

## value_type_for

Map a Python primitive type to its `Form` class (`Any` fallback).

```python
lang.value_type_for(python_type)
```

Path `nu.lang.value_type_for`. Defined on `nu.lang.typeinfo`, bound as a function. Builds `type[Form]`.

Convenience wrapper over `_form_for`: the sole dispatch source of truth.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `python_type` | `object` |  |  |

Undocumented: example.

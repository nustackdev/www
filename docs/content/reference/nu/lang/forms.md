---
title: forms
description: "Form and TypedNu - the type-wrapping layer."
---

Module `nu.lang.forms`.

Form and TypedNu - the type-wrapping layer.

`Form` is a mixin that contributes shared helpers (sentinel checks) to typed
interfaces. The collection ABCs (`MappingForm`, `SequenceForm`, ...) and the
primitive leaves (`Int`, `Str`, ...) inherit `Form` to get them.

`TypedNu[T]` is a transparent `ScalarQuery` passthrough: it wraps a single
Nu child (any non-Term child is auto-wrapped as a `Literal` by `Nu`) and
yields the child's value unchanged. Operand recursion lives in the child thunk;
`TypedNu` just forwards. Leaf interfaces inherit both `Form` and `TypedNu`
so they participate as Nu tree nodes:

```python
Int(Add(a, b)) + 1  ->  Add(Int(Add(a, b)), Literal(1))
```

Hierarchy:

```python
Form                                    mixin (sentinel checks)
TypedNu[T]                              ScalarQuery passthrough
Int(Form, TypedNu[int])            primitive leaf
Dict(MutableMappingForm, TypedNu[dict])   collection leaf
```

The sentinel-check helpers and `Bool` they return live in `nu.forms`;
`Form` reaches them with a lazy import so this module keeps no import-time
dependency on the forms package (it would be a cycle: forms imports `Form`).

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [TypedNu](#typednu) | `scalar_query` | `TypedNu()` | Transparent ScalarQuery passthrough carrying a python type tag `T`. |

## TypedNu

Transparent ScalarQuery passthrough carrying a python type tag `T`.

```python
TypedNu()
```

Path `nu.lang.TypedNu`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Wraps a single Nu child and yields its value unchanged - sentinels ride
through untouched. The type tag is for the fluent surface only; it has no
runtime effect.

Undocumented: yields, example.

---
title: context
description: "The Context fabric: the in-memory `ctx.attrs` and fabric bindings."
---

Module `nu.context`.

The Context fabric: the in-memory `ctx.attrs` and fabric bindings.

A Fabric is an addressable space where Refs live; it resolves Refs and carries
out the Interactions over them. The Context fabric has two axes:

- **attrs** - a flat, name-keyed store (`ctx.attrs`) for short-lived
  primitives (loop counters, accumulators, markers). Ref: `AttrRef`; writes:
  `SetCmd` / `Delete`; existence: `AttrExists`. The read
  is `AttrRef` itself.
- **fabric** - typed bindings (`ctx.bind` / `ctx.get`) for every other
  ctx-bound thing: execution resources, storage handles, cluster handles,
  compute actors. Ref: `FabricRef` (read-only, self-yields); existence:
  `FabricExists`. Provisioning brackets `Provide` / `ProvideList` /
  `ProvideDict` install fabrics into the Context for a body's duration.
  Protocols `Fabric` (empty marker; every ctx-bound thing satisfies it) and
  `FabricLifecycle(Fabric)` (with optional setup / cleanup) describe the
  contract.

The read on the attrs axis is the Ref's dual role; only existence needs an
explicit query. Other concrete fabrics (virtuals, mem, ray, ...) follow the
same shape in their own dirs: concrete Refs plus the interactions that touch
that fabric. Nothing in `nu.core` touches a fabric - core is the pure Python
builtins.

## attrs.interactions

Module `nu.context.attrs.interactions`.

Attr-fabric interactions: `SetCmd`, `Delete`, `AttrExists`, `Let`.

[Full entries](/docs/reference/nu/context/attrs-interactions)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AttrExists](/docs/reference/nu/context/attrs-interactions#attrexists) | `scalar_query` | `AttrExists(ref)` | Whether the address of its `AttrRef` is bound in `ctx.attrs`. |
| [Delete](/docs/reference/nu/context/attrs-interactions#delete) | `scalar_command` | `Delete(ref)` | Removes the slot its Ref names from the fabric, through that Ref. |
| [Let](/docs/reference/nu/context/attrs-interactions#let) | `bracket` | `Let(name, value, body=None)` | Binds a name to a value in `ctx.attrs` for the body's duration. |
| [SetCmd](/docs/reference/nu/context/attrs-interactions#setcmd) | `scalar_command` | `SetCmd(ref, value)` | Writes a value into the slot its Ref names, through that Ref. |

## fabric.queries

Module `nu.context.fabric.queries`.

Fabric existence query.

[Full entries](/docs/reference/nu/context/fabric-queries)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [FabricExists](/docs/reference/nu/context/fabric-queries#fabricexists) | `scalar_query` | `FabricExists(ref)` | Whether the fabric type of its `FabricRef` is bound on the Context. |

## fabric.lifecycle

Module `nu.context.fabric.lifecycle`.

`Provide` brackets: construct + bind fabrics for the body's duration.

[Full entries](/docs/reference/nu/context/fabric-lifecycle)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Provide](/docs/reference/nu/context/fabric-lifecycle#provide) | `bracket` | `Provide(cls, kwargs=None, body=None, tag=None, tags=(), predicate=None, bind_as=None)` | Constructs one fabric and binds it on the Context for the body's duration. |
| [ProvideDict](/docs/reference/nu/context/fabric-lifecycle#providedict) | `bracket` | `ProvideDict(cls, specs, body=None, extra_tags=(), predicate=None, bind_as=None, parallel=False)` | Constructs a fleet of one class and binds each member under its own key. |
| [ProvideList](/docs/reference/nu/context/fabric-lifecycle#providelist) | `bracket` | `ProvideList(cls, specs, body=None, base_tag=0, extra_tags=(), predicate=None, bind_as=None)` | Constructs a fleet of one class and binds each member under its index. |
| [With](/docs/reference/nu/context/fabric-lifecycle#with) | `bracket` | `With(body=None)` | Enters several lifecycle brackets around one body, tearing down in reverse. |

## attrs.refs

Module `nu.context.attrs.refs`.

`AttrRef` and its typed variants.

[Full entries](/docs/reference/nu/context/attrs-refs)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AnyAttrRef](/docs/reference/nu/context/attrs-refs#anyattrref) | `ref` | `AnyAttrRef()` | An AttrRef with the dynamic any interface. |
| [AttrRef](/docs/reference/nu/context/attrs-refs#attrref) | `ref` | `AttrRef(address)` | A Ref into the `ctx.attrs` store, keyed by its resolved address. |
| [BoolAttrRef](/docs/reference/nu/context/attrs-refs#boolattrref) | `ref` | `BoolAttrRef()` | An AttrRef with the full boolean interface. |
| [BytesAttrRef](/docs/reference/nu/context/attrs-refs#bytesattrref) | `ref` | `BytesAttrRef()` | An AttrRef with the full bytes interface. |
| [DictAttrRef](/docs/reference/nu/context/attrs-refs#dictattrref) | `ref` | `DictAttrRef()` | An AttrRef with the full dict interface. |
| [FloatAttrRef](/docs/reference/nu/context/attrs-refs#floatattrref) | `ref` | `FloatAttrRef()` | An AttrRef with the full float interface. |
| [FrozenSetAttrRef](/docs/reference/nu/context/attrs-refs#frozensetattrref) | `ref` | `FrozenSetAttrRef()` | An AttrRef with the full frozenset interface. |
| [IntAttrRef](/docs/reference/nu/context/attrs-refs#intattrref) | `ref` | `IntAttrRef()` | An AttrRef with the full integer interface. |
| [ListAttrRef](/docs/reference/nu/context/attrs-refs#listattrref) | `ref` | `ListAttrRef()` | An AttrRef with the full list interface. |
| [NoneAttrRef](/docs/reference/nu/context/attrs-refs#noneattrref) | `ref` | `NoneAttrRef(source=None)` | An AttrRef with the none interface. |
| [SetAttrRef](/docs/reference/nu/context/attrs-refs#setattrref) | `ref` | `SetAttrRef()` | An AttrRef with the full set interface. |
| [StrAttrRef](/docs/reference/nu/context/attrs-refs#strattrref) | `ref` | `StrAttrRef()` | An AttrRef with the full string interface. |
| [TupleAttrRef](/docs/reference/nu/context/attrs-refs#tupleattrref) | `ref` | `TupleAttrRef()` | An AttrRef with the full tuple interface. |

## fabric.refs

Module `nu.context.fabric.refs`.

`FabricRef`: a Ref into a Context binding.

[Full entries](/docs/reference/nu/context/fabric-refs)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [FabricRef](/docs/reference/nu/context/fabric-refs#fabricref) | `ref` | `FabricRef(address=None)` | A Ref into a Context binding, keyed by the fabric type it resolves to. |

---
title: context
description: "The Context fabric: the in-memory `ctx.attrs` and fabric bindings."
---

Module `nu.context`.

The Context fabric: the in-memory `ctx.attrs` and fabric bindings.

A Fabric is an addressable space where Refs live; it resolves Refs and carries
out the Interactions over them. The Context fabric has two axes:

- **attrs** - the channel an interaction uses to hand its internal values
  to its body (`ctx.attrs`): a loop its item, a catch the error. Only
  interactions bind it; the tree reads it with `Attr(name)` and asks
  `Attr(name).exists()` (a `Bool` over `AttrExists`). It is never a store: state goes through a fabric.
- **fabric** - typed bindings (`ctx.bind` / `ctx.get`) for every other
  ctx-bound thing: execution resources, storage handles, cluster handles,
  compute actors. Ref: `FabricRef` (read-only, self-yields); existence:
  `.exists()`, a `Bool` over `FabricExists`. Provisioning brackets
  `Provide` / `ProvideList` / `ProvideDict` install fabrics into the
  Context for a body's duration.
  Protocols `Fabric` (empty marker; every ctx-bound thing satisfies it) and
  `FabricLifecycle(Fabric)` (with optional setup / cleanup) describe the
  contract.

The read on the attrs axis is the Ref's dual role; only existence needs an
explicit query. Other concrete fabrics (`nu.mem` in the kernel, the rest in
`nustd`) follow the same shape in their own dirs: concrete Refs plus the
interactions that touch that fabric. Nothing in `nu.core` touches a fabric -
core is the pure Python builtins.

## attrs.interactions

Module `nu.context.attrs.interactions`.

Attrs interactions: `AttrExists`.

[Full entries](/docs/nu/reference/context/attrs-interactions)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AttrExists](/docs/nu/reference/context/attrs-interactions#attrexists) | `scalar_query` | `AttrExists(ref)` | Whether the name its attrs ref names is bound in `ctx.attrs`. |

## fabric.queries

Module `nu.context.fabric.queries`.

Fabric existence query.

[Full entries](/docs/nu/reference/context/fabric-queries)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [FabricExists](/docs/nu/reference/context/fabric-queries#fabricexists) | `scalar_query` | `FabricExists(ref)` | Whether the fabric type of its `FabricRef` is bound on the Context. |

## fabric.lifecycle

Module `nu.context.fabric.lifecycle`.

`Provide` brackets: construct + bind fabrics for the body's duration.

[Full entries](/docs/nu/reference/context/fabric-lifecycle)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Provide](/docs/nu/reference/context/fabric-lifecycle#provide) | `bracket` | `Provide(cls, kwargs=None, body=None, tag=None, tags=(), predicate=None, bind_as=None)` | Constructs one fabric and binds it on the Context for the body's duration. |
| [ProvideDict](/docs/nu/reference/context/fabric-lifecycle#providedict) | `bracket` | `ProvideDict(cls, specs, body=None, extra_tags=(), predicate=None, bind_as=None, parallel=False)` | Constructs a fleet of one class and binds each member under its own key. |
| [ProvideList](/docs/nu/reference/context/fabric-lifecycle#providelist) | `bracket` | `ProvideList(cls, specs, body=None, base_tag=0, extra_tags=(), predicate=None, bind_as=None)` | Constructs a fleet of one class and binds each member under its index. |
| [With](/docs/nu/reference/context/fabric-lifecycle#with) | `bracket` | `With(body=None)` | Enters several lifecycle brackets around one body, tearing down in reverse. |

## attrs.refs

Module `nu.context.attrs.refs`.

`Attr`: the tree's one read of `ctx.attrs`.

[Full entries](/docs/nu/reference/context/attrs-refs)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Attr](/docs/nu/reference/context/attrs-refs#attr) | `ref` | `Attr(address)` | Reads the value an interaction handed its body under a name. |

## fabric.refs

Module `nu.context.fabric.refs`.

`FabricRef`: a Ref into a Context binding.

[Full entries](/docs/nu/reference/context/fabric-refs)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [FabricRef](/docs/nu/reference/context/fabric-refs#fabricref) | `ref` | `FabricRef(address=None)` | A Ref into a Context binding, keyed by the fabric type it resolves to. |

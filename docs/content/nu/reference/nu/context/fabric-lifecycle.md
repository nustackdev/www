---
title: fabric.lifecycle
description: "`Provide` brackets: construct + bind fabrics for the body's duration."
---

Module `nu.context.fabric.lifecycle`.

`Provide` brackets: construct + bind fabrics for the body's duration.

The tree carries a *class* plus a *spec* (kwargs, list of kwargs, or dict of
kwargs). On entry each bracket constructs its fabric(s), runs setup, binds on
ctx. On exit teardown fires in reverse (LIFO), so an outer fabric is still
live while inner ones tear down.

Three primitives, one per attach shape:

    Provide(cls, kwargs, body, *, tag=None, tags=(), predicate=None)
        # bind ONE instance keyed by (cls, *tags)

    ProvideList(cls, [kwargs_a, kwargs_b, ...], body,
                *, base_tag=0, extra_tags=(), predicate=None)
        # bind N instances at (cls, base_tag+0, *extra_tags), ...

    ProvideDict(cls, {"k1": kwargs_a, ...}, body,
                *, extra_tags=(), predicate=None)
        # bind N instances at (cls, "k1", *extra_tags), ...

Tag knobs (all optional, they compose):

- `tag=` on `Provide` is sugar for a single-tag `tags=(tag,)`.
- `tags=` binds under an unordered set of tags; `ctx.get(cls, t)` matches
  when `t` is a subset of the bound set (specificity fallback).
- `predicate=` is a single guard callable forwarded into Context's guarded
  registry: `ctx.get(cls, *tags, **data)` resolves this binding only when
  `predicate(**data)` returns True. Useful for "bind a Navigator whose
  shard covers this address" without pre-computing all shard tags.

The ecosystem is open: `ProvideSharded`, `ProvideRoundRobin`,
`ProvideReplicated`, `ProvideLazy`, etc. all follow the same shape - each
is a Bracket subclass; the engine sees them as regular lifecycle spans.

Both sync and async runs are supported natively via the two open methods
(`_open` and `_aopen`). Under the async runtime the bracket prefers
`asetup` / `acleanup` if the fabric defines them, and falls back to
`setup` / `cleanup` otherwise. Under the sync runtime, only sync methods
run - an async-only fabric fails at setup with a clear error.

`FabricLifecycle` protocol (all methods optional, checked with `hasattr`):

    def setup(self, ctx): ...        # sync run, or async fallback
    def cleanup(self): ...
    async def asetup(self, ctx): ... # async run (preferred)
    async def acleanup(self): ...

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Provide](#provide) | `bracket` | `Provide(cls, kwargs=None, body=None, tag=None, tags=(), predicate=None, bind_as=None)` | Constructs one fabric and binds it on the Context for the body's duration. |
| [ProvideDict](#providedict) | `bracket` | `ProvideDict(cls, specs, body=None, extra_tags=(), predicate=None, bind_as=None, parallel=False)` | Constructs a fleet of one class and binds each member under its own key. |
| [ProvideList](#providelist) | `bracket` | `ProvideList(cls, specs, body=None, base_tag=0, extra_tags=(), predicate=None, bind_as=None)` | Constructs a fleet of one class and binds each member under its index. |
| [With](#with) | `bracket` | `With(body=None)` | Enters several lifecycle brackets around one body, tearing down in reverse. |

## Provide

Constructs one fabric and binds it on the Context for the body's duration.

```python
Provide(cls, kwargs=None, body=None, tag=None, tags=(), predicate=None, bind_as=None)
```

Path `nu.context.Provide`. Kind `Bracket`, sort `bracket`, cardinality `transparent`. Arity 7 (1 required).

This is how a stateful Nu program gets its state: nothing in the tree
reaches a fabric that was not provided around it. On entry the bracket
builds `cls(**kwargs)`, runs its setup if it has one, and binds the
instance on the Context under the class plus any tags. The body runs
against that Context. On exit teardown fires, and it fires in reverse
order across nested brackets, so an outer fabric is still live while the
ones inside it are tearing down.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cls` | `type` |  | the fabric class to construct. Also the key it binds under, unless `bind_as` or the class's own `_nu_bind_as` overrides that. |
| `kwargs` | `Mapping[str, object] \| None` | `None` | passed straight to the constructor. Plain Python values, not Nu terms; this is a payload, not a child. |
| `body` | `Nu \| None` | `None` | the tree that runs with the fabric bound. |
| `tag` | `object` | `None` |  |
| `tags` | `Sequence[object]` | `()` |  |
| `predicate` | `Callable \| None` | `None` |  |
| `bind_as` | `type \| None` | `None` |  |

**Yields**

Whatever `body` yields, in the body's own cardinality. Transparent
like any Bracket. For a stream body the fabric stays bound for the
whole drain and tears down when the stream is exhausted.

**Notes**

- `tag=` is sugar for a one-element `tags=`; both fold into the same tuple, and a tagged binding is read back by a Ref that carries the same tag. Resolution falls back from more tags to fewer, so a tagless read never reaches a tagged binding.
- `predicate=` is one guard callable handed to the Context's guarded registry: the binding resolves only when `predicate(**data)` returns True for the data passed to `ctx.get`. Useful for "the shard that covers this address" without enumerating shard tags up front.
- `bind_as=` binds the instance under a different type than it was constructed from, so an implementation can be provided where a protocol or base class is what the tree asks for.
- Setup is optional. A class with neither `setup` nor `asetup` passes through untouched; one with only `asetup` raises under the sync runner rather than binding half-built, and a class marked `_nu_async_only` is refused before it is even constructed.
- Under `nu.arun` the bracket prefers `asetup` / `acleanup` and falls back to the sync pair; under `nu.run` only the sync pair runs.
- Teardown only reaches instances whose setup completed, so a setup that raises does not leave a half-open fabric to be cleaned up.

**Example**

```python
class Counter:
    def __init__(self, start=0):
        self.n = start
nu.run(nu.Provide(Counter, {"start": 5}, nu.FabricRef(Counter).exists()))[0]
```

```
True
```

## ProvideDict

Constructs a fleet of one class and binds each member under its own key.

```python
ProvideDict(cls, specs, body=None, extra_tags=(), predicate=None, bind_as=None, parallel=False)
```

Path `nu.context.ProvideDict`. Kind `Bracket`, sort `bracket`, cardinality `transparent`. Arity 7 (2 required).

The mapping shape of `Provide`: same as `ProvideList` but
addressed by the caller's key rather than by position, which is what you
want when the members are named rather than numbered.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cls` | `type` |  | the fabric class every member is constructed from. |
| `specs` | `Mapping[object, Mapping[str, object]]` |  | a mapping of key to kwargs. Each key becomes the tag its instance binds under. |
| `body` | `Nu \| None` | `None` | the tree that runs with the whole fleet bound. |
| `extra_tags` | `Sequence[object]` | `()` |  |
| `predicate` | `Callable \| None` | `None` |  |
| `bind_as` | `type \| None` | `None` |  |
| `parallel` | `bool` | `False` |  |

**Yields**

Whatever `body` yields, in the body's own cardinality. Transparent
like any Bracket.

**Notes**

- Members are built in the mapping's insertion order, and teardown is the reverse of that.
- `extra_tags=` fold onto every member after its key tag; `predicate=` is one guard callable shared by every member.
- `parallel=True` fires every `asetup` concurrently instead of in sequence. Each one then sees the Context as it was on entry rather than one carrying the earlier members, so it is only safe when the fleet does not cross-depend. It is an async-only knob; the sync path ignores it. Teardown stays sequential and reversed either way.
- A spec that fails unwinds the members already set up before the error propagates.

**Example**

```python
nu.ProvideDict(
    RayService,
    {"ledger": {"port": 8000}, "index": {"port": 8001}},
    body=feed,
)
```

## ProvideList

Constructs a fleet of one class and binds each member under its index.

```python
ProvideList(cls, specs, body=None, base_tag=0, extra_tags=(), predicate=None, bind_as=None)
```

Path `nu.context.ProvideList`. Kind `Bracket`, sort `bracket`, cardinality `transparent`. Arity 7 (2 required).

The list shape of `Provide`: one instance per spec, bound at
`base_tag + i` so the fleet is addressed by position. Each instance is
constructed, set up and bound before the next one is built, so a later
member's setup sees the earlier ones already on the Context.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cls` | `type` |  | the fabric class every member is constructed from. |
| `specs` | `Sequence[Mapping[str, object]]` |  | one kwargs mapping per instance, in the order they are built. |
| `body` | `Nu \| None` | `None` | the tree that runs with the whole fleet bound. |
| `base_tag` | `int` | `0` |  |
| `extra_tags` | `Sequence[object]` | `()` |  |
| `predicate` | `Callable \| None` | `None` |  |
| `bind_as` | `type \| None` | `None` |  |

**Yields**

Whatever `body` yields, in the body's own cardinality. Transparent
like any Bracket.

**Notes**

- Index tags count from `base_tag=`, which lets two fleets of the same class share one index space without colliding.
- `extra_tags=` fold onto every member after its index tag, so the fleet can carry a shared label as well as a position.
- `predicate=` is one guard callable shared by every member.
- Teardown is reverse of setup and only reaches members whose setup completed, so a spec that fails mid-fleet unwinds the ones already built before the error propagates.

**Example**

```python
nu.ProvideList(
    RayService,
    [{"port": 8000}, {"port": 8001}],
    body=feed,
    extra_tags=("ledger",),
)
```

## With

Enters several lifecycle brackets around one body, tearing down in reverse.

```python
With(body=None)
```

Path `nu.context.With`. Kind `Bracket`, sort `bracket`, cardinality `transparent`. Arity 1 (0 required).

Python's `with A, B, C: body`, in the tree. Each bracket is opened in
order and the Context accumulates across them, so a later bracket's setup
sees everything the earlier ones bound. The body runs against the final
Context, and on exit teardown fires in reverse. What it buys is flatness:
stacking peers at one level instead of the
`Provide(a, kw, Provide(b, kw, Provide(c, kw, body)))` cascade.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `body` | `Nu \| None` | `None` | the tree that runs with all of them open. |

**Yields**

Whatever `body` yields, in the body's own cardinality. Transparent
like any Bracket.

**Notes**

- Each bracket is used as a spec, not as a subtree: `With` re-enters its open/close and ignores whatever sits in that bracket's own body slot, so passing a body to a nested bracket has no effect.
- Composes anything with the lifecycle shape - `Provide`, `ProvideList`, `ProvideDict`, `InvisiblesProxy` and the rest.
- A bracket whose setup raises unwinds the ones already entered before the error propagates.

**Example**

```python
nu.With(
    nu.Provide(RayCluster, {...}),
    nu.Provide(RayService, {...}, tag="A"),
    nu.Provide(RayService, {...}, tag="B"),
    nu.ProvideDict(RayService, {...}),
    body=feed,
)
```

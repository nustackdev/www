---
title: service
description: "Nu Service fabric: expose Python objects as Nu Services."
---

Module `nustd.service`.

Nu Service fabric: expose Python objects as Nu Services.

Endpoints are declared with `<Ref>.method(name=..., **defaults)` in a
`nu.Service` class body. That returns a Method declaration, which ServiceMeta
replaces with a descriptor, so reading the field back off the Service class
yields a Ref and calling it builds the interaction. `name=` picks the target
attribute (defaulting to the field name); `**defaults` are call kwargs the
call site can override.

Example:

```python
class Calculator:
    def __init__(self): self.total = 0
    def add(self, a, b): return a + b
    def bump(self, by): self.total += by; return self.total
    def reset(self): self.total = 0

class Calc(nu.Service):
    add   = nustd.service.QueryRef.method()
    bump  = nustd.service.ActionRef.method()
    reset = nustd.service.CommandRef.method()

app = nu.With(
    nustd.service.bind(Calc, target=Calculator()),
    body=nu.print(Calc.add(a=1, b=2)),
)
```

## interactions

Module `nustd.service.interactions`.

5 Service interactions, one per canonical Nu kind.

ServiceQuery         (ScalarQuery)   — pure scalar read.
ServiceStreamQuery   (StreamQuery)   — pure stream read.
ServiceAction        (ScalarAction)  — mutating scalar call, yields a value.
ServiceStreamAction  (StreamAction)  — mutating stream call, yields items.
ServiceCommand       (Command)       — mutating void call, yields nothing.

Each takes the same two children: the endpoint Ref and a Dict of call kwargs.
None of them is written by hand — calling the matching MethodRef builds it.
Dispatch is shared: the Ref payload names the owning Service, that class is the
tag the `ServiceFabric` is looked up under on the context, the target
attribute is fetched off it, and the endpoint defaults are merged under the
call kwargs. What differs across the five is the kind they declare, whether
slot 0 is marked mutated, and what happens to the return value.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ServiceAction](#serviceaction) | `scalar_action` | `ServiceAction(ref, args)` | Calls a mutating endpoint on the bound Python object for its value. |
| [ServiceCommand](#servicecommand) | `scalar_command` | `ServiceCommand(ref, args)` | Calls a mutating endpoint on the bound Python object for effect only. |
| [ServiceQuery](#servicequery) | `scalar_query` | `ServiceQuery(ref, args)` | Calls a read-only endpoint on the bound Python object for its value. |
| [ServiceStreamAction](#servicestreamaction) | `stream_action` | `ServiceStreamAction(ref, args)` | Calls a mutating endpoint on the bound Python object for its items. |
| [ServiceStreamQuery](#servicestreamquery) | `stream_query` | `ServiceStreamQuery(ref, args)` | Calls a read-only endpoint on the bound Python object for its items. |

### ServiceAction

Calls a mutating endpoint on the bound Python object for its value.

```python
ServiceAction(ref, args)
```

Path `nustd.service.ServiceAction`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the endpoint Ref. Its payload names the owning Service, the target attribute, and the endpoint defaults. |
| `args` |  |  | a Dict of call kwargs, merged over those defaults. |

**Yields**

Whatever the target returns, passed through untouched.

**Notes**

- Built by calling an `ActionRef`, not written directly.
- Slot 0 is declared mutated, so the Ref child binds as WRITE in the effect walk instead of READ. That is the only difference from `ServiceQuery`; dispatch is identical.
- The write is declared, never inferred. Nothing inspects the target to confirm it mutates anything.

**Example**

```python
class Calc(nu.Service):
    bump = nustd.service.ActionRef.method()
app = nu.With(
    nustd.service.bind(Calc, target=Calculator()),
    body=nu.print(Calc.bump(by=3)),
)
```

### ServiceCommand

Calls a mutating endpoint on the bound Python object for effect only.

```python
ServiceCommand(ref, args)
```

Path `nustd.service.ServiceCommand`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the endpoint Ref. Its payload names the owning Service, the target attribute, and the endpoint defaults. |
| `args` |  |  | a Dict of call kwargs, merged over those defaults. |

**Yields**

Nothing. Always None, whatever the target returned.

**Notes**

- Built by calling a `CommandRef`, not written directly.
- Slot 0 is declared mutated, so the Ref child binds as WRITE.
- The return value is dropped after the awaitable check, so a target that does return something can still be wired here.
- Under `nu.run` an awaitable return raises RuntimeError pointing at `nu.arun`; under `nu.arun` it is awaited, then discarded.

**Example**

```python
class Calc(nu.Service):
    reset = nustd.service.CommandRef.method()
app = nu.With(
    nustd.service.bind(Calc, target=Calculator()),
    body=Calc.reset(),
)
```

### ServiceQuery

Calls a read-only endpoint on the bound Python object for its value.

```python
ServiceQuery(ref, args)
```

Path `nustd.service.ServiceQuery`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the endpoint Ref. Its payload names the owning Service, the target attribute, and the endpoint defaults. |
| `args` |  |  | a Dict of call kwargs, merged over those defaults. |

**Yields**

Whatever the target returns, passed through untouched. No sentinel
translation happens here, so a target returning None yields None.

**Notes**

- Built by calling a `QueryRef`, not written directly.
- The owning Service class is the context tag, so several Services over several targets coexist in one tree without colliding.
- A kwarg passed at the call site wins over the endpoint default of the same name.
- Under `nu.run` an awaitable return raises RuntimeError pointing at `nu.arun`; under `nu.arun` it is awaited.

**Example**

```python
class Calc(nu.Service):
    add = nustd.service.QueryRef.method()
app = nu.With(
    nustd.service.bind(Calc, target=Calculator()),
    body=nu.print(Calc.add(a=1, b=2)),
)
```

### ServiceStreamAction

Calls a mutating endpoint on the bound Python object for its items.

```python
ServiceStreamAction(ref, args)
```

Path `nustd.service.ServiceStreamAction`. Kind `StreamAction`, sort `stream_action`, cardinality `stream`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the endpoint Ref. Its payload names the owning Service, the target attribute, and the endpoint defaults. |
| `args` |  |  | a Dict of call kwargs, merged over those defaults. |

**Yields**

The items of whatever the target returned, in order, pulled one at a
time.

**Notes**

- Built by calling a `StreamActionRef`, not written directly.
- Slot 0 is declared mutated, so the Ref child binds as WRITE. That is the only difference from `ServiceStreamQuery`; dispatch is identical.
- The write is attributed to the call, not to each pull, so a generator that only mutates while draining still reads as a write on the node.

**Example**

```python
class Calc(nu.Service):
    drain = nustd.service.StreamActionRef.method()
app = nu.With(
    nustd.service.bind(Calc, target=Calculator()),
    body=nu.print(nu.Collect(Calc.drain())),
)
```

### ServiceStreamQuery

Calls a read-only endpoint on the bound Python object for its items.

```python
ServiceStreamQuery(ref, args)
```

Path `nustd.service.ServiceStreamQuery`. Kind `StreamQuery`, sort `stream_query`, cardinality `stream`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the endpoint Ref. Its payload names the owning Service, the target attribute, and the endpoint defaults. |
| `args` |  |  | a Dict of call kwargs, merged over those defaults. |

**Yields**

The items of whatever the target returned, in order, pulled one at a
time.

**Notes**

- Built by calling a `StreamQueryRef`, not written directly.
- The target is called once; only the iteration is lazy. A generator function therefore runs no body until the stream is pulled, but a function returning a list has already built the list.
- Under `nu.run` an async generator return raises RuntimeError pointing at `nu.arun`.
- Under `nu.arun` a plain iterable, an awaitable of an iterable, and an async generator are all bridged to async iteration.

**Example**

```python
class Calc(nu.Service):
    squares = nustd.service.StreamQueryRef.method(name="range")
app = nu.With(
    nustd.service.bind(Calc, target=Calculator()),
    body=nu.print(nu.Collect(Calc.squares(n=4))),
)
```

## refs

Module `nustd.service.refs`.

Service MethodRefs: one Ref class per canonical Nu kind.

QueryRef         (ScalarQuery)   — pure scalar read.
StreamQueryRef   (StreamQuery)   — pure stream read.
ActionRef        (ScalarAction)  — mutating scalar call, yields a value.
StreamActionRef  (StreamAction)  — mutating stream call, yields items.
CommandRef       (Command)       — mutating void call, yields nothing.

All five share one declaration shape. `.method(name=..., **defaults)` does not
return a Ref: it returns a `Method` declaration, which `ServiceMeta` replaces
with a descriptor when the Service class is created. Reading the field back off
the Service class runs that descriptor and hands out a fresh Ref carrying the
endpoint address; calling the Ref builds the matching interaction. The return
annotation on `.method` says the Ref subclass so a type checker resolves
`Calc.add(...)` to the Ref's `__call__`; at runtime it is a `Method`.

`name=` names the attribute to fetch on the target object; when omitted the
descriptor's field name on the Service class is used. `**defaults` are call
kwargs baked into the endpoint, merged under whatever the call passes.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ActionRef](#actionref) | `ref` | `ActionRef(name, owner_service=None)` | Mutating scalar endpoint: calls the target for effect and for its value. |
| [CommandRef](#commandref) | `ref` | `CommandRef(name, owner_service=None)` | Mutating void endpoint: calls the target for effect and drops the value. |
| [QueryRef](#queryref) | `ref` | `QueryRef(name, owner_service=None)` | Read-only scalar endpoint on the Python object a Service is bound to. |
| [StreamActionRef](#streamactionref) | `ref` | `StreamActionRef(name, owner_service=None)` | Mutating stream endpoint: calls the target for effect and for its items. |
| [StreamQueryRef](#streamqueryref) | `ref` | `StreamQueryRef(name, owner_service=None)` | Read-only stream endpoint on the Python object a Service is bound to. |

### ActionRef

Mutating scalar endpoint: calls the target for effect and for its value.

```python
ActionRef(name, owner_service=None)
```

Path `nustd.service.ActionRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Declares the Ref slot as mutated, so the effect walk binds this Ref as WRITE and any narrowing or span analysis sees the endpoint as a write.
- Nothing about the target is checked: WRITE is a declaration by the person writing the Service, not something read off the Python object.
- Otherwise identical to `QueryRef` in dispatch: same lookup, same defaults merge, same sync/async rules.

**Example**

```python
class Calc(nu.Service):
    bump = nustd.service.ActionRef.method()
app = nu.With(
    nustd.service.bind(Calc, target=Calculator()),
    body=nu.print(Calc.bump(by=3)),
)
```

**Methods**

#### `a(...)`

Build the ServiceAction that calls this endpoint with the given kwargs.

Builds `Nu`.

**Yields**

An unevaluated interaction. Nothing is dispatched until the tree runs.

**Notes**

- Kwargs are wrapped in a `Dict` child, so each value can be a Nu term evaluated at run rather than a fixed literal.

Undocumented: example.

### CommandRef

Mutating void endpoint: calls the target for effect and drops the value.

```python
CommandRef(name, owner_service=None)
```

Path `nustd.service.CommandRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Declares the Ref slot as mutated, so the effect walk binds this Ref as WRITE.
- Whatever the target returns is discarded, so a method that does return something can still be exposed here; the value is simply unreachable.
- Use it where the call has no useful result. When you want the value, declare the same target attribute with `ActionRef` instead.

**Example**

```python
class Calc(nu.Service):
    reset = nustd.service.CommandRef.method()
app = nu.With(
    nustd.service.bind(Calc, target=Calculator()),
    body=Calc.reset(),
)
```

**Methods**

#### `a(...)`

Build the ServiceCommand that calls this endpoint with the given kwargs.

Builds `Nu`.

**Yields**

An unevaluated interaction. Nothing is dispatched until the tree runs.

**Notes**

- Kwargs are wrapped in a `Dict` child, so each value can be a Nu term evaluated at run rather than a fixed literal.

Undocumented: example.

### QueryRef

Read-only scalar endpoint on the Python object a Service is bound to.

```python
QueryRef(name, owner_service=None)
```

Path `nustd.service.QueryRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Nothing resolves while the Service class body runs. The attribute is fetched off the `ServiceFabric` bound for the owning Service at the moment the interaction evaluates, so a wrong name fails at run.
- The address travels as Ref payload, not as children: target attribute name, owning Service class, and the endpoint defaults.
- Read-only, so the Ref binds as READ in the effect walk and the endpoint is never reported as writing the fabric.
- The target method may be plain or `async def`; an awaitable return is refused under `nu.run` and awaited under `nu.arun`.

**Example**

```python
class Calc(nu.Service):
    add = nustd.service.QueryRef.method()
app = nu.With(
    nustd.service.bind(Calc, target=Calculator()),
    body=nu.print(Calc.add(a=1, b=2)),
)
```

**Methods**

#### `a(...)`

Build the ServiceQuery that calls this endpoint with the given kwargs.

Builds `Nu`.

**Yields**

An unevaluated interaction. Nothing is dispatched until the tree runs.

**Notes**

- Kwargs are wrapped in a `Dict` child, so each value can be a Nu term evaluated at run rather than a fixed literal.

Undocumented: example.

### StreamActionRef

Mutating stream endpoint: calls the target for effect and for its items.

```python
StreamActionRef(name, owner_service=None)
```

Path `nustd.service.StreamActionRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Declares the Ref slot as mutated, so the effect walk binds this Ref as WRITE, unlike `StreamQueryRef`.
- The effect is declared on the call, not on each pull, so a lazy generator that mutates only while being drained still reads as a write from the moment the call is written.
- Same iterable / generator / async-generator bridging as `StreamQueryRef`.

**Example**

```python
class Calc(nu.Service):
    drain = nustd.service.StreamActionRef.method()
app = nu.With(
    nustd.service.bind(Calc, target=Calculator()),
    body=nu.print(nu.Collect(Calc.drain())),
)
```

**Methods**

#### `a(...)`

Build the ServiceStreamAction that calls this endpoint with the kwargs.

Builds `Nu`.

**Yields**

An unevaluated interaction. Nothing is dispatched until the tree runs.

**Notes**

- Kwargs are wrapped in a `Dict` child, so each value can be a Nu term evaluated at run rather than a fixed literal.

Undocumented: example.

### StreamQueryRef

Read-only stream endpoint on the Python object a Service is bound to.

```python
StreamQueryRef(name, owner_service=None)
```

Path `nustd.service.StreamQueryRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- The target may return any iterable, a generator, or (async only) an async generator; all three are bridged to the stream shape Nu expects.
- Under `nu.run` an async generator return is refused; under `nu.arun` a sync iterable is wrapped so it can be pulled with `async for`.
- Read-only, so the Ref binds as READ in the effect walk.

**Example**

```python
class Calc(nu.Service):
    squares = nustd.service.StreamQueryRef.method(name="range")
app = nu.With(
    nustd.service.bind(Calc, target=Calculator()),
    body=nu.print(nu.Collect(Calc.squares(n=4))),
)
```

**Methods**

#### `a(...)`

Build the ServiceStreamQuery that calls this endpoint with the kwargs.

Builds `Nu`.

**Yields**

An unevaluated interaction. Nothing is dispatched until the tree runs.

**Notes**

- Kwargs are wrapped in a `Dict` child, so each value can be a Nu term evaluated at run rather than a fixed literal.

Undocumented: example.

## presets

Module `nustd.service.presets`.

bind(): Provide a ServiceFabric wrapping a Python target for a Service.

| Name | Call | Meaning |
| --- | --- | --- |
| [bind](#bind) | `service.bind(service_cls, target)` | Wire a Python object as the backing target for a Service's endpoints. |

### bind

Wire a Python object as the backing target for a Service's endpoints.

```python
service.bind(service_cls, target)
```

Path `nustd.service.bind`. Defined on `nustd.service.presets`, bound as a function. Builds `Provide`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `service_cls` | `type` |  | the `nu.Service` subclass whose endpoints dispatch here. Used as the context tag; it is never instantiated. |
| `target` | `object` |  | any Python object. Each endpoint resolves to the attribute of the same name on it, or the name given to `.method(name=...)`. |

**Notes**

- The tag is the Service class itself, which is also what the interactions look up, so several Services over several targets live side by side in one tree.
- Returns the `Provide` bracket with no body, so it is written as the first argument of a `nu.With` and scopes to that body. Endpoints evaluated outside it find no fabric.
- The fabric has no setup or teardown of its own, so nothing is opened or closed around the object. Its lifetime stays the caller's problem.
- The target is captured once at bind time; there is no rebinding for the life of the body.

**Example**

```python
class Calc(nu.Service):
    add = nustd.service.QueryRef.method()
app = nu.With(
    nustd.service.bind(Calc, target=Calculator()),
    body=nu.print(Calc.add(a=1, b=2)),
)
```

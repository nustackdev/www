---
title: http
description: "Nu HTTP fabric."
---

Module `nustd.http`.

Nu HTTP fabric.

Example:
class GH(nu.Service):
    get_repo = nustd.http.GETRef.method("/repos/{owner}/{name}")

app = nu.With(
    nustd.http.bind(GH, base_url="https://api.github.com"),
    body=nu.print(GH.get_repo(owner="nu", name="core")),
)

## interactions

Module `nustd.http.interactions`.

5 HTTP interactions: HttpGet, HttpPost, HttpPut, HttpPatch, HttpDelete.

GET is a ScalarQuery (safe verb, no mutation attribution).
POST / PUT / PATCH / DELETE are ScalarActions (mutate, still yield the response body).

Each class inlines its own `_mutates` (mutating verbs) + `_compile` / `_acompile`.
Shared wire logic lives in `nustd.http.core`. Repetition across the 4 mutating verbs
is intentional: this is declaration-style code, read straight through.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [HttpDelete](#httpdelete) | `scalar_action` | `HttpDelete(endpoint, args)` | One DELETE request over an endpoint declared with DELETERef. |
| [HttpGet](#httpget) | `scalar_query` | `HttpGet(endpoint, args)` | One GET request over an endpoint declared with GETRef. |
| [HttpPatch](#httppatch) | `scalar_action` | `HttpPatch(endpoint, args)` | One PATCH request over an endpoint declared with PATCHRef. |
| [HttpPost](#httppost) | `scalar_action` | `HttpPost(endpoint, args)` | One POST request over an endpoint declared with POSTRef. |
| [HttpPut](#httpput) | `scalar_action` | `HttpPut(endpoint, args)` | One PUT request over an endpoint declared with PUTRef. |

### HttpDelete

One DELETE request over an endpoint declared with DELETERef.

```python
HttpDelete(endpoint, args)
```

Path `nustd.http.HttpDelete`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `endpoint` |  |  | the DELETERef, yielding the path, the declared defaults and the Service that owns the endpoint. |
| `args` |  |  | the call kwargs, as a Dict. |

**Yields**

The response body, parsed as JSON.

**Notes**

- Written by calling a `DELETERef`, not by hand: the Ref call is what pairs the endpoint with its kwargs.
- Path placeholders are filled from `args` and consumed; what is left layers over the declared defaults and rides as query parameters, not a body.
- The fabric is resolved on the runtime context as an `HttpFabric` tagged by the owning Service, so the request only works inside a `With` that bound one for that Service.
- A non-2xx response raises rather than yielding a value, so an HTTP error is a real error and never a sentinel.
- The response is parsed as JSON unconditionally, so an endpoint that answers with an empty body (a bare 204) raises on the parse.
- The endpoint sits in the mutation slot, so it binds as a WRITE effect: the request is assumed to change something on the far side.

**Example**

```python
class Store(nu.Service):
    delete_item = nustd.http.DELETERef.method("/items/{id}")
app = nu.With(
    nustd.http.bind(Store, base_url="https://api.example.com"),
    body=Store.delete_item(id=7),
)
```

### HttpGet

One GET request over an endpoint declared with GETRef.

```python
HttpGet(endpoint, args)
```

Path `nustd.http.HttpGet`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `endpoint` |  |  | the GETRef, yielding the path, the declared defaults and the Service that owns the endpoint. |
| `args` |  |  | the call kwargs, as a Dict. |

**Yields**

The response body, parsed as JSON.

**Notes**

- Written by calling a `GETRef`, not by hand: the Ref call is what pairs the endpoint with its kwargs.
- Path placeholders are filled from `args` and consumed; what is left layers over the declared defaults and rides as query parameters.
- The fabric is resolved on the runtime context as an `HttpFabric` tagged by the owning Service, so the request only works inside a `With` that bound one for that Service.
- A non-2xx response raises rather than yielding a value, so an HTTP error is a real error and never a sentinel.
- Safe verb: nothing is declared mutated, so the endpoint binds as a READ effect.

**Example**

```python
class GH(nu.Service):
    get_repo = nustd.http.GETRef.method("/repos/{owner}/{name}")
app = nu.With(
    nustd.http.bind(GH, base_url="https://api.github.com"),
    body=nu.print(GH.get_repo(owner="nu", name="core")),
)
```

### HttpPatch

One PATCH request over an endpoint declared with PATCHRef.

```python
HttpPatch(endpoint, args)
```

Path `nustd.http.HttpPatch`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `endpoint` |  |  | the PATCHRef, yielding the path, the declared defaults and the Service that owns the endpoint. |
| `args` |  |  | the call kwargs, as a Dict. |

**Yields**

The response body, parsed as JSON.

**Notes**

- Written by calling a `PATCHRef`, not by hand: the Ref call is what pairs the endpoint with its kwargs.
- Path placeholders are filled from `args` and consumed; what is left layers over the declared defaults and is sent as the JSON body.
- The fabric is resolved on the runtime context as an `HttpFabric` tagged by the owning Service, so the request only works inside a `With` that bound one for that Service.
- A non-2xx response raises rather than yielding a value, so an HTTP error is a real error and never a sentinel.
- The endpoint sits in the mutation slot, so it binds as a WRITE effect: the request is assumed to change something on the far side.

**Example**

```python
class Store(nu.Service):
    patch_item = nustd.http.PATCHRef.method("/items/{id}")
app = nu.With(
    nustd.http.bind(Store, base_url="https://api.example.com"),
    body=Store.patch_item(id=7, name="anvil"),
)
```

### HttpPost

One POST request over an endpoint declared with POSTRef.

```python
HttpPost(endpoint, args)
```

Path `nustd.http.HttpPost`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `endpoint` |  |  | the POSTRef, yielding the path, the declared defaults and the Service that owns the endpoint. |
| `args` |  |  | the call kwargs, as a Dict. |

**Yields**

The response body, parsed as JSON.

**Notes**

- Written by calling a `POSTRef`, not by hand: the Ref call is what pairs the endpoint with its kwargs.
- Path placeholders are filled from `args` and consumed; what is left layers over the declared defaults and is sent as the JSON body.
- The fabric is resolved on the runtime context as an `HttpFabric` tagged by the owning Service, so the request only works inside a `With` that bound one for that Service.
- A non-2xx response raises rather than yielding a value, so an HTTP error is a real error and never a sentinel.
- The endpoint sits in the mutation slot, so it binds as a WRITE effect: the request is assumed to change something on the far side.

**Example**

```python
class GH(nu.Service):
    create_issue = nustd.http.POSTRef.method("/repos/{owner}/{name}/issues")
app = nu.With(
    nustd.http.bind(GH, base_url="https://api.github.com"),
    body=GH.create_issue(owner="nu", name="core", title="bug"),
)
```

### HttpPut

One PUT request over an endpoint declared with PUTRef.

```python
HttpPut(endpoint, args)
```

Path `nustd.http.HttpPut`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `endpoint` |  |  | the PUTRef, yielding the path, the declared defaults and the Service that owns the endpoint. |
| `args` |  |  | the call kwargs, as a Dict. |

**Yields**

The response body, parsed as JSON.

**Notes**

- Written by calling a `PUTRef`, not by hand: the Ref call is what pairs the endpoint with its kwargs.
- Path placeholders are filled from `args` and consumed; what is left layers over the declared defaults and is sent as the JSON body.
- The fabric is resolved on the runtime context as an `HttpFabric` tagged by the owning Service, so the request only works inside a `With` that bound one for that Service.
- A non-2xx response raises rather than yielding a value, so an HTTP error is a real error and never a sentinel.
- The endpoint sits in the mutation slot, so it binds as a WRITE effect: the request is assumed to change something on the far side.

**Example**

```python
class Store(nu.Service):
    put_item = nustd.http.PUTRef.method("/items/{id}")
app = nu.With(
    nustd.http.bind(Store, base_url="https://api.example.com"),
    body=Store.put_item(id=7, name="anvil"),
)
```

## refs

Module `nustd.http.refs`.

HTTP MethodRefs: one Ref class per verb, declaration-style.

Each verb Ref inlines `.method(...)` and `__call__` directly. Repetition
is intentional: this is a declarative surface, and inlining keeps every
verb readable end-to-end without hopping to a base class.

`.method(...)` is annotated as returning the Ref subclass itself
(`-> POSTRef`, `-> GETRef`, ...). That is a deliberate lie: at runtime it
returns a `Method` declaration which the ServiceMeta descriptor unwraps at
class access. The lie makes `Solana.get_slot` resolve to `POSTRef` in a
type checker, so `Solana.get_slot(...)` type-checks as `POSTRef.__call__`.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [DELETERef](#deleteref) | `ref` | `DELETERef(name, owner_service=None)` | A DELETE endpoint, declared once on a Service and called wherever it is needed. |
| [GETRef](#getref) | `ref` | `GETRef(name, owner_service=None)` | A GET endpoint, declared once on a Service and called wherever it is needed. |
| [PATCHRef](#patchref) | `ref` | `PATCHRef(name, owner_service=None)` | A PATCH endpoint, declared once on a Service and called wherever it is needed. |
| [POSTRef](#postref) | `ref` | `POSTRef(name, owner_service=None)` | A POST endpoint, declared once on a Service and called wherever it is needed. |
| [PUTRef](#putref) | `ref` | `PUTRef(name, owner_service=None)` | A PUT endpoint, declared once on a Service and called wherever it is needed. |

### DELETERef

A DELETE endpoint, declared once on a Service and called wherever it is needed.

```python
DELETERef(name, owner_service=None)
```

Path `nustd.http.DELETERef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

The declaration carries the path and any default query parameters; the
call carries the rest. Reading the name back off the Service class hands
out a fresh Ref that knows which Service owns it, and that Service is the
tag the HttpFabric is resolved under, so two Services can declare the
same verb against different base URLs.

**Notes**

- Only meaningful in a `Service` class body: `.method(...)` yields a declaration, and the Service metaclass turns it into the descriptor that hands out the Ref.
- `{name}` placeholders in the path are filled from the call kwargs, and those kwargs are consumed rather than also sent.
- Whatever kwargs are left ride as query parameters, not a body, layered over the declared defaults.
- Calling the Ref builds an `HttpDelete` and sends nothing; the request goes out when the tree runs.

**Example**

```python
class Store(nu.Service):
    delete_item = nustd.http.DELETERef.method("/items/{id}")
app = nu.With(
    nustd.http.bind(Store, base_url="https://api.example.com"),
    body=Store.delete_item(id=7),
)
```

**Methods**

#### `a(...)`

Build the DELETE interaction for one call of this endpoint.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*kwargs` |  |  | values for the path placeholders, plus the query parameters for this call. |

**Yields**

An `HttpDelete` over this Ref and the kwargs. Nothing is sent
until the tree runs.

Undocumented: example.

### GETRef

A GET endpoint, declared once on a Service and called wherever it is needed.

```python
GETRef(name, owner_service=None)
```

Path `nustd.http.GETRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

The declaration carries the path and any default query parameters; the
call carries the rest. Reading the name back off the Service class hands
out a fresh Ref that knows which Service owns it, and that Service is the
tag the HttpFabric is resolved under, so two Services can declare the
same verb against different base URLs.

**Notes**

- Only meaningful in a `Service` class body: `.method(...)` yields a declaration, and the Service metaclass turns it into the descriptor that hands out the Ref.
- `{name}` placeholders in the path are filled from the call kwargs, and those kwargs are consumed rather than also sent.
- Whatever kwargs are left ride as query parameters, layered over the declared defaults, so a call can override a default but a default can never fill a path placeholder.
- Calling the Ref builds an `HttpGet` and sends nothing; the request goes out when the tree runs.

**Example**

```python
class GH(nu.Service):
    get_repo = nustd.http.GETRef.method("/repos/{owner}/{name}")
app = nu.With(
    nustd.http.bind(GH, base_url="https://api.github.com"),
    body=GH.get_repo(owner="nu", name="core"),
)
```

**Methods**

#### `a(...)`

Build the GET interaction for one call of this endpoint.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*kwargs` |  |  | values for the path placeholders, plus the query parameters for this call. |

**Yields**

An `HttpGet` over this Ref and the kwargs. Nothing is sent
until the tree runs.

Undocumented: example.

### PATCHRef

A PATCH endpoint, declared once on a Service and called wherever it is needed.

```python
PATCHRef(name, owner_service=None)
```

Path `nustd.http.PATCHRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

The declaration carries the path and any default body fields; the call
carries the rest. Reading the name back off the Service class hands out a
fresh Ref that knows which Service owns it, and that Service is the tag
the HttpFabric is resolved under, so two Services can declare the same
verb against different base URLs.

**Notes**

- Only meaningful in a `Service` class body: `.method(...)` yields a declaration, and the Service metaclass turns it into the descriptor that hands out the Ref.
- `{name}` placeholders in the path are filled from the call kwargs, and those kwargs are consumed rather than also sent.
- Whatever kwargs are left ride as the JSON body, layered over the declared defaults, so a call can override a default but a default can never fill a path placeholder.
- Calling the Ref builds an `HttpPatch` and sends nothing; the request goes out when the tree runs.

**Example**

```python
class Store(nu.Service):
    patch_item = nustd.http.PATCHRef.method("/items/{id}")
app = nu.With(
    nustd.http.bind(Store, base_url="https://api.example.com"),
    body=Store.patch_item(id=7, name="anvil"),
)
```

**Methods**

#### `a(...)`

Build the PATCH interaction for one call of this endpoint.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*kwargs` |  |  | values for the path placeholders, plus the JSON body fields for this call. |

**Yields**

An `HttpPatch` over this Ref and the kwargs. Nothing is sent
until the tree runs.

Undocumented: example.

### POSTRef

A POST endpoint, declared once on a Service and called wherever it is needed.

```python
POSTRef(name, owner_service=None)
```

Path `nustd.http.POSTRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

The declaration carries the path and any default body fields; the call
carries the rest. Reading the name back off the Service class hands out a
fresh Ref that knows which Service owns it, and that Service is the tag
the HttpFabric is resolved under, so two Services can declare the same
verb against different base URLs.

**Notes**

- Only meaningful in a `Service` class body: `.method(...)` yields a declaration, and the Service metaclass turns it into the descriptor that hands out the Ref.
- `{name}` placeholders in the path are filled from the call kwargs, and those kwargs are consumed rather than also sent.
- Whatever kwargs are left ride as the JSON body, layered over the declared defaults, so a call can override a default but a default can never fill a path placeholder.
- Calling the Ref builds an `HttpPost` and sends nothing; the request goes out when the tree runs.

**Example**

```python
class GH(nu.Service):
    create_issue = nustd.http.POSTRef.method("/repos/{owner}/{name}/issues")
app = nu.With(
    nustd.http.bind(GH, base_url="https://api.github.com"),
    body=GH.create_issue(owner="nu", name="core", title="bug"),
)
```

**Methods**

#### `a(...)`

Build the POST interaction for one call of this endpoint.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*kwargs` |  |  | values for the path placeholders, plus the JSON body fields for this call. |

**Yields**

An `HttpPost` over this Ref and the kwargs. Nothing is sent
until the tree runs.

Undocumented: example.

### PUTRef

A PUT endpoint, declared once on a Service and called wherever it is needed.

```python
PUTRef(name, owner_service=None)
```

Path `nustd.http.PUTRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

The declaration carries the path and any default body fields; the call
carries the rest. Reading the name back off the Service class hands out a
fresh Ref that knows which Service owns it, and that Service is the tag
the HttpFabric is resolved under, so two Services can declare the same
verb against different base URLs.

**Notes**

- Only meaningful in a `Service` class body: `.method(...)` yields a declaration, and the Service metaclass turns it into the descriptor that hands out the Ref.
- `{name}` placeholders in the path are filled from the call kwargs, and those kwargs are consumed rather than also sent.
- Whatever kwargs are left ride as the JSON body, layered over the declared defaults, so a call can override a default but a default can never fill a path placeholder.
- Calling the Ref builds an `HttpPut` and sends nothing; the request goes out when the tree runs.

**Example**

```python
class Store(nu.Service):
    put_item = nustd.http.PUTRef.method("/items/{id}")
app = nu.With(
    nustd.http.bind(Store, base_url="https://api.example.com"),
    body=Store.put_item(id=7, name="anvil"),
)
```

**Methods**

#### `a(...)`

Build the PUT interaction for one call of this endpoint.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*kwargs` |  |  | values for the path placeholders, plus the JSON body fields for this call. |

**Yields**

An `HttpPut` over this Ref and the kwargs. Nothing is sent
until the tree runs.

Undocumented: example.

## presets

Module `nustd.http.presets`.

bind(): Provide an HttpFabric for a service.

| Name | Call | Meaning |
| --- | --- | --- |
| [bind](#bind) | `http.bind(service_cls, base_url='', headers=None, timeout=30.0)` | Give one Service class its HTTP transport, for the span of a tree. |

### bind

Give one Service class its HTTP transport, for the span of a tree.

```python
http.bind(service_cls, base_url='', headers=None, timeout=30.0)
```

Path `nustd.http.bind`. Defined on `nustd.http.presets`, bound as a function. Builds `Provide`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `service_cls` | `type` |  | the Service whose endpoints this transport serves. It is also the tag the fabric is bound under, so one tree can carry a separate transport per Service. |
| `base_url` | `str` | `''` | prefix every declared path is joined onto. |
| `headers` | `dict[str, str] \| None` | `None` | sent on every request through this fabric. |
| `timeout` | `float` | `30.0` | seconds a single request may take. |

**Notes**

- Drops into a `With` alongside other providers; it is a bracket, so the clients open when the body starts and close when it ends.
- Which client opens follows the runtime: a sync run opens the sync client, an async run the async one. Calling an endpoint under the runtime whose client never opened raises.
- Endpoints of a Service with no matching bind cannot resolve a fabric, so binding is what makes a declared Service callable at all.

**Example**

```python
class GH(nu.Service):
    get_repo = nustd.http.GETRef.method("/repos/{owner}/{name}")
app = nu.With(
    nustd.http.bind(GH, base_url="https://api.github.com", timeout=5.0),
    body=nu.print(GH.get_repo(owner="nu", name="core")),
)
```

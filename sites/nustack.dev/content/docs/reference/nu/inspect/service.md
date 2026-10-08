---
title: service
description: "The service kind: record, parse, verify."
---

Module `nu.inspect.service`.

The service kind: record, parse, verify.

A Service is the flat sibling of a Shape: a class of declared methods, never
instantiated, whose attribute access hands out MethodRefs. Where a Shape says
what an app's state looks like, a Service says what it can call out to. Like
a Shape it belongs to whoever wrote the app, not to nu.

The record is prose plus a flat list of entries, one per method, and stops
there. `entry.parse_entry` resolves one of them to the MethodRef class's
own RefRecord - the declaration's config (the endpoint path, the verb) rides
on the entry, since it exists per method and nowhere on the Ref class.


#### The docstring contract for a Service

The same as a Shape's, for the same reason, and it is worth stating twice
because it is the half of the format people get wrong by habit:

- **Methods are not written.** They are on `_methods`, with their ref class
  and their full declaration config. Listing them in prose duplicates data
  that is already exact.
- **Args and Yields are violations.** A Service is never called; the *methods*
  are. What a method takes and yields is written on the MethodRef class that
  declares it, which is where a reader lands one lookup later.
- Summary, description and notes are the writable surface. Notes is where the
  facts that exist nowhere else go: which fabric the Service must be bound
  under, what authentication the endpoints assume, which calls are not
  idempotent.

| Name | Call | Meaning |
| --- | --- | --- |
| [catalogue_services](#catalogue_services) | `inspect.catalogue_services(module)` | A ServiceRecord per Service the module declares, in export order. |
| [parse_service](#parse_service) | `inspect.parse_service(cls, path='', aliases=())` | One ServiceRecord for `cls`. Methods are listed, not expanded. |
| [verify_service](#verify_service) | `inspect.verify_service(cls)` | Every way `cls` lies about the format. Same two removals as a Shape. |

## catalogue_services

A ServiceRecord per Service the module declares, in export order.

```python
inspect.catalogue_services(module)
```

Path `nu.inspect.catalogue_services`. Defined on `nu.inspect.service`, bound as a function. Builds `tuple[ServiceRecord, ...]`.

Same standing as the Shape catalogue: not the entry point, but the answer
to what is in this app module.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `module` | `ModuleType` |  |  |

Undocumented: example.

## parse_service

One ServiceRecord for `cls`. Methods are listed, not expanded.

```python
inspect.parse_service(cls, path='', aliases=())
```

Path `nu.inspect.parse_service`. Defined on `nu.inspect.service`, bound as a function. Builds `ServiceRecord`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cls` | `type` |  |  |
| `path` | `str` | `''` |  |
| `aliases` | `tuple[str, ...]` | `()` |  |

Undocumented: example.

## verify_service

Every way `cls` lies about the format. Same two removals as a Shape.

```python
inspect.verify_service(cls)
```

Path `nu.inspect.verify_service`. Defined on `nu.inspect.service`, bound as a function. Builds `list[Violation]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cls` | `type` |  |  |

Undocumented: example.

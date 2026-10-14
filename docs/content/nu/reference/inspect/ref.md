---
title: ref
description: "The ref kind: record, parse, verify."
---

Module `nu.inspect.ref`.

The ref kind: record, parse, verify.

A Ref names an addressed slot in a Fabric. Every Ref is a builder, so
RefRecord is a builder record; the kind exists so a catalogue can carry
Forms and Refs alongside each other and a consumer can dispatch on the
record's type.

| Name | Call | Meaning |
| --- | --- | --- |
| [catalogue_refs](#catalogue_refs) | `inspect.catalogue_refs(module)` | A RefRecord per Ref subclass the module exports, in export order. |
| [parse_ref](#parse_ref) | `inspect.parse_ref(cls, path='', aliases=())` | One RefRecord for `cls`. |
| [verify_ref](#verify_ref) | `inspect.verify_ref(cls)` | Every way `cls` lies about the format. No ref-specific laws yet. |

## catalogue_refs

A RefRecord per Ref subclass the module exports, in export order.

```python
inspect.catalogue_refs(module)
```

Path `nu.inspect.catalogue_refs`. Defined on `nu.inspect.ref`, bound as a function. Builds `tuple[RefRecord, ...]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `module` | `ModuleType` |  |  |

Undocumented: example.

## parse_ref

One RefRecord for `cls`.

```python
inspect.parse_ref(cls, path='', aliases=())
```

Path `nu.inspect.parse_ref`. Defined on `nu.inspect.ref`, bound as a function. Builds `RefRecord`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cls` | `type` |  |  |
| `path` | `str` | `''` |  |
| `aliases` | `tuple[str, ...]` | `()` |  |

Undocumented: example.

## verify_ref

Every way `cls` lies about the format. No ref-specific laws yet.

```python
inspect.verify_ref(cls)
```

Path `nu.inspect.verify_ref`. Defined on `nu.inspect.ref`, bound as a function. Builds `list[Violation]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cls` | `type` |  |  |

Undocumented: example.

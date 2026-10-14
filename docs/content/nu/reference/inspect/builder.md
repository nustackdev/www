---
title: builder
description: "The builder kind: record, parse, verify."
---

Module `nu.inspect.builder`.

The builder kind: record, parse, verify.

A builder is a class that hosts calls. Every Form and every Ref is a builder,
so a BuilderRecord is what those two kinds share: the class prose plus the
MRO-resolved set of methods it exposes below `Nu`.

`form` and `ref` extend this record with what makes each specific. A raw
BuilderRecord is what you reach for when neither specialisation is at hand or
when a caller wants the two kinds in one collection.

| Name | Call | Meaning |
| --- | --- | --- |
| [catalogue_builders](#catalogue_builders) | `inspect.catalogue_builders(module)` | A record per Form or Ref subclass the module exports, in export order. |
| [parse_builder](#parse_builder) | `inspect.parse_builder(cls, path='', aliases=())` | One BuilderRecord for `cls`. |
| [verify_builder](#verify_builder) | `inspect.verify_builder(cls)` | Every way `cls` and its methods lie about the format. |

## catalogue_builders

A record per Form or Ref subclass the module exports, in export order.

```python
inspect.catalogue_builders(module)
```

Path `nu.inspect.catalogue_builders`. Defined on `nu.inspect.builder`, bound as a function. Builds `tuple[BuilderRecord, ...]`.

Dispatches per class so a Ref returns a RefRecord and a Form returns a
FormRecord; the base BuilderRecord shape is preserved for consumers that
only read the shared fields.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `module` | `ModuleType` |  |  |

Undocumented: example.

## parse_builder

One BuilderRecord for `cls`.

```python
inspect.parse_builder(cls, path='', aliases=())
```

Path `nu.inspect.parse_builder`. Defined on `nu.inspect.builder`, bound as a function. Builds `BuilderRecord`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cls` | `type` |  |  |
| `path` | `str` | `''` |  |
| `aliases` | `tuple[str, ...]` | `()` |  |

Undocumented: example.

## verify_builder

Every way `cls` and its methods lie about the format.

```python
inspect.verify_builder(cls)
```

Path `nu.inspect.verify_builder`. Defined on `nu.inspect.builder`, bound as a function. Builds `list[Violation]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cls` | `type` |  |  |

Undocumented: example.

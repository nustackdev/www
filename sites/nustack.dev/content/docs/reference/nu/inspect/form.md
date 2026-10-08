---
title: form
description: "The form kind: record, parse, verify."
---

Module `nu.inspect.form`.

The form kind: record, parse, verify.

A Form is a typed interface: the operator surface a value carries. `Int`
is a Form over `int`, `Str` over `str`. Every Form is a builder, so
FormRecord is a builder record; the kind exists so a catalogue can carry
Forms and Refs alongside each other and a consumer can dispatch on the
record's type.

| Name | Call | Meaning |
| --- | --- | --- |
| [catalogue_forms](#catalogue_forms) | `inspect.catalogue_forms(module)` | A FormRecord per Form subclass the module exports, in export order. |
| [parse_form](#parse_form) | `inspect.parse_form(cls, path='', aliases=())` | One FormRecord for `cls`. |
| [verify_form](#verify_form) | `inspect.verify_form(cls)` | Every way `cls` lies about the format. No form-specific laws yet. |

## catalogue_forms

A FormRecord per Form subclass the module exports, in export order.

```python
inspect.catalogue_forms(module)
```

Path `nu.inspect.catalogue_forms`. Defined on `nu.inspect.form`, bound as a function. Builds `tuple[FormRecord, ...]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `module` | `ModuleType` |  |  |

Undocumented: example.

## parse_form

One FormRecord for `cls`.

```python
inspect.parse_form(cls, path='', aliases=())
```

Path `nu.inspect.parse_form`. Defined on `nu.inspect.form`, bound as a function. Builds `FormRecord`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cls` | `type` |  |  |
| `path` | `str` | `''` |  |
| `aliases` | `tuple[str, ...]` | `()` |  |

Undocumented: example.

## verify_form

Every way `cls` lies about the format. No form-specific laws yet.

```python
inspect.verify_form(cls)
```

Path `nu.inspect.verify_form`. Defined on `nu.inspect.form`, bound as a function. Builds `list[Violation]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cls` | `type` |  |  |

Undocumented: example.

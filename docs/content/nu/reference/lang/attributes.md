---
title: attributes
description: "Nu's attributes: one module per concern, plus the schema that assembles them."
---

Module `nu.lang.attributes`.

Nu's attributes: one module per concern, plus the schema that assembles them.

Each concern module here owns its value space (an enum) and its `ATTRIBUTES`
tuple: declared defaults plus computed folds. `build_schema` registers every
concern's attributes and finalizes once, topologically sorting the
cross-attribute dependency graph.

This package is the home of the *names* (`Attr`), the *value enums* and the
*attribute definitions*. The user-facing Term classes that declare these on
their bindings live one level up in `nu.lang.kinds`.

| Name | Call | Meaning |
| --- | --- | --- |
| [build_schema](#build_schema) | `lang.build_schema()` | Build and finalize the Nu schema from every concern's attributes. |

## build_schema

Build and finalize the Nu schema from every concern's attributes.

```python
lang.build_schema()
```

Path `nu.lang.build_schema`. Defined on `nu.lang.attributes`, bound as a function. Builds `Schema`.

Undocumented: example.

---
title: helpers.validation
description: "Nu-specialized validate: binds the Nu LAWS."
---

Module `nu.lang.helpers.validation`.

Nu-specialized validate: binds the Nu LAWS.

Wraps `nu.engine.validate` with Nu's law set so callers don't have to
pass them. Returns the same Program for chaining.

| Name | Call | Meaning |
| --- | --- | --- |
| [validate](#validate) | `lang.validate(program)` | Validate a compiled Program against the Nu law set. |

## validate

Validate a compiled Program against the Nu law set.

```python
lang.validate(program)
```

Path `nu.lang.validate`. Defined on `nu.lang.helpers.validation`, bound as a function. Builds `Program`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `program` | `Program` |  |  |

Undocumented: example.

---
title: helpers.compilation
description: "Nu-specialized compile: binds the finalized Nu SCHEMA."
---

Module `nu.lang.helpers.compilation`.

Nu-specialized compile: binds the finalized Nu SCHEMA.

Wraps `nu.engine.compile` with Nu's schema so callers don't have to
pass it. The engine's `Program.__init__` already stashes the schema on
the returned Program as `_schema` for downstream round-trips.

| Name | Call | Meaning |
| --- | --- | --- |
| [compile](#compile) | `lang.compile(term)` | Compile a Nu Term against the Nu schema; return a runnable Program. |

## compile

Compile a Nu Term against the Nu schema; return a runnable Program.

```python
lang.compile(term)
```

Path `nu.lang.compile`. Defined on `nu.lang.helpers.compilation`, bound as a function. Builds `Program`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `term` | `Term` |  |  |

Undocumented: example.

---
title: nu.engine.validation.law
description: "Law: a declarative validity rule, plus the verdict primitives and runners."
---

Module `nu.engine.validation.law`.

Law: a declarative validity rule, plus the verdict primitives and runners.

A `Law` judges one node: `scope` selects nodes it applies to, `holds`
must be true on each. When `holds` is false the law yields a `Violation`
at the given `Severity`. The subtree-wide check belongs in a synthesized
attribute; the law itself stays a flat predicate over one node.

- `Severity`        - how hard a failure bites (`ERROR` or `WARNING`).
- `Violation`       - one failure: path, law, detail, severity.
- `Law`             - the rule.
- `gate`            - run every law over every node; return every Violation.
- `validate`        - same, but raise on any error-level Violation.
- `ValidationError` - raised by `validate` when error-level laws fail.

| Name | Call | Meaning |
| --- | --- | --- |
| [gate](#gate) | `lang.gate(program)` | Run every law over every node and return every Violation found. |

## gate

Run every law over every node and return every Violation found.

```python
lang.gate(program)
```

Path `nu.lang.gate`. Defined on `nu.engine.validation.law`, bound as a function. Builds `list[Violation]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `program` | `Program` |  |  |

Undocumented: example.

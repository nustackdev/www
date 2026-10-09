---
title: nu.engine.validation.predicate
description: "Predicate: a composable `(program, path) -> bool` test."
---

Module `nu.engine.validation.predicate`.

Predicate: a composable `(program, path) -> bool` test.

- `Test` is the callable *shape* -- any `(program, path) -> bool`
  function. It is what laws ultimately consume; nothing more.
- `Predicate` wraps a `Test` to give it an *algebra*: `&`, `|`, and
  `~` combine predicates without forcing the caller to nest lambdas. The
  right operand of a binary combinator may be any bare `Test` -- the
  result is always a `Predicate`.

Wrap a plain function with the `@predicate` decorator to give it the same
algebra. Predicates are the building block for `Law.scope` and
`Law.holds`.

| Name | Call | Meaning |
| --- | --- | --- |
| [predicate](#predicate) | `lang.predicate(test)` | Wrap a `(program, path) -> bool` function as a composable Predicate. |

## predicate

Wrap a `(program, path) -> bool` function as a composable Predicate.

```python
lang.predicate(test)
```

Path `nu.lang.predicate`. Defined on `nu.engine.validation.predicate`, bound as a function. Builds `Predicate`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `test` | `Test` |  |  |

Undocumented: example.

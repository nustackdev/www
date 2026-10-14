---
title: conditional
description: "Conditional atoms: value-yielding branch selection."
---

Module `nu.core.conditional`.

Conditional atoms: value-yielding branch selection.

Maps Python's conditional expression (`x if cond else y`) and mapping-based
dispatch onto Nu ScalarQueries. Pure compute; no Context effect of their own.
Siblings to the mutating `IfDo` / `SwitchDo` in `nu.core.flows.control` - same
name family, different sort: the `Do` variants run one of N bodies for
effect and yield nothing; the `Query` variants yield one of N values and
mutate nothing.

Sorts: all ScalarQuery (Q).

Short-circuit: only the taken branch is evaluated - matches Python's
conditional expression, and lets `If(cond, safe, unsafe)` guard the
`unsafe` branch from firing when `cond` is truthy.

Sentinels: the condition or selector decides, so an `EMPTY` one never
passes (per `nu.lang.sentinels`): `If` takes the else branch and
`Switch` matches no key. The taken branch's value, `EMPTY` included,
passes through unchanged.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [If](#if) | `scalar_query` | `If(cond, then, else_)` | The `then` branch if `cond` is truthy, else the `else_` branch. |
| [Switch](#switch) | `scalar_query` | `Switch(selector, cases, default=None)` | The case value whose key matches the selector, or the default. |

## If

The `then` branch if `cond` is truthy, else the `else_` branch.

```python
If(cond, then, else_)
```

Path `nu.core.If`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 3 (3 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cond` |  |  | the condition to test. |
| `then` |  |  | evaluated and yielded when `cond` is truthy. |
| `else_` |  |  | evaluated and yielded when `cond` is falsy. |

**Yields**

The taken branch's value. An EMPTY `cond` counts as false and
takes `else_`.

**Notes**

- Short-circuits: only the taken branch is evaluated, matching Python's `then if cond else else_`. This lets the untaken branch hold work that would fail or be unsafe to run.
- Untyped: wrap it in the Form you want to keep working with, e.g. `nu.Str(nu.If(c, "Admin", "Member")).upper()`.

**Example**

```python
nu.run(nu.If(True, "yes", "no"))[0]
nu.run(nu.If(False, "yes", "no"))[0]
nu.run(nu.Str(nu.If(None, "Admin", "Member")).upper())[0]
```

```
'yes'
'no'
'MEMBER'
```

## Switch

The case value whose key matches the selector, or the default.

```python
Switch(selector, cases, default=None)
```

Path `nu.core.Switch`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 3 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `selector` | `object` |  | the value to match against the case keys. |
| `cases` | `Mapping[object, Term]` |  | a mapping from key to case value. |
| `default` | `object` | `None` | yielded when no key matches. Optional: leave it out to get EMPTY on no match instead. |

**Yields**

The matching case value, or the default when given and nothing
matches. EMPTY when nothing matches and there is no default.

**Notes**

- The case keys are intrinsic constants, kept in the payload rather than as children, so they survive `with_children` unchanged.
- Keys are matched by equality against the selector value, in the mapping's iteration order; the first match wins. An EMPTY selector matches no key.
- Short-circuits: only the matching case value (or the default) is evaluated, not the others.
- Sibling to the mutating `nu.core.flows.control.SwitchDo`, which runs one of N bodies for effect instead of yielding a value.

**Example**

```python
nu.run(nu.Switch(2, {1: "one", 2: "two"}))[0]
nu.run(nu.Switch(9, {1: "one", 2: "two"}, default="none"))[0]
```

```
'two'
'none'
```

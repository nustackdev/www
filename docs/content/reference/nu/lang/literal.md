---
title: literal
description: "Literal: wraps a raw Python value as a Nu term."
---

Module `nu.lang.literal`.

Literal: wraps a raw Python value as a Nu term.

The trivial Query - an irreducible leaf that carries a value in its payload
and yields it once, pure (no effects). Most non-Ref leaves in a Nu program are
Literals.

It lives in `lang` rather than with the atoms in `nu.core` because it is a
language primitive, not a mapping of a Python builtin: `Nu.__init__` wraps
every non-Nu child in one, so `Add(1, 2)` reads the same as
`Add(Literal(1), Literal(2))`. The language cannot construct a tree without
it.

Sorts: ScalarQuery (Q). No children: the value lives entirely in the payload.

Each atom defines `compile` (sync hot path) and `acompile` (async hot
path). Both return a thunk that closes over the payload value and returns it,
ignoring the Runtime.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Literal](#literal) | `scalar_query` | `Literal(value)` | A constant value wrapped as a term. |

## Literal

A constant value wrapped as a term.

```python
Literal(value)
```

Path `nu.lang.Literal`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` | `object` |  | the Python value to carry. Held as-is in the payload, never evaluated or copied. |

**Yields**

`value`, unchanged, every time. Never EMPTY or INVALID on its own -
a Literal has no children to propagate a sentinel from.

**Notes**

- Any tree builder that gets a raw Python value where a term is expected wraps it in a Literal automatically.

**Example**

```python
nu.run(nu.Literal(42))[0]
nu.run(nu.Literal("hi"))[0]
```

```
42
'hi'
```

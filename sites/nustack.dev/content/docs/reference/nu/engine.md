---
title: engine
description: "Nu engine: domain-free Term + Attribute machinery and a dispatch contract."
---

Module `nu.engine`.

Nu engine: domain-free Term + Attribute machinery and a dispatch contract.

Four subpackages, one per phase the engine cares about:

- `engine.structure`   - the alphabet: `Term` and `Attribute`.
- `engine.compilation` - Term -> Program: indexing, attribute sweeps, emit.
- `engine.validation`  - the validate phase: `Law`, `Predicate`, `gate`, `validate`.
- `engine.evaluation`  - the dispatch contract: the `Runtime` Protocol.

The engine knows no sorts, no effects, no execution and holds no global state.
A layer-1 language (Nu, in `nu.lang`) defines kinds, attributes, and the
concrete Runtime that drives compiled Programs.

## compilation.compile

Module `nu.engine.compilation.compile`.

The compile driver: `compile(term, schema) -> Program`.

Three named acts, in order:

1. **index** -- preorder walk, dense nids, structural columns
   (`index.build_index`).
2. **attribute sweeps** -- one pass per computed attribute, in schema topo
   order, direction by flavor (`attribution.sweep_attributes`). Declared
   attributes are class constants and not stored.
3. **emit** -- reverse preorder; each Term's `compile`/`acompile`
   captures its children's thunks (`emit.emit_thunks`).

`Program.__init__` is a dumb constructor that initializes empty columns;
the driver runs all three acts in order. The Program is fully built when
the driver returns.

| Name | Call | Meaning |
| --- | --- | --- |
| [compile](#compile) | `engine.compile(term, schema)` | Compile a Term against a finalized Schema: index, attribute, emit. |

### compile

Compile a Term against a finalized Schema: index, attribute, emit.

```python
engine.compile(term, schema)
```

Path `nu.engine.compile`. Defined on `nu.engine.compilation.compile`, bound as a function. Builds `Program`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `term` | `Term` |  | the root Term of the description. |
| `schema` | `Schema` |  | a finalized `Schema`. A non-finalized schema surfaces as `NotFinalizedError` from `schema.topo_order()`. |

Undocumented: example.

## validation.law

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
| [gate](#gate) | `engine.gate(program)` | Run every law over every node and return every Violation found. |
| [validate](#validate) | `engine.validate(program)` | Run a gate; raise on any error-level Violation, else return the program. |

### gate

Run every law over every node and return every Violation found.

```python
engine.gate(program)
```

Path `nu.engine.gate`. Defined on `nu.engine.validation.law`, bound as a function. Builds `list[Violation]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `program` | `Program` |  |  |

Undocumented: example.

### validate

Run a gate; raise on any error-level Violation, else return the program.

```python
engine.validate(program)
```

Path `nu.engine.validate`. Defined on `nu.engine.validation.law`, bound as a function. Builds `Program`.

Warning-level violations pass through; read them with `gate` directly.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `program` | `Program` |  |  |

Undocumented: example.

## validation.predicate

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
| [predicate](#predicate) | `engine.predicate(test)` | Wrap a `(program, path) -> bool` function as a composable Predicate. |

### predicate

Wrap a `(program, path) -> bool` function as a composable Predicate.

```python
engine.predicate(test)
```

Path `nu.engine.predicate`. Defined on `nu.engine.validation.predicate`, bound as a function. Builds `Predicate`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `test` | `Test` |  |  |

Undocumented: example.

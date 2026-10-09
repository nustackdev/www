---
title: lang
description: "Nu the language, layer 1 on the engine."
---

Module `nu.lang`.

Nu the language, layer 1 on the engine.

`lang` is Nu defined on top of `nu.engine`. Top-level vocabulary:

- `nu`         - the `Nu` base class.
- `kinds`      - the kind taxonomy (`Ref` / `Interaction` / `ScalarQuery` / ...).
- `args`       - argument type aliases (`IntArg`, `StrArg`, ...) for kind signatures.
- `sentinels`  - `EMPTY` / `INVALID` and their guards.
- `attributes` - the attribute concerns (sort, cardinality, effects, execution).
- `laws`       - `LAWS` and the predicate library.
- `runtime`    - `Runtime`, `Context`, `Budget`, lifecycle helpers.
- `helpers`    - top-level user-facing entries (`run`, `eval`, `astream`, ...).

A Term is built from the kind taxonomy, `compile`d against the schema,
then `gate`d or `validate`d, then driven through an entry.

**Modules**

| Module | What |
| --- | --- |
| [`nu.lang.runtime`](/docs/reference/nu/lang/runtime) | Runtime: how Nu programs run. |

## kinds

Module `nu.lang.kinds`.

The Nu kind taxonomy: the user-facing Term classes that declare each sort.

[Full entries](/docs/reference/nu/lang/kinds)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Action](/docs/reference/nu/lang/kinds#action) |  | `Action()` | Abstract: a dual-citizen Interaction. Mutates Context and yields a value. |
| [Bracket](/docs/reference/nu/lang/kinds#bracket) | `bracket` | `Bracket()` | A Span that governs a body's lifecycle. |
| [Command](/docs/reference/nu/lang/kinds#command) | `scalar_command` | `Command()` | A mutating Interaction. Yields nothing; its only sub-shape is scalar. |
| [Control](/docs/reference/nu/lang/kinds#control) | `control` | `Control()` | A Flow that composes Commands under Query parameters. |
| [Flow](/docs/reference/nu/lang/kinds#flow) |  | `Flow()` | Abstract: a Command-composing Interaction. Yields nothing. |
| [Interaction](/docs/reference/nu/lang/kinds#interaction) |  | `Interaction()` | Abstract: a node that interacts with the Context. Never instantiated. |
| [Policy](/docs/reference/nu/lang/kinds#policy) | `policy` | `Policy()` | A Span that governs a body's execution on failure. |
| [Query](/docs/reference/nu/lang/kinds#query) |  | `Query()` | Abstract: a value-producing Interaction. |
| [Reduction](/docs/reference/nu/lang/kinds#reduction) | `reduction` | `Reduction()` | A ScalarQuery that folds a stream child down to one value. |
| [ScalarAction](/docs/reference/nu/lang/kinds#scalaraction) | `scalar_action` | `ScalarAction()` | An Action that mutates and yields exactly one value. |
| [ScalarQuery](/docs/reference/nu/lang/kinds#scalarquery) | `scalar_query` | `ScalarQuery()` | A Query that yields exactly one value. |
| [Span](/docs/reference/nu/lang/kinds#span) |  | `Span()` | Abstract: a transparent Interaction; yields what its body yields. |
| [Strategy](/docs/reference/nu/lang/kinds#strategy) | `strategy` | `Strategy()` | A Flow that composes Commands directly. |
| [StreamAction](/docs/reference/nu/lang/kinds#streamaction) | `stream_action` | `StreamAction()` | An Action that mutates and yields zero or more values. |
| [StreamQuery](/docs/reference/nu/lang/kinds#streamquery) | `stream_query` | `StreamQuery()` | A Query that yields zero or more values. |

## literal

Module `nu.lang.literal`.

Literal: wraps a raw Python value as a Nu term.

[Full entries](/docs/reference/nu/lang/literal)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Literal](/docs/reference/nu/lang/literal#literal) | `scalar_query` | `Literal(value)` | A constant value wrapped as a term. |

## forms

Module `nu.lang.forms`.

Form and TypedNu - the type-wrapping layer.

[Full entries](/docs/reference/nu/lang/forms)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [TypedNu](/docs/reference/nu/lang/forms#typednu) | `scalar_query` | `TypedNu()` | Transparent ScalarQuery passthrough carrying a python type tag `T`. |

## args

Module `nu.lang.args`.

Argument type aliases for Nu kind class signatures.

[Full entries](/docs/reference/nu/lang/args)

| Name | Call | Meaning |
| --- | --- | --- |
| [Arg](/docs/reference/nu/lang/args#arg) | `lang.Arg()` | Create named, parameterized type aliases. |
| [DictArg](/docs/reference/nu/lang/args#dictarg) | `lang.DictArg()` | Create named, parameterized type aliases. |
| [FrozenSetArg](/docs/reference/nu/lang/args#frozensetarg) | `lang.FrozenSetArg()` | Create named, parameterized type aliases. |
| [ListArg](/docs/reference/nu/lang/args#listarg) | `lang.ListArg()` | Create named, parameterized type aliases. |
| [SetArg](/docs/reference/nu/lang/args#setarg) | `lang.SetArg()` | Create named, parameterized type aliases. |
| [TupleArg](/docs/reference/nu/lang/args#tuplearg) | `lang.TupleArg()` | Create named, parameterized type aliases. |

## helpers.evaluation

Module `nu.lang.helpers.evaluation`.

Drive entries: run a compiled Program through the Runtime.

[Full entries](/docs/reference/nu/lang/helpers-evaluation)

| Name | Call | Meaning |
| --- | --- | --- |
| [acollect](/docs/reference/nu/lang/helpers-evaluation#acollect) | `lang.acollect(program, ctx=None, max_parallel=1)` | Async sibling of `collect`. |
| [aeval](/docs/reference/nu/lang/helpers-evaluation#aeval) | `lang.aeval(program, ctx=None, max_parallel=1)` | Drive a Program asynchronously; return `(value, ctx)`. |
| [afirst](/docs/reference/nu/lang/helpers-evaluation#afirst) | `lang.afirst(program, ctx=None, max_parallel=1)` | Async sibling of `first`. |
| [alast](/docs/reference/nu/lang/helpers-evaluation#alast) | `lang.alast(program, ctx=None, max_parallel=1)` | Drain a stream-rooted Program and return the last item; `(value, ctx)`. |
| [collect](/docs/reference/nu/lang/helpers-evaluation#collect) | `lang.collect(program, ctx=None, max_parallel=1)` | Materialize a stream-rooted Program to a list; `(values, ctx)`. |
| [eval](/docs/reference/nu/lang/helpers-evaluation#eval) | `lang.eval(program, ctx=None, max_parallel=1)` | Drive a Program synchronously; return `(value, ctx)`. |
| [eval_in_loop](/docs/reference/nu/lang/helpers-evaluation#eval_in_loop) | `lang.eval_in_loop(program, ctx=None, max_parallel=1)` | Drive an async-only Program from sync code by spinning a loop. |
| [first](/docs/reference/nu/lang/helpers-evaluation#first) | `lang.first(program, ctx=None, max_parallel=1)` | Return the first item of a stream-rooted Program; `(value, ctx)`. |

## helpers.run

Module `nu.lang.helpers.run`.

All-in-one entries: compile, validate, drive in one call.

[Full entries](/docs/reference/nu/lang/helpers-run)

| Name | Call | Meaning |
| --- | --- | --- |
| [arun](/docs/reference/nu/lang/helpers-run#arun) | `lang.arun(term, ctx=None, max_parallel=1)` | Async sibling of `run`: compile, validate, then `aeval`. |
| [run](/docs/reference/nu/lang/helpers-run#run) | `lang.run(term, ctx=None, max_parallel=1)` | Compile a Term, validate it, evaluate it; return `(value, ctx)`. |
| [run_in_loop](/docs/reference/nu/lang/helpers-run#run_in_loop) | `lang.run_in_loop(term, ctx=None, max_parallel=1)` | Compile, validate, then drive on a fresh loop from sync code. |

## attributes

Module `nu.lang.attributes`.

Nu's attributes: one module per concern, plus the schema that assembles them.

[Full entries](/docs/reference/nu/lang/attributes)

| Name | Call | Meaning |
| --- | --- | --- |
| [build_schema](/docs/reference/nu/lang/attributes#build_schema) | `lang.build_schema()` | Build and finalize the Nu schema from every concern's attributes. |

## helpers.compilation

Module `nu.lang.helpers.compilation`.

Nu-specialized compile: binds the finalized Nu SCHEMA.

[Full entries](/docs/reference/nu/lang/helpers-compilation)

| Name | Call | Meaning |
| --- | --- | --- |
| [compile](/docs/reference/nu/lang/helpers-compilation#compile) | `lang.compile(term)` | Compile a Nu Term against the Nu schema; return a runnable Program. |

## nu.engine.validation.law

Module `nu.engine.validation.law`.

Law: a declarative validity rule, plus the verdict primitives and runners.

[Full entries](/docs/reference/nu/lang/nu-engine-validation-law)

| Name | Call | Meaning |
| --- | --- | --- |
| [gate](/docs/reference/nu/lang/nu-engine-validation-law#gate) | `lang.gate(program)` | Run every law over every node and return every Violation found. |

## sentinels

Module `nu.lang.sentinels`.

Sentinels - EMPTY and INVALID.

[Full entries](/docs/reference/nu/lang/sentinels)

| Name | Call | Meaning |
| --- | --- | --- |
| [is_empty](/docs/reference/nu/lang/sentinels#is_empty) | `lang.is_empty(value)` | True if `value` is the EMPTY sentinel. |
| [is_invalid](/docs/reference/nu/lang/sentinels#is_invalid) | `lang.is_invalid(value)` | True if `value` is the INVALID sentinel. |
| [is_sentinel](/docs/reference/nu/lang/sentinels#is_sentinel) | `lang.is_sentinel(value)` | True if `value` is any Sentinel. |

## attributes.sort

Module `nu.lang.attributes.sort`.

Sort attribute: the structural taxonomy of a Term.

[Full entries](/docs/reference/nu/lang/attributes-sort)

| Name | Call | Meaning |
| --- | --- | --- |
| [matrix_sort](/docs/reference/nu/lang/attributes-sort#matrix_sort) | `lang.matrix_sort(sort)` | Resolve `sort` to the matrix sort it slot-fits as, or None. |
| [subsort](/docs/reference/nu/lang/attributes-sort#subsort) | `lang.subsort(sort, ancestor)` | Return whether `sort` is `ancestor` or descends from it in the tree. |

## nu.engine.validation.predicate

Module `nu.engine.validation.predicate`.

Predicate: a composable `(program, path) -> bool` test.

[Full entries](/docs/reference/nu/lang/nu-engine-validation-predicate)

| Name | Call | Meaning |
| --- | --- | --- |
| [predicate](/docs/reference/nu/lang/nu-engine-validation-predicate#predicate) | `lang.predicate(test)` | Wrap a `(program, path) -> bool` function as a composable Predicate. |

## helpers.validation

Module `nu.lang.helpers.validation`.

Nu-specialized validate: binds the Nu LAWS.

[Full entries](/docs/reference/nu/lang/helpers-validation)

| Name | Call | Meaning |
| --- | --- | --- |
| [validate](/docs/reference/nu/lang/helpers-validation#validate) | `lang.validate(program)` | Validate a compiled Program against the Nu law set. |

## typeinfo

Module `nu.lang.typeinfo`.

Recursive type info for shape slots.

[Full entries](/docs/reference/nu/lang/typeinfo)

| Name | Call | Meaning |
| --- | --- | --- |
| [value_type_for](/docs/reference/nu/lang/typeinfo#value_type_for) | `lang.value_type_for(python_type)` | Map a Python primitive type to its `Form` class (`Any` fallback). |

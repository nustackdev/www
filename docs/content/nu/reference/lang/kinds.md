---
title: kinds
description: "The Nu kind taxonomy: the user-facing Term classes that declare each sort."
---

Module `nu.lang.kinds`.

The Nu kind taxonomy: the user-facing Term classes that declare each sort.

A taxonomy of `Nu` subclasses. The leaves (`Ref`, `ScalarQuery`,
`StreamQuery`, `Reduction`, `Command`, `ScalarAction`,
`StreamAction`, `Strategy`, `Control`, `Bracket`, `Policy`) carry
the sort and cardinality bindings concrete nodes use. The interiors
(`Interaction`, `Query`, `Action`, `Flow`, `Span`) are abstract
groupings for `subsort` queries and for the dispatch surface
`Interaction._eval` / `_aeval`.

"Kind" is the Python class of a Term (Ref, Interaction, ...); "sort" is the
attribute concern naming the structural category. This module sits on top
of `nu.lang.nu` (the base) and `nu.lang.attributes` (Sort and
Cardinality value spaces).

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Action](#action) |  | `Action()` | Abstract: a dual-citizen Interaction. Mutates Context and yields a value. |
| [Bracket](#bracket) | `bracket` | `Bracket()` | A Span that governs a body's lifecycle. |
| [Command](#command) | `scalar_command` | `Command()` | A mutating Interaction. Yields nothing; its only sub-shape is scalar. |
| [Control](#control) | `control` | `Control()` | A Flow that composes Commands under Query parameters. |
| [Flow](#flow) |  | `Flow()` | Abstract: a Command-composing Interaction. Yields nothing. |
| [Interaction](#interaction) |  | `Interaction()` | Abstract: a node that interacts with the Context. Never instantiated. |
| [Policy](#policy) | `policy` | `Policy()` | A Span that governs a body's execution on failure. |
| [Query](#query) |  | `Query()` | Abstract: a value-producing Interaction. |
| [Reduction](#reduction) | `reduction` | `Reduction()` | A ScalarQuery that folds a stream child down to one value. |
| [ScalarAction](#scalaraction) | `scalar_action` | `ScalarAction()` | An Action that mutates and yields exactly one value. |
| [ScalarQuery](#scalarquery) | `scalar_query` | `ScalarQuery()` | A Query that yields exactly one value. |
| [Span](#span) |  | `Span()` | Abstract: a transparent Interaction; yields what its body yields. |
| [Strategy](#strategy) | `strategy` | `Strategy()` | A Flow that composes Commands directly. |
| [StreamAction](#streamaction) | `stream_action` | `StreamAction()` | An Action that mutates and yields zero or more values. |
| [StreamQuery](#streamquery) | `stream_query` | `StreamQuery()` | A Query that yields zero or more values. |

## Action

Abstract: a dual-citizen Interaction. Mutates Context and yields a value.

```python
Action()
```

Path `nu.lang.Action`. Kind `Action`. Abstract: a taxonomy base, not an atom you build.

Undocumented: yields, example.

## Bracket

A Span that governs a body's lifecycle.

```python
Bracket()
```

Path `nu.lang.Bracket`. Kind `Bracket`, sort `bracket`, cardinality `transparent`. Abstract: a taxonomy base, not an atom you build.

Undocumented: yields, example.

## Command

A mutating Interaction. Yields nothing; its only sub-shape is scalar.

```python
Command()
```

Path `nu.lang.Command`. Kind `Command`, sort `scalar_command`, cardinality `void`. Abstract: a taxonomy base, not an atom you build.

Undocumented: yields, example.

## Control

A Flow that composes Commands under Query parameters.

```python
Control()
```

Path `nu.lang.Control`. Kind `Control`, sort `control`, cardinality `void`. Abstract: a taxonomy base, not an atom you build.

Undocumented: yields, example.

## Flow

Abstract: a Command-composing Interaction. Yields nothing.

```python
Flow()
```

Path `nu.lang.Flow`. Kind `Flow`, cardinality `void`. Abstract: a taxonomy base, not an atom you build.

Undocumented: yields, example.

## Interaction

Abstract: a node that interacts with the Context. Never instantiated.

```python
Interaction()
```

Path `nu.lang.Interaction`. Kind `Interaction`. Abstract: a taxonomy base, not an atom you build.

Concrete sub-kinds implement `_eval` / `_aeval` to drive execution.
Both receive the per-execution `Runtime` and the node's `nid` (its
integer position in the attributed program); they recurse via
`rt.eval(child_nid)` and reach for `self._children` / `self._payload`
directly. Attribute reads use `rt.program.attrs[name][nid]`.

Undocumented: yields, example.

## Policy

A Span that governs a body's execution on failure.

```python
Policy()
```

Path `nu.lang.Policy`. Kind `Policy`, sort `policy`, cardinality `transparent`. Abstract: a taxonomy base, not an atom you build.

Undocumented: yields, example.

## Query

Abstract: a value-producing Interaction.

```python
Query()
```

Path `nu.lang.Query`. Kind `Query`. Abstract: a taxonomy base, not an atom you build.

Undocumented: yields, example.

## Reduction

A ScalarQuery that folds a stream child down to one value.

```python
Reduction()
```

Path `nu.lang.Reduction`. Kind `Reduction`, sort `reduction`, cardinality `scalar`. Abstract: a taxonomy base, not an atom you build.

Undocumented: yields, example.

## ScalarAction

An Action that mutates and yields exactly one value.

```python
ScalarAction()
```

Path `nu.lang.ScalarAction`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`. Abstract: a taxonomy base, not an atom you build.

Undocumented: yields, example.

## ScalarQuery

A Query that yields exactly one value.

```python
ScalarQuery()
```

Path `nu.lang.ScalarQuery`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Abstract: a taxonomy base, not an atom you build.

Undocumented: yields, example.

## Span

Abstract: a transparent Interaction; yields what its body yields.

```python
Span()
```

Path `nu.lang.Span`. Kind `Span`, cardinality `transparent`. Abstract: a taxonomy base, not an atom you build.

Undocumented: yields, example.

## Strategy

A Flow that composes Commands directly.

```python
Strategy()
```

Path `nu.lang.Strategy`. Kind `Strategy`, sort `strategy`, cardinality `void`. Abstract: a taxonomy base, not an atom you build.

Undocumented: yields, example.

## StreamAction

An Action that mutates and yields zero or more values.

```python
StreamAction()
```

Path `nu.lang.StreamAction`. Kind `StreamAction`, sort `stream_action`, cardinality `stream`. Abstract: a taxonomy base, not an atom you build.

The stream-shaped twin of ScalarAction: one atomic mutate-and-yield-many
(drain a queue, `DELETE ... RETURNING` over a predicate). A scalar
consumer must reduce it like any StreamQuery; the cardinality law gates
that off `cardinality` alone, with no per-kind special case.

Undocumented: yields, example.

## StreamQuery

A Query that yields zero or more values.

```python
StreamQuery()
```

Path `nu.lang.StreamQuery`. Kind `StreamQuery`, sort `stream_query`, cardinality `stream`. Abstract: a taxonomy base, not an atom you build.

Undocumented: yields, example.

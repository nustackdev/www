---
title: interactions
description: "Inspection atoms: the info records rendered as docs an agent can read."
---

Module `nu.inspect.interactions`.

Inspection atoms: the info records rendered as docs an agent can read.

One atom, `Inspect`, that resolves a dotted path to a module or a Nu
subject (Form, Ref, Interaction) and yields the same six-section format the
author wrote by hand - summary, description, args, notes, yields, examples -
laid out for reading, not for programmatic descent. When an agent needs to
know what an atom takes or what a module exposes, it composes `Inspect`
into its program, evaluates, and reads the yielded string.

Keeping this atom-shaped (rather than a Python helper) is deliberate: the
lookup is composable with the rest of an agent's Nu, and the result flows
back through the same observation path as any other yield.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Inspect](#inspect) | `scalar_query` | `Inspect(path)` | Docs for a Nu module or subject, as formatted text. |
| [render](#render) |  | `inspect.render(path)` | Resolve `path` and render whatever it points at, or empty on miss. |

## Inspect

Docs for a Nu module or subject, as formatted text.

```python
Inspect(path)
```

Path `nu.inspect.Inspect`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` |  |  | a dotted path. A module (`nu.core.arithmetic`, `myapp.shapes`), a fully qualified subject (`nu.core.arithmetic.Add`, `myapp.shapes.Task`), or one entry of a declared class (`myapp.shapes.Task.title`). Resolution imports the longest module prefix, then walks what is left. |

**Yields**

The formatted text. INVALID when the path resolves to nothing that
nu.inspect can describe.

**Notes**

- Yields a string laid out for reading, not a structured record. The shape is stable but not part of the contract - treat it as docs.
- A module renders its own docstring, then every Shape, Service, Form, Ref, Interaction and free function it holds, one line each.
- An atom renders the full record for that one subject, and so does a free function such as `nustd.math.sqrt`.
- A Shape or Service renders its prose and one line per entry, never the entries themselves: the reader descends by looking up the entry path it wants. Walking through a nested Shape slot works the same way, so `myapp.Task.owner.email` resolves.

**Example**

```python
nu.run(nu.inspect.Inspect("nu.core.arithmetic"))[0].splitlines()[0]
```

```
'MODULE  nu.core.arithmetic'
```

## render

Resolve `path` and render whatever it points at, or empty on miss.

```python
inspect.render(path)
```

Path `nu.inspect.render`. Defined on `nu.inspect.interactions`, bound as a function. Builds `str`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str` |  |  |

Undocumented: example.

---
title: interaction
description: "The interaction kind: record, parse, verify."
---

Module `nu.inspect.interaction`.

The interaction kind: record, parse, verify.

An interaction is an atom: an `nu.lang.kinds.Interaction` subclass. It is a
node in the tree, with children and a kind/sort/cardinality declared on the
class. Its args come from the docstring when the constructor is variadic;
its yields come from the docstring (there is no return annotation on
`_compile`). What the code says is derived here; what the docstring says is
read; the two are checked against each other by the shared laws.

| Name | Call | Meaning |
| --- | --- | --- |
| [catalogue_interactions](#catalogue_interactions) | `inspect.catalogue_interactions(module)` | A record per interaction the module exports, in export order. |
| [parse_interaction](#parse_interaction) | `inspect.parse_interaction(atom, path='', aliases=())` | One InteractionRecord for `atom`. |
| [verify_interaction](#verify_interaction) | `inspect.verify_interaction(atom)` | Every way `atom`'s docstring lies about the code. |

## catalogue_interactions

A record per interaction the module exports, in export order.

```python
inspect.catalogue_interactions(module)
```

Path `nu.inspect.catalogue_interactions`. Defined on `nu.inspect.interaction`, bound as a function. Builds `tuple[InteractionRecord, ...]`.

Forms and Refs are excluded. Both are Interaction subclasses by
inheritance, so a naive check reports every Form twice - once here and
once in the Form catalogue - and the three catalogues stop partitioning
the module. Same most-specific-wins dispatch `Inspect` uses on a single
class.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `module` | `ModuleType` |  |  |

Undocumented: example.

## parse_interaction

One InteractionRecord for `atom`.

```python
inspect.parse_interaction(atom, path='', aliases=())
```

Path `nu.inspect.parse_interaction`. Defined on `nu.inspect.interaction`, bound as a function. Builds `InteractionRecord`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `atom` | `type` |  |  |
| `path` | `str` | `''` |  |
| `aliases` | `tuple[str, ...]` | `()` |  |

Undocumented: example.

## verify_interaction

Every way `atom`'s docstring lies about the code.

```python
inspect.verify_interaction(atom)
```

Path `nu.inspect.verify_interaction`. Defined on `nu.inspect.interaction`, bound as a function. Builds `list[Violation]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `atom` | `type` |  |  |

Undocumented: example.

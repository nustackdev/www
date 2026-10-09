---
title: module
description: "The module kind: record and parse."
---

Module `nu.inspect.module`.

The module kind: record and parse.

A module is written to the same format its subjects are, and its docstring is
the only place the thing they have in common is said: what this surface is
for, what it is not, what holds across all of it. A page over a module opens
with it, and an agent pointed at one reads it before any name in it.

So it is parsed once, here, rather than read raw wherever somebody needs it.
There is no `verify_module`: a module is not called, does not evaluate and
has no arity, so there is nothing for the code to contradict. Summary,
description, notes and examples are the whole surface, and absence of any of
them is data like everywhere else.

A module's catalogue is a separate question, answered by the per-kind
`catalogue` functions. This record is the prose only.

| Name | Call | Meaning |
| --- | --- | --- |
| [parse_module](#parse_module) | `inspect.parse_module(module, path='')` | One ModuleRecord for `module`. |

## parse_module

One ModuleRecord for `module`.

```python
inspect.parse_module(module, path='')
```

Path `nu.inspect.parse_module`. Defined on `nu.inspect.module`, bound as a function. Builds `ModuleRecord`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `module` | `ModuleType` |  |  |
| `path` | `str` | `''` |  |

Undocumented: example.

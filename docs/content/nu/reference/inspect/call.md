---
title: call
description: "The call kind: record, parse, verify."
---

Module `nu.inspect.call`.

The call kind: record, parse, verify.

A call is a callable a person or a model writes to build Nu: a bound method
like `.set(v)`, an operator like `a + b`, a classmethod like
`List.of(x, y)`, or a free function like `nu.str(x)`. What differs across
them is the syntax and where it is bound; the described thing is the same.

Signature and return annotation are authoritative for args and yields, so
neither is written; the docstring's job is summary and notes.

A call is reached two ways: off a class, by the MRO walk the builder kinds
run, or off a module, by the catalogue here - which is what the `nustd`
surfaces are made of.

| Name | Call | Meaning |
| --- | --- | --- |
| [catalogue_calls](#catalogue_calls) | `inspect.catalogue_calls(module)` | A CallRecord per free function the module exports, in export order. |
| [parse_call](#parse_call) | `inspect.parse_call(target, name, path, owner, binding, qualifier='', aliases=())` | One CallRecord for `target`, however it was reached. |
| [verify_call](#verify_call) | `inspect.verify_call(target, subject='')` | Every way `target`'s docstring lies about the format. |

## catalogue_calls

A CallRecord per free function the module exports, in export order.

```python
inspect.catalogue_calls(module)
```

Path `nu.inspect.catalogue_calls`. Defined on `nu.inspect.call`, bound as a function. Builds `tuple[CallRecord, ...]`.

The other catalogues filter a module for a kind of class. This one is for
the surfaces that export no classes at all: `nustd.math` is 34 plain
functions that build Nu terms, and without this every std submodule reads
as exporting nothing.

The qualifier is the module's last name part, because that is how the
function is written: `from nustd import math`, then `math.sqrt(x)`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `module` | `ModuleType` |  |  |

Undocumented: example.

## parse_call

One CallRecord for `target`, however it was reached.

```python
inspect.parse_call(target, name, path, owner, binding, qualifier='', aliases=())
```

Path `nu.inspect.parse_call`. Defined on `nu.inspect.call`, bound as a function. Builds `CallRecord`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `target` | `object` |  |  |
| `name` | `str` |  |  |
| `path` | `str` |  |  |
| `owner` | `str` |  |  |
| `binding` | `str` |  |  |
| `qualifier` | `str` | `''` |  |
| `aliases` | `tuple[str, ...]` | `()` |  |

Undocumented: example.

## verify_call

Every way `target`'s docstring lies about the format.

```python
inspect.verify_call(target, subject='')
```

Path `nu.inspect.verify_call`. Defined on `nu.inspect.call`, bound as a function. Builds `list[Violation]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `target` | `object` |  |  |
| `subject` | `str` | `''` |  |

Undocumented: example.

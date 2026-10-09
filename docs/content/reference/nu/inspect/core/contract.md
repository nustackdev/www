---
title: contract
description: "The docstring contract: what a written fact may not lie about."
---

Module `nu.inspect.core.contract`.

The docstring contract: what a written fact may not lie about.

Sits between the readers and the kinds. Knows the contract and nothing else:
not Nu, not what an interaction is. Shared by every kind, which is what stops
each one re-deriving the same rules.

- `sections` names the sections, once.
- `call` merges the two sources into the call form, and renders it back.
- `check` is one law per section, returning violations rather than raising.
  Absence of a section is not a violation; it is empty data on the record.

## call

Module `nu.inspect.core.contract.call`.

The call form: what a thing is written with.

Neither source is enough on its own. A signature carries names, defaults and
the variadic tail but says nothing about meaning. A docstring carries the
meaning, and for anything on an inherited variadic constructor it is the only
place the real argument list exists at all.

So they are merged here, which is the contract's job rather than either
reader's: the signature wins on structure when it has any, the docstring
supplies the prose, and when the signature has nothing to say the docstring
stands alone.

Rendering the merged arguments back into the string a person writes is here
too, for the same reason: an atom whose arguments exist only in its docstring
still has a call form, so the renderer has to run off the merge rather than
off either source.

| Name | Call | Meaning |
| --- | --- | --- |
| [call_form](#call_form) | `contract.call_form(target, blocks, receiver=False)` | The arguments `target` is written with, in order. |
| [render_args](#render_args) | `contract.render_args(name, args)` | A call form: `name(a, b=default, *rest)`. |

### call_form

The arguments `target` is written with, in order.

```python
contract.call_form(target, blocks, receiver=False)
```

Path `nu.inspect.core.contract.call_form`. Defined on `nu.inspect.core.contract.call`, bound as a function. Builds `tuple[Arg, ...]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `target` | `object` |  | the object being described. |
| `blocks` | `Blocks` |  | its docstring, split. |
| `receiver` | `bool` | `False` | whether `target` is an unbound method, whose leading `self` is the receiver and not an argument anybody writes. |

Undocumented: example.

### render_args

A call form: `name(a, b=default, *rest)`.

```python
contract.render_args(name, args)
```

Path `nu.inspect.core.contract.render_args`. Defined on `nu.inspect.core.contract.call`, bound as a function. Builds `str`.

The one place a call form is spelled, so every kind's record agrees on it
and no consumer reassembles one from the arguments itself.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `str` |  |  |
| `args` | `tuple[Arg, ...]` |  |  |

Undocumented: example.

## check

Module `nu.inspect.core.contract.check`.

The laws every kind shares: what a docstring may not lie about.

A violation is a written fact that contradicts the code, or a section written
in a form the format does not allow. A missing section is not a violation: it
is absence, already carried by the record as an empty field, and the
consumer decides whether to care.

Each check returns violations and never raises. A kind composes the checks
its subject can be held to and adds its own.

Where a rule cannot be decided the subject is left alone rather than flagged.
These run over the whole stack at once, so a false positive costs more than a
miss: it sends someone to rewrite a docstring that was already right.

| Name | Call | Meaning |
| --- | --- | --- |
| [check_absent](#check_absent) | `contract.check_absent(subject, blocks, rule)` | A section the subject cannot honestly have must not be written. |
| [check_args](#check_args) | `contract.check_args(subject, blocks, expected)` | An Args section that is present must agree with the code's arity. |
| [check_example](#check_example) | `contract.check_example(subject, blocks)` | Every written example must be parseable and, when doctest, carry a value. |
| [check_summary](#check_summary) | `contract.check_summary(subject, blocks)` | A summary that is present must be one line, ending in a period. |

### check_absent

A section the subject cannot honestly have must not be written.

```python
contract.check_absent(subject, blocks, rule)
```

Path `nu.inspect.core.contract.check_absent`. Defined on `nu.inspect.core.contract.check`, bound as a function. Builds `list[Violation]`.

The mirror of the other laws. They ask whether a written fact matches the
code; this one asks whether the fact was writable at all. It is for the
kinds where the format's own rule - write only what cannot be read -
*removes* a section rather than requiring one: a declared class that is
never called takes no arguments and yields nothing, so an Args or Yields
on it is not clumsy wording but a claim about a call that does not exist.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `subject` | `str` |  |  |
| `blocks` | `Blocks` |  |  |
| `rule` | `str` |  |  |

Undocumented: example.

### check_args

An Args section that is present must agree with the code's arity.

```python
contract.check_args(subject, blocks, expected)
```

Path `nu.inspect.core.contract.check_args`. Defined on `nu.inspect.core.contract.check`, bound as a function. Builds `list[Violation]`.

A docstring that documents three arguments for a two-argument thing reads
as authoritative and is unrecoverable for anyone following it, because the
truth is nowhere in the text. Absence is not a violation and is not
checked here.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `subject` | `str` |  |  |
| `blocks` | `Blocks` |  |  |
| `expected` | `int \| None` |  |  |

Undocumented: example.

### check_example

Every written example must be parseable and, when doctest, carry a value.

```python
contract.check_example(subject, blocks)
```

Path `nu.inspect.core.contract.check_example`. Defined on `nu.inspect.core.contract.check`, bound as a function. Builds `list[Violation]`.

Absence is not a violation. An Example section holding multiple worked
examples is checked per example; each one that lies about the format is
reported on its own.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `subject` | `str` |  |  |
| `blocks` | `Blocks` |  |  |

Undocumented: example.

### check_summary

A summary that is present must be one line, ending in a period.

```python
contract.check_summary(subject, blocks)
```

Path `nu.inspect.core.contract.check_summary`. Defined on `nu.inspect.core.contract.check`, bound as a function. Builds `list[Violation]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `subject` | `str` |  |  |
| `blocks` | `Blocks` |  |  |

Undocumented: example.

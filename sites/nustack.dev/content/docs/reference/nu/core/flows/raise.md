---
title: raise_
description: "Raise: raise an exception at run time."
---

Module `nu.core.flows.raise_`.

Raise: raise an exception at run time.

Nu's Sort taxonomy has no bare "effect" sort. A Command must declare a
mutation (the `command_has_write` law), and raising touches no fabric --
so Raise sits in the Control seat instead. A Control is a Flow that composes
Commands under Query parameters; Raise takes a single value parameter (the
message) and no body slots. That leaves the sort semantics clean:

- `Sort.CONTROL` is a subsort of `Sort.FLOW`, so a `Raise` slots into
  any Flow body position (an `IfDo` body, a `Sequential` arm, ...).
- The param slot (slot 0, the msg) is yielding -- satisfies
  `control_param_yielders`.
- No body slots, so `flow_body_is_mutator` is trivially satisfied.

Wire-up:

- `exc_cls` is a plain Python class captured in the atom's payload -- the
  exception type is a structural detail of the tree, not run-time data.
- `msg` is any Nu expression yielding a value (typically a str). If the
  message resolves to a sentinel (`EMPTY` / `INVALID`) the raise is
  skipped -- "the condition is not yet ready", not "raise something
  obscured".

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Raise](#raise) | `control` | `Raise(msg, exc_cls=RuntimeError)` | Raise `exc_cls(msg)` at run time. |
| [raise_](#raise_) |  | `flows.raise_(exc_cls, msg)` | Build a `Raise` node. Wrap in `IfDo` to gate. |

## Raise

Raise `exc_cls(msg)` at run time.

```python
Raise(msg, exc_cls=RuntimeError)
```

Path `nu.core.flows.Raise`. Kind `Control`, sort `control`, cardinality `void`. Arity 2 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `msg` | `Nu` |  | any Nu expression yielding a value (typically a str). |
| `exc_cls` | `type[BaseException]` | `RuntimeError` |  |

**Yields**

Never returns normally; raises `exc_cls(msg)` or skips.

**Notes**

- A leaf Control: one param slot (the msg), no body slots, so `flow_body_is_mutator` is trivially satisfied.
- `exc_cls` is a plain Python class captured in the payload, not a child - the exception type is a structural detail of the tree, not run-time data.
- If `msg` resolves to EMPTY or INVALID the raise is skipped: "the condition is not yet ready", not "raise something obscured".

**Example**

```python
try:
    nu.run(nu.raise_(ValueError, "boom"))
except ValueError as e:
    print(e)
```

```
boom
```

## raise_

Build a `Raise` node. Wrap in `IfDo` to gate.

```python
flows.raise_(exc_cls, msg)
```

Path `nu.core.flows.raise_`. Defined on `nu.core.flows.raise_`, bound as a function. Builds `Raise`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `exc_cls` | `type[BaseException]` |  | the exception type to raise. |
| `msg` | `object` |  | any Nu expression yielding a value - a string literal, a `Str(...)`, string concat, or a formatting host callable. |

Undocumented: example.

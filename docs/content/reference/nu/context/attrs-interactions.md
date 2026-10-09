---
title: attrs.interactions
description: "Attr-fabric interactions: `SetCmd`, `Delete`, `AttrExists`, `Let`."
---

Module `nu.context.attrs.interactions`.

Attr-fabric interactions: `SetCmd`, `Delete`, `AttrExists`, `Let`.

The write ops (`SetCmd` / `Delete`) delegate to the Ref
(`ref._write` / `ref._erase`) so the write mechanism lives with the fabric,
not hardcoded here. `AttrExists` complements the dual-role read: an
unbound read yields EMPTY, which a bound EMPTY would alias, so existence needs
an explicit query.

`Let` is a scoped attr binding: a Bracket that pushes `name -> value` into
`ctx.attrs` for the body's duration and restores the prior slot on exit
(also on exception). It lives here (not with the fabric-lifecycle brackets in
`context/fabric/lifecycle.py`) because the binding it governs is a scratch
attr, not a fabric instance - same axis as `SetCmd` / `AttrRef`, just
scoped rather than open-ended.

Each interaction holds its Ref in a mutation or read slot; effect synthesis
binds it to the right effect on the attrs fabric.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AttrExists](#attrexists) | `scalar_query` | `AttrExists(ref)` | Whether the address of its `AttrRef` is bound in `ctx.attrs`. |
| [Delete](#delete) | `scalar_command` | `Delete(ref)` | Removes the slot its Ref names from the fabric, through that Ref. |
| [Let](#let) | `bracket` | `Let(name, value, body=None)` | Binds a name to a value in `ctx.attrs` for the body's duration. |
| [SetCmd](#setcmd) | `scalar_command` | `SetCmd(ref, value)` | Writes a value into the slot its Ref names, through that Ref. |

## AttrExists

Whether the address of its `AttrRef` is bound in `ctx.attrs`.

```python
AttrExists(ref)
```

Path `nu.context.AttrExists`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the `AttrRef` whose address is resolved and looked up. |

**Yields**

True or False, never a sentinel. An address that resolves to EMPTY or
INVALID is looked up as a key like any other, and is simply absent.

**Notes**

- Normally written as `AttrRef(...).exists()` rather than built by hand.
- Exists because the dual-role read cannot answer the question: an unbound slot yields EMPTY, and so does a slot holding EMPTY.
- Only the address is resolved; the slot's value is never read.

**Examples**

```python
nu.run(nu.AttrRef("x").exists())[0]
```

```
False
```

```python
nu.run(nu.Let("x", 1, nu.AttrRef("x").exists()))[0]
```

```
True
```

## Delete

Removes the slot its Ref names from the fabric, through that Ref.

```python
Delete(ref)
```

Path `nu.context.Delete`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 1 (1 required).

Same shape as `SetCmd`: the Ref is the declared mutation slot and
the erase is delegated to it, so this drives any fabric Ref rather than
only `AttrRef`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the Ref naming the slot to remove. This is the mutation slot. |

**Yields**

Nothing (VOID). The erase is the point.

**Notes**

- Removing a slot that is not bound is a no-op, not an error.
- Deleting is not the same as holding EMPTY: after a delete `.exists()` yields False, whereas a slot `Let` bound to EMPTY reads EMPTY and still exists.

**Example**

```python
bind = nu.SetCmd(nu.AttrRef("a"), 1)
nu.run(nu.Sequential(bind, nu.Delete(nu.AttrRef("a"))))[1].attrs
```

```
Attributes()
```

## Let

Binds a name to a value in `ctx.attrs` for the body's duration.

```python
Let(name, value, body=None)
```

Path `nu.context.Let`. Kind `Bracket`, sort `bracket`, cardinality `transparent`. Arity 3 (2 required).

Evaluates `value` once, pushes it into `ctx.attrs` under `name`,
runs `body`, then restores the prior slot on the way out - on a clean
exit and on an exception alike. The body reads the binding back through
`AttrRef(name)` (or any typed variant), so the one value can be
dereferenced any number of times without recomputing it.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `object` |  | evaluated at run time and required to be a `str`. A Python `str` is wrapped in a `Literal` at construction, so the common case is written with a plain name. |
| `value` | `object` |  | evaluated once, before the body runs. |
| `body` | `Nu \| None` | `None` | runs with the binding in place. Required despite the default. |

**Yields**

Whatever `body` yields, in the body's own cardinality. Transparent
like any Span: a Command body makes `Let` a writer, a stream body
makes it a stream.

**Notes**

- Scoped where `SetCmd` is open-ended. `SetCmd` leaves a slot on the context the run returns; a `Let` binding never leaks past its body. Reach for `SetCmd` when the write is the point, `Let` when the binding is a local.
- Nesting shadows: an inner `Let` on the same name hides the outer one, and the outer value comes back when the inner body ends.
- Unlike `SetCmd`, an EMPTY or INVALID `value` is still bound, so the slot exists and reads back as that sentinel.
- Over a stream body the binding spans the whole drain, and is popped when the stream is exhausted.
- Children are ordered `[body, value, name]`; the body sits in slot 0 to satisfy the Span transparency law.

**Examples**

```python
nu.run(nu.Let("n", 7, nu.Add(nu.AttrRef("n"), 1)))[0]
```

```
8
```

```python
nu.run(nu.Let("n", 2, nu.Let("n", 5, nu.Mul(nu.AttrRef("n"), 10))))[0]
```

```
50
```

```python
nu.run(nu.Let("n", 7, nu.AttrRef("n")))[1].attrs
```

```
Attributes()
```

## SetCmd

Writes a value into the slot its Ref names, through that Ref.

```python
SetCmd(ref, value)
```

Path `nu.context.SetCmd`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 2 (2 required).

The Command never touches `ctx.attrs` itself. It hands the Ref its own
node id, the Ref resolves its address and performs the write, which is
what lets `SetCmd` drive any fabric Ref and not just `AttrRef`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the Ref naming the slot to write. This is the mutation slot, so effect synthesis binds it WRITE; every other slot is a read. |
| `value` |  |  | evaluated once, and its result is what lands in the slot. |

**Yields**

Nothing (VOID). The write is the point.

**Notes**

- An EMPTY or INVALID `value` writes nothing at all, so a slot that was already bound keeps whatever it held.
- The write is open-ended: it lives on the context the run returns. `Let` is the scoped dual, binding only for a body's duration.

**Examples**

```python
nu.run(nu.SetCmd(nu.AttrRef("total"), 10))[1].attrs
```

```
Attributes(total=10)
```

```python
first = nu.SetCmd(nu.AttrRef("a"), 1)
nu.run(nu.Sequential(first, nu.SetCmd(nu.AttrRef("a"), nu.AttrRef("no"))))[1].attrs
```

```
Attributes(a=1)
```

---
title: refs.prog
description: "Virtuals-substrate ref for a stored Nu program."
---

Module `nustd.kv.refs.prog`.

Virtuals-substrate ref for a stored Nu program.

`ProgramRef` is a leaf whose stored value is python source text and whose
value interface is `Program`. That makes a program a
first-class slot on a Shape:

```python
class App(Shape):
    job = ProgramRef.slot()

run(App.job.set(SOURCE), ctx)
run(App.job.run(), ctx)
```

No codec, unlike its neighbours in `std`. `DecimalRef` and friends
override `_lift` / `set` because their domain type is not what the
substrate can hold; a program is source text on both sides, so the stored
form *is* the domain form and there is nothing to translate. The mixin is
carrying an interface, not a representation.

MRO note: `ItemRef` comes first, `Program` second. That order decides
whose `_compile` and whose declared `sort` win, and getting it backwards
is silent - see the class docstring.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ProgramRef](#programref) | `ref` | `ProgramRef(address, parent_ref=None, owner_shape=None)` | A Nu program stored as source text in a KV leaf, with the Program verbs. |

## ProgramRef

A Nu program stored as source text in a KV leaf, with the Program verbs.

```python
ProgramRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.kv.ProgramRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Reading it yields the source verbatim, the same as any str leaf. What the
Program surface adds is the ability to turn that stored text into a tree
and run it, so a program becomes a value a shape can hold, write and
replace at run time.

**Notes**

- No codec: source text is both the stored form and the value form, unlike the std refs that translate between the two.
- The base order is load-bearing. `ItemRef` first makes the class a ref that reads storage; with `Program` first the passthrough would win and the ref would yield its parent instead of the stored value, silently, with no fabric touch recorded.
- Construction errors surface when the stored source is loaded or run, not when it is written, so bad source stores fine.

**Example**

```python
class App(Shape):
    job = ProgramRef.slot()
run(App.job.set(SOURCE), ctx)
run(App.job.run(), ctx)
```

**Inherited methods**

From `nu.domains.shape.forms.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

From `nu.domains.shape.forms.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(value)` | `SetCmd` | Build a `SetCmd`. |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.forms.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Exists` | Build an `Exists` query. |
| `.missing()` | `Missing` | Build a `Missing` query. |

From `nu.prog.forms.Program`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.load(entry='out', scope=None, filename='<nu program>', brace=<UNSET>, rewrite=None)` | `Nu` | Construct the term without running it. |
| `.run(entry='out', scope=None, filename='<nu program>', brace=<UNSET>, rewrite=None, on_error=None)` | `Nu` | Construct the term and drive it. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

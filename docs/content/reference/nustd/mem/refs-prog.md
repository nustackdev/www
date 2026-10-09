---
title: refs.prog
description: "Dict-substrate ref for a stored Nu program."
---

Module `nustd.mem.refs.prog`.

Dict-substrate ref for a stored Nu program.

`ProgramRef` is a slot in the nested-dict substrate whose stored value is
python source text and whose value interface is
`Program`. That makes a program a first-class slot on
a Shape:

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
| [ProgramRef](#programref) | `ref` | `ProgramRef(address, parent_ref=None, owner_shape=None)` | A slot holding Nu program source, with the Program verbs on it. |

## ProgramRef

A slot holding Nu program source, with the Program verbs on it.

```python
ProgramRef(address, parent_ref=None, owner_shape=None)
```

Path `nustd.mem.ProgramRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

The stored value is Python source text defining `out()`, and the same
text on both sides: no codec, unlike the `std` refs whose domain type
the substrate cannot hold. What the `Program` mixin adds is the
interface - `load` constructs the tree the source describes, `run`
constructs it and evaluates it - so a program becomes a field like any
other, written and rewritten while the app is up.

**Notes**

- Base order is load-bearing. `ItemRef` reaches `RefBase`, which declares `Sort.REF` and compiles to a fabric read; `Program` reaches `TypedNu`, which declares a scalar query and compiles to a passthrough over child 0. Flipped, `TypedNu` wins both: the ref yields its parent ref instead of the stored value and the effect machinery stops seeing a fabric touch, silently.
- Reading the ref yields the source verbatim; the `Program` calls are what turn it into a tree.
- `run` on a slot that was never written raises rather than yielding a sentinel: construction gets EMPTY where it wants source.

**Example**

```python
class App(nu.Shape):
    job = nustd.mem.ProgramRef.slot()
source = '''
import nu

def out():
    return nu.Add(1, 2)
'''
ctx = nu.Context().bind(dict, {}, App)
_ = nu.run(App.job.set(source), ctx)
nu.run(App.job.run(), ctx)[0]
```

```
3
```

**Inherited methods**

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

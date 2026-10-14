---
title: refs.prog
description: "mem program leaf: Nu source stored in a slot, runnable from it."
---

Module `nu.mem.refs.prog`.

mem program leaf: Nu source stored in a slot, runnable from it.

The stored form is the value form (source text on both sides), so the leaf
carries an interface rather than a codec. The base order is load-bearing: the
leaf comes first so the ref reads storage; see the class docstring.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ProgramRef](#programref) | `ref` | `ProgramRef(address, parent_ref=None, owner_shape=None)` | A slot holding Nu program source, with the Program verbs on it. |

## ProgramRef

A slot holding Nu program source, with the Program verbs on it.

```python
ProgramRef(address, parent_ref=None, owner_shape=None)
```

Path `nu.mem.ProgramRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

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
    job = nu.ProgramRef.slot()
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

From `nu.domains.shape.item.MutableItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.set(value)` | `SetCmd` | Build a `SetCmd`. |
| `.erase()` | `Erase` | Build an `Erase`. |
| `.init(value)` | `IfDo` | Set `value` iff the leaf is currently missing. |

From `nu.domains.shape.item.ItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Bool` | Whether this slot holds a value, as a `Bool`. |
| `.missing()` | `Bool` | Whether this slot holds no value, as a `Bool`: the negation of `exists()`. |

From `nu.prog.forms.Program`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.load(entry='out', scope=None, filename='<nu program>', brace=<UNSET>, rewrite=None)` | `Nu` | Construct the term without running it. |
| `.run(entry='out', scope=None, filename='<nu program>', brace=<UNSET>, rewrite=None, on_error=None)` | `Nu` | Construct the term and drive it. |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a == b` | `Bool` | Self equal to other by value: an `Eq` term, never a Python bool. |
| `a != b` | `Bool` | Self not equal to other by value: a `Ne` term, never a Python bool. |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

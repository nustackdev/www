---
title: refs.prog
description: "kv program leaf: Nu source stored in a slot, runnable from it."
---

Module `nustd.kv.refs.prog`.

kv program leaf: Nu source stored in a slot, runnable from it.

The stored form is the value form (source text on both sides), so the leaf
carries an interface rather than a codec. The base order is load-bearing: the
leaf comes first so the ref reads storage; see the class docstring.

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

From `nu.domains.shape.item.ReactiveItemForm`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.on_change()` | `OnPrimitiveChange` | Subscribe to changes on this leaf. |

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

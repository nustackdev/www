---
title: attrs.refs
description: "`Attr`: the tree's one read of `ctx.attrs`."
---

Module `nu.context.attrs.refs`.

`Attr`: the tree's one read of `ctx.attrs`.

An `Attr` names a key in `ctx.attrs` by its resolved address (any child
that yields a value) and self-yields what an interaction bound there. It only
reads: interactions write attrs in their own compile, and the tree never does.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Attr](#attr) | `ref` | `Attr(address)` | Reads the value an interaction handed its body under a name. |

## Attr

Reads the value an interaction handed its body under a name.

```python
Attr(address)
```

Path `nu.context.Attr`. Kind `Ref`, sort `ref`, cardinality `scalar`.

A loop binds its item, a fold its accumulator, a catch the error, a retry
the attempt, a reaction the key that changed. `Attr(name)` is how the
body reads it. A body written as a lambda never spells one out: the
interaction mints the name and hands the lambda an `Attr` over it. The
sole child is the address, evaluated through the runtime like any other
child, so a name can be fixed at write time or computed at run time.

**Notes**

- Read-only. Nothing in the tree binds or reassigns a name; state goes through a fabric (`nu.mem` for local state).
- It carries the Object form, the surface every term has. Wrap the read in the form it needs: `nu.Str(nu.Attr("item")).upper()`.
- A name nothing bound and a name bound to EMPTY read the same, so reach for `.exists()` when the difference matters.

**Examples**

```python
nu.run(nu.Attr("missing"))[0]
```

```
<EMPTY>
```

```python
nu.run(nu.Collect(nu.Map(nu.Iter([1, 2]), nu.Int(nu.Attr("item")) + 1)))[0]
```

```
[2, 3]
```

**Methods**

### `.exists()`

Whether this Ref's name is bound in `ctx.attrs`, as a `Bool`.

Builds `Bool`.

**Notes**

- The plain read cannot answer this: an unbound name yields EMPTY and so does a name bound to EMPTY.
- Only the address is resolved; the value is never read.
- Always a bool, so it reads as one: `.not_()`, `.and_()`.

**Example**

```python
nu.run(nu.context.Attr("total").exists().not_())[0]
```

```
True
```

**Inherited methods**

From `nu.forms.primitives.object_.Object`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `a + b` | `Object` | Sum of self and other. |
| `a - b` | `Object` | Self minus other. |
| `a * b` | `Object` | Product of self and other. |
| `a @ b` | `Object` | Matrix multiplication: self @ other. |
| `a / b` | `Object` | Self divided by other. |
| `a // b` | `Object` | Self floor-divided by other. |
| `a % b` | `Object` | Self modulo other. |
| `a ** b` | `Object` | Self raised to the other power. |
| `-a` | `Object` | Negation of self. |
| `+a` | `Object` | Self unchanged. |
| `abs(a)` | `Object` | Absolute value of self. |
| `a > b` | `Bool` | Self strictly greater than other. |
| `a < b` | `Bool` | Self strictly less than other. |
| `a >= b` | `Bool` | Self greater than or equal to other. |
| `a <= b` | `Bool` | Self less than or equal to other. |
| `a == b` | `Bool` | Self equal to other by value. |
| `a != b` | `Bool` | Self not equal to other by value. |
| `.is_(other)` | `Bool` | Identity comparison: self is other. |
| `.and_(other)` | `Bool` | Logical AND of self and other. |
| `.or_(other)` | `Bool` | Logical OR of self and other. |
| `.not_()` | `Bool` | Logical NOT of self. |
| `.bool_()` | `Bool` | Cast self to Bool. |
| `.bitand(other)` | `Object` | Python's `&` on the values: bits for ints, intersection for sets. |
| `.bitor(other)` | `Object` | Python's `\|` on the values: bits for ints, union for sets, merge for dicts. |
| `.bitxor(other)` | `Object` | Python's `^` on the values: bits for ints, symmetric difference for sets. |
| `.bitnot()` | `Object` | Python's `~` on the value. |
| `.lshift(other)` | `Object` | Self shifted left by other bits: Python's `<<` on the values. |
| `.rshift(other)` | `Object` | Self shifted right by other bits: Python's `>>` on the values. |
| `.union(other)` | `Object` | Set union of self and other. |
| `.intersection(other)` | `Object` | Set intersection of self and other. |
| `.difference(other)` | `Object` | Elements of self that are not in other. |
| `.symmetric_difference(other)` | `Object` | Elements in exactly one of self and other. |
| `.merge(other)` | `Object` | Self and other merged into a new mapping: Python's dict `\|`. |
| `a[key]` | `Object` | Subscript access: self[key]. |
| `.len()` | `Int` | Length of self. |
| `.contains(item)` | `Bool` | Membership test: item in self. |
| `.iter()` | `Iterator` | Lazy iterator stream over self's elements. |
| `.has_attr(name)` | `Bool` | Attribute presence: hasattr(self, name). |

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

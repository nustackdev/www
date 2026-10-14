---
title: primitives.object_
description: "Object - the interface every term has."
---

Module `nu.forms.primitives.object_`.

Object - the interface every term has.

The honest terminal for value-Form descent: genuinely-unknown or dynamically
typed values live here. Every operation on an `Object` is absorbing -
arithmetic, bitwise, subscript, and attribute access all yield another
`Object`; comparison and logical ops yield `Bool`.

`Object` carries the arithmetic and comparison operators; the runtime type
is unknown, so Python decides at evaluation time what each does. `&`, `|`
and `>>` compose flows (Race, Parallel, Sequential) on an `Object` like on
every term. The value versions are named methods that pass through to the
value: `bitand` / `bitor` / `bitxor` / `bitnot` / `lshift` /
`rshift`, `and_` / `or_` / `not_`, `union` / `intersection` /
`difference` / `symmetric_difference`, `merge`.

Protocol dunders (`__len__`, `__contains__`, `__bool__`, `__iter__`) must return
Python-native values and cannot be part of a Nu tree; the `Nu` base blocks
them with a hint. They are exposed as named methods (`len()`,
`contains()`, `iter()`, `bool_()`) that return the matching Form so
the tree stays symbolic.

Every operation yields a new value; none changes the value in place. There
is no subscript write or delete and no in-place merge: build the new value
instead.

There is deliberately no `__call__` here - Nu programs run through
interactions (built via `host` or hand-written), not raw
Python callable dispatch. If you have a callable value in a Nu tree, wrap
it in the appropriate interaction.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Object](#object) | `scalar_query` | `Object()` | The interface every term has. Full operator surface, no promise about the runtime type. |

## Object

The interface every term has. Full operator surface, no promise about the runtime type.

```python
Object()
```

Path `nu.forms.Object`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Arithmetic, bitwise, subscript, and attribute descent are all
absorbing: the result of any of them is another Object, since the
concrete type isn't known until evaluation. Comparison and logical
operators are the exception - they still yield Bool, because "is
this true" is a well-typed question even when the operand type
isn't.

**Notes**

- Typed as `TypedNu[Any]`, not `TypedNu[object]`. That lets an Object value slot into any narrow Arg position (IntArg, StrArg, ...), so `intref + objval` resolves through Int's `__add__` and lands as Int instead of falling through to Object's `__radd__`.
- `&`, `|` and `>>` compose flows (Race, Parallel, Sequential) like on every term. Bit, set and merge operations are named methods (`bitand`, `union`, `merge`, ...).
- There's no `__call__`. A callable value in a Nu tree goes through an interaction (built via `host` or hand-written), not raw Python call dispatch.

**Example**

```python
nu.run(nu.Object(6) * nu.Object(7))[0]
```

```
42
```

**Methods**

### `a + b`

Sum of self and other.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to add to self. Any type; the result stays Object regardless. |

**Yields**

The sum. EMPTY when either operand is EMPTY.

**Example**

```python
nu.run(nu.Object(2) + nu.Object(3))[0]
```

```
5
```

### `a - b`

Self minus other.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to subtract from self. |

**Yields**

The difference. EMPTY when either operand is EMPTY.

**Example**

```python
nu.run(nu.Object(10) - nu.Object(3))[0]
```

```
7
```

### `a * b`

Product of self and other.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to multiply self by. |

**Yields**

The product. EMPTY when either operand is EMPTY.

**Example**

```python
nu.run(nu.Object(6) * nu.Object(7))[0]
```

```
42
```

### `a @ b`

Matrix multiplication: self @ other.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the right operand. Needs a type that supports Python's matmul protocol (e.g. a numpy array); plain numbers don't. |

**Yields**

The product. EMPTY when either operand is EMPTY. Raises
at evaluation time when neither operand supports `@`.

Undocumented: example.

### `a / b`

Self divided by other.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the divisor. |

**Yields**

The quotient. EMPTY when either operand is EMPTY.
Raises at evaluation time when the divisor is zero.

**Notes**

- A zero divisor is not caught here; the underlying Div raises at evaluation time.

**Example**

```python
nu.run(nu.Object(7) / nu.Object(2))[0]
```

```
3.5
```

### `a // b`

Self floor-divided by other.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the divisor. |

**Yields**

The floored quotient. EMPTY when either operand is
EMPTY. Raises at evaluation time when the divisor is zero.

**Notes**

- Rounds toward negative infinity, as Python's `//` does.

**Example**

```python
nu.run(nu.Object(7) // nu.Object(2))[0]
```

```
3
```

### `a % b`

Self modulo other.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the divisor. |

**Yields**

The remainder. EMPTY when either operand is EMPTY.

**Notes**

- The result's sign follows the divisor, as Python's `%` does.

**Example**

```python
nu.run(nu.Object(7) % nu.Object(3))[0]
```

```
1
```

### `a ** b`

Self raised to the other power.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the exponent. |

**Yields**

The power. EMPTY when either operand is EMPTY.

**Example**

```python
nu.run(nu.Object(2) ** nu.Object(10))[0]
```

```
1024
```

### `-a`

Negation of self.

Builds `Object`.

**Yields**

The negation. EMPTY when self is EMPTY.

**Example**

```python
nu.run(-nu.Object(4))[0]
```

```
-4
```

### `+a`

Self unchanged.

Builds `Object`.

**Yields**

The value unchanged. EMPTY when self is EMPTY.

**Notes**

- Identity for numbers. Kept for symmetry with `__neg__` and so `+x` inside an expression is still a Nu term.

**Example**

```python
nu.run(+nu.Object(-4))[0]
```

```
-4
```

### `abs(a)`

Absolute value of self.

Builds `Object`.

**Yields**

The magnitude. EMPTY when self is EMPTY.

**Example**

```python
nu.run(abs(nu.Object(-4)))[0]
```

```
4
```

### `a > b`

Self strictly greater than other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to compare against. Any type; comparison still yields a well-typed Bool. |

**Yields**

True when self is greater, False otherwise. EMPTY when
either operand is EMPTY. Raises at evaluation time when
the runtime types aren't comparable.

**Example**

```python
nu.run(nu.Object(5) > nu.Object(3))[0]
```

```
True
```

### `a < b`

Self strictly less than other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to compare against. |

**Yields**

True when self is less, False otherwise. EMPTY when either
operand is EMPTY. Raises at evaluation time when the
runtime types aren't comparable.

**Example**

```python
nu.run(nu.Object(5) < nu.Object(3))[0]
```

```
False
```

### `a >= b`

Self greater than or equal to other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to compare against. |

**Yields**

True when self is greater or equal, False otherwise. EMPTY
when either operand is EMPTY. Raises at evaluation time
when the runtime types aren't comparable.

**Example**

```python
nu.run(nu.Object(5) >= nu.Object(5))[0]
```

```
True
```

### `a <= b`

Self less than or equal to other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to compare against. |

**Yields**

True when self is less or equal, False otherwise. EMPTY when
either operand is EMPTY. Raises at evaluation time when
the runtime types aren't comparable.

**Example**

```python
nu.run(nu.Object(3) <= nu.Object(5))[0]
```

```
True
```

### `a == b`

Self equal to other by value.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to compare against. Any type; unlike `>`/`<`, equality never raises for mismatched types, it's just False. |

**Yields**

True when the values compare equal, False otherwise. EMPTY
when either operand is EMPTY.

**Notes**

- Value equality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.Object(5) == 5)[0]
```

```
True
```

### `a != b`

Self not equal to other by value.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to compare against. |

**Yields**

True when the values differ, False otherwise. EMPTY when
either operand is EMPTY.

**Notes**

- Value inequality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.Object(5) != 4)[0]
```

```
True
```

### `.is_(other)`

Identity comparison: self is other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to compare identity against. |

**Yields**

True when self and other evaluate to the same Python object,
False otherwise.

**Notes**

- Object identity, not value equality. For scalar comparison use `==` instead.

**Example**

```python
nu.run(nu.Object(1).is_(1))[0]
```

```
True
```

### `.and_(other)`

Logical AND of self and other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to AND with self. Coerced to Bool by truthiness (falsy is False, everything else is True). |

**Yields**

True when both operands are truthy, False otherwise. An EMPTY
operand counts as false.

**Notes**

- Short-circuits like Python: the right operand is only evaluated when the left does not already decide the result.
- Bitwise AND is `bitand`, not this.

**Example**

```python
nu.run(nu.Object(1).and_(nu.Object(0)))[0]
```

```
False
```

### `.or_(other)`

Logical OR of self and other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to OR with self. Coerced to Bool by truthiness. |

**Yields**

True when either operand is truthy, False otherwise. An EMPTY
operand counts as false.

**Notes**

- Short-circuits like Python: the right operand is only evaluated when the left does not already decide the result.
- Bitwise OR is `bitor`, not this.

**Example**

```python
nu.run(nu.Object(0).or_(nu.Object(5)))[0]
```

```
True
```

### `.not_()`

Logical NOT of self.

Builds `Bool`.

**Yields**

True when self is falsy, False otherwise. EMPTY when self is
EMPTY.

**Notes**

- Falsy yields True, everything else yields False.
- Bitwise NOT is `bitnot`, not this.

**Example**

```python
nu.run(nu.Object(0).not_())[0]
```

```
True
```

### `.bool_()`

Cast self to Bool.

Builds `Bool`.

**Yields**

True when self is truthy, False when self is falsy. EMPTY
when self is EMPTY.

**Notes**

- Falsy becomes False, everything else becomes True, matching Python's truthiness rule.

**Example**

```python
nu.run(nu.Object(5).bool_())[0]
```

```
True
```

### `.bitand(other)`

Python's `&` on the values: bits for ints, intersection for sets.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to AND with self. |

**Yields**

The AND. EMPTY when either operand is EMPTY.

**Notes**

- A named method because `&` composes flows (Race) on every term.

**Example**

```python
nu.run(nu.Object(0b1100).bitand(0b1010))[0]
```

```
8
```

### `.bitor(other)`

Python's `|` on the values: bits for ints, union for sets, merge for dicts.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to OR with self. |

**Yields**

The OR. EMPTY when either operand is EMPTY.

**Notes**

- A named method because `|` composes flows (Parallel) on every term.

**Example**

```python
nu.run(nu.Object(0b1100).bitor(0b1010))[0]
```

```
14
```

### `.bitxor(other)`

Python's `^` on the values: bits for ints, symmetric difference for sets.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to XOR with self. |

**Yields**

The XOR. EMPTY when either operand is EMPTY.

**Example**

```python
nu.run(nu.Object(0b1100).bitxor(0b1010))[0]
```

```
6
```

### `.bitnot()`

Python's `~` on the value.

Builds `Object`.

**Yields**

The bitwise complement. EMPTY when self is EMPTY.

**Example**

```python
nu.run(nu.Object(5).bitnot())[0]
```

```
-6
```

### `.lshift(other)`

Self shifted left by other bits: Python's `<<` on the values.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the shift amount. Must be non-negative at evaluation time. |

**Yields**

The shifted value. EMPTY when either operand is EMPTY.
Raises at evaluation time when the shift amount is negative.

**Example**

```python
nu.run(nu.Object(1).lshift(4))[0]
```

```
16
```

### `.rshift(other)`

Self shifted right by other bits: Python's `>>` on the values.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the shift amount. Must be non-negative at evaluation time. |

**Yields**

The shifted value. EMPTY when either operand is EMPTY.
Raises at evaluation time when the shift amount is negative.

**Notes**

- A named method because `>>` composes flows (Sequential) on every term.

**Example**

```python
nu.run(nu.Object(16).rshift(2))[0]
```

```
4
```

### `.union(other)`

Set union of self and other.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the iterable to union with self. |

**Yields**

A new set with every element of self and other. EMPTY when
either operand is EMPTY.

**Example**

```python
sorted(nu.run(nu.Object({1, 2}).union({2, 3}))[0])
```

```
[1, 2, 3]
```

### `.intersection(other)`

Set intersection of self and other.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the iterable to intersect with self. |

**Yields**

A new set with only the elements found in both. EMPTY when
either operand is EMPTY.

**Example**

```python
nu.run(nu.Object({1, 2, 3}).intersection({2, 4}))[0]
```

```
{2}
```

### `.difference(other)`

Elements of self that are not in other.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the iterable of elements to leave out. |

**Yields**

A new set. EMPTY when either operand is EMPTY.

**Example**

```python
nu.run(nu.Object({1, 2, 3}).difference({2}))[0]
```

```
{1, 3}
```

### `.symmetric_difference(other)`

Elements in exactly one of self and other.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the iterable to compare self against. |

**Yields**

A new set. EMPTY when either operand is EMPTY.

**Example**

```python
nu.run(nu.Object({1, 2}).symmetric_difference({2, 3}))[0]
```

```
{1, 3}
```

### `.merge(other)`

Self and other merged into a new mapping: Python's dict `|`.

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the mapping to merge in. Its keys win over self's on overlap. |

**Yields**

A new mapping. EMPTY when either operand is EMPTY.

**Example**

```python
nu.run(nu.Object({"a": 1}).merge({"b": 2}))[0]
```

```
{'a': 1, 'b': 2}
```

### `a[key]`

Subscript access: self[key].

Builds `Object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `object` |  | the index, key, or slice to read. A plain Python slice is threaded through `Slice` so the whole thing stays symbolic. |

**Yields**

The item at key. EMPTY when self is EMPTY. Raises at
evaluation time when key doesn't exist on the runtime value.

**Examples**

```python
nu.run(nu.Object([1, 2, 3])[1])[0]
```

```
2
```

```python
nu.run(nu.Object([1, 2, 3])[0:2])[0]
```

```
[1, 2]
```

### `.len()`

Length of self.

Builds `Int`.

**Yields**

The length as Int. EMPTY when self is EMPTY. Raises at
evaluation time when the runtime value has no length.

**Notes**

- Named `len` because Python's `__len__` must return a native int and can't carry a Nu tree node.

**Example**

```python
nu.run(nu.Object([1, 2, 3]).len())[0]
```

```
3
```

### `.contains(item)`

Membership test: item in self.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `item` | `object` |  | the value to look for. |

**Yields**

True when item is found in self, False otherwise. EMPTY
when either operand is EMPTY.

**Notes**

- Named `contains` because Python's `__contains__` must return a native bool and can't carry a Nu tree node.

**Example**

```python
nu.run(nu.Object([1, 2, 3]).contains(2))[0]
```

```
True
```

### `.iter()`

Lazy iterator stream over self's elements.

Builds `Iterator`.

**Yields**

An Iterator over self's elements. EMPTY when self is
EMPTY.

**Notes**

- Named because Python's `iter()` / `for` would loop over the term at build time; the `Nu` base blocks them.
- The returned Iterator is a stream, not a scalar: loop it with `nu.ForEachDo`, drain it with `to_list()` / `to_set()` / `to_tuple()`, or pull one item with `next()`.

Undocumented: example.

### `.has_attr(name)`

Attribute presence: hasattr(self, name).

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `object` |  | the attribute name to check for. |

**Yields**

True when self has the named attribute, False otherwise.
EMPTY when either operand is EMPTY.

**Notes**

- Named `has_attr` because Python's `__getattr__` fallback here (`hasattr`) must return a native bool.

**Example**

```python
class Obj:
    x = 5
nu.run(nu.Object(Obj()).has_attr("x"))[0]
```

```
True
```

**Inherited methods**

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.fallback(*alternatives)` | `Self` | The first of this value and `alternatives` that is not EMPTY. |

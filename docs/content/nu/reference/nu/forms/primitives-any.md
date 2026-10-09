---
title: primitives.any_
description: "Any - dynamic/unknown type interface."
---

Module `nu.forms.primitives.any_`.

Any - dynamic/unknown type interface.

The honest terminal for value-Form descent: genuinely-unknown or dynamically
typed values live here. Every operation on an `Any` is absorbing -
arithmetic, bitwise, subscript, and attribute access all yield another
`Any`; comparison and logical ops yield `Bool`.

Reserved at the `Nu` base and deliberately NOT overridden here:

- `__and__` -> `Race` (flow), `__or__` -> `Parallel` (flow).
  Use `bitand()` / `bitor()` for bitwise instead.

Protocol dunders (`__len__`, `__contains__`, `__iter__`, `__bool__`,
`__int__`, `__float__`, ...) require Python-native return types and
cannot be part of a Nu tree. They are exposed as named methods
(`len_()`, `contains()`, `iter_()`, `bool_()`) that return the
matching Form so the tree stays symbolic.

Mutation via `__setitem__` / `__delitem__` is Ref-gated: the underlying
source must be a `Ref` (fabric-writable), otherwise Python's assign-syntax
would silently discard the resulting `Command` node and produce an
invalid tree. A clear `TypeError` fires at build time in that case.

There is deliberately no `__call__` here - Nu programs run through
interactions (built via `host` or hand-written), not raw
Python callable dispatch. If you have a callable value in a Nu tree, wrap
it in the appropriate interaction.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Any](#any) | `scalar_query` | `Any()` | Wildcard interface. Full operator surface, no promise about the runtime type. |

## Any

Wildcard interface. Full operator surface, no promise about the runtime type.

```python
Any()
```

Path `nu.forms.Any`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

Arithmetic, bitwise, subscript, and attribute descent are all
absorbing: the result of any of them is another Any, since the
concrete type isn't known until evaluation. Comparison and logical
operators are the exception - they still yield Bool, because "is
this true" is a well-typed question even when the operand type
isn't.

**Notes**

- Typed as `TypedNu[Any]`, not `TypedNu[object]`. That lets an Any value slot into any narrow Arg position (IntArg, StrArg, ...), so `intref + anyval` resolves through Int's `__add__` and lands as Int instead of falling through to Any's `__radd__`.
- `&` and `|` are reserved at the Nu base for flow (`Race`, `Parallel`) and are not overridden here. Use `bitand()` / `bitor()` for bitwise.
- There's no `__call__`. A callable value in a Nu tree goes through an interaction (built via `host` or hand-written), not raw Python call dispatch.

**Example**

```python
nu.run(nu.Any(6) * nu.Any(7))[0]
```

```
42
```

**Methods**

### `a + b`

Sum of self and other.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to add to self. Any type; the result stays Any regardless. |

**Yields**

The sum. INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.Any(2) + nu.Any(3))[0]
```

```
5
```

### `a - b`

Self minus other.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to subtract from self. |

**Yields**

The difference. INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.Any(10) - nu.Any(3))[0]
```

```
7
```

### `a * b`

Product of self and other.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to multiply self by. |

**Yields**

The product. INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.Any(6) * nu.Any(7))[0]
```

```
42
```

### `a @ b`

Matrix multiplication: self @ other.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the right operand. Needs a type that supports Python's matmul protocol (e.g. a numpy array); plain numbers don't. |

**Yields**

The product. INVALID when either operand is a sentinel. Raises
at evaluation time when neither operand supports `@`.

Undocumented: example.

### `a / b`

Self divided by other.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the divisor. |

**Yields**

The quotient. INVALID when either operand is a sentinel.
Raises at evaluation time when the divisor is zero.

**Notes**

- A zero divisor is not caught here; the underlying Div raises at evaluation time.

**Example**

```python
nu.run(nu.Any(7) / nu.Any(2))[0]
```

```
3.5
```

### `a // b`

Self floor-divided by other.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the divisor. |

**Yields**

The floored quotient. INVALID when either operand is a
sentinel. Raises at evaluation time when the divisor is zero.

**Notes**

- Rounds toward negative infinity, as Python's `//` does.

**Example**

```python
nu.run(nu.Any(7) // nu.Any(2))[0]
```

```
3
```

### `a % b`

Self modulo other.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the divisor. |

**Yields**

The remainder. INVALID when either operand is a sentinel.

**Notes**

- The result's sign follows the divisor, as Python's `%` does.

**Example**

```python
nu.run(nu.Any(7) % nu.Any(3))[0]
```

```
1
```

### `a ** b`

Self raised to the other power.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the exponent. |

**Yields**

The power. INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.Any(2) ** nu.Any(10))[0]
```

```
1024
```

### `-a`

Negation of self.

Builds `Any`.

**Yields**

The negation. INVALID when self is a sentinel.

**Example**

```python
nu.run(-nu.Any(4))[0]
```

```
-4
```

### `+a`

Self unchanged.

Builds `Any`.

**Yields**

The value unchanged. INVALID when self is a sentinel.

**Notes**

- Identity for numbers. Kept for symmetry with `__neg__` and so `+x` inside an expression is still a Nu term.

**Example**

```python
nu.run(+nu.Any(-4))[0]
```

```
-4
```

### `abs(a)`

Absolute value of self.

Builds `Any`.

**Yields**

The magnitude. INVALID when self is a sentinel.

**Example**

```python
nu.run(abs(nu.Any(-4)))[0]
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

True when self is greater, False otherwise. INVALID when
either operand is a sentinel. Raises at evaluation time when
the runtime types aren't comparable.

**Example**

```python
nu.run(nu.Any(5) > nu.Any(3))[0]
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

True when self is less, False otherwise. INVALID when either
operand is a sentinel. Raises at evaluation time when the
runtime types aren't comparable.

**Example**

```python
nu.run(nu.Any(5) < nu.Any(3))[0]
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

True when self is greater or equal, False otherwise. INVALID
when either operand is a sentinel. Raises at evaluation time
when the runtime types aren't comparable.

**Example**

```python
nu.run(nu.Any(5) >= nu.Any(5))[0]
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

True when self is less or equal, False otherwise. INVALID when
either operand is a sentinel. Raises at evaluation time when
the runtime types aren't comparable.

**Example**

```python
nu.run(nu.Any(3) <= nu.Any(5))[0]
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

True when the values compare equal, False otherwise. INVALID
when either operand is a sentinel.

**Notes**

- Value equality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.Any(5) == 5)[0]
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

True when the values differ, False otherwise. INVALID when
either operand is a sentinel.

**Notes**

- Value inequality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.Any(5) != 4)[0]
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
nu.run(nu.Any(1).is_(1))[0]
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

True when both operands are truthy, False otherwise. INVALID
when either operand is a sentinel.

**Notes**

- Short-circuits like Python: the right operand is only evaluated when the left does not already decide the result.
- Bitwise AND is `bitand`, not this; `&` is reserved for `Race`.

**Example**

```python
nu.run(nu.Any(1).and_(nu.Any(0)))[0]
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

True when either operand is truthy, False otherwise. INVALID
when either operand is a sentinel.

**Notes**

- Short-circuits like Python: the right operand is only evaluated when the left does not already decide the result.
- Bitwise OR is `bitor`, not this; `|` is reserved for `Parallel`.

**Example**

```python
nu.run(nu.Any(0).or_(nu.Any(5)))[0]
```

```
True
```

### `.not_()`

Logical NOT of self.

Builds `Bool`.

**Yields**

True when self is falsy, False otherwise. INVALID when self is
a sentinel.

**Notes**

- Falsy yields True, everything else yields False.
- Bitwise NOT is `bitnot`, not this.

**Example**

```python
nu.run(nu.Any(0).not_())[0]
```

```
True
```

### `.bool_()`

Cast self to Bool.

Builds `Bool`.

**Yields**

True when self is truthy, False when self is falsy. INVALID
when self is a sentinel.

**Notes**

- Falsy becomes False, everything else becomes True, matching Python's truthiness rule.

**Example**

```python
nu.run(nu.Any(5).bool_())[0]
```

```
True
```

### `.bitand(other)`

Bitwise AND: self & other.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to AND with self, bit by bit. |

**Yields**

The bitwise AND. INVALID when either operand is a sentinel.

**Notes**

- Named form rather than `__and__`: `&` is reserved at the Nu base for `Race` (flow), so bitwise AND has to live elsewhere.

**Example**

```python
nu.run(nu.Any(0b1100).bitand(0b1010))[0]
```

```
8
```

### `.bitor(other)`

Bitwise OR: self | other.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to OR with self, bit by bit. |

**Yields**

The bitwise OR. INVALID when either operand is a sentinel.

**Notes**

- Named form rather than `__or__`: `|` is reserved at the Nu base for `Parallel` (flow).

**Example**

```python
nu.run(nu.Any(0b1100).bitor(0b1010))[0]
```

```
14
```

### `.bitnot()`

Bitwise NOT: ~self.

Builds `Any`.

**Yields**

The bitwise complement. INVALID when self is a sentinel.

**Notes**

- Named form, symmetric with `bitand` / `bitor`, though unlike those `~` isn't reserved for flow. `__invert__` is also wired to the same op, so both `~self` and `self.bitnot()` work.

**Example**

```python
nu.run(nu.Any(5).bitnot())[0]
```

```
-6
```

### `~a`

Bitwise NOT: ~self.

Builds `Any`.

**Yields**

The bitwise complement. INVALID when self is a sentinel.

**Notes**

- Same op as `bitnot()`, reached through Python's `~` operator.

**Example**

```python
nu.run(~nu.Any(5))[0]
```

```
-6
```

### `a ^ b`

Bitwise XOR: self ^ other.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the value to XOR with self, bit by bit. |

**Yields**

The bitwise XOR. INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.Any(0b1100) ^ nu.Any(0b1010))[0]
```

```
6
```

### `a << b`

Left shift: self shifted left by other bits.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the shift amount. Must be non-negative at evaluation time. |

**Yields**

The shifted value. INVALID when either operand is a sentinel.
Raises at evaluation time when the shift amount is negative.

**Example**

```python
nu.run(nu.Any(1) << nu.Any(4))[0]
```

```
16
```

### `a >> b`

Right shift: self shifted right by other bits.

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `object` |  | the shift amount. Must be non-negative at evaluation time. |

**Yields**

The shifted value. INVALID when either operand is a sentinel.
Raises at evaluation time when the shift amount is negative.

**Example**

```python
nu.run(nu.Any(16) >> nu.Any(2))[0]
```

```
4
```

### `a[key]`

Subscript access: self[key].

Builds `Any`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `object` |  | the index, key, or slice to read. A plain Python slice is threaded through `Slice` so the whole thing stays symbolic. |

**Yields**

The item at key. INVALID when self is a sentinel. Raises at
evaluation time when key doesn't exist on the runtime value.

**Examples**

```python
nu.run(nu.Any([1, 2, 3])[1])[0]
```

```
2
```

```python
nu.run(nu.Any([1, 2, 3])[0:2])[0]
```

```
[1, 2]
```

### `a[key] = value`

Subscript write: self[key] = value.

Builds `object`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `key` | `object` |  | the index or key to write. |
| `value` | `object` |  | the value to store there. |

**Notes**

- Ref-gated at build time: the wrapped source must be a Ref (a fabric-writable location). Python's assignment syntax discards the return value, so a value-node write would silently produce an orphaned, invalid tree; this raises `TypeError` instead.

**Example**

```python
nu.Any([1, 2, 3])[0] = 5
```

```
Traceback (most recent call last):
TypeError: Any.__setitem__: cannot mutate through a value-node - the wrapped source must be a Ref (a fabric-writable location). Got: Literal.
```

### `.len_()`

Length of self, as len(self).

Builds `Int`.

**Yields**

The length as Int. INVALID when self is a sentinel. Raises at
evaluation time when the runtime value has no length.

**Notes**

- Named `len_` because Python's `__len__` must return a native int and can't carry a Nu tree node.

**Example**

```python
nu.run(nu.Any([1, 2, 3]).len_())[0]
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

True when item is found in self, False otherwise. INVALID
when either operand is a sentinel.

**Notes**

- Named `contains` because Python's `__contains__` must return a native bool and can't carry a Nu tree node.

**Example**

```python
nu.run(nu.Any([1, 2, 3]).contains(2))[0]
```

```
True
```

### `.iter_()`

Iterator over self, as iter(self).

Builds `Iterator`.

**Yields**

An Iterator over self's elements. INVALID when self is a
sentinel.

**Notes**

- Named `iter_` because Python's `__iter__` must return a native iterator and can't carry a Nu tree node.
- The returned Iterator is a stream, not a scalar: it needs to be consumed through a stream-shaped context (materialized with `to_list()` / `to_set()` / `to_tuple()`, or driven inside a flow), not evaluated directly with `nu.run`.

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
INVALID when either operand is a sentinel.

**Notes**

- Named `has_attr` because Python's `__getattr__` fallback here (`hasattr`) must return a native bool.

**Example**

```python
class Obj:
    x = 5
nu.run(nu.Any(Obj()).has_attr("x"))[0]
```

```
True
```

**Inherited methods**

From `nu.lang.forms.Form`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.is_empty()` | `Bool` | True if this Form yields the EMPTY sentinel. |
| `.is_invalid()` | `Bool` | True if this Form yields the INVALID sentinel. |
| `.is_sentinel()` | `Bool` | True if this Form yields either sentinel (EMPTY or INVALID). |
| `.not_empty()` | `Bool` | True if this Form does not yield EMPTY. |
| `.not_invalid()` | `Bool` | True if this Form does not yield INVALID. |

---
title: primitives.bool_
description: "Bool - boolean interface."
---

Module `nu.forms.primitives.bool_`.

Bool - boolean interface.

Bool = Form[bool] + logical + comparison.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Bool](#bool) | `scalar_query` | `Bool()` | Boolean interface. Logical + comparable. |

## Bool

Boolean interface. Logical + comparable.

```python
Bool()
```

Path `nu.forms.Bool`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

**Notes**

- Logical operators are the named forms `and_`, `or_`, `not_`. Python reserves `and`, `or`, `not` as keywords, so they cannot be method names.
- Short-circuits like Python: the right operand is only evaluated when the left does not already decide the result.
- Comparison operators yield Bool too, treating False as less than True.

**Example**

```python
nu.run(nu.Bool(True).and_(nu.Bool(False)))[0]
```

```
False
```

**Methods**

### `.and_(other)`

Logical AND of self and other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BoolArg` |  | the value to AND with self. Any Bool or plain bool. |

**Yields**

True when both operands are True, False otherwise. INVALID when
either operand is a sentinel.

**Notes**

- Short-circuits like Python: the right operand is only evaluated when the left does not already decide the result.

**Example**

```python
nu.run(nu.Bool(True).and_(nu.Bool(False)))[0]
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
| `other` | `BoolArg` |  | the value to OR with self. Any Bool or plain bool. |

**Yields**

True when either operand is True, False otherwise. INVALID when
either operand is a sentinel.

**Notes**

- Short-circuits like Python: the right operand is only evaluated when the left does not already decide the result.

**Example**

```python
nu.run(nu.Bool(False).or_(nu.Bool(True)))[0]
```

```
True
```

### `.not_()`

Logical NOT of self.

Builds `Bool`.

**Yields**

True when self is False, False when self is True. INVALID when
self is a sentinel.

**Example**

```python
nu.run(nu.Bool(True).not_())[0]
```

```
False
```

### `.bool_()`

Cast self to Bool.

Builds `Bool`.

**Yields**

self, unchanged. INVALID when self is a sentinel.

**Notes**

- Identity for a value that is already Bool. Kept for consistency with `Int.bool_` and `Float.bool_`.

**Example**

```python
nu.run(nu.Bool(True).bool_())[0]
```

```
True
```

### `a > b`

Self strictly greater than other.

Builds `Bool`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `other` | `BoolArg` |  | the value to compare against. Any Bool or plain bool, with False less than True. |

**Yields**

True when self is True and other is False, False otherwise.
INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.Bool(True) > nu.Bool(False))[0]
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
| `other` | `BoolArg` |  | the value to compare against. Any Bool or plain bool, with False less than True. |

**Yields**

True when self is False and other is True, False otherwise.
INVALID when either operand is a sentinel.

**Example**

```python
nu.run(nu.Bool(True) < nu.Bool(False))[0]
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
| `other` | `BoolArg` |  | the value to compare against. Any Bool or plain bool, with False less than True. |

**Yields**

True when self is at least other, False otherwise. INVALID when
either operand is a sentinel.

**Example**

```python
nu.run(nu.Bool(True) >= nu.Bool(True))[0]
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
| `other` | `BoolArg` |  | the value to compare against. Any Bool or plain bool, with False less than True. |

**Yields**

True when self is at most other, False otherwise. INVALID when
either operand is a sentinel.

**Example**

```python
nu.run(nu.Bool(False) <= nu.Bool(True))[0]
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
| `other` | `BoolArg` |  | the value to compare against. Any Bool or plain bool. |

**Yields**

True when the values compare equal, False otherwise. INVALID
when either operand is a sentinel.

**Notes**

- Value equality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.Bool(True) == True)[0]
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
| `other` | `BoolArg` |  | the value to compare against. Any Bool or plain bool. |

**Yields**

True when the values differ, False otherwise. INVALID when
either operand is a sentinel.

**Notes**

- Value inequality, not identity. Use `is_` for identity.

**Example**

```python
nu.run(nu.Bool(True) != nu.Bool(False))[0]
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
| `other` | `BoolArg` |  | the value to compare identity against. |

**Yields**

True when self and other evaluate to the same Python object,
False otherwise.

**Notes**

- Object identity, not value equality. For scalar comparison use `==` instead.
- Python interns True and False, so any two Bool True values test identical.

**Example**

```python
nu.run(nu.Bool(True).is_(True))[0]
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

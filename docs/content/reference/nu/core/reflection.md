---
title: reflection
description: "Reflection atoms: Python's introspection builtins."
---

Module `nu.core.reflection`.

Reflection atoms: Python's introspection builtins.

Maps Python's builtins that inspect a value's type, identity, or shape onto Nu
ScalarQueries. Pure compute; no Context effect of their own.

Builtins covered (Python -> Nu):
- type / class: `type` -> `Type`, `isinstance` -> `IsInstance`,
  `issubclass` -> `IsSubclass`, `callable` -> `Callable`
- identity / value: `id` -> `Id`, `hash` -> `Hash`
- namespace: `dir` -> `Dir`, `vars` -> `Vars`

Sorts: all ScalarQuery (Q). `Type`, `Callable`, `Id`, `Hash`, `Dir`
and `Vars` are unary. `IsInstance` and `IsSubclass` are binary (value,
class). `Dir` and `Vars` yield a collection but are scalar builders (one
list / dict), not streams.

Each atom defines `compile` (sync hot path) and `acompile` (async hot
path). Both return a thunk `(rt) -> value` (sync) or `(rt) -> awaitable`
(async) that captures the precompiled child thunks, so recursion skips the
`Runtime.eval` / `Runtime.aeval` dispatch hop per child. Sentinel
propagation is inlined: an EMPTY or INVALID operand collapses the result to
INVALID without inspecting.

OOP descriptors (`super`, `object`, `property`, `classmethod`,
`staticmethod`, `memoryview`) are not in this pass. They go to extensions
later, once the OOP descriptor surface is designed.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Callable](#callable) | `scalar_query` | `Callable(value)` | Whether its one child appears callable (`callable`). |
| [Dir](#dir) | `scalar_query` | `Dir(value)` | The sorted attribute-name list of its one child (`dir`). |
| [Hash](#hash) | `scalar_query` | `Hash(value)` | The hash of its one child (`hash`). |
| [Id](#id) | `scalar_query` | `Id(value)` | The identity of its one child (`id`). |
| [IsInstance](#isinstance) | `scalar_query` | `IsInstance(value, klass)` | Whether the first child is an instance of the second (`isinstance`). |
| [IsSubclass](#issubclass) | `scalar_query` | `IsSubclass(cls, klass)` | Whether the first child is a subclass of the second (`issubclass`). |
| [Type](#type) | `scalar_query` | `Type(value)` | The type of its one child (`type`). |
| [Vars](#vars) | `scalar_query` | `Vars(value)` | The `__dict__` of its one child (`vars`). |

## Callable

Whether its one child appears callable (`callable`).

```python
Callable(value)
```

Path `nu.core.Callable`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to check. |

**Yields**

True or False. INVALID when the child is EMPTY or INVALID.

**Notes**

- A true result is not a guarantee: an object can define `__call__` and still fail when actually called, same as Python's `callable`.

**Example**

```python
nu.run(nu.Callable(len))[0]
```

```
True
```

## Dir

The sorted attribute-name list of its one child (`dir`).

```python
Dir(value)
```

Path `nu.core.Dir`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to inspect. |

**Yields**

A sorted list of attribute names. INVALID when the child is EMPTY or
INVALID.

**Example**

```python
nu.run(nu.Dir(True))[0][:3]
```

```
['__abs__', '__add__', '__and__']
```

## Hash

The hash of its one child (`hash`).

```python
Hash(value)
```

Path `nu.core.Hash`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to inspect. |

**Yields**

An integer. INVALID when the child is EMPTY or INVALID.

**Notes**

- Only hashable values work. An unhashable child raises, same as Python's `hash`, since that's a real error and not a sentinel.

**Example**

```python
nu.run(nu.Hash("abc"))[0] == hash("abc")
```

```
True
```

## Id

The identity of its one child (`id`).

```python
Id(value)
```

Path `nu.core.Id`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to inspect. |

**Yields**

An integer unique to the object for its lifetime. INVALID when the
child is EMPTY or INVALID.

**Notes**

- In CPython the identity is the object's memory address for its lifetime, so it's only meaningful while the object stays alive.

**Example**

```python
nu.run(nu.Id(5))[0] == id(5)
```

```
True
```

## IsInstance

Whether the first child is an instance of the second (`isinstance`).

```python
IsInstance(value, klass)
```

Path `nu.core.IsInstance`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to check. |
| `klass` |  |  | the type, or tuple of types, to check against. |

**Yields**

True or False. INVALID when either child is EMPTY or INVALID.

**Notes**

- The right child is evaluated only after the left yields a value, so a sentinel on the left short-circuits without touching the right.

**Example**

```python
nu.run(nu.IsInstance(5, int))[0]
```

```
True
```

## IsSubclass

Whether the first child is a subclass of the second (`issubclass`).

```python
IsSubclass(cls, klass)
```

Path `nu.core.IsSubclass`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cls` |  |  | the class to check. |
| `klass` |  |  | the type, or tuple of types, to check against. |

**Yields**

True or False. INVALID when either child is EMPTY or INVALID.

**Notes**

- The right child is evaluated only after the left yields a value, so a sentinel on the left short-circuits without touching the right.

**Example**

```python
nu.run(nu.IsSubclass(bool, int))[0]
```

```
True
```

## Type

The type of its one child (`type`).

```python
Type(value)
```

Path `nu.core.Type`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to inspect. |

**Yields**

The value's type. INVALID when the child is EMPTY or INVALID.

**Example**

```python
nu.run(nu.Type(5))[0]
```

```
<class 'int'>
```

## Vars

The `__dict__` of its one child (`vars`).

```python
Vars(value)
```

Path `nu.core.Vars`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `value` |  |  | the value to inspect. |

**Yields**

A dict. INVALID when the child is EMPTY or INVALID.

**Notes**

- Objects with no `__dict__` (most builtins, `__slots__`-only classes) raise, same as Python's `vars`.

**Example**

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
nu.run(nu.Vars(Point(1, 2)))[0]
```

```
{'x': 1, 'y': 2}
```

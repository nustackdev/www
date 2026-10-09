---
title: cast_fns
description: "Cast wrappers: coerce `x` into a Nu term of the target Form."
---

Module `nu.core.cast_fns`.

Cast wrappers: coerce `x` into a Nu term of the target Form.

Lives in a separate module from `cast` because these functions shadow the
Python builtins (`str`, `int`, `list`, ...) and would collide with the
same names used as type annotations inside `cast.py`.

| Name | Call | Meaning |
| --- | --- | --- |
| [dict](#dict) | `core.dict(x)` | Coerce `x` to a Nu `Dict` term. `Dict(ToDict(x))` in one call. |
| [float](#float) | `core.float(x)` | Coerce `x` to a Nu `Float` term. `Float(ToFloat(x))` in one call. |
| [frozenset](#frozenset) | `core.frozenset(x)` | Coerce `x` to a Nu `FrozenSet` term. `FrozenSet(ToFrozenSet(x))` in one call. |
| [int](#int) | `core.int(x)` | Coerce `x` to a Nu `Int` term. `Int(ToInt(x))` in one call. |
| [list](#list) | `core.list(x)` | Coerce `x` to a Nu `List` term. `List(ToList(x))` in one call. |
| [set](#set) | `core.set(x)` | Coerce `x` to a Nu `Set` term. `Set(ToSet(x))` in one call. |
| [str](#str) | `core.str(x)` | Coerce `x` to a Nu `Str` term. `Str(ToStr(x))` in one call. |
| [tuple](#tuple) | `core.tuple(x)` | Coerce `x` to a Nu `Tuple` term. `Tuple(ToTuple(x))` in one call. |

## dict

Coerce `x` to a Nu `Dict` term. `Dict(ToDict(x))` in one call.

```python
core.dict(x)
```

Path `nu.core.dict`. Defined on `nu.core.cast_fns`, bound as a function. Builds `Dict`.

For building a dict from named Nu expressions, use `nu.Dict.of(...)`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `object` |  |  |

Undocumented: example.

## float

Coerce `x` to a Nu `Float` term. `Float(ToFloat(x))` in one call.

```python
core.float(x)
```

Path `nu.core.float`. Defined on `nu.core.cast_fns`, bound as a function. Builds `Float`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `object` |  |  |

Undocumented: example.

## frozenset

Coerce `x` to a Nu `FrozenSet` term. `FrozenSet(ToFrozenSet(x))` in one call.

```python
core.frozenset(x)
```

Path `nu.core.frozenset`. Defined on `nu.core.cast_fns`, bound as a function. Builds `FrozenSet`.

For building a frozenset from positional Nu expressions, use
`nu.FrozenSet.of(...)`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `object` |  |  |

Undocumented: example.

## int

Coerce `x` to a Nu `Int` term. `Int(ToInt(x))` in one call.

```python
core.int(x)
```

Path `nu.core.int`. Defined on `nu.core.cast_fns`, bound as a function. Builds `Int`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `object` |  |  |

Undocumented: example.

## list

Coerce `x` to a Nu `List` term. `List(ToList(x))` in one call.

```python
core.list(x)
```

Path `nu.core.list`. Defined on `nu.core.cast_fns`, bound as a function. Builds `List`.

For building a list from positional Nu expressions, use `nu.List.of(...)`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `object` |  |  |

Undocumented: example.

## set

Coerce `x` to a Nu `Set` term. `Set(ToSet(x))` in one call.

```python
core.set(x)
```

Path `nu.core.set`. Defined on `nu.core.cast_fns`, bound as a function. Builds `Set`.

For building a set from positional Nu expressions, use `nu.Set.of(...)`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `object` |  |  |

Undocumented: example.

## str

Coerce `x` to a Nu `Str` term. `Str(ToStr(x))` in one call.

```python
core.str(x)
```

Path `nu.core.str`. Defined on `nu.core.cast_fns`, bound as a function. Builds `Str`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `object` |  |  |

Undocumented: example.

## tuple

Coerce `x` to a Nu `Tuple` term. `Tuple(ToTuple(x))` in one call.

```python
core.tuple(x)
```

Path `nu.core.tuple`. Defined on `nu.core.cast_fns`, bound as a function. Builds `Tuple`.

For building a tuple from positional Nu expressions, use `nu.Tuple.of(...)`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `x` | `object` |  |  |

Undocumented: example.

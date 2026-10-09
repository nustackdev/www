---
title: args
description: "Argument type aliases for Nu kind class signatures."
---

Module `nu.lang.args`.

Argument type aliases for Nu kind class signatures.

A kind that takes a python `int` (or a Nu that yields one) declares
its slot type as `IntArg` rather than spelling `int | Nu | Sentinel`
each time. The aliases keep concrete kind signatures short and readable
while still admitting the full algebraic surface (a raw python value, a
Nu sub-tree producing one, or a propagating sentinel).

Each specialized alias also admits `Any` explicitly: the honest
terminal is consumable everywhere. This is redundant with the ``TypedNu
[Any]` variance trick (`Nu[Any]` already substitutes for `Nu[int]``
etc.), but stating it in the alias makes the surface readable in code -
you can see at a glance that `IntArg` welcomes a dynamic value.

`Arg[T]` is the generic form. The specialized aliases (`IntArg`,
`StrArg`, ...) cover the common scalar and collection cases.

Import note: `Any` lives in `nu.forms` which imports from
`nu.lang`, so a runtime import here would cycle. PEP 695 `type` aliases
evaluate their RHS lazily (`TypeAliasType.__value__` is only touched by
mypy or explicit introspection), so a `TYPE_CHECKING`-only import is
sufficient: mypy sees the name, runtime never does.

| Name | Call | Meaning |
| --- | --- | --- |
| [Arg](#arg) | `lang.Arg()` | Create named, parameterized type aliases. |
| [DictArg](#dictarg) | `lang.DictArg()` | Create named, parameterized type aliases. |
| [FrozenSetArg](#frozensetarg) | `lang.FrozenSetArg()` | Create named, parameterized type aliases. |
| [ListArg](#listarg) | `lang.ListArg()` | Create named, parameterized type aliases. |
| [SetArg](#setarg) | `lang.SetArg()` | Create named, parameterized type aliases. |
| [TupleArg](#tuplearg) | `lang.TupleArg()` | Create named, parameterized type aliases. |

## Arg

Create named, parameterized type aliases.

```python
lang.Arg()
```

Path `nu.lang.Arg`. Defined on `nu.lang.args`, bound as a function.

This provides a backport of the new `type` statement in Python 3.12:

    type ListOrSet[T] = list[T] | set[T]

is equivalent to:

    T = TypeVar("T")
    ListOrSet = TypeAliasType("ListOrSet", list[T] | set[T], type_params=(T,))

The name ListOrSet can then be used as an alias for the type it refers to.

The type_params argument should contain all the type parameters used
in the value of the type alias. If the alias is not generic, this
argument is omitted.

Static type checkers should only support type aliases declared using
TypeAliasType that follow these rules:

- The first argument (the name) must be a string literal.
- The TypeAliasType instance must be immediately assigned to a variable
  of the same name. (For example, 'X = TypeAliasType("Y", int)' is invalid,
  as is 'X, Y = TypeAliasType("X", int), TypeAliasType("Y", int)').

Undocumented: yields, example.

## DictArg

Create named, parameterized type aliases.

```python
lang.DictArg()
```

Path `nu.lang.DictArg`. Defined on `nu.lang.args`, bound as a function.

This provides a backport of the new `type` statement in Python 3.12:

    type ListOrSet[T] = list[T] | set[T]

is equivalent to:

    T = TypeVar("T")
    ListOrSet = TypeAliasType("ListOrSet", list[T] | set[T], type_params=(T,))

The name ListOrSet can then be used as an alias for the type it refers to.

The type_params argument should contain all the type parameters used
in the value of the type alias. If the alias is not generic, this
argument is omitted.

Static type checkers should only support type aliases declared using
TypeAliasType that follow these rules:

- The first argument (the name) must be a string literal.
- The TypeAliasType instance must be immediately assigned to a variable
  of the same name. (For example, 'X = TypeAliasType("Y", int)' is invalid,
  as is 'X, Y = TypeAliasType("X", int), TypeAliasType("Y", int)').

Undocumented: yields, example.

## FrozenSetArg

Create named, parameterized type aliases.

```python
lang.FrozenSetArg()
```

Path `nu.lang.FrozenSetArg`. Defined on `nu.lang.args`, bound as a function.

This provides a backport of the new `type` statement in Python 3.12:

    type ListOrSet[T] = list[T] | set[T]

is equivalent to:

    T = TypeVar("T")
    ListOrSet = TypeAliasType("ListOrSet", list[T] | set[T], type_params=(T,))

The name ListOrSet can then be used as an alias for the type it refers to.

The type_params argument should contain all the type parameters used
in the value of the type alias. If the alias is not generic, this
argument is omitted.

Static type checkers should only support type aliases declared using
TypeAliasType that follow these rules:

- The first argument (the name) must be a string literal.
- The TypeAliasType instance must be immediately assigned to a variable
  of the same name. (For example, 'X = TypeAliasType("Y", int)' is invalid,
  as is 'X, Y = TypeAliasType("X", int), TypeAliasType("Y", int)').

Undocumented: yields, example.

## ListArg

Create named, parameterized type aliases.

```python
lang.ListArg()
```

Path `nu.lang.ListArg`. Defined on `nu.lang.args`, bound as a function.

This provides a backport of the new `type` statement in Python 3.12:

    type ListOrSet[T] = list[T] | set[T]

is equivalent to:

    T = TypeVar("T")
    ListOrSet = TypeAliasType("ListOrSet", list[T] | set[T], type_params=(T,))

The name ListOrSet can then be used as an alias for the type it refers to.

The type_params argument should contain all the type parameters used
in the value of the type alias. If the alias is not generic, this
argument is omitted.

Static type checkers should only support type aliases declared using
TypeAliasType that follow these rules:

- The first argument (the name) must be a string literal.
- The TypeAliasType instance must be immediately assigned to a variable
  of the same name. (For example, 'X = TypeAliasType("Y", int)' is invalid,
  as is 'X, Y = TypeAliasType("X", int), TypeAliasType("Y", int)').

Undocumented: yields, example.

## SetArg

Create named, parameterized type aliases.

```python
lang.SetArg()
```

Path `nu.lang.SetArg`. Defined on `nu.lang.args`, bound as a function.

This provides a backport of the new `type` statement in Python 3.12:

    type ListOrSet[T] = list[T] | set[T]

is equivalent to:

    T = TypeVar("T")
    ListOrSet = TypeAliasType("ListOrSet", list[T] | set[T], type_params=(T,))

The name ListOrSet can then be used as an alias for the type it refers to.

The type_params argument should contain all the type parameters used
in the value of the type alias. If the alias is not generic, this
argument is omitted.

Static type checkers should only support type aliases declared using
TypeAliasType that follow these rules:

- The first argument (the name) must be a string literal.
- The TypeAliasType instance must be immediately assigned to a variable
  of the same name. (For example, 'X = TypeAliasType("Y", int)' is invalid,
  as is 'X, Y = TypeAliasType("X", int), TypeAliasType("Y", int)').

Undocumented: yields, example.

## TupleArg

Create named, parameterized type aliases.

```python
lang.TupleArg()
```

Path `nu.lang.TupleArg`. Defined on `nu.lang.args`, bound as a function.

This provides a backport of the new `type` statement in Python 3.12:

    type ListOrSet[T] = list[T] | set[T]

is equivalent to:

    T = TypeVar("T")
    ListOrSet = TypeAliasType("ListOrSet", list[T] | set[T], type_params=(T,))

The name ListOrSet can then be used as an alias for the type it refers to.

The type_params argument should contain all the type parameters used
in the value of the type alias. If the alias is not generic, this
argument is omitted.

Static type checkers should only support type aliases declared using
TypeAliasType that follow these rules:

- The first argument (the name) must be a string literal.
- The TypeAliasType instance must be immediately assigned to a variable
  of the same name. (For example, 'X = TypeAliasType("Y", int)' is invalid,
  as is 'X, Y = TypeAliasType("X", int), TypeAliasType("Y", int)').

Undocumented: yields, example.

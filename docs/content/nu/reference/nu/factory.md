---
title: factory
description: "nu.factory - atom builders on top of the language essentials."
---

Module `nu.factory`.

nu.factory - atom builders on top of the language essentials.

A builder layer, not part of `nu.lang` core. Everything here takes a
Python callable and produces a real `Nu` subclass ready to slot into a
tree. `nu.core` atoms stay hand-written end-to-end for the hot path;
the factory is for the rest.

- **core** - `InteractionFactory`, the generic mechanism everything else
  builds on. Takes any callable + base kind.
- **host** - the `@host` decorator, minimum-ceremony over
  `InteractionFactory`. Defaults the base kind to `ScalarQuery` so
  wrapping a pure function is a one-liner.

## core

Module `nu.factory.core`.

`InteractionFactory`: the generic mechanism for building atoms from callables.

One mechanism, `InteractionFactory`: pass a base kind, a name, and a callable,
get back a real `Nu` subclass wired with sync / async thunks, sentinel
handling, and declared attributes. It collapses the "resolve the children, call
a Python function, return the result" boilerplate that most non-hot
interactions are.

`nu.core` atoms stay hand-written end-to-end (a clean thunk, no extra hop)
for the hot path. The factory is for the rest - the `nustd` library and
anything else that just bridges to a host callable.

A method call needs no special support here: an *unbound* method is a plain
callable whose first argument is the receiver, so `d.weekday()` is
`date.weekday(d)`. Bind the unbound method and pass the receiver as the
first child.

Supported base kinds: `ScalarQuery`, `Command`, `ScalarAction`. Stream
(query or action), reduction, flow, and span have non-trivial dispatch shapes
the factory does not reproduce.

Yield semantics follow the base:
- `ScalarQuery` / `ScalarAction` -- the function's return value is yielded.
- `Command` -- the function runs for its side effect; the thunk returns `None`.

Arguments. Children passed positionally land as positional args to the
callable; children passed by keyword land as keyword args. The split is
recorded in the atom's payload so `compile` can rebuild the call:

```python
DateOf(2026, 6, 30)            -> date(2026, 6, 30)
DatetimeReplace(dt, hour=9)    -> datetime.replace(dt, hour=9)
```

Sync vs async is inferred from the callable. An `async def` produces a
class whose `compile` falls back to the base (which raises) and whose
`acompile` awaits the function; the class also declares
`requires_async = True`. A plain `def` produces both paths.

- `propagate_sentinels=True` (default) -- a resolved child that is `EMPTY`
  or `INVALID` short-circuits the thunk without invoking the function.
  `ScalarQuery` / `ScalarAction` return `INVALID`; `Command` returns
  `None`.
- `propagate_sentinels=False` -- sentinels pass through to the function.

Declared attributes are passed by keyword. Raw values are wrapped in
`Declared`; pre-built `Attribute` instances (including computed
`Synthesized` / `Inherited`) pass through unchanged:

```python
Set = InteractionFactory(
    Command, "Set", lambda ref, value: ...,
    mutates=frozenset({0}),
)
```

Note: IDEs and static type checkers see the return as `type[B]` where `B`
is the base; they cannot show a docstring or signature specific to the
synthesised class. Hand-write the class when IDE discoverability matters.

| Name | Call | Meaning |
| --- | --- | --- |
| [InteractionFactory](#interactionfactory) | `factory.InteractionFactory(base, name, fn, propagate_sentinels=True)` | Build a `Nu` subclass bound to a Python callable. |

### InteractionFactory

Build a `Nu` subclass bound to a Python callable.

```python
factory.InteractionFactory(base, name, fn, propagate_sentinels=True)
```

Path `nu.factory.InteractionFactory`. Defined on `nu.factory.core`, bound as a function. Builds `type[B]`.

See the module docstring for semantics. Returns a fresh class named
`name` whose metaclass collects every declared attribute (and
`requires_async` for `async def` targets).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `base` | `type[B]` |  |  |
| `name` | `str` |  |  |
| `fn` | `Callable[..., object]` |  |  |
| `propagate_sentinels` | `bool` | `True` |  |

Undocumented: example.

## host

Module `nu.factory.host`.

`@host`: decorator sugar over `InteractionFactory`.

Turns a host Python callable into a Nu atom with minimal ceremony. Default
base is `ScalarQuery`; atom name defaults to the function's `__name__`
snake-cased into CamelCase.

    @nu.host
    def creation_mint(tx) -> str: ...

    @nu.host(base=Command)
    def dispatch(x, y) -> None: ...

Also usable as a plain wrapper on an existing callable:

```python
MintFromTx = nu.host(extract_mint)
```

| Name | Call | Meaning |
| --- | --- | --- |
| [host](#host-1) | `factory.host(fn=None, name=None, base=None, propagate_sentinels=True)` | Decorator sugar over `InteractionFactory`: turn a host callable into a Nu atom. |

### host

Decorator sugar over `InteractionFactory`: turn a host callable into a Nu atom.

```python
factory.host(fn=None, name=None, base=None, propagate_sentinels=True)
```

Path `nu.factory.host`. Defined on `nu.factory.host`, bound as a function. Builds `object`.

Default base is `ScalarQuery`; atom name defaults to the function's
`__name__` snake-cased into CamelCase.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `fn` | `Callable[..., object] \| None` | `None` |  |
| `name` | `str \| None` | `None` |  |
| `base` | `type[Nu] \| None` | `None` |  |
| `propagate_sentinels` | `bool` | `True` |  |

Undocumented: example.

---
title: source
description: "What the code says: a Python object, introspected."
---

Module `nu.inspect.core.source`.

What the code says: a Python object, introspected.

One module per thing the code can be asked, each with its reader and the value
that reader produces. No docstrings are touched here, and nothing knows about
Nu.

- `signature` reads a callable's parameters, defaults and variadic tails.
- `module` enumerates a module's public members.
- `code` fetches source text and location.
- `unpack` reads how many names a function unpacks a variable into, for the
  structural facts a signature does not carry.

## module

Module `nu.inspect.core.source.module`.

Module enumeration: a module in, its public members out. No Nu knowledge.

One rule, in order: use `__all__` when the module declares one, otherwise
take the public names whose `__module__` is this module (which drops
re-exports and anything a `TYPE_CHECKING` block pulled in). Either way the
result is deduped by object identity, so a member exported under two names is
reported once, under the first name seen.

| Name | Call | Meaning |
| --- | --- | --- |
| [public_members](#public_members) | `source.public_members(module)` | The module's public members, deduped by object identity. |

### public_members

The module's public members, deduped by object identity.

```python
source.public_members(module)
```

Path `nu.inspect.core.source.public_members`. Defined on `nu.inspect.core.source.module`, bound as a function. Builds `tuple[Member, ...]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `module` | `ModuleType` |  |  |

Undocumented: example.

## code

Module `nu.inspect.core.source.code`.

Source reading: an object in, its source text and location out.

Every call here touches the filesystem, so nothing in a catalogue may call
it eagerly. Records reach for it per lookup, never per build. Objects with
no readable source (builtins, dynamically built classes) come back as None.

| Name | Call | Meaning |
| --- | --- | --- |
| [read_location](#read_location) | `source.read_location(target)` | The file and first line of `target`, or None when unknown. |
| [read_source](#read_source) | `source.read_source(target)` | The source of `target`, or None when there is none to read. |

### read_location

The file and first line of `target`, or None when unknown.

```python
source.read_location(target)
```

Path `nu.inspect.core.source.read_location`. Defined on `nu.inspect.core.source.code`, bound as a function. Builds `tuple[str, int] | None`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `target` | `object` |  |  |

Undocumented: example.

### read_source

The source of `target`, or None when there is none to read.

```python
source.read_source(target)
```

Path `nu.inspect.core.source.read_source`. Defined on `nu.inspect.core.source.code`, bound as a function. Builds `Source | None`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `target` | `object` |  |  |

Undocumented: example.

## signature

Module `nu.inspect.core.source.signature`.

Signature reading: a callable in, its parameters out. No Nu knowledge.

Reports positional and keyword parameters with their defaults and
annotations, whether the callable is variadic in either direction, and
whether it is a classmethod or a staticmethod. Anything unreadable (a C
builtin, a slot wrapper) comes back as None rather than raising.

Rendering a call form is not here: it is built from the merged arguments, so
it belongs to `core.contract.call` where the merge happens.

| Name | Call | Meaning |
| --- | --- | --- |
| [read_signature](#read_signature) | `source.read_signature(target, receiver=False)` | Read `target`'s signature, or None when it has none to read. |

### read_signature

Read `target`'s signature, or None when it has none to read.

```python
source.read_signature(target, receiver=False)
```

Path `nu.inspect.core.source.read_signature`. Defined on `nu.inspect.core.source.signature`, bound as a function. Builds `Signature | None`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `target` | `object` |  | the callable, or a class whose `__init__` is read. |
| `receiver` | `bool` | `False` | whether `target` is an unbound method, whose leading `self` or `cls` is the receiver rather than a parameter. A class knows this about its own `__init__`; a function reached by an MRO walk does not, and only the caller that walked it can say. |

Undocumented: example.

## unpack

Module `nu.inspect.core.source.unpack`.

Read how many names a function unpacks a variable into. No Nu knowledge.

Some structural facts are stated in code rather than in a signature. A
function that opens with `left, right = children` says two out loud, and
that is worth reading when the signature says only "any number".

Source-reading, so it is a checker, not a hot path.

| Name | Call | Meaning |
| --- | --- | --- |
| [unpacked_count](#unpacked_count) | `source.unpacked_count(func, variable)` | How many names `func` unpacks `variable` into. |

### unpacked_count

How many names `func` unpacks `variable` into.

```python
source.unpacked_count(func, variable)
```

Path `nu.inspect.core.source.unpacked_count`. Defined on `nu.inspect.core.source.unpack`, bound as a function. Builds `int | None`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `func` | `object` |  | the function to read. |
| `variable` | `str` |  | the name being unpacked, e.g. `"children"`. |

Undocumented: example.

## mro

Module `nu.inspect.core.source.mro`.

MRO walking: a class in, its callable members out, attributed to definers.

For a class `C`, the answer to "what can be called on it" is spread across its
MRO. This walk resolves each name to the class that actually defines it, so a
consumer sees `append` once, tagged with `MutableSequenceForm`, and does not
have to walk the hierarchy itself.

No Nu knowledge. The caller supplies the stop class, and everything at or
above it is left alone. That is how `>>`, `|` and `&` stay the `Nu` record's
business rather than reappearing on every Form and Ref.

| Name | Call | Meaning |
| --- | --- | --- |
| [walk_bindings](#walk_bindings) | `source.walk_bindings(cls, stop, include_dunders=True, skip=frozenset())` | Every callable member `cls` inherits from below `stop`. |

### walk_bindings

Every callable member `cls` inherits from below `stop`.

```python
source.walk_bindings(cls, stop, include_dunders=True, skip=frozenset())
```

Path `nu.inspect.core.source.walk_bindings`. Defined on `nu.inspect.core.source.mro`, bound as a function. Builds `tuple[Binding, ...]`.

Walks `cls.__mro__` and for each public name, or each dunder we care
about, finds the first class whose `__dict__` defines it. Classes at or
above `stop` are ignored, so anything they carry belongs to their own
record and not to `cls`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cls` | `type` |  | the class to walk. |
| `stop` | `type` |  | the horizon; a class at or above `stop` in the MRO is skipped. |
| `include_dunders` | `bool` | `True` | whether to include the operator dunders we recognise. |
| `skip` | `frozenset[str]` | `frozenset()` | names to leave out. Used for the declaration-time DSL entries (`slot`, `method`) that belong to the shape and service kinds rather than to the form/ref surface. |

Undocumented: example.

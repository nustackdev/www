---
title: forms
description: "Native Form layer."
---

Module `nu.forms`.

Native Form layer.

A Form is what a fabric location holds (an Int, a Str, a Dict, a ToList) and the
fluent typed surface for building Nu over it. The base mixin `Form` and the
passthrough `TypedNu` live in `nu.lang` (re-exported here for convenience);
the sentinel queries (`IsEmpty`, `Fallback`) live in `nu.core`.

Concrete primitive Forms live in `primitives/`, concrete collection Forms in
`collections/` (with abstract contracts in `collections/abc/`).

**Modules**

| Module | What |
| --- | --- |
| [`nu.forms.collections.abc`](/docs/nu/reference/forms/collections/abc) | Generic collection interfaces and interactions. |

## nu.lang.forms

Module `nu.lang.forms`.

Form and TypedNu - the type-wrapping layer.

[Full entries](/docs/nu/reference/forms/nu-lang-forms)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [TypedNu](/docs/nu/reference/forms/nu-lang-forms#typednu) | `scalar_query` | `TypedNu()` | Transparent ScalarQuery passthrough carrying a python type tag `T`. |
| [TypedNuStream](/docs/nu/reference/forms/nu-lang-forms#typednustream) | `stream_query` | `TypedNuStream()` | Transparent StreamQuery passthrough carrying a python type tag `T`. |

## primitives.bool_

Module `nu.forms.primitives.bool_`.

Bool - boolean interface.

[Full entries](/docs/nu/reference/forms/primitives-bool)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Bool](/docs/nu/reference/forms/primitives-bool#bool) | `scalar_query` | `Bool()` | Boolean interface. Logical + comparable. |

## primitives.bytes_

Module `nu.forms.primitives.bytes_`.

Bytes - bytes interface.

[Full entries](/docs/nu/reference/forms/primitives-bytes)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Bytes](/docs/nu/reference/forms/primitives-bytes#bytes) | `scalar_query` | `Bytes()` | Bytes interface. Sliceable + comparable + logical + bytes methods. |

## collections.dict_

Module `nu.forms.collections.dict_`.

Dict - dict interface.

[Full entries](/docs/nu/reference/forms/collections-dict)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Dict](/docs/nu/reference/forms/collections-dict#dict) | `scalar_query` | `Dict()` | Dict interface. Mutable mapping + comparable. |

## collections.views

Module `nu.forms.collections.views`.

Dict view interfaces - DictKeys, DictValues, DictItems.

[Full entries](/docs/nu/reference/forms/collections-views)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [DictItems](/docs/nu/reference/forms/collections-views#dictitems) | `scalar_query` | `DictItems()` | View of a Dict's `(key, value)` pairs, produced by `dict.items()`. |
| [DictKeys](/docs/nu/reference/forms/collections-views#dictkeys) | `scalar_query` | `DictKeys()` | View of a Dict's keys, produced by `dict.keys()`. |
| [DictValues](/docs/nu/reference/forms/collections-views#dictvalues) | `scalar_query` | `DictValues()` | View of a Dict's values, produced by `dict.values()`. |

## primitives.sentinel_

Module `nu.forms.primitives.sentinel_`.

Sentinel interfaces - SentinelForm, EmptyForm.

[Full entries](/docs/nu/reference/forms/primitives-sentinel)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [EmptyForm](/docs/nu/reference/forms/primitives-sentinel#emptyform) | `scalar_query` | `EmptyForm()` | Wraps EMPTY, the no-value sentinel. |
| [SentinelForm](/docs/nu/reference/forms/primitives-sentinel#sentinelform) | `scalar_query` | `SentinelForm()` | Base for the sentinel interfaces. |

## primitives.float_

Module `nu.forms.primitives.float_`.

Float - float interface.

[Full entries](/docs/nu/reference/forms/primitives-float)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Float](/docs/nu/reference/forms/primitives-float#float) | `scalar_query` | `Float()` | Float interface. Numeric + comparable + logical. |

## collections.set_

Module `nu.forms.collections.set_`.

Set, FrozenSet - set interfaces.

[Full entries](/docs/nu/reference/forms/collections-set)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [FrozenSet](/docs/nu/reference/forms/collections-set#frozenset) | `scalar_query` | `FrozenSet()` | FrozenSet interface. Immutable set + comparable. |
| [Set](/docs/nu/reference/forms/collections-set#set) | `scalar_query` | `Set()` | Set interface. Mutable set + comparable. |

## primitives.int_

Module `nu.forms.primitives.int_`.

Int - integer interface.

[Full entries](/docs/nu/reference/forms/primitives-int)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Int](/docs/nu/reference/forms/primitives-int#int) | `scalar_query` | `Int()` | Integer interface. Full numeric + comparable + logical + bitwise. |

## collections.iterator_

Module `nu.forms.collections.iterator_`.

Iterator - lazy stream form.

[Full entries](/docs/nu/reference/forms/collections-iterator)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Iterator](/docs/nu/reference/forms/collections-iterator#iterator) | `stream_query` | `Iterator()` | Lazy stream over another form's elements. |

## collections.list_

Module `nu.forms.collections.list_`.

List - list interface.

[Full entries](/docs/nu/reference/forms/collections-list)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [List](/docs/nu/reference/forms/collections-list#list) | `scalar_query` | `List()` | List interface. Mutable sequence + comparable. |

## primitives.none_

Module `nu.forms.primitives.none_`.

None_ - none interface.

[Full entries](/docs/nu/reference/forms/primitives-none)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [None_](/docs/nu/reference/forms/primitives-none#none_) | `scalar_query` | `None_(source=None)` | None interface. Logical only. |

## primitives.object_

Module `nu.forms.primitives.object_`.

Object - the interface every term has.

[Full entries](/docs/nu/reference/forms/primitives-object)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Object](/docs/nu/reference/forms/primitives-object#object) | `scalar_query` | `Object()` | The interface every term has. Full operator surface, no promise about the runtime type. |

## primitives.str_

Module `nu.forms.primitives.str_`.

Str - string interface.

[Full entries](/docs/nu/reference/forms/primitives-str)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Str](/docs/nu/reference/forms/primitives-str#str) | `scalar_query` | `Str()` | String interface. Addable + sliceable + comparable + logical + string methods. |

## collections.tuple_

Module `nu.forms.collections.tuple_`.

Tuple - tuple interface.

[Full entries](/docs/nu/reference/forms/collections-tuple)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Tuple](/docs/nu/reference/forms/collections-tuple#tuple) | `scalar_query` | `Tuple()` | Tuple interface. Immutable sequence + comparable. |

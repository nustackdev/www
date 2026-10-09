---
title: core
description: "Nu core: every interaction a program is built from."
---

Module `nu.core`.

Nu core: every interaction a program is built from.

`nu.core` is the home of the atoms. Its own surface is the native standard
terms - the builtins - and the three other atom families sit beside them as
subpackages:

- `flows`    - control flow (`Sequential`, `Parallel`, `Race`, `IfDo`,
  `WhileDo`, `Stream`).
- `spans`    - transparent wrappers governing a region (`Retry`,
  `Timeout`, `TryCatch`, `Transaction`, `Snapshot`).
- `reactive` - the reactivity standard: the observer contract plus the
  `On*Change` atoms fabrics bind against.

Everything under here is an Interaction. Forms (`nu.forms`), the kind
taxonomy (`nu.lang`) and the fabric refs (`nu.context`, and the fabrics in
`nustd`) are separate concerns with their own homes. The whole surface
re-exports flat from the root, so day to day you write `nu.Add` /
`nu.Sequential` / `nu.Retry` and never name this package.

#### The native standard terms

Concrete atoms layered on `nu.lang`'s sort taxonomy - the kinds a real Nu
program is built from. The goal is a 1:1 map of Python's native builtin
functions (the ones that are not methods of a class) onto Nu interactions:
`abs` -> `Abs`, `getattr` -> `GetAttr`, `print` -> `Print`. Library
functions (itertools, functools, ...) are not core; they land in `nustd` in a
later pass. Class methods land in extensions later too.

Files group atoms by **Python domain**, not by sort - one file per logical
family, crossing Query / Command / Action as the builtins do:

- `literal` - the constant-yielding ScalarQuery
- `arithmetic` - numeric ops (Add, Sub, Mul, Pow, Abs, DivMod, Round)
- `comparison` - ordering and identity (Eq, Lt, Gt, Is)
- `logical` - boolean ops (And, Or, Not, ToBool)
- `conditional` - value-yielding branch selection (If)
- `bitwise` - bit ops (BitAnd, BitOr, BitXor, LShift)
- `cast` - type construction / conversion (ToInt, ToStr, ToList, ToDict, ToSet)
- `repr` - representations (Repr, Format, Bin, Hex, Ord, Chr)
- `access` - item and attribute access (GetItem, Len, GetAttr, SetAttr)
- `iteration` - iterator sources (Iter, Next, Enumerate, Zip, Reversed)
- `transform` - stream-to-stream lenses (Map, Filter, Sorted, Flatten)
- `reduction` - stream-to-scalar folds (Sum, Min, Max, AnyOf, AllOf, Collect)
- `reflection` - introspection (Type, IsInstance, Callable, Id, Hash)
- `sentinel` - the EMPTY / INVALID predicates (IsEmpty, IsInvalid)
- `io` - console effects through the stdio fabric (Print, Input).
        Logging lives at `nustd.logging` -- a Python `logging` module wrap.
- `dynamic` - host-namespace escape hatches (Globals, Locals)

This surface is the pure Python builtins. The fabric interactions (writing
through a Ref into the Context store, a database, stdio) live in their own
fabric dirs - `nu.context` owns `SetCmd` / `Delete` / `AttrRef`, not
here - and the Forms layer (types, classes) has its own home at `nu.forms`.
Flows and Spans (Seq, Par, If, Retry, Transaction) are the subpackages above.

**Modules**

| Module | What |
| --- | --- |
| [`nu.core.flows`](/docs/reference/nu/core/flows) | Nu2 Flow atoms: the Command-composing sub-kind. |
| [`nu.core.spans`](/docs/reference/nu/core/spans) | Span atoms: transparent Interactions that wrap a body to govern a region. |

## arithmetic

Module `nu.core.arithmetic`.

Arithmetic atoms: Python's numeric builtins and operators.

[Full entries](/docs/reference/nu/core/arithmetic)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Abs](/docs/reference/nu/core/arithmetic#abs) | `scalar_query` | `Abs(value)` | The absolute value of its one child. |
| [Add](/docs/reference/nu/core/arithmetic#add) | `scalar_query` | `Add(*children)` | The sum of its scalar children. |
| [Div](/docs/reference/nu/core/arithmetic#div) | `scalar_query` | `Div(left, right)` | The first child divided by the second (true division). |
| [DivMod](/docs/reference/nu/core/arithmetic#divmod) | `scalar_query` | `DivMod(left, right)` | The `(quotient, remainder)` pair of its two children. |
| [FloorDiv](/docs/reference/nu/core/arithmetic#floordiv) | `scalar_query` | `FloorDiv(left, right)` | The first child floor-divided by the second. |
| [MatMul](/docs/reference/nu/core/arithmetic#matmul) | `scalar_query` | `MatMul(left, right)` | The matrix product of its two children. |
| [Mod](/docs/reference/nu/core/arithmetic#mod) | `scalar_query` | `Mod(left, right)` | The first child modulo the second. |
| [Mul](/docs/reference/nu/core/arithmetic#mul) | `scalar_query` | `Mul(*children)` | The product of its scalar children. |
| [Neg](/docs/reference/nu/core/arithmetic#neg) | `scalar_query` | `Neg(value)` | The arithmetic negation of its one child. |
| [Pos](/docs/reference/nu/core/arithmetic#pos) | `scalar_query` | `Pos(value)` | The unary plus of its one child. |
| [Pow](/docs/reference/nu/core/arithmetic#pow) | `scalar_query` | `Pow(base, exponent)` | The first child raised to the power of the second. |
| [Round](/docs/reference/nu/core/arithmetic#round) | `scalar_query` | `Round(value, ndigits)` | The first child rounded, to the second child's digits when given. |
| [Sub](/docs/reference/nu/core/arithmetic#sub) | `scalar_query` | `Sub(left, right)` | The first child minus the second. |

## reduction

Module `nu.core.reduction`.

Reduction atoms: Python's stream-to-scalar builtins.

[Full entries](/docs/reference/nu/core/reduction)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AllOf](/docs/reference/nu/core/reduction#allof) | `reduction` | `AllOf(stream)` | True if every item in its stream child is truthy (`all`). |
| [AnyOf](/docs/reference/nu/core/reduction#anyof) | `reduction` | `AnyOf(stream)` | True if any item in its stream child is truthy (`any`). |
| [Collect](/docs/reference/nu/core/reduction#collect) | `reduction` | `Collect(stream)` | Drains its stream child into one list value. |
| [Count](/docs/reference/nu/core/reduction#count) | `reduction` | `Count(stream)` | The number of items in its stream child (`len` over a stream). |
| [First](/docs/reference/nu/core/reduction#first) | `reduction` | `First(stream)` | The first item of its stream child. |
| [Last](/docs/reference/nu/core/reduction#last) | `reduction` | `Last(stream)` | The last item of its stream child. |
| [Max](/docs/reference/nu/core/reduction#max) | `reduction` | `Max(stream)` | The largest item in its stream child (`max`). |
| [Min](/docs/reference/nu/core/reduction#min) | `reduction` | `Min(stream)` | The smallest item in its stream child (`min`). |
| [Sum](/docs/reference/nu/core/reduction#sum) | `reduction` | `Sum(stream)` | The sum of every item in its stream child (`sum`). |

## logical

Module `nu.core.logical`.

Logical atoms: Python's boolean operators and truthiness.

[Full entries](/docs/reference/nu/core/logical)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [And](/docs/reference/nu/core/logical#and) | `scalar_query` | `And(*children)` | The conjunction of its boolean children, each coerced with `bool`. |
| [Not](/docs/reference/nu/core/logical#not) | `scalar_query` | `Not(value)` | The negation of its one child. |
| [Or](/docs/reference/nu/core/logical#or) | `scalar_query` | `Or(*children)` | The disjunction of its boolean children, each coerced with `bool`. |
| [ToBool](/docs/reference/nu/core/logical#tobool) | `scalar_query` | `ToBool(value)` | The truthiness of its one child. |
| [bool](/docs/reference/nu/core/logical#bool) |  | `core.bool(x)` | Coerce `x` to a Nu `Bool` term. |

## repr

Module `nu.core.repr`.

Representation atoms: Python's string and number renderings.

[Full entries](/docs/reference/nu/core/repr)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Ascii](/docs/reference/nu/core/repr#ascii) | `scalar_query` | `Ascii(value)` | The `ascii` string of its one child, with non-ASCII escaped. |
| [Bin](/docs/reference/nu/core/repr#bin) | `scalar_query` | `Bin(value)` | The binary string (`0b...`) of its one integer child. |
| [Chr](/docs/reference/nu/core/repr#chr) | `scalar_query` | `Chr(value)` | The character for its one integer code-point child. |
| [Format](/docs/reference/nu/core/repr#format) | `scalar_query` | `Format(value, spec)` | The `format` of a value under an optional format spec. |
| [Hex](/docs/reference/nu/core/repr#hex) | `scalar_query` | `Hex(value)` | The hexadecimal string (`0x...`) of its one integer child. |
| [Oct](/docs/reference/nu/core/repr#oct) | `scalar_query` | `Oct(value)` | The octal string (`0o...`) of its one integer child. |
| [Ord](/docs/reference/nu/core/repr#ord) | `scalar_query` | `Ord(value)` | The Unicode code point of its one single-character child. |
| [Repr](/docs/reference/nu/core/repr#repr) | `scalar_query` | `Repr(value)` | The `repr` string of its one child. |

## bitwise

Module `nu.core.bitwise`.

Bitwise atoms: Python's bit-level operators.

[Full entries](/docs/reference/nu/core/bitwise)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [BitAnd](/docs/reference/nu/core/bitwise#bitand) | `scalar_query` | `BitAnd(*children)` | The bitwise AND of its scalar children. |
| [BitNot](/docs/reference/nu/core/bitwise#bitnot) | `scalar_query` | `BitNot(value)` | The bitwise NOT of its one child. |
| [BitOr](/docs/reference/nu/core/bitwise#bitor) | `scalar_query` | `BitOr(*children)` | The bitwise OR of its scalar children. |
| [BitXor](/docs/reference/nu/core/bitwise#bitxor) | `scalar_query` | `BitXor(*children)` | The bitwise XOR of its scalar children. |
| [LShift](/docs/reference/nu/core/bitwise#lshift) | `scalar_query` | `LShift(value, count)` | The first child shifted left by the second. |
| [RShift](/docs/reference/nu/core/bitwise#rshift) | `scalar_query` | `RShift(value, count)` | The first child shifted right by the second. |

## reflection

Module `nu.core.reflection`.

Reflection atoms: Python's introspection builtins.

[Full entries](/docs/reference/nu/core/reflection)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Callable](/docs/reference/nu/core/reflection#callable) | `scalar_query` | `Callable(value)` | Whether its one child appears callable (`callable`). |
| [Dir](/docs/reference/nu/core/reflection#dir) | `scalar_query` | `Dir(value)` | The sorted attribute-name list of its one child (`dir`). |
| [Hash](/docs/reference/nu/core/reflection#hash) | `scalar_query` | `Hash(value)` | The hash of its one child (`hash`). |
| [Id](/docs/reference/nu/core/reflection#id) | `scalar_query` | `Id(value)` | The identity of its one child (`id`). |
| [IsInstance](/docs/reference/nu/core/reflection#isinstance) | `scalar_query` | `IsInstance(value, klass)` | Whether the first child is an instance of the second (`isinstance`). |
| [IsSubclass](/docs/reference/nu/core/reflection#issubclass) | `scalar_query` | `IsSubclass(cls, klass)` | Whether the first child is a subclass of the second (`issubclass`). |
| [Type](/docs/reference/nu/core/reflection#type) | `scalar_query` | `Type(value)` | The type of its one child (`type`). |
| [Vars](/docs/reference/nu/core/reflection#vars) | `scalar_query` | `Vars(value)` | The `__dict__` of its one child (`vars`). |

## access

Module `nu.core.access`.

Access atoms: Python's item and attribute management.

[Full entries](/docs/reference/nu/core/access)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Contains](/docs/reference/nu/core/access#contains) | `scalar_query` | `Contains(container, item)` | Containment: `item in container`. |
| [DelAttr](/docs/reference/nu/core/access#delattr) | `scalar_command` | `DelAttr(obj, name)` | Attribute delete: `delattr(obj, name)`. |
| [DelItem](/docs/reference/nu/core/access#delitem) | `scalar_command` | `DelItem(target, key)` | Subscript delete: `del x[k]`. |
| [GetAttr](/docs/reference/nu/core/access#getattr) | `scalar_query` | `GetAttr(obj, name, default)` | Attribute read: `getattr(obj, name[, default])`. |
| [GetItem](/docs/reference/nu/core/access#getitem) | `scalar_query` | `GetItem(target, key)` | Subscript access: `x[k]`. |
| [HasAttr](/docs/reference/nu/core/access#hasattr) | `scalar_query` | `HasAttr(obj, name)` | Attribute presence: `hasattr(obj, name)`. |
| [Len](/docs/reference/nu/core/access#len) | `scalar_query` | `Len(value)` | Length: `len(x)` of its one child. |
| [SetAttr](/docs/reference/nu/core/access#setattr) | `scalar_command` | `SetAttr(obj, name, value)` | Attribute write: `setattr(obj, name, value)`. |
| [SetItem](/docs/reference/nu/core/access#setitem) | `scalar_command` | `SetItem(target, key, value)` | Subscript write: `x[k] = v`. |
| [Slice](/docs/reference/nu/core/access#slice) | `scalar_query` | `Slice(start, stop, step)` | The `slice(...)` builtin: builds a slice object. |

## iteration

Module `nu.core.iteration`.

Iteration atoms: Python's iterator sources and stepping.

[Full entries](/docs/reference/nu/core/iteration)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Enumerate](/docs/reference/nu/core/iteration#enumerate) | `stream_query` | `Enumerate(source, start)` | Pairs each item of a source child with its running index. |
| [Iter](/docs/reference/nu/core/iteration#iter) | `stream_query` | `Iter(source)` | Opens a scalar iterable child into a stream of its elements. |
| [Next](/docs/reference/nu/core/iteration#next) | `scalar_action` | `Next(iterator)` | Advances a ref-held iterator child and yields the item it pulls. |
| [Reversed](/docs/reference/nu/core/iteration#reversed) | `stream_query` | `Reversed(source)` | Yields the items of a source child in reverse order. |
| [Zip](/docs/reference/nu/core/iteration#zip) | `stream_query` | `Zip(*sources)` | Threads several source children together item by item. |

## comparison

Module `nu.core.comparison`.

Comparison atoms: Python's ordering and identity operators.

[Full entries](/docs/reference/nu/core/comparison)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Eq](/docs/reference/nu/core/comparison#eq) | `scalar_query` | `Eq(left, right)` | Whether its two children are equal (`==`). |
| [Ge](/docs/reference/nu/core/comparison#ge) | `scalar_query` | `Ge(left, right)` | Whether the first child is greater than or equal to the second (`>=`). |
| [Gt](/docs/reference/nu/core/comparison#gt) | `scalar_query` | `Gt(left, right)` | Whether the first child is greater than the second (`>`). |
| [Is](/docs/reference/nu/core/comparison#is) | `scalar_query` | `Is(left, right)` | Whether its two children are the same object (`is`). |
| [Le](/docs/reference/nu/core/comparison#le) | `scalar_query` | `Le(left, right)` | Whether the first child is less than or equal to the second (`<=`). |
| [Lt](/docs/reference/nu/core/comparison#lt) | `scalar_query` | `Lt(left, right)` | Whether the first child is less than the second (`<`). |
| [Ne](/docs/reference/nu/core/comparison#ne) | `scalar_query` | `Ne(left, right)` | Whether its two children are unequal (`!=`). |

## transform

Module `nu.core.transform`.

Transform atoms: Python's stream-to-stream builtins.

[Full entries](/docs/reference/nu/core/transform)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Filter](/docs/reference/nu/core/transform#filter) | `stream_query` | `Filter(source, predicate, key='item')` | Keeps the items of a stream child for which a predicate holds (lazy). |
| [Flatten](/docs/reference/nu/core/transform#flatten) | `stream_query` | `Flatten(source)` | Concatenates a source of iterables one level into a flat stream (lazy). |
| [Map](/docs/reference/nu/core/transform#map) | `stream_query` | `Map(source, transform, key='item')` | Applies a query child to every item of a stream child (lazy). |
| [SortBy](/docs/reference/nu/core/transform#sortby) | `stream_query` | `SortBy(source, key, reverse=False, item='item')` | Its source child, ordered by a per-item key expression (eager). |
| [Sorted](/docs/reference/nu/core/transform#sorted) | `stream_query` | `Sorted(source)` | Its source child, ordered (eager). |
| [Unique](/docs/reference/nu/core/transform#unique) | `stream_query` | `Unique(source)` | Yields each item of a source child once, first-seen order (lazy). |

## dynamic

Module `nu.core.dynamic`.

Dynamic dispatch atoms: reach into the live Python interpreter namespace.

[Full entries](/docs/reference/nu/core/dynamic)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Globals](/docs/reference/nu/core/dynamic#globals) | `scalar_query` | `Globals()` | ESCAPE HATCH: the host module namespace dict. |
| [Locals](/docs/reference/nu/core/dynamic#locals) | `scalar_query` | `Locals()` | ESCAPE HATCH: the host local namespace dict. |

## conditional

Module `nu.core.conditional`.

Conditional atoms: value-yielding branch selection.

[Full entries](/docs/reference/nu/core/conditional)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [If](/docs/reference/nu/core/conditional#if) | `scalar_query` | `If(cond, then, else_)` | The `then` branch if `cond` is truthy, else the `else_` branch. |
| [Switch](/docs/reference/nu/core/conditional#switch) | `scalar_query` | `Switch(selector, cases, default=None)` | The case value whose key matches the selector, or the default. |

## io

Module `nu.core.io`.

IO: console read/write through the stdio fabric.

[Full entries](/docs/reference/nu/core/io)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Input](/docs/reference/nu/core/io#input) | `scalar_action` | `Input(ref)` | Reads one line from the stdin fabric Ref in slot 0 and yields it. |
| [Print](/docs/reference/nu/core/io#print) | `scalar_command` | `Print(ref, sep=' ', end='\n', flush=False)` | Writes the values in slots 1.. to the stdout fabric Ref in slot 0. |
| [input](/docs/reference/nu/core/io#input-1) |  | `core.input()` | Read one line from stdin (newline stripped) and yield it as a `Str`. |
| [print](/docs/reference/nu/core/io#print-1) |  | `core.print(sep=' ', end='\n', file=None, flush=False)` | Write `values` to a stdio stream. Mirrors `builtins.print`. |

## sentinel

Module `nu.core.sentinel`.

Sentinel atoms: the predicates that observe EMPTY / INVALID.

[Full entries](/docs/reference/nu/core/sentinel)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [IsEmpty](/docs/reference/nu/core/sentinel#isempty) | `scalar_query` | `IsEmpty(value)` | True if its one child yields the EMPTY sentinel. |
| [IsInvalid](/docs/reference/nu/core/sentinel#isinvalid) | `scalar_query` | `IsInvalid(value)` | True if its one child yields the INVALID sentinel. |
| [NotEmpty](/docs/reference/nu/core/sentinel#notempty) | `scalar_query` | `NotEmpty(value)` | True if its one child does not yield EMPTY. |
| [NotInvalid](/docs/reference/nu/core/sentinel#notinvalid) | `scalar_query` | `NotInvalid(value)` | True if its one child does not yield INVALID. |

## reactive.interactions

Module `nu.core.reactive.interactions`.

Reactive change subscriptions -- unified interaction atoms.

[Full entries](/docs/reference/nu/core/reactive-interactions)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [OnChange](/docs/reference/nu/core/reactive-interactions#onchange) | `scalar_query` | `OnChange(ref)` | Opens a subscription to any change on a Ref's view. |
| [OnChildChange](/docs/reference/nu/core/reactive-interactions#onchildchange) | `scalar_query` | `OnChildChange(ref, address)` | Opens a subscription to changes on one named child of a Ref's view. |
| [OnChildrenChange](/docs/reference/nu/core/reactive-interactions#onchildrenchange) | `scalar_query` | `OnChildrenChange(ref)` | Opens a subscription to changes on any immediate child of a Ref's view. |
| [OnDescendantsChange](/docs/reference/nu/core/reactive-interactions#ondescendantschange) | `scalar_query` | `OnDescendantsChange(ref, *pattern)` | Opens a subscription to descendants of a Ref's view matching a pattern. |
| [OnPrimitiveChange](/docs/reference/nu/core/reactive-interactions#onprimitivechange) | `scalar_query` | `OnPrimitiveChange(ref)` | Opens a subscription to changes at a leaf Ref, through its parent view. |

## cast

Module `nu.core.cast`.

Cast atoms: Python's type constructors and conversions.

[Full entries](/docs/reference/nu/core/cast)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ToByteArray](/docs/reference/nu/core/cast#tobytearray) | `scalar_query` | `ToByteArray(value, encoding)` | The operand cast to `bytearray`. |
| [ToBytes](/docs/reference/nu/core/cast#tobytes) | `scalar_query` | `ToBytes(value, encoding)` | The operand cast to `bytes`. |
| [ToComplex](/docs/reference/nu/core/cast#tocomplex) | `scalar_query` | `ToComplex(real, imag)` | The operand cast to `complex`. |
| [ToDict](/docs/reference/nu/core/cast#todict) | `scalar_query` | `ToDict(value)` | The key/value pairs of the iterable child collected into a `dict`. |
| [ToFloat](/docs/reference/nu/core/cast#tofloat) | `scalar_query` | `ToFloat(value)` | The operand cast to `float`. |
| [ToFrozenSet](/docs/reference/nu/core/cast#tofrozenset) | `scalar_query` | `ToFrozenSet(value)` | The iterable child collected into a `frozenset`. |
| [ToInt](/docs/reference/nu/core/cast#toint) | `scalar_query` | `ToInt(value, base)` | The operand cast to `int`. |
| [ToList](/docs/reference/nu/core/cast#tolist) | `scalar_query` | `ToList(value)` | The iterable child collected into a `list`. |
| [ToSet](/docs/reference/nu/core/cast#toset) | `scalar_query` | `ToSet(value)` | The iterable child collected into a `set`. |
| [ToStr](/docs/reference/nu/core/cast#tostr) | `scalar_query` | `ToStr(value)` | The operand cast to `str`. |
| [ToTuple](/docs/reference/nu/core/cast#totuple) | `scalar_query` | `ToTuple(value)` | The iterable child collected into a `tuple`. |

## cast_fns

Module `nu.core.cast_fns`.

Cast wrappers: coerce `x` into a Nu term of the target Form.

[Full entries](/docs/reference/nu/core/cast-fns)

| Name | Call | Meaning |
| --- | --- | --- |
| [dict](/docs/reference/nu/core/cast-fns#dict) | `core.dict(x)` | Coerce `x` to a Nu `Dict` term. `Dict(ToDict(x))` in one call. |
| [float](/docs/reference/nu/core/cast-fns#float) | `core.float(x)` | Coerce `x` to a Nu `Float` term. `Float(ToFloat(x))` in one call. |
| [frozenset](/docs/reference/nu/core/cast-fns#frozenset) | `core.frozenset(x)` | Coerce `x` to a Nu `FrozenSet` term. `FrozenSet(ToFrozenSet(x))` in one call. |
| [int](/docs/reference/nu/core/cast-fns#int) | `core.int(x)` | Coerce `x` to a Nu `Int` term. `Int(ToInt(x))` in one call. |
| [list](/docs/reference/nu/core/cast-fns#list) | `core.list(x)` | Coerce `x` to a Nu `List` term. `List(ToList(x))` in one call. |
| [set](/docs/reference/nu/core/cast-fns#set) | `core.set(x)` | Coerce `x` to a Nu `Set` term. `Set(ToSet(x))` in one call. |
| [str](/docs/reference/nu/core/cast-fns#str) | `core.str(x)` | Coerce `x` to a Nu `Str` term. `Str(ToStr(x))` in one call. |
| [tuple](/docs/reference/nu/core/cast-fns#tuple) | `core.tuple(x)` | Coerce `x` to a Nu `Tuple` term. `Tuple(ToTuple(x))` in one call. |

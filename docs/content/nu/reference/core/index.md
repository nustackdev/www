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
  `WhileDo`).
- `spans`    - transparent wrappers governing a region (`Retry`,
  `Timeout`, `TryCatch`, `Transaction`, `Snapshot`).
- `reactive` - the reactivity standard: the observer contract, the
  `On*Change` atoms fabrics bind against, and the flows that run bodies on
  change (event: `React` and kin; level: `ReconcileReactive` and kin; `Stream`).

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
- `conditional` - value-yielding branch selection (If, Switch)
- `bitwise` - bit ops (BitAnd, BitOr, BitXor, LShift)
- `cast` - type construction / conversion (ToInt, ToStr, ToList, ToDict, ToSet)
- `repr` - representations (Repr, Format, Bin, Hex, Ord, Chr)
- `access` - item and attribute access (GetItem, Len, GetAttr, SetAttr)
- `iteration` - iterator sources (Iter, Next, Enumerate, Zip, Reversed)
- `transform` - iterable transforms (Map, Filter, Flatten as stream lenses;
  Sorted yields a list)
- `reduction` - stream-to-scalar folds (Sum, Min, Max, AnyOf, AllOf, Collect)
- `reflection` - introspection (Type, IsInstance, Callable, Id, Hash)
- `sentinel` - the queries that observe EMPTY (IsEmpty, Fallback)
- `io` - console effects through the stdio fabric (Print, Input).
        Logging lives at `nustd.logging` -- a Python `logging` module wrap.
- `dynamic` - host-namespace escape hatches (Globals, Locals)

This surface is the pure Python builtins. The fabric interactions (writing
through a Ref into the Context store, a database, stdio) live in their own
fabric dirs - `nu.context` owns the attrs read `Attr`, not
here - and the Forms layer (types, classes) has its own home at `nu.forms`.
Flows and Spans (Seq, Par, If, Retry, Transaction) are the subpackages above.

**Modules**

| Module | What |
| --- | --- |
| [`nu.core.flows`](/docs/nu/reference/core/flows) | Nu2 Flow atoms: the Command-composing sub-kind. |
| [`nu.core.spans`](/docs/nu/reference/core/spans) | Span atoms: transparent Interactions that wrap a body to govern a region. |

## arithmetic

Module `nu.core.arithmetic`.

Arithmetic atoms: Python's numeric builtins and operators.

[Full entries](/docs/nu/reference/core/arithmetic)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Abs](/docs/nu/reference/core/arithmetic#abs) | `scalar_query` | `Abs(value)` | The absolute value of its one child. |
| [Add](/docs/nu/reference/core/arithmetic#add) | `scalar_query` | `Add(*children)` | The sum of its scalar children. |
| [Div](/docs/nu/reference/core/arithmetic#div) | `scalar_query` | `Div(left, right)` | The first child divided by the second (true division). |
| [DivMod](/docs/nu/reference/core/arithmetic#divmod) | `scalar_query` | `DivMod(left, right)` | The `(quotient, remainder)` pair of its two children. |
| [FloorDiv](/docs/nu/reference/core/arithmetic#floordiv) | `scalar_query` | `FloorDiv(left, right)` | The first child floor-divided by the second. |
| [MatMul](/docs/nu/reference/core/arithmetic#matmul) | `scalar_query` | `MatMul(left, right)` | The matrix product of its two children. |
| [Mod](/docs/nu/reference/core/arithmetic#mod) | `scalar_query` | `Mod(left, right)` | The first child modulo the second. |
| [Mul](/docs/nu/reference/core/arithmetic#mul) | `scalar_query` | `Mul(*children)` | The product of its scalar children. |
| [Neg](/docs/nu/reference/core/arithmetic#neg) | `scalar_query` | `Neg(value)` | The arithmetic negation of its one child. |
| [Pos](/docs/nu/reference/core/arithmetic#pos) | `scalar_query` | `Pos(value)` | The unary plus of its one child. |
| [Pow](/docs/nu/reference/core/arithmetic#pow) | `scalar_query` | `Pow(base, exponent)` | The first child raised to the power of the second. |
| [Round](/docs/nu/reference/core/arithmetic#round) | `scalar_query` | `Round(value, ndigits)` | The first child rounded, to the second child's digits when given. |
| [Sub](/docs/nu/reference/core/arithmetic#sub) | `scalar_query` | `Sub(left, right)` | The first child minus the second. |

## reduction

Module `nu.core.reduction`.

Reduction atoms: Python's stream-to-scalar builtins.

[Full entries](/docs/nu/reference/core/reduction)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AllOf](/docs/nu/reference/core/reduction#allof) | `reduction` | `AllOf(stream)` | True if every item in its stream child is truthy (`all`). |
| [AnyOf](/docs/nu/reference/core/reduction#anyof) | `reduction` | `AnyOf(stream)` | True if any item in its stream child is truthy (`any`). |
| [Collect](/docs/nu/reference/core/reduction#collect) | `reduction` | `Collect(stream)` | Drains its stream child into one list value. |
| [Count](/docs/nu/reference/core/reduction#count) | `reduction` | `Count(stream)` | The number of items in its stream child (`len` over a stream). |
| [First](/docs/nu/reference/core/reduction#first) | `reduction` | `First(stream)` | The first item of its stream child. |
| [Last](/docs/nu/reference/core/reduction#last) | `reduction` | `Last(stream)` | The last item of its stream child. |
| [Max](/docs/nu/reference/core/reduction#max) | `reduction` | `Max(stream)` | The largest item in its stream child (`max`). |
| [Min](/docs/nu/reference/core/reduction#min) | `reduction` | `Min(stream)` | The smallest item in its stream child (`min`). |
| [Sum](/docs/nu/reference/core/reduction#sum) | `reduction` | `Sum(stream)` | The sum of every item in its stream child (`sum`). |

## logical

Module `nu.core.logical`.

Logical atoms: Python's boolean operators and truthiness.

[Full entries](/docs/nu/reference/core/logical)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [And](/docs/nu/reference/core/logical#and) | `scalar_query` | `And(*children)` | The conjunction of its boolean children, each coerced with `bool`. |
| [Not](/docs/nu/reference/core/logical#not) | `scalar_query` | `Not(value)` | The negation of its one child. |
| [Or](/docs/nu/reference/core/logical#or) | `scalar_query` | `Or(*children)` | The disjunction of its boolean children, each coerced with `bool`. |
| [ToBool](/docs/nu/reference/core/logical#tobool) | `scalar_query` | `ToBool(value)` | The truthiness of its one child. |
| [bool](/docs/nu/reference/core/logical#bool) |  | `core.bool(x)` | Coerce `x` to a Nu `Bool` term. |

## repr

Module `nu.core.repr`.

Representation atoms: Python's string and number renderings.

[Full entries](/docs/nu/reference/core/repr)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Ascii](/docs/nu/reference/core/repr#ascii) | `scalar_query` | `Ascii(value)` | The `ascii` string of its one child, with non-ASCII escaped. |
| [Bin](/docs/nu/reference/core/repr#bin) | `scalar_query` | `Bin(value)` | The binary string (`0b...`) of its one integer child. |
| [Chr](/docs/nu/reference/core/repr#chr) | `scalar_query` | `Chr(value)` | The character for its one integer code-point child. |
| [Format](/docs/nu/reference/core/repr#format) | `scalar_query` | `Format(value, spec)` | The `format` of a value under an optional format spec. |
| [Hex](/docs/nu/reference/core/repr#hex) | `scalar_query` | `Hex(value)` | The hexadecimal string (`0x...`) of its one integer child. |
| [Oct](/docs/nu/reference/core/repr#oct) | `scalar_query` | `Oct(value)` | The octal string (`0o...`) of its one integer child. |
| [Ord](/docs/nu/reference/core/repr#ord) | `scalar_query` | `Ord(value)` | The Unicode code point of its one single-character child. |
| [Repr](/docs/nu/reference/core/repr#repr) | `scalar_query` | `Repr(value)` | The `repr` string of its one child. |

## bitwise

Module `nu.core.bitwise`.

Bitwise atoms: Python's bit-level operators.

[Full entries](/docs/nu/reference/core/bitwise)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [BitAnd](/docs/nu/reference/core/bitwise#bitand) | `scalar_query` | `BitAnd(*children)` | The bitwise AND of its scalar children. |
| [BitNot](/docs/nu/reference/core/bitwise#bitnot) | `scalar_query` | `BitNot(value)` | The bitwise NOT of its one child. |
| [BitOr](/docs/nu/reference/core/bitwise#bitor) | `scalar_query` | `BitOr(*children)` | The bitwise OR of its scalar children. |
| [BitXor](/docs/nu/reference/core/bitwise#bitxor) | `scalar_query` | `BitXor(*children)` | The bitwise XOR of its scalar children. |
| [LShift](/docs/nu/reference/core/bitwise#lshift) | `scalar_query` | `LShift(value, count)` | The first child shifted left by the second. |
| [RShift](/docs/nu/reference/core/bitwise#rshift) | `scalar_query` | `RShift(value, count)` | The first child shifted right by the second. |

## reflection

Module `nu.core.reflection`.

Reflection atoms: Python's introspection builtins.

[Full entries](/docs/nu/reference/core/reflection)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Callable](/docs/nu/reference/core/reflection#callable) | `scalar_query` | `Callable(value)` | Whether its one child appears callable (`callable`). |
| [Dir](/docs/nu/reference/core/reflection#dir) | `scalar_query` | `Dir(value)` | The sorted attribute-name list of its one child (`dir`). |
| [Hash](/docs/nu/reference/core/reflection#hash) | `scalar_query` | `Hash(value)` | The hash of its one child (`hash`). |
| [Id](/docs/nu/reference/core/reflection#id) | `scalar_query` | `Id(value)` | The identity of its one child (`id`). |
| [IsInstance](/docs/nu/reference/core/reflection#isinstance) | `scalar_query` | `IsInstance(value, klass)` | Whether the first child is an instance of the second (`isinstance`). |
| [IsSubclass](/docs/nu/reference/core/reflection#issubclass) | `scalar_query` | `IsSubclass(cls, klass)` | Whether the first child is a subclass of the second (`issubclass`). |
| [Type](/docs/nu/reference/core/reflection#type) | `scalar_query` | `Type(value)` | The type of its one child (`type`). |
| [Vars](/docs/nu/reference/core/reflection#vars) | `scalar_query` | `Vars(value)` | The `__dict__` of its one child (`vars`). |

## access

Module `nu.core.access`.

Access atoms: Python's item and attribute management.

[Full entries](/docs/nu/reference/core/access)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Contains](/docs/nu/reference/core/access#contains) | `scalar_query` | `Contains(container, item)` | Containment: `item in container`. |
| [DelAttr](/docs/nu/reference/core/access#delattr) | `scalar_command` | `DelAttr(obj, name)` | Attribute delete: `delattr(obj, name)`. |
| [DelItem](/docs/nu/reference/core/access#delitem) | `scalar_command` | `DelItem(target, key)` | Subscript delete: `del x[k]`. |
| [GetAttr](/docs/nu/reference/core/access#getattr) | `scalar_query` | `GetAttr(obj, name, default)` | Attribute read: `getattr(obj, name[, default])`. |
| [GetItem](/docs/nu/reference/core/access#getitem) | `scalar_query` | `GetItem(target, key)` | Subscript access: `x[k]`. |
| [HasAttr](/docs/nu/reference/core/access#hasattr) | `scalar_query` | `HasAttr(obj, name)` | Attribute presence: `hasattr(obj, name)`. |
| [Len](/docs/nu/reference/core/access#len) | `scalar_query` | `Len(value)` | Length: `len(x)` of its one child. |
| [SetAttr](/docs/nu/reference/core/access#setattr) | `scalar_command` | `SetAttr(obj, name, value)` | Attribute write: `setattr(obj, name, value)`. |
| [SetItem](/docs/nu/reference/core/access#setitem) | `scalar_command` | `SetItem(target, key, value)` | Subscript write: `x[k] = v`. |
| [Slice](/docs/nu/reference/core/access#slice) | `scalar_query` | `Slice(start, stop, step)` | The `slice(...)` builtin: builds a slice object. |

## iteration

Module `nu.core.iteration`.

Iteration atoms: Python's iterator sources and stepping.

[Full entries](/docs/nu/reference/core/iteration)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Enumerate](/docs/nu/reference/core/iteration#enumerate) | `stream_query` | `Enumerate(source, start)` | Pairs each item of a source child with its running index. |
| [Iter](/docs/nu/reference/core/iteration#iter) | `stream_query` | `Iter(source)` | Opens a scalar iterable child into a stream of its elements. |
| [Next](/docs/nu/reference/core/iteration#next) | `scalar_action` | `Next(iterator)` | Advances a ref-held iterator child and yields the item it pulls. |
| [Reversed](/docs/nu/reference/core/iteration#reversed) | `stream_query` | `Reversed(source)` | Yields the items of a source child in reverse order. |
| [Zip](/docs/nu/reference/core/iteration#zip) | `stream_query` | `Zip(*sources)` | Threads several source children together item by item. |

## comparison

Module `nu.core.comparison`.

Comparison atoms: Python's ordering and identity operators.

[Full entries](/docs/nu/reference/core/comparison)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Eq](/docs/nu/reference/core/comparison#eq) | `scalar_query` | `Eq(left, right)` | Whether its two children are equal (`==`). |
| [Ge](/docs/nu/reference/core/comparison#ge) | `scalar_query` | `Ge(left, right)` | Whether the first child is greater than or equal to the second (`>=`). |
| [Gt](/docs/nu/reference/core/comparison#gt) | `scalar_query` | `Gt(left, right)` | Whether the first child is greater than the second (`>`). |
| [Is](/docs/nu/reference/core/comparison#is) | `scalar_query` | `Is(left, right)` | Whether its two children are the same object (`is`). |
| [Le](/docs/nu/reference/core/comparison#le) | `scalar_query` | `Le(left, right)` | Whether the first child is less than or equal to the second (`<=`). |
| [Lt](/docs/nu/reference/core/comparison#lt) | `scalar_query` | `Lt(left, right)` | Whether the first child is less than the second (`<`). |
| [Ne](/docs/nu/reference/core/comparison#ne) | `scalar_query` | `Ne(left, right)` | Whether its two children are unequal (`!=`). |

## sentinel

Module `nu.core.sentinel`.

Sentinel atoms: the queries that observe EMPTY.

[Full entries](/docs/nu/reference/core/sentinel)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Fallback](/docs/nu/reference/core/sentinel#fallback) | `scalar_query` | `Fallback(value, *alternatives)` | The first of its children that is not EMPTY. |
| [IsEmpty](/docs/nu/reference/core/sentinel#isempty) | `scalar_query` | `IsEmpty(value)` | True if its one child yields the EMPTY sentinel. |
| [NotEmpty](/docs/nu/reference/core/sentinel#notempty) | `scalar_query` | `NotEmpty(value)` | True if its one child does not yield EMPTY. |

## transform

Module `nu.core.transform`.

Transform atoms: Python's iterable-transforming builtins.

[Full entries](/docs/nu/reference/core/transform)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Filter](/docs/nu/reference/core/transform#filter) | `stream_query` | `Filter(source, predicate, key=None)` | Keeps the items of a stream child for which a predicate holds (lazy). |
| [Flatten](/docs/nu/reference/core/transform#flatten) | `stream_query` | `Flatten(source)` | Concatenates a source of iterables one level into a flat stream (lazy). |
| [Map](/docs/nu/reference/core/transform#map) | `stream_query` | `Map(source, transform, key=None)` | Applies a query child to every item of a stream child (lazy). |
| [SortBy](/docs/nu/reference/core/transform#sortby) | `stream_query` | `SortBy(source, key, reverse=False, item=None)` | Its source child, ordered by a per-item key expression (eager). |
| [Sorted](/docs/nu/reference/core/transform#sorted) | `scalar_query` | `Sorted(source)` | Its iterable child collected into an ascending `list` (`sorted`). |
| [Unique](/docs/nu/reference/core/transform#unique) | `stream_query` | `Unique(source)` | Yields each item of a source child once, first-seen order (lazy). |

## reactive.level

Module `nu.core.reactive.level`.

Level flows: ReconcileReactive, WaitReactive, ForEachParReactive.

[Full entries](/docs/nu/reference/core/reactive-level)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ForEachParReactive](/docs/nu/reference/core/reactive-level#foreachparreactive) | `control` | `ForEachParReactive(items, change, body, item=None, after=(0.1, 0.3, 1.0), every=30.0)` | `ForEachParReactive(items, change, lambda x: body)` - one arm per element, kept live against `change`. |
| [ReconcileReactive](/docs/nu/reference/core/reactive-level#reconcilereactive) | `control` | `ReconcileReactive(change, body, after=(0.1, 0.3, 1.0), every=30.0)` | Keep state right: run the body after subscribing, on every change, and on re-checks. |
| [WaitReactive](/docs/nu/reference/core/reactive-level#waitreactive) | `control` | `WaitReactive(change, cond, after=(0.1, 0.3, 1.0), every=30.0)` | Wait until a condition holds, read after subscribing, on every change, and on re-checks. |

## dynamic

Module `nu.core.dynamic`.

Dynamic dispatch atoms: reach into the live Python interpreter namespace.

[Full entries](/docs/nu/reference/core/dynamic)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Globals](/docs/nu/reference/core/dynamic#globals) | `scalar_query` | `Globals()` | ESCAPE HATCH: the host module namespace dict. |
| [Locals](/docs/nu/reference/core/dynamic#locals) | `scalar_query` | `Locals()` | ESCAPE HATCH: the host local namespace dict. |

## conditional

Module `nu.core.conditional`.

Conditional atoms: value-yielding branch selection.

[Full entries](/docs/nu/reference/core/conditional)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [If](/docs/nu/reference/core/conditional#if) | `scalar_query` | `If(cond, then, else_)` | The `then` branch if `cond` is truthy, else the `else_` branch. |
| [Switch](/docs/nu/reference/core/conditional#switch) | `scalar_query` | `Switch(selector, cases, default=None)` | The case value whose key matches the selector, or the default. |

## io

Module `nu.core.io`.

IO: console read/write through the stdio fabric.

[Full entries](/docs/nu/reference/core/io)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Input](/docs/nu/reference/core/io#input) | `scalar_action` | `Input(ref)` | Reads one line from the stdin fabric Ref in slot 0 and yields it. |
| [Print](/docs/nu/reference/core/io#print) | `scalar_command` | `Print(ref, sep=' ', end='\n', flush=False)` | Writes the values in slots 1.. to the stdout fabric Ref in slot 0. |
| [input](/docs/nu/reference/core/io#input-1) |  | `core.input()` | Read one line from stdin (newline stripped) and yield it as a `Str`. |
| [print](/docs/nu/reference/core/io#print-1) |  | `core.print(sep=' ', end='\n', file=None, flush=False)` | Write `values` to a stdio stream. Mirrors `builtins.print`. |

## reactive.interactions

Module `nu.core.reactive.interactions`.

Reactive change subscriptions -- unified interaction atoms.

[Full entries](/docs/nu/reference/core/reactive-interactions)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [OnChange](/docs/nu/reference/core/reactive-interactions#onchange) | `scalar_query` | `OnChange(ref)` | Opens a subscription to any change on a Ref's view. |
| [OnChildChange](/docs/nu/reference/core/reactive-interactions#onchildchange) | `scalar_query` | `OnChildChange(ref, address)` | Opens a subscription to changes on one named child of a Ref's view. |
| [OnChildrenChange](/docs/nu/reference/core/reactive-interactions#onchildrenchange) | `scalar_query` | `OnChildrenChange(ref)` | Opens a subscription to changes on any immediate child of a Ref's view. |
| [OnDescendantsChange](/docs/nu/reference/core/reactive-interactions#ondescendantschange) | `scalar_query` | `OnDescendantsChange(ref, *pattern)` | Opens a subscription to descendants of a Ref's view matching a pattern. |
| [OnPrimitiveChange](/docs/nu/reference/core/reactive-interactions#onprimitivechange) | `scalar_query` | `OnPrimitiveChange(ref)` | Opens a subscription to changes at a leaf Ref, through its parent view. |

## reactive.event

Module `nu.core.reactive.event`.

Event flows: React, ReactWhile, ReactForever, ReactLatest.

[Full entries](/docs/nu/reference/core/reactive-event)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [React](/docs/nu/reference/core/reactive-event#react) | `control` | `React(change, body=None, changed_key=None)` | Wait for one change on the subscription, run the body once, then stop. |
| [ReactForever](/docs/nu/reference/core/reactive-event#reactforever) | `control` | `ReactForever(change, body, changed_key=None)` | Run the body on every change, unconditionally, forever. |
| [ReactLatest](/docs/nu/reference/core/reactive-event#reactlatest) | `control` | `ReactLatest(change, body, changed_key=None, initial=False)` | Run the body on every change, cancelling the run a newer change makes stale. |
| [ReactWhile](/docs/nu/reference/core/reactive-event#reactwhile) | `control` | `ReactWhile(change, condition, body, changed_key=None)` | Run the body on each change while the condition stays truthy. |

## reactive.stream

Module `nu.core.reactive.stream`.

Stream flow: drain-then-follow over ordered collections.

[Full entries](/docs/nu/reference/core/reactive-stream)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Stream](/docs/nu/reference/core/reactive-stream#stream) | `stream_query` | `Stream(source, body, key=None, log_key='stream_log_key')` | Drain-then-follow over an ordered collection; cursor tracks position. |

## cast

Module `nu.core.cast`.

Cast atoms: Python's type constructors and conversions.

[Full entries](/docs/nu/reference/core/cast)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ToByteArray](/docs/nu/reference/core/cast#tobytearray) | `scalar_query` | `ToByteArray(value, encoding)` | The operand cast to `bytearray`. |
| [ToBytes](/docs/nu/reference/core/cast#tobytes) | `scalar_query` | `ToBytes(value, encoding)` | The operand cast to `bytes`. |
| [ToComplex](/docs/nu/reference/core/cast#tocomplex) | `scalar_query` | `ToComplex(real, imag)` | The operand cast to `complex`. |
| [ToDict](/docs/nu/reference/core/cast#todict) | `scalar_query` | `ToDict(value)` | The key/value pairs of the iterable child collected into a `dict`. |
| [ToFloat](/docs/nu/reference/core/cast#tofloat) | `scalar_query` | `ToFloat(value)` | The operand cast to `float`. |
| [ToFrozenSet](/docs/nu/reference/core/cast#tofrozenset) | `scalar_query` | `ToFrozenSet(value)` | The iterable child collected into a `frozenset`. |
| [ToInt](/docs/nu/reference/core/cast#toint) | `scalar_query` | `ToInt(value, base)` | The operand cast to `int`. |
| [ToList](/docs/nu/reference/core/cast#tolist) | `scalar_query` | `ToList(value)` | The iterable child collected into a `list`. |
| [ToSet](/docs/nu/reference/core/cast#toset) | `scalar_query` | `ToSet(value)` | The iterable child collected into a `set`. |
| [ToStr](/docs/nu/reference/core/cast#tostr) | `scalar_query` | `ToStr(value)` | The operand cast to `str`. |
| [ToTuple](/docs/nu/reference/core/cast#totuple) | `scalar_query` | `ToTuple(value)` | The iterable child collected into a `tuple`. |

## cast_fns

Module `nu.core.cast_fns`.

Cast wrappers: coerce `x` into a Nu term of the target Form.

[Full entries](/docs/nu/reference/core/cast-fns)

| Name | Call | Meaning |
| --- | --- | --- |
| [dict](/docs/nu/reference/core/cast-fns#dict) | `core.dict(x)` | Coerce `x` to a Nu `Dict` term. `Dict(ToDict(x))` in one call. |
| [float](/docs/nu/reference/core/cast-fns#float) | `core.float(x)` | Coerce `x` to a Nu `Float` term. `Float(ToFloat(x))` in one call. |
| [format](/docs/nu/reference/core/cast-fns#format) | `core.format(value, spec=None)` | Format `value` under `spec` into a Nu `Str` term. `Str(Format(...))` in one call. |
| [frozenset](/docs/nu/reference/core/cast-fns#frozenset) | `core.frozenset(x)` | Coerce `x` to a Nu `FrozenSet` term. `FrozenSet(ToFrozenSet(x))` in one call. |
| [int](/docs/nu/reference/core/cast-fns#int) | `core.int(x)` | Coerce `x` to a Nu `Int` term. `Int(ToInt(x))` in one call. |
| [list](/docs/nu/reference/core/cast-fns#list) | `core.list(x)` | Coerce `x` to a Nu `List` term. `List(ToList(x))` in one call. |
| [set](/docs/nu/reference/core/cast-fns#set) | `core.set(x)` | Coerce `x` to a Nu `Set` term. `Set(ToSet(x))` in one call. |
| [sorted](/docs/nu/reference/core/cast-fns#sorted) | `core.sorted(x)` | Sort `x` into a Nu `List` term. `List(Sorted(x))` in one call. |
| [str](/docs/nu/reference/core/cast-fns#str) | `core.str(x)` | Coerce `x` to a Nu `Str` term. `Str(ToStr(x))` in one call. |
| [tuple](/docs/nu/reference/core/cast-fns#tuple) | `core.tuple(x)` | Coerce `x` to a Nu `Tuple` term. `Tuple(ToTuple(x))` in one call. |

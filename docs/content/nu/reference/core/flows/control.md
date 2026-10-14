---
title: control
description: "Control flows: Command-composing atoms steered by Query parameters."
---

Module `nu.core.flows.control`.

Control flows: Command-composing atoms steered by Query parameters.

Nu's Control sub-shape - the Flows that run their bodies under Query
parameters (a condition, an iterable, a count). A Control owns no effects and
yields nothing (VOID): the param slots feed the orchestration, the body slots
carry the writes. `param_slots` declares which slot indices are parameters;
the rest are bodies. The `control_param_is_yielder` law holds every param to
a yielding child (Ref / Query / Action) and `flow_body_is_mutator` holds
every body to a mutating child (Command / Action / Flow).

Loop variables are scoped attrs bindings: `ForEachDo` / `ForRangeDo` bind
the current element under a name for one body run - the same
`ctx.attrs.let` scope `Map` / `Filter` use, not a tracked fabric write.
The body is usually a lambda over the element, which mints the name; a plain
body reads it via an attrs ref under an explicit name (itself a child, so it
can be a Literal or a computed Ref).
`ForEachParAsync` is `ForEachDo`'s fan-out twin: same three args, same
binding, but every element gets its own arm on the loop at once, each on its own
Context branch so the arms cannot stomp each other's loop variable. It lives
here, with the ForEach it mirrors, and borrows the scheduling from `parallel`.
Its reactive twin, `ForEachParReactive`, keeps the fan-out open against a
change subscription and lives with the other reactive flows in
`nu.core.reactive`.

Each atom emits a thunk via `compile` / `acompile` and stays immutable -
construction config that must survive `with_children` lives in `payload`
(`SwitchDo`'s match keys), never as mutable per-run state.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Delay](#delay) | `control` | `Delay(seconds)` | `Delay(seconds)` - sleeps `seconds`, then continues. No body. |
| [DelayedDo](#delayeddo) | `control` | `DelayedDo(delay, body)` | `DelayedDo(delay, body)` - sleeps `delay` seconds, then runs `body`. |
| [ForEachDo](#foreachdo) | `control` | `ForEachDo(items, body, item=None)` | `ForEachDo(items, lambda x: body)` - runs `body` once per element of `items`. |
| [ForEachParAsync](#foreachparasync) | `control` | `ForEachParAsync(items, body, item=None)` | `ForEachParAsync(items, lambda x: body)` - runs `body` once per element of `items`, every arm on the loop at once. |
| [ForRangeDo](#forrangedo) | `control` | `ForRangeDo(start, stop, body, step=1, index=None)` | `ForRangeDo(start, stop, lambda i: body, *, step=1)` - runs `body` once per value of `range(start, stop, step)`. |
| [ForeverDo](#foreverdo) | `control` | `ForeverDo(body)` | `ForeverDo(body)` - runs `body` on loop forever. |
| [IfDo](#ifdo) | `control` | `IfDo(cond, then, else_=None)` | `IfDo(cond, then, else_=None)` - runs `then` or `else_` based on `cond`. |
| [SwitchDo](#switchdo) | `control` | `SwitchDo(selector, cases, default=None)` | `SwitchDo(selector, cases, default=None)` - runs the case body keyed by `selector`'s value. |
| [WhileDo](#whiledo) | `control` | `WhileDo(cond, body)` | `WhileDo(cond, body)` - runs `body` on loop while `cond` stays truthy. |

## Delay

`Delay(seconds)` - sleeps `seconds`, then continues. No body.

```python
Delay(seconds)
```

Path `nu.core.flows.Delay`. Kind `Control`, sort `control`, cardinality `void`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `seconds` |  |  | how long to sleep. |

**Notes**

- Sync execution blocks on `time.sleep`; async execution suspends on `asyncio.sleep`, so it never blocks an event loop.
- No body: for "wait, then run something" use `DelayedDo`, or chain `Delay(seconds) >> body`.

**Example**

```python
nu.run(nu.Delay(nu.Literal(0.0)))[0] is None
```

```
True
```

Undocumented: yields.

## DelayedDo

`DelayedDo(delay, body)` - sleeps `delay` seconds, then runs `body`.

```python
DelayedDo(delay, body)
```

Path `nu.core.flows.DelayedDo`. Kind `Control`, sort `control`, cardinality `void`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `delay` |  |  | how long to sleep before `body` runs. |
| `body` |  |  | the body to run once the sleep is over. |

**Notes**

- Sugar for `Delay(delay) >> body`; for a bare wait with no body, use `Delay` on its own.
- Sync execution blocks on `time.sleep`; async execution suspends on `asyncio.sleep`.

**Example**

```python
_ = nu.run(nu.DelayedDo(nu.Literal(0.0), nu.print("done")))
```

```
done
```

Undocumented: yields.

## ForEachDo

`ForEachDo(items, lambda x: body)` - runs `body` once per element of `items`.

```python
ForEachDo(items, body, item=None)
```

Path `nu.core.flows.ForEachDo`. Kind `Control`, sort `control`, cardinality `void`. Arity 3 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `items` | `object` |  | the iterable to walk. |
| `body` | `object` |  | the loop body, run once per element. A lambda over the element, or a tree reading it with `Attr(item)`. |
| `item` | `object` | `None` | the name to bind the current element under, for a tree body. Optional, defaults to `"item"`; a lambda mints its own. |

**Notes**

- The lambda runs once, at construction, and gets a ref, not a value: it builds the body and never branches on the element in Python.
- The name belongs to the lambda's code, so nested lambdas each get their own and an inner body still reads the outer element. One lambda used again inside its own body binds the same name, and the inner binding shadows the outer, as with `nu.let`; an explicit `item` keeps both readable.
- The current element is bound for one body run, the same scoped binding `Map` / `Filter` use.
- `item` is itself evaluated once, before the loop starts, so it can be a computed Ref and not just a literal name.
- The binding shadows an outer one of the same name and is released after each run, so the outer value is back once the loop ends.

**Examples**

```python
_ = nu.run(nu.ForEachDo(nu.Iter([1, 2]), lambda x: nu.print(x)))
```

```
1
2
```

```python
Nested, each body reading its own element:
```

```python
rows = nu.Iter([["a", "b"]])
_ = nu.run(nu.ForEachDo(rows, lambda row: nu.ForEachDo(row, lambda c: nu.print(c))))
```

```
a
b
```

```python
A tree body under an explicit name:
```

```python
_ = nu.run(nu.ForEachDo(nu.Iter([1, 2]), nu.print(nu.Attr("n")), item="n"))
```

```
1
2
```

Undocumented: yields.

## ForEachParAsync

`ForEachParAsync(items, lambda x: body)` - runs `body` once per element of `items`, every arm on the loop at once.

```python
ForEachParAsync(items, body, item=None)
```

Path `nu.core.flows.ForEachParAsync`. Kind `Control`, sort `control`, cardinality `void`. Arity 3 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `items` | `object` |  | the iterable to fan out over, evaluated once before any arm starts. |
| `body` | `object` |  | the arm, run once per element, concurrently with the others. A lambda over the element, or a tree reading it with `Attr(item)`. |
| `item` | `object` | `None` | the name to bind that arm's element under, for a tree body. Optional, defaults to `"item"`; a lambda mints its own. |

**Notes**

- Same three args, the same lambda form and the same binding as `ForEachDo`, which is why it sits here rather than in `parallel/`; the scheduling itself is `parallel._scheduling.aeval_foreach_par`.
- Joins on all, like `Parallel`, but over a runtime-sized list: `Parallel` / `Gather` fan out to children fixed at construction, this one to whatever `items` yields at run time.
- Async-only, and named for it the way `ParallelAsync` is: every arm is an asyncio.Task on the loop, no threaded placement and no sync path at all. Sync `run` refuses the subtree up front via `requires_async`.
- It does not take from the concurrency budget. A parked coroutine costs no worker, and these arms are meant never to return, so there is nothing to ration - `max_parallel` bounds threads, and this atom uses none.
- Each arm runs on its own branch (`Context.branch`), so `item` is that arm's element and nothing else. The branch shares values by reference, so a live handle in attrs crosses fine, but an arm's own bindings stay in its arm.
- Arms that never return are the point: a standing `ForeverDo` per element joins only when the surrounding Flow is cancelled. An empty `items` completes immediately.
- Cancellation propagates: under `Race`, cancelling this Flow cancels every arm. First error wins like `Parallel`, and the remaining arms are cancelled on the way out, since a headless never-returning arm would outlive the Flow that spawned it.

**Example**

```python
import asyncio
arms = nu.ForEachParAsync(nu.Iter([7]), lambda x: nu.print(x))
_ = asyncio.run(nu.arun(arms))
```

```
7
```

Undocumented: yields.

## ForRangeDo

`ForRangeDo(start, stop, lambda i: body, *, step=1)` - runs `body` once per value of `range(start, stop, step)`.

```python
ForRangeDo(start, stop, body, step=1, index=None)
```

Path `nu.core.flows.ForRangeDo`. Kind `Control`, sort `control`, cardinality `void`. Arity 5 (3 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `start` | `object` |  | the range's start. |
| `stop` | `object` |  | the range's exclusive end. |
| `body` | `object` |  | the loop body, run once per value. A lambda over the value, or a tree reading it with `Attr(index)`. |
| `step` | `object` | `1` | the range's step. Optional, defaults to 1. |
| `index` | `object` | `None` | the name to bind the current value under, for a tree body. Optional, defaults to `"index"`; a lambda mints its own. |

**Notes**

- `start`, `stop`, `step` and `index` are each evaluated once, before the loop starts.
- The current value is bound for one body run. Same scoped binding, and the same lambda form, as `ForEachDo`.
- Follows Python's `range` rules: a `step` that never reaches `stop` from `start` runs the body zero times rather than looping forever.

**Examples**

```python
_ = nu.run(nu.ForRangeDo(0, 2, lambda i: nu.print(i)))
```

```
0
1
```

```python
A tree body under the default name:
```

```python
_ = nu.run(nu.ForRangeDo(0, 2, nu.print(nu.Attr("index"))))
```

```
0
1
```

Undocumented: yields.

## ForeverDo

`ForeverDo(body)` - runs `body` on loop forever.

```python
ForeverDo(body)
```

Path `nu.core.flows.ForeverDo`. Kind `Control`, sort `control`, cardinality `void`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `body` |  |  | the loop body, re-run with no condition to stop it. |

**Notes**

- No parameter slot at all: the only child is a body, so `param_slots` keeps the empty default.
- Used for standing ticks (a reactive loop, a periodic `Delay` + action) that end only when the surrounding process is stopped or errors, not from anything inside the atom itself.

Undocumented: yields, example.

## IfDo

`IfDo(cond, then, else_=None)` - runs `then` or `else_` based on `cond`.

```python
IfDo(cond, then, else_=None)
```

Path `nu.core.flows.IfDo`. Kind `Control`, sort `control`, cardinality `void`. Arity 3 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cond` | `object` |  | the condition to test. |
| `then` | `object` |  | the body to run when `cond` is truthy. |
| `else_` | `object` | `None` | the body to run when `cond` is falsy. Optional: leave it out to run nothing on a falsy `cond`. |

**Notes**

- `cond` is evaluated exactly once per run, unlike `WhileDo` which re-checks it every turn.
- A falsy `cond` with no `else_` runs nothing at all. An EMPTY `cond` counts as false.

**Example**

```python
_ = nu.run(nu.IfDo(nu.Literal(True), nu.print("yes"), nu.print("no")))
```

```
yes
```

Undocumented: yields.

## SwitchDo

`SwitchDo(selector, cases, default=None)` - runs the case body keyed by `selector`'s value.

```python
SwitchDo(selector, cases, default=None)
```

Path `nu.core.flows.SwitchDo`. Kind `Control`, sort `control`, cardinality `void`. Arity 3 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `selector` | `object` |  | the value to match against the case keys. |
| `cases` | `Mapping[object, Term]` |  | a mapping from match key to case body, checked in order. |
| `default` | `object` | `None` | the body to run when no key matches. Optional: leave it out to run nothing on a miss. |

**Notes**

- The case keys are intrinsic constants of the switch, not children: they live in `payload` so they survive `with_children`, and are paired by position with the case bodies.
- Keys are checked in the order `cases` was given, first equal match wins; a later duplicate key is unreachable.
- `selector` is evaluated once per run, before any key comparison. An EMPTY selector matches no key.

**Example**

```python
_ = nu.run(nu.SwitchDo(nu.Literal("b"), {"a": nu.print(1), "b": nu.print(2)}))
```

```
2
```

Undocumented: yields.

## WhileDo

`WhileDo(cond, body)` - runs `body` on loop while `cond` stays truthy.

```python
WhileDo(cond, body)
```

Path `nu.core.flows.WhileDo`. Kind `Control`, sort `control`, cardinality `void`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `cond` |  |  | the condition, checked before each turn. |
| `body` |  |  | the loop body. |

**Notes**

- `cond` is re-evaluated before every turn, including the first, so a falsy `cond` at the start runs `body` zero times.
- An EMPTY `cond` counts as false and ends the loop.
- No built-in turn cap: a `cond` that never turns falsy loops forever.

**Example**

```python
count = lambda i: nu.WhileDo(i < 3, i.set(i + 1)) >> nu.print(i)
_ = nu.run(nu.let(0, count))
```

```
3
```

Undocumented: yields.

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

Loop variables ride the attrs side-channel: `ForEachDo` / `ForRangeDo` bind
the current element under a name (itself a child, so it can be a Literal or a
computed Ref) before each body run, read back via `AttrRef` - the same
designated channel `Map` / `Filter` use, not a tracked fabric write.
`ForEachParAsync` is `ForEachDo`'s fan-out twin: same three args, same
binding, but every element gets its own arm on the loop at once, each on its own
Context branch so the arms cannot stomp each other's loop variable. It lives
here, with the ForEach it mirrors, and borrows the scheduling from `parallel`.
`ForEachParReactive` is that fan-out with the element list left open: it takes a
change subscription too, re-reads the elements on every notification, and keeps
one arm per element alive across the difference.

Each atom emits a thunk via `compile` / `acompile` and stays immutable -
construction config that must survive `with_children` lives in `payload`
(`SwitchDo`'s match keys), never as mutable per-run state.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Delay](#delay) | `control` | `Delay(seconds)` | `Delay(seconds)` - sleeps `seconds`, then continues. No body. |
| [DelayedDo](#delayeddo) | `control` | `DelayedDo(delay, body)` | `DelayedDo(delay, body)` - sleeps `delay` seconds, then runs `body`. |
| [ForEachDo](#foreachdo) | `control` | `ForEachDo(items, body, item='item')` | `ForEachDo(items, body, item="item")` - runs `body` once per element of `items`. |
| [ForEachParAsync](#foreachparasync) | `control` | `ForEachParAsync(items, body, item='item')` | `ForEachParAsync(items, body, item="item")` - runs `body` once per element of `items`, every arm on the loop at once. |
| [ForEachParReactive](#foreachparreactive) | `control` | `ForEachParReactive(items, change, body, item='item')` | `ForEachParReactive(items, change, body, item="item")` - one arm per element, kept live against `change`. |
| [ForRangeDo](#forrangedo) | `control` | `ForRangeDo(start, stop, body, step=1, index='index')` | `ForRangeDo(start, stop, body, *, step=1, index="index")` - runs `body` once per value of `range(start, stop, step)`. |
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
_, ctx = nu.run(nu.DelayedDo(nu.Literal(0.0), nu.SetCmd(nu.AttrRef("a"), nu.Literal(1))))
ctx.attrs["a"]
```

```
1
```

Undocumented: yields.

## ForEachDo

`ForEachDo(items, body, item="item")` - runs `body` once per element of `items`.

```python
ForEachDo(items, body, item='item')
```

Path `nu.core.flows.ForEachDo`. Kind `Control`, sort `control`, cardinality `void`. Arity 3 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `items` | `object` |  | the iterable to walk. |
| `body` | `object` |  | the loop body, run once per element. |
| `item` | `object` | `'item'` | the name to bind the current element under. Optional, defaults to `"item"`. |

**Notes**

- The current element is bound into `rt.ctx.attrs` under `item` before each body run, the same attrs side-channel `Map` / `Filter` use, not a tracked fabric write. `body` reads it back via `AttrRef(item)`.
- `item` is itself evaluated once, before the loop starts, so it can be a computed Ref and not just a literal name.
- Rebinding overwrites whatever `item` held before, in `attrs`.

**Example**

```python
ctx = nu.Context()
ctx.attrs["sum"] = 0
_, ctx = nu.run(
    nu.ForEachDo(
        nu.Iter(nu.Literal([1, 2, 3])),
        nu.SetCmd(nu.AttrRef("sum"), nu.Add(nu.AttrRef("sum"), nu.AttrRef("item"))),
    ),
    ctx,
)
ctx.attrs["sum"]
```

```
6
```

Undocumented: yields.

## ForEachParAsync

`ForEachParAsync(items, body, item="item")` - runs `body` once per element of `items`, every arm on the loop at once.

```python
ForEachParAsync(items, body, item='item')
```

Path `nu.core.flows.ForEachParAsync`. Kind `Control`, sort `control`, cardinality `void`. Arity 3 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `items` | `object` |  | the iterable to fan out over, evaluated once before any arm starts. |
| `body` | `object` |  | the arm, run once per element, concurrently with the others. |
| `item` | `object` | `'item'` | the name to bind that arm's element under. Optional, defaults to `"item"`. |

**Notes**

- Same three args and the same `item` binding as `ForEachDo`, which is why it sits here rather than in `parallel/`; the scheduling itself is `parallel._scheduling.aeval_foreach_par`.
- Joins on all, like `Parallel`, but over a runtime-sized list: `Parallel` / `Gather` fan out to children fixed at construction, this one to whatever `items` yields at run time.
- Async-only, and named for it the way `ParallelAsync` is: every arm is an asyncio.Task on the loop, no threaded placement and no sync path at all. Sync `run` refuses the subtree up front via `requires_async`.
- It does not take from the concurrency budget. A parked coroutine costs no worker, and these arms are meant never to return, so there is nothing to ration - `max_parallel` bounds threads, and this atom uses none.
- Each arm runs against its own Context branch, so `item` is that arm's element and nothing else. The branch shares attr values by reference (`Attributes.copy_shallow`), so a live handle in attrs crosses fine, but an arm's own writes stay in its arm.
- Arms that never return are the point: a standing `ForeverDo` per element joins only when the surrounding Flow is cancelled. An empty `items` completes immediately.
- Cancellation propagates: under `Race`, cancelling this Flow cancels every arm. First error wins like `Parallel`, and the remaining arms are cancelled on the way out, since a headless never-returning arm would outlive the Flow that spawned it.

**Example**

```python
import asyncio
_, ctx = asyncio.run(
    nu.arun(
        nu.ForEachParAsync(
            nu.Iter(nu.Literal([1, 2, 3])),
            nu.SetCmd(nu.AttrRef("seen"), nu.AttrRef("item")),
        )
    )
)
"seen" in ctx.attrs
```

```
False
```

Undocumented: yields.

## ForEachParReactive

`ForEachParReactive(items, change, body, item="item")` - one arm per element, kept live against `change`.

```python
ForEachParReactive(items, change, body, item='item')
```

Path `nu.core.flows.ForEachParReactive`. Kind `Control`, sort `control`, cardinality `void`. Arity 4 (3 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `items` | `object` |  | the elements to fan out over, re-evaluated on every notification. Elements must be hashable: the arm book is kept by element, and that is what makes a difference computable. |
| `change` | `object` |  | the change subscription that says the element set may have moved. Bound once, before the first fan-out, and held for as long as this runs. |
| `body` | `object` |  | the arm, run once per element, concurrently with the others. |
| `item` | `object` | `'item'` | the name to bind that arm's element under. Optional, defaults to `"item"`. |

**Notes**

- `ForEachParAsync` fused with `ReactForever`: the fan-out is the same, arms are the same, but the element list is read again on every notification instead of once at construction time. What comes out of the comparison is births and deaths, and nothing else: an element with no arm gets one started, an arm whose element is gone is cancelled, and every other arm keeps running untouched. That is the whole reason to reach for this over a fan-out rebuilt from scratch, which restarts the innocent along with the guilty.
- A death is a cancellation, delivered by this atom. An arm does not have to notice its own element leaving and does not have to outlive it; it is cancelled where it stands, and drained before the pass that killed it returns.
- So a delete and a re-add of the same element are a death and then a birth, in that order, never an overlap - but only when the two are seen by two different passes. This reconciles against the current answer to `items`, it does not replay the change that woke it, so a delete and a re-add that both land between two passes leave the arm running and unaware.
- Arms are isolated. One that raises ends alone: the error is not re-raised here and the siblings are not cancelled, which is the opposite of `ForEachParAsync`'s first-error-wins and is what supervision means. Its element gets a fresh arm on the next reconcile, so a body wanting its failures reported has to report them itself.
- Never returns on its own, even with an empty `items`: it is the subscription that ends it, by the surrounding Flow being cancelled. Every live arm is cancelled and drained on the way out.
- A `body` that writes into the collection `change` watches will wake this atom again, the same feedback `ReactForever` has.
- Async-only, like `ForEachParAsync` and the whole reactive set: the arms are loop tasks and the notification is bridged through an `asyncio.Queue`. Sync `run` refuses the subtree up front via `requires_async`.

**Examples**

```python
Following a live collection needs a real substrate behind the
subscription, so it cannot run standalone here::
```

```python
    ForEachParReactive(users.keys(), users.on_children_change(), body)
```

Undocumented: yields.

## ForRangeDo

`ForRangeDo(start, stop, body, *, step=1, index="index")` - runs `body` once per value of `range(start, stop, step)`.

```python
ForRangeDo(start, stop, body, step=1, index='index')
```

Path `nu.core.flows.ForRangeDo`. Kind `Control`, sort `control`, cardinality `void`. Arity 5 (3 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `start` | `object` |  | the range's start. |
| `stop` | `object` |  | the range's exclusive end. |
| `body` | `object` |  | the loop body, run once per value. |
| `step` | `object` | `1` | the range's step. Optional, defaults to 1. |
| `index` | `object` | `'index'` | the name to bind the current value under. Optional, defaults to `"index"`. |

**Notes**

- `start`, `stop`, `step` and `index` are each evaluated once, before the loop starts.
- The current value is bound into `rt.ctx.attrs` under `index` before each body run, read back via `AttrRef(index)`. Same side-channel `ForEachDo` uses.
- Follows Python's `range` rules: a `step` that never reaches `stop` from `start` runs the body zero times rather than looping forever.

**Example**

```python
ctx = nu.Context()
ctx.attrs["sum"] = 0
_, ctx = nu.run(
    nu.ForRangeDo(
        0, 4, nu.SetCmd(nu.AttrRef("sum"), nu.Add(nu.AttrRef("sum"), nu.AttrRef("index")))
    ),
    ctx,
)
ctx.attrs["sum"]
```

```
6
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
- A falsy `cond` with no `else_` runs nothing at all.

**Example**

```python
_, ctx = nu.run(
    nu.IfDo(
        nu.Literal(True),
        nu.SetCmd(nu.AttrRef("a"), nu.Literal(1)),
        nu.SetCmd(nu.AttrRef("a"), nu.Literal(2)),
    )
)
ctx.attrs["a"]
```

```
1
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
- `selector` is evaluated once per run, before any key comparison.

**Example**

```python
_, ctx = nu.run(
    nu.SwitchDo(
        nu.Literal("b"),
        {
            "a": nu.SetCmd(nu.AttrRef("x"), nu.Literal(1)),
            "b": nu.SetCmd(nu.AttrRef("x"), nu.Literal(2)),
        },
    )
)
ctx.attrs["x"]
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
- No built-in turn cap: a `cond` that never turns falsy loops forever.

**Example**

```python
ctx = nu.Context()
ctx.attrs["i"] = 0
_, ctx = nu.run(
    nu.WhileDo(
        nu.Lt(nu.AttrRef("i"), nu.Literal(3)),
        nu.SetCmd(nu.AttrRef("i"), nu.Add(nu.AttrRef("i"), nu.Literal(1))),
    ),
    ctx,
)
ctx.attrs["i"]
```

```
3
```

Undocumented: yields.

---
title: flows
description: "Nu2 Flow atoms: the Command-composing sub-kind."
---

Module `nu.core.flows`.

Nu2 Flow atoms: the Command-composing sub-kind.

- **Strategy** - compose mutating atoms directly: `Sequential` (`>>`),
  `Parallel` (`|`), `Race` (`&`), `Gather`, `AnyN`. `Parallel`
  also exposes forced-mode variants `ParallelThreaded` / `ParallelAsync`
  for explicit placement (Race / AnyN are async-only, no variants).
- **Control** - compose bodies under Query parameters: `IfDo`, `WhileDo`,
  `ForeverDo`, `ForEachDo`, `ForEachParAsync`, `ForRangeDo`,
  `Delay`, `DelayedDo`, `SwitchDo`. `ForEachParAsync` is the fan-out
  ForEach: one arm per element on the loop, all at once, joining on all.

The flows driven by change subscriptions (`React` and the rest of the event
kind, `ReconcileReactive` and the rest of the level kind, `Stream`) live in
`nu.core.reactive`, next to the subscriptions they consume.

## parallel.anyn

Module `nu.core.flows.parallel.anyn`.

AnyN: first-to-succeed fan-in over the async loop.

[Full entries](/docs/nu/reference/core/flows/parallel-anyn)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [AnyN](/docs/nu/reference/core/flows/parallel-anyn#anyn) | `strategy` | `AnyN(*children)` | Runs its children concurrently; succeeds as soon as any one does. |

## control

Module `nu.core.flows.control`.

Control flows: Command-composing atoms steered by Query parameters.

[Full entries](/docs/nu/reference/core/flows/control)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Delay](/docs/nu/reference/core/flows/control#delay) | `control` | `Delay(seconds)` | `Delay(seconds)` - sleeps `seconds`, then continues. No body. |
| [DelayedDo](/docs/nu/reference/core/flows/control#delayeddo) | `control` | `DelayedDo(delay, body)` | `DelayedDo(delay, body)` - sleeps `delay` seconds, then runs `body`. |
| [ForEachDo](/docs/nu/reference/core/flows/control#foreachdo) | `control` | `ForEachDo(items, body, item=None)` | `ForEachDo(items, lambda x: body)` - runs `body` once per element of `items`. |
| [ForEachParAsync](/docs/nu/reference/core/flows/control#foreachparasync) | `control` | `ForEachParAsync(items, body, item=None)` | `ForEachParAsync(items, lambda x: body)` - runs `body` once per element of `items`, every arm on the loop at once. |
| [ForRangeDo](/docs/nu/reference/core/flows/control#forrangedo) | `control` | `ForRangeDo(start, stop, body, step=1, index=None)` | `ForRangeDo(start, stop, lambda i: body, *, step=1)` - runs `body` once per value of `range(start, stop, step)`. |
| [ForeverDo](/docs/nu/reference/core/flows/control#foreverdo) | `control` | `ForeverDo(body)` | `ForeverDo(body)` - runs `body` on loop forever. |
| [IfDo](/docs/nu/reference/core/flows/control#ifdo) | `control` | `IfDo(cond, then, else_=None)` | `IfDo(cond, then, else_=None)` - runs `then` or `else_` based on `cond`. |
| [SwitchDo](/docs/nu/reference/core/flows/control#switchdo) | `control` | `SwitchDo(selector, cases, default=None)` | `SwitchDo(selector, cases, default=None)` - runs the case body keyed by `selector`'s value. |
| [WhileDo](/docs/nu/reference/core/flows/control#whiledo) | `control` | `WhileDo(cond, body)` | `WhileDo(cond, body)` - runs `body` on loop while `cond` stays truthy. |

## parallel.parallel

Module `nu.core.flows.parallel.parallel`.

Parallel: join-on-all fan-in, smart + forced variants.

[Full entries](/docs/nu/reference/core/flows/parallel-parallel)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Gather](/docs/nu/reference/core/flows/parallel-parallel#gather) | `strategy` | `Gather(*items)` | Alias of `Parallel`, named for reading naturally at a yield site. |
| [Parallel](/docs/nu/reference/core/flows/parallel-parallel#parallel) | `strategy` | `Parallel(*items)` | Runs its children concurrently and joins once every one has finished. |
| [ParallelAsync](/docs/nu/reference/core/flows/parallel-parallel#parallelasync) | `strategy` | `ParallelAsync(*items)` | Parallel with every child forced onto the loop under async. |
| [ParallelThreaded](/docs/nu/reference/core/flows/parallel-parallel#parallelthreaded) | `strategy` | `ParallelThreaded(*items)` | Parallel with every child forced onto a worker thread under async. |

## noop

Module `nu.core.flows.noop`.

Noop: the empty Flow - the identity of flow composition.

[Full entries](/docs/nu/reference/core/flows/noop)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Noop](/docs/nu/reference/core/flows/noop#noop) | `strategy` | `Noop()` | The empty Flow: composes nothing, the identity of flow composition. |

## parallel.race

Module `nu.core.flows.parallel.race`.

Race: first-to-complete fan-in over the async loop.

[Full entries](/docs/nu/reference/core/flows/parallel-race)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Race](/docs/nu/reference/core/flows/parallel-race#race) | `strategy` | `Race(*children)` | Runs its children concurrently; first to finish wins - the `&` composition. |

## raise_

Module `nu.core.flows.raise_`.

Raise: raise an exception at run time.

[Full entries](/docs/nu/reference/core/flows/raise)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Raise](/docs/nu/reference/core/flows/raise#raise) | `control` | `Raise(msg, exc_cls=RuntimeError)` | Raise `exc_cls(msg)` at run time. |
| [raise_](/docs/nu/reference/core/flows/raise#raise_) |  | `flows.raise_(exc_cls, msg)` | Build a `Raise` node. Wrap in `IfDo` to gate. |

## strategy

Module `nu.core.flows.strategy`.

Strategy flows: Command-composing atoms that dispatch their children.

[Full entries](/docs/nu/reference/core/flows/strategy)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Sequential](/docs/nu/reference/core/flows/strategy#sequential) | `strategy` | `Sequential(*children)` | Runs its children in order - the `>>` composition. |

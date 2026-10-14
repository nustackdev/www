---
title: reactive.level
description: "Level flows: ReconcileReactive, WaitReactive, ForEachParReactive."
---

Module `nu.core.reactive.level`.

Level flows: ReconcileReactive, WaitReactive, ForEachParReactive.

A level flow does not hand its body the change. The body reads the current
state and makes it right: start what should run, stop what should not, write
what is missing, or answer whether a condition holds yet. Run twice with
nothing changed in between, the second run finds nothing to do. That is the
whole contract, and it is what makes these flows robust: since a pass ignores
why it runs, the flow can run it on wakes no subscription delivered, and a
missed notification costs a delay instead of a wrong state.

Change delivery is at most once. A fresh subscription can miss writes for a
short while (writers learn about it with a delay), and a backend may drop a
message. So a level flow wakes:

- once right after its subscription is bound, so the first read follows the
  subscribe and a write made before it is always seen;
- on every notification;
- on re-checks measured from binding: one at each `after` offset (default
  0.1, 0.3 and 1.0 seconds, the window a fresh subscription is blind in),
  then every `every` seconds forever (default 30; `None` turns the
  standing re-check off). A missed notification is caught by the next one.

Wakes merge: whatever lands while a pass runs, one notification or a hundred,
is one more pass, which reads the state as it then is. The subscription is
held for the flow's whole life and never reopened.

Which kind to reach for: a body that reacts to what happened (a click, a
message, the key that was written) is an event body and belongs in the
`React` family, which hands it the real key and never invents a wake. A body
that keeps something in step with state, or waits for state to reach a point,
is a level body and belongs here.

Async-only, like the whole reactive set: the sync `_compile` path raises.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ForEachParReactive](#foreachparreactive) | `control` | `ForEachParReactive(items, change, body, item=None, after=(0.1, 0.3, 1.0), every=30.0)` | `ForEachParReactive(items, change, lambda x: body)` - one arm per element, kept live against `change`. |
| [ReconcileReactive](#reconcilereactive) | `control` | `ReconcileReactive(change, body, after=(0.1, 0.3, 1.0), every=30.0)` | Keep state right: run the body after subscribing, on every change, and on re-checks. |
| [WaitReactive](#waitreactive) | `control` | `WaitReactive(change, cond, after=(0.1, 0.3, 1.0), every=30.0)` | Wait until a condition holds, read after subscribing, on every change, and on re-checks. |

## ForEachParReactive

`ForEachParReactive(items, change, lambda x: body)` - one arm per element, kept live against `change`.

```python
ForEachParReactive(items, change, body, item=None, after=(0.1, 0.3, 1.0), every=30.0)
```

Path `nu.core.ForEachParReactive`. Kind `Control`, sort `control`, cardinality `void`. Arity 6 (3 required).

The level flow over a fan-out: each pass reads `items` and makes the
arm set match it. Passes run right after subscribing, on every change,
and on re-checks, with changes during a pass merged into one more.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `items` | `object` |  | the elements to fan out over, read again on every pass. Elements must be hashable: the arm book is kept by element, and that is what makes a difference computable. |
| `change` | `object` |  | the change subscription that says the element set may have moved. Bound once, before the first pass, and held for as long as this runs. |
| `body` | `object` |  | the arm, run once per element, concurrently with the others. A lambda over the element, or a tree reading it with `Attr(item)`. |
| `item` | `object` | `None` | the name to bind that arm's element under, for a tree body. Optional, defaults to `"item"`; a lambda mints its own. |
| `after` | `Iterable[float]` | `(0.1, 0.3, 1.0)` | re-check offsets in seconds after binding, for the window a fresh subscription may not yet be heard in. |
| `every` | `float \| None` | `30.0` | seconds between standing re-checks once `after` is spent. `None` turns them off. |

**Notes**

- `ForEachParAsync` held open: the fan-out and the arms are the same, but the element list is read on every pass instead of once. What comes out of the comparison is births and deaths, and nothing else: an element with no arm gets one started, an arm whose element is gone is cancelled, and every other arm keeps running untouched. That is the whole reason to reach for this over a fan-out rebuilt from scratch, which restarts the innocent along with the guilty.
- A death is a cancellation, delivered by this atom. An arm does not have to notice its own element leaving; it is cancelled where it stands, and drained before the pass that killed it returns.
- So a delete and a re-add of the same element are a death and then a birth, in that order, never an overlap - but only when the two are seen by two different passes. A pass reconciles against the current answer to `items`, it does not replay changes, so a delete and a re-add that both land between two passes leave the arm running and unaware.
- Arms are isolated. One that raises ends alone: the error is not re-raised here and the siblings are not cancelled, which is the opposite of `ForEachParAsync`'s first-error-wins and is what supervision means. Its element gets a fresh arm on the next pass, so a body wanting its failures reported has to report them itself.
- Never returns on its own, even with an empty `items`: the surrounding Flow ends it by cancelling. Every live arm is cancelled and drained on the way out.
- A `body` that writes into what `change` watches wakes this atom again, and the pass that follows finds the arm set already right.

**Examples**

```python
Following a live collection needs a real substrate behind the
subscription, so it cannot run standalone here::
```

```python
    ForEachParReactive(users.keys(), users.on_children_change(), lambda user: body)
```

Undocumented: yields.

## ReconcileReactive

Keep state right: run the body after subscribing, on every change, and on re-checks.

```python
ReconcileReactive(change, body, after=(0.1, 0.3, 1.0), every=30.0)
```

Path `nu.core.ReconcileReactive`. Kind `Control`, sort `control`, cardinality `void`. Arity 4 (2 required).

Binds the subscription once and runs the body right after, then again
whenever a change lands or a re-check falls due, one pass at a time.
Never returns on its own; the caller ends it by cancelling.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `change` | `object` |  | the change subscription that says the state may have moved. |
| `body` | `object` |  | the pass. It gets no changed key: it reads the state it keeps in step and makes it right, and does nothing when nothing is off. A tree, or a lambda taking no arguments. |
| `after` | `Iterable[float]` | `(0.1, 0.3, 1.0)` | re-check offsets in seconds after binding, for the window a fresh subscription may not yet be heard in. |
| `every` | `float \| None` | `30.0` | seconds between standing re-checks once `after` is spent. `None` turns them off. |

**Yields**

Nothing.

**Notes**

- Changes landing while a pass runs merge into one more pass.
- A body that writes into what `change` watches wakes the flow again. A level body settles: the next pass finds nothing to do.
- An error raised by the body ends the flow and propagates. The subscription is unbound and closed on any exit.

**Examples**

```python
Keep an order's total in step with its quantity. Needs a real
substrate behind the subscription, so it cannot run standalone::
```

```python
    ReconcileReactive(Order.qty.on_change(), Order.total.set(Order.qty * Order.price))
```

## WaitReactive

Wait until a condition holds, read after subscribing, on every change, and on re-checks.

```python
WaitReactive(change, cond, after=(0.1, 0.3, 1.0), every=30.0)
```

Path `nu.core.WaitReactive`. Kind `Control`, sort `control`, cardinality `void`. Arity 4 (2 required).

Binds the subscription once and evaluates `cond` right after, then
again whenever a change lands or a re-check falls due. Returns on the
first truthy read, so a condition that already holds returns at once.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `change` | `object` |  | the change subscription that says `cond` may have moved. |
| `cond` | `object` |  | what to wait for. It gets no changed key: it reads the state and answers. A tree, or a lambda taking no arguments. EMPTY counts as false. |
| `after` | `Iterable[float]` | `(0.1, 0.3, 1.0)` | re-check offsets in seconds after binding, for the window a fresh subscription may not yet be heard in. |
| `every` | `float \| None` | `30.0` | seconds between standing re-checks once `after` is spent. `None` turns them off, leaving a dropped notification to wait for the next change. |

**Yields**

Nothing.

**Notes**

- The first read follows the subscribe, so a write made before the wait began is always seen. One whose notification goes missing is seen on the next re-check.
- Changes landing while `cond` is read merge into one more read.
- The subscription is unbound and closed on any exit.

**Examples**

```python
Block until a job is marked done. Needs a real substrate behind the
subscription, so it cannot run standalone::
```

```python
    WaitReactive(Job.status.on_change(), Job.status == "done")
```

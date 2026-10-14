---
title: reactive.event
description: "Event flows: React, ReactWhile, ReactForever, ReactLatest."
---

Module `nu.core.reactive.event`.

Event flows: React, ReactWhile, ReactForever, ReactLatest.

An event flow runs its body for a change: the body is handed the real key of
a real notification and nothing else wakes it. That makes it the right kind
for reacting to something that happened (a click, a message, a key that was
written) and the wrong kind for keeping state right, because delivery is best
effort: a subscription can miss a write made just after it opened, and a
backend may drop a message. Neither is made up for here. A body that reads
state and puts it right, whatever changed, belongs in a level flow
(`ReconcileReactive`, `WaitReactive`, `ForEachParReactive`), which can afford
re-checks precisely because it ignores the key.

All four are `Control` flows: they drive a mutating body under query
parameters (a change subscription, a condition) and yield nothing, exactly
like `WhileDo` / `ForeverDo`. A change notification is bridged into async
via `asyncio.Queue`, so all four require an async runtime and raise from
their sync `_compile` path. The first three take one wake per notification
with no collapsing; `ReactLatest` collapses a backlog to its newest key,
since it only ever runs the latest one.

`param_slots` names the consumed queries (the change subscription at slot
0, a condition where present, the names the changed key binds under); the
remaining slot is the body.

A body that wants the key that changed is a lambda over it
(`lambda key: ...`): it runs once, at construction, with a ref to the key,
and the name it binds under is minted for it. A plain tree body binds nothing,
unless `changed_key` names where to put the key for it. `ReactWhile`'s
condition is a binder slot the same way.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [React](#react) | `control` | `React(change, body=None, changed_key=None)` | Wait for one change on the subscription, run the body once, then stop. |
| [ReactForever](#reactforever) | `control` | `ReactForever(change, body, changed_key=None)` | Run the body on every change, unconditionally, forever. |
| [ReactLatest](#reactlatest) | `control` | `ReactLatest(change, body, changed_key=None, initial=False)` | Run the body on every change, cancelling the run a newer change makes stale. |
| [ReactWhile](#reactwhile) | `control` | `ReactWhile(change, condition, body, changed_key=None)` | Run the body on each change while the condition stays truthy. |

## React

Wait for one change on the subscription, run the body once, then stop.

```python
React(change, body=None, changed_key=None)
```

Path `nu.core.React`. Kind `Control`, sort `control`, cardinality `void`. Arity 3 (1 required).

Binds to the change subscription, blocks until exactly one notification
arrives, unbinds, and closes the subscription. The body (when present)
runs once, after that single notification, before `React` returns.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `change` | `object` |  | the change subscription to wait on (a `Subscription`-yielding query, e.g. `OnChange`). |
| `body` | `object` | `None` | what to run once the change fires: a lambda over the changed key, or a tree. Optional: leave it out to just wait for one change and do nothing. |
| `changed_key` | `object` | `None` | name the changed key is bound under while a tree body runs. Requires a body; a lambda mints its own. |

**Yields**

Nothing.

**Notes**

- Requires a body when `changed_key` is given: capturing a key with nothing to run it against is meaningless.
- Requires an async runtime; the sync path raises `RuntimeError`.

Undocumented: example.

## ReactForever

Run the body on every change, unconditionally, forever.

```python
ReactForever(change, body, changed_key=None)
```

Path `nu.core.ReactForever`. Kind `Control`, sort `control`, cardinality `void`. Arity 3 (2 required).

Binds to the change subscription once and then runs the body once per
notification, with no condition to end the loop. Never returns on its
own; the caller ends it by cancelling the surrounding task.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `change` | `object` |  | the change subscription to wait on. |
| `body` | `object` |  | what to run on every notification: a lambda over the changed key, or a tree. |
| `changed_key` | `object` | `None` | name the changed key is bound under while each run of a tree body lasts; a lambda mints its own. |

**Yields**

Nothing.

**Notes**

- Requires an async runtime; the sync path raises `RuntimeError`.

Undocumented: example.

## ReactLatest

Run the body on every change, cancelling the run a newer change makes stale.

```python
ReactLatest(change, body, changed_key=None, initial=False)
```

Path `nu.core.ReactLatest`. Kind `Control`, sort `control`, cardinality `void`. Arity 4 (2 required).

`ReactForever` with switch-latest semantics (Rx `switchMap`). Binds to
the change subscription once and starts the body as its own task on every
notification. A run still going when the next notification lands is
cancelled and awaited until it has fully unwound, and only then does the
body start again with the newest key. Never returns on its own; the
caller ends it by cancelling the surrounding task.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `change` | `object` |  | the change subscription to wait on. |
| `body` | `object` |  | what to run on every notification: a lambda over the changed key, or a tree. May never finish (a live view, a server loop); the next change is what ends it. |
| `changed_key` | `object` | `None` | name the changed key is bound under while each run of a tree body lasts; a lambda mints its own. |
| `initial` | `bool` | `False` | run the body once straight away, before any notification. That run binds no key, so the body sees whatever the caller seeded under `changed_key`, or an unbound name (a lambda's key reads EMPTY). |

**Yields**

Nothing.

**Notes**

- Notifications that pile up while a cancelled run is unwinding are collapsed: only the newest key runs, the backlog is not replayed.
- Each run gets a fresh branch of the Context it started from: its own attrs key space, values shared by reference. A restarted body never sees attrs a cancelled run left behind, and attrs a run binds do not reach the caller or its siblings.
- A body that finishes on its own is fine; the flow just waits for the next change.
- An error raised by the body, or while a cancelled run unwinds, ends the flow and propagates. The cancellation from a restart is not an error.
- Cancelling the flow cancels and drains the running body before the subscription is unbound and closed.
- Requires an async runtime; the sync path raises `RuntimeError`.

**Examples**

```python
A live view restarted whenever a select moves, drawn once up front.
Needs a real substrate behind the subscription, so it cannot run
standalone::
```

```python
    ReactLatest(
        Cell.source.on_change(),
        nustd.ui.lens.browse(Cell.lens, Movies),
        initial=True,
    )
```

```python
A body reading the key that changed::
```

```python
    ReactForever(Cell.source.on_change(), lambda key: nu.print(key))
```

## ReactWhile

Run the body on each change while the condition stays truthy.

```python
ReactWhile(change, condition, body, changed_key=None)
```

Path `nu.core.ReactWhile`. Kind `Control`, sort `control`, cardinality `void`. Arity 4 (3 required).

Binds to the change subscription once, then on every notification checks
the condition first: false stops the loop and unbinds without running the
body for that notification; truthy runs the body and waits for the next
change. The condition is re-evaluated fresh on every notification, not
just once at the start.

The condition sees the changed key as the body does, so a loop can wait
out the changes it does not care about and end on the first one it does.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `change` | `object` |  | the change subscription to wait on. |
| `condition` | `object` |  | checked after each notification, before that turn's body runs: a lambda over the changed key, or a tree. A falsy value ends the loop. |
| `body` | `object` |  | what to run on a turn where the condition holds: a lambda over the changed key, or a tree. |
| `changed_key` | `object` | `None` | name the changed key is bound under while that turn's tree condition and tree body run; a lambda mints its own. |

**Yields**

Nothing.

**Notes**

- The key is bound for the whole turn, condition and body alike. A lambda condition and a lambda body each read it under the name their own code mints.
- Requires an async runtime; the sync path raises `RuntimeError`.

**Examples**

```python
Wait for the first change to a key the caller cares about::
```

```python
    ReactWhile(Space.cells.on_descendants_change("*", "prog"),
               lambda key: mine.contains(key).not_(),
               nu.Noop())
```

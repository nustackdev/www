---
title: react
description: "Reactive control flows: React, ReactWhile, ReactForever."
---

Module `nu.core.flows.react`.

Reactive control flows: React, ReactWhile, ReactForever.

Subscribe to a change event and run a body in response. All three are
`Control` flows: they drive a mutating body under query parameters (a
change subscription, a condition) and yield nothing, exactly like `WhileDo`
/ `ForeverDo`. A change notification is bridged into async via
`asyncio.Queue` (one wake per notification, no collapsing), so all three
require an async runtime and raise from their sync `_compile` path.

`param_slots` names the consumed queries (the change subscription at slot
0, a condition where present, an optional `changed_key` name); the
remaining slot is the body.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [React](#react) | `control` | `React(change, body=None, changed_key=None)` | Wait for one change on the subscription, run the body once, then stop. |
| [ReactForever](#reactforever) | `control` | `ReactForever(change, body, changed_key=None)` | Run the body on every change, unconditionally, forever. |
| [ReactWhile](#reactwhile) | `control` | `ReactWhile(change, condition, body, changed_key=None)` | Run the body on each change while the condition stays truthy. |

## React

Wait for one change on the subscription, run the body once, then stop.

```python
React(change, body=None, changed_key=None)
```

Path `nu.core.flows.React`. Kind `Control`, sort `control`, cardinality `void`. Arity 3 (1 required).

Binds to the change subscription, blocks until exactly one notification
arrives, unbinds, and closes the subscription. The body (when present)
runs once, after that single notification, before `React` returns.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `change` | `object` |  | the change subscription to wait on (a `Subscription`-yielding query, e.g. `OnChange`). |
| `body` | `object` | `None` | what to run once the change fires. Optional: leave it out to just wait for one change and do nothing. |
| `changed_key` | `object` | `None` | name to bind the changed key under (via the attrs side-channel) before the body runs. Requires a body. |

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

Path `nu.core.flows.ReactForever`. Kind `Control`, sort `control`, cardinality `void`. Arity 3 (2 required).

Binds to the change subscription once and then runs the body once per
notification, with no condition to end the loop. Never returns on its
own; the caller ends it by cancelling the surrounding task.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `change` | `object` |  | the change subscription to wait on. |
| `body` | `object` |  | what to run on every notification. |
| `changed_key` | `object` | `None` | name to bind the changed key under before each body run. |

**Yields**

Nothing.

**Notes**

- Requires an async runtime; the sync path raises `RuntimeError`.

Undocumented: example.

## ReactWhile

Run the body on each change while the condition stays truthy.

```python
ReactWhile(change, condition, body, changed_key=None)
```

Path `nu.core.flows.ReactWhile`. Kind `Control`, sort `control`, cardinality `void`. Arity 4 (3 required).

Binds to the change subscription once, then on every notification checks
the condition first: false stops the loop and unbinds without running the
body for that notification; truthy runs the body and waits for the next
change. The condition is re-evaluated fresh on every notification, not
just once at the start.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `change` | `object` |  | the change subscription to wait on. |
| `condition` | `object` |  | checked after each notification, before that turn's body runs. A falsy value ends the loop. |
| `body` | `object` |  | what to run on a turn where the condition holds. |
| `changed_key` | `object` | `None` | name to bind the changed key under before the body runs on that turn. |

**Yields**

Nothing.

**Notes**

- Requires an async runtime; the sync path raises `RuntimeError`.

Undocumented: example.

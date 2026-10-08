---
title: runtime
description: "Runtime: how Nu programs run."
---

Module `nu.lang.runtime`.

Runtime: how Nu programs run.

- `runtime`   - `Runtime`: the concrete Runtime that drives compiled Programs.
- `context`   - `Context`: the tagged value store the runtime drives against.
- `utils`     - `Budget`, `into_loop`, `safely_(a)closing`: per-call
  resources and lifecycle helpers.

Sentinels (`EMPTY` / `INVALID` / `Sentinel`) live one level up as
`nu.lang.sentinels`: they are value-space vocabulary, not runtime
mechanics. Top-level entry points (`run`, `eval`, `aeval`, ...) live
in `nu.lang.helpers`.

## Call

| Name | Call | Meaning |
| --- | --- | --- |
| [into_loop](#into_loop) | `runtime.into_loop(coro)` | Run a coroutine to completion from sync code. |
| [safely_aclosing](#safely_aclosing) | `runtime.safely_aclosing(ait)` | Async sibling of `safely_closing`: `aclose` on exit if present. |
| [safely_closing](#safely_closing) | `runtime.safely_closing(it)` | Yield `it`; on exit call `close()` if it has one, else no-op. |

### into_loop

Run a coroutine to completion from sync code.

```python
runtime.into_loop(coro)
```

Path `nu.lang.runtime.into_loop`. Defined on `nu.lang.runtime.utils.loop`, bound as a function. Builds `T`.

Spins a fresh loop with `asyncio.run` when no loop is running. Raises
if called while a loop is already running - the caller should be using
`aeval` directly in that case.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `coro` | `Awaitable[T] \| Coroutine[object, object, T]` |  |  |

Undocumented: example.

### safely_aclosing

Async sibling of `safely_closing`: `aclose` on exit if present.

```python
runtime.safely_aclosing(ait)
```

Path `nu.lang.runtime.safely_aclosing`. Defined on `nu.lang.runtime.utils.loop`, bound as a function. Builds `AsyncIterator[AsyncIterable[T]]`.

Critical inside async generators that may short-circuit. Without this,
CPython queues finalizer `aclose` Tasks on the running loop, retaining
frames and Contexts until GC catches up - on a busy loop, an observable
memory leak.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ait` | `AsyncIterable[T]` |  |  |

Undocumented: example.

### safely_closing

Yield `it`; on exit call `close()` if it has one, else no-op.

```python
runtime.safely_closing(it)
```

Path `nu.lang.runtime.safely_closing`. Defined on `nu.lang.runtime.utils.loop`, bound as a function. Builds `Iterator[Iterable[T]]`.

Use to wrap iteration when the iterable's concrete type is unknown -
generators get finalized even on short-circuit (`break`, `return`,
exception); lists and ranges pass through unchanged.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `it` | `Iterable[T]` |  |  |

Undocumented: example.

---
title: logging
description: "Nu surface for Python's `logging` module."
---

Module `nustd.logging`.

Nu surface for Python's `logging` module.

`logging` is a class-and-functions module: a `Logger` class you get
from `getLogger`, plus module-level shortcuts (`debug` / `info` /
`warning` / `error` / `critical`) that fire against the root logger.
The Nu surface mirrors that shape 1-1. Call sites read identically to
Python, but every call returns a Nu `Log` tree instead of firing
immediately. Compose it into any bigger program:

```python
from nustd import logging

log = logging.getLogger(__name__)

tree = (
    log.info("server started")
    >> log.warning("cache miss for %s", key)
    >> log.error("checkout failed", extra={"code": 500})
)
nu.run(tree)
```

The sink is Python's `logging` module itself. Its handlers, formatters,
filters, and logger hierarchy are the configuration surface. There is no
separate Nu backend to bind; users configure via `logging.basicConfig(...)`
or attached handlers exactly the way any Python program does. That gives
free interop with the whole Python ecosystem: journald, syslog, structlog,
sentry, rotating files, ...

Two layers behind the public surface: `interactions` (the `Log`
atom and its `LoggingRef` fabric) and `functions` (the `Logger`
class and the module-level shortcuts). Import the way you would the stdlib:

```python
from nustd.logging import getLogger, info, warning, error
import nustd.logging as logging     # then logging.getLogger(...), ...
```

## interactions

Module `nustd.logging.interactions`.

The `Log` atom. One write through Python's `logging` module.

Every log statement in a Nu program compiles to a `Log`. The Command
mutates the log fabric (a single `LoggingRef` singleton, `LOGGING`) and
at eval time hands the resolved record to `logging.getLogger(name).log(...)`.
Python's `logging` module IS the sink. Its handlers, formatters, filters,
and hierarchy are the configuration surface. There is no separate Nu backend
to bind: users configure via `logging.basicConfig(...)` or attached handlers
exactly the way any Python program does.

Slot layout is `[LOGGING, level, logger, msg, *args]` with the structured
`extra` dict carried in `_payload`. Slot 0 is declared WRITE, so effect
tracking preserves order across log statements. Two logs in a Sequential
emit in order rather than getting parallelized as pure Queries. `*args` are
Nu-interpolable; they participate in the `%` formatting of `msg` at
eval time, mirroring `logging.Logger.log(level, msg, *args)`.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Log](#log) | `scalar_command` | `Log(level, logger, msg, extra=None)` | Writes one leveled record through Python's `logging` module. |
| [LoggingRef](#loggingref) | `ref` | `LoggingRef()` | A Ref naming Python's `logging` module. The sink for the log fabric. |

### Log

Writes one leveled record through Python's `logging` module.

```python
Log(level, logger, msg, extra=None)
```

Path `nustd.logging.Log`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 4 (3 required).

Children: `[LOGGING, level, logger, msg, *args]`. `level` is a name
(`"info"`, `"warning"`, ...) or an int (`logging.INFO`); `logger`
is the logger name; both are children so a tree rewrite can retarget them.
`msg` is the format string and `*args` are the `%`-substitution
values, resolved at eval time. Structured `extra` fields ride in
`_payload` (static Python values captured at construction).

A `msg` or `arg` that reads as an unbound sentinel drops the whole
line, the same skip-on-EMPTY guard `Print` uses. That
keeps a log call safe against attrs that may not be populated on every
branch.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `level` | `object` |  |  |
| `logger` | `object` |  |  |
| `msg` | `object` |  |  |
| `extra` | `dict[str, object] \| None` | `None` |  |

Undocumented: yields, example.

### LoggingRef

A Ref naming Python's `logging` module. The sink for the log fabric.

```python
LoggingRef()
```

Path `nustd.logging.LoggingRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Fixed singleton (`LOGGING`). Unlike `StdioRef` there is no
swappable backend: `logging` is a Python module-level singleton whose
handlers are the real configuration surface. This Ref exists so
`Log` can declare a slot-0 WRITE against a concrete fabric class,
which is what the engine uses to order log statements against each other.

Undocumented: example.

## functions

Module `nustd.logging.functions`.

Module-level surface for `nustd.logging`. Mirrors `logging` 1-1.

Two layers: the `Logger` class (returned by `getLogger`) and the
module-level shortcuts (`debug`, `info`, `warning`,
`warn`, `error`, `critical`, `log`) that fire on the
root logger, exactly like the stdlib's module-level helpers.

Same API shape as Python's `logging`:

```python
from nustd import logging

log = logging.getLogger(__name__)

tree = (
    log.info("server started")
    >> log.warning("cache miss for %s", key)
    >> log.error("checkout failed: %s", err, extra={"code": 500})
)
nu.run(tree)
```

Only difference from Python: every call returns a Nu `Log` tree; it
doesn't fire until the tree is evaluated. Compose it into any bigger
program, and effect ordering keeps two logs in a `Sequential` in order.

The configuration surface stays fully Python: `logging.basicConfig(...)`,
`logging.getLogger(...).addHandler(...)`, `structlog`, `sentry_sdk`,
journald, whatever. This module wraps the *call* side; `logging`'s handler
machinery is the sink and needs no Nu wrapper.

| Name | Call | Meaning |
| --- | --- | --- |
| [critical](#critical) | `logging.critical(msg, extra=None)` | Root-logger CRITICAL shortcut. |
| [debug](#debug) | `logging.debug(msg, extra=None)` | Root-logger DEBUG shortcut. |
| [error](#error) | `logging.error(msg, extra=None)` | Root-logger ERROR shortcut. |
| [getLogger](#getlogger) | `logging.getLogger(name=None)` | Return a bound `Logger`. Mirrors `logging.getLogger(name)`. |
| [info](#info) | `logging.info(msg, extra=None)` | Root-logger INFO shortcut. |
| [log](#log-1) | `logging.log(level, msg, extra=None)` | Root-logger shortcut at `level`. |
| [warn](#warn) | `logging.warn(msg, extra=None)` | Root-logger WARNING shortcut. |

### critical

Root-logger CRITICAL shortcut.

```python
logging.critical(msg, extra=None)
```

Path `nustd.logging.critical`. Defined on `nustd.logging.functions`, bound as a function. Builds `Log`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `msg` | `object` |  |  |
| `extra` | `dict[str, object] \| None` | `None` |  |

Undocumented: example.

### debug

Root-logger DEBUG shortcut.

```python
logging.debug(msg, extra=None)
```

Path `nustd.logging.debug`. Defined on `nustd.logging.functions`, bound as a function. Builds `Log`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `msg` | `object` |  |  |
| `extra` | `dict[str, object] \| None` | `None` |  |

Undocumented: example.

### error

Root-logger ERROR shortcut.

```python
logging.error(msg, extra=None)
```

Path `nustd.logging.error`. Defined on `nustd.logging.functions`, bound as a function. Builds `Log`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `msg` | `object` |  |  |
| `extra` | `dict[str, object] \| None` | `None` |  |

Undocumented: example.

### getLogger

Return a bound `Logger`. Mirrors `logging.getLogger(name)`.

```python
logging.getLogger(name=None)
```

Path `nustd.logging.getLogger`. Defined on `nustd.logging.functions`, bound as a function. Builds `Logger`.

Passing `None` (or omitting the argument) returns the root logger, same
as the stdlib.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `name` | `str \| None` | `None` |  |

Undocumented: example.

### info

Root-logger INFO shortcut.

```python
logging.info(msg, extra=None)
```

Path `nustd.logging.info`. Defined on `nustd.logging.functions`, bound as a function. Builds `Log`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `msg` | `object` |  |  |
| `extra` | `dict[str, object] \| None` | `None` |  |

Undocumented: example.

### log

Root-logger shortcut at `level`.

```python
logging.log(level, msg, extra=None)
```

Path `nustd.logging.log`. Defined on `nustd.logging.functions`, bound as a function. Builds `Log`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `level` | `int \| str` |  |  |
| `msg` | `object` |  |  |
| `extra` | `dict[str, object] \| None` | `None` |  |

Undocumented: example.

### warn

Root-logger WARNING shortcut.

```python
logging.warn(msg, extra=None)
```

Path `nustd.logging.warn`. Also exported as `warning`. Defined on `nustd.logging.functions`, bound as a function. Builds `Log`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `msg` | `object` |  |  |
| `extra` | `dict[str, object] \| None` | `None` |  |

Undocumented: example.

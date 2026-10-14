---
title: time
description: "Nu surface for Python's `time` module."
---

Module `nustd.time`.

Nu surface for Python's `time` module.

`time` is a function module - module-level functions over the process clock,
no central class - so the Nu surface mirrors that: free functions (`time`,
`monotonic`, `perf_counter`, `sleep`, ...). Two layers behind it:
`functions` (the typed wrappers) and `interactions` (the atoms each wrapper
builds). Import it the way you would the stdlib:

```python
from nustd.time import monotonic, sleep
import nustd.time as time     # then time.monotonic()
```

Every clock read reads the process clock. `sleep` is a sync-only,
effect-only op that yields `None` (it blocks); the async sleep lives in
`nustd.asyncio`.

## Call

| Name | Call | Meaning |
| --- | --- | --- |
| [monotonic](#monotonic) | `time.monotonic()` | A monotonic clock in seconds: mirrors `time.monotonic()`. Non-deterministic. |
| [monotonic_ns](#monotonic_ns) | `time.monotonic_ns()` | A monotonic clock in nanoseconds: mirrors `time.monotonic_ns()`. Non-deterministic. |
| [perf_counter](#perf_counter) | `time.perf_counter()` | The highest-resolution timer in seconds: mirrors `time.perf_counter()`. Non-deterministic. |
| [perf_counter_ns](#perf_counter_ns) | `time.perf_counter_ns()` | The highest-resolution timer in nanoseconds: mirrors `time.perf_counter_ns()`. Non-deterministic. |
| [process_time](#process_time) | `time.process_time()` | Process CPU time in seconds: mirrors `time.process_time()`. Non-deterministic. |
| [sleep](#sleep) | `time.sleep(secs)` | Block for `secs` seconds, yielding `None`: mirrors `time.sleep()`. Sync-only, effect-only. |
| [time](#time) | `time.time()` | Seconds since the epoch as a float: mirrors `time.time()`. Non-deterministic. |
| [time_ns](#time_ns) | `time.time_ns()` | Nanoseconds since the epoch as an int: mirrors `time.time_ns()`. Non-deterministic. |

### monotonic

A monotonic clock in seconds: mirrors `time.monotonic()`. Non-deterministic.

```python
time.monotonic()
```

Path `nustd.time.monotonic`. Defined on `nustd.time.functions`, bound as a function. Builds `Float`.

Undocumented: example.

### monotonic_ns

A monotonic clock in nanoseconds: mirrors `time.monotonic_ns()`. Non-deterministic.

```python
time.monotonic_ns()
```

Path `nustd.time.monotonic_ns`. Defined on `nustd.time.functions`, bound as a function. Builds `Int`.

Undocumented: example.

### perf_counter

The highest-resolution timer in seconds: mirrors `time.perf_counter()`. Non-deterministic.

```python
time.perf_counter()
```

Path `nustd.time.perf_counter`. Defined on `nustd.time.functions`, bound as a function. Builds `Float`.

Undocumented: example.

### perf_counter_ns

The highest-resolution timer in nanoseconds: mirrors `time.perf_counter_ns()`. Non-deterministic.

```python
time.perf_counter_ns()
```

Path `nustd.time.perf_counter_ns`. Defined on `nustd.time.functions`, bound as a function. Builds `Int`.

Undocumented: example.

### process_time

Process CPU time in seconds: mirrors `time.process_time()`. Non-deterministic.

```python
time.process_time()
```

Path `nustd.time.process_time`. Defined on `nustd.time.functions`, bound as a function. Builds `Float`.

Undocumented: example.

### sleep

Block for `secs` seconds, yielding `None`: mirrors `time.sleep()`. Sync-only, effect-only.

```python
time.sleep(secs)
```

Path `nustd.time.sleep`. Defined on `nustd.time.functions`, bound as a function. Builds `None_`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `secs` | `FloatArg` |  |  |

Undocumented: example.

### time

Seconds since the epoch as a float: mirrors `time.time()`. Non-deterministic.

```python
time.time()
```

Path `nustd.time.time`. Defined on `nustd.time.functions`, bound as a function. Builds `Float`.

Undocumented: example.

### time_ns

Nanoseconds since the epoch as an int: mirrors `time.time_ns()`. Non-deterministic.

```python
time.time_ns()
```

Path `nustd.time.time_ns`. Defined on `nustd.time.functions`, bound as a function. Builds `Int`.

Undocumented: example.

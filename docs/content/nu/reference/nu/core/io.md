---
title: io
description: "IO: console read/write through the stdio fabric."
---

Module `nu.core.io`.

IO: console read/write through the stdio fabric.

Maps Python's console builtins onto Nu. This file crosses sorts: a write that
yields nothing is a Command, a read that yields a value is an Action (effect +
yield in one atom).

- `print` -> `Print` (write to stdout, yields nothing -> Command)
- `input` -> `Input` (read a line, consume stdin + yield -> Action)

Both go **through a Ref** on the stdio fabric, exactly like any Context write:
slot 0 holds the `StdioRef` (`STDOUT` / `STDIN`), declared in `mutates`,
so effect synthesis binds it WRITE. That is what makes two prints ordered (same
fabric) rather than reorderable - a plain value Query would read as pure and the
engine could fold or parallelize it, which for real IO is wrong.

The ergonomics: the `print` / `input` wrapper functions inject the singleton
Ref, so a caller never imports or passes it - `io.print("hi")`, not
`Print(STDOUT, ...)`. `print` returns the `Print` atom
directly (a Form is a scalar-query and cannot hold a Command); `input` returns
a `Str` so the read line carries the full string interface.

Everything is one console fabric (one `StdioRef` class): the effect system
identifies a fabric by the concrete Ref class, so stdout and stdin share it and
the engine keeps console IO serial - the safe default. Splitting streams into
separate fabrics (to parallelize a read against a write) is not worth it for a
terminal. `open` / the filesystem fabric land later as their own fabric.

Tests (and any host embedding) can redirect the streams by binding a
`StdioBackend` fabric on the Context; absent one, the atoms hit the real
`sys` streams.

For logging use `nustd.logging` -- it wraps Python's `logging` module 1-1
(same handlers, formatters, and configuration surface), so log records don't
share the stdio fabric.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Input](#input) | `scalar_action` | `Input(ref)` | Reads one line from the stdin fabric Ref in slot 0 and yields it. |
| [Print](#print) | `scalar_command` | `Print(ref, sep=' ', end='\n', flush=False)` | Writes the values in slots 1.. to the stdout fabric Ref in slot 0. |
| [input](#input-1) |  | `core.input()` | Read one line from stdin (newline stripped) and yield it as a `Str`. |
| [print](#print-1) |  | `core.print(sep=' ', end='\n', file=None, flush=False)` | Write `values` to a stdio stream. Mirrors `builtins.print`. |

## Input

Reads one line from the stdin fabric Ref in slot 0 and yields it.

```python
Input(ref)
```

Path `nu.core.Input`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the stdio Ref to read through. |

**Yields**

The line read, newline stripped.

**Notes**

- Python's `input`, minus the prompt argument - a prompt would be a second, stdout write, deferred to land with the filesystem fabric.
- A ScalarAction: mutates the stdin fabric (consuming input advances the read position) and yields a value in the same atom. Two reads in the same program yield different lines.

**Example**

```python
inbuf = io.StringIO("a line\n")
ctx = Context().bind(StdioBackend, StdioBackend(stdin=inbuf))
run(Input(STDIN), ctx)[0]
```

```
'a line'
```

## Print

Writes the values in slots 1.. to the stdout fabric Ref in slot 0.

```python
Print(ref, sep=' ', end='\n', flush=False)
```

Path `nu.core.Print`. Kind `Command`, sort `scalar_command`, cardinality `void`. Arity 4 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` | `StdioRef` |  | the stdio Ref to write through (`file` in Python's `print`). |
| `sep` | `str` | `' '` | separator between values. |
| `end` | `str` | `'\n'` | text appended after the last value. |
| `flush` | `bool` | `False` | flush the stream after writing. |

**Yields**

Nothing (VOID).

**Notes**

- Python's `print` -- signature-identical. A Command: mutates the stdout fabric and yields nothing.
- Slot 0 is the IO Ref it writes through, declared in `mutates`; every other slot binds in read role.
- `sep` / `end` / `flush` are captured at construction and ride in `_payload` as static Python values, never resolved as Nu terms.
- If any value is EMPTY or INVALID, nothing is written at all: the check runs before the write, not per already-collected value.

**Example**

```python
ctx = Context().bind(StdioBackend, StdioBackend(stdout=buf))
run(Print(STDOUT, "hi"), ctx)
```

## input

Read one line from stdin (newline stripped) and yield it as a `Str`.

```python
core.input()
```

Path `nu.core.input`. Defined on `nu.core.io`, bound as a function. Builds `Str`.

**Yields**

A Nu `Str` wrapping the line read.

**Notes**

- Nu's `input`, no prompt argument yet.
- Injects the `STDIN` Ref so a caller never imports or passes it.
- Returns a `Str`, not a raw string, so the read line composes like any other string term.

**Example**

```python
inbuf = io.StringIO("a line\n")
ctx = Context().bind(StdioBackend, StdioBackend(stdin=inbuf))
run(nu.core.io.input(), ctx)[0]
```

```
'a line'
```

## print

Write `values` to a stdio stream. Mirrors `builtins.print`.

```python
core.print(sep=' ', end='\n', file=None, flush=False)
```

Path `nu.core.print`. Defined on `nu.core.io`, bound as a function. Builds `Print`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sep` | `str` | `' '` | separator between values. |
| `end` | `str` | `'\n'` | text appended after the last value. |
| `file` | `StdioRef \| None` | `None` | the stream to write to. Optional: defaults to `STDOUT`. |
| `flush` | `bool` | `False` | flush the stream after writing. |

**Yields**

The `Print` atom itself, not a Form: a Command yields nothing, so
there is nothing to wrap. Drive it with `run` / `arun` or
compose it in a Flow.

**Notes**

- Same signature as Python's `print`, except `file` is a Nu `StdioRef` rather than a raw Python IO object, since the stdio fabric identifies streams by Ref. Pass `STDERR` to write to stderr.
- Injects the `STDOUT` Ref so a caller never imports or passes it.

**Example**

```python
ctx = Context().bind(StdioBackend, StdioBackend(stdout=buf))
run(nu.core.io.print("hi"), ctx)
```

---
title: services
description: "Services: the system's policy, as cells on workers (D20)."
---

Module `nuspace.system.services`.

Services: the system's policy, as cells on workers (D20).

Each is a system plane with a fixed id and one cell `main` (D31) whose
prog is a shim importing its module here, so the code lives in the package
and the store holds a program like any other. They act only through ops.

- `init`: pid 1, runs its boot list at open.
- `nav`: one plane run per open plane of a connection, the planes its routes name.
- `supervisor`: keeps the planes its policy names running, with backoff.
- `reload`: replaces a live cell run when its cell's prog changes.
- `reactions`: runs a plane whenever a change is notified. Its plane has no `main`.
- `bootstrap`: the service planes made real in a store.

Modules here are imported into workers: nothing at module scope may pull in
a server (starlette, uvicorn).

## init

Module `nuspace.system.services.init`.

init: pid 1. Runs the planes its boot list names, once, at open.

The kernel starts this and nothing else. What else runs at boot is data, in
this cell's own state (`Boot`), edited with `boot` and
`unboot` from anywhere. Each plane gets a plane run of its own,
`by` init, on the backend the plane names.

| Name | Call | Meaning |
| --- | --- | --- |
| [Boot](#boot) |  | init's state: the plane ids to bring up at open, in order. |
| [boot](#boot-1) | `services.boot(plane_id)` | Add a plane to init's boot list. A no-op when it is listed already. |
| [unboot](#unboot) | `services.unboot(plane_id)` | Take a plane off init's boot list. A no-op when it is not listed. |

### Boot

init's state: the plane ids to bring up at open, in order.

Path `nuspace.system.services.Boot`.

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `planes` | `ref` | `ListRef[str]` |  | `nuspace.system.services.Boot.planes` |

Undocumented: example.

### boot

Add a plane to init's boot list. A no-op when it is listed already.

```python
services.boot(plane_id)
```

Path `nuspace.system.services.boot`. Defined on `nuspace.system.services.init`, bound as a function. Builds `nu.Nu`.

A store with no list yet gets `BOOTED` first. Takes effect at the
next open: init reads its list once.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |

Undocumented: example.

### unboot

Take a plane off init's boot list. A no-op when it is not listed.

```python
services.unboot(plane_id)
```

Path `nuspace.system.services.unboot`. Defined on `nuspace.system.services.init`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |

Undocumented: example.

## supervisor

Module `nuspace.system.services.supervisor`.

supervisor: keeps the planes its policy names running, with backoff or a fixed delay (D13).

Plane level, and only its own runs. Per supervised plane (`Policy`)
it keeps one live plane run `by` supervisor, and remembers its id in its
own state. It only ever reads that run, by id, and never looks at or touches
a run somebody else started: nav's tab runs of the same plane are theirs.

    none of its runs yet       plane_run(plane, by=supervisor), no wait
    its run live               wait for it to end
    its run ended              restart per policy on the run's exit, after
                                 the wait, else leave the plane down until it
                                 is supervised again
    unsupervised               forgotten, and its run stopped

=============  ===========================  =====================
policy         restarts after exit          never after
=============  ===========================  =====================
`on-failure` `failed`                   `ok`, `interrupted`,
`always`     `ok`, `failed`           `killed`
=============  ===========================  =====================

=============  =========================================================
wait           before each restart
=============  =========================================================
backoff        0.25s, doubled per restart after a failure, capped at 30s,
               back to 0.25s after an `ok` exit. The default
fixed delay    exactly the seconds given to `supervise`, every time.
               `always` with a delay is a periodic plane
=============  =========================================================

`interrupted` and `killed` are somebody asking, so they are respected.
A cell failing inside a run that is still live is left alone: the plane
run is what the supervisor restarts, once it has ended.

Every read is a point read: a policy, a run id, a run's `exit`. Nothing
walks `runs`, `running` or a run's cell runs.

| Name | Call | Meaning |
| --- | --- | --- |
| [Policy](#policy) |  | The supervisor's state, keyed by plane id. |
| [supervise](#supervise) | `services.supervise(plane_id, policy='on-failure', delay=None)` | Put a plane under the supervisor, or change its policy and delay. One commit. |
| [unsupervise](#unsupervise) | `services.unsupervise(plane_id)` | Take a plane off the supervisor, delay and all, and stop the run it started. |

### Policy

The supervisor's state, keyed by plane id.

Path `nuspace.system.services.Policy`.

`planes` holds each supervised plane's policy in `POLICIES`,
none for a plane not supervised. `delays` holds the fixed wait in
seconds of the planes that have one, in place of the backoff. `runs`
holds the plane run the supervisor last started for each, live or
ended: the only run it ever looks at. Read with a default, `""` or
`-1`, for a plane they hold nothing for.

**Slots**

| Name | Kind | Type | Config | Path |
| --- | --- | --- | --- | --- |
| `planes` | `ref` | `DictRef[str, str]` |  | `nuspace.system.services.Policy.planes` |
| `delays` | `ref` | `DictRef[str, float]` |  | `nuspace.system.services.Policy.delays` |
| `runs` | `ref` | `DictRef[str, str]` |  | `nuspace.system.services.Policy.runs` |

Undocumented: example.

### supervise

Put a plane under the supervisor, or change its policy and delay. One commit.

```python
services.supervise(plane_id, policy='on-failure', delay=None)
```

Path `nuspace.system.services.supervise`. Defined on `nuspace.system.services.supervisor`, bound as a function. Builds `nu.Nu`.

A plane whose supervisor run ended and was not restarted (interrupted,
killed, or `ok` under `on-failure`) is brought up again: supervising
it is asking for it to run.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  | The plane. |
| `policy` | `nu.StrArg` | `'on-failure'` | `ON_FAILURE` or `ALWAYS`. |
| `delay` | `nu.FloatArg \| None` | `None` | Seconds to wait before every restart, in place of the backoff. None clears it, back to the backoff. |

Undocumented: example.

### unsupervise

Take a plane off the supervisor, delay and all, and stop the run it started.

```python
services.unsupervise(plane_id)
```

Path `nuspace.system.services.unsupervise`. Defined on `nuspace.system.services.supervisor`, bound as a function. Builds `nu.Nu`.

Forgotten in one commit, its remembered run read and dropped there too,
so the supervisor starts nothing for it after; then that run, if live,
is stopped: interrupted, killed after the grace. Returns once it has
ended, or once the kill is asked for. A no-op when the plane is not
supervised.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  |  |

Undocumented: example.

## reactions

Module `nuspace.system.services.reactions`.

reactions: a plane run whenever a change is notified, with nothing kept running idle for it.

One system plane, `PLANE`, on the `async` backend, with no cells of
its own. Every cell on it is a reaction, and every reaction is a task in its
live run's one worker. init runs it at boot, reactions and all; with none,
the run ends at once and `enable_react` starts one again.

    enable_react(change, plane)   a reaction cell added, run in the live run
                                    (or a run of the plane started)
    disable_react(change, plane)  its live cell run interrupted, the cell removed

A reaction is an ordinary cell. Its prog is Python source like any other,
so the change it waits on is written into it as source, nothing serialized:

```python
def out():
    return nu.ReconcileReactive(
        ops.snapshot(States.planes["chat"].state["messages"].on_change()),
        up_plane("chat"),
        after=(),
        every=None,
    )
```

The reaction fires once as it starts, after its subscription is bound,
which covers changes made while the space was closed, and then on every
notification. A fire is a plane run, so it has no re-checks: it runs on
changes only.

`enable_react` loads the source before it writes the cell, the way
the kernel will: source that does not construct, a bad import included,
fails the call with its diagnostic, and no cell is made.

What a change can watch: what its source can name. `Space` and `States`
are in scope, with `nu`, `nustd`, `nuspace` and `ops`, so any plane's
state (`States.planes[p].state[key]`) and any cell's
(`States.cells.on_descendants_change(c, key)`) can be watched,
and anything in Space. A shape from an importable module is brought in with
`imports`; a `CellState` or `PlaneState` one must be placed with
`ops.cell_state` or `ops.plane_state`, or it lands under the reaction's
own cell. A shape declared in another cell's prog cannot be imported.

Dedupe is `up_plane`'s. It starts a run of the plane `by`
`BY` in a commit that finds none live (a filter of the plane's live
runs, O(k)), so two never run at once, even from two reactions on one
plane. One live already may or may not have seen the change, so it waits for
that run's `terminated_at` (a point read) and fires once more after it.
Notifications landing while one fire waits merge into one more fire, so a
burst of changes is one run after the one live, never two at once.

Contract for the planes run. A plane a reaction runs runs to completion: it
keeps a cursor in its plane state (the last item it handled), handles
everything past it, and returns. An extra fire is then harmless, the first
one included. A plane writing the ref it reacts to fires itself once more:
its cursor makes that run a no-op. This is a convention, not checked here.

A reaction is known by its change and plane: the plane's own state
(`Registry`) maps their key to the reaction cell, so both ops are
point reads. Nothing here walks `runs`, the reaction cells, or the planes.

| Name | Call | Meaning |
| --- | --- | --- |
| [disable_react](#disable_react) | `services.disable_react(change, plane_id)` | Stop running `plane_id` on `change`. A no-op when there is no such reaction. |
| [enable_react](#enable_react) | `services.enable_react(change, plane_id, imports='')` | Run `plane_id` on every notification of `change`: a reaction cell added and run. Idempotent. |
| [up_plane](#up_plane) | `services.up_plane(plane_id, by='react')` | Run a plane that runs to completion once more, never two at once. Returns once started. |

### disable_react

Stop running `plane_id` on `change`. A no-op when there is no such reaction.

```python
services.disable_react(change, plane_id)
```

Path `nuspace.system.services.disable_react`. Defined on `nuspace.system.services.reactions`, bound as a function. Builds `nu.Nu`.

The reaction's cell run in the live run is interrupted, then its cell
removed (which interrupts any other run of it), then its key. The key
last: a crash between leaves a key naming no cell, which reads as no
reaction, never a reaction nobody can find. A run of the plane it
already started is left to finish.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `change` | `nu.StrArg` |  |  |
| `plane_id` | `nu.StrArg` |  |  |

Undocumented: example.

### enable_react

Run `plane_id` on every notification of `change`: a reaction cell added and run. Idempotent.

```python
services.enable_react(change, plane_id, imports='')
```

Path `nuspace.system.services.enable_react`. Defined on `nuspace.system.services.reactions`, bound as a function. Builds `nu.Nu`.

A reaction already there for the change and the plane is kept as it is.
Otherwise its source is loaded first, as the kernel will load it, then
three commits: the cell (Space), its key (States), then its run
(`_start`). A reaction made by a racing call in between wins, and
this one's cell is removed.

The reaction's cell is `reaction_of` the change and the plane,
whichever call made it.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `change` | `nu.StrArg` |  | Source of an expression yielding a subscription, with `Space`, `States`, `nu`, `nustd`, `nuspace` and `ops` in scope, eg `'States.planes["chat"].state["messages"].on_change()'`. See the module for what it can watch. |
| `plane_id` | `nu.StrArg` |  | The plane to run. It runs to completion (see the module). |
| `imports` | `str` | `''` | Source put after the standard imports, for a shape from an importable module. |

Undocumented: example.

### up_plane

Run a plane that runs to completion once more, never two at once. Returns once started.

```python
services.up_plane(plane_id, by='react')
```

Path `nuspace.system.services.up_plane`. Defined on `nuspace.system.services.reactions`, bound as a function. Builds `nu.Nu`.

With no live run of the plane `by` `by`, one is started. With one
live, it may or may not see whatever asked for this, so this waits for
it to end (its `terminated_at`, a point read) and then starts one.
The start is one commit that finds none live, so callers racing on one
plane start one run between them. Nothing when the plane is gone.

Cancelled while it waits (its reaction disabled), it starts nothing.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `plane_id` | `nu.StrArg` |  | The plane. |
| `by` | `nu.StrArg` | `'react'` | Who asked, what the run is recorded as, and whose live runs count. |

Undocumented: example.

## bootstrap

Module `nuspace.system.services.bootstrap`.

Bootstrap: the service planes made real in a store, once.

Each service is a system plane with a fixed id and one cell `main`, its
id fixed too, whose prog is the service's shim (D20, D31). init's boot list is seeded with the
others the first time, and left alone after: it is data somebody may have
edited since.

| Name | Call | Meaning |
| --- | --- | --- |
| [ensure_system](#ensure_system) | `services.ensure_system()` | The service planes, the reactions plane, and init's boot list, where missing. Idempotent. |

### ensure_system

The service planes, the reactions plane, and init's boot list, where missing. Idempotent.

```python
services.ensure_system()
```

Path `nuspace.system.services.ensure_system`. Defined on `nuspace.system.services.bootstrap`, bound as a function. Builds `nu.Nu`.

A store that has them is left exactly as it is. Run before the kernel
starts init (`open_kernel(init="init")`).

Undocumented: example.

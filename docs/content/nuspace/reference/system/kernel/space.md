---
title: space
description: "The brackets a space is opened in: store, pool, spares, backends."
---

Module `nuspace.system.kernel.space`.

The brackets a space is opened in: store, pool, spares, backends.

A space is a directory:

```python
<space dir>/
  kernel.sqlite     the Space store: planes, cells, nesting, runs, devices
  state.sqlite      the States store: what the programs remember
  valkey/           the notification server's data dir (pid, log)
```

Each store is one SQLite file in WAL mode, which every process opens and
writes on its own: readers never wait, writers take turns on the file's
lock, and a process that dies mid write frees it. Two files, two tags
(`Space`, `States`): a
bracket names one, and a write to one never waits on the other's lock. What
SQLite does not do is tell one process about another's writes, so the host
runs a private Valkey server on a unix socket and every process publishes
and subscribes through it, each store on its own channel prefix so neither
hears the other. Everything here follows from that:

- the host brings the server up before its own navigators, and takes it
  down last, after the fleet has stopped talking to it;
- a worker opens the same files with the same server's address, so a read
  is a local read, and a write it makes wakes a subscriber anywhere;
- workers are children of the host, so the pool lives here too, and closing
  the brackets reaps the fleet.

`worker_context` is the other side: what every worker comes up
holding, pickled to the child and entered there. Nothing here writes, and
nothing here knows about runs. `open_kernel` stacks it all, the
backends on top of the pool and its spares, and runs the kernel beside a
body.

| Name | Call | Meaning |
| --- | --- | --- |
| [navigator](#navigator) | `kernel.navigator(path)` | Both stores in `path`, as any process opens them: Space, then States. |
| [open_kernel](#open_kernel) | `kernel.open_kernel(body, path=None, spares=2, envs=None, space_envs=(), backends=None, init=None, name='nuspace')` | A space open in this process, the kernel running beside `body`. |
| [space_dir](#space_dir) | `kernel.space_dir(path)` | `path` made absolute, refused if it holds a store of the old RocksDB layout. |
| [store](#store) | `kernel.store(path=None)` | The space's stores as their owner opens them: the notification server, then `navigator`. |
| [worker_context](#worker_context) | `kernel.worker_context(path)` | What every worker comes up holding. Pickled to the child, entered there. |
| [worker_pool](#worker_pool) | `kernel.worker_pool(path, name='nuspace')` | The fleet, every worker holding `worker_context`. Closing kills them all. |

## navigator

Both stores in `path`, as any process opens them: Space, then States.

```python
kernel.navigator(path)
```

Path `nuspace.system.kernel.navigator`. Defined on `nuspace.system.kernel.space`, bound as a function. Builds `nu.With`.

Tagged `Space` and `States`.
kv refs find their navigator by root shape class, so the tags are load
bearing: a rerooted state ref routes to `state.sqlite`, anything of
Space to `kernel.sqlite`. Both are always opened, never one without
the other. Needs the space's server up: their publishers and observers
connect at setup. The host opens them inside `store`, a worker on
its own.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str` |  | The space directory, absolute (see `space_dir`). |

Undocumented: example.

## open_kernel

A space open in this process, the kernel running beside `body`.

```python
kernel.open_kernel(body, path=None, spares=2, envs=None, space_envs=(), backends=None, init=None, name='nuspace')
```

Path `nuspace.system.kernel.open_kernel`. Defined on `nuspace.system.kernel.space`, bound as a function. Builds `nu.With`.

The brackets, in the order each needs the last (teardown runs the other
way, so the fleet dies before the server it publishes through): the
stores (the notification server, then both navigators), a dict, the pool,
the shelf of spares, the backends, the kernel's config. Inside: reconcile first, so
leftovers have ended before `body` asks for anything, then the kernel and
`body` race. The space closes when `body` returns; a server's body
never does.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `body` | `nu.Nu` |  | What runs in the host beside the kernel. |
| `path` | `str \| None` | `None` | The space directory. None is a throwaway one, see `store`. |
| `spares` | `int` | `2` | Idle workers to keep up. Zero is every take cold. |
| `envs` | `Mapping[str, EnvFactory] \| None` | `None` | Env factories by name, see `envs`. |
| `space_envs` | `Sequence[Sequence[str] \| str]` | `()` | Env specs applied to every run, outermost. |
| `backends` | `Mapping[str, type[Backend]] \| None` | `None` | Backend classes by name, on top of the built in `async` and `mp` (see `backends`). |
| `init` | `str \| None` | `None` | A plane to run once reconciled, see `kernel`. |
| `name` | `str` | `'nuspace'` | Process name prefix for workers. |

Undocumented: example.

## space_dir

`path` made absolute, refused if it holds a store of the old RocksDB layout.

```python
kernel.space_dir(path)
```

Path `nuspace.system.kernel.space_dir`. Defined on `nuspace.system.kernel.space`, bound as a function. Builds `str`.

Absolute because workers get it pickled and derive the server's socket
from it: every process has to name the same directory the same way.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str` |  |  |

Undocumented: example.

## store

The space's stores as their owner opens them: the notification server, then `navigator`.

```python
kernel.store(path=None)
```

Path `nuspace.system.kernel.store`. Defined on `nuspace.system.kernel.space`, bound as a function. Builds `nu.With`.

The server comes up first and goes down last, so nothing in the bracket
ever talks to a server that is not there.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str \| None` | `None` | The space directory, created if missing. None is a throwaway directory, removed when the bracket closes. |

Undocumented: example.

## worker_context

What every worker comes up holding. Pickled to the child, entered there.

```python
kernel.worker_context(path)
```

Path `nuspace.system.kernel.worker_context`. Defined on `nuspace.system.kernel.space`, bound as a function. Builds `nu.With`.

Process scope only, since the pool pays it on every launch: both
stores, opened by the worker itself on the host's files and server, a dict for
host local records, and the warm module cache. Whatever one run needs
rides in its body.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str` |  | The space directory, absolute. |

Undocumented: example.

## worker_pool

The fleet, every worker holding `worker_context`. Closing kills them all.

```python
kernel.worker_pool(path, name='nuspace')
```

Path `nuspace.system.kernel.worker_pool`. Defined on `nuspace.system.kernel.space`, bound as a function. Builds `nu.Provide`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str` |  | The space directory, absolute. |
| `name` | `str` | `'nuspace'` | Process name prefix. |

Undocumented: example.

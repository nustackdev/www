---
title: presets
description: "One call that stands up a whole storage stack, in either of two forms."
---

Module `nustd.kv.presets`.

One call that stands up a whole storage stack, in either of two forms.

A working KV fabric is six things bound together: a Codec, a Transport, a
Publisher, an Observer, a Storage and a Navigator. Writing that out by hand is
six lines that are the same six lines every time, in an order that matters,
with a `publisher_type=` on the Storage that has to agree with the Publisher
above it. The presets here are those lines, already correct, named after the
backend they stand up.

The `*_navigator` and `*_observer` functions return a `With` bracket
composed of `Provide` peers. It drops straight into a tree as the fabric a
program runs against, and being an ordinary bracket it gets bind order and
LIFO teardown for free:

```python
app = nu.With(nustd.kv.rocksdb_navigator(".db"), body=program)
```

The `*_storage` functions are the other form: plain context managers handing
back a live `StorageProtocol`, for wiring a Context by hand rather than
through the tree. The two forms are independent; neither is built on the other.

Every navigator preset takes `tags`, folded onto every binding it makes:
Codec, Transport, Publisher, Observer, Storage and Navigator alike. That is how
a shard names itself: bind one preset per shard under its own tag, and a Ref
carrying that scope routes to the whole stack, reactivity included.

The `_redis` variants swap the in-process Publisher and Observer for Redis
ones, which is what makes change notifications cross process boundaries. The
plain variants keep everything in-process and need nothing running.

`inmem_observer` and `redis_observer` bind the listening half alone, for an
actor that reacts to changes without owning a storage of its own.

`served_observer` and `proxy_observer` are the other way to cross a process
boundary, over a socket rather than Redis. The process holding the storage
serves its observer; the process holding a proxied Navigator binds it and hears
the writes it did not make.

| Name | Call | Meaning |
| --- | --- | --- |
| [memory_storage](#memory_storage) | `kv.memory_storage()` | Create in-memory storage with no-op codec and in-memory publisher. |
| [rocksdb_storage_redis](#rocksdb_storage_redis) | `kv.rocksdb_storage_redis(path, read_only=False, secondary_path=None, secondary_refresh_interval=0.01, redis_url='redis://localhost:6379', channel_prefix='__every__')` | Create RocksDB storage with binary codec and Redis publisher. |
| [rocksdb_storage](#rocksdb_storage) | `kv.rocksdb_storage(path, read_only=False, secondary_path=None, secondary_refresh_interval=0.01)` | Create RocksDB storage with binary codec and in-memory publisher. |
| [text_storage](#text_storage) | `kv.text_storage(path)` | Create text storage with text codec and in-memory publisher. |
| [inmem_observer](#inmem_observer) | `kv.inmem_observer(tags=())` | Binds the listening half of the in-process notification pair, alone. |
| [lmdb_navigator](#lmdb_navigator) | `kv.lmdb_navigator(path, tags=(), read_only=False, map_size=10737418240, max_readers=126, subdir=True, sync=True)` | Stands up a persistent LMDB stack with in-process change notification. |
| [lmdb_navigator_redis](#lmdb_navigator_redis) | `kv.lmdb_navigator_redis(path, tags=(), read_only=False, map_size=10737418240, max_readers=126, subdir=True, sync=True, redis_url='redis://localhost:6379', channel_prefix='nu')` | Stands up a persistent LMDB stack whose changes reach other processes. |
| [memory_navigator](#memory_navigator) | `kv.memory_navigator(tags=())` | Stands up a whole in-memory storage stack, gone when the process ends. |
| [proxy_observer](#proxy_observer) | `kv.proxy_observer(address, body=None, tag=None, transport='tcp', timeout=5.0, max_retries=3)` | Binds another process's change feed, over the socket it serves it on. |
| [redis_observer](#redis_observer) | `kv.redis_observer(redis_url='redis://localhost:6379', channel_prefix='nu', tags=())` | Binds a Redis subscriber alone, for a program that only reacts. |
| [rocksdb_navigator_redis](#rocksdb_navigator_redis) | `kv.rocksdb_navigator_redis(path, tags=(), read_only=False, secondary_path=None, secondary_refresh_interval=0.01, disable_wal=False, options=None, redis_url='redis://localhost:6379', channel_prefix='__every__')` | Stands up a persistent RocksDB stack whose changes reach other processes. |
| [rocksdb_navigator](#rocksdb_navigator) | `kv.rocksdb_navigator(path, tags=(), read_only=False, secondary_path=None, secondary_refresh_interval=0.01, disable_wal=False, options=None)` | Stands up a persistent RocksDB stack with in-process change notification. |
| [served_observer](#served_observer) | `kv.served_observer(address, target_tag=None, transport='tcp', executor='threaded')` | Puts this process's change feed on a socket, for other processes to hear. |
| [text_navigator](#text_navigator) | `kv.text_navigator(path, tags=(), read_only=False, log_operations=False)` | Stands up a JSON-on-disk stack you can open in an editor and read. |

## memory_storage

Create in-memory storage with no-op codec and in-memory publisher.

```python
kv.memory_storage()
```

Path `nustd.kv.memory_storage`. Defined on `nustd.kv.presets`, bound as a function. Builds `Generator[StorageProtocol, None, None]`.

No persistence, no serialization: Python objects stored as-is.
Useful for testing, prototyping, and ephemeral service handles.

**Yields**

Configured in-memory storage instance

Undocumented: example.

## rocksdb_storage_redis

Create RocksDB storage with binary codec and Redis publisher.

```python
kv.rocksdb_storage_redis(path, read_only=False, secondary_path=None, secondary_refresh_interval=0.01, redis_url='redis://localhost:6379', channel_prefix='__every__')
```

Path `nustd.kv.rocksdb_storage_redis`. Defined on `nustd.kv.presets`, bound as a function. Builds `Generator[StorageProtocol, None, None]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str` |  | Path to RocksDB database directory |
| `read_only` | `bool` | `False` | Permissions |
| `secondary_path` | `str \| None` | `None` | Open as secondary rocksdb storage |
| `secondary_refresh_interval` | `float \| None` | `0.01` | Interval in seconds for background try_catch_up_with_primary on secondary DBs. None disables. |
| `redis_url` | `str` | `'redis://localhost:6379'` | Redis service url |
| `channel_prefix` | `str` | `'__every__'` | Redis channel prefix |

**Yields**

Configured RocksDB storage instance

Undocumented: example.

## rocksdb_storage

Create RocksDB storage with binary codec and in-memory publisher.

```python
kv.rocksdb_storage(path, read_only=False, secondary_path=None, secondary_refresh_interval=0.01)
```

Path `nustd.kv.rocksdb_storage`. Defined on `nustd.kv.presets`, bound as a function. Builds `Generator[StorageProtocol, None, None]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str` |  | Path to RocksDB database directory |
| `read_only` | `bool` | `False` | Open database in read-only mode |
| `secondary_path` | `str \| None` | `None` | Path to secondary RocksDB instance |
| `secondary_refresh_interval` | `float \| None` | `0.01` | Interval in seconds for background try_catch_up_with_primary on secondary DBs. None disables. |

**Yields**

Configured RocksDB storage instance

Undocumented: example.

## text_storage

Create text storage with text codec and in-memory publisher.

```python
kv.text_storage(path)
```

Path `nustd.kv.text_storage`. Defined on `nustd.kv.presets`, bound as a function. Builds `Generator[StorageProtocol, None, None]`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str` |  | Path for text storage directory |

**Yields**

Configured text storage instance

Undocumented: example.

## inmem_observer

Binds the listening half of the in-process notification pair, alone.

```python
kv.inmem_observer(tags=())
```

Path `nustd.kv.inmem_observer`. Defined on `nustd.kv.presets`, bound as a function. Builds `With`.

Transport and Observer with no Publisher and no Storage, for a program
that reacts to changes but owns none of them. Only useful when the
publisher it listens to lives in the same process, which is rare: two
programs sharing a process usually share a navigator preset instead, and
that already binds an Observer. The cross-process case is
`redis_observer`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `tags` | `Sequence[object]` | `()` | shape tags folded onto both bindings, so a sharded program reaches this observer under the same tag as its storage. |

**Notes**

- Binds nothing that can read or write data. A Ref evaluated under this bracket alone has no Navigator to resolve against.
- Bind it once at process scope, not per request.

**Example**

```python
app = nu.With(nustd.kv.inmem_observer(), body=reactor)
```

## lmdb_navigator

Stands up a persistent LMDB stack with in-process change notification.

```python
kv.lmdb_navigator(path, tags=(), read_only=False, map_size=10737418240, max_readers=126, subdir=True, sync=True)
```

Path `nustd.kv.lmdb_navigator`. Defined on `nustd.kv.presets`, bound as a function. Builds `With`.

LMDB is a memory-mapped B-tree: reads are cheap and lock-free, and many
readers can share an environment with a writer without blocking it. What
it asks in return is that you size the map up front, since `map_size` is
a ceiling the database cannot grow past at run time.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str` |  | the environment. A directory when `subdir` is true, the env file itself when it is not. |
| `tags` | `Sequence[object]` | `()` | shape tags folded onto every binding this makes, so a sharded program can name this stack. |
| `read_only` | `bool` | `False` | open the environment read-only. |
| `map_size` | `int` | `10737418240` | the ceiling on the database, in bytes. Reserved as address space rather than allocated, so a generous value costs little. Defaults to 10 GiB. |
| `max_readers` | `int` | `126` | how many reader slots the environment holds. A reader past the ceiling fails rather than waits. |
| `subdir` | `bool` | `True` | whether `path` names a directory or the env file. |
| `sync` | `bool` | `True` | fsync after each commit. Turning it off is faster and puts recent commits at risk in a crash. |

**Notes**

- Binds the full stack: Codec, Transport, Publisher, Observer, Storage and Navigator, in that order, tearing down LIFO.
- Values go through pickle, so anything stored has to be picklable.
- Exceeding `map_size` is a hard failure on write, not a resize.

**Example**

```python
app = nu.With(nustd.kv.lmdb_navigator(".dblmdb"), body=program)
```

## lmdb_navigator_redis

Stands up a persistent LMDB stack whose changes reach other processes.

```python
kv.lmdb_navigator_redis(path, tags=(), read_only=False, map_size=10737418240, max_readers=126, subdir=True, sync=True, redis_url='redis://localhost:6379', channel_prefix='nu')
```

Path `nustd.kv.lmdb_navigator_redis`. Defined on `nustd.kv.presets`, bound as a function. Builds `With`.

Same storage as `lmdb_navigator`; the in-process Publisher and Observer
are replaced by Redis ones, so a write here wakes a reactive program in
another process.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str` |  | the environment. A directory when `subdir` is true, the env file itself when it is not. |
| `tags` | `Sequence[object]` | `()` | shape tags folded onto every binding this makes, so a sharded program can name this stack. |
| `read_only` | `bool` | `False` | open the environment read-only. |
| `map_size` | `int` | `10737418240` | the ceiling on the database, in bytes. Defaults to 10 GiB. |
| `max_readers` | `int` | `126` | how many reader slots the environment holds. |
| `subdir` | `bool` | `True` | whether `path` names a directory or the env file. |
| `sync` | `bool` | `True` | fsync after each commit. |
| `redis_url` | `str` | `'redis://localhost:6379'` | where the Redis carrying the notifications lives. |
| `channel_prefix` | `str` | `'nu'` | namespaces the pub/sub channels, so two unrelated deployments can share one Redis without hearing each other. |

**Notes**

- Binds Codec, Publisher, Observer, Storage and Navigator. No Transport: the Redis pair does not need one.
- Redis has to be reachable when the bracket sets up.
- Defaults to the `"nu"` channel prefix, where the RocksDB Redis preset defaults to `"__every__"`. Two stacks meant to hear each other must be given the same one explicitly.

**Example**

```python
app = nu.With(
    nustd.kv.lmdb_navigator_redis(".dblmdb", redis_url="redis://cache:6379"),
    body=program,
)
```

## memory_navigator

Stands up a whole in-memory storage stack, gone when the process ends.

```python
kv.memory_navigator(tags=())
```

Path `nustd.kv.memory_navigator`. Defined on `nustd.kv.presets`, bound as a function. Builds `With`.

Nothing is serialized and nothing is written: the codec is a no-op, so
Python objects are held as themselves. That makes it the fastest backend
and the only one where a stored value is identical, not merely equal, to
what went in. Reach for it in tests, examples, and anywhere the state is
meant to die with the process.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `tags` | `Sequence[object]` | `()` | shape tags folded onto every binding this makes, so a sharded program can name this stack. Empty binds it as the default that untagged Refs resolve to. |

**Notes**

- Binds the full stack: Codec, Transport, Publisher, Observer, Storage and Navigator, in that order, tearing down LIFO.
- Change notification works, but only within the process.
- Values are not copied on the way in or out, so mutating a stored object mutates what a later read returns.

**Example**

```python
app = nu.With(nustd.kv.memory_navigator(), body=program)
```

## proxy_observer

Binds another process's change feed, over the socket it serves it on.

```python
kv.proxy_observer(address, body=None, tag=None, transport='tcp', timeout=5.0, max_retries=3)
```

Path `nustd.kv.proxy_observer`. Defined on `nustd.kv.presets`, bound as a function. Builds `Nu`.

What a worker puts beside its proxied Navigator so it hears the writes
every other process makes, instead of only its own. Subscribing and
binding travel out as ordinary calls; the callback goes the other way as a
reverse proxy, which is what `bg_serve` is for.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `address` | `str` |  | where the far side's `served_observer` is listening. |
| `body` | `Nu \| None` | `None` | what runs while the connection is open. |
| `tag` | `object` | `None` | the tag to bind the observer under here, if the program shards. |
| `transport` | `str` | `'tcp'` | `"tcp"` or `"unix"`. Must match the serving side's. |
| `timeout` | `float` | `5.0` | seconds a call waits on the far side. |
| `max_retries` | `int` | `3` | connect attempts before giving up, with a growing pause between them. |

**Notes**

- Async only, like every `InvisiblesProxy`. Use `nu.arun`.
- Process scope. Bind it once at the head of a worker, not per subscription.
- A subscription outlives nothing: when this process dies the far side drops its receiver on the next key rather than keeping a corpse around to fail on every write after.

**Example**

```python
init = nu.With(
    nustd.proxy.InvisiblesProxy(Navigator, address=nav_address),
    nustd.kv.proxy_observer(obs_address),
)
```

## redis_observer

Binds a Redis subscriber alone, for a program that only reacts.

```python
kv.redis_observer(redis_url='redis://localhost:6379', channel_prefix='nu', tags=())
```

Path `nustd.kv.redis_observer`. Defined on `nustd.kv.presets`, bound as a function. Builds `With`.

The listening half of a Redis-published stack, with no Publisher and no
Storage of its own. This is what a reader process binds when the writes
happen elsewhere: a dashboard repainting on someone else's counter, a
handler firing on someone else's insert.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `redis_url` | `str` | `'redis://localhost:6379'` | where the Redis carrying the notifications lives. |
| `channel_prefix` | `str` | `'nu'` | must match the publishing side's, or nothing arrives. Note the RocksDB Redis preset defaults to `"__every__"` rather than this one's `"nu"`. |
| `tags` | `Sequence[object]` | `()` | shape tags folded onto the binding, so a sharded program reaches this observer under the same tag as its storage. |

**Notes**

- Binds nothing that can read or write data. Pair it with a storage preset if the reactor also needs to read what changed.
- Redis has to be reachable when the bracket sets up.
- Bind it once at process scope, not per request.

**Example**

```python
app = nu.With(
    nustd.kv.redis_observer(redis_url="redis://cache:6379"),
    body=reactor,
)
```

## rocksdb_navigator_redis

Stands up a persistent RocksDB stack whose changes reach other processes.

```python
kv.rocksdb_navigator_redis(path, tags=(), read_only=False, secondary_path=None, secondary_refresh_interval=0.01, disable_wal=False, options=None, redis_url='redis://localhost:6379', channel_prefix='__every__')
```

Path `nustd.kv.rocksdb_navigator_redis`. Defined on `nustd.kv.presets`, bound as a function. Builds `With`.

Same storage as `rocksdb_navigator`; what differs is who hears about a
write. The in-process Publisher and Observer are replaced by Redis ones,
so a change made here wakes a reactive program running somewhere else.
That is the shape for a writer process plus a fleet of readers reacting
to it.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str` |  | the database directory. Created if it is not there. |
| `tags` | `Sequence[object]` | `()` | shape tags folded onto every binding this makes, so a sharded program can name this stack. |
| `read_only` | `bool` | `False` | open without taking the write lock. Writes will fail. |
| `secondary_path` | `str \| None` | `None` | open as a secondary instance, tailing the primary at `path` and keeping its own state under this directory. |
| `secondary_refresh_interval` | `float \| None` | `0.01` | the shortest gap, in seconds, between catch-ups with the primary. Catch-up runs lazily when a snapshot opens and the last one is older than this. 0 catches up on every snapshot; None never does, leaving freshness to the caller. |
| `disable_wal` | `bool` | `False` | skip the write-ahead log. Faster, and a crash loses whatever had not been flushed. |
| `options` | `dict \| None` | `None` | raw RocksDB options, merged over the defaults. |
| `redis_url` | `str` | `'redis://localhost:6379'` | where the Redis carrying the notifications lives. |
| `channel_prefix` | `str` | `'__every__'` | namespaces the pub/sub channels, so two unrelated deployments can share one Redis without hearing each other. |

**Notes**

- Binds Codec, Publisher, Observer, Storage and Navigator. No Transport: the Redis pair does not need one.
- Redis has to be reachable when the bracket sets up, and a program bound to it fails at setup rather than at the first write.
- Notifications only. The data still lives in RocksDB, so Redis going down costs change delivery, not storage.
- Every writer and every listener must agree on `channel_prefix` or the notifications go nowhere visible.

**Example**

```python
app = nu.With(
    nustd.kv.rocksdb_navigator_redis(".db", redis_url="redis://cache:6379"),
    body=program,
)
```

## rocksdb_navigator

Stands up a persistent RocksDB stack with in-process change notification.

```python
kv.rocksdb_navigator(path, tags=(), read_only=False, secondary_path=None, secondary_refresh_interval=0.01, disable_wal=False, options=None)
```

Path `nustd.kv.rocksdb_navigator`. Defined on `nustd.kv.presets`, bound as a function. Builds `With`.

The default choice for anything that has to survive a restart. Values are
pickled through the binary codec, writes are transactional, and the whole
thing needs nothing running beside it. Change notifications reach only
listeners in this process; for cross-process, see
`rocksdb_navigator_redis`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str` |  | the database directory. Created if it is not there. |
| `tags` | `Sequence[object]` | `()` | shape tags folded onto every binding this makes, so a sharded program can name this stack. |
| `read_only` | `bool` | `False` | open without taking the write lock, so several processes can read the same database at once. Writes will fail. |
| `secondary_path` | `str \| None` | `None` | open as a secondary instance, tailing the primary at `path` and keeping its own state under this directory. Reads are live-ish, writes are not possible. |
| `secondary_refresh_interval` | `float \| None` | `0.01` | the shortest gap, in seconds, between catch-ups with the primary. Catch-up runs lazily when a snapshot opens and the last one is older than this. 0 catches up on every snapshot; None never does, leaving freshness to the caller. |
| `disable_wal` | `bool` | `False` | skip the write-ahead log. Faster, and a crash loses whatever had not been flushed. |
| `options` | `dict \| None` | `None` | raw RocksDB options, merged over the defaults. |

**Notes**

- Binds the full stack: Codec, Transport, Publisher, Observer, Storage and Navigator, in that order, tearing down LIFO.
- Only one process at a time may hold the database for writing. Fan reads out with `read_only` or `secondary_path`.
- Values go through pickle, so anything stored has to be picklable and a class rename can strand old data.

**Example**

```python
app = nu.With(nustd.kv.rocksdb_navigator(".dbcounter"), body=program)
```

## served_observer

Puts this process's change feed on a socket, for other processes to hear.

```python
kv.served_observer(address, target_tag=None, transport='tcp', executor='threaded')
```

Path `nustd.kv.served_observer`. Defined on `nustd.kv.presets`, bound as a function. Builds `With`.

The other half of `proxy_observer`, and the piece that lets a worker
holding nothing but a proxied Navigator react to a write it did not make.
A proxy carries calls, not notifications, so without this the only way to
tell a worker something changed is to kill it and start another one.

Bind it beside the served Navigator, in the process that owns the storage.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `address` | `str` |  | `host:port` to listen on. |
| `target_tag` | `object` | `None` | the tag the observer is bound under, if any. A tagless lookup never reaches a tagged binding. |
| `transport` | `str` | `'tcp'` | `"tcp"` or `"unix"`. Must match the subscriber's. |
| `executor` | `str` | `'threaded'` | how connections are served. `"threaded"` is the one that fits, because every subscriber holds its connection open for as long as it is listening. |

**Notes**

- Process scope. One of these serves every subscriber that ever connects, so it belongs at the head, not in anything per request.
- Serves a `HostedObserver` rather than the backend itself, which is what keeps a subscriber's death from leaving a receiver behind.
- The storage side is unchanged: this adds ears, it does not move where writes happen.

**Example**

```python
app = nu.With(
    nustd.kv.rocksdb_navigator(".db"),
    nustd.kv.served_observer("127.0.0.1:19001"),
    body=program,
)
```

## text_navigator

Stands up a JSON-on-disk stack you can open in an editor and read.

```python
kv.text_navigator(path, tags=(), read_only=False, log_operations=False)
```

Path `nustd.kv.text_navigator`. Defined on `nustd.kv.presets`, bound as a function. Builds `With`.

The debugging backend. State lands in one human-readable `state.json`,
so the whole tree a program built can be inspected with nothing but a text
editor, which is worth a great deal when a shape is not laying out the way
it was meant to.

It is a toy and says so: the entire state is held in memory and rewritten
to disk on every commit, commits are fully serialized, there is no conflict
detection so the last writer wins, and one process owns it at a time. Fine
for a few hundred keys while working something out; wrong for anything
real.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str` |  | the directory holding `state.json`, and the operation log when it is on. |
| `tags` | `Sequence[object]` | `()` | shape tags folded onto every binding this makes, so a sharded program can name this stack. |
| `read_only` | `bool` | `False` | open without allowing writes. |
| `log_operations` | `bool` | `False` | append every put, delete, commit and abort to `operations.jsonl` beside the state, as a trace to read back. |

**Notes**

- Binds the full stack: Codec, Transport, Publisher, Observer, Storage and Navigator, in that order, tearing down LIFO.
- Values go through JSON, so only JSON-able values round-trip, and they come back as JSON's types rather than the ones written.
- No conflict detection means a Transaction here never raises the conflict that `RetryOnConflict` is built for. It silently overwrites instead.

**Example**

```python
app = nu.With(nustd.kv.text_navigator(".dbtext"), body=program)
```

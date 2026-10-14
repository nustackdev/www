---
title: kv
description: "nustd.kv: virtuals (polymorphic views) KV-storage fabric for Nu Shapes."
---

Module `nustd.kv`.

nustd.kv: virtuals (polymorphic views) KV-storage fabric for Nu Shapes.

Refs over virtuals views backed by a tkv snapshot / transaction.

Usage:

```python
from nustd.kv import IntRef, StrRef, ShapeRef, Atomic
from nu import Context
from nu.domains.shape import Shape

class User(Shape):
    name = StrRef.slot()
    age = IntRef.slot()
```

**Modules**

| Module | What |
| --- | --- |
| [`nustd.kv.fabrics`](/docs/nustd/reference/kv/fabrics) | nustd.kv.fabrics - `FabricLifecycle` classes for the virtuals stack. |

## interactions.item

Module `nustd.kv.interactions.item`.

Leaf-level KV atoms: read, write and delete one primitive at one address.

[Full entries](/docs/nustd/reference/kv/interactions-item)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [InitItemCmd](/docs/nustd/reference/kv/interactions-item#inititemcmd) | `scalar_command` | `InitItemCmd(ref)` | Walks a container Ref's path and drops the view it lands on. |
| [ItemPrimitiveGetUnsafe](/docs/nustd/reference/kv/interactions-item#itemprimitivegetunsafe) | `scalar_query` | `ItemPrimitiveGetUnsafe(ref)` | Reads one primitive off a Ref's parent view in a single storage get. |
| [ItemPrimitiveSetUnsafeCmd](/docs/nustd/reference/kv/interactions-item#itemprimitivesetunsafecmd) | `scalar_command` | `ItemPrimitiveSetUnsafeCmd(ref, value)` | Writes one primitive, creating the parent chain first if it is missing. |
| [ItemPrimitiveSetUnsafeParentSkipCmd](/docs/nustd/reference/kv/interactions-item#itemprimitivesetunsafeparentskipcmd) | `scalar_command` | `ItemPrimitiveSetUnsafeParentSkipCmd(ref, value)` | Writes one primitive as a bare put, assuming the parent chain exists. |
| [ItemPrimitiveDeleteUnsafeCmd](/docs/nustd/reference/kv/interactions-item#itemprimitivedeleteunsafecmd) | `scalar_command` | `ItemPrimitiveDeleteUnsafeCmd(ref)` | Deletes one primitive as a bare storage delete. |
| [ItemPrimitiveSetCmd](/docs/nustd/reference/kv/interactions-item#itemprimitivesetcmd) | `scalar_command` | `ItemPrimitiveSetCmd(ref, value)` | Stores a whole value as one opaque blob under a Ref, container or not. |

## interactions.collections

Module `nustd.kv.interactions.collections`.

Container-level KV atoms: sweep every direct primitive child at once.

[Full entries](/docs/nustd/reference/kv/interactions-collections)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ClearPrimitivesUnsafeCmd](/docs/nustd/reference/kv/interactions-collections#clearprimitivesunsafecmd) | `scalar_command` | `ClearPrimitivesUnsafeCmd(ref)` | Deletes every direct primitive child of a container, keeping the container. |
| [ScanPrimitivesUnsafe](/docs/nustd/reference/kv/interactions-collections#scanprimitivesunsafe) | `scalar_query` | `ScanPrimitivesUnsafe(ref)` | Reads every direct primitive value under a container in one raw scan. |

## interactions.kh57

Module `nustd.kv.interactions.kh57`.

kh57 atoms: read a sub-range of an int-keyed series, sampled or whole.

[Full entries](/docs/nustd/reference/kv/interactions-kh57)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Kh57Sample](/docs/nustd/reference/kv/interactions-kh57#kh57sample) | `scalar_query` | `Kh57Sample(ref, n, begin=None, end=None, rng=None)` | Draws a uniform sample of a kh57 series' sub-range, in bounded time. |
| [Kh57Range](/docs/nustd/reference/kv/interactions-kh57#kh57range) | `scalar_query` | `Kh57Range(ref, begin, end)` | Reads a kh57 series' sub-range whole, in ascending key order. |

## interactions.atomicity

Module `nustd.kv.interactions.atomicity`.

Atomic boundaries over KV storage, and the retry that makes them survivable.

[Full entries](/docs/nustd/reference/kv/interactions-atomicity)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Snapshot](/docs/nustd/reference/kv/interactions-atomicity#snapshot) | `bracket` | `Snapshot(scope=None)` | Gives its body one consistent read view of storage, and closes it after. |
| [Transaction](/docs/nustd/reference/kv/interactions-atomicity#transaction) | `bracket` | `Transaction(scope=None)` | Runs its body inside a write transaction: all of it lands, or none of it. |
| [RetryOnConflict](/docs/nustd/reference/kv/interactions-atomicity#retryonconflict) | `policy` | `RetryOnConflict(body, max_attempts=5, delay=0.1, backoff=2.0, jitter=0.5, errors=None, on_attempt_fail=None, on_success=None, on_fail=None)` | Re-runs its body when a storage transaction loses a race, and only then. |
| [Atomic](/docs/nustd/reference/kv/interactions-atomicity#atomic) |  | `kv.Atomic(scope=None)` | Brackets a body with whichever boundary its own writes call for. |

## refs.items

Module `nustd.kv.refs.items`.

kv leaves: one value at one address, read and written whole.

[Full entries](/docs/nustd/reference/kv/refs-items)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [BoolRef](/docs/nustd/reference/kv/refs-items#boolref) | `ref` | `BoolRef(address, parent_ref=None, owner_shape=None)` | A bool leaf in KV storage, carrying the whole Bool logical surface. |
| [BytesRef](/docs/nustd/reference/kv/refs-items#bytesref) | `ref` | `BytesRef(address, parent_ref=None, owner_shape=None)` | A bytes leaf in KV storage, carrying the whole Bytes operator surface. |
| [FloatRef](/docs/nustd/reference/kv/refs-items#floatref) | `ref` | `FloatRef(address, parent_ref=None, owner_shape=None)` | A float leaf in KV storage, carrying the whole Float operator surface. |
| [IntRef](/docs/nustd/reference/kv/refs-items#intref) | `ref` | `IntRef(address, parent_ref=None, owner_shape=None)` | An int leaf in KV storage, carrying the whole Int operator surface. |
| [ObjectRef](/docs/nustd/reference/kv/refs-items#objectref) | `ref` | `ObjectRef(address, parent_ref=None, owner_shape=None)` | A leaf in KV storage holding a value of no declared type. |
| [StrRef](/docs/nustd/reference/kv/refs-items#strref) | `ref` | `StrRef(address, parent_ref=None, owner_shape=None)` | A str leaf in KV storage, carrying the whole Str operator surface. |

## refs.containers

Module `nustd.kv.refs.containers`.

kv containers: collections whose elements each get an address of their own.

[Full entries](/docs/nustd/reference/kv/refs-containers)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [DictRef](/docs/nustd/reference/kv/refs-containers#dictref) | `ref` | `DictRef(address, view_type=None, parent_ref=None, owner_shape=None)` | A mapping slot in KV storage, decomposed into a child per key. |
| [ListRef](/docs/nustd/reference/kv/refs-containers#listref) | `ref` | `ListRef(address, view_type=None, parent_ref=None, owner_shape=None)` | An ordered list slot in KV storage, decomposed into per-index children. |
| [SetRef](/docs/nustd/reference/kv/refs-containers#setref) | `ref` | `SetRef(address, view_type=None, parent_ref=None, owner_shape=None)` | A set slot in KV storage: unordered, unique elements, stored decomposed. |
| [ShapeRef](/docs/nustd/reference/kv/refs-containers#shaperef) | `ref` | `ShapeRef(address, shape_type, parent_ref=None, owner_shape=None)` | A nested shape slot in KV storage: a fixed set of named fields. |

## refs.kh57

Module `nustd.kv.refs.kh57`.

kv sampled map: an int-keyed mapping laid out so a key range samples cheaply.

[Full entries](/docs/nustd/reference/kv/refs-kh57)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Kh57Ref](/docs/nustd/reference/kv/refs-kh57#kh57ref) | `ref` | `Kh57Ref(address, view_type=None, parent_ref=None, owner_shape=None)` | A sparse int-keyed mapping in KV storage, laid out for range sampling. |

## refs.primitives

Module `nustd.kv.refs.primitives`.

kv blob containers: a whole collection held as one leaf value.

[Full entries](/docs/nustd/reference/kv/refs-primitives)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [PrimitiveDictRef](/docs/nustd/reference/kv/refs-primitives#primitivedictref) | `ref` | `PrimitiveDictRef(address, parent_ref=None, owner_shape=None)` | A dict leaf in KV storage, written and read back whole as one blob. |
| [PrimitiveFrozenSetRef](/docs/nustd/reference/kv/refs-primitives#primitivefrozensetref) | `ref` | `PrimitiveFrozenSetRef(address, parent_ref=None, owner_shape=None)` | A frozenset leaf in KV storage, written and read back whole as one blob. |
| [PrimitiveListRef](/docs/nustd/reference/kv/refs-primitives#primitivelistref) | `ref` | `PrimitiveListRef(address, parent_ref=None, owner_shape=None)` | A list leaf in KV storage, written and read back whole as one blob. |
| [PrimitiveSetRef](/docs/nustd/reference/kv/refs-primitives#primitivesetref) | `ref` | `PrimitiveSetRef(address, parent_ref=None, owner_shape=None)` | A set leaf in KV storage, written and read back whole as one blob. |
| [PrimitiveTupleRef](/docs/nustd/reference/kv/refs-primitives#primitivetupleref) | `ref` | `PrimitiveTupleRef(address, parent_ref=None, owner_shape=None)` | A tuple leaf in KV storage, written and read back whole as one blob. |

## refs.prog

Module `nustd.kv.refs.prog`.

kv program leaf: Nu source stored in a slot, runnable from it.

[Full entries](/docs/nustd/reference/kv/refs-prog)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ProgramRef](/docs/nustd/reference/kv/refs-prog#programref) | `ref` | `ProgramRef(address, parent_ref=None, owner_shape=None)` | A Nu program stored as source text in a KV leaf, with the Program verbs. |

## tree.auto_flow_atomic

Module `nustd.kv.tree.auto_flow_atomic`.

The pass that decides, per branch, where a storage boundary belongs.

[Full entries](/docs/nustd/reference/kv/tree-auto-flow-atomic)

| Name | Call | Meaning |
| --- | --- | --- |
| [auto_flow_atomic](/docs/nustd/reference/kv/tree-auto-flow-atomic#auto_flow_atomic) | `kv.auto_flow_atomic(tree, scope=None)` | Rewrites a tree so every branch touching storage sits in the right bracket. |

## presets

Module `nustd.kv.presets`.

One call that stands up a whole storage stack, in either of two forms.

[Full entries](/docs/nustd/reference/kv/presets)

| Name | Call | Meaning |
| --- | --- | --- |
| [memory_storage](/docs/nustd/reference/kv/presets#memory_storage) | `kv.memory_storage()` | Create in-memory storage with no-op codec and in-memory publisher. |
| [rocksdb_storage_redis](/docs/nustd/reference/kv/presets#rocksdb_storage_redis) | `kv.rocksdb_storage_redis(path, read_only=False, secondary_path=None, secondary_refresh_interval=0.01, redis_url='redis://localhost:6379', channel_prefix='__every__')` | Create RocksDB storage with binary codec and Redis publisher. |
| [rocksdb_storage](/docs/nustd/reference/kv/presets#rocksdb_storage) | `kv.rocksdb_storage(path, read_only=False, secondary_path=None, secondary_refresh_interval=0.01)` | Create RocksDB storage with binary codec and in-memory publisher. |
| [text_storage](/docs/nustd/reference/kv/presets#text_storage) | `kv.text_storage(path)` | Create text storage with text codec and in-memory publisher. |
| [inmem_observer](/docs/nustd/reference/kv/presets#inmem_observer) | `kv.inmem_observer(tags=())` | Binds the listening half of the in-process notification pair, alone. |
| [lmdb_navigator](/docs/nustd/reference/kv/presets#lmdb_navigator) | `kv.lmdb_navigator(path, tags=(), read_only=False, map_size=10737418240, max_readers=126, subdir=True, sync=True)` | Stands up a persistent LMDB stack with in-process change notification. |
| [lmdb_navigator_redis](/docs/nustd/reference/kv/presets#lmdb_navigator_redis) | `kv.lmdb_navigator_redis(path, tags=(), read_only=False, map_size=10737418240, max_readers=126, subdir=True, sync=True, redis_url='redis://localhost:6379', channel_prefix='nu')` | Stands up a persistent LMDB stack whose changes reach other processes. |
| [memory_navigator](/docs/nustd/reference/kv/presets#memory_navigator) | `kv.memory_navigator(tags=())` | Stands up a whole in-memory storage stack, gone when the process ends. |
| [proxy_observer](/docs/nustd/reference/kv/presets#proxy_observer) | `kv.proxy_observer(address, body=None, tag=None, transport='tcp', timeout=5.0, max_retries=3)` | Binds another process's change feed, over the socket it serves it on. |
| [redis_observer](/docs/nustd/reference/kv/presets#redis_observer) | `kv.redis_observer(redis_url='redis://localhost:6379', channel_prefix='nu', tags=())` | Binds a Redis subscriber alone, for a program that only reacts. |
| [rocksdb_navigator_redis](/docs/nustd/reference/kv/presets#rocksdb_navigator_redis) | `kv.rocksdb_navigator_redis(path, tags=(), read_only=False, secondary_path=None, secondary_refresh_interval=0.01, disable_wal=False, options=None, redis_url='redis://localhost:6379', channel_prefix='__every__')` | Stands up a persistent RocksDB stack whose changes reach other processes. |
| [rocksdb_navigator](/docs/nustd/reference/kv/presets#rocksdb_navigator) | `kv.rocksdb_navigator(path, tags=(), read_only=False, secondary_path=None, secondary_refresh_interval=0.01, disable_wal=False, options=None)` | Stands up a persistent RocksDB stack with in-process change notification. |
| [served_observer](/docs/nustd/reference/kv/presets#served_observer) | `kv.served_observer(address, target_tag=None, transport='tcp', executor='threaded')` | Puts this process's change feed on a socket, for other processes to hear. |
| [sqlite_navigator](/docs/nustd/reference/kv/presets#sqlite_navigator) | `kv.sqlite_navigator(path, tags=(), read_only=False, synchronous='NORMAL', busy_timeout=60.0, mmap_size=None, cache_size=None, pragmas=None)` | Stands up a persistent SQLite stack with in-process change notification. |
| [sqlite_navigator_redis](/docs/nustd/reference/kv/presets#sqlite_navigator_redis) | `kv.sqlite_navigator_redis(path, tags=(), read_only=False, synchronous='NORMAL', busy_timeout=60.0, mmap_size=None, cache_size=None, pragmas=None, redis_url='redis://localhost:6379', channel_prefix='nu')` | Stands up a persistent SQLite stack whose changes reach other processes. |
| [text_navigator](/docs/nustd/reference/kv/presets#text_navigator) | `kv.text_navigator(path, tags=(), read_only=False, log_operations=False)` | Stands up a JSON-on-disk stack you can open in an editor and read. |

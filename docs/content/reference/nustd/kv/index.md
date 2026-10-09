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
| [`nustd.kv.fabrics`](/docs/reference/nustd/kv/fabrics) | nustd.kv.fabrics - `FabricLifecycle` classes for the virtuals stack. |

## interactions.item

Module `nustd.kv.interactions.item`.

Leaf-level KV atoms: read, write and delete one primitive at one address.

[Full entries](/docs/reference/nustd/kv/interactions-item)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [InitItemCmd](/docs/reference/nustd/kv/interactions-item#inititemcmd) | `scalar_command` | `InitItemCmd(ref)` | Walks a container Ref's path and drops the view it lands on. |
| [ItemPrimitiveGetUnsafe](/docs/reference/nustd/kv/interactions-item#itemprimitivegetunsafe) | `scalar_query` | `ItemPrimitiveGetUnsafe(ref)` | Reads one primitive off a Ref's parent view in a single storage get. |
| [ItemPrimitiveSetUnsafeCmd](/docs/reference/nustd/kv/interactions-item#itemprimitivesetunsafecmd) | `scalar_command` | `ItemPrimitiveSetUnsafeCmd(ref, value)` | Writes one primitive, creating the parent chain first if it is missing. |
| [ItemPrimitiveSetUnsafeParentSkipCmd](/docs/reference/nustd/kv/interactions-item#itemprimitivesetunsafeparentskipcmd) | `scalar_command` | `ItemPrimitiveSetUnsafeParentSkipCmd(ref, value)` | Writes one primitive as a bare put, assuming the parent chain exists. |
| [ItemPrimitiveDeleteUnsafeCmd](/docs/reference/nustd/kv/interactions-item#itemprimitivedeleteunsafecmd) | `scalar_command` | `ItemPrimitiveDeleteUnsafeCmd(ref)` | Deletes one primitive as a bare storage delete. |
| [ItemPrimitiveSetCmd](/docs/reference/nustd/kv/interactions-item#itemprimitivesetcmd) | `scalar_command` | `ItemPrimitiveSetCmd(ref, value)` | Stores a whole value as one opaque blob under a Ref, container or not. |

## interactions.collections

Module `nustd.kv.interactions.collections`.

Container-level KV atoms: sweep every direct primitive child at once.

[Full entries](/docs/reference/nustd/kv/interactions-collections)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ClearPrimitivesUnsafeCmd](/docs/reference/nustd/kv/interactions-collections#clearprimitivesunsafecmd) | `scalar_command` | `ClearPrimitivesUnsafeCmd(ref)` | Deletes every direct primitive child of a container, keeping the container. |
| [ScanPrimitivesUnsafe](/docs/reference/nustd/kv/interactions-collections#scanprimitivesunsafe) | `scalar_query` | `ScanPrimitivesUnsafe(ref)` | Reads every direct primitive value under a container in one raw scan. |

## interactions.kh57

Module `nustd.kv.interactions.kh57`.

kh57 atoms: read a sub-range of an int-keyed series, sampled or whole.

[Full entries](/docs/reference/nustd/kv/interactions-kh57)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Kh57Sample](/docs/reference/nustd/kv/interactions-kh57#kh57sample) | `scalar_query` | `Kh57Sample(ref, n, begin=None, end=None, rng=None)` | Draws a uniform sample of a kh57 series' sub-range, in bounded time. |
| [Kh57Range](/docs/reference/nustd/kv/interactions-kh57#kh57range) | `scalar_query` | `Kh57Range(ref, begin, end)` | Reads a kh57 series' sub-range whole, in ascending key order. |

## interactions.atomicity

Module `nustd.kv.interactions.atomicity`.

Atomic boundaries over KV storage, and the retry that makes them survivable.

[Full entries](/docs/reference/nustd/kv/interactions-atomicity)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Snapshot](/docs/reference/nustd/kv/interactions-atomicity#snapshot) | `bracket` | `Snapshot(scope=None)` | Gives its body one consistent read view of storage, and closes it after. |
| [Transaction](/docs/reference/nustd/kv/interactions-atomicity#transaction) | `bracket` | `Transaction(scope=None)` | Runs its body inside a write transaction: all of it lands, or none of it. |
| [RetryOnConflict](/docs/reference/nustd/kv/interactions-atomicity#retryonconflict) | `policy` | `RetryOnConflict(body, max_attempts=5, delay=0.1, backoff=2.0, jitter=0.5, errors=None, on_attempt_fail=None, on_success=None, on_fail=None)` | Re-runs its body when a storage transaction loses a race, and only then. |
| [Atomic](/docs/reference/nustd/kv/interactions-atomicity#atomic) |  | `kv.Atomic(scope=None)` | Brackets a body with whichever boundary its own writes call for. |

## refs.items

Module `nustd.kv.refs.items`.

Virtuals item refs: typed leaf-value holders backed by virtuals storage.

[Full entries](/docs/reference/nustd/kv/refs-items)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [BoolRef](/docs/reference/nustd/kv/refs-items#boolref) | `ref` | `BoolRef(address, parent_ref=None, owner_shape=None)` | A bool leaf in KV storage, carrying the whole Bool logical surface. |
| [BytesRef](/docs/reference/nustd/kv/refs-items#bytesref) | `ref` | `BytesRef(address, parent_ref=None, owner_shape=None)` | A bytes leaf in KV storage, carrying the whole Bytes operator surface. |
| [FloatRef](/docs/reference/nustd/kv/refs-items#floatref) | `ref` | `FloatRef(address, parent_ref=None, owner_shape=None)` | A float leaf in KV storage, carrying the whole Float operator surface. |
| [IntRef](/docs/reference/nustd/kv/refs-items#intref) | `ref` | `IntRef(address, parent_ref=None, owner_shape=None)` | An int leaf in KV storage, carrying the whole Int operator surface. |
| [ItemRef](/docs/reference/nustd/kv/refs-items#itemref) | `ref` | `ItemRef(address, value_type, value_value_type, parent_ref=None, owner_shape=None)` | An untyped leaf slot in KV storage: read it, set it, erase it, watch it. |
| [StrRef](/docs/reference/nustd/kv/refs-items#strref) | `ref` | `StrRef(address, parent_ref=None, owner_shape=None)` | A str leaf in KV storage, carrying the whole Str operator surface. |

## refs.dict

Module `nustd.kv.refs.dict`.

Virtuals mapping reference: key-value container backed by a virtuals View.

[Full entries](/docs/reference/nustd/kv/refs-dict)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [DictRef](/docs/reference/nustd/kv/refs-dict#dictref) | `ref` | `DictRef(address, value_type, key_type, key_value_type, value_value_type, view_type, parent_ref=None, owner_shape=None)` | A mapping slot in KV storage, decomposed into a child per key. |

## refs.kh57

Module `nustd.kv.refs.kh57`.

Virtuals kh57 mapping reference: sparse int-keyed map with range sampling.

[Full entries](/docs/reference/nustd/kv/refs-kh57)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Kh57Ref](/docs/reference/nustd/kv/refs-kh57#kh57ref) | `ref` | `Kh57Ref(address, value_type, value_value_type, view_type=None, parent_ref=None, owner_shape=None)` | A sparse int-keyed mapping in KV storage, laid out for range sampling. |

## refs.kh57shape

Module `nustd.kv.refs.kh57shape`.

Virtuals kh57 shapes reference: sparse int-keyed map of homogeneous shapes.

[Full entries](/docs/reference/nustd/kv/refs-kh57shape)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Kh57ShapesRef](/docs/reference/nustd/kv/refs-kh57shape#kh57shapesref) | `ref` | `Kh57ShapesRef(address, shape_type, view_type=None, parent_ref=None, owner_shape=None)` | A sparse int-keyed mapping of one shape type, laid out for range sampling. |

## refs.list

Module `nustd.kv.refs.list`.

Virtuals sequence reference: ordered container backed by a virtuals View.

[Full entries](/docs/reference/nustd/kv/refs-list)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ListRef](/docs/reference/nustd/kv/refs-list#listref) | `ref` | `ListRef(address, item_type, item_value_type, view_type, parent_ref=None, owner_shape=None)` | An ordered list slot in KV storage, decomposed into per-index children. |

## refs.base

Module `nustd.kv.refs.base`.

Virtuals storage substrate refs: navigate the virtuals View hierarchy.

[Full entries](/docs/reference/nustd/kv/refs-base)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [PrimitiveRef](/docs/reference/nustd/kv/refs-base#primitiveref) | `ref` | `PrimitiveRef(address, value_type, parent_ref=None, owner_shape=None)` | A ref to one leaf value in KV storage, read by subscripting its parent. |
| [ViewRef](/docs/reference/nustd/kv/refs-base#viewref) | `ref` | `ViewRef(address, view_type=None, parent_ref=None, owner_shape=None)` | A ref to one container slot in KV storage, read as a live virtuals View. |

## refs.set

Module `nustd.kv.refs.set`.

Virtuals set reference: unordered unique-element container backed by a View.

[Full entries](/docs/reference/nustd/kv/refs-set)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [SetRef](/docs/reference/nustd/kv/refs-set#setref) | `ref` | `SetRef(address, item_type, view_type, parent_ref=None, owner_shape=None)` | A set slot in KV storage: unordered, unique elements, stored decomposed. |

## refs.shape

Module `nustd.kv.refs.shape`.

Virtuals shape reference: structured container backed by a virtuals View.

[Full entries](/docs/reference/nustd/kv/refs-shape)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ShapeRef](/docs/reference/nustd/kv/refs-shape#shaperef) | `ref` | `ShapeRef(address, shape_type, view_type=None, parent_ref=None, owner_shape=None)` | A nested shape slot in KV storage: a fixed set of named fields. |

## refs.dictshape

Module `nustd.kv.refs.dictshape`.

Virtuals shapes dict reference: mapping of homogeneous shapes.

[Full entries](/docs/reference/nustd/kv/refs-dictshape)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ShapesDictRef](/docs/reference/nustd/kv/refs-dictshape#shapesdictref) | `ref` | `ShapesDictRef(address, shape_type, key_type, key_value_type, view_type=None, parent_ref=None, owner_shape=None)` | A mapping of one shape type in KV storage, keyed and descended into. |

## refs.listshape

Module `nustd.kv.refs.listshape`.

Virtuals shapes list reference: sequence of homogeneous shapes.

[Full entries](/docs/reference/nustd/kv/refs-listshape)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ShapesListRef](/docs/reference/nustd/kv/refs-listshape#shapeslistref) | `ref` | `ShapesListRef(address, shape_type, view_type=None, parent_ref=None, owner_shape=None)` | An ordered list of one shape type in KV storage, indexed into by position. |

## refs.std

Module `nustd.kv.refs.std`.

virtuals-substrate refs for standard-library value types.

[Full entries](/docs/reference/nustd/kv/refs-std)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [BasisPointRef](/docs/reference/nustd/kv/refs-std#basispointref) | `ref` | `BasisPointRef(address, parent_ref=None, owner_shape=None)` | A BasisPoint leaf in KV storage, stored as the raw int count of bps. |
| [ComplexRef](/docs/reference/nustd/kv/refs-std#complexref) | `ref` | `ComplexRef(address, parent_ref=None, owner_shape=None)` | A complex leaf in KV storage, stored as the str Python prints for it. |
| [DateRef](/docs/reference/nustd/kv/refs-std#dateref) | `ref` | `DateRef(address, parent_ref=None, owner_shape=None)` | A date leaf in KV storage, stored as an ISO `YYYY-MM-DD` str. |
| [DatetimeRef](/docs/reference/nustd/kv/refs-std#datetimeref) | `ref` | `DatetimeRef(address, parent_ref=None, owner_shape=None)` | A datetime leaf in KV storage, stored as an ISO str. |
| [DecimalRef](/docs/reference/nustd/kv/refs-std#decimalref) | `ref` | `DecimalRef(address, parent_ref=None, owner_shape=None)` | A Decimal leaf in KV storage, kept exact by storing its str form. |
| [FractionRef](/docs/reference/nustd/kv/refs-std#fractionref) | `ref` | `FractionRef(address, parent_ref=None, owner_shape=None)` | A Fraction leaf in KV storage, stored as its `numerator/denominator` str. |
| [PathRef](/docs/reference/nustd/kv/refs-std#pathref) | `ref` | `PathRef(address, parent_ref=None, owner_shape=None)` | A filesystem path leaf in KV storage, stored as its str form. |
| [PercentageRef](/docs/reference/nustd/kv/refs-std#percentageref) | `ref` | `PercentageRef(address, parent_ref=None, owner_shape=None)` | A Percentage leaf in KV storage, stored as the raw float percentage. |
| [TimeRef](/docs/reference/nustd/kv/refs-std#timeref) | `ref` | `TimeRef(address, parent_ref=None, owner_shape=None)` | A time-of-day leaf in KV storage, stored as an ISO `HH:MM:SS` str. |
| [TimedeltaRef](/docs/reference/nustd/kv/refs-std#timedeltaref) | `ref` | `TimedeltaRef(address, parent_ref=None, owner_shape=None)` | A timedelta leaf in KV storage, stored as a float count of seconds. |
| [TimezoneRef](/docs/reference/nustd/kv/refs-std#timezoneref) | `ref` | `TimezoneRef(address, parent_ref=None, owner_shape=None)` | A fixed-offset timezone leaf in KV storage, stored as its offset str. |
| [UUIDRef](/docs/reference/nustd/kv/refs-std#uuidref) | `ref` | `UUIDRef(address, parent_ref=None, owner_shape=None)` | A UUID leaf in KV storage, stored as its canonical hyphenated str. |

## refs.primitives

Module `nustd.kv.refs.primitives`.

virtuals-substrate refs for whole-blob compound values.

[Full entries](/docs/reference/nustd/kv/refs-primitives)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [PrimitiveDictRef](/docs/reference/nustd/kv/refs-primitives#primitivedictref) | `ref` | `PrimitiveDictRef(address, parent_ref=None, owner_shape=None)` | A dict leaf in KV storage, written and read back whole as one blob. |
| [PrimitiveFrozenSetRef](/docs/reference/nustd/kv/refs-primitives#primitivefrozensetref) | `ref` | `PrimitiveFrozenSetRef(address, parent_ref=None, owner_shape=None)` | A frozenset leaf in KV storage, written and read back whole as one blob. |
| [PrimitiveListRef](/docs/reference/nustd/kv/refs-primitives#primitivelistref) | `ref` | `PrimitiveListRef(address, parent_ref=None, owner_shape=None)` | A list leaf in KV storage, written and read back whole as one blob. |
| [PrimitiveSetRef](/docs/reference/nustd/kv/refs-primitives#primitivesetref) | `ref` | `PrimitiveSetRef(address, parent_ref=None, owner_shape=None)` | A set leaf in KV storage, written and read back whole as one blob. |
| [PrimitiveTupleRef](/docs/reference/nustd/kv/refs-primitives#primitivetupleref) | `ref` | `PrimitiveTupleRef(address, parent_ref=None, owner_shape=None)` | A tuple leaf in KV storage, written and read back whole as one blob. |

## refs.prog

Module `nustd.kv.refs.prog`.

Virtuals-substrate ref for a stored Nu program.

[Full entries](/docs/reference/nustd/kv/refs-prog)

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [ProgramRef](/docs/reference/nustd/kv/refs-prog#programref) | `ref` | `ProgramRef(address, parent_ref=None, owner_shape=None)` | A Nu program stored as source text in a KV leaf, with the Program verbs. |

## tree.auto_flow_atomic

Module `nustd.kv.tree.auto_flow_atomic`.

The pass that decides, per branch, where a storage boundary belongs.

[Full entries](/docs/reference/nustd/kv/tree-auto-flow-atomic)

| Name | Call | Meaning |
| --- | --- | --- |
| [auto_flow_atomic](/docs/reference/nustd/kv/tree-auto-flow-atomic#auto_flow_atomic) | `kv.auto_flow_atomic(tree, scope=None)` | Rewrites a tree so every branch touching storage sits in the right bracket. |

## presets

Module `nustd.kv.presets`.

One call that stands up a whole storage stack, in either of two forms.

[Full entries](/docs/reference/nustd/kv/presets)

| Name | Call | Meaning |
| --- | --- | --- |
| [memory_storage](/docs/reference/nustd/kv/presets#memory_storage) | `kv.memory_storage()` | Create in-memory storage with no-op codec and in-memory publisher. |
| [rocksdb_storage_redis](/docs/reference/nustd/kv/presets#rocksdb_storage_redis) | `kv.rocksdb_storage_redis(path, read_only=False, secondary_path=None, secondary_refresh_interval=0.01, redis_url='redis://localhost:6379', channel_prefix='__every__')` | Create RocksDB storage with binary codec and Redis publisher. |
| [rocksdb_storage](/docs/reference/nustd/kv/presets#rocksdb_storage) | `kv.rocksdb_storage(path, read_only=False, secondary_path=None, secondary_refresh_interval=0.01)` | Create RocksDB storage with binary codec and in-memory publisher. |
| [text_storage](/docs/reference/nustd/kv/presets#text_storage) | `kv.text_storage(path)` | Create text storage with text codec and in-memory publisher. |
| [inmem_observer](/docs/reference/nustd/kv/presets#inmem_observer) | `kv.inmem_observer(tags=())` | Binds the listening half of the in-process notification pair, alone. |
| [lmdb_navigator](/docs/reference/nustd/kv/presets#lmdb_navigator) | `kv.lmdb_navigator(path, tags=(), read_only=False, map_size=10737418240, max_readers=126, subdir=True, sync=True)` | Stands up a persistent LMDB stack with in-process change notification. |
| [lmdb_navigator_redis](/docs/reference/nustd/kv/presets#lmdb_navigator_redis) | `kv.lmdb_navigator_redis(path, tags=(), read_only=False, map_size=10737418240, max_readers=126, subdir=True, sync=True, redis_url='redis://localhost:6379', channel_prefix='nu')` | Stands up a persistent LMDB stack whose changes reach other processes. |
| [memory_navigator](/docs/reference/nustd/kv/presets#memory_navigator) | `kv.memory_navigator(tags=())` | Stands up a whole in-memory storage stack, gone when the process ends. |
| [proxy_observer](/docs/reference/nustd/kv/presets#proxy_observer) | `kv.proxy_observer(address, body=None, tag=None, transport='tcp', timeout=5.0, max_retries=3)` | Binds another process's change feed, over the socket it serves it on. |
| [redis_observer](/docs/reference/nustd/kv/presets#redis_observer) | `kv.redis_observer(redis_url='redis://localhost:6379', channel_prefix='nu', tags=())` | Binds a Redis subscriber alone, for a program that only reacts. |
| [rocksdb_navigator_redis](/docs/reference/nustd/kv/presets#rocksdb_navigator_redis) | `kv.rocksdb_navigator_redis(path, tags=(), read_only=False, secondary_path=None, secondary_refresh_interval=0.01, disable_wal=False, options=None, redis_url='redis://localhost:6379', channel_prefix='__every__')` | Stands up a persistent RocksDB stack whose changes reach other processes. |
| [rocksdb_navigator](/docs/reference/nustd/kv/presets#rocksdb_navigator) | `kv.rocksdb_navigator(path, tags=(), read_only=False, secondary_path=None, secondary_refresh_interval=0.01, disable_wal=False, options=None)` | Stands up a persistent RocksDB stack with in-process change notification. |
| [served_observer](/docs/reference/nustd/kv/presets#served_observer) | `kv.served_observer(address, target_tag=None, transport='tcp', executor='threaded')` | Puts this process's change feed on a socket, for other processes to hear. |
| [text_navigator](/docs/reference/nustd/kv/presets#text_navigator) | `kv.text_navigator(path, tags=(), read_only=False, log_operations=False)` | Stands up a JSON-on-disk stack you can open in an editor and read. |

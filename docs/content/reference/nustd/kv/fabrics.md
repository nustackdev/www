---
title: fabrics
description: "nustd.kv.fabrics - `FabricLifecycle` classes for the virtuals stack."
---

Module `nustd.kv.fabrics`.

nustd.kv.fabrics - `FabricLifecycle` classes for the virtuals stack.

Nu-tree provisioning for the virtuals concepts:

- `Codec` (plain Fabric, no lifecycle) - key + value serialization.
  Preset kwargs helpers: `binary_kwargs`, `noop_kwargs`, `text_kwargs`,
  `msgpack_kwargs`.
- `InMemoryTransport` - shared in-process pub/sub bus for the mem
  publisher/observer pair. Trivial lifecycle.
- `InMemoryPublisher` / `RedisPublisher` - write-side change routers.
  Attached to Storage via `publisher_type=`.
- `InMemoryObserver` / `RedisObserver` - read-side change consumers.
  Bound at process scope; `nu.core.reactive` queries look them up under
  `ObserverProtocol`.
- `HostedObserver` - not a backend. Wraps whichever one is bound so that
  subscribers in other processes can hang off it. See `hosted`.
- `InMemoryStorage` / `RocksDBStorage` / `LMDBStorage` / `TextStorage`
  - backing stores. Read `Codec` and their publisher from ctx.
- `Navigator` - top-level entry to storage. Reads Storage from ctx by
  `storage_type` (defaults to RocksDB).

Typical stack:

```python
Provide(Codec, binary_kwargs(),
    Provide(InMemoryTransport, {},
        Provide(InMemoryPublisher, {},
            Provide(InMemoryObserver, {},
                Provide(RocksDBStorage, {"path": "/data/main"},
                    Provide(Navigator, {},
                        body,   # ctx.get(Navigator) available here
                    ),
                ),
            ),
        ),
    ),
)
```

## Call

| Name | Call | Meaning |
| --- | --- | --- |
| [binary_kwargs](#binary_kwargs) | `fabrics.binary_kwargs()` | BinaryKeyCodec + PickleCodec. Binary keys, pickled values. |
| [msgpack_kwargs](#msgpack_kwargs) | `fabrics.msgpack_kwargs()` | BinaryKeyCodec + MessagePackCodec. Compact binary serialization. |
| [noop_kwargs](#noop_kwargs) | `fabrics.noop_kwargs()` | BinaryKeyCodec + PassthroughCodec. No value serialization. |
| [text_kwargs](#text_kwargs) | `fabrics.text_kwargs()` | StringKeyCodec + JSONCodec. Human-readable keys and values. |

### binary_kwargs

BinaryKeyCodec + PickleCodec. Binary keys, pickled values.

```python
fabrics.binary_kwargs()
```

Path `nustd.kv.fabrics.binary_kwargs`. Defined on `nustd.kv.fabrics.codec`, bound as a function. Builds `dict[str, type]`.

Undocumented: example.

### msgpack_kwargs

BinaryKeyCodec + MessagePackCodec. Compact binary serialization.

```python
fabrics.msgpack_kwargs()
```

Path `nustd.kv.fabrics.msgpack_kwargs`. Defined on `nustd.kv.fabrics.codec`, bound as a function. Builds `dict[str, type]`.

Undocumented: example.

### noop_kwargs

BinaryKeyCodec + PassthroughCodec. No value serialization.

```python
fabrics.noop_kwargs()
```

Path `nustd.kv.fabrics.noop_kwargs`. Defined on `nustd.kv.fabrics.codec`, bound as a function. Builds `dict[str, type]`.

Undocumented: example.

### text_kwargs

StringKeyCodec + JSONCodec. Human-readable keys and values.

```python
fabrics.text_kwargs()
```

Path `nustd.kv.fabrics.text_kwargs`. Defined on `nustd.kv.fabrics.codec`, bound as a function. Builds `dict[str, type]`.

Undocumented: example.

---
title: cluster
description: "nustd.cluster - the ray compute fabric."
---

Module `nustd.cluster`.

nustd.cluster - the ray compute fabric.

Ray reframes as a compute fabric: locations are actor processes, addresses
are tags, the interaction is `Teleport` (execute a Nu tree there).

- `RayCluster` - the cluster handle FabricLifecycle. On asetup ensures
  ray is initialized; on acleanup shuts down its own init (if any).
- `RayService` - one remote actor hosting a Nu `Context` + tree
  executor. Provisioned per-instance by `Provide` / `ProvideList` /
  `ProvideDict`.
- `RayClusterRef` / `RayServiceRef` - fabric refs. `RayServiceRef`
  takes an arbitrary hashable tag (`RayServiceRef("ledger-main")`,
  `RayServiceRef(("ledger", 0))`).
- `Teleport` - the interaction; ships the body term to a tagged
  `RayService` and awaits its result.

Typical shape:

```python
Provide(RayCluster, {"address": "auto"},
    ProvideList(RayService, [
        {"actor_name": "worker-0", "num_cpus": 4},
        {"actor_name": "worker-1", "num_cpus": 4},
    ],
        Sequential(
            Teleport(some_tree, target=0),
            Teleport(some_tree, target=1),
        ),
    ),
)
```

## interactions

Module `nustd.cluster.interactions`.

`Teleport`: ship the body to a `RayService` for remote execution.

Teleport is a Policy - it decides *where* the body runs, the same family as
Retry / Timeout, and never runs the body locally. It captures the body term
(slot 0), resolves a `RayService` from ctx by tag, and calls
`service.aexecute(body_term)` on the remote actor.

Transparent: removing Teleport doesn't change what is computed, only where it
runs. Cardinality is preserved - a stream body is collapsed to the single
remote result and yielded once.

Async-only: the body ships via ray, which requires the async runtime.

`target` is a single hashable used verbatim as the tag; omitting it (or
passing `UNSET`) resolves the untagged singleton. Everything matches the
shape `Provide` / `ProvideList` / `ProvideDict` used to bind (int
index for `ProvideList`, dict key for `ProvideDict`, no tag for a bare
`Provide`). `target=None` is a legitimate tag - the sentinel makes the
"no tag given" branch unambiguous.

Usage:

```python
# Untagged singleton
Teleport(body)

# ProvideList index
Teleport(body, target=0)

# ProvideDict tuple key (matches feed_run's ("ledger", i) shape)
Teleport(body, target=("ledger", 0))

# ProvideDict string key
Teleport(body, target="ledger-main")

# Carry parent's attrs to worker
Teleport(body, target=("indexer", 3), carry=True)
```

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Teleport](#teleport) | `policy` | `Teleport(body, target=<UNSET>, carry=False)` | Runs the body on a `RayService` actor instead of in the caller. |

### Teleport

Runs the body on a `RayService` actor instead of in the caller.

```python
Teleport(body, target=<UNSET>, carry=False)
```

Path `nustd.cluster.Teleport`. Kind `Policy`, sort `policy`, cardinality `transparent`. Arity 3 (1 required).

A policy over where, not what: the body is captured as a term and is
never evaluated locally. On each evaluation the tagged `RayService` is
read off the Context, the term is shipped to its actor, and the actor
compiles and evaluates it against its own Context before the value comes
back. Dropping a Teleport moves the work, it does not change it.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `body` | `Nu` |  | the Nu to run on the actor. Captured as a term, never run on the driver. |
| `target` | `object` | `<UNSET>` |  |
| `carry` | `bool` | `False` |  |

**Yields**

The value the body's root produced on the actor, None for an
effect-only body. When the body is a stream the collapsed remote
value is yielded as a one-item stream, and a None result yields an
empty one.

**Notes**

- `target` is the tag the `RayService` was bound under, passed verbatim to `ctx.get`: omit it for a bare `Provide`, the index for `ProvideList`, the key for `ProvideDict`. `None` is a usable tag, distinct from omitting it.
- `carry=True` copies the caller's `ctx.attrs` into a shallow copy of the actor's Context for that one execution, so loop variables bound by `Map` or `Filter` reach the body. Without it the body sees only what the actor's Context already holds.
- The body resolves its refs against the actor's Context, built on the actor by the `RayService`'s `init` bracket or `ctx_builder`. Anything bound around the Teleport in the caller's tree is not visible there.
- The body term crosses the wire through ray's serializer, so it and everything it captures must be picklable.
- Async only. The sync path raises; run with `arun`, `afirst` or `acollect`.
- The wait is an await on the actor's future, so Teleports to different services overlap under `Parallel`. Two Teleports at the same service still queue on that actor.
- A stream-rooted body evaluates to an async generator, which does not survive the actor boundary. Reduce it inside the body, with `Collect` or a fold, before teleporting.
- An exception raised on the actor surfaces here when the result is awaited.

**Example**

```python
Provide(RayCluster, {"address": "auto"},
    ProvideList(RayService, [{"num_cpus": 4}, {"num_cpus": 4}],
        Parallel(
            Teleport(shard_0, target=0),
            Teleport(shard_1, target=1),
        ),
    ),
)
```

## refs

Module `nustd.cluster.refs`.

Refs into the ray fabric: `RayClusterRef` and `RayServiceRef`.

Ray is a compute fabric: locations are actor processes, addresses are tags,
interactions are `Teleport` (execute a tree there). Both refs subclass
`FabricRef` so `ctx.get` is the resolution mechanism.

- `RayClusterRef` reads the bound `RayCluster` on the Context. Singleton;
  no tag.
- `RayServiceRef(*tag)` reads the `RayService` bound at that tag. Tags
  are arbitrary hashable positional args - a plain string for a singleton
  (`RayServiceRef("ledger-main")`), a tuple for a keyed fleet
  (`RayServiceRef(("ledger", 0))`), etc. The tag is stored in payload and
  forwarded verbatim to `ctx.get(RayService, *tag)`.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [RayClusterRef](#rayclusterref) | `ref` | `RayClusterRef(address=None)` | The `RayCluster` bound on the Context. |
| [RayServiceRef](#rayserviceref) | `ref` | `RayServiceRef(tag=<UNSET>)` | The `RayService` bound at `tag` on the Context. |

### RayClusterRef

The `RayCluster` bound on the Context.

```python
RayClusterRef(address=None)
```

Path `nustd.cluster.RayClusterRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- Singleton. A cluster handle is bound untagged, so there is no address to give.
- Reading is a lookup and nothing else. Connecting to ray, or starting it, is the `RayCluster` resource's own setup when it is provided.

**Example**

```python
Provide(RayCluster, {"address": "auto"},
    RayClusterRef().exists(),
)
```

**Methods**

#### `.fabric(address='auto', ignore_reinit_error=True)`

A handle on a ray cluster; provisions the local `ray.init` if needed.

Builds `None`.

On `setup`: if `ray.is_initialized()` is already true (someone else
already brought the cluster up), the cluster is used as-is and
`cleanup` is a no-op. Otherwise `ray.init(address, **kwargs)` runs
and `cleanup` calls `ray.shutdown()`.

Sync and async both supported: `ray.init` / `ray.shutdown` are
blocking sync calls, so `setup` / `cleanup` carry the whole body and
`asetup` / `acleanup` are thin shims over them. Either runner works.

Typical use in the tree:

```python
Provide(RayCluster, {"address": "auto"},
    ProvideList(RayService, [...], body),
)
```

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `address` | `str \| None` | `'auto'` |  |
| `ignore_reinit_error` | `bool` | `True` |  |

Undocumented: example.

**Inherited methods**

From `nu.context.fabric.refs.FabricRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `FabricExists` | A Query yielding whether this Ref's fabric type is bound on the Context. |

### RayServiceRef

The `RayService` bound at `tag` on the Context.

```python
RayServiceRef(tag=<UNSET>)
```

Path `nustd.cluster.RayServiceRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Notes**

- The tag is forwarded verbatim as a single positional to `ctx.get`, so it mirrors whatever bound the service: nothing for a bare `Provide`, the index for `ProvideList`, the key for `ProvideDict`.
- `None` is a usable tag, distinct from omitting the tag.
- Reading is a lookup and nothing else. No actor is spawned, and the actor of an already-provided service is not contacted.
- The lookup runs against whichever Context is in force where the ref sits, so inside a `Teleport` body it reads the actor's own Context rather than the driver's.

**Example**

```python
RayServiceRef()               # the untagged singleton
RayServiceRef(0)              # a ProvideList index
RayServiceRef("ledger-main")  # a ProvideDict key
RayServiceRef(("ledger", 0))  # a ProvideDict tuple key
```

**Methods**

#### `.fabric(ctx_builder=None, init=None, node=None, actor_name=None, num_cpus=None, num_gpus=None, max_restarts=0, lifetime=None)`

A remote Nu execution service backed by a `_RayServiceActor`.

Builds `None`.

On `setup` / `asetup`: spawn a ray actor (optionally pinned to a
named node with resource / CPU / GPU constraints) and initialize its
`Context` from `init` (a lifecycle bracket, typically `With(...)`)
or `ctx_builder` (a callable). `aexecute(tree, attrs=None)` routes
to the actor. On `cleanup` / `acleanup`: graceful shutdown, then
`ray.kill`.

Sync and async both supported. The sync path uses `ray.get(ref)` to
resolve actor ObjectRefs (blocking); the async path keeps `await ref`
so drivers can do other work while the actor future is in flight.
Fleets can boot in parallel via `ProvideDict(..., parallel=True)`.

`init` is a `_LifecycleBracket` shipped to the actor. The actor
enters its `_aopen(Context())` on start and holds the resulting
Context live for the actor's lifetime; on shutdown the bracket tears
down LIFO. Use `With(*brackets)` to compose multiple `Provide`
stacks.

`ctx_builder` is an alternative: a callable returning a Context (or
an awaitable). Pass exactly one of `init` or `ctx_builder`.

Actor options are pass-through: `node`, `actor_name`, `num_cpus`,
`num_gpus`, `max_restarts`, `lifetime` all forward to
`_RayServiceActor.options(**opts).remote()`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ctx_builder` | `Callable[[], Context \| Awaitable[Context]] \| None` | `None` |  |
| `init` | `_LifecycleBracket \| None` | `None` |  |
| `node` | `str \| None` | `None` |  |
| `actor_name` | `str \| None` | `None` |  |
| `num_cpus` | `float \| None` | `None` |  |
| `num_gpus` | `float \| None` | `None` |  |
| `max_restarts` | `int` | `0` |  |
| `lifetime` | `str \| None` | `None` |  |

Undocumented: example.

**Inherited methods**

From `nu.context.fabric.refs.FabricRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `FabricExists` | A Query yielding whether this Ref's fabric type is bound on the Context. |

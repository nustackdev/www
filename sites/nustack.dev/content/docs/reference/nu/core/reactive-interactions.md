---
title: reactive.interactions
description: "Reactive change subscriptions -- unified interaction atoms."
---

Module `nu.core.reactive.interactions`.

Reactive change subscriptions -- unified interaction atoms.

Five queries, one place. Every reactive subscription in Nu -- generic Form
observation, tree-aware shape observation, and substrate-leaf observation --
lives here so callers reach for one namespace regardless of what they hold.

- `OnChange`            -- `view.on_change()`. Subscribe to any change
                                  on the slot-0 Ref's view (collection- and
                                  view-tier Refs; the Ref must yield an
                                  observable view).
- `OnChildChange`       -- `view.on_child_change(address)`. Subscribe
                                  to changes on one specific child of the
                                  slot-0 Ref's view. Slot 1 is the address.
- `OnChildrenChange`    -- `view.on_children_change()`. Subscribe to
                                  changes on all immediate children.
- `OnDescendantsChange` -- `view.on_descendants_change(*pattern)`.
                                  Subscribe to descendants matching a pattern.
                                  Slots 1.. are the pattern segments.
- `OnPrimitiveChange`   -- leaf variant. A leaf Ref yields a scalar
                                  value, not a view, so it subscribes on its
                                  *parent* view's child-change channel keyed by
                                  the leaf's own address. Slot 0 is the leaf
                                  Ref; the query calls `ref._afetch_parent`
                                  and `ref._aaddress` at runtime, so the
                                  substrate needs to implement those (any
                                  `StructuredRef` substrate that provides
                                  navigation already does).

View methods return an opaque `options` value -- a pure filter descriptor,
no observer coupling. Each query resolves the `ObserverProtocol` from ctx
under the root Shape of the Ref it was built from -- the same tag that Ref's
Navigator and storage resolve under -- and calls `observer.subscribe(options)`.

Sentinel handling. If the underlying view resolves to `EMPTY` / `INVALID`
(the address is unbound, the intermediate container is missing), the
subscription cannot be created and the query yields `INVALID` -- consistent
with the rest of `nu.core`.

Sync path. Building a real subscription requires calling into an Observer,
which is a lifecycle-managed resource that lives inside an async runtime.
The sync `_compile` paths raise `RuntimeError` to make the boundary
loud rather than silently returning stale options.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [OnChange](#onchange) | `scalar_query` | `OnChange(ref)` | Opens a subscription to any change on a Ref's view. |
| [OnChildChange](#onchildchange) | `scalar_query` | `OnChildChange(ref, address)` | Opens a subscription to changes on one named child of a Ref's view. |
| [OnChildrenChange](#onchildrenchange) | `scalar_query` | `OnChildrenChange(ref)` | Opens a subscription to changes on any immediate child of a Ref's view. |
| [OnDescendantsChange](#ondescendantschange) | `scalar_query` | `OnDescendantsChange(ref, *pattern)` | Opens a subscription to descendants of a Ref's view matching a pattern. |
| [OnPrimitiveChange](#onprimitivechange) | `scalar_query` | `OnPrimitiveChange(ref)` | Opens a subscription to changes at a leaf Ref, through its parent view. |

## OnChange

Opens a subscription to any change on a Ref's view.

```python
OnChange(ref)
```

Path `nu.core.OnChange`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | a collection- or view-tier Ref. Must yield an observable view, i.e. one that answers `on_change()`. |

**Yields**

The `Subscription` handle from `observer.subscribe(options)`.
INVALID when the view resolves to EMPTY or INVALID (unbound address,
missing intermediate container) - no subscription is opened.

**Notes**

- Async only. The sync path raises `RuntimeError` rather than returning options without an observer behind them; use `nu.arun`.
- `view.on_change()` returns opaque filter options, nothing observer-bound. The atom resolves the `ObserverProtocol` from ctx under the Ref's root shape and hands the options to `subscribe` unread - Nu never inspects a backend's filter dialect.
- Subscribing reads no value off the view, so nothing here recomputes on change. The handle only delivers notifications to receivers bound on it; `React` / `ReactWhile` / `ReactForever` are what bind them and run a body.
- Fires on any mutation reaching that view, with no distinction of which mutation it was.
- Each evaluation opens a fresh subscription; whoever binds a receiver is responsible for closing it.

**Example**

```python
nu.arun(nu.ReactForever(users.on_change(), body))
```

## OnChildChange

Opens a subscription to changes on one named child of a Ref's view.

```python
OnChildChange(ref, address)
```

Path `nu.core.OnChildChange`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 2 (2 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | a structured Ref. Must yield a view that answers `on_child_change(address)`. |
| `address` |  |  | the child to watch, as a key or index the view understands. |

**Yields**

The `Subscription` handle from `observer.subscribe(options)`.
INVALID when either the view or the address is EMPTY or INVALID - no
subscription is opened.

**Notes**

- Async only. The sync path raises `RuntimeError`; use `nu.arun`.
- `address` is evaluated only after the view resolves, so a sentinel view short-circuits without touching it.
- Watches that one child slot, not the subtree under it.
- The atom resolves the `ObserverProtocol` from ctx under the Ref's root shape, then passes the view's opaque options through to `subscribe` unread.
- Each evaluation opens a fresh subscription; the binder closes it.

**Example**

```python
nu.arun(nu.React(users.on_child_change("alice"), body))
```

## OnChildrenChange

Opens a subscription to changes on any immediate child of a Ref's view.

```python
OnChildrenChange(ref)
```

Path `nu.core.OnChildrenChange`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | a structured Ref. Must yield a view that answers `on_children_change()`. |

**Yields**

The `Subscription` handle from `observer.subscribe(options)`.
INVALID when the view is EMPTY or INVALID - no subscription is opened.

**Notes**

- Async only. The sync path raises `RuntimeError`; use `nu.arun`.
- Covers the immediate children only. Anything deeper needs `OnDescendantsChange`.
- The atom resolves the `ObserverProtocol` from ctx under the Ref's root shape, then passes the view's opaque options through to `subscribe` unread.
- Each evaluation opens a fresh subscription; the binder closes it.

**Example**

```python
nu.arun(nu.ReactForever(users.on_children_change(), body))
```

## OnDescendantsChange

Opens a subscription to descendants of a Ref's view matching a pattern.

```python
OnDescendantsChange(ref, *pattern)
```

Path `nu.core.OnDescendantsChange`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity None (1 required).

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | a structured Ref. Must yield a view that answers `on_descendants_change(p0, p1, ...)`. |
| `*pattern` |  |  | the path segments to match descendants against, in order. Their meaning (wildcards and all) belongs to the backend. |

**Yields**

The `Subscription` handle from `observer.subscribe(options)`.
INVALID when the view or any pattern segment is EMPTY or INVALID - no
subscription is opened.

**Notes**

- Async only. The sync path raises `RuntimeError`; use `nu.arun`.
- At least one pattern segment is required, and the check happens at evaluation, not at construction: an empty pattern raises `ValueError` from the running thunk.
- Segments are evaluated in order, after the view, and any sentinel among them collapses the whole subscription rather than being dropped from the pattern.
- The atom resolves the `ObserverProtocol` from ctx under the Ref's root shape, then passes the view's opaque options through to `subscribe` unread.
- Each evaluation opens a fresh subscription; the binder closes it.

**Example**

```python
nu.arun(nu.ReactForever(users.on_descendants_change("*", "email"), body))
```

## OnPrimitiveChange

Opens a subscription to changes at a leaf Ref, through its parent view.

```python
OnPrimitiveChange(ref)
```

Path `nu.core.OnPrimitiveChange`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`. Arity 1 (1 required).

A leaf Ref yields a scalar, not a view, so there is no `on_change()` to
call on it. This atom goes one level up instead: it asks the leaf for its
parent view and its own address, and subscribes on the parent's
child-change channel keyed by that address. Every substrate whose Refs
implement `_afetch_parent` and `_aaddress` - all structured refs -
gets leaf reactivity from this one path, with nothing to override per
substrate.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` | `object` |  | the leaf Ref to watch. |

**Yields**

The `Subscription` handle from `observer.subscribe(options)`.
INVALID when the parent view or the address is EMPTY or INVALID, which
is what a leaf under a missing container gives - no subscription is
opened.

**Notes**

- Async only. The sync path raises `RuntimeError`; use `nu.arun`.
- The leaf's own thunk is never driven. Path knowledge is read off the Ref instance and its child nid, so subscribing does not read the leaf's value and records no dependency on it.
- Notifications ride the parent's child-change channel, so the atom sees whatever that channel reports for the address, including the leaf appearing or being deleted.
- Each evaluation opens a fresh subscription; the binder closes it.

**Example**

```python
nu.arun(nu.React(user["email"].on_change(), body))
```

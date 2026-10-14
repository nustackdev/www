---
title: utils
description: "Helpers the ops share: the bracket, run time ids, a total field read, a reorder."
---

Module `nuspace.ops.utils`.

Helpers the ops share: the bracket, run time ids, a total field read, a reorder.

Nothing here knows what a plane or a cell is.

The bracket rule. Nothing brackets a term for its author: a store read or
write with no bracket around it raises, and nothing autocommits. So whoever
touches a store brackets it, and every op, service and cell program keeps
to the same rule:

- **One short bracket per store, Space first.** A write is one commit to
  one store (`atomic` or `atomic_state`); a term writing both is
  a commit to each, Space then States. A read is one `snapshot`.
- **What decides a write is read inside its bracket.** A check and the
  write it guards share one commit, so nothing lands between them.
- **A term argument that reads a store is read inside the bracket too**, or
  first, on its own, as `nu.let(snapshot(...), ...)`, when the op uses it
  before its bracket opens.
- **No bracket is held across slow or open ended work:** another op (it
  opens its own, and two write brackets on one store never join), a wait or
  a subscription's body, a loaded program (`Eval`, `LoadNu`), or a call
  out of the process. The work runs bare, its result is kept in a
  `nu.let` slot, and a short bracket after it writes what it came to.
- **Bare reads stay bare.** A read helper composes into any expression, so
  it brackets nothing and its caller wraps it.

Brackets never join: one opened inside another on the same store is a
second handle, and a second write one on SQLite is the same thread waiting
on its own lock.

| Name | Call | Meaning |
| --- | --- | --- |
| [atomic](#atomic) | `ops.atomic(body)` | `body` as one commit against the Space store, retried on conflict. |
| [atomic_state](#atomic_state) | `ops.atomic_state(body)` | `body` as one commit against the States store, retried on conflict. |
| [mint_ordered_id](#mint_ordered_id) | `ops.mint_ordered_id(prefix)` | A time ordered id like `p_<12 hex ms>_<4 hex seq>_<4 hex rand>`. |
| [snapshot](#snapshot) | `ops.snapshot(term)` | `term` read in a snapshot of both stores, Space and States. |

## atomic

`body` as one commit against the Space store, retried on conflict.

```python
ops.atomic(body)
```

Path `nuspace.ops.atomic`. Defined on `nuspace.ops.utils`, bound as a function. Builds `nu.Nu`.

Every write op goes through here, around its whole body, so the reads
that decide a write and the write land as one commit. Ops are called
from many processes at once (services on workers, the host), so a lost
commit is re-run against fresh state.

Brackets do not merge: an op inside another op's bracket opens its own.
Composite ops are built from unbracketed parts for that reason.

Space only: States reads inside see a snapshot, opened only if one is
made, and a States write has no transaction to go through and fails. An
op that writes both is two commits, see `atomic_state`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `body` | `nu.Nu` |  |  |

Undocumented: example.

## atomic_state

`body` as one commit against the States store, retried on conflict.

```python
ops.atomic_state(body)
```

Path `nuspace.ops.atomic_state`. Defined on `nuspace.ops.utils`, bound as a function. Builds `nu.Nu`.

`atomic` for program state. Space reads inside see a snapshot,
opened only if one is made, so a state write can ask about structure
(eg whether the cell is there) without taking the Space store's lock.

The two stores are two files: nothing commits both at once. An op that
writes both commits Space first, then States, and never holds both
write locks, so two processes writing both can never wait on each
other. Structure first means a live plane or cell never points at state
that is gone; what a crash between the two can leave is state nothing
points at.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `body` | `nu.Nu` |  |  |

Undocumented: example.

## mint_ordered_id

A time ordered id like `p_<12 hex ms>_<4 hex seq>_<4 hex rand>`.

```python
ops.mint_ordered_id(prefix)
```

Path `nuspace.ops.mint_ordered_id`. Defined on `nuspace.ops.utils`, bound as a function. Builds `str`.

A container lists sorted by key, so ids that sort by the moment they were
minted give creation order with nothing storing it.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `prefix` | `str` |  | What the id starts with, eg `p` for a plane. |

Undocumented: example.

## snapshot

`term` read in a snapshot of both stores, Space and States.

```python
ops.snapshot(term)
```

Path `nuspace.ops.snapshot`. Defined on `nuspace.ops.utils`, bound as a function. Builds `nu.Nu`.

Each opens only if `term` reads it, so wrapping a read that touches
one store costs nothing for the other.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `term` | `nu.Nu` |  |  |

Undocumented: example.

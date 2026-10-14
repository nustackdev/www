---
title: interactions.frame
description: "`Frame`: a private mem store for one scope."
---

Module `nu.mem.interactions.frame`.

`Frame`: a private mem store for one scope.

A frame is the stack frame of a Nu program. Whatever a body computes once and
reads again, counts, or accumulates lives in the frame's own dict, laid out by
a Shape, and goes away when the body ends. Nothing about it is new machinery:
the dict is bound under `(dict, Shape)` with the scoped `ctx.fabrics.bind`
every lifecycle bracket uses, and the Shape's mem refs read and write it like
any other mem root.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Frame](#frame) | `bracket` | `Frame(shape, body)` | Runs `body` with a fresh dict as the mem store for `shape`. |

## Frame

Runs `body` with a fresh dict as the mem store for `shape`.

```python
Frame(shape, body)
```

Path `nu.mem.Frame`. Kind `Bracket`, sort `bracket`, cardinality `transparent`. Arity 2 (2 required).

On entry the frame binds a new empty dict under `shape` and writes
`initial` into its slots. The body reads and writes the Shape's mem
refs against that dict. On exit the prior binding comes back and the dict
is dropped, on a clean exit, an error or a cancel alike.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `shape` | `type[Shape]` |  | the Shape whose mem refs the frame backs. |
| `body` | `Nu` |  | runs with the frame bound. |

**Yields**

Whatever `body` yields, in the body's own cardinality.

**Notes**

- Every run gets its own dict. Parallel arms, concurrent requests and nested calls each entering the frame never see each other's values; arms started inside one frame share its dict.
- A frame over a Shape shadows an outer frame over the same Shape for its body. Frames over different Shapes coexist.
- State that outlives one call, such as a throttle's last run inside a loop, needs the frame around the loop, not inside it.
- Reading a Shape's mem ref with no frame or binding for it in scope raises `LookupError` naming the Shape.
- An `initial` key that is not a slot of `shape` raises `TypeError` at construction. An initial value that evaluates to EMPTY raises on entry, as any mem write does.
- Over a stream body the frame stays bound for the whole drain.

**Example**

```python
class Tally(nu.Shape):
    count = nu.IntRef.slot()
    total = nu.IntRef.slot()
step = Tally.count.set(Tally.count + 1) >> Tally.total.set(Tally.total + nu.Attr("item"))
mean = nu.ForEachDo(nu.Iter([1, 2, 6]), step) >> nu.print(Tally.total / Tally.count)
_ = nu.run(nu.Frame(Tally, mean, count=0, total=0))
```

```
3.0
```

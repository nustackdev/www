---
title: nudle.driver
description: "`serve` -- the host's two layers stacked into one tree."
---

Module `nustd.ui.nudle.driver`.

`serve` -- the host's two layers stacked into one tree.

The ws server carrying the ui wire protocol, and a fold that runs one arm of
the ui program per connection the server holds open. Each layer is public on
its own for a hand-assembled tree; this is the arrangement that covers the
normal case.

| Name | Call | Meaning |
| --- | --- | --- |
| [serve](#serve) | `ui.serve(index, program, static='nudle', host='127.0.0.1', port=8080, log_level='warning', open_browser=True, ready_timeout=10.0, shutdown_timeout=5.0)` | Serve `program` in the browser, one live arm per open tab. |

## serve

Serve `program` in the browser, one live arm per open tab.

```python
ui.serve(index, program, static='nudle', host='127.0.0.1', port=8080, log_level='warning', open_browser=True, ready_timeout=10.0, shutdown_timeout=5.0)
```

Path `nustd.ui.serve`. Defined on `nustd.ui.nudle.driver`, bound as a function. Builds `Nu`.

Never returns on its own -- the fold holds the tree open, so background
work belongs in a sibling arm of a `nu.ParallelAsync`. Goes in a
`body=` slot and never in a `nu.With` spec slot, which would discard
everything under it.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `index` | `type[Index] \| type[Page]` |  | the Index, or the lone Page, whose slots seed the browser's tree. |
| `program` | `Nu` |  | the ui program. Runs once per connection, with that tab's Session bound. Returning or raising stops that tab; a raise is reported on stdout. |
| `static` | `str \| None` | `'nudle'` | the wheel shipping the compiled SPA. None serves `/ws` alone, for a headless run or a separate vite dev server. |
| `host` | `str` | `'127.0.0.1'` | uvicorn bind host. |
| `port` | `int` | `8080` | uvicorn bind port. |
| `log_level` | `str` | `'warning'` | uvicorn log level. The default silences uvicorn's own chatter so only the ready / stopped banner is printed. |
| `open_browser` | `bool` | `True` | open the bound URL once the server signals ready. |
| `ready_timeout` | `float` | `10.0` | how long to wait for uvicorn to come up. |
| `shutdown_timeout` | `float` | `5.0` | how long to wait for it to go down gracefully. |

**Example**

```python
app = nu.With(
    nustd.kv.rocksdb_navigator(".db"),
    body=nu.ParallelAsync(
        nustd.ui.serve(App, ui),
        nustd.kv.auto_flow_atomic(tick),
    ),
)
```

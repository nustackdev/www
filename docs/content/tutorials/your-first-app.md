---
title: Your first app
---

A browser dashboard on a live counter that persists across restarts. One Nu tree, two Fabrics.

```python
import nu
import nustd


class Counter(nu.Shape):
    value: nustd.kv.IntRef


class Dashboard(nustd.ui.Page):
    count: nustd.ui.TextRef


class App(nustd.ui.Index):
    pages = nustd.ui.Pages({"/": Dashboard})


app = nu.With(
    nustd.kv.rocksdb_navigator(".dbcounter"),
    nustd.ui.server(
        nustd.kv.auto_flow_atomic(
            nu.ReactForever(
                Counter.value.on_change(),
                Dashboard.count.set(Counter.value),
            ),
        ),
    ),
    body=nustd.kv.auto_flow_atomic(
        nu.IfDo(Counter.value.missing(), Counter.value.set(0))
        >> nu.ForeverDo(
            Counter.value.inc() >> nu.Delay(1.0),
        )
    ),
)


if __name__ == "__main__":
    import asyncio

    asyncio.run(nu.arun(app))
```

Set up Nu with the `nustd.ui` Fabric first: see [Install](/docs/how-to/install). Then save the code above as `counter.py`, run `python counter.py`, open the browser tab that appears. The counter ticks once a second; the dashboard mirrors it live. Kill it, run again, it picks up where it left off.

## What happened

**Two Shapes, two Fabrics.** `Counter` holds one int on the kv Fabric. `Dashboard` holds one text label on the UI Fabric. `App` is the site index with one page mounted at `/`. Same declaration style, different Fabric.

**One tree, two Fabrics.** `nu.With` binds `nustd.kv.rocksdb_navigator` (RocksDB storage under a Navigator) and a UI server. The server runs `ReactForever` — wake on `Counter.value` change, mirror it into `Dashboard.count`. The `body` seeds the counter if missing, then ticks it forever, one second between beats.

**Composition.** `>>` runs children left-to-right. `ForeverDo` loops its body forever. `ReactForever` subscribes to a change source and re-runs on every fire. `auto_flow_atomic` wraps writes in the minimum atomic region so you get transactions without spelling them out.

## One tree, two Fabrics

Same operators, same brackets, same loops. The Fabric changes; the composition doesn't. Swap `rocksdb_navigator(".dbcounter")` for `memory_navigator()` and the counter resets on every restart. Drop the UI server and it becomes a headless script.

---
title: env
description: "The session env (D17): a run drawing on one browser connection."
---

Module `nuspace.system.devices.web.env`.

The session env (D17): a run drawing on one browser connection.

Registered as `SESSION_ENV`, a run asks for it with
`ops.env("session", sid)`. The kernel resolves it in the host:

- **wrap**: opens `piped_session` on the connection around the
  run, and erases the cell's own ui node first, so what its last run
  drew goes before this one draws.
- **rewrite**: `CellRoot`, landing the program's bare ui refs under
  the cell's node on the viewer.

Both are classes, not closures, so the built body and the rewrite pickle.
Everything here is safe for a worker to import.

| Name | Call | Meaning |
| --- | --- | --- |
| [session_env](#session_env) | `web.session_env(address)` | The session env factory for a host serving connections at `address`. |

## session_env

The session env factory for a host serving connections at `address`.

```python
web.session_env(address)
```

Path `nuspace.system.devices.web.session_env`. Defined on `nuspace.system.devices.web.env`, bound as a function. Builds `EnvFactory`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `address` | `str` |  |  |

Undocumented: example.

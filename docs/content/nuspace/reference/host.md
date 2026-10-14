---
title: host
description: "Layer three: the host composes the system."
---

Module `nuspace.host`.

Layer three: the host composes the system.

- `space`: `open_space`, the whole system in one term, and
  `init_space`, a space made without running it.
- `presets`: `serve`, `headless` and `demo`, the
  named ways to open one.

The registry it opens with is `ext`. The `nuspace` command is
`_cli`, on top of the presets.

## presets

Module `nuspace.host.presets`.

Presets: the named ways to open a space, each one `open_space` call.

- `serve`: the browser shell, a tab opened on the way up.
- `headless`: kernel and services, nothing drawn.
- `demo`: the browser shell with one registered Plane made in the
  space, the tab opened on it.

The command line maps one command or flag to one preset and adds nothing of
its own. Anything else `open_space` takes passes through.

| Name | Call | Meaning |
| --- | --- | --- |
| [demo](#demo) | `host.demo(spec, path=None, host='127.0.0.1', port=8080, open_browser=True)` | The space at `path` served on `host:port`, with `spec` made in it once. |
| [headless](#headless) | `host.headless(path=None)` | The space at `path` with kernel and services only, no web device. |
| [serve](#serve) | `host.serve(path=None, host='127.0.0.1', port=8080, open_browser=True)` | The space at `path`, served in a browser on `host:port`. |

### demo

The space at `path` served on `host:port`, with `spec` made in it once.

```python
host.demo(spec, path=None, host='127.0.0.1', port=8080, open_browser=True)
```

Path `nuspace.host.demo`. Defined on `nuspace.host.presets`, bound as a function. Builds `nu.Nu`.

The plane goes in under `demo_id`, made only where missing, so a
demo opened again in the same space keeps what was done to it. The tab
opens on the plane rather than on home.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `spec` | `Plane` |  |  |
| `path` | `str \| None` | `None` |  |
| `host` | `str` | `'127.0.0.1'` |  |
| `port` | `int` | `8080` |  |
| `open_browser` | `bool` | `True` |  |

Undocumented: example.

### headless

The space at `path` with kernel and services only, no web device.

```python
host.headless(path=None)
```

Path `nuspace.host.headless`. Defined on `nuspace.host.presets`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str \| None` | `None` |  |

Undocumented: example.

### serve

The space at `path`, served in a browser on `host:port`.

```python
host.serve(path=None, host='127.0.0.1', port=8080, open_browser=True)
```

Path `nuspace.host.serve`. Defined on `nuspace.host.presets`, bound as a function. Builds `nu.Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str \| None` | `None` |  |
| `host` | `str` | `'127.0.0.1'` |  |
| `port` | `int` | `8080` |  |
| `open_browser` | `bool` | `True` |  |

Undocumented: example.

## space

Module `nuspace.host.space`.

open_space: the whole system in one term, as a host runs it. init_space: one made.

Layer three. It composes, nothing more: the registry (`ext`), the kernel's
brackets (the space directory's store and notification server, the pool),
the services, and the web device when asked for. The order, all
inside `open_kernel` after reconcile:

1. `ensure_system`: the service planes, made
   where missing;
2. `ensure_home`,
   `ensure_settings` and
   `ensure_search`: the home, settings and
   search planes, made where missing, so they exist before the web device
   serves;
3. `write_info`: `Space.state.info` for this
   open (space path, when, versions);
4. `clear_connections`: tabs of a previous
   run dropped, so nav never brings a plane up for one (D34);
5. init started by the kernel's own `init_start`,
   which brings up its boot list (nav, supervisor, reload, reactions by default);
6. the web device and `body`, beside the kernel.

The kernel's `init=` would start init beside the body, before the service
planes are sure to exist on a first open, so the start is sequenced here
instead (the same term, same `by`).

`init_space` is steps 1 and 2 alone, in the store's brackets only: the
space directory made and seeded, and closed again, nothing run.

Workers import `nuspace`, and so this module: the web device, which
pulls in the web server, is imported only when a space serves.

| Name | Call | Meaning |
| --- | --- | --- |
| [init_space](#init_space) | `host.init_space(path)` | The space at `path` made and seeded (`seed_space`), then closed. Nothing runs. |
| [open_space](#open_space) | `host.open_space(path=None, web=True, host='127.0.0.1', port=8080, open_browser=True, static='nuspace_ui', spares=2, planes=(), snippets=(), envs=None, space_envs=(), backends=None, extensions=None, discover=True, body=None, name=None)` | A space, opened: kernel, services, and the browser shell when `web`. |

### init_space

The space at `path` made and seeded (`seed_space`), then closed. Nothing runs.

```python
host.init_space(path)
```

Path `nuspace.host.init_space`. Defined on `nuspace.host.space`, bound as a function. Builds `nu.With`.

The store's brackets alone: no pool, no kernel, no web device. A space
already there is left as it is, but for a system plane gone missing.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str` |  |  |

Undocumented: example.

### open_space

A space, opened: kernel, services, and the browser shell when `web`.

```python
host.open_space(path=None, web=True, host='127.0.0.1', port=8080, open_browser=True, static='nuspace_ui', spares=2, planes=(), snippets=(), envs=None, space_envs=(), backends=None, extensions=None, discover=True, body=None, name=None)
```

Path `nuspace.host.open_space`. Defined on `nuspace.host.space`, bound as a function. Builds `nu.Nu`.

Runs until `body` returns, or forever without one. Evaluate it under a
`if __name__ == "__main__"` guard: workers are spawned and re-import
the main module.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `path` | `str \| None` | `None` | The space directory, created if missing: `kernel.sqlite` (structure and runs), `state.sqlite` (program state) and the notification server's `valkey/`. None is a throwaway one, gone at close. |
| `web` | `bool` | `True` | Serve the browser shell. False is headless: kernel and services. |
| `host` | `str` | `'127.0.0.1'` | The interface the web server binds. |
| `port` | `int` | `8080` | The port the web server binds. |
| `open_browser` | `bool` | `True` | Open a tab once the server is up. |
| `static` | `str \| None` | `'nuspace_ui'` | The wheel shipping the browser bundle. None serves the socket alone, eg for a vite dev server. |
| `spares` | `int` | `2` | Idle workers to keep up. |
| `planes` | `Sequence[Plane]` | `()` | Planes registered directly, ahead of any extension. |
| `snippets` | `Sequence[Snippet]` | `()` | Snippets registered directly. |
| `envs` | `Mapping[str, EnvFactory] \| None` | `None` | Env factories registered directly. |
| `space_envs` | `Sequence[Sequence[str] \| str]` | `()` | Env specs every run executes inside, outermost. |
| `backends` | `Mapping[str, type[Backend]] \| None` | `None` | Backend classes by name, on top of the built in `async` and `mp`. A plane runs on the one its `backend` prop names. |
| `extensions` | `Sequence[Extension] \| None` | `None` | Extensions registered explicitly, ahead of discovered ones. |
| `discover` | `bool` | `True` | Also register the extensions installed under the `nuspace.extensions` entry point group. |
| `body` | `nu.Nu \| None` | `None` | Host Nu run beside everything. The space closes when it returns. |
| `name` | `str \| None` | `None` | Process name prefix for workers. |

Undocumented: example.

---
title: Install
---

Install Nu from PyPI. For hacking on Nu itself, see [Install from source](/docs/how-to/install-from-source). For editable dev across the full nustack (nu + virtuals + invisibles), see [Cross-repo dev](/docs/how-to/cross-repo-dev).

## Prerequisites

- Python 3.10 or later.

## Install

Nu ships as three distributions, released in lockstep: `nucore` is the kernel, `nustd` is the fabrics and the standard library, `nucli` is the `nu` command. The everything-included install:

```bash
pip install nucore "nustd[all]" nucli
```

For a lean install, pick the extras you need instead of `[all]`. One extra per fabric: `[kv]`, `[mem]`, `[ui]`, `[cluster]`, `[proxy]`, `[http]`, `[llm]`, `[cc]`, `[mp]`, `[mp_pool]`, `[ws_server]`.

```bash
pip install nucore "nustd[mem,ui]"
```

Drop `nucli` when you only need the library. The `nu` command, and the bundled demos below, come with it.

## Verify

Check the install:

```bash
python -c "import nu; print(nu.__version__)"
```

Run the bundled counter demo. A live counter renders in a browser dashboard and persists across restarts:

```bash
nu demo counter
```

Open the browser tab that pops up. Kill the process, run it again, it picks up where it left off. `nu demo` shows all bundled demos.

Next: [Hello, Nu](/docs/tutorials/hello) for your first program, or [Your first app](/docs/tutorials/your-first-app) for a full walkthrough.

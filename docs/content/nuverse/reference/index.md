---
title: Reference
description: "nuverse: the extensions a space offers out of the box."
---

Package `nuverse`.

nuverse: the extensions a space offers out of the box.

- `planes`: what `+` creates: `plain`, `jobs`, `runs`,
  `workers`, `planes`, `cc_chat`.
- `snippets`: what `/` inserts, one package each, and the ops on
  the cells made from them.

nuspace finds this package through the `nuspace.extensions` entry point,
which names `extension`. Nothing is imported here at module scope:
workers import cell programs, and a program never needs the registry.

| Page | Count | What |
| --- | --- | --- |
| [Planes](/docs/nuverse/reference/planes) | 6 | What `+` creates. |
| [Snippets](/docs/nuverse/reference/snippets) | 15 | What `/` inserts. |

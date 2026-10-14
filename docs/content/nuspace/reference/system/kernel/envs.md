---
title: envs
description: "Envs: what a run executes inside, built in the host from names."
---

Module `nuspace.system.kernel.envs`.

Envs: what a run executes inside, built in the host from names.

An env is a wrap around the body and a rewrite over the loaded program:

```python
session = Env(wrap=lambda body: piped_session(address, sid, body), label="session")
```

A run cannot store a lambda, so it stores specs, `[name, *args]`, and the
host resolves them through factories registered at open (D2). The wrap runs
here, in the host, so the lambda never crosses: what crosses is the Nu it
built. The rewrite does cross, inside the body that loads the program, so it
must pickle (a class, not a closure).

Order: space-wide envs outermost, then the run's own, first outermost.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [KernelConfigRef](#kernelconfigref) | `ref` | `KernelConfigRef(address=None)` | The `KernelConfig` bound on the context. EMPTY when none is. |

## KernelConfigRef

The `KernelConfig` bound on the context. EMPTY when none is.

```python
KernelConfigRef(address=None)
```

Path `nuspace.system.kernel.KernelConfigRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

**Methods**

### `.fabric(envs=None, space_envs=())`

What the kernel is told at open: the env registry and the space-wide envs.

Builds `None`.

Bound on the host's context, read by dispatch. Host only: factories are
python callables and never cross.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `envs` | `Mapping[str, EnvFactory] \| None` | `None` | Factories by name. |
| `space_envs` | `Sequence[Sequence[str] \| str]` | `()` | Specs applied to every run, outermost first. A bare str is a spec with no args. |

Undocumented: example.

**Inherited methods**

From `nu.context.fabric.refs.FabricRef`:

| Call | Builds | Meaning |
| --- | --- | --- |
| `.exists()` | `Bool` | Whether this Ref's fabric type is bound on the Context, as a `Bool`. |

Undocumented: example.

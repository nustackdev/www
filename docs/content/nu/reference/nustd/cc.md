---
title: cc
description: "Nu Claude Code fabric."
---

Module `nustd.cc`.

Nu Claude Code fabric.

Both sync and async are supported; prefer `nu.arun` for real use so cc calls
don't block the event loop (streaming, UI ticks, parallel prompts all need it).
Sync is fine for one-off scripts.

Example:

```python
class Agent(nu.Service):
    ask = nustd.cc.PromptRef.method()

app = nu.With(
    nustd.cc.bind(Agent, model="claude-sonnet-4-5", permission_mode="acceptEdits"),
    body=nu.print(nu.Dict(Agent.ask(prompt="write a haiku about rust"))["text"]),
)

asyncio.run(nu.arun(app))
```

## interactions

Module `nustd.cc.interactions`.

CCPrompt: ScalarAction that runs one Claude Code prompt turn.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [CCPrompt](#ccprompt) | `scalar_action` | `CCPrompt(ref, args)` | One prompt turn against the Claude Code agent a PromptRef addresses. |

### CCPrompt

One prompt turn against the Claude Code agent a PromptRef addresses.

```python
CCPrompt(ref, args)
```

Path `nustd.cc.CCPrompt`. Kind `ScalarAction`, sort `scalar_action`, cardinality `scalar`. Arity 2 (2 required).

Built by calling a PromptRef rather than written by hand. At evaluation
it resolves the Ref, merges the endpoint's declared defaults under this
call's overrides, and drives one `query` through the `CCFabric`
provided for the owning Service, draining the message stream to the end.

A whole agent run happens inside this one node: the agent may read
files, run tools and take many turns before the stream closes. Only the
final text and the run's accounting come back out.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the PromptRef naming the agent. |
| `args` |  |  | a Dict carrying `prompt` plus this call's option overrides. |

**Yields**

A dict with `text` plus the run's accounting: `session_id`,
`total_cost_usd`, `duration_ms`, `num_turns` and the raw
`result`. `text` is the SDK's final result string, falling back
to the concatenated assistant text blocks. If the stream ends
without a result message the accounting keys are absent entirely,
not None.

**Notes**

- Declared as mutating its Ref child, so runs against one agent stay ordered and are never folded together.
- Under a `nustd.cc.Session` bracket it reads the session id off the handle and resumes; the first call in the bracket starts fresh and writes its id back for the rest.
- An explicit `resume=` override wins over the bracket's handle.
- The sync path drives the async SDK through `asyncio.run`, so it raises if a loop is already running. Use `nu.arun` anywhere near an event loop.

**Example**

```python
class Agent(nu.Service):
    ask = nustd.cc.PromptRef.method()
app = nu.With(
    nustd.cc.bind(Agent, model="claude-sonnet-4-5", permission_mode="acceptEdits"),
    body=nu.print(nu.dict(Agent.ask("write a haiku about rust"))["text"]),
)
asyncio.run(nu.arun(app))
```

## session

Module `nustd.cc.session`.

Session: lifecycle bracket that scopes a cc session across nested prompts.

Mirrors the nustd.kv pattern (Snapshot / Transaction): a lazy handle is bound into
the ctx on entry; every PromptRef call inside the bracket reads it and threads
`resume=session_id` so cc treats the calls as one continuous session.

The first prompt starts a fresh cc session (no resume); its returned session_id
is captured on the handle, and subsequent prompts continue it.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Session](#session-1) | `bracket` | `Session(*body)` | Makes every prompt in its body continue one Claude Code conversation. |

### Session

Makes every prompt in its body continue one Claude Code conversation.

```python
Session(*body)
```

Path `nustd.cc.Session`. Kind `Bracket`, sort `bracket`, cardinality `transparent`. Arity None (0 required).

Without it each prompt is a cold start that remembers nothing. The
bracket binds a fresh handle on entry; the first prompt underneath runs
without resuming and writes the id cc gave it onto the handle, and each
later prompt reads it back and resumes, so the agent keeps its context
across the whole body.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `*body` |  |  | the terms to run inside the session. Several are run in order, as if wrapped in `Sequential`. |

**Yields**

Whatever the body yields; the bracket adds nothing of its own.

**Notes**

- Reach is by Context, not by ownership: any prompt evaluated while the bracket is open joins the session, including ones inside functions the body calls.
- A nested Session binds its own handle and shadows the outer one, so its prompts form a separate conversation. Sibling Sessions likewise never share.
- The handle is bound at the same point whether the run is sync or async, so the bracket behaves the same under `nu.run` and `nu.arun`.
- Nothing is persisted. The id lives for as long as the bracket is open; to pick a conversation back up later, keep the `session_id` a prompt yielded and pass it as `resume=`.

**Example**

```python
class Agent(nu.Service):
    ask = nustd.cc.PromptRef.method()
app = nu.With(
    nustd.cc.bind(Agent, model="claude-sonnet-4-5"),
    body=nustd.cc.Session(
        nu.print(nu.dict(Agent.ask("pick a number between 1 and 10"))["text"]),
        nu.print(nu.dict(Agent.ask("what number did you pick?"))["text"]),
    ),
)
asyncio.run(nu.arun(app))
```

## refs

Module `nustd.cc.refs`.

PromptRef: Ref addressing a Claude Code prompt endpoint on a Service.

Mirrors nustd.http verb refs: `.method(**defaults)` returns a Method declaration
that the ServiceMeta descriptor unwraps at class access; calling the Ref with
kwargs produces a CCPrompt interaction.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [PromptRef](#promptref) | `ref` | `PromptRef(name, owner_service=None)` | Addresses a Claude Code agent on a Service, one Ref per agent role. |

### PromptRef

Addresses a Claude Code agent on a Service, one Ref per agent role.

```python
PromptRef(name, owner_service=None)
```

Path `nustd.cc.PromptRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

Written in a Service class body. The Ref carries no configuration of its
own beyond its declared defaults: the model, working directory, tool
allowlist and system prompt come from the `CCFabric` provided for the
owning Service class, so a program can hold several Services each
standing for a differently-configured agent.

**Notes**

- Every call spawns a fresh Claude Code session unless it runs inside a `nustd.cc.Session` bracket, which threads the session id through so the calls read as one conversation.
- The Ref needs the `claude-agent-sdk` package and a working `claude` CLI on the machine that evaluates it.

**Example**

```python
class Agent(nu.Service):
    ask = nustd.cc.PromptRef.method(max_turns=1)
app = nu.With(
    nustd.cc.bind(Agent, model="claude-sonnet-4-5", cwd="/tmp"),
    body=nu.print(nu.dict(Agent.ask("name this directory"))["text"]),
)
asyncio.run(nu.arun(app))
```

**Methods**

#### `a(...)`

Build a CCPrompt interaction over one turn's prompt and options.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `prompt` | `object` |  | the text to send. Stringified at evaluation, so it may be a Nu term rather than a literal. |

**Notes**

- Keywords beyond the prompt are `ClaudeAgentOptions` fields applied to this call only.
- Unlike ChatRef, the prompt is positional and required: there is no messages-list form, since the transcript is the session's business rather than the caller's.
- Prompt and overrides land together in one `Dict` child, so both are resolved at evaluation.

Undocumented: example.

## presets

Module `nustd.cc.presets`.

bind(): Provide a CCFabric for a Service.

| Name | Call | Meaning |
| --- | --- | --- |
| [bind](#bind) | `cc.bind(service_cls)` | Configure the Claude Code agent a Service's PromptRefs run against. |

### bind

Configure the Claude Code agent a Service's PromptRefs run against.

```python
cc.bind(service_cls)
```

Path `nustd.cc.bind`. Defined on `nustd.cc.presets`, bound as a function. Builds `Provide`.

What it provides is tagged by the Service class, which is how a PromptRef
declared on that class finds its fabric, and how one program can run
several agents with different tools, directories or system prompts side
by side.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `service_cls` | `type` |  | the Service whose PromptRefs this agent serves. |

**Yields**

A Provide to hand to `nu.With`.

**Notes**

- The kwargs are `ClaudeAgentOptions` fields - `model`, `cwd`, `allowed_tools`, `system_prompt`, `permission_mode`, `max_turns` and the rest - or a single `options=` holding a built `ClaudeAgentOptions`.
- These are the outermost layer: declaration defaults sit on top of them and per-call overrides on top of those.
- Unlike the LLM fabric there is no client to open, so the `With` block costs nothing until a prompt actually runs.
- Everything here reaches the `ClaudeAgentOptions` constructor as written, so a bad key raises when the block is entered - unlike a per-call override, which is dropped silently.
- `options=` and loose kwargs do not combine: given both, the built options object is used and the kwargs are ignored.

**Example**

```python
app = nu.With(nustd.cc.bind(Agent, model="claude-sonnet-4-5", cwd="/srv/repo"), body=...)
```

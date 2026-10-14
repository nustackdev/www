---
title: cc
description: "Nu Claude Code fabric."
---

Module `nustd.cc`.

Nu Claude Code fabric.

A prompt outside a Session is one-shot, one `claude` process for one prompt.
Inside one under `nu.arun` it is a turn on the one process the brace holds
open; under `nu.run` it is still a process per prompt, on the brace's id.
Prefer `nu.arun` for real use so cc calls don't block the event loop
(streaming, UI ticks, parallel prompts all need it). Sync is fine for one-off
scripts.

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

CCPrompt runs one Claude Code prompt turn, CCStream streams one; NewSession mints the id of a conversation.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [CCPrompt](#ccprompt) | `scalar_action` | `CCPrompt(ref, args)` | One prompt turn against the Claude Code agent a PromptRef addresses. |
| [CCStream](#ccstream) | `stream_action` | `CCStream(ref, args)` | One prompt turn against a Claude Code agent, its reply streamed as it happens. |
| [NewSession](#newsession) | `scalar_query` | `NewSession()` | A new conversation id, for a `nustd.cc.Session` to begin under. |

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
- Outside a `nustd.cc.Session` it is one-shot: a `claude` process for this prompt alone, which `resume=` can point at an earlier conversation. Inside one it is a turn of the brace's conversation, and on the async path a turn on the brace's one process.
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

### CCStream

One prompt turn against a Claude Code agent, its reply streamed as it happens.

```python
CCStream(ref, args)
```

Path `nustd.cc.CCStream`. Kind `StreamAction`, sort `stream_action`, cardinality `stream`. Arity 2 (2 required).

Built by calling a StreamRef rather than written by hand. It runs the
turn a `CCPrompt` runs, through the same fabric and the same Session,
but where that one hands back only the end, this one yields each thing
the agent does the moment it lands: its text, its tool calls and what
they gave back, then the result with the run's accounting.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `ref` |  |  | the StreamRef naming the agent. |
| `args` |  |  | a Dict carrying `prompt` plus this call's option overrides. |

**Yields**

One dict per event, keyed by `type`:

- `init`: `session_id`, `model`, `cwd`, `tools`.
- `text` / `thinking`: `text`, a whole block.
- `delta`: `text`, a piece of a block (partial messages only).
- `tool_use`: `id`, `name`, `input`.
- `tool_result`: `id` (the tool_use's), `content` as text cut to
  `nustd.cc.fabric.TRIM` characters, `is_error`.
- `result`, always last: `text`, `session_id`,
  `total_cost_usd`, `duration_ms`, `num_turns`, `usage`,
  `is_error`. A stream that ends without one carries no result.

**Notes**

- Lazy, as every stream is: nothing starts until something pulls the first event, and a reader that stops early stops the run. Inside a Session that also closes the brace's process, since the rest of the reply is left unread on it; the next prompt opens a new one on the same conversation.
- Inside a Session the turn holds the brace's process until its result is out, so other prompts in the brace wait for it.
- Text arrives a block at a time. Bind `include_partial_messages=True` to also get `delta` events, pieces of a block as it is written.
- The sync path pulls the async SDK through a thread of its own, so events still arrive as they happen under `nu.run`.

**Example**

```python
class Agent(nu.Service):
    say = nustd.cc.StreamRef.method()
app = nu.With(
    nustd.cc.bind(Agent, model="claude-sonnet-5"),
    body=nu.ForEachDo(Agent.say("list this directory"), lambda ev: nu.print(ev["type"])),
)
asyncio.run(nu.arun(app))
```

### NewSession

A new conversation id, for a `nustd.cc.Session` to begin under.

```python
NewSession()
```

Path `nustd.cc.NewSession`. Kind `ScalarQuery`, sort `scalar_query`, cardinality `scalar`.

The CLI lets a caller choose the id of a conversation, so creating one is
minting a UUID and nothing else: no process starts and nothing is written.
The conversation begins on the first prompt in a Session given this id,
and every later Session given it continues it. So the id can be stored
before anything is said, and whoever holds it can pick the conversation
back up after a restart.

**Yields**

The id, a str.

**Notes**

- A Query that reads randomness, as `nustd.uuid.uuid4` is: every evaluation is a new id, and nothing is mutated.

**Example**

```python
app = nu.With(
    nustd.cc.bind(Agent),
    body=nu.let(
        nustd.cc.NewSession(),
        lambda sid: nustd.cc.Session(Agent.ask("hello"), sid=sid),
    ),
)
```

## session

Module `nustd.cc.session`.

Session: the brace that makes every prompt inside it one Claude Code conversation.

Mirrors the nustd.kv pattern (Snapshot / Transaction): a handle is bound into the
ctx on entry, and every PromptRef call inside the brace finds it there and runs
through it. The handle carries the conversation's id and, on the async path, the
one `claude` process the brace talks through.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [Session](#session-1) | `bracket` | `Session(sid=None)` | Makes every prompt in its body continue one Claude Code conversation. |

### Session

Makes every prompt in its body continue one Claude Code conversation.

```python
Session(sid=None)
```

Path `nustd.cc.Session`. Kind `Bracket`, sort `bracket`, cardinality `transparent`. Arity 1 (0 required).

Without it each prompt is a cold start that remembers nothing. With it
the prompts underneath are turns of one conversation, and on the async
path they are turns on one `claude` process, started by the first
prompt and stopped when the body ends, fails or is cancelled.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `sid` | `StrArg \| None` | `None` | the conversation to be in, a UUID. A conversation that already has a transcript is continued; an id that was never prompted starts its conversation under that id on the first prompt, so an id from `NewSession` can be stored before anything is said. Without one the brace starts fresh, and the id it ends up with is the `session_id` of any prompt result inside it. |

**Yields**

Whatever the body yields; the brace adds nothing of its own.

**Notes**

- Reach is by Context, not by ownership: any prompt evaluated while the brace is open joins the session, including ones inside functions the body calls.
- A nested Session binds its own handle and shadows the outer one, so its prompts form a separate conversation. Sibling Sessions likewise never share, unless they are given the same `sid`.
- One brace is one process, opened with the options of its first prompt. A later prompt asking for different options raises, including one through a Service bound differently.
- Prompts inside run one at a time even if the body runs them in parallel, because one process answers one prompt at a time. A streamed prompt is a turn like any other: it holds the process until its result is out.
- The sync path cannot keep a process open between prompts, since each one is its own `asyncio.run`. There every prompt is a process of its own, run on the brace's id, so the conversation is the same and only the cost of starting differs.
- The brace owns the id: a `resume` or `session_id` override on a prompt inside it is replaced. Those overrides are for prompts outside any brace.

**Example**

```python
class Agent(nu.Service):
    ask = nustd.cc.PromptRef.method()
app = nu.With(
    nustd.cc.bind(Agent, model="claude-sonnet-4-5"),
    body=nu.let(
        nustd.cc.NewSession(),
        lambda sid: nustd.cc.Session(
            nu.print(nu.dict(Agent.ask("pick a number between 1 and 10"))["text"]),
            nu.print(nu.dict(Agent.ask("what number did you pick?"))["text"]),
            sid=sid,
        ),
    ),
)
asyncio.run(nu.arun(app))
```

## refs

Module `nustd.cc.refs`.

PromptRef and StreamRef: Refs addressing a Claude Code prompt endpoint on a Service.

Mirrors nustd.http verb refs: `.method(**defaults)` returns a Method declaration
that the ServiceMeta descriptor unwraps at class access; calling the Ref with
kwargs produces a CCPrompt interaction, or a CCStream for a StreamRef.

| Name | Sort | Call | Meaning |
| --- | --- | --- | --- |
| [PromptRef](#promptref) | `ref` | `PromptRef(name, owner_service=None)` | Addresses a Claude Code agent on a Service, one Ref per agent role. |
| [StreamRef](#streamref) | `ref` | `StreamRef(name, owner_service=None)` | A PromptRef whose calls stream the reply as it happens. |

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

- Every call spawns a fresh Claude Code session unless it runs inside a `nustd.cc.Session`, which makes the calls under it turns of one conversation.
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

### StreamRef

A PromptRef whose calls stream the reply as it happens.

```python
StreamRef(name, owner_service=None)
```

Path `nustd.cc.StreamRef`. Kind `Ref`, sort `ref`, cardinality `scalar`.

The same agent, the same fabric and the same Session rules as PromptRef;
a call builds a `CCStream`, which yields the turn event by event, where
a PromptRef call yields only its end. A Service may declare both over one
bind, one for when only the answer matters and one for watching it come.

**Example**

```python
class Agent(nu.Service):
    ask = nustd.cc.PromptRef.method()
    say = nustd.cc.StreamRef.method()
app = nu.With(
    nustd.cc.bind(Agent, model="claude-sonnet-5"),
    body=nu.ForEachDo(Agent.say("fix the failing test"), lambda ev: nu.print(ev)),
)
asyncio.run(nu.arun(app))
```

**Methods**

#### `a(...)`

Build a CCStream over one turn's prompt and options. Arguments as `PromptRef`.

Builds `Nu`.

**Arguments**

| Name | Type | Default | Meaning |
| --- | --- | --- | --- |
| `prompt` | `object` |  |  |

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
